// usersRouter.js
const express = require("express");
const cors = require("cors");
const { Users } = require("../db"); // Import the Users model from usersSchema.js
const zod = require("zod");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Redis = require("redis");
const authmiddleware = require("../middlewares/authMiddleware");
const { JWT_SECRET } = require("../config");
const JWT = require("jsonwebtoken");
const usersRouter = express.Router();
const redisClient = Redis.createClient();
usersRouter.use(express.json());
redisClient.connect().catch(console.error);

const signupSchema = zod.object({
    firstName: zod.string().min(2).max(15),
    lastName: zod.string().min(2).max(15),
    username: zod.string().min(3).max(20),
    contact: zod.string().length(10),
    email: zod.string().email(),
    password: zod.string().min(6),
    walletKey: zod.string().min(3).max(20),
});

// Endpoint to validate username
usersRouter.post("/usernameValidate", async (req, res) => {
    const { username } = req.body;
    const userExists = await Users.findOne({ "userDetails.username": username });
    if (!userExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate email
usersRouter.post("/emailValidate", async (req, res) => {
    const { email } = req.body;
    const emailExists = await Users.findOne({ "userDetails.email": email });
    if (!emailExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate contact number
usersRouter.post("/contactValidate", async (req, res) => {
    const { contact } = req.body;
    const contactExists = await Users.findOne({ "userDetails.contact": contact });
    if (!contactExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate wallet Key
usersRouter.post("/walletKeyValidate", async (req, res) => {
    const { walletKey } = req.body;
    const walletExists = await Users.findOne({ "accountDetails.walletKey": walletKey });
    if (!walletExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Signup endpoint to register a new user
usersRouter.post("/signup", async (req, res) => {
    try {
        const parsed = signupSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({ error: parsed.error.errors });
        }
        const safeData = {
            userDetails: {
                firstName: parsed.data.firstName,
                lastName: parsed.data.lastName,
                username: parsed.data.username,
                contact: parsed.data.contact,
                email: parsed.data.email,
                password: parsed.data.password,
            },
            accountDetails: {
                walletKey: parsed.data.walletKey,
                walletPassword: "password",
            }
        }
        safeData.userDetails.firstName = safeData.userDetails.firstName.toLowerCase();
        safeData.userDetails.lastName = safeData.userDetails.lastName.toLowerCase();
        safeData.userDetails.password = await bcrypt.hash(safeData.userDetails.password, 12);
        const createUser = await Users.create(safeData);

        return res.status(201).json({ message: "User signed up successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
});


//Sign in Route
usersRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ "userDetails.username": username });
    if (!user) {
        return res.status(200).json({ message: "invalid" });
    } else {
        const isMatch = await bcrypt.compare(password, user.userDetails.password);
        if (isMatch) {
            const token = JWT.sign(
                {
                    id: user._id,
                    username: user.userDetails.username
                },
                JWT_SECRET
            );
            res.cookie('authToken', token, {
                httpOnly: false,
                secure: false,
                sameSite: 'Strict',
                maxAge: 24 * 60 * 60 * 1000
            });
            
            return res.status(200).json({ message: "success", token });
        } else {
            return res.status(200).json({ message: "invalid" });
        }
    }
});

usersRouter.get("/signout", async (req, res) => {
    res.clearCookie("authToken");
    res.status(200).json({ message: "success" });
})

//Forgot Password Route
usersRouter.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;

    const user = await Users.findOne({ "userDetails.email": email });
    if (!user) {
        return res.status(200).json({ message: "invalid" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiryTime = 10 * 60;

    await redisClient.setEx(email, expiryTime, JSON.stringify({ otp }));

    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: "critcashindia@gmail.com",
            pass: "efbm izvh pjpf pfym",
        },
    });

    const mailOptions = {
        from: "critcashindia@gmail.com",
        to: email,
        subject: "Forgot Password OTP",
        text: `Use This OTP to Reset Your Password: ${otp}
This OTP will expire in ${expiryTime / 60} minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            return res.status(500).json({ message: "Error sending email" });
        }
        console.log("Email sent:", info.response);
        return res.status(200).json({ message: "success" });
    });
});

//Verify OTP Route
usersRouter.post("/verifyotp", async (req, res) => {
    const { email, otp } = req.body;
    const data = await redisClient.get(email);

    if (!data) {
        return res.status(200).json({ message: "invalid" });
    }

    const parsedData = JSON.parse(data);
    if (parsedData.otp === parseInt(otp)) {
        return res.status(200).json({ message: "success" });
    } else {
        return res.status(200).json({ message: "invalid" });
    }
});

//Reset Password Route
usersRouter.post("/resetpassword", async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    const updateUser = await Users.updateOne(
        { "userDetails.email": email },
        { $set: { "userDetails.password": hashPassword } }
    );

    if (updateUser.matchedCount === 0) {
        return res.status(200).json({ message: "invalid" });
    }

    return res.status(200).json({ message: "success" });
});


//Route for specific user data for unique user
usersRouter.get(`/getuserdetails`, authmiddleware, async (req, res) => {
    const fields = req.query.fields?.split(",");
    const userId = req.user.id;
    const user = await Users.findById(userId).lean()
    if (!user) {
        return res.status(404).json({ message: "invalid" });
    }
    let filteredUserDetails = {};
    if (fields && fields.length > 0) {

        fields.forEach(field => {
            const value = field.split('.').reduce((acc, part) => acc?.[part], user.userDetails);
            filteredUserDetails[field] = value;
        });
    } else {
        filteredUserDetails = {
            firstName: user.userDetails.firstName,
            lastName: user.userDetails.lastName,
            username: user.userDetails.username,
            contact: user.userDetails.contact,
            email: user.userDetails.email,
            walletKey: user.accountDetails.walletKey
        };
    }
    res.status(200).json({ data: filteredUserDetails });
})

//Route for unique user data 
usersRouter.get("/profiledetails/:username", authmiddleware, async (req, res) => {
    const { username } = req.params;
    const currentUser = req.user
    let userDetails = {}
    if (!username) {
        return res.status(200).json({ message: "invalid" });
    }
    const user = await Users.findOne({ "userDetails.username": username }).lean()
    if (!user) {
        return res.status(404).json({ message: "invalid" });
    }
    if (username === currentUser.username) {
        userDetails = {
            firstName: user.userDetails.firstName,
            lastName: user.userDetails.lastName,
            username: user.userDetails.username,
            contact: user.userDetails.contact,
            email: user.userDetails.email,
            walletKey: user.accountDetails.walletKey,
            connection: "self"
        };
        return res.status(200).json({ data: userDetails });
    } else {
        const currentUserDetails = await Users.findOne({ _id: currentUser.id }).lean()
        const connectionUserId = user._id
        let connectionStatus = null;
        if (currentUserDetails.connections.friends.some(id => id.toString() === connectionUserId.toString())) {
            connectionStatus = "friend"
        } else if (currentUserDetails.connections.sentRequests.some(id => id.toString() === connectionUserId.toString())) {
            connectionStatus = "sentrequest"
        } else if (currentUserDetails.connections.receivedRequests.some(id => id.toString() === connectionUserId.toString())) {
            connectionStatus = "receivedrequest"
        } else {
            connectionStatus = "notfriend"
        }
        userDetails = {
            firstName: user.userDetails.firstName,
            lastName: user.userDetails.lastName,
            username: user.userDetails.username,
            contact: user.userDetails.contact,
            email: user.userDetails.email,
            walletKey: user.accountDetails.walletKey,
            connection: connectionStatus
        };

        res.status(200).json({ data: userDetails });
    }

});


//Route for bulk users search
usersRouter.get("/getusers", authmiddleware, async (req, res) => {
    let fetchedUsers = [];
    const searchquery = req.query.searchquery.trim();
    const queryParts = searchquery.split(" ").filter(Boolean);
    const currentUser = req.user
    if (queryParts.length >= 2) {
        const [firstName, lastName] = queryParts;
        fetchedUsers = await Users.find({
            $and: [
                { "userDetails.firstName": { $regex: firstName, $options: "i" } },
                { "userDetails.lastName": { $regex: lastName, $options: "i" } },
                { _id: { $ne: currentUser.id } } // Exclude the current user
            ]
        });
    } else {
        fetchedUsers = await Users.find({
            $and: [
                {
                    $or: [
                        { "userDetails.firstName": { $regex: searchquery, $options: "i" } },
                        { "userDetails.lastName": { $regex: searchquery, $options: "i" } },
                        { "userDetails.contact": { $regex: searchquery, $options: "i" } },
                        { "accountDetails.walletKey": { $regex: searchquery, $options: "i" } }
                    ]
                },
                { _id: { $ne: currentUser.id } } // Exclude the current user
            ]
        });
    }

    if (fetchedUsers.length === 0) {
        return res.status(200).json({ message: "No User Found" });
    }

    const filteredUsers = fetchedUsers.map(user => ({
        id: user._id,
        username: user.userDetails.username,
        firstName: user.userDetails.firstName,
        lastName: user.userDetails.lastName,
        contact: user.userDetails.contact,
        walletKey: user.accountDetails.walletKey
    }));

    res.status(200).json({ users: filteredUsers });
});

// usersRouter.get("/checkfriendrequest/:friendId", authmiddleware, async (req, res) => {
//     const friendId = req.params.friendId;
//     const currentUserId = req.user.id;
//     if (!friendId) {
//         return res.status(200).json({ message: "Friend ID is required" });
//     }
//     const currentUser = await Users.findById(currentUserId).lean();
//     if (!currentUser) {
//         return res.status(404).json({ message: "User not found" });
//     }
//     const isFriend = currentUser.connections.friends.includes(friendId);
//     const isSentRequest = currentUser.connections.sentRequests.includes(friendId);
//     const isReceivedRequest = currentUser.connections.receivedRequests.includes(friendId);
//     return res.status(200).json({
//         isFriend,
//         isSentRequest,
//         isReceivedRequest
//     });
// });

usersRouter.post("/sendfriendrequest", authmiddleware, async (req, res) => {
    const currentUserId = req.user.id;
    const friendUsername = req.body.username


    if (!friendUsername) {
        return res.status(200).json({ message: "friendUsername is required" });
    }
    const friend = await Users.findOne({ "userDetails.username": friendUsername }).lean()
    const addToSentRequests = await Users.updateOne(
        { _id: currentUserId },
        { $addToSet: { "connections.sentRequests": friend._id } }
    );
    const addToReceivedRequests = await Users.updateOne(
        { _id: friend._id },
        { $addToSet: { "connections.receivedRequests": currentUserId } }
    );

    if (addToSentRequests.modifiedCount > 0 && addToReceivedRequests.modifiedCount > 0) {
        return res.status(200).json({ message: "request sent" });
    } else {
        return res.status(200).json({ message: "Failed to send request" });
    }

});

usersRouter.post(`/cancelfriendrequest`, authmiddleware, async (req, res) => {
    const currentUserId = req.user.id;
    const friendUsername = req.body.username;
    if (!currentUserId || !friendUsername) {
        return res.status(200).json({ message: "User ID and friend ID are required" });
    } else {
        const friendDetails = await Users.findOne({ "userDetails.username": friendUsername })
        const currentUserUpdate = await Users.updateOne({ _id: currentUserId }, { $pull: { "connections.sentRequests": friendDetails._id } })
        const friendUpdate = await Users.updateOne({ _id: friendDetails._id }, { $pull: { "connections.receivedRequests": currentUserId } })

        if (currentUserUpdate.modifiedCount < 1 && friendUpdate.modifiedCount < 1) {
            return res.status(200).json({ message: "Failed to cancel request" });
        } else {
            return res.status(200).json({ message: "request cancelled" });
        }
    }
})

usersRouter.post(`/acceptfriendrequest`, authmiddleware, async (req, res) => {
    const currentUserId = req.user.id;
    const friendUsername = req.body.username;
    if (!currentUserId || !friendUsername) {
        return res.status(200).json({ message: "User Id and friend's User id is required" })
    } else {
        const friendDetails = await Users.findOne({ "userDetails.username": friendUsername })
        const currentUserUpdate = await Users.updateOne({ _id: currentUserId }, {
            $pull: { "connections.receivedRequests": friendDetails._id },
            $push: { "connections.friends": friendDetails._id }
        })
        const friendUpdate = await Users.updateOne({ _id: friendDetails._id }, {
            $pull: { "connections.sentRequests": currentUserId },
            $push: { "connections.friends": currentUserId }
        })
        if (currentUserUpdate.modifiedCount < 1 && friendUpdate.modifiedCount < 1) {
            return res.status(200).json({ message: "Failed to cancel request" });
        } else {
            return res.status(200).json({ message: "request cancelled" });
        }
    }
})

usersRouter.post(`/removefriend`, authmiddleware, async (req, res) => {
    const currentUserId = req.user.id;
    const friendUsername = req.body.username;

    if (!currentUserId || !friendUsername) {
        return res.status(200).json({ messaage: "User Id and Friend's user id is required" })
    } else {
        const friendDetails = await Users.findOne({ "userDetails.username": friendUsername })
        const currentUserUpdate = await Users.updateOne({ _id: currentUserId }, {
            $pull: { "connections.friends": friendDetails._id }
        })
        const friendUpdate = await Users.updateOne({ _id: friendDetails._id }, {
            $pull: { "connections.friends": currentUserId }
        })
        if (currentUserUpdate.modifiedCount < 1 && friendUpdate.modifiedCount < 1) {
            return res.status(200).json({ message: "Failed to cancel request" });
        } else {
            return res.status(200).json({ message: "request cancelled" });
        }
    }
})


module.exports = usersRouter;
