const express = require("express");
const router = express.Router();
const passport = require("passport");

const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load User model
const User = require("../../models/User");

// load config file
const config = require("../../config/keys");

const auth = require("../../middleware/authentication");

// @route   POST /api/users/register
// @desc    register user
// @access  PUBLIC
router.post("/register", async (req, res) => {
   const { errors, isValid } = validateRegisterInput(req.body);
   // check validation
   if (!isValid) {
      return res.status(400).json(errors);
   }

   try {
      const newUser = new User(req.body);
      const user = await User.findOne({ email: req.body.email });
      if (user) {
         errors.email = "Email alread exists";
         return res.status(400).json(errors);
      } else {
         const avatar = gravatar.url(req.body.email, {
            s: "200", // size
            r: "pg", // rating
            d: "mm" // default
         });

         newUser.avatar = avatar;
         await newUser
            .save()
            .then(user => res.json(user))
            .catch(error => console.log(error));
      }
   } catch (err) {
      console.log(err);
   }
});

// @route   POST /api/users/login
// @desc    login user and return JWT token
// @access  PUBLIC
router.post("/login", async (req, res) => {
   const { errors, isValid } = validateLoginInput(req.body);
   if (!isValid) {
      return res.status(400).json(errors);
   }

   try {
      const email = req.body.email;
      const password = req.body.password;

      // find user by email
      await User.findOne({ email })
         .then(user => {
            if (!user) {
               errors.email = "User not found";
               return res.status(404).json(errors);
            }

            // check password
            bcrypt
               .compare(password, user.password)
               .then(isMatch => {
                  if (isMatch) {
                     const payload = {
                        _id: user._id.toString(),
                        email: user.email
                     };
                     const token = jwt.sign(
                        payload,
                        config.secretOrKey,
                        {
                           expiresIn: "30m"
                        },
                        (error, token) => {
                           res.json({
                              success: true,
                              token
                           });
                        }
                     );
                  } else {
                     return res
                        .status(400)
                        .json({ password: "Password incorrect" });
                  }
               })
               .catch(error => console.log(error));
         })
         .catch(error => console.log(error));
   } catch (error) {
      console.log(error);
   }
});

// @route   GET /api/users/current
// @desc    get current user
// @access  PRIVATE
router.get(
   "/current",
   passport.authenticate("jwt", { session: false }),
   // auth,
   (req, res) => {
      res.json(req.user);
   }
);

module.exports = router;
