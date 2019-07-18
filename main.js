const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.use(express.static('./public'))
app.set('views', path.join(__dirname, 'templates'))
 
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


const baseRoutes = require('./routes/base-routes')
app.use('/sign', baseRoutes)


app.listen(port, () => console.log(`Digital Signage listening on port ${port}.`))