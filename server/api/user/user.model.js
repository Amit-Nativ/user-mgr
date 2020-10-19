import pify from 'pify';
import { Schema } from 'mongoose';
import { single as emailAddress } from 'email-address';
import passportLocalMongoose from 'passport-local-mongoose';
import { createSeedModel } from 'mongoose-plugin-seed';
import seed from './user.seed';

const UserSchema = new Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        match: emailAddress,
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    birthDate: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        enum: []
    },
    admin: Boolean,
    cart: [{
        ipId: {
            type: Schema.Types.ObjectId,
            ref: 'ip',
            required: true
        },
        range: {
            type: Schema.Types.Object,
            ref: 'rangePrice',
            required: true
        }
    }]
});

/**
 * Virtuals
 */

UserSchema.virtual('name.full').get(function () {
    return `${this.name.first} ${this.name.last}`;
});

UserSchema.virtual('password').set(function (password) {
    this._password = password;
});

/**
 * Pre-save hook
 */
UserSchema.pre('save', function (next) {
    if (!this._password) {
        return next();
    }

    this.setPassword(this._password).then(() => next());
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

UserSchema.methods.setPassword = pify(UserSchema.methods.setPassword);

UserSchema.methods.toJSON = function () {
    const obj = this.toObject();

    delete obj.hash;
    delete obj.salt;

    return obj;
}

export default createSeedModel('User', UserSchema, seed);