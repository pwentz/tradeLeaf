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

  handleSubmit = (offer, request) => {
    const { actions, dispatch, auth, navigation } = this.props;

    return new Promise((resolve, reject) => {
      this.setState({ inProgress: true }, () =>
        dispatch(actions.photo.uploadAndCreatePhoto({ uri: offer.photo.imageUrl }))
          .then((photoId) =>
            dispatch(
              actions.offer.createOffer({
                photoId,
                categoryId: offer.category,
                description: offer.description,
                radius: offer.radius,
                token: auth.authToken,
              })
            )
          )
          .then((offerId) =>
            dispatch(
              actions.request.createRequest({
                offerId,
                categoryId: request.category,
                description: request.description,
                token: auth.authToken,
              })
            )
          )
          .then(() => dispatch(actions.user.getUser(auth.userId)))
          .then(() =>
            this.setState({ inProgress: false }, () => {
              navigation.navigate('Offers');
              resolve();
            })
          )
          .catch((err) => {
            handleIfApiError(err, (error) => {
              this.setState({ error });
              reject(error);
            });
          })
      );
    });
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
