import { getSDK, Platform } from "open-im-sdk-wasm";

const OpenIM = getSDK(//{
  // coreWasmPath: "./openIM.wasm",
  // sqlWasmPath: "./sql-wasm.wasm",
  //}
);

// 我最终的目的，就是为flutter_openim_sdk添加web端聊天功能
// flutter可以直接调用wasm吗？还需调用如下的js方法
// flutter web库如何集成到已有的库中呢？
export async function login() {
  console.log("登录");
  try {
    let result = await OpenIM.login(
      {
        userID: "5874642646",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI1ODc0NjQyNjQ2IiwiUGxhdGZvcm1JRCI6MSwiZXhwIjoxNzMyMzcyMzkyLCJuYmYiOjE3MjQ1OTYwOTIsImlhdCI6MTcyNDU5NjM5Mn0.4mVitkOJPVLpRgoNrp2heAsaKhnHOd9kjf_DJdSwPVc",
        platformID: Platform.iOS,
        apiAddr: "https://openim.testeye.online/api",
        wsAddr: "wss://openim.testeye.online/msg_gateway",
        // logLevel: LogLevel.Verbose,
        tryParse: true,
      }, "12345678-123");
    console.log('登录结果', result);
  } catch (err) {
    console.log("错误", err);
  };
  // 获取所有对话
  OpenIM.getAllConversationList().then((res) => {
    console.log("对话列表", res);
  }).catch((err) => {
    console.log("对话列表错误", err);
  });

  // 获取历史消息

  OpenIM.getAdvancedHistoryMessageList({
    lastMinSeq: 5,
    startClientMsgID: "",
    conversationID: "si_10003_5874642646",
    count: 30,
  }).then((res) => {
    console.log("历史消息", res);
  }).catch((err) => {
    console.log("历史消息错误", err);
  });
}
