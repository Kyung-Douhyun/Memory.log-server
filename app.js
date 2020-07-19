const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.get('/', (req, res) => 
    res.status(200).send("OK")
    )

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))
