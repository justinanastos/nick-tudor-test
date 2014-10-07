define([
    'app',
    'apps/example/show/example_show_view',

    'entities/itunes'
], function(App, View) {
    App.module('ExampleApp.Show', function(ExampleApp, App, Backbone, Marionette, $, _) {

        ExampleApp.Controller = Marionette.Controller.extend({
            initialize: function() {

                // Get the carousel and save it to the controller instance
                window.i = this.iTunesTopSongs = App.request('get:itunes:top:songs');

                // Create the view model and bind it's events.
                this.viewModel = new Backbone.Model({
                    page: 0,
                    collection: this.iTunesTopSongs
                });
                this.listenTo(this.viewModel, 'change:page', this.onChangePage);

                this.showLayout();
            },

            showLayout: function() {
                this.layout = new View.CompostiteView({
                    model: this.viewModel,
                    collection: this.iTunesTopSongs
                });

                // Listen for it's show event
                this.listenTo(this.layout, 'show', this.onLayoutShow);

                // Show the layout, passing it the viewModel.
                this.show(this.layout, {
                    model: this.iTunesTopSongs,
                    loading: true
                });
            },

            onLayoutShow: function() {
                // Listen for the `next` and `back` events from the layout.
                this.listenTo(this.layout, 'back', function() {
                    this.changePage(-1);
                });

                this.listenTo(this.layout, 'next', function() {
                    this.changePage(1);
                });

                this.listenTo(this.layout, 'randomize', function() {
                    this.iTunesTopSongs.comparator = function(a, b) {
                        var result = Math.random(1) - 0.5;

                        return result;
                    };

                    this.iTunesTopSongs.sort();

                    this.changePage(0);
                });
            },

            changePage: function(delta) {
                var page = this.viewModel.get('page');
                var pageCount = Math.ceil(this.iTunesTopSongs.length / 4);

                page += delta;

                if (page <= 0) {
                    // If `page` is negative, then we overflowed. Set back
                    // to 0.
                    page = 0;
                } else if (page >= pageCount) {
                    // If the `page` is >= `pageCount`, then it will try to
                    // read past the end of the array. Set page back to the
                    // array length (0 indexed, so `-1`).
                    page = pageCount - 1;
                }

                // Set the `page` value with the value we calculated. If we
                // overflowed and had to correct the value, this will be
                // setting the value to what it already was, so it won't
                // fire a change event.
                this.viewModel.set('page', page);
            },

            onChangePage: function() {

            }
        });
    });

    return App.ExampleApp.Show.Controller;
});
