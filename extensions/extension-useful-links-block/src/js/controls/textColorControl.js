import {CONTROL_NAME_TITLE_TEXT_COLOR} from '../const';

export default {
    name: CONTROL_NAME_TITLE_TEXT_COLOR,

    getTargetElements() {
        return this.initialDomElement.querySelectorAll('.esd-title');
    },

    getLabel() {
        return this.extension.stripoApi.translate('settings.controls.titleTextColor.label');
    }
}