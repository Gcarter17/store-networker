const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
//  documentation: https://express-validator.github.io/docs/

// @route POST api/users
// @desc  Register user
// @access  public
router.post(
    "/",
    [
        check("name", "Name is required")
            .not()
            .isEmpty(),
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "User already exists" }] });
            }
            // See if user exists

            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });
            user = new User({
                // makes a new user based off of User.js schema
                name,
                email,
                avatar,
                password
            });
            // Get users gravatar

            const salt = await bcrypt.genSalt(10); //use larger number for greater security
            user.password = await bcrypt.hash(password, salt);
            // Encrypt password

            await user.save();
            //save the user in the database
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
            // Return jsonwebtoken
            // res.send("User registered");     res.send, res.status etc is the result sent to user/postman
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
);

module.exports = router;
