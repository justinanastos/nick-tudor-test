define(['app'], function(App) {
    App.module('AppExtensions.Globals', function(Globals, App, Backbone, Marionette, $, _) {
        App.reqres.setHandler('app:extensions:globals', function() {
            return {
                breakPoints: {
                    mobile: 768
                }
            };
        });
    });
});
