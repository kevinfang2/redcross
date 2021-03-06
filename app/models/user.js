// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model

var userSchema = mongoose.Schema({
    local            : {
        email        : String,
        password     : String,
        firstname: String,
        lastname: String,
        grade: Number,
        role: String,
        description: String,
        profilePic: { data: Buffer, contentType: String },
        projects:{
            Name:String,
        }
    }
});
var projectSchema = new Schema({
    projects:{
        Name: String,
        Category:String,
        Description:String,
        Members:{
            Accounts:String,
        }
    }
});

// methods ======================
// generating a hash


userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = {
    User:mongoose.model('User', userSchema),
    project:mongoose.model('Project', projectSchema),
}
