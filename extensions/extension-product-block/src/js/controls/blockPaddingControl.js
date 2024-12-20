import {CONTROL_NAME_BLOCK_PADDING, EVENT_NAME_LAYOUT_CHANGED} from '../const';
import baseControl from "./baseControl";
import {isEqual} from 'lodash';

const DEFAULT_VALUES = {left: 20, top: 20, right: 20, bottom: 0};

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_PADDING,
    themeKey: 'blockPadding',
    defaultValue: DEFAULT_VALUES,

    getLabel() {
        return this.translate('settings.controls.blockPadding.label');
    },

    getMobileLabel() {
        return this.translate('settings.controls.blockPadding.mobile.label');
    },

    getPaddingStyleValue() {
        return this.getValueFromElementOrConfigOrDefault();
    },

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll('.esd-structure');
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
