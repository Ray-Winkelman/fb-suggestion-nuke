// ==UserScript==
// @name         Facebook Ad Nuke
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  I hate Facebook ads and suggestions.
// @author       Ray Winkelman
// @match        https://www.facebook.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    setTimeout(function() {
        var menu = $("#lefttCol");
        var feed = $("#stream_pagelet");
        $("#contentCol").empty();
        menu.prependTo("#contentCol");
        feed.appendTo("#contentCol");

        $("#appsNav").remove();

        var spamType = ['Suggested Page', 'Suggested Post', 'People You May Know'];

        function nuke(){
            setTimeout(function() {
                $.each(spamType, function(index, value) {
                    $("div:contains('"+value+"')").filter(function(){
                        return this.id.match(/substream_[0-9]/);
                    }).remove();
                });
                nuke();
            }, 3000);
        }
        nuke();
    }, 500);
})();
