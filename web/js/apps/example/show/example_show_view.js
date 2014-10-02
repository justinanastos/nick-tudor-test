define([
    'app',
    'hbars!apps/example/show/templates/layout',
    'hbars!apps/example/show/templates/block'
], function(App, layoutTemplate, blockTemplate) {
    App.module('ExampleApp.Show.View', function(View, App, Backbone, Marionette, $, _) {

        View.Layout = Marionette.LayoutView.extend({
            className: 'carousel',
            template: layoutTemplate,

            triggers: {
                'click @ui.backButton': 'back',
                'click @ui.nextButton': 'next'
            },

            regions: {
                carouselRegion: '.carousel-region'
            },

            ui: {
                backButton: '.back-button',
                nextButton: '.next-button'
            },

            modelEvents: {
                'change:page': 'onPageChange'
            },

            onShow: function() {
                this.onPageChange();
            },

            onPageChange: function() {
                var blocks = this.model.get('carouselData').get('blocks').length;
                var page = this.model.get('page');

                this.ui.nextButton.prop('disabled', page === blocks - 1);
                this.ui.backButton.prop('disabled', page === 0);
            }
        });

        View.Block = Marionette.ItemView.extend({
            className: 'carousel-block',
            template: blockTemplate
        });
    });

    return App.ExampleApp.Show.View;
});
