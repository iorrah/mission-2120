import React from "react";
import { render } from "@testing-library/react";
import { shallow, mount } from "enzyme";
import Main from "./Main";
import consumersRaw from "../../api/consumers.js";
import consumers from "../../api/consumers.js";

const mockedConsumer = {
  id: 1,
  name: "Starbucks",
  budget: 94726.572,
  budget_spent: 5783.7122,
  date_of_first_purchase: "2119-03-16"
};

const mockedConsumerDraft = {
  ...mockedConsumer,
  budget_untouched: "94.726,57"
};

describe("Main", () => {
  it("should shallow correctly", () => {
    expect(shallow(<Main />)).toMatchSnapshot();
  });

  it("should mount correctly", () => {
    expect(mount(<Main />)).toMatchSnapshot();
  });

  it("should render correctly", () => {
    expect(render(<Main />)).toMatchSnapshot();
  });

  it("should render the `.main__container` div", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(".main__container").exists()).toBeTruthy();
  });

  it("should render the `.main__delimiter` inside `.main__container`", () => {
    const wrapper = shallow(<Main />);
    expect(
      wrapper.find(".main__container .main__delimiter").exists()
    ).toBeTruthy();
  });

  it("should not render the `.modal` on page load", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(".modal").exists()).toBeFalsy();
  });

  it("should render the Filter Consumers list button", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(".main__button-light").exists()).toBeTruthy();
  });

  it("should render the Add Consumer button", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(".main__button-primary").exists()).toBeTruthy();
  });

  it("should render the page `.main__title`", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("h1.main_title").exists).toBeTruthy();
  });

  it("should render the page title properly", () => {
    const { getByText } = render(<Main />);
    const linkElement = getByText(/Consumers/i);
    expect(linkElement).toBeInTheDocument();
  });

  it("should render a counter within `.main__title`", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find(".main_title main__counter").exists).toBeTruthy();
  });

  it("should render a counter within `.main__title`", () => {
    const wrapper = shallow(<Main />);
    const counter = wrapper.find(".main__counter").first();
    expect(counter.text()).toBe(`(${consumersRaw.length})`);
  });

  it("should render 8 <th> columns", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find("th").length).toBe(8);
  });

  it("should load with default state", () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.state().consumers).toEqual(consumersRaw);
    expect(wrapper.state().modalOpen).toEqual(false);
    expect(wrapper.state().currentConsumer).toEqual({});
    expect(wrapper.state().modalErrorMessage).toEqual("");
  });

  describe("handleOpenModal", () => {
    it("should update state to modal-opened state", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      expect(wrapper.state("modalOpen")).toBe(false);
      instance.handleOpenModal(mockedConsumer);
      expect(wrapper.state("modalOpen")).toBe(true);

      expect(wrapper.state("currentConsumer")).toEqual(mockedConsumerDraft);
    });
  });

  describe("handleCloseModal", () => {
    it("should update state to modal-closed state", () => {
      const wrapper = shallow(<Main />);
      wrapper.setState({ modalOpen: true });
      const instance = wrapper.instance();
      instance.handleCloseModal();
      expect(wrapper.state("modalOpen")).toBe(false);
      expect(wrapper.state("currentConsumer")).toEqual({});
      expect(wrapper.state("modalErrorMessage")).toEqual("");
    });
  });

  describe("handleInputChange", () => {
    it("should update state with raw new budget", () => {
      const wrapper = shallow(<Main />);

      wrapper.setState({
        modalOpen: true,
        currentConsumer: mockedConsumerDraft
      });

      const instance = wrapper.instance();
      instance.handleInputChange("111.222,33", 111222.33);

      expect(wrapper.state("currentConsumer")).toEqual({
        ...mockedConsumerDraft,
        budget: "111.222,33",
        budget_raw: 111222.33
      });
    });
  });

  describe("handleSaveChanges", () => {
    it("should just close modal if budget didn't change", () => {
      const wrapper = shallow(<Main />);

      const currentConsumer = {
        ...mockedConsumer,
        budget: "94.726,57"
      };

      wrapper.setState({
        modalOpen: true,
        currentConsumer,
        modalErrorMessage: ""
      });

      const instance = wrapper.instance();
      instance.handleSaveChanges();
      const consumers = instance.getConsumers();

      expect(wrapper.state("modalErrorMessage")).toBe("");
      expect(wrapper.state("currentConsumer")).toEqual({});
      expect(wrapper.state("modalOpen")).toEqual(false);
      expect(wrapper.state("consumers")).toEqual(consumers);
    });

    it("should validate non decimal numbers", () => {
      const wrapper = shallow(<Main />);

      const currentConsumer = {
        ...mockedConsumer,
        budget_raw: "abc"
      };

      wrapper.setState({
        modalOpen: true,
        currentConsumer,
        modalErrorMessage: ""
      });

      const instance = wrapper.instance();
      instance.handleSaveChanges();

      expect(wrapper.state("modalErrorMessage")).toBe(
        "Ops... the budget must be a valid number"
      );

      expect(wrapper.state("currentConsumer")).toEqual(currentConsumer);
      expect(wrapper.state("modalOpen")).toEqual(true);
    });

    it("should validate budgets smaller than spent budget", () => {
      const wrapper = shallow(<Main />);

      const currentConsumer = {
        ...mockedConsumer,
        budget_raw: 1
      };

      wrapper.setState({
        modalOpen: true,
        currentConsumer,
        modalErrorMessage: ""
      });

      const instance = wrapper.instance();
      instance.handleSaveChanges();

      expect(wrapper.state("modalErrorMessage")).toBe(
        "Ops... the budget must be higher than the spent budget (€5.783,71)"
      );

      expect(wrapper.state("currentConsumer")).toEqual(currentConsumer);
      expect(wrapper.state("modalOpen")).toEqual(true);
    });

    it("should save changes when budget is valid", () => {
      const wrapper = shallow(<Main />);

      wrapper.setState({
        modalOpen: true,
        currentConsumer: mockedConsumer,
        modalErrorMessage: ""
      });

      const instance = wrapper.instance();
      instance.handleSaveChanges();

      expect(wrapper.state("modalOpen")).toEqual(false);
      expect(wrapper.state("currentConsumer")).toEqual({});
      expect(wrapper.state("modalErrorMessage")).toEqual("");
    });
  });

  describe("isSameBudget", () => {
    it("should be true", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();

      expect(
        instance.isSameBudget({ budget_raw: 1, budget_untouched: 1 })
      ).toBe(true);
    });

    it("should be false", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: 1, budget_untouched: 2 };
      expect(instance.isSameBudget(consumer)).toBe(false);
    });
  });

  describe("isValidBudget", () => {
    it("should be true", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: 1 };
      expect(instance.isValidBudget(consumer)).toBe(true);
    });

    it("should be false", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: "abc" };
      expect(instance.isValidBudget(consumer)).toBe(false);
    });
  });

  describe("isMoreThanSpent", () => {
    it("should be true", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: 2, budget_spent: 1 };
      expect(instance.isMoreThanSpent(consumer)).toBe(true);
    });

    it("should be true", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: 1, budget_spent: 1 };
      expect(instance.isMoreThanSpent(consumer)).toBe(true);
    });

    it("should be false", () => {
      const wrapper = shallow(<Main />);
      const instance = wrapper.instance();
      const consumer = { budget_raw: 0, budget_spent: 1 };
      expect(instance.isMoreThanSpent(consumer)).toBe(false);
    });
  });

  describe("updateConsumerBudget", () => {
    it("should update one item within the consumers list", () => {
      const wrapper = shallow(<Main />);

      const currentConsumer = {
        ...mockedConsumer,
        budget: 111222333.44,
        budget_raw: 111222333.44
      };

      wrapper.setState({
        modalOpen: true,
        currentConsumer,
        modalErrorMessage: ""
      });

      const instance = wrapper.instance();
      instance.updateConsumerBudget(currentConsumer);

      expect(wrapper.state().consumers[0]).toEqual(currentConsumer);
    });
  });
});
