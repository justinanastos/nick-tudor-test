// Require that the application be included first.
define([
    'app',
    'apps/example/exampleController'
], function(App, Controller) {
    App.module('ExampleApp', function(ExampleApp, App, Backbone, Marionette, $, _) {
        // Do not start automatically
        this.startWithParent = false;
        // Create new router for example app
        ExampleApp.Router = new Marionette.AppRouter({
            appRoutes: {
                // Match when navigating to the root call the `show()` method
                '': 'show'
            },
            controller: {
                show: function() {
                    // Execute the `example:show` command
                    App.execute('example:show');
                }
            }
        });
        // Respond to the `example:show` command
        App.commands.setHandler('example:show', function() {
            // If ExampleApp.exampleController is `undefined`, create a new
            // instance of the exampleController
            if (_.isUndefined(ExampleApp.exampleController)) {
                ExampleApp.exampleController = new Controller();
            }
            // Change the URL to the root
            App.navigate('');
            // Call `show()` on the exampleController
            ExampleApp.exampleController.show();
        });
    });
    // It's best practice to return the ExampleApp
    return App.ExampleApp;
});
