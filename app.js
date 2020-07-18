const express = require('express');
const app = express();
const cors = require('cors');

const port = 4000;

app.get('/', (req, res) => 
    res.status(200).send("OK")
    )

app.listen(port, () => 
    console.log(`Example app listening at http://localhost:${port}`))
