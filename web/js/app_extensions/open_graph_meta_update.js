define(['app'], function(App) {
    App.module('AppExtensions.OpenGraphMetaUpdate', function(OpenGraphMetaUpdate, App, Backbone, Marionette, $, _) {

        var TITLE_TAG_DIVIDER = ' | '
        var $descriptionMetaTag;
        var $head;
        var $imageMetaTag;
        var $titleMetaTag;
        var $titleTag;
        var $urlMetaTag;

        // These default will not be obeyed, they are here just to show that
        // these are the properties we use.
        var metaModel = new Backbone.Model({
            defaults: {
                title: '',
                url: '',
                description: '',
                image: ''
            }
        });

        //on property change
        metaModel.on('change', function(metaModel) {
            var appTitle = App.request('data').openGraph.shareTitle;
            var shareTitle = metaModel.get('title');
            //find the meta tag
            $descriptionMetaTag.attr('content', metaModel.get('description'));
            $imageMetaTag.attr('content', metaModel.get('image'));
            $urlMetaTag.attr('content', metaModel.get('url'));

            // Set the <title> tag
            // but first, check to see if the section's title is the
            // same as the site's. For example, we dont want:
            // Art, Copy & Code | Art, Copy & Code
            if (appTitle !== shareTitle) {
                $titleTag.text(shareTitle + TITLE_TAG_DIVIDER + appTitle);
                $titleMetaTag.attr('content', shareTitle + TITLE_TAG_DIVIDER + appTitle);
            } else {
                $titleTag.text(shareTitle);
                $titleMetaTag.attr('content', shareTitle);
            }
        });

        //use jquery to get the DOM elements
        $head = $('head');
        $descriptionMetaTag = $head.children('meta[property="og:description"]');
        $imageMetaTag = $head.children('meta[property="og:image"]');
        $titleMetaTag = $head.children('meta[property="og:title"]');
        $titleTag = $head.children('title');
        $urlMetaTag = $head.children('meta[property="og:url"]');

        //can be any model as long as it follows this interface
        App.commands.setHandler('app:extensions:openGraphMetaUpdate', function(model) {
            //if no model, use the defaults from web/js/data/data.js
            if (_.isUndefined(model)) {
                model = new Backbone.Model(App.request('data').openGraph);
            }

            if (!_.isUndefined(model.get('shareDescription'))) {
                metaModel.set('description', model.get('shareDescription'));
            }
            if (!_.isUndefined(model.get('shareImage'))) {
                metaModel.set('image', model.get('shareImage'));
            }
            if (!_.isUndefined(model.get('shareTitle'))) {
                metaModel.set('title', model.get('shareTitle'));
            }
            if (!_.isUndefined(model.get('shareUrl'))) {
                metaModel.set('url', model.get('shareUrl'));
            } else {
                model = new Backbone.Model(App.request('data').openGraph);
                metaModel.set('url', model.get('shareUrl'));
            }
        });
    });
});
