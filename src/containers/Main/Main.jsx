import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";

import BudgetInput from "../../components/BudgetInput";
import TableRow from "../../components/TableRow";
import consumersRaw from "../../api/consumers.js";
import { currency, sortObjectArray } from "../../utils/formatter.js";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      consumers: consumersRaw,
      modalOpen: false,
      currentConsumer: {},
      modalErrorMessage: ""
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
    this.updateConsumerBudget = this.updateConsumerBudget.bind(this);
    this.setModalErrorMessage = this.setModalErrorMessage.bind(this);
  }

  handleOpenModal(consumer) {
    this.setState({
      modalOpen: true,
      currentConsumer: {
        ...consumer,
        budget_untouched: currency(consumer.budget)
      }
    });
  }

  handleCloseModal() {
    this.setState({
      modalOpen: false,
      currentConsumer: {},
      modalErrorMessage: ""
    });
  }

  handleInputChange(value, rawValue) {
    this.setState({
      currentConsumer: {
        ...this.state.currentConsumer,
        budget: value,
        budget_raw: rawValue
      }
    });
  }

  handleSaveChanges() {
    const { currentConsumer: consumer } = this.state;

    if (this.isSameBudget(consumer)) {
      this.handleCloseModal();
    } else {
      if (this.isValidBudget(consumer)) {
        if (this.isMoreThanSpent(consumer)) {
          this.setModalErrorMessage("");
          this.updateConsumerBudget(consumer);
        } else {
          this.setMoreThanSpentError(consumer.budget_spent);
        }
      } else {
        this.setInvalidBudgetError();
      }
    }
  }

  isSameBudget(consumer) {
    return consumer.budget_raw === consumer.budget_untouched;
  }

  isValidBudget(consumer) {
    return consumer && consumer.budget_raw && !isNaN(consumer.budget_raw);
  }

  isMoreThanSpent(consumer) {
    return consumer.budget_raw >= parseFloat(consumer.budget_spent.toFixed(2));
  }

  setMoreThanSpentError(spent) {
    this.setModalErrorMessage(
      `Ops... the budget must be higher than the spent budget (€${currency(
        spent
      )})`
    );
  }

  setInvalidBudgetError() {
    this.setModalErrorMessage("Ops... the budget must be a valid number");
  }

  updateConsumerBudget(consumer) {
    const { consumers } = this.state;
    const untouchedConsumers = consumers.filter(i => i.id !== consumer.id);

    this.setState({
      modalOpen: false,
      consumer: {},
      consumers: sortObjectArray([
        ...untouchedConsumers,
        { ...consumer, budget: consumer.budget_raw }
      ])
    });

    this.handleSuccess();
  }

  setModalErrorMessage(message) {
    this.setState({ modalErrorMessage: message });
  }

  handleClickCheckbox(e) {
    e.preventDefault();
    return false;
  }

  handleSuccess() {
    toast.success("Budged updated successfully");
  }

  render() {
    const {
      consumers,
      modalOpen,
      currentConsumer,
      modalErrorMessage
    } = this.state;

    return (
      <div className="main__container">
        <div className="main__delimiter">
          <div className="main__header">
            <h1 className="main__title">
              Consumers
              <small className="main__counter">({consumers.length})</small>
            </h1>

            <div className="main__actions">
              <Button variant="light" className="main__button-light">
                Filter
                <img
                  src="img/icon-14.png"
                  className="main__filter-icon"
                  alt="Filter"
                />
              </Button>

              <Button variant="primary" className="main__button-primary">
                Add Consumer
                <img
                  src="img/icon-13.png"
                  className="main__plus-icon"
                  alt="Add"
                />
              </Button>
            </div>
          </div>

          <table className="main__table">
            <thead>
              <tr className="main__table-header-row">
                <th className="main__table-header-checkbox">
                  <input type="checkbox" className="main__checkbox" />
                </th>

                <th className="main__table-header-id">ID</th>
                <th className="main__table-header-logo">COMPANY</th>
                <th className="main__table-header-name">NAME</th>
                <th className="main__table-header-budget">BUDGET</th>

                <th className="main__table-header-budget-spent">
                  BUDGET SPENT
                </th>

                <th className="main__table-header-date">
                  DATE OF FIRST PURCHASE
                </th>

                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody className="main__table-body">
              {sortObjectArray(consumers).map(consumer => (
                <TableRow
                  key={`consumer-${consumer.id}`}
                  handleClick={() => this.handleOpenModal(consumer)}
                  handleClickCheckbox={this.handleClickCheckbox}
                  consumerId={consumer.id}
                  consumerName={consumer.name}
                  consumerBudget={consumer.budget}
                  consumerBudgetSpent={consumer.budget_spent}
                  consumerDateFirstPurchase={consumer.date_of_first_purchase}
                />
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={modalOpen} onHide={this.handleCloseModal} centered>
          <Modal.Header closeButton>
            {currentConsumer.name !== undefined && (
              <Modal.Title>
                <img
                  src={`img/logo-${currentConsumer.id}.png`}
                  className="modal__logo"
                  alt="Company Logo"
                />

                {currentConsumer.name}
              </Modal.Title>
            )}
          </Modal.Header>

          {currentConsumer.budget !== undefined && (
            <Modal.Body>
              {modalErrorMessage && (
                <p className="modal__error-message">{modalErrorMessage}</p>
              )}

              <div className="row modal__body">
                <div className="col-6">
                  <p className="modal__label">Total budget:</p>
                </div>

                <div className="col-6">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">€</InputGroup.Text>
                    </InputGroup.Prepend>

                    <BudgetInput
                      placeholder={currentConsumer.budget_untouched}
                      value={currentConsumer.budget}
                      onChange={this.handleInputChange}
                      className="form-control"
                      arialLabel="Consumer budget"
                      arialDescribedBy=""
                    />
                  </InputGroup>
                </div>
              </div>
            </Modal.Body>
          )}

          <Modal.Footer>
            <Button variant="light" onClick={this.handleCloseModal}>
              Close
              <img
                src="img/icon-16.png"
                className="modal__close-icon"
                alt="Close"
              />
            </Button>

            <Button variant="primary" onClick={this.handleSaveChanges}>
              Save Changes
              <img
                src="img/icon-15.png"
                className="modal__check-icon"
                alt="Check mark"
              />
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Main;
