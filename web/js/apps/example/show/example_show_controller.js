define([
    'app',
    'apps/example/show/example_show_view',

    'entities/carousel'
], function(App, View) {
    App.module('ExampleApp.Show', function(ExampleApp, App, Backbone, Marionette, $, _) {

        ExampleApp.Controller = Marionette.Controller.extend({
            initialize: function() {

                // Get the carousel and save it to the controller instance
                this.carouselData = App.request('get:carousel:entity');

                // Create the view model and bind it's events.
                this.viewModel = new Backbone.Model({
                    page: 0,
                    carouselData: this.carouselData.clone()
                });
                this.listenTo(this.viewModel, 'change:page', this.onChangePage);

                this.showLayout();
            },

            showLayout: function() {
                // Create the new layout
                this.layout = new View.Layout({model: this.viewModel});

                // Listen for it's show event
                this.listenTo(this.layout, 'show', this.onLayoutShow);

                // Listen for the `next` and `back` events from the layout.
                this.listenTo(this.layout, 'back', function() {
                    this.changePage(-1);
                });
                this.listenTo(this.layout, 'next', function() {
                    this.changePage(1);
                });

                // Show the layout, passing it the viewModel.
                this.show(this.layout, {
                    model: this.carouselData
                });
            },

            changePage: function(delta) {
                var blockCount = this.carouselData.get('blocks').length;
                var page = this.viewModel.get('page');

                // Change the page by `delta`.
                page += delta;

                if (page < 0) {
                    // If `page` is negative, then we overflowed. Set back
                    // to 0.
                    page = 0;
                } else if (page >= blockCount) {
                    // If the `page` is >= `blockCount`, then it will try to
                    // read past the end of the array. Set page back to the
                    // array length (0 indexed, so `-1`).
                    page = blockCount - 1;
                }

                // Set the `page` value with the value we calculated. If we
                // overflowed and had to correct the value, this will be
                // setting the value to what it already was, so it won't
                // fire a change event.
                this.viewModel.set('page', page);
            },

            onLayoutShow: function() {
                this.showBlock();
            },

            onChangePage: function() {
                this.showBlock();
            },

            showBlock: function() {
                var blockData;
                var blockView;
                var page = this.viewModel.get('page');

                // Get the currently selected block
                blockData = this.carouselData.get('blocks').at(page);

                // Instantiate the view
                blockView = new View.Block({model: blockData});

                // Show the view
                this.layout.carouselRegion.show(blockView);
            }
        });
    });

    return App.ExampleApp.Show.Controller;
});
