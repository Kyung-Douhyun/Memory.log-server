const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const photoRouter = require('./routes/photo');
const userRouter = require('./routes/user');

const app = express();
const port = process.env.PORT || 4000;

app.get('/', (req, res) => 
    res.status(200).send("OK")
    )

app.use("/photo", photoRouter);
app.use("/user", userRouter);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;