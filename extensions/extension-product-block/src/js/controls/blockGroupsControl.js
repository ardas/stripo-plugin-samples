import {ATTR_NAME_RECOMMENDATION_GROUPS, CONTROL_NAME_BLOCK_GROUPS} from '../const';
import baseControl from "./baseControl";

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_GROUPS,

    render() {
        this.options = this.getOptions();
        this.selectedGroups = this.getSelectedGroups();
        this.jContainer.html(this.getControlMarkup());
        this.dropDown = this.jContainer.find('dropdown-input')[0];
        this.updateSeparatorVisibility();
    },

    getOptions() {
        if (!this.getGroupsFromStripoConfig()) {
            return [];
        }
        return this.getGroupsFromStripoConfig().map(g => {
            return {
                value: g.id,
                label: g.name,
                subLabel: this.translate('settings.controls.groups.units', [g.count]),
                disabled: this.panelState.disabledGroupsIds.includes(g.id)
            }
        });
    },

    getSelectedGroups() {
        return (this.panelState.blockConfig.groups || []).map(g => g.id);
    },

    updateSeparatorVisibility() {
        this.setControlsSeparatorVisible(!!this.jElement.attr(ATTR_NAME_RECOMMENDATION_GROUPS));
    },

    onChange(selectedGroupsIds) {
        setTimeout(()=>{
            this.panelState.blockConfig.groups = [];
            selectedGroupsIds.forEach(groupId => {
                this.panelState.blockConfig.groups.push(this.getGroupsFromStripoConfig().find(g => g.id == groupId));
            });
            this.panelState.blockConfig = this.extension
                .wrapBlockWithTypeIdentifierAttributesAndGetConfig(this.jElement, this.panelState.blockConfig);
            this.updateLayout();
            this.extension.updateBlockLabel(this.jElement);
            this.applyChanges();
        }, 0);
    },

    getGroupsFromStripoConfig() {
        return this.extension.stripoConfig.productDemoBlock.groups;
    },

    layoutChanged() {
        if (this.isControlVisible()) {
            this.dropDown.props.value = this.getSelectedGroups();
        }
        this.updateControlVisibility();
        this.updateSeparatorVisibility();
    },

    getControlMarkup() {
        return `<div class="form-group">
            <div class="col-xs-12">
                <dropdown-input classes="product-groups-picker"
                                buttonWrapperClasses="form-control"
                                optionTextClass="text"
                                globalScope = "${this.name}"
                                mbBindProp-values="options"
                                mbBindProp-value="selectedGroups"
                                mbBindProp-on-selected="onChange"
                                placeholder="${this.translate('settings.controls.groups.empty')}"
                                multi="true">                                       
                </dropdown-input>
            </div>
        </div>`;
    }
}