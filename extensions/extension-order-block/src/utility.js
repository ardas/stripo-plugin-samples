import { BLOCK_DESIGN_ENDPOINT,CONTENT_TYPE_URLENCODED,CONTENT_TYPE } from './const.js';
import config from './config.json';

/**
 * Desc : Get the specific entry data
 * @returns : entry data
 */
async function getBlock(entryDetails) {
    // const data =   {
    //     "entryId": entryDetails.id,
    //     "contentModelId": entryDetails.contentTypeId,
    //     "version": entryDetails.version,
    //     "entryType": entryDetails.EntryType,
    //     "isContentRequired": true,
    //     "stackId": entryDetails.configParameterFromEditor.stackId,
    //     "contentModel": "string",
    //     "isStatic": entryDetails.isStatic,
    //     "isDefaultStack":entryDetails.configParameterFromEditor.isDefaultStack,
    //     "ThemeContentTypeId": entryDetails.configParameterFromEditor.formValues.theme.contentTypeId,
    //     "arguments": null,
    //     "isApiUrl": true,
    //     "requestType": entryDetails.blockType
    // }
    // const url = `${config.Stripo.NotificationsBlocks.baseUrl}${BLOCK_DESIGN_ENDPOINT}/${entryDetails.blockType}/design`;
    // const headers = getHeaders("POST",entryDetails);
    //return createFetchRequest(url, headers, "POST", data);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                blockHtml: "<table class=\"es-content-body theme-primary-color\" style=\"word-break:break-word\" width=\"640\" cellspacing=\"0\" cellpadding=\"0\" align=\"center\">\n<tbody>\n<tr>\n<td class=\"esd-structure es-p20t\" align=\"left\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td class=\"esd-container-frame\" align=\"center\">\n<!--{{#if InsuranceBlocks}}-->\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"520\" class=\"theme-card-header-bg-color theme-border-color\" style=\"border-width: 1px; border-style: solid;border-radius: 4px 4px 0px 0px; border-collapse: separate;\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-block-text es-p20\">\n<p style=\"color: #ffffff; font-size: 20px;\">\n<strong>Trip protection</strong>\n</p>\n</td>\n</tr>\n</tbody>\n</table>\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"520\" class=\"theme-secondary-color theme-border-color\" style=\"border-width: 1px; border-style: solid;border-radius:0px 0px 4px 4px; border-collapse: separate;\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame es-p20\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\" border-collapse: separate !important; \">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame\">\n<!--{{#each InsuranceBlocks}}{{#is ProductType 'Air'}}\n{{#is Status 'Confirmed'}}-->\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame es-p10l es-p15r\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-block-text es-p10r\">\n<p style=\"font-size: 16px; color: #1a2228;\">\n<strong>Flight insurance</strong>\n</p>\n</td>\n</tr>\n<tr>\n<td align=\"left\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 14px;\">Policy number:{{PolicyNumber}}</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td align=\"right\" valign=\"top\" class=\"esd-container-frame\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"right\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 16px;\">\n<strong>{{CurrencyPrefix}}{{Amount}}</strong>\n</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td align=\"center\" class=\"esd-block-spacer es-p10t es-p10b\" style=\"font-size:0\">\n<table border=\"0\" width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n<tbody>\n<tr>\n<td class=\"theme-border-color\" style=\"background: unset; height:1px; width:100%; margin:0px 0px 0px 0px;\"/>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!--{{/is}}{{/is}}{{/each}}-->\n</td>\n</tr>\n<tr>\n<td align=\"left\" class=\"esd-container-frame\">\n<!--{{#each InsuranceBlocks}}{{#is ProductType 'Hotel'}} {{#is Status 'Confirmed'}}-->\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame es-p10l es-p15r\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-block-text es-p10r\">\n<p style=\"color: #1a2228; font-size: 16px;\">\n<strong>Hotel insurance</strong>\n</p>\n</td>\n</tr>\n<tr>\n<td align=\"left\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 14px;\">Policy number: {{PolicyNumber}}</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td align=\"right\" valign=\"top\" class=\"esd-container-frame\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"right\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 16px;\">\n<strong>{{CurrencyPrefix}}{{Amount}}\n</strong>\n</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n<tr>\n<td align=\"center\" class=\"esd-block-spacer es-p10t es-p10b\" style=\"font-size:0\">\n<table border=\"0\" width=\"100%\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\">\n<tbody>\n<tr>\n<td class=\"theme-border-color\" style=\"background: unset; height:1px; width:100%; margin:0px 0px 0px 0px;\"/>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!--{{/is}} {{/is}}{{/each}}-->\n</td>\n</tr>\n<tr>\n<td align=\"left\" class=\"esd-container-frame\">\n<!--{{#each InsuranceBlocks}}{{#is ProductType 'Car'}}{{#is Status 'Confirmed'}}-->\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-container-frame es-p10l es-p15r\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"left\" class=\"esd-block-text es-p10r\">\n<p style=\"color: #1a2228; font-size: 16px;\">\n<strong>Car insurance</strong>\n</p>\n</td>\n</tr>\n<tr>\n<td align=\"left\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 14px;\">Policy number: {{PolicyNumber}}</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n<td align=\"right\" valign=\"top\" class=\"esd-container-frame\">\n<table cellpadding=\"0\" cellspacing=\"0\" width=\"100%\">\n<tbody>\n<tr>\n<td align=\"right\" class=\"esd-block-text\">\n<p style=\"color: #1a2228; font-size: 16px;\">\n<strong>{{CurrencyPrefix}}{{Amount}}</strong>\n</p>\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!--{{/is}} {{/is}}{{/each}}-->\n</td>\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>\n<!--{{/if}}-->\n</td>\n\n</tr>\n</tbody>\n</table>\n</td>\n</tr>\n</tbody>\n</table>",
                blockType: null,
                isStatic: false,
                renderUrl: null,
                title: null,
                locale: null,
                version: null,
                uid: null,
                contentTypeId: null,
                templateCSS: null
            });
        }, 2000);
    })
}

/**
 * Desc : generate request headers
 */
function getHeaders (methodType,entryDetails) {
    let header = "";
    const crId = createGUID();
    const programId = entryDetails.configParameterFromEditor.formValues.program?.code !== undefined ? entryDetails.configParameterFromEditor.formValues.program.code : 0;
    const cpgId = entryDetails.configParameterFromEditor.formValues.cpg?.code !== undefined ? entryDetails.configParameterFromEditor.formValues.cpg.code : 0;
    const contentType = methodType === "GET" ? CONTENT_TYPE_URLENCODED : CONTENT_TYPE;
    header = {
        'accept-language': entryDetails.locale,
        'Content-Type': contentType,
        'cnx-clientId': entryDetails.configParameterFromEditor.clientId,       
        'cnx-programGroupId': cpgId,
        'cnx-correlationId': crId,
        'cnx-clientName': entryDetails.configParameterFromEditor.headers.clientName,
        'cnx-programName': entryDetails.configParameterFromEditor.headers.programName,
        'cnx-tenantId': entryDetails.configParameterFromEditor.headers.tenantId,
        'cnx-agencyTenantId': entryDetails.configParameterFromEditor.headers.agencyTenantId,
        'cnx-environmentToken':entryDetails.configParameterFromEditor.environment,
        'programId': programId
    };
    return header;
}

/**
 * Desc : generate GUID
 */
function  createGUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (paramsNumber) => {
        const processNumber = Math.random() * 16 | 0;
        const generateNumber = paramsNumber === 'x' ? processNumber : (processNumber & 0x3 | 0x8);
        return generateNumber.toString(16);
    });
}

/**
 * Desc : Create Service call
 * @param {*} entryUrl 
 * @param {*} httpHeaders 
 * @param {*} httpMethod 
 * @param {*} httpData 
 * @returns : response data
 */
function createFetchRequest(entryUrl, httpHeaders, httpMethod, httpData = undefined) {
    let options = null;
    let response;
    if (httpData === undefined) {
        options = {
            method: httpMethod,
            headers: httpHeaders
        }
    }
    else {
        options = {
            method: httpMethod,
            headers: httpHeaders,
            body: JSON.stringify(httpData)
        }
    }
    const result = new Promise((resolve, reject) => {
        fetch(entryUrl, options).then((data) => {
            response = data;
            if (!response.ok) {
                reject(new Error('fail'));

            } else {
                data.json().then((results) => {
                    resolve(results);
                })
            }
        });
    });
    return result.then((results) => {
        return results;
    },() => {
        return null;
    });
}

/**
 * Desc : Generate Message in alert box
 */
function messageContent(message) {
    if (Array.isArray(message)) {
        let messageContent = "";
        message.forEach((data, index) => {
            messageContent += `<div>${processAlertMessageContent(message)}
            ${data.includes("element") ? data.replaceAll("element", "tag") : data}</div>`;
        });
        $(messageContent).appendTo("#alert-inner-content-text");
        $('.alert-box').css("height", "100%");
    } else {
        $('.alert-box').css("height", "12em");
    }
}

/**
 * Desc : Process alert message content
 */
function actionButtonsLengthCondition(actionButtonsLength, actionButtons, div) {
    if (actionButtonsLength > 0) {
        const innerDiv = document.createElement('div');
        for (const elements of actionButtons) {
            if (elements.value) {
                innerDiv.innerHTML +=
                    `<button type="button" class="yes-btn ${elements.class}" id="${elements.id}"
                  onclick="${elements.functionName}">${elements.label}</button>`;
            } else {
                innerDiv.innerHTML +=
                    `<button type="button" class="no-btn ${elements.class}" id="${elements.id}" 
                 onclick="${elements.functionName}">${elements.label}</button>`;
            }
        }
        div.firstElementChild.firstElementChild.appendChild(innerDiv);
    }
}

/**
 * Desc : Generate action buttons in alert box
 */
function processAlertMessageContent(message) {
    if (message.length > 1) {
        return `${index + 1}.`;
    } else {
        return null;
    }

}

/**
 * Desc : Set Popup Loader
 */
function closeAlertModal() {
    const idSelectors = ["alert-modal", "alert-modal-loader"];
    for (const id of idSelectors) {
        $(`#${id}`).css("display", "none");
        $(`#${id}`).empty();
    }
}

export { getBlock, actionButtonsLengthCondition, messageContent, closeAlertModal }
