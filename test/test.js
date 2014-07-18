/*jslint node: true*/
'use strict';

var assert = require('assert');

var webdriver = require('browserstack-webdriver');
var test = require('browserstack-webdriver/testing');

test.describe('Base Marionette', function() {
    var driver;

    test.before(function() {
        var capabilities = {
             'browserstack.local': 'true',
             browserName: 'firefox',
             // Replace the following two fields with your browserstack user/key
             'browserstack.user': 'travisglines1',
             'browserstack.key': 'ry7rcSN4xspxxpqDh9zK'
         };
        driver = new webdriver.Builder().
            usingServer('http://hub.browserstack.com/wd/hub').
            withCapabilities(capabilities).
            build();
    });
    
    test.it('Should find the example region rendered on the page', function() {
        var url = 'http://localhost:12080';
        driver.get(url);
        driver.wait(function() {
            console.log('Server response received from', url);
            driver.findElement(webdriver.By.className('example-region')).then(function(elements) {
                console.log(elements);
            });
        }, 1000);
    });

    test.after(function() { 
        driver.quit();
    });
});
