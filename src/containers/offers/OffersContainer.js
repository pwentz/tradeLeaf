import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleIfApiError, displayableError } from '../../api/utils';
import OfferList from '../../components/offers/OfferList';

class OffersContainer extends Component {
  get user() {
    const { auth, userMeta } = this.props;
    return userMeta[auth.userId];
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      inProgress: false,
    };
  }

  handleRemoveOffer = (offerId) => {
    const { actions, dispatch, auth } = this.props;

    this.setState({ inProgress: true }, () => {
      dispatch(actions.user.removeOffer({ offerId, token: auth.authToken }))
        .then(() => {
          return dispatch(actions.user.getUser(auth.userId));
        })
        .then(() => this.setState({ inProgress: false }))
        .catch((err) => {
          handleIfApiError(err, (error) => {
            this.setState({ inProgress: false, error });
          });
        });
    });
  };

  render() {
    return (
      <OfferList
        offers={this.user.offers}
        handleRemoveOffer={this.handleRemoveOffer}
        inProgress={this.state.inProgress}
        error={this.state.error && displayableError(this.state.error)}
      />
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;
  return { ...state, actions };
}

export default connect(mapStateToProps)(OffersContainer);
