import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import CloseToaster from "./CloseToaster";

describe("CloseToaster", () => {
  it("should shallow correctly", () => {
    expect(shallow(<CloseToaster />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<CloseToaster />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<CloseToaster />)).toMatchSnapshot();
  });
});
