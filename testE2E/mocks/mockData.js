export const photos = {
  1: {
    id: 1,
    cloudinaryId: "abc123",
    imageUrl: 'https://somephoto.png',
    createdAt: '2017-11-18T00:12:46.618258Z',
    updatedAt: '2017-11-17T00:12:46.618258Z'
  },
  3: {
    id: 3,
    cloudinaryId: 'adns',
    imageUrl: 'https://imagethings.jpeg',
    createdAt: '2017-11-18T00:12:46.618258Z',
    updatedAt: '2017-11-18T00:12:46.618258Z'
  },
  8: {
    id: 8,
    cloudinaryId: 'some cloud id',
    imageUrl: 'https://sunset.png',
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
        category: "tutor",
        photo: photos[1],
        userId: 1,
        radius: null,
        description: "giving away food!",
        request: {
          id: 1,
          offerId: 1,
          category: 'transportation',
          description: 'i need daily rides'
        },
        createdAt: "2017-11-18T00:12:46.618258Z",
        updatedAt: "2017-11-18T00:12:46.618258Z"
      }
    ],
    photo: {
      id: 2,
      cloudinaryId: "xyz780",
      imageUrl: 'https://someofferphoto.png',
      createdAt: '2017-11-18T00:12:46.618258Z',
      updatedAt: '2017-11-17T00:12:46.618258Z'
    }
}

export const authedUserToken = 'xyz789'

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
        category: "baby sitting",
        photo: photos[3],
        userId: 3,
        radius: 15,
        description: 'i hate cheese. please have',
        request: {
          id: 2,
          offerId: 3,
          category: 'flowers',
          description: 'bouquet of petunias'
        },
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
  },
  4: {
    id: 4,
    coordinates: { lat: 12.123, lng: -123.45 },
    email: 'barry1@gmail.com',
    firstName: 'Barry',
    lastName: 'Garrison',
    username: 'bargar',
    offers: [
      {
        id: 10,
        category: "woodworking",
        photo: photos[8],
        userId: 4,
        radius: 4,
        request: {
          id: 10,
          offerId: 10,
          category: 'food',
          description: 'pizza would be nice'
        },
        decription: 'food is moldy. hope u dont mind',
        createdAt: '2017-11-18T00:12:46.618258Z',
        updatedAt: '2017-11-18T00:12:46.618258Z'
      }
    ],
    photo: {
      id: 11,
      cloudinaryId: 'somewhere',
      imageUrl: 'https://waterfall.jpeg',
      createdAt: '2017-11-18T00:12:46.618258Z',
      updatedAt: '2017-11-18T00:12:46.618258Z'
    }
  }
}

export const authedUserMatches = [
  {
    user: users[3],
    offer: users[3].offers[0],
    distance: 5
  },
  {
    user: users[4],
    offer: users[4].offers[0],
    distance: 10
  }
]
