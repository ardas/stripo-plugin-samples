window.ExternalBlockContentControl = (function() {
    var externalPopup;
    var callback;

    var close = function() {
        externalPopup.style.visibility = 'hidden';
    };

    var initExternalPopupElement = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalBlockContentControlPopup" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Magic factory</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="padding: 10px">\
                            <button id="replaceWithImageBtn">Replace with image</button>\
                            <button id="replaceWithButtonBtn">Replace with button</button>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);
        externalPopup = document.getElementById('externalBlockContentControlPopup');
        externalPopup.querySelector('.close').addEventListener('click', close);
        externalPopup.querySelector('#replaceWithImageBtn').addEventListener('click', applyImageBlockHtml);
        externalPopup.querySelector('#replaceWithButtonBtn').addEventListener('click', applyButtonBlockHtml);
    };

    var renderExternalAssist = function() {
        if (!externalPopup) {
            initExternalPopupElement();
        }
        externalPopup.style.visibility = 'visible';
    };

    var applyImageBlockHtml = function() {
        callback(`<td align="center" class="esd-block-image" style="font-size: 0px;">
            <a target="_blank">
                <img src="https://ffl.dev.stripocdn.email/content/guids/CABINET_96bca9660e8b45392dc0f30ef22e97fd738e32625592cd33577592104f0e9cf1/images/stripo.jpg" alt width="126">
            </a>
        </td>`);

        close();
    }

    var applyButtonBlockHtml = function() {
        callback(`<td align="center" class="esd-block-button es-p10b">
            <span class="es-button-border">
                <a href class="es-button" target="_blank"> Button </a>
            </span>
        </td>`);

        close();
    }

    return {
        open: function(htmlCodeOfBlock, replaceHtmlCodeOfBlockCallback) {
            console.log('HTML CODE: ', htmlCodeOfBlock);

            callback = replaceHtmlCodeOfBlockCallback;
            renderExternalAssist();
        },

        contextMenuTitle: 'Magic factory',
        contextMenuIcon: 'https://rf.stripocdn.email/content/guids/CABINET_c4aa6e445e77c0a0872dc084ef3a17cd9dc5b402ce2ab34f45da5bae21f078fe/images/magic.png',

        //Starting from 0
        contextMenuPositionIndex: 2,

        // List of blocks:
        // - 'Block Img'
        // - 'Block Text'
        // - 'Block Button'
        // - 'Block Spacer'
        // - 'Block Video'
        // - 'Block Social'
        // - 'Block Banner'
        // - 'Block Timer'
        // - 'Block Menu'
        // - 'Block HTML'
        // - 'Block Amp Carousel'
        // - 'Block Amp Accordion'
        // - 'Block Amp Form'
        // - `${extension.name}`
        applyToBlocks: ['Block Text', 'Block Img']
    };
})();
