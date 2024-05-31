window.ExternalMergeTags = (function() {
    var externalMergeTags;
    var selectCallback;
    var selectedMergeTag

    var close = function() {
        externalMergeTags.style.visibility = 'hidden';
    };
    var cancelAndClose = function() {
        close();
    };

    var initMergeTags = function() {
        var div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalMergeTags" style="background-color: rgba(0,0,0,.5); overflow: hidden; position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif;">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 900px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button class="close" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span aria-hidden="true">×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Your merge tags</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <div class="thumbnail" tag-value="{{Name}}" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag Name\
                        </div>\
                        <div class="thumbnail" tag-value="%%Phone%%" tag-label="User phone number" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag Phone\
                        </div>\
                        <div class="thumbnail" tag-value="Merge Tag 3" style="display: inline-block; width: 154px; height: 120px; cursor: pointer; padding: 4px; background-color: #ffffff; border: 1px solid #b80000; border-radius: 10px; margin-right: 10px">\
                            Merge Tag 3\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);

        //add style to the document for selected element
        const style = document.createElement('style');
        style.innerHTML = '#externalMergeTags .thumbnail.selected {color: blue; box-shadow: 0 0 0 2px blue; }';
        document.head.appendChild(style);

        externalMergeTags = document.getElementById('externalMergeTags');
        externalMergeTags.querySelector('.close').addEventListener('click', cancelAndClose);
        externalMergeTags.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!e.target.matches('.thumbnail')) {
                return;
            }
            const exampleOfMergeTagValue = e.target.getAttribute('tag-value');
            const exampleOfMergeTagLabel = e.target.getAttribute('tag-label');
            selectCallback(exampleOfMergeTagLabel
                ? {value: exampleOfMergeTagValue, label: exampleOfMergeTagLabel}
                : exampleOfMergeTagValue);
            close();
        });
    };

    var renderMergeTags = function() {
        if (!externalMergeTags) {
            initMergeTags();
        }
        const selectedElement = externalMergeTags.querySelector('.selected');
        selectedElement && selectedElement.classList.remove('selected');
        if (selectedMergeTag) {
            externalMergeTags.querySelector(`[tag-value="${selectedMergeTag}"]`).classList.add('selected');
        }
        externalMergeTags.style.visibility = 'visible';

    };


    return {
        open: function(mergeTagSelectCallback, mergeTag) {
            selectCallback = mergeTagSelectCallback;
            selectedMergeTag = mergeTag;
            renderMergeTags();
        },
        openOnClickByMergeTag: true,
    };
})();
