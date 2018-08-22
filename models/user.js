var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName:{
      type:String
  },
  lastName:{
    type:String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  otp: {
    type: String
  },
  phoneNumber: {
    type: String,
    index: true
  },
  createdAt: {
    type: Date,
    default:Date.now()
  },
  permissionLevel:{
    type:Number
  },
  role: {
    type: String,
    default: "user"
  },
  status: {
    type: String,
    default: "unverified"
  }
});


UserSchema.statics.findById = (id) => {
    return mongoose.model('User').findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        return result;
    });
};

UserSchema.statics.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        mongoose.model('User').findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

UserSchema.statics.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        mongoose.model('User').find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

UserSchema.statics.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.model('User').remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};


UserSchema.statics.findByEmail = (email)=>{
    return new Promise((resolve,reject)=>{
        mongoose.model('User').find({email:email}).then((result)=>{
            resolve(result)
        }).catch((err)=>{
            reject(err);
        })
    })
}

module.exports = mongoose.model("User", UserSchema);