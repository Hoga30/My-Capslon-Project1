import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    firstName: {
        type: String,
    
        minLength: 3,
    },
    lastName: {
        type: String,
    
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: false
    }],

    otp: {
        type: Number,
        required: false
    },
    otpExpires: {
        type: Date,
        required: false,
    },
    verified: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    },
    timestamps: true,
});

const userModel = model('user', userSchema);

export default userModel;