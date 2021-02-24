import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
var objectId = mongoose.Schema.objectId;
var userSchema = mongoose.Schema({
    // name: {
    //     type: String
    // },
    method: {
        type: String,
        required: true,
        enum: ['local', 'google', 'facebook']
    },
    local: {
        email: {
            type: String,
            lowercase: true
        },
        password: {
            type: String
        },
    },
    google: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    facebook: {
        id: {
            type: String
        },
        email: {
            type: String,
            lowercase: true
        }
    },
    // email: {
    //     type: String
    // },
    // password: {
    //     type: String
    // }
});

// userSchema.pre('save', async (next)=>{
//     try {
//         if(this.method !== 'local'){
//             next();
//         }

//         const salt = await bcrypt.genSalt(10);
//         const passwordHash = await bcrypt.hash(this.local.password, salt);
//         this.password = passwordHash;
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

userSchema.methods.isValidPassword = async (newPassword)=>{
    try {
        return await bcrypt.compare(newPassword, this .local.password);
    } catch (error) {
        throw new Error(error);
    }
}

// autoIncrement.initialize(mongoose.connection);
// userSchema.plugin(autoIncrement.plugin, { model: 'userModel', field: 'autoUserId', startAt: 1, incrementBy: 1 });
module.exports = mongoose.model('userModel', userSchema, 'user');