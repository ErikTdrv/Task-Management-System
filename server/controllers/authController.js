require('dotenv').config()
const router = require('express').Router();
const { register, login, getUser } = require('../services/authService');
const cloudinary = require('cloudinary');
const { Recaptcha } = require('google-recaptcha');
const secretKey = '6LddUYgmAAAAAJovu0nmJtAwj4Gp4fxcHIldf9oG';

router.get('/user', async (req, res) => {
    const userId = req?.user?._id;
    try {
        const cookie = req.cookies?.auth;
        if (cookie) {
            let user = await getUser(userId);
            res.status(201).json(user)
        } else {
            res.status(201).json('No user found!')
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message })
    }
})
router.get('/logout', (req, res) => {
    try {
        res.clearCookie("auth", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.send({ message: "Cookie cleared successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
})
router.post('/register', async (req, res) => {
    
    const data = req.body;
    const captchaReq = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${secretKey}&response=${req.body?.captcha}`,
    });
    const captchaData = await captchaReq.json();
    if(!captchaData.success){
        res.status(400).json({ error: 'Invalid Captcha!' })
    }

    const { profilePicture } = req.body;
    let profilePhotoId;

    try {
        if (!profilePicture) {
            throw new Error('Profile picture is required!')
        }
        const upload = await cloudinary.v2.uploader.upload(profilePicture, {
            fetch_format: "auto",
            folder: "Task-Management",
        });
        data.profilePicture = upload.url;
        data.imageId = upload.public_id;
        profilePhotoId = upload.public_id;
        const user = await register(data);
        res.cookie("auth", user.cookie, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(201).json({ user });
    } catch (error) {
        console.log(error)
        if (profilePicture) {
            await cloudinary.v2.uploader.destroy(profilePhotoId);
        }
        res.status(400).json({ error: error.message })
    }
})
router.post('/login', async (req, res) => {
    const data = req.body;
    try {
        const user = await login(data);
        res.cookie("auth", user.cookie, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
        });
        res.status(201).json({ user });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
    }
})

module.exports = router;