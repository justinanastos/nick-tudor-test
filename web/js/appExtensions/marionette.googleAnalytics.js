define(['marionette', 'backbone', 'underscore', 'ga'], function(Marionette, Backbone, _, ga) {

    // Save the original function. This way we can call it and return whatever
    // it is returning. This way we don't break the default functionality.
    var originalBackboneHistoryNavigate = Backbone.history.navigate;
    var originalConfigureTriggers = Marionette.View.prototype.configureTriggers;

    // Wrapper for analytics call. This is here solely so we can add debugging
    // should we want to see what we're doing.
    function callGoogleAnalytics() {
        // Uncomment this line to debug analytics calls
        // console.log('calling google analytics, parameters=', arguments);

        // Save arguments so we can use them to call the `ga.apply` function.
        var args = arguments;

        // Call `ga`. Call it in a `_.defer` so that it is handled at the end
        // of the call stack. That way if there are any errors that are caused
        // by the `ga` function, they won't effect our execution flow.
        _.defer(function() {
            ga.apply(null, args);
        });
    }

    // Override `Backbone.history.navigate` so we can capture routes.
    Backbone.history.navigate = function(fragment, options) {
        // Wrap custom functionality inside of a `try` block. If *anything*
        // fails, the original execution must continue.
        try {
            // Call the google analytics tracker before we execute the original,
            // just incase we're navigating off of this page.
            callGoogleAnalytics('send', 'event', 'route', 'navigate', '/' + fragment);
        } catch (error) {
            /*jshint devel: true */

            // There was an error. Debug it out. I want this `console.error` to
            // make it to production because this will not break the application,
            // but we want to know if there are errors in the console without
            // breaking the application. Note that the `if` block will prevent
            // old versions of IE from cashing if the F12 panel isn't open yet.
            if (console && console.error) {
                console.error(error);
            }
        } finally {
            // Call original function in original context.
            originalBackboneHistoryNavigate.apply(this, arguments);
        }
    };

    // Override `Marionette.View.prototype.configureTriggers`. Call the original
    // function, but override it's response with a modified callback for triggers
    // that define `googleAnalyticsConfig`.
    Marionette.View.prototype.configureTriggers = function() {
        // Call the original function
        var triggerEvents = originalConfigureTriggers.apply(this, arguments);
        var triggers;

        // Wrap custom functionality inside of a `try` block. If *anything*
        // fails, the original execution must continue.
        try {
            if (!this.triggers) {
                return;
            }

            // Handle targets using the `@ui` hash.
            // TODO: Should we copy the original Marionette function so this doesn't
            // break if the Marionette function disappears or is changed?
            triggers = this.normalizeUIKeys(_.result(this, 'triggers'));

            // Configure the triggers, prevent default
            // action and stop propagation of DOM events
            _.each(triggers, function(value, key) {
                // Save the original `triggerEvents[key]` so we can alter it.
                var existingTriggerEvent = triggerEvents[key];

                if (_.isObject(value) && value.googleAnalyticsConfig) {
                    // The `triggers` contains a `googleAnalyticsConfig` object or
                    // function. Override the behavior.

                    // Apply default values to the value object. This is contrary
                    // to the default Marionette behavior, where these values have
                    // no default applied to them when using an object for a
                    // trigger. This is for our convenience now we can't forget
                    // them.
                    value = _.defaults(value, {
                        preventDefault: true,
                        stopPropagation: true
                    });

                    // We use `_.bind()` not for the context manipulation, but so we
                    // can pass parameters through to the function. This is not
                    // really necessary since we're inside of an `_.each` block,
                    // but if that changes for any reason, this will still work
                    // because calling `_.bind()` takes the `value.googleAnalyticsConfig`
                    // and `ga` by reference, aka making a copy so if these variables
                    // are changing, we have a copy of how they were when we configured
                    // the new function.
                    triggerEvents[key] = _.bind(function(googleAnalyticsConfig, ga) {
                        var googleAnalyticsObject;
                        var googleAnalyticsParameters;

                        // Execute original callback. We use `.apply` because we
                        // need to unshift off the `googleAnalyticsConfig` and `ga`
                        // parameters. Note that this `2` must match the number
                        // of parameters passed into the bound function.
                        existingTriggerEvent.apply(this, _.rest(arguments, 2));

                        if (_.isFunction(googleAnalyticsConfig)) {
                            // `googleAnalyticsConfig` is a function. Call it to
                            // get the google analytics data.
                            googleAnalyticsObject = googleAnalyticsConfig.call(this);
                        } else {
                            // `googleAnalyticsConfig` is an object. Pass it
                            // back directly.
                            googleAnalyticsObject = googleAnalyticsConfig;
                        }

                        // Define the parameters to send in an array.
                        googleAnalyticsParameters = [
                            'send',
                            'event',
                            googleAnalyticsObject.category,
                            googleAnalyticsObject.event,
                            googleAnalyticsObject.label
                        ];

                        // Strip off trailing `undefined` values.
                        while (googleAnalyticsParameters.length &&
                            _.isUndefined(_.last(googleAnalyticsParameters))) {
                            googleAnalyticsParameters.pop();
                        }

                        // Call the google analytics function.
                        callGoogleAnalytics.apply(null, googleAnalyticsParameters);

                    }, this, value.googleAnalyticsConfig, ga);
                }

            }, this);
        } catch (error) {
            /*jshint devel: true */

            // There was an error. Debug it out. I want this `console.error` to
            // make it to production because this will not break the application,
            // but we want to know if there are errors in the console without
            // breaking the application. Note that the `if` block will prevent
            // old versions of IE from cashing if the F12 panel isn't open yet.
            if (console && console.error) {
                console.error(error);
            }
        } finally {
            // Return the original response from `Marionette.View.prototype.configureTriggers`.
            // This will happen no matter what errors happened. If there were
            // no errors, then these events will have been modified for
            // analytics tracking.
            return triggerEvents;
        }
    };
});
