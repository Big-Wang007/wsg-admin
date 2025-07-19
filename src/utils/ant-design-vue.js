import {
  Button,
  Layout,
  // Alert,
  // Breadcrumb,
  // Menu,
  // Form,
  // Input,
  // message,
  Table,
  // DatePicker,
  // Select,
  // Row,
  // Col,
  // ConfigProvider,
  Dropdown,
  Avatar,
  Statistic,
  Progress,
  Tabs,
  RangePicker,
  Card,
  Segmented,
  Upload,
  Space,
} from "ant-design-vue";

export default function installAntd(app) {
  app.use(Button);
  app.use(Layout);
  // app.use(Alert);
  // app.use(Breadcrumb);
  // app.use(Menu);
  // app.use(Form);
  // app.use(Input);
  app.use(Table);
  // app.use(DatePicker);
  // app.use(Select);
  // app.use(Row);
  // app.use(Col);
  // app.use(ConfigProvider);
  app.use(Dropdown);
  app.use(Avatar);
  app.use(Statistic);
  app.use(Progress);
  app.use(Tabs);
  app.use(RangePicker);
  app.use(Card);
  app.use(Segmented);
  app.use(Upload);
  app.use(Space);
  // message.config({
  //   top: `100px`,
  //   duration: 2,
  //   maxCount: 3,
  //   rtl: true,
  //   prefixCls: "my-message",
  // });
  // app.provide("$message", message);
}
