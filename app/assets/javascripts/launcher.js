// Launcher
$(document).ready(function() {
    console.log("*** *** *** request_settings");

    BrowserSpecific.dispatchMessage("request_settings");
    BrowserSpecific.dispatchMessage("klvkbd_LocalizationsRequest");

    setTimeout(function() {
        FocusManager.parse_for_input();
    }, 0);

    if(typeof Keyboard.observer === 'undefined' &&
       (typeof WebKitMutationObserver !== 'undefined' || typeof MutationObserver !== 'undefined')) {
        var MutationObserberObject = (typeof WebKitMutationObserver === 'undefined')?MutationObserver:WebKitMutationObserver;
        Keyboard.observer = new MutationObserberObject(function(mutations) {
            setTimeout(function() {
                mutations.forEach(function(mutation) {
                    for (var i = 0; i < mutation.addedNodes.length; i++) {
                        if(document.forms.length > 0 || $(mutation.addedNodes[i]).find('input').length > 0) {
                            console.log("launching FocusManager.parse_for_input on DOM mutation event");
                            FocusManager.parse_for_input();
                            break;
                        }
                    }
                })
            }, 100);
        });
        Keyboard.observer.observe(window.document.body, {
            subtree: true,
            childList: true,
            attribute: true
        });
    }
});