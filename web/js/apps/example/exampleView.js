define([
    'app',
    'hbars!apps/example/templates/exampleLayout',
    'hbars!apps/example/templates/exampleItem'
], function(App, layoutTemplate, itemTemplate) {
    App.module('ExampleApp.View', function(View, App, Backbone, Marionette, $, _) {

        View.Layout = Marionette.LayoutView.extend({
            regions: {
                bodyRegion: '.body-region'
            },

            className: 'example-app',

            template: layoutTemplate
        });

        View.Item = Marionette.ItemView.extend({
            template: itemTemplate
        });
    });

    return App.ExampleApp.View;
});
