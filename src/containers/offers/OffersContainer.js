import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import globalStyles, { lightGray } from '../../styles';
import { handleIfApiError, displayableError } from '../../api/utils';
import { sortByRecency } from '../../util/list';
import Offer from '../../components/offers/Offer';

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

  handleDestroyOffer = (offerId) => {
    return;
  };

  render() {
    if (this.state.inProgress) {
      return <Text>Loading...</Text>;
    }

    return (
      <View style={[globalStyles.overlay, { backgroundColor: lightGray }]}>
        {!!this.state.error && <Text style={globalStyles.errorText}>{this.state.error}</Text>}

        <ScrollView contentContainerStyle={globalStyles.container}>
          {sortByRecency(this.user.offers).map((offer) => (
            <Offer key={offer.id} offer={offer} onTrashPress={this.handleDestroyOffer} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, props) {
  const { actions } = props.screenProps;
  return { ...state, actions };
}

export default connect(mapStateToProps)(OffersContainer);
