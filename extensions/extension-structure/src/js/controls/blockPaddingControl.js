import {CONTROL_NAME_BLOCK_PADDING} from '../const';

const DEFAULT_VALUES = {left: 20, top: 20, right: 20, bottom: 0};

export default {
    name: CONTROL_NAME_BLOCK_PADDING,

    translate(key, params) {
        return this.extension.stripoApi.translate(key, params);
    },

    getLabel() {
        return this.translate('settings.controls.blockPadding.label');
    },

    getMobileLabel() {
        return this.translate('settings.controls.blockPadding.mobile.label');
    },

    getPaddingStyleValue() {
        return this.getPaddingsValuesFromElement() || DEFAULT_VALUES;
    },

    getDomElementsToApplyValue() {
        return [this.initialDomElement];
    }
}
