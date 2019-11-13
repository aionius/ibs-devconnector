const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// create schema
const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      password: {
         type: String,
         required: true
      },
      avatar: {
         type: String
      }
   },
   {
      timestamps: true
   }
);

UserSchema.pre("save", async function(next) {
   const user = this;
   if (user.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
   }
});

UserSchema.methods.toJSON = function() {
   const user = this;
   const userObject = user.toObject();

   delete userObject.password;

   return userObject;
};

module.exports = User = mongoose.model("users", UserSchema);
