import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import App from "./App";

describe("App", () => {
  test("should shallow correctly", () => {
    expect(shallow(<App />)).toMatchSnapshot();
  });

  test("should mount correctly", () => {
    expect(mount(<App />)).toMatchSnapshot();
  });

  test("should render correctly", () => {
    expect(render(<App />)).toMatchSnapshot();
  });

  it("renders the `.App` div", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".App").exists()).toBeTruthy();
  });

  it("renders the `.main` section", () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(".main").exists()).toBeTruthy();
  });

  it("renders the `.Toastify` container", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(".Toastify").exists()).toBeTruthy();
  });

  it("renders the `.sidebar`", () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(".sidebar").exists()).toBeTruthy();
  });
});
