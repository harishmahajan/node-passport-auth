import passportLocal from 'passport-local';
const localStrategy = passportLocal.Strategy;
import userModel from '../model/userModel';
import passport from 'passport';
import bcrypt from 'bcrypt';
// import googlePlusTokenStrategy from 'passport-google-plus-token';
// import facebookTokenStrategy from 'passport-facebook-token'
import dotenv from 'dotenv';
dotenv.config();

// Local Strategy
passport.use(new localStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    const user = await userModel.findOne({ "local.email": email });

    if (!user) {
        return done(null, false);
    }
    try {
        if (await bcrypt.compare(local.password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, { message: 'password Incorrect' })
        }
    } catch (error) {
        return done(error)
    }
}));


// // Google Strategy
// passport.use('googleToken', new googlePlusTokenStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('accessToken: ', accessToken);
//         console.log('refreshToken: ', refreshToken);
//         console.log('profile: ', profile);

//         const existingUser = await userModel.findOne({ "google.id": profile.id });
//         if (existingUser) {
//             console.log('User already exist in DB')
//             return done(null, existingUser);
//         }
//         console.log('User doesn\'t  exist we are creating new One')
//         const newUser = new userModel({
//             method: "google",
//             google: {
//                 id: profile.id,
//                 email: profile.emails[0].value
//             }
//         })
//         await newUser.save();
//         done(null, newUser)
//     } catch (error) {
//         done(error, false, error.message);
//     }
// }));


// // Facebook Strategy
// passport.use('facebookToken', new facebookTokenStrategy({
//     clientID: process.env.FACEBOOK_CLIENT_ID,
//     clientSecret: process.env.FACEBOOK_CLIENT_SECRET
// }, async (accessToken, refreshToken, profile, done) => {
//     try {
//         console.log('accessToken', accessToken);
//         console.log('refreshToken', refreshToken);
//         console.log('profile', profile);

//     } catch (error) {
//         done(error, false, error.message)
//     }
// }))