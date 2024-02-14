const mongoose = require('mongoose');

mongoose
    .connect(
        "mongodb+srv://" + process.env.DB_USER_PASS   + "@mern-social-media.jp0aviv.mongodb.net/mern-social-media",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.log('Failed to connect to MongoDB', err));
