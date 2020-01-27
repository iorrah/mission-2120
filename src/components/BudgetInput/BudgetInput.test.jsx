import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import BudgetInput from "./BudgetInput";

describe("BudgetInput", () => {
  it("should shallow correctly", () => {
    expect(shallow(<BudgetInput />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<BudgetInput />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<BudgetInput />)).toMatchSnapshot();
  });
});
