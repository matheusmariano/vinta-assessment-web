import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import RepositoriesActions from '../../../data/repositories/redux';
import CommitsActions from '../../../data/commits/redux';

class Repositories extends Component {
  componentWillMount() {
    const { user, requestSuccess } = this.props;

    this.loadRepositories({ user, requestSuccess });
  }

  componentWillReceiveProps({ user, requestSuccess }) {
    this.loadRepositories({ user, requestSuccess });
  }

  loadRepositories({ user, requestSuccess }) {
    if (user && requestSuccess === null) {
      this.props.requestRepositories(user.api_token);
      this.props.commitsRequest(user.api_token);
    }
  }

  loadAllCommits() {
    this.props.commitsRequest(this.props.user.api_token);
  }

  loadCommits(repository) {
    const r = repository.split('/');

    this.props.commitsRequestFromRepository(this.props.user.api_token, r[0], r[1]);
  }

  renderList(repositories) {
    return repositories.map((repository) => {
      const path = `/dashboard/repositories/${repository.name}`;

      return (
        <Link
          className="list-group-item list-group-item-action"
          href={path}
          key={repository.name}
          onClick={() => this.loadCommits(repository.name)}
          to={path}
        >
          {repository.name}
        </Link>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <nav className="list-group list-group-flush row">
          <Link
            className="list-group-item list-group-item-action bg-light"
            href="/dashboard/repositories"
            onClick={() => this.loadAllCommits()}
            to="/dashboard/repositories"
          >
            <b>
              <FormattedMessage id="dashboard.repositories.all" />
            </b>
          </Link>
          {this.renderList(this.props.repositories)}
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
  commitsRequest: PropTypes.func.isRequired,
  commitsRequestFromRepository: PropTypes.func.isRequired,
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
  commitsRequest: token => dispatch(
    CommitsActions.commitsRequest(token),
  ),
  commitsRequestFromRepository: (token, username, repository) => dispatch(
    CommitsActions.commitsRequestFromRepository(token, username, repository),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Repositories);
