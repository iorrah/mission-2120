import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import TableRow from "./TableRow";

const props = {
  handleClick: jest.fn(),
  handleClickCheckbox: jest.fn(),
  consumerId: 1,
  consumerName: "Apple",
  consumerBudget: 123456.789,
  consumerBudgetSpent: 987.6543,
  consumerDateFirstPurchase: "2120-03-18"
};

describe("TableRow", () => {
  it("should shallow correctly", () => {
    expect(shallow(<TableRow {...props} />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<TableRow {...props} />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<TableRow {...props} />)).toMatchSnapshot();
  });

  it("should trigger parent click handler", () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<TableRow {...props} handleClick={mockCallBack} />);
    wrapper.find("tr").simulate("click");
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it("renders the `.main__checkbox` input", () => {
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper.find(".main__checkbox").exists()).toBeTruthy();
  });

  it("renders the `.main__row-logo` company logo", () => {
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper.find(".main__row-logo").exists()).toBeTruthy();
  });

  it("renders the `.main__row-action` icon", () => {
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper.find(".main__row-action").exists()).toBeTruthy();
  });

  it("renders 8 columns `<td>`", () => {
    const wrapper = shallow(<TableRow {...props} />);
    expect(wrapper.find("td").length).toBe(8);
  });
});
