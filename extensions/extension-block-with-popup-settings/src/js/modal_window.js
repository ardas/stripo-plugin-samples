import modalWindowLayout from './layout/modalWindowLayout.html';

let fontSizeModal;
let selectedBlock;
let editorApi

export function openModalWindow(block, stripoApi) {
    selectedBlock = block;
    editorApi = stripoApi;
    if (!fontSizeModal) {
        initLibrary();
    }

    selectActiveFontSize(block);
    fontSizeModal.css('visibility', 'visible');
}


function initLibrary() {
    const div = document.createElement('div');
    div.innerHTML = modalWindowLayout;
    document.body.appendChild(editorApi.jQuery(modalWindowLayout)[0]);

    fontSizeModal = editorApi.jQuery('#fontSizeModal');
    fontSizeModal.find('.close').click(close);
    fontSizeModal.find('input[type=radio]').change(updateBlockFontSize);
}

function close() {
    selectedBlock = null;
    fontSizeModal.css('visibility', 'hidden');
    editorApi.resetElementSelection();
}

function selectActiveFontSize(block) {
    const fontSize = block.find('.headerBlockContent').css('font-size');
    fontSizeModal.find(`input[name=headerFontSize][value="${fontSize}"]`).prop('checked', true);
}

function updateBlockFontSize(e) {
    selectedBlock.find('.headerBlockContent').css('font-size', e.target.value);
}
