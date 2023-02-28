import bcrypt from 'bcrypt';
import userModel from '../models/user.Model.js';
import jwt from 'jsonwebtoken';
import ENV from '../config.js';

/** POST: http://localhost:3000/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function registerUser(req, res) {
    console.log("REGISTER USER IS CALLED!!");
    try {
        let user1 = {
            "username": "example123",
            "password": "admin123",
            "email": "example@gmail.com",
            "address": "Apt. 556, Kulas Light, Gwenborough",
            "profile": ""
        };
        const { username, password, email, address, profile } = user1;
        console.log(req.body);
        // check if username already exists
        const isUserNameExists = new Promise((resolve, reject) => {
            userModel.findOne({ username }, (err, user) => {
                if (err) reject(new Error(err));
                if (user) reject({ error: "Username already exists in database" });

                resolve();
            })
        });
        // check if email already exists
        const isEmailExists = new Promise((resolve, reject) => {
            userModel.findOne({ email }, (err, user) => {
                if (err) reject(new Error(err));
                if (user) reject({ error: "Email already exists!" });

                resolve();
            });
        });

        await Promise.all([isUserNameExists, isEmailExists]).then(
            () => {
                if (password) {
                    bcrypt.hash(password, 10).then(async (hashedPwd) => {
                        const newUser = new userModel({
                            username,
                            email,
                            password: hashedPwd,
                            address,
                            profile: profile || ''
                        });

                        // save to db
                        const dbRes = await newUser.save();
                        console.log(dbRes);
                        if (dbRes) {
                            res.status(201).send("User Registration Success!");
                        } else {
                            res.status(500).send("User Registration Fail!");
                        }
                    })
                        .catch(e => {
                            return res.status(500).send(e)
                        })
                }
            }
        ).catch(err => {
            res.status(500).send({ error: err });
        }).catch((error) => {
            return res.send(500).send({ error: error });
        });
    } catch (e) {
        res.status(500).send(e);
    }
}


/** POST: http://localhost:3000/api/login 
 *  * @param : {
  "username" : "example123",
  "password" : "admin123",
}
*/
export async function loginUser(req, res) {
    try {
        const { username, password } = req.body;
        userModel.findOne({ username }).then((user) => {
            bcrypt.compare(password, user.password)
                .then(pwdCheck => {
                    if (!pwdCheck) return res.status(400).send({ error: "Don't have password." });

                    // jwt token issue
                    const token = jwt.sign({
                        id: user._id,
                        username
                    }, ENV.JWT_SECRET, { expiresIn: "24h" });

                    if (token) {
                        res.status(200).send({
                            msg: "Login Success!",
                            username: user.username,
                            token
                        })
                    }
                })
                .catch(e => {
                    res.status(400).send({ error: "Password does not match" })
                })
        }).catch(e => {
            return res.status(404).send("Username not found.");
        })
        res.json("login route");
    } catch (e) {
        return res.status(500).send(e);
    }
}

// GET: http://localhost:3000/api/user/:username 
export async function getUser(req, res) {
    try {
        const { username } = req.params;

        if (!username) return res.statue(501).send("Invalid Username.")
        userModel.findOne({ username }, function (err, user) {
            if (err) return res.status(500).send({ err });
            if (!user) return res.status(501).send({ error: "couldn't find the user." });

            // remove password from user
            // convert to json the mongo returned user object.
            const { password, ...rest } = Object.assign({}, user.toJSON());
            return res.status(200).send(rest);
        });

    } catch (error) {
        return res.status(404).send({ error: "User information could not be found." });
    }
}

// PUT: http://localhost:3000/api/updateUser 
export async function updateUser(req, res) {
    try {
        const { profile, address, username } = req.body;
        
    } catch (error) {
        res.send(501).status({ error: "User update failed!." });
    }
}

// GET: http://localhost:3000/api/generateOtp 
export async function generateOtp(req, res) {
    res.json("generate OTP");
}

// GET: http://localhost:3000/api/verfiyOtp 
export async function verifyOtp(req, res) {
    res.json("Verify OTP");
}

// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    res.json("Create Session Route");
}

// PUT http://localhost:3000/api/resetPassword 
export async function resetPassword(req, res) {
    res.json("Reset Password.");
}