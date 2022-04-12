window.PopupLinksSettings = (function() {
    let popupContainer;
    let linkDomElement;
    let changeCallback;

    let close = function() {
        popupContainer.style.visibility = 'hidden';
    };

    let initLibrary = function() {
        const div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalPopupContainer" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 400px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span>×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Customize link event ID</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div>\
                            <label for="event-id-value-input">Event ID:</label>\
                            <input type="text" id="eventIdValueInput" style="width: 285px; padding: 8px 0 6px 6px; border: 1px solid #cccccc; border-radius: 17px; font-size: 14px">\
                        </div>\
                        <div>\
                            <button id="updateEventIdButton" \
                                style="color: #ffffff; background-color: #32cd4b; border: 1px solid transparent; border-radius: 17px; margin-top: 10px; height: 30px; width: 150px;">Update event ID</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        popupContainer = document.getElementById('externalPopupContainer');
        popupContainer.querySelector('.close').addEventListener('click', close);
        popupContainer.querySelector('#updateEventIdButton').addEventListener('click', function(e) {
            linkDomElement.setAttribute('event-id', popupContainer.querySelector('#eventIdValueInput').value);
            changeCallback();
            close();
        });
    };

    const render = function() {
        if (!popupContainer) {
            initLibrary();
        }
        popupContainer.querySelector('#eventIdValueInput').value = linkDomElement.getAttribute('event-id');
        popupContainer.style.visibility = 'visible';
    };


    return {
        openPopup: function(activeLinkDomElement, onChangeCallback) {
            linkDomElement = activeLinkDomElement;
            changeCallback = onChangeCallback;
            render();
        }
    };
})();
