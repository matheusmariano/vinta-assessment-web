import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import RepositoriesActions from '../../../data/repositories/redux';

class Repositories extends Component {
  static renderList(repositories) {
    return repositories.map((repository) => {
      const path = `/dashboard/repositories/${repository.name}`;

      return (
        <Link
          className="list-group-item list-group-item-action"
          href={path}
          key={repository.name}
          to={path}
        >
          {repository.name}
        </Link>
      );
    });
  }

  componentWillReceiveProps({ user, requestSuccess }) {
    if (user && requestSuccess === null) {
      this.props.requestRepositories(user.api_token);
    }
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col">
            <form className="my-3">
              <div className="form-group">
                <div className="input-group">
                  <FormattedMessage id="dashboard.repositories.new">
                    {message => (
                      <input
                        className="form-control"
                        placeholder={message}
                        type="text"
                      />
                    )}
                  </FormattedMessage>
                  <div className="input-group-append">
                    <button
                      className="btn btn-success"
                      type="button"
                    >
                      <i className="fas fa-plus" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <nav className="list-group list-group-flush row">
          <Link
            className="list-group-item list-group-item-action bg-light"
            href="/dashboard/repositories"
            to="/dashboard/repositories"
          >
            <b>
              <FormattedMessage id="dashboard.repositories.all" />
            </b>
          </Link>
          {Repositories.renderList(this.props.repositories)}
        </nav>
        {this.props.requestSuccess === null && (
          <div className="row">
            <div className="col d-flex align-items-center justify-content-center">
              <i className="fas fa-circle-notch fa-2x fa-spin my-2" />
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

Repositories.propTypes = {
  user: PropTypes.shape({
    api_token: PropTypes.string.isRequired,
  }),
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    }),
  ).isRequired,
  requestSuccess: PropTypes.bool,
  requestRepositories: PropTypes.func.isRequired,
};

Repositories.defaultProps = {
  user: null,
  requestSuccess: null,
};

const mapStateToProps = state => ({
  user: state.user.user,
  repositories: state.repositories.repositories,
  requestSuccess: state.repositories.requestSuccess,
});

const mapDispatchToProps = dispatch => ({
  requestRepositories: token => dispatch(
    RepositoriesActions.repositoriesRequest(token),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
