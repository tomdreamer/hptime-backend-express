// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

let users = [
  {
    username: "admin@admin.com",
    role: "admin",
    password: bcrypt.hashSync("admin@admin.com", bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: "dispatch@dispatch.com",
    role: "dispatch",
    password: bcrypt.hashSync(
      "dispatch@dispatch.com",
      bcrypt.genSaltSync(bcryptSalt)
    )
  },
  {
    username: "paramedic@paramedic.com",
    role: "paramedic",
    password: bcrypt.hashSync(
      "paramedic@paramedic.com",
      bcrypt.genSaltSync(bcryptSalt)
    )
  },
  {
    username: "user@user.com",
    role: "user",
    password: bcrypt.hashSync("user@user.com", bcrypt.genSaltSync(bcryptSalt))
  }
];

User.deleteMany()
  .then(() => {
    return User.create(users);
  })
  .then(usersCreated => {
    console.log(`${usersCreated.length} users created with the following id:`);
    console.log(usersCreated.map(u => u._id));
  })
  .then(() => {
    // Close properly the connection to Mongoose
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
