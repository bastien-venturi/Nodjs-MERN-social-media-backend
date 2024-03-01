const mongoose = require('mongoose');

mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS + "@mern-social-media.jp0aviv.mongodb.net/mern-social-media"
    )
    .then(() => console.log('MongoDB connected!'))
    .catch((err) => console.log('Failed to connect to MongoDB', err));