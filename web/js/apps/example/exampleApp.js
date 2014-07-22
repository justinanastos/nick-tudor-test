define([
    'app',
    'apps/example/exampleController'
], function(App, Controller) {
    App.module('ExampleApp', function(ExampleApp, App, Backbone, Marionette, $, _) {
        var API;

        // Do not start automatically
        this.startWithParent = false;

        ExampleApp.Router = Marionette.AppRouter.extend({
            appRoutes: {
                '': 'show'
            }
        });

        API = {
            show: function() {
                new ExampleApp.Controller({
                    region: App.exampleRegion
                });

                // Notify application
                App.trigger('example:show');
            }
        };

        App.addInitializer(function() {
            new ExampleApp.Router({
                controller: API
            });
        });

        App.commands.setHandler('example:show', function() {
            App.navigate('');

            API.show();
        });
    });

    return App.ExampleApp;
});
