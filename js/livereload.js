(function() {
    'use strict';
    var existing_script_tag = document.getElementsByTagName('script')[0];
    var host;
    var new_script_tag = document.createElement('script');
    var url;
    host = (location.host || 'localhost').split(':')[0];
    url = 'http://' + host + ':35740/livereload.js?snipver=1';
    new_script_tag.src = url;
    existing_script_tag.parentNode.insertBefore(new_script_tag, existing_script_tag);
})(); 