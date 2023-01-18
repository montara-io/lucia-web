import React from "react";
import { fireEvent, render } from "@testing-library/react";
import InternalBtn, { InternalBtnProps } from "./InternalBtn";

describe("InternalBtn Component", () => {
  let props: InternalBtnProps;
  const callback = jest.fn();

  beforeEach(() => {
    props = {
      text: "text",
      callback,
    };
  });

  it("Snapshot renders correctly", () => {
    const wrapper = render(<InternalBtn {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("Trigger callback when triggering the internal link button", () => {
    const wrapper = render(<InternalBtn {...props} />);
    expect(callback.mock.calls.length).toEqual(0);
    fireEvent.click(wrapper.getByText("text"));
    expect(callback.mock.calls.length).toEqual(1);
  });
});
