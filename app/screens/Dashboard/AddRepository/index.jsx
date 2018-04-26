import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import RepositoriesActions from '../../../data/repositories/redux';

class AddRepository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };
  }

  changeInput(event) {
    this.setState({ input: event.target.value });
  }

  clearInput() {
    this.setState({ input: '' });
  }

  handleAdd() {
    this.props.addRepository(
      this.props.user.api_token,
      this.state.input,
    );

    this.clearInput();
  }

  isDisabled() {
    return this.props.requesting;
  }

  render() {
    return (
      <form className="my-3">
        <div className="form-group">
          <div className="input-group">
            <FormattedMessage id="dashboard.repositories.new">
              {message => (
                <input
                  className="form-control"
                  disabled={this.isDisabled()}
                  onChange={value => this.changeInput(value)}
                  placeholder={message}
                  type="text"
                  value={this.state.input}
                />
              )}
            </FormattedMessage>
            <div className="input-group-append">
              <button
                className="btn btn-success"
                disabled={this.isDisabled()}
                onClick={() => this.handleAdd()}
                type="button"
              >
                <i className="fas fa-plus" />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

AddRepository.propTypes = {
  user: PropTypes.shape({
    api_token: PropTypes.string.isRequired,
  }),
  requesting: PropTypes.bool.isRequired,
  addRepository: PropTypes.func.isRequired,
};

AddRepository.defaultProps = {
  user: null,
};

const mapStateToProps = state => ({
  user: state.user.user,
  requesting: state.repositories.requesting,
  requestSuccess: state.repositories.requestSuccess,
});

const mapDispatchToProps = dispatch => ({
  addRepository: (token, name) => dispatch(RepositoriesActions.repositoriesAdd(token, name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRepository);
