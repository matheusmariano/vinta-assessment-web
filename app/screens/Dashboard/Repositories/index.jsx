import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class Repositories extends Component {
  static renderList(repositories) {
    return repositories.map((repository) => {
      const path = `/dashboard/repositories/${repository.path}`;

      return (
        <Link
          className="list-group-item list-group-item-action"
          href={path}
          key={repository.path}
          to={path}
        >
          {repository.path}
        </Link>
      );
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      repositories: [
        {
          path: 'matheusmariano/react-fission',
        },
        {
          path: 'matheusmariano/pinnet',
        },
        {
          path: 'matheusmariano/laravel-graphql',
        },
        {
          path: 'matheusmariano/aula-multi-auth',
        },
      ],
    };
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
          {Repositories.renderList(this.state.repositories)}
        </nav>
      </Fragment>
    );
  }
}

export default Repositories;
