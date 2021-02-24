import express from 'express';

import * as userController from '../controller/userController';
import passport from 'passport';

let apiRoutes = express.Router();

// apiRoutes.post('/api/user', userController.careteUser);
apiRoutes.get('/api/user', userController.listUsers);
apiRoutes.post('/register', userController.register);
apiRoutes.post('/login', passport.authenticate('local', { session: false }), userController.login);

// apiRoutes.post('/oauth/google', passport.authenticate('googleToken', { session: false }),userController.googleOAuth);

// apiRoutes.post('/oauth/facebook', passport.authenticate('facebookToken', { session: false }),userController.facebookOAuth);

module.exports = apiRoutes;