import {CONTROL_NAME_BLOCK_BACKGROUND_COLOR} from '../const';

export default {
    name: CONTROL_NAME_BLOCK_BACKGROUND_COLOR,

    getTargetElements() {
        return [this.initialDomElement];
    },

    getInitialColor() {
        return this.getTargetElements()[0].getAttribute('bgcolor');
    }
}