/*
It shows popup on select button block. User can modify html of selected block inside popup
 */
window.ExternalAiAssistant = (function() {
    var externalAssist;
    var callback;
    var inputText;

    var close = function() {
        externalAssist.style.visibility = 'hidden';
    };
    var cancelAndClose = function() {
        callback(inputText);
        close();
    };

    var initExternalAssistElement = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalAiAssistant" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Update Text</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div style="padding: 10px">\
                            <label style="display: inline-block; width: 100px" for="text">Text</label>\
                            <textarea style="width: 500px; height: 500px" id="text"></textarea>\
                        </div>\
                    </div>\
                    <div style="padding: 20px">\
                        <button class="okButton">OK</button>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        externalAssist = document.getElementById('externalAiAssistant');
        externalAssist.querySelector('.close').addEventListener('click', cancelAndClose);
        externalAssist.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!e.target.matches('.okButton')) {
                return;
            }
            const text = externalAssist.querySelector('#text').value;

            callback(text);
            close();
        });
    };

    var renderExternalAssist = function() {
        if (!externalAssist) {
            initExternalAssistElement();
        }
        externalAssist.style.visibility = 'visible';
    };


    return {
        open: function(input, cb) {
            inputText = input;
            callback = cb;
            renderExternalAssist();
            externalAssist.querySelector('#text').value = inputText;
        },
    };
})();
