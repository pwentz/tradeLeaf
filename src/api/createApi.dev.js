import Api from './Api';

export function createApi() {
  return new Api({
    apiUrl: 'http://localhost:8080/',
    cloudinary: {
      cloud: 'tradeleaf',
      uploadPreset: 'mx9ed9ic'
    }
  });
};
