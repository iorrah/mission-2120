import React from "react";
import { date, currency } from "../../utils/formatter.js";

const TableRow = props => (
  <tr className="main__table-row" onClick={props.handleClick}>
    <td>
      <input
        type="checkbox"
        className="main__checkbox"
        onClick={props.handleClickCheckbox}
      />
    </td>

    <td>{props.consumerId}</td>

    <td>
      <img
        src={`img/logo-${props.consumerId}.png`}
        className="main__row-logo"
        alt="Company Logo"
      />
    </td>

    <td>{props.consumerName}</td>
    <td>€{currency(props.consumerBudget)}</td>
    <td>€{currency(props.consumerBudgetSpent)}</td>
    <td>{date(props.consumerDateFirstPurchase)}</td>

    <td>
      <img
        src="img/icon-8.png"
        className="main__row-action"
        alt="Further actions"
      />
    </td>
  </tr>
);

export default TableRow;
