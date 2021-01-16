const express = require('express')
const articlesRouter=require('./routers/articles')

require('./db/mongoose')

const app = express()
app.use(express.json())
app.use(articlesRouter)

const port = 3000;

app.listen(port,()=> console.log('server is running...'))