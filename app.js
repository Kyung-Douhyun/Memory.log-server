const express = require('express');
const cors = require('cors');

const photoRouter = require('./routes/photo');
const userRouter = require('./routes/user');

const app = express();
const port = 4000;

app.get('/', (req, res) => 
    res.status(200).send("OK")
    )

app.use("/photo", photoRouter);
app.use("/user", userRouter);

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))

module.exports = app;