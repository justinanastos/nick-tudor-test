define(['marionette',
    'underscore',
    'jquery'
], function(Marionette, _, $) {
    // Note: Since this is a not a Marionette module, this code is executed
    // every time this file is included. Therefore, we should not include
    // it more than once.
    var originalClose;
    var originalOnShow;

    // Verify this is the first time this file is required.
    if (window._fadeViewInstantiated) {
        return;
    } else {
        window._fadeViewInstantiated = true;
    }

    originalClose = Marionette.View.prototype.close;
    originalOnShow = Marionette.Region.prototype.show;

    Marionette.View.prototype.close = function() {
        var duration = this.fadeOutDuration;

        if (duration) {
            // Fade out the view and then call the `originalClose` function.
            this.$el.fadeOut(duration, _.bind(function(args) {
                originalClose.apply(this, args);
            }, this, arguments));
        } else {
            originalClose.apply(this, arguments);
        }
    };

    Marionette.Region.prototype.show = function(view) {
        var duration = view.fadeInDuration;

        // Call the original show function.
        originalOnShow.apply(this, arguments);

        // If there is a duration defined, then fade the element in.
        if (duration) {
            view.$el.css({
                opacity: 0
            });
            view.$el.animate({
                opacity: 1
            }, {
                duration: duration
            });
        }
    };
});
