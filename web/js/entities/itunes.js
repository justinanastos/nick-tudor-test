define(['app'
], function(App) {
    App.module('Entities.iTunes', function(Entities, App, Backbone, Marionette, $, _) {
        var API;

        Entities.TopSong = Backbone.Model.extend({
            idAttribute: 'trackId'
        });

        Entities.TopSongs = Backbone.Collection.extend({
            model: Entities.TopSong,

            url: 'https://itunes.apple.com/search',

            parse: function(data) {
                return data.results;
            }
        });

        // Public API
        API = {
            getTopSongs: function() {
                var result = new Entities.TopSongs();

                result.fetch({
                    dataType: 'jsonp',
                    data: {
                        term: '*',
                        limit: 20,
                        media: 'music'
                    }
                });

                return result;
            }
        };

        App.reqres.setHandlers({
            'get:itunes:top:songs': API.getTopSongs
        });
    });

    return App.Entities.iTunes;
});
