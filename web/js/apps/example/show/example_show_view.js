define([
    'app',
    'hbars!apps/example/show/templates/layout',
    'hbars!apps/example/show/templates/item'
], function(App, layoutTemplate, itemTemplate) {
    App.module('ExampleApp.Show.View', function(View, App, Backbone, Marionette, $, _) {

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

    return App.ExampleApp.Show.View;
});
