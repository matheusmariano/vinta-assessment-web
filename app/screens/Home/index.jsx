import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

class HomeScreen extends Component {
  static get contextTypes() {
    return {
      intl: PropTypes.object.isRequired,
    };
  }

  componentWillMount() {
    document.title = this.formatMessage({ id: 'home.page_title' });
  }

  formatMessage(props) {
    return this.context.intl.formatMessage(props);
  }

  render() {
    return (
      <section>
        <h1>
          <FormattedMessage id="home.title" />
        </h1>
      </section>
    );
  }
}

export default HomeScreen;
