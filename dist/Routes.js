"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const auth_1 = require("./auth");
const nanoid_1 = require("nanoid");
const router = express_1.default.Router();
router.post('/signup', async function (req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: "fill all the fields" });
        return;
    }
    try {
        const Existinguser = await db_1.User.findOne({
            username: username
        });
        if (Existinguser) {
            res.json({ msg: "user alraedy exists" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPass = await bcrypt_1.default.hash(password, salt);
        const newUser = await db_1.User.create({
            username: username,
            password: hashedPass
        });
        console.log("useradded to db");
        res.status(200).json({ msg: "user signed up succefully" });
    }
    catch {
        console.log(Error);
    }
});
router.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ msg: "fill all credentials" });
        return;
    }
    try {
        const userFind = await db_1.User.findOne({ username });
        if (!userFind || !userFind.password) {
            res.status(400).json({ msg: "no user exists or missing password" });
            return;
        }
        const isvalidpass = await bcrypt_1.default.compare(password, userFind.password);
        if (!isvalidpass) {
            res.status(400).json({ msg: "incorrect password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: userFind._id }, config_1.JWT_SECRET);
        res.json({ token });
        return;
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ msg: "server error" });
        return;
    }
});
router.post('/content', auth_1.userMiddleware, async (req, res) => {
    const { title, link } = req.body;
    const newcontent = await db_1.Content.create({
        title: title,
        link: link,
        tags: [],
        //@ts-ignore
        userId: req.userId
    });
    res.status(200).json({ msg: "content added" });
    return;
});
router.get('/content', auth_1.userMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const content = await db_1.Content.findOne({ userId });
        if (content) {
            res.status(200).json({ msg: "Content returned", content });
            return;
        }
        else {
            res.status(404).json({ msg: "Content not found" });
            return;
        }
    }
    catch (error) {
        console.error("Error fetching content:", error);
        res.status(500).json({ msg: "Internal Server Error" });
        return;
    }
});
router.post('/delete', auth_1.userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const Finduser = await db_1.Content.findOne({
        userId: userId
    });
    if (!Finduser) {
        res.status(400).json({ msg: "un authorized" });
    }
    else {
        const deleteContent = await db_1.Content.deleteMany({
            userId
        });
        res.status(200).json({ msg: "deleted" });
    }
});
router.post('/brain/generateLink', auth_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const findUser = await db_1.Content.findOne({
        userId: userId
    });
    if (!findUser) {
        res.status(411).json({ msg: "user not found" });
        return;
    }
    const contents = await db_1.Content.findOne({
        userId: userId,
    });
    if (!contents) {
        res.status(411).json({ msg: "no contents" });
        return;
    }
    const slug = (0, nanoid_1.nanoid)(5);
    const link = new db_1.Link({
        userId,
        slug,
        contents
    });
    await link.save();
    res.json({ msg: "Link created", url: `https://yourapp.com/brain/view/${slug}` });
});
router.get('/brain/sharelink', auth_1.userMiddleware, async (req, res) => {
    const userId = req.userId;
    const Finduser = await db_1.Content.findOne({
        userId: userId
    })
        .select('title link tags')
        .populate('tags', 'name');
    if (!Finduser) {
        res.status(400).json({ msg: "no used found" });
        return;
    }
    else {
        res.json({ msg: "heers the deatils", url: "https://yourapp.com/share/${Content._id}", Finduser });
        return;
    }
});
exports.default = router;
