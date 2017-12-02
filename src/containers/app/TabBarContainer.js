import React from 'react';

import { connect } from 'react-redux';
import TabBar from '../../components/app/TabBar';

const TabBarContainer = (props) => {
  return (
    <TabBar
      profilePhoto={props.profilePhoto}
      navigation={props.navigation}
    />
  )
}

function mapStateToProps(state) {
  const currentUser = state.userMeta[state.auth.userId]
  const imageUrl = currentUser && currentUser.photo && currentUser.photo.imageUrl

  return {
    profilePhoto: imageUrl && { uri: imageUrl }
  }
}

export default connect(mapStateToProps)(TabBarContainer)
