export function createUploader() {
  this.cloudinaryId = 1;

  function upload({uri, type, name}) {
    return Promise.resolve({
      public_id: this.cloudinaryId++,
      url: 'https://cloudinary.com/fakeImage'
    });
  };

  return { upload };
};
