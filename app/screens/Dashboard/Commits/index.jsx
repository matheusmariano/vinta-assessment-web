import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import TimeAgo from 'javascript-time-ago';
import moment from 'moment';
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

  render() {
    return (
      <Fragment>
        {this.props.requesting ? (
          <div className="row">
            <div className="col d-flex align-content-center justify-content-center">
              <i className="fas fa-circle-notch fa-2x fa-spin my-3" />
            </div>
          </div>
        ) : (
          <ul
            className="list-group list-group-flush row"
            styleName="commits"
          >
            {Commits.renderList(this.props.commits)}
          </ul>
        )}
      </Fragment>
    );
  }
}

Commits.propTypes = {
  commits: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
  ).isRequired,
  requesting: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  commits: state.commits.commits,
  requesting: state.commits.requesting,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Commits);
