
function generateCloudinaryUploadUrl({cloud}) {
  return `https://api.cloudinary.com/v1_1/${cloud}/image/upload`;
};

export function createUploader({uploadPreset, cloud}) {
  const uploadUrl = generateCloudinaryUploadUrl(({cloud}));

  function upload({uri, type, name}) {
    const photo = {
      uri,
      type: type || 'image/jpeg',
      name: name || 'uploadedPhoto'
    };

    const body = new FormData();
    body.append('upload_preset', uploadPreset);
    body.append('file', photo);

    return fetch(uploadUrl, {
      method: 'POST',
      body: body
    }).then((res) => {
      return res.json();
    });
  };

  return {
    upload
  }
};
