import React, { Component } from 'react';
import Create from '../../components/create/Create';
import { connect } from 'react-redux';
import { handleIfApiError, displayableError } from '../../api/utils';

class CreateContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inProgress: false,
      error: null,
    };
  }

  componentWillMount() {
    const { dispatch, actions } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.category.getCategories())
        .then(() => this.setState({ inProgress: false }))
        .catch((err) => {
          handleIfApiError(err, (error) => {
            this.setState({ inProgress: false, error });
          });
        });
    });
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
        apiError={displayableError(this.state.error)}
        categories={this.props.category.categories}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;

  return { ...state, actions };
}

export default connect(mapStateToProps)(CreateContainer);
