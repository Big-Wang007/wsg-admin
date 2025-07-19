import { initGlobalState } from "qiankun";

const initialState = {
  locale: "zh",
};

const qiankunActions = initGlobalState(initialState);

export default qiankunActions;
