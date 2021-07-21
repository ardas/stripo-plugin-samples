import {CONTROL_NAME_CARD_BUTTON_STRETCH, ORIENTATION_VERTICAL} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_STRETCH,
    themeKey: 'buttonStretch',

    applyThemeFromConfig() {
        const configValue = this.getThemeValueFromConfig();
        const forceUpdate = !!this.panelState.blockConfig.groups.length;
        if (null == configValue) {
            this.updateControlValue(null, forceUpdate);
        } else {
            this.updateControlValue({stretched: !!this.getThemeValueFromConfig()}, forceUpdate);
        }
    },

    isControlVisible() {
        return this.panelState.blockConfig.orientation == ORIENTATION_VERTICAL &&
            this.isValuableBlock() &&
            !this.getVariableItem().hidden;
    }
}
