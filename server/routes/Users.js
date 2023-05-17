const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleWares/AuthMid");

//for registion
router.post("/", async (req, res) => {
    const {userName, userEmail, password} = req.body;
    bcrypt.hash(password, 10).then((hashRes) => {
        Users.create({
            userName: userName,
            userEmail: userEmail,
            password: hashRes,
        });
        res.json("Sucess");
    })
})
//for login
router.post("/login", async (req, res) => {
    const {userEmail, password} = req.body;
    const user = await Users.findOne({ where: {userEmail: userEmail}});

    if(!user) 
    {
        res.json({error: "User not exist"});
        return;
    }
    else
    bcrypt.compare(password, user.password).then((isMatch) => {
        if(!isMatch) 
        {
            res.json({error: "wrong password"});
            return;
        }
        else {
            const accessToken = sign(
                { userName: user.userName, id: user.id },
                "secret"
            )
            res.json(accessToken);//send back user info for query
        }
    })
})

router.get("/verify", validateToken, (req, res) => {
    res.json(req.user);
})


module.exports = router;