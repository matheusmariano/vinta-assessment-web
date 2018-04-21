import React, { Component } from 'react';
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
        key={commit.sha}
      >
        <b>{commit.commit.message}</b>
        <div className="media">
          <img
            alt={commit.author.login}
            className="rounded mr-2"
            src={commit.author.avatar_url}
          />
          <div className="media-body">
            <b>{commit.author.login}</b>&nbsp;
            <FormattedMessage id="dashboard.repositories.commits.commited" />&nbsp;
            {timeAgo.format(moment(commit.commit.author.date).toDate())}
          </div>
        </div>
      </li>
    ));
  }

  constructor(props) {
    super(props);

    this.state = {
      commits: [
        {
          sha: 'asdfasdfa',
          commit: {
            message: 'Add .gitignore file',
            author: {
              date: '2017-04-14T16:00:49Z',
            },
          },
          author: {
            login: 'matheusmariano',
            avatar_url: 'https://avatars1.githubusercontent.com/u/2306588?s=60&v=4',
          },
        },
        {
          sha: 'asdfasdfd',
          commit: {
            message: 'First commit',
            author: {
              date: '2017-04-14T16:00:49Z',
            },
          },
          author: {
            login: 'matheusmariano',
            avatar_url: 'https://avatars1.githubusercontent.com/u/2306588?s=60&v=4',
          },
        },
      ]
    };
  }

  render() {
    return (
      <ul
        className="list-group list-group-flush row"
        styleName="commits"
      >
        {Commits.renderList(this.state.commits)}
      </ul>
    );
  }
}

export default Commits;
