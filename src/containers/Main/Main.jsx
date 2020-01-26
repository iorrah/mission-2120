import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import { toast } from "react-toastify";

import CleaveBudget from "../../components/CleaveBudget";
import consumersRaw from "../../api/consumers.js";
import { date, currency, sortObjectArray } from "../../utils/formatter.js";

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
      currentConsumer: consumer
    });
  }

  handleCloseModal() {
    this.setState({
      modalOpen: false,
      currentConsumer: {},
      modalErrorMessage: ""
    });
  }

  handleInputChange(event) {
    const budget = event.target.value;

    this.setState({
      currentConsumer: { ...this.state.currentConsumer, budget }
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
          this.setModalErrorMessage(
            `Ops... the budget must be higher than the spent budget (€${currency(
              consumer.budget_spent
            )})`
          );
        }
      } else {
        this.setModalErrorMessage("Ops... the budget must be a valid number");
      }
    }
  }

  isSameBudget(consumer) {
    const { consumers } = this.state;
    const untouchedConsumer = consumers.find(i => i.id === consumer.id);
    return consumer.budget === untouchedConsumer.budget;
  }

  isValidBudget(consumer) {
    debugger;
    return consumer && consumer.budget && !isNaN(consumer.budget);
  }

  isMoreThanSpent(consumer) {
    return consumer.budget >= consumer.budget_spent;
  }

  updateConsumerBudget(consumer) {
    const { consumers } = this.state;
    const untouchedConsumers = consumers.filter(i => i.id !== consumer.id);

    this.setState({
      modalOpen: false,
      consumer: {},
      consumers: sortObjectArray([...untouchedConsumers, consumer])
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
                <th className="main__table-header-budget">BUDGET €</th>

                <th className="main__table-header-budget-spent">
                  BUDGET SPENT €
                </th>

                <th className="main__table-header-date">
                  DATE OF FIRST PURCHASE
                </th>

                <th>&nbsp;</th>
              </tr>
            </thead>

            <tbody className="main__table-body">
              {sortObjectArray(consumers).map(consumer => (
                <tr
                  className="main__table-row"
                  key={`consumer-${consumer.id}`}
                  onClick={() => this.handleOpenModal(consumer)}
                >
                  <td>
                    <input
                      type="checkbox"
                      className="main__checkbox"
                      onClick={this.handleClickCheckbox}
                    />
                  </td>

                  <td>{consumer.id}</td>

                  <td>
                    <img
                      src={`img/logo-${consumer.id}.png`}
                      className="main__row-logo"
                      alt="Company Logo"
                    />
                  </td>

                  <td>{consumer.name}</td>
                  <td>{currency(consumer.budget)}</td>
                  <td>{currency(consumer.budget_spent)}</td>
                  <td>{date(consumer.date_of_first_purchase)}</td>

                  <td>
                    <img
                      src="img/icon-8.png"
                      className="main__row-action"
                      alt="Further actions"
                    />
                  </td>
                </tr>
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

                    <CleaveBudget
                      placeholder="e.g. 528 489,31"
                      value={currentConsumer.budget}
                      onChange={this.handleInputChange}
                      className="form-control"
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
