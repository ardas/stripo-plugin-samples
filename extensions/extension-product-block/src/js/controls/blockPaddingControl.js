import {CONTROL_NAME_BLOCK_PADDING, EVENT_NAME_LAYOUT_CHANGED} from '../const';
import baseControl from "./baseControl";
import {isEqual} from 'lodash';

const DEFAULT_VALUES = {left: 20, top: 20, right: 20, bottom: 0};
const EMPTY_VALUES = {all: null, left: null, top: null, right: null, bottom: null};
const EMPTY_PADDINGS = {desktop: {...EMPTY_VALUES}, mobile: {...EMPTY_VALUES}};

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_PADDING,
    themeKey: 'blockPadding',

    onActivated() {
      this.registerSettingsEventListener(EVENT_NAME_LAYOUT_CHANGED, this.layoutChanged.bind(this));
      console.log('>>>>>>>>>>>>>>>>>>>>>. onActivated', this);
      console.log('getValueFromElement', this.getValueFromElement());
      console.log('getThemeValueFromConfig', this.getThemeValueFromConfig());

      const valueFromElement = this.getValueFromElement();
      if (valueFromElement && !this.isValuesEmpty(valueFromElement) && !isEqual(valueFromElement, this.getThemeValueFromConfig())) {
          this.controlValueUpdated(this.getValueFromElement());
      }
    },

    isValuesEmpty(paddings) {
        return isEqual(paddings, EMPTY_PADDINGS);
    },

    getLabel() {
        return this.translate('settings.controls.blockPadding.label');
    },

    getMobileLabel() {
        return this.translate('settings.controls.blockPadding.mobile.label');
    },

    getValueFromElement() {
        return this.getPaddingsValuesFromElement();
    },

    getPaddingStyleValue() {
        const valueFromElement = this.getValueFromElement();
        if (valueFromElement && !this.isValuesEmpty(valueFromElement)) {
            return valueFromElement;
        }
        if (this.panelState.blockConfig.theme && this.panelState.blockConfig.theme.blockPadding) {
            return this.panelState.blockConfig.theme.blockPadding;
        }
        return DEFAULT_VALUES;
    },

    getDomElementsToApplyValue() {
        return this.initialDomElement.querySelectorAll('.esd-structure');
    },

    isControlVisible() {
        console.log('isControlVisible', this.isValuableBlock());
        return this.isValuableBlock();
    }
}
