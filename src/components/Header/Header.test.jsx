import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Header from "./Header";

describe("Header", () => {
  it("should shallow correctly", () => {
    expect(shallow(<Header />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<Header />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<Header />)).toMatchSnapshot();
  });

  it("renders the `.Header` div", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header").exists()).toBeTruthy();
  });

  it("renders the `.header__logo`", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header__logo").exists()).toBeTruthy();
  });

  it("renders the search `.header__input`", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header__input").exists()).toBeTruthy();
  });

  it("renders the notification `.header__bell`", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header__bell").exists()).toBeTruthy();
  });

  it("renders the user `.header__avatar`", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find(".header__avatar").exists()).toBeTruthy();
  });
});
