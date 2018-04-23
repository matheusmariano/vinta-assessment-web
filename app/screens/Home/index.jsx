import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import SweetAlert from 'sweetalert-react';
import firebase from 'firebase';
import * as R from 'ramda';
import UserActions from '../../data/user/redux';
import './styles.scss';

class HomeScreen extends Component {
  static get contextTypes() {
    return {
      intl: PropTypes.object.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      alert: {
        show: false,
        text: '',
        title: '',
      },
      signInButton: {
        disabled: false,
        hidden: false,
      },
    };
  }

  componentWillMount() {
    document.title = this.formatMessage({ id: 'general.title' });
  }

  componentWillReceiveProps({ requestSuccess }) {
    if (requestSuccess === false) {
      this.showAlert(
        this.formatMessage({ id: 'home.error.api_sign_in' }),
      );

      this.disableSignInButton(false);
    }
  }

  formatMessage(props) {
    return this.context.intl.formatMessage(props);
  }

  handleSignInButton() {
    this.disableSignInButton();
    const provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.showLoader();

        const token = result.credential.accessToken;

        this.props.signIn(token);
      })
      .catch(() => {
        this.showAlert(
          this.formatMessage({ id: 'home.error.github_sign_in' }),
        );

        this.disableSignInButton(false);
      });
  }

  disableSignInButton(set = true) {
    this.setState({
      signInButton: R.set(
        R.lensProp('disabled'),
        set,
        this.state.signInButton,
      ),
    });
  }

  showLoader() {
    this.setState({
      signInButton: R.set(
        R.lensProp('hidden'),
        true,
        this.state.signInButton,
      ),
    });
  }

  showAlert(text) {
    this.setState({
      alert: {
        show: true,
        text,
        title: this.formatMessage({ id: 'home.error.title' }),
      },
    });
  }

  closeAlert() {
    this.setState({
      alert: {
        show: false,
        text: '',
        title: '',
      },
    });
  }

  render() {
    const { alert, signInButton } = this.state;

    return (
      <section className="container-fluid">
        {this.props.requestSuccess && <Redirect to="/dashboard/repositories" />}
        <SweetAlert
          show={alert.show}
          text={alert.text}
          title={alert.title}
          onConfirm={() => this.closeAlert()}
        />
        <div
          className="row"
          styleName="hero"
        >
          <div
            className="
              col d-flex flex-column
              align-items-center justify-content-center
            "
          >
            <h1>
              <FormattedMessage id="general.title" />
            </h1>
            <p className="lead mb-4">
              <FormattedMessage id="home.title" />
            </p>
            {signInButton.hidden ?
              <i className="fas fa-circle-notch fa-2x fa-spin" /> :
              <button
                className="btn btn-dark"
                disabled={this.state.signInButton.disabled}
                onClick={() => this.handleSignInButton()}
              >
                <i className="fab fa-github fa-lg mr-2" />
                <FormattedMessage id="home.sign_in" />
              </button>
            }
          </div>
        </div>
      </section>
    );
  }
}

HomeScreen.propTypes = {
  requestSuccess: PropTypes.bool,
  signIn: PropTypes.func.isRequired,
};

HomeScreen.defaultProps = {
  requestSuccess: null,
};

const mapStateToProps = state => ({
  requestSuccess: state.user.requestSuccess,
});

const mapDispatchToProps = dispatch => ({
  signIn: token => dispatch(
    UserActions.userSignIn(token),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
