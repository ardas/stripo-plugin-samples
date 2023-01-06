import { ATTR_NAME_RECOMMENDATION_GROUPS, CONTROL_NAME_BLOCK_GROUPS, SELECT_FIELD, TARGET_DROPDOWN, BLOCK_TYPE_SHOW, 
    BLOCK_CONTENT_HIGHLIGHT } from '../const';
import baseControl from "./baseControl";

export default {
    ...baseControl,
    name: CONTROL_NAME_BLOCK_GROUPS,

    render() {
        this.options = this.getOptions();
        this.jContainer.html(this.getControlMarkup());
        this.selectedGroups = this.getSelectedGroups();
        this.keyUpFordropDownField();
        this.dropdownContentAction();
    },

    keyUpFordropDownField(){
        $("#js-select-field").keyup(function(event){
            if(event.keyCode === 40 || event.keyCode === 38 || event.keyCode === 13){
                this.arrowFunctionalityForDropDown(event);
                return;
            }
             this.emptyAllChildElement(TARGET_DROPDOWN,'id');
             const filteredOptions = this.options.filter((value)=>{
                return value.label.indexOf(event.target.value) > -1});
             document.getElementById(TARGET_DROPDOWN).innerHTML = this.renderDropdownContent(filteredOptions);
             this.showDropDownContent('type',event);
             this.dropdownContentAction();
         }.bind(this));
    },

    renderDropdownContent(dropDownValues){
        let dropdownHTML = '';
        if(dropDownValues.length > 0){
            for(let i = 0;i < dropDownValues.length; i++){
                dropdownHTML += `<span class="block-type-option">${dropDownValues[i].label}
                            <span style="display:none">${dropDownValues[i].value}</span>
                </span>`;
            }
        }else{
            dropdownHTML = '<p style="text-align:center">No Results</p>'
        }
        return dropdownHTML;
    },

    emptyAllChildElement(selector,selectorType) {
        if(selector !==''){
            const selectorValue = selectorType === "class" ? `.${selector}`:`#${selector}`;
            if(document.querySelector(selectorValue).hasChildNodes()){
                while(document.querySelector(selectorValue).firstChild) {
                    document.querySelector(selectorValue).removeChild(document.querySelector(selectorValue).firstChild);
                }
            }
        }
    },

    dropdownContentAction(){
        $('.block-type-option').click(function(event){
            document.getElementById(SELECT_FIELD).value = event.target.innerText;
            document.getElementById(TARGET_DROPDOWN).classList.remove(BLOCK_TYPE_SHOW);
            this.onChange(event.target.getAttribute("attr_id_value"));
          }.bind(this));
        $('#js-select-field').click(function(event){
            this.showDropDownContent('click',event);
        }.bind(this));
    },

    showDropDownContent(actionType,event){
        if(actionType === 'click'){
            if(!document.getElementById(TARGET_DROPDOWN).classList.contains(BLOCK_TYPE_SHOW)){
                document.getElementById(TARGET_DROPDOWN).classList.add(BLOCK_TYPE_SHOW);
            }else{
                document.getElementById(TARGET_DROPDOWN).classList.remove(BLOCK_TYPE_SHOW);
            }
        }else{
            document.getElementById(TARGET_DROPDOWN).classList.add(BLOCK_TYPE_SHOW);
            this.dropdownContentAction();
        }
        this.modifyStyleForDropDown(event);
    },

    arrowFunctionalityForDropDown(event){
        const targetArray = Array.from(event.target.parentElement.lastElementChild.childNodes);
        let conditionCount = 0;
        let identifyIndex = null;
        if(targetArray.length > 0){
            targetArray.forEach((element)=>{
                conditionCount = element.classList.contains(BLOCK_CONTENT_HIGHLIGHT) ? conditionCount + 1 : conditionCount
            })
            if(conditionCount === 0){
               document.getElementById(TARGET_DROPDOWN).childNodes[0].classList.add(BLOCK_CONTENT_HIGHLIGHT);
            }else{
                for(let i=0;i < targetArray.length ; i++){
                    if(targetArray[i].classList.contains(BLOCK_CONTENT_HIGHLIGHT)){
                        identifyIndex = i;
                        break;
                    }
                }
                targetArray.forEach((element)=>{ 
                    element.classList.remove(BLOCK_CONTENT_HIGHLIGHT)});
                    arrowKeyFunctionality(event.key,identifyIndex,targetArray);
            }
        }
    },
    arrowKeyFunctionality(key){
        switch(key){
             case 'ArrowUp':
                 if(identifyIndex !== 0){
                     targetArray[identifyIndex-1].scrollIntoView();
                     targetArray[identifyIndex-1].classList.add(BLOCK_CONTENT_HIGHLIGHT);
                 }
             break;
             case 'ArrowDown':
                 if(identifyIndex !== (targetArray.length-1)){
                     targetArray[identifyIndex+1].scrollIntoView();
                     targetArray[identifyIndex+1].classList.add(BLOCK_CONTENT_HIGHLIGHT);
                 }
             break;
             case 'Enter':
                 document.getElementById(SELECT_FIELD).value = targetArray[identifyIndex].innerText;
                 document.getElementById(TARGET_DROPDOWN).classList.remove(BLOCK_TYPE_SHOW);
                 this.onChange(targetArray[identifyIndex].getAttribute("attr_id_value"));
             break;
             default:
             break;
 }
},

    modifyStyleForDropDown(event){
        document.getElementById(TARGET_DROPDOWN).hasAttribute('style') &&  document.getElementById(TARGET_DROPDOWN).removeAttribute("style");
        event.target.closest('.esdev-panel-content-wrapper').setAttribute('style','max-height: 330.219px; overflow: unset;');
        if(document.getElementById(TARGET_DROPDOWN).offsetHeight >= 200){
            document.getElementById(TARGET_DROPDOWN).style.maxHeight = "200px";
        }else if(document.getElementById(TARGET_DROPDOWN).offsetHeight < 200){
            document.getElementById(TARGET_DROPDOWN).style.maxHeight = "unset";
        }
    },

    getOptions() {
        if (!this.getGroupsFromStripoConfig()) {
            return [];
        }
        return this.getGroupsFromStripoConfig().map(g => {
            return {
                value: g.id,
                label: g.name
            }
        });
    },

    getSelectedGroups() {
        if (this.panelState?.blockConfig?.groups === undefined || this.panelState?.blockConfig?.groups?.length === 0) {
             return null;
        }
        else {
            document.getElementById(SELECT_FIELD).value = this.panelState.blockConfig.groups[0].name;
            return (this.panelState.blockConfig.groups || []).map(g => g.id);
        }
    },

    updateSeparatorVisibility() {
        this.setControlsSeparatorVisible(!!this.jElement.attr(ATTR_NAME_RECOMMENDATION_GROUPS));
    },

    onChange(selectedGroupsId) {
        setTimeout(() => {
            var selectedGroup = this.getGroupsFromStripoConfig().find(g => g.id === selectedGroupsId);
            this.panelState.blockConfig.groups = [];
            this.panelState.blockConfig.groups.push(selectedGroup);
            this.panelState.blockConfig = this.extension
                .wrapBlockWithTypeIdentifierAttributesAndGetConfig(this.jElement, this.panelState.blockConfig);
            this.updateBlockText(this.jElement, this.panelState.blockConfig).then(() => this.applyChanges());
            this.addBlockCustomAttibutes(this.jElement, "selectedBlocktypeuid", selectedGroup.id);
            this.addBlockCustomAttibutes(this.jElement, "selectedBlocktypename", selectedGroup.name.toLowerCase());
            this.addBlockCustomAttibutes(this.jElement, "selectedcontenttype", selectedGroup.contenttype.toLowerCase());
            this.addBlockCustomAttibutes(this.jElement, "selectedlocale", selectedGroup.locale.toLowerCase());
            this.addBlockCustomAttibutes(this.jElement, "selectedeventtype", selectedGroup.eventtype);
            this.addBlockCustomAttibutes(this.jElement, "blocktype", selectedGroup.blocktype.toLowerCase());
            this.addBlockCustomAttibutes(this.jElement, "isstatic", selectedGroup.isStatic);
            this.addBlockCustomAttibutes(this.jElement, "renderUrl", selectedGroup.renderUrl);
        }, 0);
    },

    getGroupsFromStripoConfig() {
        return this.extension.stripoConfig.orderblockconfiguration.groups;
    },
layoutChanged()
     {
        if (this.isControlVisible()) {
            this.dropDown.props.value = this.getSelectedGroups();
        }
        this.updateControlVisibility();
        this.updateSeparatorVisibility();
    },

    getControlMarkup() {
        var selectTag = `<div class="form-group">
        <div class="col-xs-4">
          Block name
        </div>
        <div class="col-xs-8" style="padding: 0px 5px;">
            <div class="block-type-select">
                <input id="js-select-field" class="block-type-select-field"  placeholder="Select block name" autocomplete="off"/>
                <span class="block-type-select-downarrow-icon"><em class="fa-solid fa-caret-down"></em></span>
                <div id="js-target-dropdown"  class="block-type-select-content">`;
                    let dropdownHTML = '';
                    for(let i=0;i<this.options.length;i++){
                        dropdownHTML += `<span class="block-type-option" attr_id_value=${this.options[i].value} >${this.options[i].label}</span>`;
                    }
                    selectTag += `${dropdownHTML}</div>
                     </div>
                </div>`;
        return selectTag;
    }
}
