import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TimeAgo from 'javascript-time-ago';
import moment from 'moment';
import CommitsActions from '../../../data/commits/redux';
import './styles.scss';

const timeAgo = new TimeAgo('pt-BR');

class Commits extends Component {
  static renderList(commits) {
    return commits.map(commit => (
      <li
        className="list-group-item"
        key={commit.uid}
      >
        <b>{commit.message}</b>
        <div className="media">
          <img
            alt={commit.author.username}
            className="rounded mr-2"
            src={commit.author.avatar_url}
          />
          <div className="media-body">
            <b>{commit.author.username}</b>&nbsp;
            <FormattedMessage id="dashboard.repositories.commits.commited" />&nbsp;
            {timeAgo.format(moment(commit.timestamp).toDate())}
          </div>
        </div>
      </li>
    ));
  }

  componentWillReceiveProps({ user, requestSuccess }) {
    if (user && requestSuccess === null) {
      this.props.commitsRequest(user.api_token);
    }
  }

  render() {
    return (
      <ul
        className="list-group list-group-flush row"
        styleName="commits"
      >
        {Commits.renderList(this.props.commits)}
      </ul>
    );
  }
}

Commits.propTypes = {
  user: PropTypes.shape({
    api_token: PropTypes.string.isRequired,
  }),
  commits: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
  requestSuccess: PropTypes.bool,
  commitsRequest: PropTypes.func.isRequired,
};

Commits.defaultProps = {
  user: null,
  requestSuccess: null,
};

const mapStateToProps = state => ({
  user: state.user.user,
  commits: state.commits.commits,
  requestSuccess: state.repositories.requestSuccess,
});

const mapDispatchToProps = dispatch => ({
  commitsRequest: token => dispatch(
    CommitsActions.commitsRequest(token),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Commits);
