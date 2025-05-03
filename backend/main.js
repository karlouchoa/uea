const express = require('express')

require('dotenv').config()
const cors = require('cors')


const app = express()
app.use('cors')
app.use(express.json())

app.get('/', (req,res) => {
    res.send('Hello Word')
})


app.listen(3000, () =>{
   console.log('Servidor rodando na porta 3000')
});