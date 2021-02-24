import userModel from '../model/userModel';
import responseHelper from '../helper/responseHelper';
import messageParser from '../helper/messageParser';
// import multer from 'multer';
import logger from '../helper/loggerHelper';
import fs from 'fs';
import bcrypt from 'bcrypt';
import passport from 'passport';
import initializePassport from '../helper/passportAuthMiddlewareHelper';
import JWT from 'jsonwebtoken';
// initializePassport.initialize(
//     passport,
//     email => userModel.find(user => user.email == email),
//     id => userModel.find(user => user._id == id)
// );
/**
 * Create User 
 * POST http://localhost:1900/api/user
 * Note: "Please select the form-data in Body Section"
 * {
 *      "userName":"hardikpatel",
 *      "password":"hardik123",
 *      "name":"Hardik",
 *      "profile":"select file"
 * }
 */
// const tokenTime = 60 * 60 * 24 * 30;
// signToken = (user) => {
//     return JWT.sign({
//         id: user.id,
//     }, 'SECRET', {
//         expiresIn: tokenTime
//     })
// }
// exports.careteUser = async (req, res) => {
//     try {
//         var storage = multer.diskStorage({
//             destination: (req, file, callback) => {
//                 callback(null, './assets/images');
//             },
//             filename: (req, file, callback) => {
//                 return callback(null, Date.now() + "_" + file.originalname);
//             }
//         });
//         var upload = multer({ storage: storage }).single('profile');

//         await upload(req, res, async (err) => {
//             if (err) {
//                 console.log(err)
//             }
//             var dimensions = sizeOf(req.file.path);

//             let width = Math.round(dimensions.width / 2);
//             let height = Math.round(dimensions.height / 2);
//             var newFileName = 'img_' + Date.now() + '_' + req.file.originalname;
//             sharp(req.file.path)
//                 .resize(width, height)
//                 .toFile('./assets/images/' + newFileName, (err) => {
//                     if (!err) {
//                         fs.unlinkSync(req.file.path);
//                     } else {
//                         console.log(err);
//                     }
//                 })

//             var requestData = new userModel();
//             requestData.name = req.body.name;
//             requestData.userName = req.body.userName;
//             requestData.password = req.body.password;
//             requestData.profile = newFileName;
//             requestData.createdDate = new Date().toUTCString();

//             var userData = await userModel.create(requestData);
//             if (userData) {
//                 res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].createSuccess, userData));
//             } else {
//                 res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].createError, {}));
//             }
//         });
//     } catch (error) {
//         var errorData = {
//             url: "/api/user",
//             method: "post",
//             messaage: error.stack
//         }
//         logger.error(JSON.stringify(errorData));
//         res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].internalError, error.stack));
//     }
// };


/**
 * List Users
 * GET http://localhost:1900/api/user
 */
exports.listUsers = async (req, res) => {
    // var userData = new Promise((resolve, reject) => {
    //     var data = userModel.find();
    //     resolve(data);
    //     reject(error);
    // });
    // userData.then((data) => {
    //     res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].listSuccess, data));
    // }).catch((error) => {
    //     res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].listError, error));
    // })

    let userData = [
        {
            "_id": "5e37e28a30aee104d8fbfad8",
            "createdDate": "2020-02-03T09:06:18.000Z",
            "updatedDate": null,
            "createdBy": null,
            "updatedBy": null,
            "name": "Hardik",
            "userName": "hardikpatel",
            "password": "hardik123",
            "profile": "img_1580720778896_AG700343.JPG",
        },
        {
            "_id": "5e39052cd84ee62324c877b9",
            "createdDate": "2020-02-04T05:46:20.000Z",
            "updatedDate": null,
            "createdBy": null,
            "updatedBy": null,
            "name": "Naitik",
            "userName": "naitikpatel",
            "password": "naitik123",
            "profile": "img_1580795180835_rose.jpg",
        }
    ]
    if (userData && userData.length > 0) {
        res.json(responseHelper.successResponse(200, messageParser.alertMessage['users'].listSuccess, userData));
    } else {
        res.json(responseHelper.errorResponse(401, messageParser.alertMessage['users'].listError, {}));
    }
};




/**
 * Register User
 */
exports.register = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        let requestData = new userModel();

        requestData.name = req.body.name;
        requestData.email = req.body.email;
        requestData.password = hashPassword;
        var user = await userModel.create(requestData);
        res.status(200).send({ msg: 'user created Successfully !', data: user });
    } catch (error) {
        console.log(error);
        res.status(402).send({ msg: 'error while creating user', error: error });
    }
};


exports.login = async (req, res) => {
    console.log('req.user =====>', req.user);
    const tokenTime = 60 * 60 * 24 * 30;
    const SECRET = 'secret'
    const token = JWT.sign({ id: req.user.id, }, SECRET, { expiresIn: tokenTime })
    res.status(200).send({ token })
};

// exports.googleOAuth = async (req, res, next) => {
//     console.log('req.user =====>', req.user);
//     const tokenTime = 60 * 60 * 24 * 30;
//     const SECRET = 'secret'
//     const token = JWT.sign({ id: req.user.id, }, SECRET, { expiresIn: tokenTime })
//     res.status(200).send({ token })
// };

// exports.facebookOAuth = async (req, res, next) => {
//     console.log('req.user =====>', req.user);
//     const tokenTime = 60 * 60 * 24 * 30;
//     const SECRET = 'secret'
//     const token = JWT.sign({ id: req.user.id, }, SECRET, { expiresIn: tokenTime })
//     res.status(200).send({ token })
// };