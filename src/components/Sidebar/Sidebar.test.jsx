import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  it("should shallow correctly", () => {
    expect(shallow(<Sidebar />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<Sidebar />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<Sidebar />)).toMatchSnapshot();
  });

  it("renders the `.Sidebar` div", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".sidebar").exists()).toBeTruthy();
  });

  it("renders the white background `.sidebar__skeleton`", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".sidebar__skeleton").exists()).toBeTruthy();
  });

  it("renders the `.sidebar__content` wrapper", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".sidebar__content").exists()).toBeTruthy();
  });

  it("renders 7 `.sidebar__icon`", () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper.find(".sidebar__icon").length).toBe(7);
  });
});
