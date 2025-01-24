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
        this.updateSeparatorAndButtonVisibility();
        this.jContainer.find('.reset-button').on('click', () => {
            this.extension.resetLayout(this.jElement);
        });
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

    updateSeparatorAndButtonVisibility() {
        this.setControlsSeparatorVisible(!!this.jElement.attr(ATTR_NAME_RECOMMENDATION_GROUPS));
        this.setResetButtonVisible(!!this.jElement.attr(ATTR_NAME_RECOMMENDATION_GROUPS));
    },

    setResetButtonVisible(visible) {
      this.jContainer.find('.reset-button').css('display', visible ? 'block' : 'none');
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
        console.log('layoutChanged selectedGroups', this.getSelectedGroups());
        if (this.isControlVisible()) {
            this.dropDown.props.value = this.getSelectedGroups();
        }
        this.updateControlVisibility();
        this.updateSeparatorAndButtonVisibility();
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
            <div class="reset-button col-xs-12" style="margin-top: 15px">
                <button class="btn btn-default btn-success">
                    RESET
                </button>
            </div>
        </div>`;
    }
}