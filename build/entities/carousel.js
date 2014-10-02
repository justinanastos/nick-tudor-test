define(['app',
    'data/carousel',

    'backbone-relational'
], function(App, carouselData) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var API;

        Entities.Carousel = Backbone.RelationalModel.extend({
            defaults: {
                title: 'stuff'
            },
            relations: [
                {
                    collectionType: App.request('get:carousel:images:definition'),
                    key: 'blocks',
                    relatedModel: App.request('get:carousel:image:definition'),
                    type: Backbone.HasMany
                }
            ]
        });

        Entities.CarouselImage = Backbone.RelationalModel.extend({

        });

        Entities.CarouselImages = Backbone.Collection.extend({
            model: App.request('get:carousel:image:definition')
        });

        // Public API
        API = {
            getCarousel: function() {
                return new Entities.CarouselImage(carouselData);
            },
            getCarouselImageDefinition: function() {
                return Entities.CarouselImage;
            },
            getCarouselImagesDefinition: function() {
                return Entities.CarouselImages;
            }
        };

        App.reqres.setHandlers({
            'get:carousel:entity': API.getCarousel,
            'get:carousel:images:definition': API.getCarouselImagesDefinition,
            'get:carousel:image:definition': API.getCarouselImageDefinition
        });
    });
});
