import { photoActionTypes, createPhotoActions } from '../../src/actions/photo';
import { MockDispatch } from './utils';

import { expect } from 'chai';

class MockApi {
  uploadToCloudinary(image) {
    return Promise.resolve({ public_id: 'xyz789', url: 'https://dog.png' });
  };

  createPhoto(cloudinaryId, imageUrl) {
    return Promise.resolve(1);
  };

  updateUserWithPhoto(userId, authToken, photoId) {
    return Promise.resolve();
  };
};

const mockDispatch = new MockDispatch();
const actions = createPhotoActions(new MockApi());

describe('photo actions', () => {
  beforeEach(() => {
    mockDispatch.reset();
  });

  it('uploads to cloudinary, then creates photo, then updates user', (done) => {
    const imageSource = { uri: 'file://dog.png' }

    mockDispatch.dispatch(actions.uploadAndCreateProfilePhoto(3, 'abc123', imageSource))
      .then(res => {

        expect(mockDispatch.actions).to.deep.equal([
          { type: photoActionTypes.PHOTO_UPLOAD_TO_CLOUDINARY, imageSource },
          { type: photoActionTypes.PHOTO_UPLOAD_TO_CLOUDINARY_SUCCESS,
            uploaded: { public_id: 'xyz789', url: 'https://dog.png' }
          },
          { type: photoActionTypes.PHOTO_CREATE,
            cloudinaryId: 'xyz789', imageUrl: 'https://dog.png'
          },
          { type: photoActionTypes.PHOTO_CREATE_SUCCESS, photoId: 1 },
          { type: photoActionTypes.PHOTO_UPDATE_USER, userId: 3, photoId: 1 },
          { type: photoActionTypes.PHOTO_UPDATE_USER_SUCCESS,
            userId: 3, authToken: 'abc123', photoId: 1
          }
        ])

        done();
      })
      .catch(done);
  });
});
