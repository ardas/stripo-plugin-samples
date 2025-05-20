import {
    CONTROL_NAME_CARD_BUTTON_ALIGN,
    CONTROL_NAME_CARD_BUTTON_BORDER,
    CONTROL_NAME_CARD_BUTTON_BORDER_HOVER,
    CONTROL_NAME_CARD_BUTTON_BORDER_RADIUS,
    CONTROL_NAME_CARD_BUTTON_COLOR,
    CONTROL_NAME_CARD_BUTTON_EXTERNAL_PADDING,
    CONTROL_NAME_CARD_BUTTON_HOVER_COLOR,
    CONTROL_NAME_CARD_BUTTON_INTERNAL_PADDING,
    CONTROL_NAME_CARD_BUTTON_STRETCH,
    CONTROL_NAME_CARD_BUTTON_STYLE,
    CONTROL_NAME_CARD_BUTTON_TEXT,
    CONTROL_NAME_CARD_BUTTON_TEXT_COLOR,
    CONTROL_NAME_CARD_BUTTON_TEXT_HOVER_COLOR,
    CONTROL_NAME_CARD_COMPOSITION,
    CONTROL_NAME_CARD_IMAGE_SIZE,
    CONTROL_NAME_CARD_TEXT_ALIGN,
    CONTROL_NAME_CARD_TEXT_COLOR,
    CONTROL_NAME_CARD_TEXT_LINE_SPACING,
    CONTROL_NAME_CARD_TEXT_PADDING,
    CONTROL_NAME_CARD_TEXT_STYLE,
    ORIENTATION_VERTICAL
} from '../const';
import baseControl from './baseControl';

const HIDDEN_AREA_CLASS = 'hidden-area';
const VARIABLE_CONTROLS = {
    'p_image': [
        CONTROL_NAME_CARD_IMAGE_SIZE
    ],
    'p_name': [
        CONTROL_NAME_CARD_TEXT_COLOR,
        CONTROL_NAME_CARD_TEXT_ALIGN,
        CONTROL_NAME_CARD_TEXT_STYLE,
        CONTROL_NAME_CARD_TEXT_LINE_SPACING,
        CONTROL_NAME_CARD_TEXT_PADDING
    ],
    'p_vendor_code': [
        CONTROL_NAME_CARD_TEXT_COLOR,
        CONTROL_NAME_CARD_TEXT_ALIGN,
        CONTROL_NAME_CARD_TEXT_STYLE,
        CONTROL_NAME_CARD_TEXT_LINE_SPACING,
        CONTROL_NAME_CARD_TEXT_PADDING
    ],
    'p_dimensions': [
        CONTROL_NAME_CARD_TEXT_COLOR,
        CONTROL_NAME_CARD_TEXT_ALIGN,
        CONTROL_NAME_CARD_TEXT_STYLE,
        CONTROL_NAME_CARD_TEXT_LINE_SPACING,
        CONTROL_NAME_CARD_TEXT_PADDING
    ],
    'p_price': [
        CONTROL_NAME_CARD_TEXT_COLOR,
        CONTROL_NAME_CARD_TEXT_ALIGN,
        CONTROL_NAME_CARD_TEXT_STYLE,
        CONTROL_NAME_CARD_TEXT_LINE_SPACING,
        CONTROL_NAME_CARD_TEXT_PADDING
    ],
    'p_button': [
        CONTROL_NAME_CARD_BUTTON_TEXT,
        CONTROL_NAME_CARD_BUTTON_STYLE,
        CONTROL_NAME_CARD_BUTTON_COLOR,
        CONTROL_NAME_CARD_BUTTON_HOVER_COLOR,
        CONTROL_NAME_CARD_BUTTON_TEXT_COLOR,
        CONTROL_NAME_CARD_BUTTON_TEXT_HOVER_COLOR,
        CONTROL_NAME_CARD_BUTTON_BORDER_RADIUS,
        CONTROL_NAME_CARD_BUTTON_ALIGN,
        CONTROL_NAME_CARD_BUTTON_STRETCH,
        CONTROL_NAME_CARD_BUTTON_BORDER,
        CONTROL_NAME_CARD_BUTTON_BORDER_HOVER,
        CONTROL_NAME_CARD_BUTTON_INTERNAL_PADDING,
        CONTROL_NAME_CARD_BUTTON_EXTERNAL_PADDING
    ]
}

export default {
    ...baseControl,
    name: CONTROL_NAME_CARD_COMPOSITION,
    internalControls: [],

    render() {
        this.jContainer.html(this.getControlLayout());
        this.jItemsContainer = this.jContainer.find('.composition-items');
        this.orderedVariables = this.getOrderedVariables();
        this.jItemsContainer.html(this.getControlItemsLayout());
        this.activateInternalVariableControls();
        this.disableHideSingleVisibleElement();
        this.bindEvents();
    },

    layoutChanged() {
        if (this.isControlVisible()) {
            this.jItemsContainer.find('.cursor-reorder').toggleClass(HIDDEN_AREA_CLASS, !this.isChangePositionSupported());
            this.panelState.blockConfig.composition.variables.forEach(item => {
                const variableContainer = this.jItemsContainer.find(`[data-varname="${item.variable}"]`);
                const switcherInput = variableContainer.find('.product-element-switcher')
                switcherInput.prop('checked') == item.hidden && switcherInput.prop('checked', !item.hidden);
                variableContainer
                    .find(`.product-composition-internal-controls-container, .es-icon-chevron-up`)
                    .toggleClass(HIDDEN_AREA_CLASS, item.hidden);
            });
            this.updateSortableAbility();
        }
        this.updateControlVisibility();
    },

    isChangePositionSupported() {
        return this.panelState.blockConfig.orientation === ORIENTATION_VERTICAL;
    },

    reOrderVariableControls() {
        const detachedItems = {};
        const that = this;
        this.jItemsContainer.find('.composition-item').each(function() {
            const element = that.extension.stripoApi.jQuery(this);
            detachedItems[element.data('varname')] = element.detach();
        });

        this.orderedVariables = this.getOrderedVariables();
        this.orderedVariables.forEach(item => {
            this.jItemsContainer.append(detachedItems[item.variable]);
        });
    },

    updateSortableAbility() {
        const hasOpenedInternalSettings = this.jItemsContainer.find(`.rotate180:not(.${HIDDEN_AREA_CLASS})`).length;
        const sortableEls = this.jItemsContainer.find('.cursor-reorder');
        if (hasOpenedInternalSettings) {
            sortableEls.hide();
        } else {
            sortableEls.show();
        }
    },

    bindEvents() {
        this.jItemsContainer.find('.product-element-switcher').on('click.compositionItems', e => {
            const variable = this.extension.stripoApi.jQuery(e.target).closest('.composition-item').data('varname');
            this.switchVariableVisibility(variable);
        });
        this.jItemsContainer.find('.es-icon-chevron-up').on('click.compositionItems', e => {
            this.extension.stripoApi.jQuery(e.target)
                 .toggleClass('rotate90')
                 .toggleClass('rotate180');
            this.updateSortableAbility();
        });
        this.jItemsContainer.sortable({
            axis: 'y',
            containment: '.composition-items',
            items: ".composition-item",
            cursor: 'move',
            handle: '.cursor-reorder',
            tolerance: 'pointer',
            start: this.onDragStart.bind(this),
            stop: this.onDragStop.bind(this)
        });
    },

    onDragStart(event, ui) {
        ui.item.addClass('composition-item-drag-start');
    },

    onDragStop(event, ui) {
        ui.item.removeClass('composition-item-drag-start');
        this.reOrderVariables();
    },

    reOrderVariables() {
        const items = this.jItemsContainer.find('.composition-item');
        for (let i=0; i<items.length; i++) {
            const variable = this.extension.stripoApi.jQuery(items[i]).data('varname');
            this.panelState.blockConfig.composition.variables.find(item => item.variable == variable).positionIdx = i + 1;
        }
        this.updateLayout();
        this.applyChanges();
    },

    switchVariableVisibility(variable) {
        const variableItem = this.panelState.blockConfig.composition.variables.find(item => item.variable == variable);
        variableItem.hidden = !variableItem.hidden;
        this.jItemsContainer
            .find(`.composition-item[data-varname="${variableItem.variable}"]`)
            .find(`.product-composition-internal-controls-container, .es-icon-chevron-up`)
            .toggleClass(HIDDEN_AREA_CLASS, variableItem.hidden);
        this.disableHideSingleVisibleElement();
        this.updateSortableAbility();
        this.extension.stripoApi.runWithDelay('totalCountChange', () => {
            this.updateLayout();
            this.applyChangesImmediately();
        }, 300);
    },

    disableHideSingleVisibleElement() {
        const visibleVariables = this.panelState.blockConfig.composition.variables.filter(item => !item.hidden);
        if (1 == visibleVariables.length) {
            this.jItemsContainer
                .find(`.composition-item[data-varname="${visibleVariables[0].variable}"]`)
                .find('.variable-visibility-switcher, .product-element-switcher')
                .attr('disabled', true);
        } else {
            this.jItemsContainer
                .find(`
                        .composition-item .variable-visibility-switcher[disabled][canhide], 
                        .composition-item .variable-visibility-switcher[canhide] .product-element-switcher[disabled]`)
                .removeAttr('disabled');
        }
    },

    unbindEvents() {
        this.jItemsContainer.sortable('destroy');
        this.jItemsContainer.find('.product-element-switcher').off('.compositionItems');
        this.jItemsContainer.find('.es-icon-chevron-up').off('.compositionItems');
    },

    getOrderedVariables() {
        if (this.isChangePositionSupported()) {
            return this.panelState.blockConfig.composition.variables
                .map((item, idx) => {
                    if (!item.positionIdx) {
                        item.positionIdx == idx + 1;
                    }
                    return item;
                })
                .sort((a, b) => a.positionIdx - b.positionIdx);
        } else {
            return this.panelState.blockConfig.composition.variables;
        }
    },

    onDeactivate() {
        this.unbindEvents();
    },

    activateInternalVariableControls() {
        this.internalControls.forEach(control => {
            control.deactivate();
        });
        this.internalControls = [];
        Object.keys(VARIABLE_CONTROLS).forEach(variable => {
            const variableItem = this.orderedVariables.find(item => item.variable == variable);
            const container = this.jItemsContainer.find(`#product${variable}Option`);
            const controls = VARIABLE_CONTROLS[variable];
            for (let i = 0; i < controls.length; i++) {
                const control = this.createInternalControl(controls[i]);
                if (!control || (control.displayControl && !control.displayControl())) {
                    continue;
                }
                const markup = `<div class="product-composition-internal-control product-composition-internal-control-${variableItem.variable}-${i}"></div>`;
                container.append(markup);

                if (control) {
                    control.initializeCompositionInternalControl(variableItem.variable, variableItem.visibilityAreaSelector);
                    this.internalControls.push(control);
                    this.activateInternalControl(control,
                        container.find(`.product-composition-internal-control-${variableItem.variable}-${i}`)[0],
                        `.product-composition-internal-control-${variableItem.variable}-${i}`);
                    control.panelState = this.panelState;
                }
            }
        });
    },

    getControlLayout() {
        return `<div>
                <p>${this.translate('settings.controls.composition.label')}</p>
                <div class="composition-items"></div>
            </div>`;
    },

    getControlItemsLayout() {
        let layout = '';
        for (let i=0; i<this.orderedVariables.length; i++) {
            layout += this.getControlItemLayout(this.orderedVariables[i]);
        }
        return layout;
    },

    getControlItemLayout(variableItem) {
        const variableName = this.translate(`settings.controls.composition.variable.${variableItem.variable}`);
        const hasInnerControls = !!VARIABLE_CONTROLS[variableItem.variable];
        return `<div class="form-group composition-item" data-varname="${variableItem.variable}">
                <label class="col-xs-8 control-label">
                    <span class="esdev-mr15 es-icon-line-height-normal text-gray cursor-reorder 
                            ${this.isChangePositionSupported() ? '' : HIDDEN_AREA_CLASS}" 
                            title="${this.translate('settings.controls.composition.changePosition')}"></span>
                    ${variableName}</a>
                </label>
                <div class="col-xs-4">
                    <label class="variable-visibility-switcher esdev-switch pull-left" ${variableItem.canHide ? 'canhide' : 'disabled'}>
                        <input type="checkbox" class="product-element-switcher" ${variableItem.hidden ? '' : 'checked'} ${variableItem.canHide ? '' : 'disabled'}>
                        <div class="esdev-slider"></div>
                    </label>
                    ${hasInnerControls ? `<span class="es-icon-chevron-up rotate90 pull-right shewron ${variableItem.hidden ? HIDDEN_AREA_CLASS : ''}" 
                        data-toggle="collapse" data-target="#product${variableItem.variable}Option" aria-expanded="false" 
                        aria-controls="product${variableItem.variable}Option" title="${this.translate('settings.controls.composition.edit')}"></span>`:''}
                </div>
                ${hasInnerControls ? `<div class="col-xs-12 collapse product-composition-internal-controls-container ${variableItem.hidden ? HIDDEN_AREA_CLASS : ''}" 
                    id="product${variableItem.variable}Option"></div>`:''}
            </div>`;
    },

    isControlVisible() {
        return this.isValuableBlock();
    }
}
