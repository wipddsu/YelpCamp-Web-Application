const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
}

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      author: '65eaa9015bcdd5fe96de3173',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolore ipsa placeat voluptatem dolorem modi dolores. Porro consectetur dolorem facilis aspernatur. Exercitationem repellat sequi, molestiae ratione suscipit tempore quam soluta.z',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/ddibpskmq/image/upload/v1709959758/YelpCamp/g8uw5j6vnzailrfu4we6.jpg',
          filename: 'YelpCamp/g8uw5j6vnzailrfu4we6',
        },
        {
          url: 'https://res.cloudinary.com/ddibpskmq/image/upload/v1709959761/YelpCamp/fpccaraf04dmiqgsssct.jpg',
          filename: 'YelpCamp/fpccaraf04dmiqgsssct',
        },
        {
          url: 'https://res.cloudinary.com/ddibpskmq/image/upload/v1709959771/YelpCamp/bvwsnbodcw9oswjfhzh1.jpg',
          filename: 'YelpCamp/bvwsnbodcw9oswjfhzh1',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
