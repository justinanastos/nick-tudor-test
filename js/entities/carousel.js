define(['app',
    'data/carousel',

    'backbone-relational'
], function(App, carouselData) {
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var API;

        Entities.CarouselBlock = Backbone.RelationalModel.extend({

        });

        Entities.CarouselBlocks = Backbone.Collection.extend({
            model: Entities.CarouselBlock
        });

        Entities.Carousel = Backbone.RelationalModel.extend({
            relations: [
                {
                    collectionType: Entities.CarouselBlocks,
                    key: 'blocks',
                    relatedModel: Entities.CarouselBlock,
                    type: Backbone.HasMany
                }
            ]
        });

        // Public API
        API = {
            getCarousel: function() {
                var stuff = new Entities.Carousel(carouselData);

                return stuff;
            }
        };

        App.reqres.setHandlers({
            'get:carousel:entity': API.getCarousel
        });
    });
});
