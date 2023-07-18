window.ExternalLinkPopup = (function() {
    var externalLink;
    var callback;

    var close = function() {
        externalLink.style.visibility = 'hidden';
    };
    var cancelAndClose = function() {
        close();
    };

    var initLink = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalLink" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Set Link</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="url">Url</label>\
                            <input style="width: 500px" id="url"/>\
                        </div>\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="fontFamily">Text</label>\
                            <input style="width: 500px" id="text"/>\
                        </div>\
                    </div>\
                    <div style="padding: 20px">\
                        <button class="okButton">OK</button>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalLink = document.getElementById('externalLink');
        externalLink.querySelector('.close').addEventListener('click', cancelAndClose);
        externalLink.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!e.target.matches('.okButton')) {
                return;
            }
            const url = externalLink.querySelector('#url').value;
            const text = externalLink.querySelector('#text').value;

            callback({text, url});
            close();
        });
    };

    var renderExternalLink = function() {
        if (!externalLink) {
            initLink();
        }
        externalLink.style.visibility = 'visible';
    };


    return {
        activate: function(params, linkCallback) {
            callback = linkCallback;
            renderExternalLink();
            externalLink.querySelector('#url').value = params.url;
            externalLink.querySelector('#text').value = params.text;
        }
    };
})();
