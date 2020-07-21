import {CONTROL_NAME_CARD_BUTTON_STRETCH, ORIENTATION_VERTICAL} from '../../const';
import baseCompositionInternalControl from './baseCompositionInternalControl';

export default {
    ...baseCompositionInternalControl,
    name: CONTROL_NAME_CARD_BUTTON_STRETCH,
    themeKey: 'buttonStretch',

    isControlVisible() {
        return this.panelState.blockConfig.orientation == ORIENTATION_VERTICAL &&
            this.isValuableBlock() &&
            !this.getVariableItem().hidden;
    }
}