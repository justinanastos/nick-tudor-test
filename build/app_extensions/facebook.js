define(['facebook'], function(FB) {
    // Load the facebook SDK
    var appId;

    if (window.location.href.indexOf('artcopycode.com') !== -1) {
        // Production
        appId = '318341221652700';
    } else if (window.location.href.indexOf('appspot.com') !== -1) {
        // Staging
        appId = '318341221652700';
    } else if (window.location.href.indexOf('localhost') !== -1) {
        // Development
        appId = '318341301652692';
    }

    FB.init({
        appId: appId,
        version: 'v2.0'
    });
});
