/*globals requirejs */

(function(undefined) {
    'use strict';
    define('ga', function() {
        return window.ga;
    });
    requirejs.config({
        paths: {
            backbone: '../vendor/backbone/backbone',
            'backbone-computedfields': '../vendor/backbone-computedfields/lib/amd/backbone.computedfields',
            'backbone-relational': '../vendor/backbone-relational/backbone-relational',
            'backbone-super': '../vendor/backbone-super/backbone-super/backbone-super',
            'backbone.babysitter': '../vendor/backbone.babysitter/lib/backbone.babysitter',
            'backbone.grouped-collection': '../vendor/Backbone.GroupedCollection/backbone.grouped-collection',
            'backbone.virtual-collection': '../vendor/Backbone.VirtualCollection/backbone.virtual-collection',
            'backbone.wreqr': '../vendor/backbone.wreqr/lib/backbone.wreqr',
            Handlebars: '../vendor/handlebars/handlebars',
            'handlebars.partialsWithParameters': '../vendor/handlebars-partials-with-parameters/lib/handlebars.partialsWithParameters',
            hbars: '../vendor/requirejs-handlebars/hbars',
            jquery: '../vendor/jquery/dist/jquery',
            marionette: '../vendor/backbone.marionette/lib/core/backbone.marionette',
            'marionette.babyBird': '../vendor/marionette.babyBird/lib/marionette.babyBird',
            'marionette.enhancedController': '../vendor/marionette.enhancedController/lib/marionette.enhancedController',
            text: '../vendor/requirejs-text/text',
            underscore: '../vendor/underscore/underscore',
            'underscore.string': '../vendor/underscore.string/lib/underscore.string'
        },
        shim: {
            'backbone-computedfields': ['backbone'],
            Handlebars: {
                exports: 'Handlebars'
            },
            hbars: ['text', 'Handlebars']
        },
        hbars: {
            extension: '.hbs'
        },
        // Load these dependencies before firing any `require` callbacks.
        deps: ['underscore',
            'underscore.string'
        ],
        // Callback to execute after `deps` are loaded.
        callback: function(_, underscorestring) {
            // Mixin `underscore.string` values into `underscore`.
            _.mixin(underscorestring.exports());
        },
        // No timeout on script loading.
        waitSeconds: 0
    });
    require(['app'], function(App) {
        App.start();
    });
}());
