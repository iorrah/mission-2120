import React from "react";
import Button from "react-bootstrap/Button";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import consumers from "./api/consumers.js";
import { date, currency } from "./utils/formatter.js";

const App = function() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Sidebar />

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
                {consumers.map(consumer => (
                  <tr
                    className="main__table-row"
                    key={`consumer-${consumer.id}`}
                  >
                    <td>
                      <input type="checkbox" className="main__checkbox" />
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
        </div>
      </main>
    </div>
  );
};

export default App;
