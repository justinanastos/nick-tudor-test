define(['app'], function(App) {
    App.module('AppExtensions.ElementInViewport', function(ElementInViewport, App, Backbone, Marionette, $, _) {
        App.reqres.setHandler('app:extensions:elementInViewport', function(el) {
            if (el instanceof $) {
                el = el[0];
            }

            var rect = el.getBoundingClientRect();

            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        });
    });
});
