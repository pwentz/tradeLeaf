import React, { Component } from 'react';
import Create from '../../components/create/Create';

export default class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
    };
  }

  handleSubmit = () => {
    return;
  };

  render() {
    return (
      <Create
        inProgress={this.state.inProgress}
        onSubmit={this.handleSubmit}
        onPhotoUpload={this.handlePhotoUpload}
      />
    );
  }
}
