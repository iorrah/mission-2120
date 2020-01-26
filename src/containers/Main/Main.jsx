import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { toast } from "react-toastify";

import consumersRaw from "../../api/consumers.js";
import { date, currency, sortObjectArray } from "../../utils/formatter.js";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      consumers: consumersRaw,
      modalOpen: false,
      currentConsumer: {}
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSaveChanges = this.handleSaveChanges.bind(this);
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
      currentConsumer: {}
    });
  }

  handleInputChange(event) {
    const budget = event.target.value;

    this.setState({
      currentConsumer: { ...this.state.currentConsumer, budget }
    });
  }

  handleSaveChanges() {
    const { consumers, currentConsumer } = this.state;
    const updatedConsumers = consumers.filter(i => i.id !== currentConsumer.id);

    this.setState({
      modalOpen: false,
      currentConsumer: {},
      consumers: sortObjectArray([...updatedConsumers, currentConsumer])
    });

    this.handleSuccess();
  }

  handleClickCheckbox(e) {
    e.preventDefault();
    return false;
  }

  handleSuccess() {
    // Provide feedbacks
    toast.success("Budged updated successfully");
  }

  render() {
    const { consumers, modalOpen, currentConsumer } = this.state;

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
              <Modal.Title>{currentConsumer.name}</Modal.Title>
            )}
          </Modal.Header>

          {currentConsumer.budget !== undefined && (
            <Modal.Body>
              <div className="row modal__body">
                <div className="col-6">
                  <p className="modal__label">Total budget:</p>
                </div>
                <div className="col-6">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Text id="basic-addon1">€</InputGroup.Text>
                    </InputGroup.Prepend>

                    <FormControl
                      placeholder="e.g. 528 489,31"
                      aria-label="Budget"
                      aria-describedby="basic-addon1"
                      value={currency(currentConsumer.budget)}
                      onChange={this.handleInputChange}
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
