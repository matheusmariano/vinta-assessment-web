import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AddRepository from './AddRepository/';
import Repositories from './Repositories/';
import Commits from './Commits/';
import './style.scss';

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-light bg-light">
          <Link
            className="navbar-brand"
            to="/dashboard"
            href="/dashboard"
          >
            <FormattedMessage id="general.title" />
          </Link>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <aside
              className="col-md-4 col-lg-3"
              styleName="aside"
            >
              <div className="row">
                <div className="col">
                  <AddRepository />
                </div>
              </div>
              <Repositories className="my-3" />
            </aside>
            <section className="col-md-8 col-lg-9">
              <Commits />
            </section>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default DashboardScreen;
