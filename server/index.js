const express = require('express');
const app = express();
const db = require("./models");
const cors = require('cors');

app.use(cors());
app.use(express.json());
//Routers
//email
const emailRoute = require('./routes/Emails');
app.use("/emails", emailRoute);
//user
const userRoute = require('./routes/Users');
app.use("/auth", userRoute);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server runing on port 3001");
    });
});
