// Poyfill for window.location.origin
define(function() {

    var portPrepend = '';

    if (!window.location.origin) {
        if (window.location.port !== '') {
            portPrepend = ':';
        }
        window.location.origin = window.location.protocol + '//' + window.location.hostname + portPrepend + window.location.port;
    }
});
