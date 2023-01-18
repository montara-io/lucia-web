import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Loading from "./Loading";

describe("Test Input Component", () => {
  it("Snapshot renders correctly - dark mode", () => {
    const wrapper = render(
      <Loading
        {...{
          id: "Loading",
          mode: "dark",
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Snapshot renders correctly - light mode", () => {
    const wrapper = render(
      <Loading
        {...{
          id: "Loading",
          mode: "light",
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
