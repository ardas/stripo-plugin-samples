import {ATTR_NAME_BLOCK_CONFIGURATION, ORIENTATION_VERTICAL} from './const';
import defaultBlockConfiguration from './layout/defaultBlockConfiguration.json';

export function createBlockConfigurationService(stripoConfig) {
    function getBlockConfiguration(block) {
        const attrValue = block.attr(ATTR_NAME_BLOCK_CONFIGURATION);
        return !attrValue ? null : JSON.parse(unescapeJsonString(attrValue));
    }

    function setBlockConfiguration(block, config) {
        block.attr(ATTR_NAME_BLOCK_CONFIGURATION, escapeJsonString(JSON.stringify(config)));
    }

    function getOrCreateConfig(blockConfig = {}) {
        blockConfig.composition = blockConfig.composition || {...defaultBlockConfiguration.composition};
        blockConfig.theme = blockConfig.theme || {};
        blockConfig.orientation = blockConfig.recommendationsOrientation || ORIENTATION_VERTICAL;
        blockConfig.groups = blockConfig.groups || [];
        blockConfig.rowCount = blockConfig.rowCount || stripoConfig.productDemoBlock.rowCount || 3;
        blockConfig.totalCount = blockConfig.groups.reduce((sum, g) => sum + g.count, 0)
        return blockConfig;
    }

    function getBlockConfigurationForCopiedBlock(block) {
        const blockConfig = getBlockConfiguration(block);
        blockConfig.recommendationsOrientation = ORIENTATION_VERTICAL;
        blockConfig.rowCount = 3;
        blockConfig.groups = [];
        return blockConfig;
    }

    function escapeJsonString(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }

    function unescapeJsonString(str) {
        return str
            .replace(/&amp;/g, '&')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&#x27;/g, "'")
            .replace(/&quot;/g, '"');
    }


    return {
        getBlockConfiguration,
        setBlockConfiguration,
        getOrCreateConfig,
        getBlockConfigurationForCopiedBlock
    }
}