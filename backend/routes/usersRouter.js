// usersRouter.js
const express = require("express");
const cors = require("cors");
const { Users } = require("../db"); // Import the Users model from usersSchema.js
const zod = require("zod");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const Redis = require("redis");

const usersRouter = express.Router();
const redisClient = Redis.createClient();
usersRouter.use(express.json());
usersRouter.use(cors());
redisClient.connect().catch(console.error);

const signupSchema = zod.object({
    firstName: zod.string().min(2).max(15),
    lastName: zod.string().max(15),
    username: zod.string().min(3).max(20),
    contact: zod.string().length(10),
    email: zod.string().email(),
    password: zod.string().min(6),
    walletId: zod.string().min(3).max(20),
});

// Endpoint to validate username
usersRouter.post("/usernameValidate", async (req, res) => {
    const { username } = req.body;
    // Check if username already exists in the DB
    const userExists = await Users.findOne({ username });
    if (!userExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate email
usersRouter.post("/emailValidate", async (req, res) => {
    const { email } = req.body;
    // Check if email already exists in the DB
    const emailExists = await Users.findOne({ email });
    if (!emailExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate contact number
usersRouter.post("/contactValidate", async (req, res) => {
    const { contact } = req.body;
    // Check if contact already exists in the DB
    const contactExists = await Users.findOne({ contact });
    if (!contactExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Endpoint to validate wallet ID
usersRouter.post("/walletIdValidate", async (req, res) => {
    const { walletId } = req.body;
    // Check if wallet ID already exists in the DB
    const walletExists = await Users.findOne({ walletId });
    if (!walletExists) {
        return res.status(200).json({ available: true });
    }
    return res.status(200).json({ available: false });
});

// Signup endpoint to register a new user
usersRouter.post("/signup", async (req, res) => {
    const body = req.body;
    const hashPassword = await bcrypt.hash(body.password, 12); // Hash the password
    body.password = hashPassword; // Replace the password with the hashed password
    const parsedData = signupSchema.safeParse(req.body);
    const parsedDataResult = parsedData.success;
    if (!parsedDataResult) {
        return res.status(200).json({ error: parsedData.error.errors });
    }

    // Create new user
    try {
        const createUser = await Users.create(body);
        console.log(createUser);
        res.status(200).json({ message: "User signed up successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating user" });
    }
});

//Sign in Route
usersRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    // Check if user exists
    const user = await Users.find({ username });
    if (user.length === 0) {
        return res.status(200).json({ message: "invalid" });
    } else {
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (isMatch) {
            return res.status(200).json({ message: "success" });
        } else {
            return res.status(200).json({ message: "invalid" });
        }
    }
});

//Forgot Password Route
usersRouter.post("/forgotpassword", async (req, res) => {
    const { email } = req.body;
    // Check if user exists
    const user = await Users.find({ email });
    if (user.length === 0) {
        return res.status(200).json({ message: "invalid" });
    } else {
        // Generate OTP and send email
        const otp = Math.floor(1000 + Math.random() * 9000);
        const expiryTime = 10 * 60; // 5 minutes in seconds
        await redisClient.setEx(email, expiryTime, JSON.stringify({ otp }));
        // console.log(`OTP for ${email}: ${otp}`);
        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true, // true for 465, false for other ports
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
            This otp will expire in ${expiryTime / 60} Minutes`, // plain‑text body
            // html: "<b>Hello world?</b>", // html body
        };
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log("Error sending email:", error);
                return res.status(500).json({ message: "Error sending email" });
            }
            console.log("Email sent:", info.response);
        });
        return res.status(200).json({ message: "success" });
    }
});

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

usersRouter.post("/resetpassword", async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12); // Hash the password
    // Update user password
    const updateUser = await Users.updateOne(
        { email },
        { password: hashPassword }
    );
    if (updateUser.matchedCount === 0) {
        return res.status(200).json({ message: "invalid" });
    } else {
        return res.status(200).json({ message: "success" });
    }
});

module.exports = usersRouter;
