import userModel from "./models/user.Model.js";

// middleware to check if user exits before proceed to login check - password check
async function verifyUser(req, res, next) {
    try {
        const { username } = req.method === "GET" ? req.query : req.body;
        const userExists = await userModel.findOne({ username });
        if (!userExists) res.send(404).send("Cannot find user.")
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Error." })
    }
}

export default verifyUser;