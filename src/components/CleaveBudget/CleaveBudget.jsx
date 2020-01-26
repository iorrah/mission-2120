import React from "react";
import Cleave from "cleave.js/react";

class CleaveBudget extends React.Component {
  render() {
    return (
      <Cleave
        options={{ numeral: true }}
        type="text"
        value={this.props.value}
        onChange={this.props.onChange}
        autoFocus={true}
        placeholder={this.props.placeholder}
        className={this.props.className}
      />
    );
  }
}

export default CleaveBudget;
