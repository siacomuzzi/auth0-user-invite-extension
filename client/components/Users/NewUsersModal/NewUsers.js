import React, { PropTypes, Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import connectContainer from 'redux-static';

import { Error } from '../../Messages';

export default connectContainer(class NewUsers extends Component {

  constructor() {
    super();

    this.state = {
      error: ''
    }
  }

  static propTypes = {
    tryAgain: PropTypes.func.isRequired,
    nextView: PropTypes.func.isRequired,
    selectPath: PropTypes.func.isRequired
  }

  selectPath(path) {
    this.props.selectPath(path);
  }

  onSubmit() {
    if (!this.props.path) {
      return this.setState({
        error: 'Please select how you want to add users.'
      });
    }

    this.props.nextView();
  }

  renderNextBtn() {
    return (
      <Button
        type="button"
        className="btn btn-primary"
        onClick={this.onSubmit.bind(this)}>
          Next
      </Button>
    );
  }

  renderCancelBtn() {
    return (
      <Button
        type="button"
        className="btn btn-transparent"
        onClick={this.props.tryAgain}
        data-dismiss="modal">
          Cancel
      </Button>
    );
  }

  styleCardSelected(path) {
    if (this.props.path === path) {
      return {
        border: '1px solid #2cc0f3'
      }
    } else {
      return {
        border: '1px solid transparent'
      }
    }
  }

  renderPathCards(paths) {
    return Object.keys(paths).map(function(path) {
      var path = paths[path];
      return (
        <div key={path.code} className="col-xs-12 col-md-6" onClick={this.props.selectPath.bind(this, path.code)}>
          <article style={this.styleCardSelected(path.code)}
            className="card-docs"><i className="card-docs-icon ${path.icon}"></i>
            <h2 className="card-docs-title">{path.title}</h2>
            <p className="card-docs-description">{path.description}</p>
          </article>
        </div>
      );
    }.bind(this));
  }

  render() {

    var paths = {
      csv: {
        code: 'CSV',
        icon: 'icon-budicon-686',
        title: 'Import CSV',
        description: 'Import CSV file with your users'
      },
      singleUser: {
        code: 'SINGLE_USER',
        icon: 'icon-budicon-304',
        title: 'Create User',
        description: 'Create Single User'
      }
    }

    return (
      <div>
        <div className="modal-backdrop"></div>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header has-border">
              <Button type="button" data-dismiss="modal" className="close" onClick={this.props.tryAgain}>
                <span aria-hidden="true">×</span><span className="sr-only">Close</span>
              </Button>
              <h4 id="myModalLabel" className="modal-title">New Users</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">Select how do you want to add new users.</p>
              <Error message={(this.state.error) ? this.state.error : '' } />
              { this.renderPathCards(paths) }
            </div>
            <div className="modal-footer">
              { this.renderCancelBtn() } { this.renderNextBtn() }
            </div>
          </div>
        </div>
      </div>
    );
  }
});
