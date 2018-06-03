import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';
import globalStyles, { lightGray } from '../../styles';
import { sortByRecency } from '../../util/list';
import Offer from '../../components/offers/Offer';

export default class extends Component {
  static propTypes = {
    offers: PropTypes.array.isRequired,
    handleRemoveOffer: PropTypes.func.isRequired,
    inProgress: PropTypes.bool,
    error: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      offers: props.offers,
    };
  }

  componentWillReceiveProps({ offers }) {
    this.setState({ offers });
  }

  handleRemoveOffer = (offerId) => {
    this.setState(
      (prevState) => ({
        offers: prevState.offers.filter((offer) => offer.id !== offerId),
      }),
      () => this.props.handleRemoveOffer(offerId)
    );
  };

  render() {
    // TODO: add a spinner over a blurred overlay for loading
    const { error } = this.props;

    return (
      <View style={[globalStyles.overlay, { backgroundColor: lightGray }]}>
        {!!error && <Text style={globalStyles.errorText}>{error}</Text>}

        <ScrollView contentContainerStyle={globalStyles.container}>
          {sortByRecency(this.state.offers).map((offer) => (
            <Offer
              key={offer.id}
              offer={offer}
              onTrashPress={() => this.handleRemoveOffer(offer.id)}
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}
