import {CONTROL_NAME_CARDS_IN_ROW_COUNT, ORIENTATION_VERTICAL} from '../const';
import baseControl from "./baseControl";

export default {
    ...baseControl,
    name: CONTROL_NAME_CARDS_IN_ROW_COUNT,

    render() {
        this.jContainer.html(this.getControlMarkup());
        this.numberSelector = this.jContainer.find('number-selector')[0];
        this.numberSelector.props.value = this.panelState.blockConfig.rowCount;
        this.numberSelector.props.onChange = this.onChange.bind(this);
    },

    onChange(value) {
        this.extension.stripoApi.runWithDelay('totalCountChange', () => {
            this.panelState.blockConfig.rowCount = value;
            this.updateLayout();
            this.applyChangesImmediately();
        }, 300);
    },

    layoutChanged() {
        if (this.isControlVisible()) {
            this.numberSelector.props.value = this.panelState.blockConfig.rowCount;
        }
        this.updateControlVisibility();
    },

    getControlMarkup() {
        return `<number-selector label="${this.translate('settings.controls.rowCount.label')}" 
            min="1" max="4" step="1"></number-selector>`;
    },

    isControlVisible() {
        return this.isValuableBlock() && this.panelState.blockConfig.orientation == ORIENTATION_VERTICAL;
    }
}