import React from "react";
import FormControl from "react-bootstrap/FormControl";
import { currency } from "../../utils/formatter.js";

class CleaveBudget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { untouched: true };
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ untouched: false });

    const { value } = event.target;
    const rawValue = this.getRawValue(value);

    if (!isNaN(rawValue)) {
      this.props.onChange(value, parseFloat(rawValue, 10));
    }
  }

  getRawValue(value) {
    const strFloat = value
      .split(".")
      .join("")
      .replace(",", ".");

    return strFloat;
  }

  render() {
    let value;

    if (this.state.untouched === true) {
      value = currency(this.props.value);
    } else {
      value = this.props.value;
    }

    return (
      <FormControl
        aria-label={this.props.arialLabel}
        aria-describedby={this.props.arialDescribedBy}
        type="text"
        value={value}
        onChange={this.onChange.bind(this)}
        autoFocus={true}
        placeholder={this.props.placeholder}
        className={this.props.className}
      />
    );
  }
}

export default CleaveBudget;
