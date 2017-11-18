export const photos = {
  1: {
    id: 1,
    cloudinaryId: "abc123",
    imageUrl: 'https://somephoto.png',
    createAt: '2017-11-18T00:12:46.618258Z',
    updatedAt: '2017-11-17T00:12:46.618258Z'
  },
  3: {
    id: 3,
    cloudinaryId: 'adns',
    imageUrl: 'https://imagethings.jpeg',
    createdAt: '2017-11-18T00:12:46.618258Z',
    updatedAt: '2017-11-18T00:12:46.618258Z'
  }
}

export const authedUser = {
    id: 1,
    coordinates: {lat: 37.785384, lng: -122.406417},
    email: "buddy@gmail.com",
    firstName: "Buddy",
    lastName: "Fields",
    username: "bgil5",
    offers: [
      {
        id: 1,
        categoryId: 1,
        photoId: 2,
        userId: 1,
        radius: null,
        description: "giving away food!",
        createdAt: "2017-11-18T00:12:46.618258Z",
        updatedAt: "2017-11-18T00:12:46.618258Z"
      }
    ],
    photo: {
      id: 2,
      cloudinaryId: "xyz780",
      imageUrl: 'https://someofferphoto.png',
      createAt: '2017-11-18T00:12:46.618258Z',
      updatedAt: '2017-11-17T00:12:46.618258Z'
    }
}

export const users = {
  1: authedUser,
  2: {
    id: 2,
    coordinates: {lat: 12.424, lng: -123.431},
    email: "name@gmail.com",
    firstName: "Fred",
    lastName: "Jackson",
    username: "freddy-jack",
    offers: [],
    photo: null
  },
  3: {
    id: 3,
    coordinates: null,
    email: "jim@yahoo.com",
    firstName: "Jim",
    lastName: "Harrison",
    username: "harry-jim",
    offers: [
      {
        id: 3,
        categoryId: 1,
        photoId: 3,
        userId: 3,
        radius: 15,
        description: 'i hate cheese. please have',
        createdAt: '2017-11-18T00:12:46.618258Z',
        updatedAt: '2017-11-18T00:12:46.618258Z'
      }
    ],
    photo: {
      id: 5,
      cloudinaryId: 'cloudz0',
      imageUrl: 'https://inthecloud.png',
      createdAt: '2017-11-18T00:12:46.618258Z',
      updatedAt: '2017-11-18T00:12:46.618258Z'
    }
  }
}