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
            facebook: '../vendor/facebook/index',
            fastclick: '../vendor/fastclick/lib/fastclick',
            Handlebars: '../vendor/handlebars/handlebars',
            hbars: '../vendor/requirejs-handlebars/hbars',
            jquery: '../vendor/jquery/dist/jquery',
            marionette: '../vendor/backbone.marionette/lib/core/backbone.marionette',
            'marionette.babyBird': '../vendor/marionette.babyBird/lib/marionette.babyBird',
            'marionette.regionChildCloseEvent': '../vendor/marionette.regionChildCloseEvent/lib/marionette.regionChildCloseEvent',
            'marionette-transitions': '../vendor/marionette-transitions/marionette-transitions',
            modernizr: '../vendor/modernizr/modernizr',
            polyfillLocationOrigin: '../vendor/polyfillLocationOrigin/lib/polyfillLocationOrigin',
            text: '../vendor/requirejs-text/text',
            twitter: '../vendor/twitter/index',
            underscore: '../vendor/underscore/underscore',
            'underscore.string': '../vendor/underscore.string/lib/underscore.string'
        },
        shim: {
            'backbone-computedfields': ['backbone'],
            facebook: {
                exports: 'FB'
            },
            ga: {
                exports: 'ga'
            },
            Handlebars: {
                exports: 'Handlebars'
            },
            hbars: ['text', 'Handlebars'],
            modernizr: {
                exports: 'Modernizr'
            },
            twitter: {
                exports: 'twttr'
            }
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
