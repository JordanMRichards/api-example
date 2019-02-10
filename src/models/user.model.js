import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator';

import MongoPagination from 'mongo-cursor-pagination';

/*
    id
    email  
    givenName  
    familyName
    created
*/ 
delete mongoose.models.User;
delete mongoose.modelSchemas.User;
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, " cannot be empty"],
        match: [/\S+@\S+/, " is not valid"],
        index: true,
        trim: true,
        unique: true,
    },
    givenName: {
        type: String,
        required: [true, " cannot be empty"],
        trim: true
    },
    familyName: {
        type: String,
        required: [true, " cannot be empty"],
        trim: true
    },
    password: {
        type: String,
        required: [true, " cannot be empty"],
        trim: true
    }
},{
    timestamps:true
});

UserSchema.pre('save', function (next){
    const user = this;
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(12)
    .then(salt =>{
        bcrypt.hash(user.password, salt)
        .then(hash =>{
            user.password = hash;
            next();
        })
        .catch(err => next(err))
    })
    .catch(err => next(err));
});

UserSchema.plugin(uniqueValidator, {'message': "{PATH} is not unique."});

UserSchema.plugin(MongoPagination.mongoosePlugin);

const userModel = new mongoose.model("User", UserSchema);

export default userModel;
