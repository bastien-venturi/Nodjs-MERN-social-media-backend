const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const app = express();

//middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


//routes de l'application
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes); 

// jwt
// quelque soit la route, on vérifie si l'utilisateur est connecté
app.get('*', checkUser);
// '/jwtid'  est la route qui permet de récupérer l'id de l'utilisateur 
//qui restera connecté le temps de maxAge voir authController.js
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id);
});

//server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});