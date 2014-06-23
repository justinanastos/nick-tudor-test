define(['backbone', 'marionette', 'underscore'], function(Backbone, Marionette, _) {
    var originalRender = Marionette.Renderer.render;

    // Override the `Marionette.Renderer.render` function to serialize the data
    // being passed. Handlebars cannot handle nested models and collections out
    // of the box; this will mitigate that issue.
    Marionette.Renderer.render = function(template, data) {
        return originalRender.call(this, template, convertToObject(data));
    };

    // Convert deeply nexted models and collections into a generic javascript
    // object.
    function convertToObject(data) {

        if (data instanceof Backbone.Model) {
            // Data is a model, return it's `toJSON()`.
            return convertToObject(data.toJSON());
        } else {
            // `data` is a plain object. Iterate through properties looking
            // for instances of `Backbone.Model`.

            // Clone `data` to not alter the original.
            data = _.clone(data);

            _.each(data, function(value, index) {
                if (value instanceof Backbone.Model) {
                    // Value is a model. Recurse.
                    data[index] = convertToObject(value);
                }
            });
        }

        return data;
    }
});
