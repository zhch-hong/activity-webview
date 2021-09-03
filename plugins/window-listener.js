import emitter from '~/vendors/emitter';

/**
 * 服务器主动推送的消息
 *
 * @param message 消息的名称
 * @param params 消息的数据
 */
function PositiveMessage(message, params) {
  emitter.emit(message, params);
}

/**
 * 发送请求后响应的消息
 *
 * @param uuid 消息的uuid
 * @param params 消息的数据
 */
function PassiveMessage(uuid, params) {
  emitter.emit(uuid, params);
}

/**
 * webview显示时调用
 */
function webviewWillAppear() {
  emitter.emit('webviewWillAppear');
}

// 添加全局方法，供uniwebview调用
Object.assign(window, { PositiveMessage, PassiveMessage, webviewWillAppear });
