# The Stripo Editor Extension

## Capabilities

The Stripo editor extensions are designed to meet the needs of customers with special unique requirements for editors. This extension will allow you to create your own blocks, flexibly customize their behavior and manage email layout.

## Creating extension

1. Install dependencies
     ```
     npm i
     ```
2. Add code sample with extension logic
3. Compile this code
    ```bash
    npm run build
    ```
4. This ready-to-use code will be stored in the `dist` folder
  
## Setting up the Stripo editor extension

1. Place the compiled files with the extension on any hosting you like
2. When initializing the Stripo editor, insert the code sample given below into the parameters:
     ```bash
         window.Stripo.init({
            ...,
            "extensions": [
                {
                  "globalName": "YourExtensionName",
                  "url":"https://your.hosting/main.hash.extension.js"
                }
              ]    
         });
     ```

## The files’ structures 

* `index.js` - the root file. The extension, that is eventually moved to a global object, is initially built in 
this root file. The global object’s name should coincide with the name that was set during editor initialization 
in the field `globalName`. When being created, the extension receives as an input:
  * editor’s full configuration, which was transmitted during initialization `stripoConfig`.
  * editor’s API `stripoApi`.
  * the base path where the extension was downloaded `extensionBasePath`. It can be useful, for example, when a block. 
  of various pictures, which are located next to the extension, is being inserted into the layout, to create an 
  absolute path.
  
* `stripoDefaultExtension.js` - template that should be filled out with setups and personal logic. 
  * `name` - the extension name.
  * `iconClass` - class of the block icon.
  * `uniqueClassName` - the unique class that the root element of the block will have.
  * `canBeSavedToLibrary` - sets whether to add blocks to the library is allowed.  
  * `settingsCssPath` - a relative path to CSS stylesheet for the settings panel.
  * `previewCssPath` - relative path to CSS stylesheet for the email display pane.
  * `i18n` - block localization. Example - `translations.js`.
  * `blockName` - the block name or the key for supporting language translations languages.
  * `emptyContainerIcon` - sets whether adding an icon to a new structure for a fast creation is required. It is worth 
  noting that if the block type is `multi-orientation`, then the icon will be added to the 1-container structure only.
  * `blockType` - block type. Supported values:
    * `block` - for a simple block. 
    * `structure` - for a structure like block.
    * `multi-orientation` - for a block with the orientation that changes — horizontal/vertical. For example, product cards.
  * `disableSettingsPanel` - sets whether to show settings panel on block selection or not.  
  * `blockConfigAttributeNames` - the array of the supported attributes for storing block’s condition. It is 
  required when a block needs some data set as a JSON object. These attributes are not set in the code in the code editor. 
  * `controlsToCreate` - a list of additional controls’ elements created in the extension that the Stripo editor 
  should recognize.
  * `blockControls` - a list of controls’ names that will appear in the settings panel when a block is selected in an email.
  * `isEnabled()` - determines whether the extension is on.
  * `emailInitialized(emailBody)` - is called by the editor after initializing an email. As a parameter, the email body 
  is passed as a jQuery object.
  * `onSelectBlock(block)` - is called by the editor the moment when a block is being picked. As a parameter, the picked 
  block is passed as a jQuery object.
  * `getBlockLayoutToDrop()` -  is called by the editor the moment when a block is being moved from the settings 
  panel to an email. As an output, a valid layout should be passed for inserting a block/structure.
  * `blockDropped(block)` -  is called by the editor after a block has been added to the email or after the block 
  has been moved from the settings panel, or has been added from the block library. As a parameter, the picked 
  block is passed as a jQuery object.
  * `getBlockLabel(block)` - is called after a block has been added to the email for retrieving its name. It will 
  be displayed in the upper left area of ​​the block above the selection frame. As a parameter, the picked block is 
  passed as a jQuery object.
  * `getDefaultSettingsPanelState(block)` - allows passing the initial state or the service data to the controls 
  when choosing a block. As a parameter, the picked block is passed as a jQuery object.
  * `getViewOnlyModeTooltipText` - tooltip text for block in 'view only' mode
  * `onCleanLayout(bodyCheerioWrapper, cheerio)` - is called when an email is being compiled. Here you can clear 
  your layout code from extra code symbols and modify email body the way you like. As a parameter, the email body 
  is being passed as `cheerio-object` and `cheerio` itself for building outlines.
  * `onBlockCopy(sourceBlock, targetBlock)` - is called when a block code is being copied.  As a parameter, the initial 
  block is being passed as the jQuery object and the copied block is passed as the jQuery object.
  
## Editor API
Editor API is represented by the set of methods that are used when working with the extension

Function | Description
------------ | -------------
getAppConfig() | returns editor configuration, transmitted during initialization
getFullDomTree() | returns the DOM-tree of email elements as the jQuery object
jQuery | returns jQuery, which is used by the editor  
runWithDelay(key, func, delay) | fulfills the `func` function with the `delay` milliseconds delay. The  `key` serves as the key, which determines the delay. For instance, runWithDelay('someAction', doSomething, 500) fulfills the doSomething() function in 500 milliseconds, if there is no second call runWithDelay('someAction', ...) within these 500 milliseconds. Otherwise, the call will be delayed for another 500 milliseconds.
setViewOnlyMode(isViewEditMode) | disables the ability to DND and copy block
translate(key, params) | returns translation by the `key` key and the `params` parameters. Params from the `i18n` extension are used for translation. The array of values is passed as a parameter. They are added in translations instead of $0, $1... 
triggerEvent(eventType, eventData) | generates an `eventType` event and with `eventData` data
updateStructureLayoutForHorizontalOrientation(block, sampleStructureLayout, configuration) | is used for the `multi-orientation` block type to form the appearance of the block with horizontal orientation according to the sample layout of the `sampleStructureLayout` structure and the specified `configuration` config 
updateStructureLayoutForVerticalOrientation(block, sampleContainerLayout, configuration) | is used for the `multi-orientation` block type to form the appearance of the block with vertical orientation according to the sample layout of the `sampleContainerLayout` container and the specified `configuration` config 

The `updateStructureLayoutForHorizontalOrientation` and `updateStructureLayoutForVerticalOrientation` functions require the `configuration`, 
parameter, which determines the appearance of the resulting block. The configuration is represented as the JSON-object:
```
{
  "rowCount": 3,       // number of containers per row for vertical orientation   
  "totalCount": 6,     // total number of structures for horizontal / containers for vertical orientation of the block
  "composition": {     // this section contains a description of the elements inside the block that can be hidden upon request
    "variables": [
      {
        "variable": "variable1",                              // element name
        "visibilityAreaSelector": ".variable1-css-selector",  // the css-selector of the element that should be hidden
        "hidden": false                                       // true — to hide this element 
      },
      {
        "variable": "variable1",
        "visibilityAreaSelector": ".variable1-css-selector",
        "canHide": true,
        "hidden": false
      }
      ...
    ]
  }
}
```
    
## Block layout
For the `block` block type, you need to prepare a layout according to the rules of layout of the Stripo editor standard blocks. Example:
```
    <td align="left">
        ...
    </td>
```

For the `multi-orientation` blocks, you need to prepare two versions of layout:
1. a structure for the block horizontal orientation. Example:
    ```
    <td class="esd-structure" align="left">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody
                <tr>
                    <td width="570" class="esd-container-frame" align="center" valign="top">
                        <table cellpadding="0" cellspacing="0" width="100%">
                            <tbody>
                                <tr>
                                    <td align="center">
                                        ...
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
    ```
2. a structure for the block vertical orientation. Example:
    ```
    <td class="esd-container-frame" align="center" valign="top">
        <table cellpadding="0" cellspacing="0" width="100%">
            <tbody>
                <tr>
                    <td align="center">
                        ...
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
    ```

### Layout Features
To maintain responsive layout and at the same time flexible control over the visibility of elements in the block 
horizontal orientation, there are several features:
1. The block given below should be added as the first element to all containers but the first one 
```
<!--[if !mso]><!-- -->
    <tr class="esd-desk-hidden">
        <td align="center" class="esd-block-spacer esd-layout-removable-block-if-empty" height="10">
        </td>
    </tr>
<!--<![endif]-->
```
Then on mobile screens, when the containers are lined up one under another, they will not “stick” to each other. 
The `esd-layout-removable-block-if-empty` class indicates here that this block should be deleted if it remains the 
only one in the container (when all other elements in the container are hidden).

The `esd-layout-removable-container-if-empty` class, that is applied to the container and makes it "collapse" 
(accept zero width) if all elements are hidden, is also supported.

For the vertical block orientation and the `{"rowCount": 1, ...}` configuration parameters 
a structure with three containers is used. A necessary content is inserted into the central container, and two side 
service ones are hidden. Hidden service containers are marked as the `esd-ignore-theme-settings` class to make it 
easier to apply  CSS-styles.

## Creating Block Controls
To control a block, you can create controls that will be displayed in the settings panel when a block is selected 
in an email.

### Description of the control
The control is a JSON object. If the control is built from scratch, then it should contain at least:
```
{
    name: 'control_element_name',

    render() {   
        // Function that is called when a code is being rendered
        //   Objects available inside the function:
        //      this.initialDomElement - DOM-element of a specified block.
        //      this.jElement - jQuery-object - the specified block.
        //      this.jContainer - jQuery-object of a container, where the control will be rendered.
        //      this.extension - object - created extension.
        //      this.panelState - JSON-object mutual for all controls in the settings panel.
        //          This place is convenient for storing some parameters that can affect several control elements at 
        //              once or some common data.
        //              The initial value is set in the `getDefaultSettingsPanelState (block)` function when an extension is being created. 
    },

    isControlVisible() {
        // Here you can specify the logic whether the given control should be visible according to the current values
        //    of available objects  
        return true; 
    }
}
```
### Controls’ API 

Inside the control functions, you can use the following built-in API functions:

Function | Description
------------ | -------------
this.activateInternalControl(control, domContainer, controlVisibilitySelector, controlHrVisibilitySelector) | renders the `control` control build with the `createInternalControl` function inside the `domContainer` DOM-element. `controlVisibilitySelector` and `controlHrVisibilitySelector` — are the CSS-selectors of controls by which it gets hidden, if the `isControlVisible()` function returns `false`.
this.applyChanges() | this function must be called after the block editing process is completed in order to apply all the changes and initiate the autosave option of the email. It works with a 500ms delay. I.e. if within 500ms after this function has been called, the autosave option will start only once.
this.applyChangesImmediately() | similar to the `applyChanges()` function except that changes are applied without a delay
this.createInternalControl(controlName) | creates a new object — control by its name.   
this.setControlsSeparatorVisible(isVisible) | hides/shows the separator between controls specified by the `controlHrVisibilitySelector` CSS-selector when rendering in the `activateInternalControl(...)` function.
this.registerSettingsEventListener(eventName, callback) | registers the listener for the `eventName` event with the `callback` function. The event itself can be generated using the editor API — `triggerEvent (...)`.
this.updateControlValue(value, forceUpdate) | if the control is inherited from the built-in control of the editor, then this function allows you to set the desired value of the control. If forceUpdate is true then the value will be set even on hidden control. 
this.updateControlVisibility() | initializes a call to all controls of the `isControlVisible()` function and, depending on the result, hides / shows the control. 
this.controlValueUpdated(value) | if the control is inherited from the built-in control of the editor, then this function is called by the editor after the value of the control has been changed.

### Adding controls

To be able to use your own controls in the editor, you need to register them when creating the extension. There is 
the  `controlsToCreate` section in the code for these purposes. It is an array of the following form:
```
    "controlsToCreate": [
        {
            "control": {      // brand new control  
                name: "..."
                render() {
                    ...
                },
                ...
            }
        },
        {
            "control": {      // a control that is inherited from the built-in control of the editor 
            }, 
            "parentControlName": "stripoBackgroundColorControl" // name of the editor’s built-in control
        },
        ...
    ]
``` 

Then in the extension code in the `blockControls` section, you need to specify the names of those controls 
that will be rendered on the settings panel the moment when any block is chosen in an email
```
    "blockControls": [
        "controlName1",
        "controlName2",
        ...
    ]
```
### Block’s built-in controls
In order not to re-develop the controls that are already available in the editor, it is possible to take 
the finalized element as a basis and redetermine some of its properties and functions. Controls are as follows:
```
    "controlsToCreate": [
        {
            "control": {...},  // a control that is inherited from the built-in control of the editor 
            "parentControlName": "..." // name of the built-in control of the editor
        },
        ...
    ]
``` 
 
The following built-in controls that are currently supported:

#### "Background color"
Sets background to an specified element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() { // Used if you need to redetermine the default text of the control if necessary
                return 'background color';
            },

            getInitialColor() { // sets the initial color that should be displayed in the control
               return '#333333';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoBackgroundColorControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"color": "#ffd966"});
```

#### "Border"

Sets border to a specified block element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getBorderStyleValue() { // sets the initial value of the border that should be displayed in the control
                return {
                    top: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    right: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    bottom: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    left: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoBorderControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"top":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"right":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"bottom":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"left":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"}}});
```

#### "Structure Border"

Sets border to a specified structure element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() {
              return 'Structure border'; // sets a name of a control
            },
            
            getBorderStyleValue() { // sets the initial value of the border that should be displayed in the control
                return {
                    top: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    right: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    bottom: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    },
                    left: {
                        borderWidth: 0,
                        borderStyle: 'solid',
                        borderColor: undefined
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoStructureBorderControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"top":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"right":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"bottom":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"},"left":{"borderWidth":2,"borderStyle":"solid","borderColor":"#93c47d"}}});
```

#### "Structure Paddings"

Sets paddings to a specified structure element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() {
              return 'Structure paddings'; // sets a name of a control for desktop view
            },
            
            getMobileLabel() {
              return 'Structure mobile paddings';  // sets a name of a control for mobile view
            },
            
            getPaddingStyleValue() { // sets the initial value of the margin that should be displayed in the control
                return {
                    desktop: {
                      top: 20,
                      right: 20,
                      bottom: 0,
                      left: 20
                    },
                    mobile: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoStructurePaddingsControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({desktop: {top: 0, right: 0, bottom: 0, left: 20}, mobile: {top: 0, right: 0, bottom: 0, left: 0}});
```

#### "Text color"

Sets color to a specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getInitialColor() { // sets the initial color that should be displayed in the control
               return '#333333';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoFontColorControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"color": "#a2c4c9"});
```

#### "Text alignment"

Sets alignment to a specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getAlignStyleValue() { // sets the initial alignment values
               return {
                   align: 'left',
                   mobileAlign: 'center'
               }
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoTextAlignControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"align": "center", "mobileAlign": "right"});
```

#### "Text style"

Sets text style to a specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getFontFamilyStyleValue() { // sets the initial values for the font family
               return 'roboto, "helvetica neue", helvetica, arial, sans-serif'
            },

            getFontSizeStyleValue() { // sets the initial values for font size
                return '16px';
            },

            getFontWeightValue() { // sets the initial values for font thickness
                return 'bold';
            },

            getFontStyleValue() {  // sets the initial values for font style
                return 'normal';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoTextStyleControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"font-family":"'courier new',courier,'lucida sans typewriter','lucida typewriter',monospace","font-size":"16px","font-weight":"normal","font-style":"italic"});
```

#### "Text line spacing"

Sets line spacing to a specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getControlValue() { // sets the initial value of the line spacing that should be displayed in the control
                return {
                    lineSpacing: "200%"
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoTextLineSpacingControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({lineSpacing: "150%"});
```


#### "Text Paddings"

Sets paddings to a specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() {
              return 'Text paddings'; // sets a name of a control for desktop view
            },
            
            getMobileLabel() {
              return 'Text mobile paddings';  // sets a name of a control for mobile view
            },
            
            getPaddingStyleValue() { // sets the initial value of the margin that should be displayed in the control
                return {
                    desktop: {
                      top: 20,
                      right: 20,
                      bottom: 0,
                      left: 20
                    },
                    mobile: {
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoPaddingСontrol"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({desktop: {top: 0, right: 0, bottom: 0, left: 20}, mobile: {top: 0, right: 0, bottom: 0, left: 0}});
```

#### "Button label"

Sets button label.

Usage:
```
    {
        "control": {
            name: 'name of the created control',

            getTextStyleValue() { // sets the initial values for the button label
                return 'Text';
            },
            
            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonTextControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"text":"Text value"});
```

#### "Button text color"

Sets button text color.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getInitialColor() { // sets the initial color for the control
               return '#333333';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonTextColorControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"color": "#a2c4c9"});
```

#### "Button text style"

Sets style for the specified text element.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getFontFamilyStyleValue() { // sets the initial values for the font family
               return 'roboto, "helvetica neue", helvetica, arial, sans-serif'
            },

            getFontSizeStyleValue() { // sets the initial values for font size
                return '16px';
            },

            getFontWeightValue() { // sets the initial values for font thickness
                return 'bold';
            },

            getFontStyleValue() {  // sets the initial values for font style
                return 'normal';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonStyleControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"font-family":"'courier new',courier,'lucida sans typewriter','lucida typewriter',monospace","font-size":"16px","font-weight":"normal","font-style":"italic"});
```


#### "Button color"

Sets button color.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getInitialColor() { // sets the initial color that should be displayed in the control
               return '#333333';
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonColorControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"color": "#a2c4c9"});
```

#### "Button border radius"

Sets button border radius.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getBorderRadiusStyleValue() { // sets the initial value that should be displayed in the control
               return 10;
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonBorderRadiusControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"borderRadius": 10});
```

#### "Button alignment"

Sets button alignment.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getAlignStyleValue() { // sets initial value for button alignment
               return {
                   align: 'left',
                   mobileAlign: 'center'
               }
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonAlignControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"align": "center", "mobileAlign": "right"});
```

#### "Full-width button"

Sets a full-width button.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getStretchStyleValue() { // sets the initial value for the full-width button
               return {
                   stretched: true
               }
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values ​​should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonStretchControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"stretched": false});
```

#### "Button border"

Sets button's border.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getControlValue() { // sets the initial value of the border that should be displayed in the control
                return {
                    "width": {
                        "left": 3,
                        "right": 4,
                        "top": 3,
                        "bottom": 3
                    },
                    "style": {
                        "left": "solid",
                        "right": "solid",
                        "top": "solid",
                        "bottom": "solid"
                    },
                    "color": {
                        "left": "#808080",
                        "right": "#808080",
                        "top": "#808080",
                        "bottom": "#808080"
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonBorderControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({"width": {"left": 3, "right": 4, "top": 3, "bottom": 3}, "style": {"left": "solid","right": "solid","top": "solid", "bottom": "solid"},"color": {"left": "#808080","right": "#808080","top": "#808080","bottom": "#808080"}});
```

#### "Button Internal Padding"

Sets button's internal padding.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() {
              return 'Internal padding'; // sets a label of a control
            },
            
            getControlValue() { // sets the initial value of the internal padding that should be displayed in the control
                return {
                    "desktop": {
                        "all": 0,
                        "top": 10,
                        "right": 0,
                        "bottom": 5,
                        "left": 0
                      }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoButtonInternalPaddingControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({desktop: {top: 0, right: 0, bottom: 0, left: 20}});
```

#### "Button External Padding"

Sets button's external padding.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getLabel() {
              return 'External padding'; // sets a label of a control
            },
            
            getMobileLabel() {
                return "Mobile external padding"; // sets a mobile label of a control
            },
            
            getControlValue() { // sets the initial value of the external padding that should be displayed in the control
                return {
                    "desktop": {
                        "top": 10,
                        "right": 0,
                        "bottom": 5,
                        "left": 0
                    },
                    "mobile": {
                        "top": 5,
                        "right": 5,
                        "bottom": 0,
                        "left": 5
                    }
                };
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoPaddingСontrol"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({desktop: {top: 0, right: 0, bottom: 0, left: 20},"mobile": {"top": 5,"right": 5,"bottom": 0,"left": 5}});
```

#### "Image size"

Sets image size.

Usage:
```
    {
        "control": {
            name: 'name of the created control',
            
            getControlValue() { // sets the initial value of the image size
                return {
                  "width": 174
                }
            },

            getDomElementsToApplyValue() { // specifies the DOM-elements within the block to which the control values should be applied
                return this.initialDomElement.querySelectorAll('...')
            }
        }, 
        "parentControlName": "stripoImageSizeControl"
    }
```

When using the `updateControlValue` function, you need to pass a value as a parameter, as shown below:
```
    this.updateControlValue({height: 200});
```
