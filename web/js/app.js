/*global define */
define([
    'marionette',
    'backbone',
    'underscore',
    'Handlebars',

    // Require.js modules we need included, but don't directly access.
    'handlebars.partialsWithParameters',
    'marionette.babyBird',
    'marionette.enhancedController'
], function(Marionette, Backbone, _, data, Handlebars) {
    // Start up a new Marionette Application
    var App = new Marionette.Application();

    // Add regions
    App.addRegions({
        exampleRegion: '.example-region'
    });

    // Fires after the Application has started and after the initializers
    // have been executed.
    App.on('start', function() {
        // Start the history. All subapps must be loaded prior, or any routing
        // inside of them will not work.
        require([
            // Example app
            'apps/example/example_app'
        ], function() {
            if (Backbone.history) {
                Backbone.history.start({
                    pushState: true
                });
            }

            // Start all apps that were not automatically started. Do this
            // here and not in a separate initializer because there's no
            // reason to require the apps twice in this file.
            App.module('ExampleApp').start();
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

    // Handlbar helpers
    require(['Handlebars'], function(Handlebars) {
        // Allow logging in handlebar templates
        // ex: {{ log this }}
        Handlebars.registerHelper('log', function(context) {
            return window.console.log(context);
        });
    });

    // Returning data/data.js when requested
    App.reqres.setHandler('data', function() {
        return data;
    });

    // Return the application instance.
    return App;
});
