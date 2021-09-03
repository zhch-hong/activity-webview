const ITEM_CONFIG = require('@/assets/json/item_config.json').config;

/**
 * 获取名称和图标链接
 * @param {String} name
 * @returns
 */
function getAsset(name) {
  const item = ITEM_CONFIG.find((row) => row.item_key === name);
  const content = { name: '', icon: '' };
  if (typeof item !== 'undefined') {
    content.name = item.name;
    content.icon = `${process.env.ASSET_URL}/game_activity/item_config_image/${item.image}.png`;
  }
  return content;
}

export default getAsset;
