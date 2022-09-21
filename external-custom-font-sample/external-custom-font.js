window.ExternalCustomFont = (function() {
    var externalCustomFont;
    var callback;

    var close = function() {
        externalCustomFont.style.visibility = 'hidden';
    };
    var cancelAndClose = function() {
        close();
    };

    var initCustomFont = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalCustomFont" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Add custom font</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="fontName">Font Name</label>\
                            <input style="width: 500px" id="fontName"/>\
                        </div>\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="fontFamily">Font Family</label>\
                            <input style="width: 500px" id="fontFamily"/>\
                        </div>\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="url">Url</label>\
                            <input style="width: 500px" id="fontUrl"/>\
                        </div>\
                    </div>\
                    <div style="padding: 20px">\
                        <button class="okButton">OK</button>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalCustomFont = document.getElementById('externalCustomFont');
        externalCustomFont.querySelector('.close').addEventListener('click', cancelAndClose);
        externalCustomFont.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!e.target.matches('.okButton')) {
                return;
            }
            const exampleOfMergeTagValue = e.target.getAttribute('tag-value');
            const name = externalCustomFont.querySelector('#fontName').value;
            const fontFamily = externalCustomFont.querySelector('#fontFamily').value;
            const url = externalCustomFont.querySelector('#fontUrl').value;

            console.log('{name, fontFamily, url}', {name, fontFamily, url});
            callback({name, fontFamily, url});
            close();
        });
    };

    var renderExternalCustomFont = function() {
        if (!externalCustomFont) {
            initCustomFont();
        }
        externalCustomFont.style.visibility = 'visible';
    };


    return {
        open: function(fontAddCallback) {
            callback = fontAddCallback;
            renderExternalCustomFont();
        }
    };
})();
