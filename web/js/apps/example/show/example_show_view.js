define([
    'app',
    'hbars!apps/example/show/templates/layout',
    'hbars!apps/example/show/templates/item'
], function(App, layoutTemplate, itemTemplate) {
    App.module('ExampleApp.Show.View', function(View, App, Backbone, Marionette, $, _) {

        View.SongView = Marionette.ItemView.extend({
            template: itemTemplate,
            tagName: 'li',
            className: 'song'
        });

        View.CompostiteView = Marionette.CompositeView.extend({
            className: 'top-song-list',
            template: layoutTemplate,
            childView: View.SongView,
            childViewContainer: '@ui.list',

            triggers: {
                'click @ui.backButton': 'back',
                'click @ui.nextButton': 'next',
                'click @ui.randomizeButton': 'randomize'
            },

            ui: {
                backButton: '.back-button',
                list: 'ul',
                nextButton: '.next-button',
                randomizeButton: '.randomize-button'
            },

            modelEvents: {
                'change:page': 'onPageChange'
            },

            onRender: function() {
                this.onPageChange();
            },

            onPageChange: function() {
                var page = this.model.get('page');
                var pages = Math.ceil(this.model.get('collection').length / 4);

                this.ui.list.attr('data-page', page);

                this.ui.backButton.prop('disabled', page === 0);
                this.ui.nextButton.prop('disabled', page >= pages - 1);
            }
        });
    });

    return App.ExampleApp.Show.View;
});
