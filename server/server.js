const express = require('express');
const cors = require("cors")
const budget = require("./budget-data.json")
const app = express();
const port = 3000;


app.use(cors())

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/budgetFile', (req, res)=>{
    res.sendFile(__dirname+"/budget-data.json");
})
app.get('/get_error', (req, res) => {
    res.status(400);
    res.send({ error: 'file not found' })
})

app.listen(port, () => {
    console.log(`Yay! server started at port ${port}`);
})