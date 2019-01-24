//use the installed packages
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const massive = require('massive');
const ctrl = require('./products_controller')


const app = express();
app.use(bodyParser.json())

massive(process.env.CONNECTION_STRING).then((dbInstance) => {
    app.set('db', dbInstance)
    }).catch(err => console.log(err) );
    
//ENDPOINTS
const baseurl = '/api/products';

app.post( baseurl, ctrl.create );
app.get( baseurl, ctrl.getAll );
app.get( `${baseurl}/:id`, ctrl.getOne );
app.put( `${baseurl}/:id`, ctrl.update );
app.delete( `${baseurl}/:id`, ctrl.delete );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`beam me up! ${3000}`))
