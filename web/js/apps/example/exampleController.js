define([
    'app',
    'apps/example/exampleView'
], function(App, View) {
    App.module('ExampleApp', function(ExampleApp, App, Backbone, Marionette, $, _) {
        // Extend the Marionette Controller
        ExampleApp.Controller = Marionette.Controller.extend({
            show: function() {
                var layout;
                // Create a new instance of `View.Layout`
                layout = new View.Layout();
                // When the layout is shown, add it's children
                layout.on('show', function() {
                    var item;
                    // Create a new instance of `View.Content`
                    item = new View.Item();
                    // Add layouts to their regions.
                    layout.body.show(item);
                });
                // Show the layout.
                App.exampleRegion.show(layout);
            }
        });
    });
    // Return the controller definition
    return App.ExampleApp.Controller;
});
