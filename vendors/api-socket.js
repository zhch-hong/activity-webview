import _ from 'lodash';
import { registerServeMsg, unregisterServeMsg } from './network';
import notifyValidate from '~/vendors/asset-notify-validate';
import assetNotify from '~/components_call/asset-notify';

/**
 * 订单状态
 * @param callback
 */
export function SKT_NOTIFY_PAY_ORDER_MSG(callback) {
  const message = 'notify_pay_order_msg';
  registerServeMsg(message, (event) => {
    callback(event);
  });

  return () => {
    unregisterServeMsg(message);
  };
}

/**
 * 任务状态改变消息
 * @param callback
 */
export function SKT_TASK_CHANGE_MSG(callback) {
  const message = 'task_change_msg';
  registerServeMsg(message, (event) => {
    callback(event);
  });

  return () => {
    unregisterServeMsg(message);
  };
}

/**
 * 资产改变消息
 * @param callback
 */
export function SKT_NOTIFY_ASSET_CHANGE_MSG(callback) {
  const message = 'notify_asset_change_msg';
  registerServeMsg(message, (params) => {
    const asset = params.change_asset;
    const filtAsset = asset
      .filter((item) => {
        if (item.asset_type.startsWith('obj_')) {
          if (typeof item.attribute !== 'undefined') {
            return true;
          }
        } else if (_.toNumber(item.asset_value) > 0) {
          return true;
        }

        return false;
      })
      .map((item) => ({ name: item.asset_type, count: _.toNumber(item.asset_value) }));

    const type = params.type;

    if (notifyValidate(type)) {
      assetNotify(filtAsset);
    }

    callback && callback(params);
  });

  return () => {
    unregisterServeMsg(message);
  };
}

/**
 * 季卡基本信息改变
 * @param callback
 * @returns
 */
export function SKT_JIKA_BASE_INFO_CHANGE_MSG(callback) {
  const message = 'jika_base_info_change_msg';
  registerServeMsg(message, callback);

  return () => {
    unregisterServeMsg(message);
  };
}

/**
 * 畅玩卡信息改变
 * @param {*} callback
 * @returns
 */
export function SKT_QUERY_CHANG_WAN_KA_BASE_INFO(callback) {
  const message = 'query_chang_wan_ka_base_info';
  registerServeMsg(message, callback);

  return () => {
    unregisterServeMsg(message);
  };
}
