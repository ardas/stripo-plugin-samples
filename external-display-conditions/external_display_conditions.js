window.ExternalDisplayConditions = (function() {
    const AVAILABLE_CONDITION_NAMES = [
        {label: 'Email Address', value: '$EMAIL'},
        {label: 'Phone number', value: '$PHONE'},
    ];
    const AVAILABLE_CONDITION_OPERATIONS = [
        {label: 'Equals (Is)', value: 'equals'},
        {label: 'Contains', value: 'in_array'},
    ];
    const AVAILABLE_CONDITION_CONCATENATIONS = [
        {label: 'all', value: '&&'},
        {label: 'any', value: '||'}
    ];
    const DEFAULT_CONDITION = {
        name: AVAILABLE_CONDITION_NAMES[0].value,
        operation: AVAILABLE_CONDITION_OPERATIONS[0].value,
        value: ''
    };
    const DROPDOWN_CONDITION_NAME_CLASS = 'dropdownConditionField';
    const DROPDOWN_CONDITION_OPERATION_CLASS = 'dropdownConditionOperation';
    const DROPDOWN_CONDITION_CONCATENATION_CLASS = 'dropdownConcatenation';

    let conditionsPopupElement;
    let selectConditionsCallback;


    const closePopup = function() {
        conditionsPopupElement.style.visibility = 'hidden';
    };

    const createConditionsPopup = function() {
        const div = document.createElement('div');
        div.innerHTML = '\
            <div id="externalDisplayConditionsPopup" style="background-color: rgba(0,0,0,.5); overflow: hidden; \
                    position: fixed; top: 0; right: 0;  bottom: 0; left: 0; z-index: 1050; font-family: sans-serif; visibility: hidden;" \
                    class="esdev-app">\
                <div style="margin: 10px;">\
                <div style="background-color: #f6f6f6; border-radius: 17px 17px 30px 30px; max-width: 800px; margin: 0 auto;">\
                    <div style="padding: 15px; border-bottom: 1px solid #e5e5e5;">\
                        <div>\
                           <button id="closePopupButton" type="button" style="cursor: pointer; background: transparent; border: 0; float: right; font-size: 21px; font-weight: bold; opacity: .2;">\
                                <span>×</span>\
                            </button>\
                            <h4 style="margin: 0; font-size: 18px; color: rgb(85, 85, 85);">Display conditions</h4>\
                        </div>\
                    </div>\
                    <div style="padding: 15px;">\
                        <table class="conditionsTable" width="100%"></table>\
                        <button id="addNewCondition" class="btn btn-primary btn-sm">Add Condition</button>\
                        <div>\
                            <table style="width: 100%; margin-top: 20px;">\
                                <tr>\
                                    <td>\
                                        Show this content if\
                                            <span style="width: 65px;display: inline-block;">' +
                                                getDropdownMarkup(DROPDOWN_CONDITION_CONCATENATION_CLASS) +
                                            '</span>\
                                        conditions are met.\
                                    </td>\
                                    <td width="80px">\
                                        <button id="closeConditionsPopup" class="btn btn-secondary">Cancel</button>\
                                    </td>\
                                    <td width="45px">\
                                        <button id="applyConditionsAction" class="btn btn-success">Ok</button>\
                                    </td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                </div>\
            </div>';
        document.body.appendChild(div);
        conditionsPopupElement = document.getElementById('externalDisplayConditionsPopup');

        conditionsPopupElement.querySelector('#closePopupButton').addEventListener('click', closePopup);
        conditionsPopupElement.querySelector('#closeConditionsPopup').addEventListener('click', closePopup);
        conditionsPopupElement.querySelector('#applyConditionsAction').addEventListener('click', applyConditions);
        conditionsPopupElement.querySelector('#addNewCondition').addEventListener('click', addConditionRow);

        getDropdownProps(conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).values = AVAILABLE_CONDITION_CONCATENATIONS;
    };

    const getDropdownMarkup = function(clazz) {
        return '<dropdown-input classes="dropdown-condition ' + clazz + '"\
                buttonWrapperClasses="form-control"\
                optionTextClass="text"></dropdown-input>';
    };

    const activateConditionsPopup = function(appliedCondition) {
        if (!conditionsPopupElement) {
            createConditionsPopup();
        }
        initConditions(appliedCondition);
        conditionsPopupElement.style.visibility = 'visible';
    };

    const initConditions = function(appliedCondition) {
        conditionsPopupElement.querySelector('.conditionsTable').innerHTML = '';
        const initialConditions = parseAppliedCondition(appliedCondition.beforeScript);

        for (let i=0; i<initialConditions.conditions.length; i++) {
            addConditionRow(null, initialConditions.conditions[i]);
        }

        getDropdownProps(conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).value = initialConditions.concatenation;
    };

    const addConditionRow = function(e, conditionValue) {
        if (!conditionValue) {
            conditionValue = DEFAULT_CONDITION;
        }
        const deleteActionClass = 'condition-delete-action-' + Math.random().toString().replace('.', 'd');
        const tr = document.createElement('tr');
        tr.classList.add('condition-row');
        tr.innerHTML = '<td style="width: 150px; padding: 0 5px 10px 0;">' + getDropdownMarkup(DROPDOWN_CONDITION_NAME_CLASS) + '</td>\
                <td style="width: 110px; padding: 0 5px 10px 0;">' + getDropdownMarkup(DROPDOWN_CONDITION_OPERATION_CLASS) + '</td>\
                <td style="padding: 0 5px 10px 0;"><input type="text" class="form-control condition-value"></td>\
                <td style="width: 18px; padding-bottom: 10px;"><span class="es-icon-delete ' + deleteActionClass + '"></span></td>';
        conditionsPopupElement.querySelector('.conditionsTable').appendChild(tr);

        const nameProps = getDropdownProps(tr, DROPDOWN_CONDITION_NAME_CLASS)
        nameProps.values = AVAILABLE_CONDITION_NAMES;
        nameProps.value = conditionValue.name;

        const operationProps = getDropdownProps(tr, DROPDOWN_CONDITION_OPERATION_CLASS);
        operationProps.values = AVAILABLE_CONDITION_OPERATIONS;
        operationProps.value = conditionValue.operation;

        tr.querySelector('.condition-value').value = conditionValue.value;

        conditionsPopupElement.querySelector('.' + deleteActionClass).addEventListener('click', deleteConditionRow);
        updateDeleteActionVisibility();
    };

    const deleteConditionRow = function(e) {
        e.target.closest('.condition-row').remove();
        updateDeleteActionVisibility();
    };

    const updateDeleteActionVisibility = function() {
        const rows = conditionsPopupElement.querySelectorAll('.conditionsTable .condition-row');
        rows[0].querySelector('.es-icon-delete').style.display = rows.length > 1 ? 'block' : 'none';
    };

    const applyConditions = function() {
        const conditions = [];
        const rows = conditionsPopupElement.querySelectorAll('.conditionsTable .condition-row');

        for (let i=0; i<rows.length; i++) {
            const row = rows[i];
            const value = row.querySelector('.condition-value').value;
            if (value.length) {
                conditions.push({
                    name: getDropdownProps(row, DROPDOWN_CONDITION_NAME_CLASS).value,
                    operation: getDropdownProps(row, DROPDOWN_CONDITION_OPERATION_CLASS).value,
                    value
                });
            }
        }

        if (conditions.length) {
            const concatenation = getDropdownProps(conditionsPopupElement, DROPDOWN_CONDITION_CONCATENATION_CLASS).value;
            const finalCondition = conditions.map(function (condition) {
                return condition.operation + '(\'' + condition.value + '\', ' + condition.name + ')'
            }).join(' ' + concatenation + ' ');

            selectConditionsCallback({
                name: 'Conditions applied',
                description: 'Only users that fit conditions will see this part of the email.',
                beforeScript: '%IF ' + finalCondition + '%',
                afterScript: '%/IF%'
            });
        }

        closePopup();
    };

    const getDropdownProps = function(baseElement, identifierClass) {
        if (!baseElement) {
            baseElement = conditionsPopupElement;
        }
        return baseElement.querySelector('dropdown-input[classes*="' + identifierClass + '"]').props;
    }

    const parseAppliedCondition = function(appliedCondition) {
        const str = appliedCondition
            .trim()
            .replace('%IF ', '')
            .replace('%/IF%', '');
        const concatenation = findConditionOptionValue(str, AVAILABLE_CONDITION_CONCATENATIONS);
        const conditions = str
            .split(concatenation)
            .map(function (str) {
                return {
                    name: findConditionOptionValue(str, AVAILABLE_CONDITION_NAMES),
                    operation: findConditionOptionValue(str, AVAILABLE_CONDITION_OPERATIONS),
                    value: str.substring(str.indexOf('\'') + 1, str.lastIndexOf('\''))
                }
            });
        return {
            conditions,
            concatenation
        };
    };

    const findConditionOptionValue = function(str, options) {
        let option = options.find(function(i) {
            return str.indexOf(i.value) > -1;
        });
        if (!option) {
            option = options[0];
        }
        return option.value;
    }


    return {
        openExternalDisplayConditionsDialog: function(onSelectCallback, appliedCondition) {
            selectConditionsCallback = onSelectCallback;
            activateConditionsPopup(appliedCondition);
        }
    };
})();
