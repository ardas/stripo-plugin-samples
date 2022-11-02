window.ExternalPreviewPopup = (function() {
    var externalPreviewPopup;

    var close = function() {
        externalPreviewPopup.parentNode.remove();
        externalPreviewPopup = null;
    };

    var onMobileIframeLoaded = function() {
        const frameDocument = document.getElementById('iframeMobile').contentDocument;
        frameDocument.documentElement.style.setProperty('overflow-x', 'visible', 'important');

        frameDocument.body.style.setProperty('overflow-y', 'scroll', 'important');
        frameDocument.body.style.setProperty('visibility', 'visible', 'important');

        const isAdaptive = !frameDocument.documentElement.querySelector('.gmail-fix');

        if (!isAdaptive) {
            const clientWidth = frameDocument.documentElement.clientWidth;
            const scrollWidth = frameDocument.documentElement.scrollWidth;
            const scale = (clientWidth / scrollWidth).toFixed(2);

            frameDocument.documentElement.style.setProperty('height', '100%', 'important');
            frameDocument.documentElement.style.setProperty('transform', `scale(${scale})`, 'important');
            frameDocument.documentElement.style.setProperty('transform-origin', 'top left', 'important');
            frameDocument.body.style.setProperty('overflow-x', 'hidden', 'important');
        }
    };

    var initPreviewPopup = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalPreviewPopup">\
                <div class="modal-container">\
                    <div class="modal-header-container">\
                        <div>\
                           <button type="button" class="close modal-close-button">\
                                <span>×</span>\
                            </button>\
                            <h4 class="modal-title">External Preview Popup</h4>\
                        </div>\
                    </div>\
                    <div id="content" style="padding: 15px;" class="preview-container-fluid">\
                       <div class="preview-row">\
                            <div class="preview-col-sm-8">\
                                <div class="esdev-desktop-device">\
                                    <div class="esdev-email-window-panel">\
                                        <div class="esdev-email-subject" style="min-height: 20px"></div>\
                                    </div>\
                                    <div class="esdev-desktop-device-screen">\
                                        <iframe id="iframeDesktop" frameborder="0" width="100%" height="642"></iframe>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="preview-col-sm-4 esdev-no-padding-left">\
                                <div class="esdev-mobile-device center-block">\
                                    <div class="esdev-mobile-device-screen">\
                                        <img src="mobile-view-top-bar.png" alt="">\
                                        <iframe id="iframeMobile" frameborder="0" width="100%" height="459"></iframe>\
                                        <img class="esdev-mail-bottom-bar" src="mobile-view-bottom-bar.png" alt="">\
                                    </div>\
                                </div>\
                            </div>\
                       </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalPreviewPopup = document.getElementById('externalPreviewPopup');
        externalPreviewPopup.querySelector('.close').addEventListener('click', close);

        document.getElementById('iframeMobile').addEventListener('load', onMobileIframeLoaded);
    };

    var openPreviewPopup = function(html, ampHtml) {
        initPreviewPopup();
        updateContent(html, ampHtml);
        externalPreviewPopup.style.visibility = 'visible';
    };

    var updateContent = function(html, ampHtml) {
        let htmlToSet = ampHtml || html;
        var iframeDesktop = document.querySelector('#iframeDesktop');
        iframeDesktop.contentWindow.document.open('text/html', 'replace');
        iframeDesktop.contentWindow.document.write(htmlToSet);
        iframeDesktop.contentWindow.document.close();

        var iframeMobile = document.querySelector('#iframeMobile');
        iframeMobile.contentWindow.document.open('text/html', 'replace');
        iframeMobile.contentWindow.document.write(htmlToSet);
        iframeMobile.contentWindow.document.close();
    };

    return {
        openPreviewPopup: openPreviewPopup
    };
})();
