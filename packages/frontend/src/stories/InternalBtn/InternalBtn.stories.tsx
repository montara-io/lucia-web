import * as React from "react";
import InternalBtn from "./InternalBtn";

export default {
  title: "Components/Common/InternalBtn",
  component: InternalBtn,
};

export const basic = (args) => <InternalBtn {...args} />;
basic.args = {
  text: "MORE",
  callback: null,
};

basic.parameters = {
  jest: ["Chat.test.tsx"],
};
