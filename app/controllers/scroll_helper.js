/**
 * ZUIX - ScrollHelper Controller
 *
 * @version 1.0.1 (2017-06-16)
 * @author Gene
 *
 */

zuix.controller(function (cp) {

    cp.init = function () {
        cp.options().html = false;
        cp.options().css = false;
    };

    cp.create = function () {
        cp.view().on('scroll', scrollCheck);
    };

    var scrollInfo = {
        lastTop: 0,
        timestamp: 0
    };

    function scrollCheck(e) {
        var scrollable = e.target;
        var scrollTop;
        var scrollHeight;
        var visibleHeight;

        if (scrollable === document) {
            scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            scrollHeight = document.body.offsetHeight;
            visibleHeight = document.documentElement.offsetHeight;
        } else {
            scrollTop = scrollable.scrollTop;
            scrollHeight = scrollable.scrollHeight;
            visibleHeight = scrollable.offsetHeight;
        }

        var now = new Date().getTime();
        var endScroll = scrollHeight-scrollTop-visibleHeight;
        var dy = scrollTop - scrollInfo.lastTop;
        if ((endScroll === 0 || scrollTop === 0)) {
            cp.trigger('scroll_change', { event: scrollTop === 0 ? 'hitTop' : 'hitBottom', delta: dy });
        } else if (now - scrollInfo.timestamp > 200) {
            scrollInfo.timestamp = now;
            cp.trigger('scroll_change', { event: 'moving', delta: dy });
            scrollInfo.lastTop = scrollTop;
        }
    }

});