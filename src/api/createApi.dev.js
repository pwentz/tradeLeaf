import Api from './Api';
// 'clients' dir holds wrappers for react-native (non-ui) modules
import LocalStorageClient from './clients/LocalStorageClient';
import LocationClient from './clients/LocationClient';
import ChatSocketClient from './clients/ChatSocketClient';

export function createApi() {
  return new Api({
    apiUrl: 'http://localhost:8080/',
    cloudinary: {
      cloud: 'tradeleaf',
      uploadPreset: 'mx9ed9ic',
    },
    localStorageClient: LocalStorageClient,
    locationClient: LocationClient,
    chatClient: new ChatSocketClient('ws://localhost:9160/'),
  });
}
