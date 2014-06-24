/*global define */
define([
    'marionette',
    'backbone',
    'underscore',
    'data/data',
    'Handlebars',
    // Require.js modules we need included, but don't directly access.
    'appExtensions/facebook',
    'appExtensions/handlebarsPartials',
    'marionette.babyBird',
    'marionette.regionChildCloseEvent',
    'marionette-transitions',
    'backbone.grouped-collection',
    'backbone.virtual-collection',
    'backbone-super',
    'polyfillLocationOrigin'
], function(Marionette, Backbone, _, data, Handlebars) {
    // Start up a new Marionette Application
    var App = new Marionette.Application();
    // Add regions
    App.addRegions({
        // regionName: .className
    });
    // Fires after the Application has started and after the initializers
    // have been executed.
    App.on('start', function() {
        // Start the history. All subapps must be loaded prior, or any routing
        // inside of them will not work.
        require([
            // apps/...
        ], function() {
            if (Backbone.history) {
                Backbone.history.start({
                    pushState: true
                });
            }
        });
    });
    // Wrapper for `Backbone.history.navigate`.
    App.navigate = function(route,  options) {
        Backbone.history.navigate(route, options);
    };
    // Wrapper for `Backbone.history.fragment`.
    App.getCurrentRoute = function() {
        return Backbone.history.fragment;
    };
    // Initializer callback. Fires when the application has started.
    App.addInitializer(function(options) {
        // Start apps
        // require(['...'], function() {
            // App.module('...').start();
        // });
        // Remove 300ms delay on mobile clicks.
        require(['fastclick'], function(fastClick) {
            fastClick.attach(document.body);
        });
    });
    // Handlbar helpers
    require(['Handlebars'], function(Handlebars) {
        // Allow logging in handlebar templates
        // ex: {{ log this }}
        Handlebars.registerHelper('log', function(context) {
            return window.console.log(context);
        });
        // URL encode strings in handlebar templates
        // ex: {{ urlencode string }}
        Handlebars.registerHelper('urlencode', function(context) {
            return encodeURIComponent(context);
        });
    });
    // Returning data/data.js when requested
    App.reqres.setHandler('data', function() {
        return data;
    });
    // Return the application instance.
    return App;
});
