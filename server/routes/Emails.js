const express = require("express");
const router = express.Router();
const { Emails } = require("../models");

//get all inbox email by user
router.get("/", async (req, res) => {
    const userEmail = req.header("email");
    const allEmails = await Emails.findAll({ where: {receiEmail: userEmail}});
    res.json(allEmails);
    return;
})
//get all inbox email by user
router.get("/send", async (req, res) => {
    const userEmail = req.header("email");
    const allEmails = await Emails.findAll({ where: {senderEmail: userEmail}});
    res.json(allEmails);
    return;
})
//get a specific email by id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const email = await Emails.findByPk(id);
    res.json(email);
    return;
})
//get reply emails by reply id
router.get("/replys/:id", async (req, res) => {
    const id = req.params.id;
    const allReplies = await Emails.findAll({ where: {replyToId: id}});
    res.json(allReplies);
    return;
})
//create email
router.post("/", async (req, res) => {
    const email = req.body;
    await Emails.create(email);
    res.json(email);
})

module.exports = router;