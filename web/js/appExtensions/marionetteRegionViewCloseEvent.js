define(['marionette'], function(Marionette) {
    var originalClose;
    var originalShow;
    var onViewClosed;

    // Save the original `close` and `show` functions.
    originalClose = Marionette.Region.prototype.close;
    originalShow = Marionette.Region.prototype.show;

    // Define handler for when a region's child view is closed.
    onViewClosed = function(event) {
        // A child view was closed. Trigger an event.
        this.trigger('child:view:closed', this);
    };

    Marionette.Region.prototype.show = function(view) {
        // Call the original show function
        originalShow.apply(this, arguments);

        // If there is already a current view stored, then stop listening for it's
        // show.
        this.stopListening(this.currentView, 'close', onViewClosed);

        // Listen for when the view is closed.
        this.listenTo(this.currentView, 'close', onViewClosed);
    };

    Marionette.Region.prototype.close = function() {
        originalClose.apply(this, arguments);

        this.stopListening(this.currentView, 'close', onViewClosed);
    };
});
