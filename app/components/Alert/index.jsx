import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      visible: PropTypes.bool,
    };
  }

  static get defaultProps() {
    return {
      visible: true,
    };
  }

  constructor(props) {
    super(props);

    const { visible } = props;

    this.state = {
      visible,
    };
  }

  close() {
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className="alert alert-dismissable fade show">
        {this.props.children}
        <button
          className="close"
          onClick={() => this.close()}
          type="button"
        >
          <span>&times;</span>
        </button>
      </div>
    );
  }
}

export default Alert;
