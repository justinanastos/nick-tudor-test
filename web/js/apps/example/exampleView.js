define([
    'app',
    'hbars!apps/example/templates/exampleLayout',
    'hbars!apps/example/templates/exampleItem'
], function(App, layoutTemplate, itemTemplate) {
    App.module('ExampleApp.View', function(View, App, Backbone, Marionette, $, _) {
        // Extend the Marionette LayoutView
        View.Layout = Marionette.LayoutView.extend({
            // Define regions for the layout. These regions need to exist in
            // the DOM
            regions: {
                bodyRegion: '.body-region'
            },

            className: 'example-app',

            template: layoutTemplate
        });
        // Extend the Marionette ItemView
        View.Item = Marionette.ItemView.extend({
            // Use the itemTemplate
            template: itemTemplate
        });
    });
    // Return the View definition
    return App.ExampleApp.View;
});
