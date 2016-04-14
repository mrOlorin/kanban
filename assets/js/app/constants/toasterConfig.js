(function () {
    'use strict';

    angular.module('Kanban')
            .constant('toasterConfig', {
                'limit': 0, // limits max number of toasts 
                'tap-to-dismiss': true,
                'close-button': true,
                'newest-on-top': true,
                //'fade-in': 1000,            // done in css
                //'on-fade-in': undefined,    // not implemented
                //'fade-out': 1000,           // done in css
                // 'on-fade-out': undefined,  // not implemented
                //'extended-time-out': 1000,    // not implemented
                'time-out': 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
                'icon-classes': {
                    error: 'toast-error',
                    info: 'toast-info',
                    wait: 'toast-wait',
                    success: 'toast-success',
                    warning: 'toast-warning'
                },
                'body-output-type': '', // Options: '', 'trustedHtml', 'template', 'templateWithData'
                'body-template': 'toasterBodyTmpl.html',
                'icon-class': 'toast-info',
                'position-class': 'toast-top-right',
                'title-class': 'toast-title',
                'message-class': 'toast-message',
                'mouseover-timer-stop': true // stop timeout on mouseover and restart timer on mouseout
            });
})();
