const express = require('express');

const app = express();

app.use(express.json());

const PORT = 5000;

app.listen(PORT, (error) => {
    if (error) {
        console.log('Server not started', error);
    }
    else {
        console.log(`Server is running on https://localhost:${PORT}`)
    }
})