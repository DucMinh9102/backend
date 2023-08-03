import express  from 'express';
import configViewEngine  from './config/viewEngine.js';
import initWebRoute from './routes/web.js';
import initAPIRoute from './routes/api.js';
import 'dotenv/config';
//import express 

const app = express(); // app express
const port = process.env.PORT || 8888;     //port
const hostname = process.env.HOST_NAME;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//config template engine
//config stactic files
configViewEngine(app);

initWebRoute(app);
initAPIRoute(app);

app.use((req, res) => {
  return res.render('404.ejs')
}) 

app.listen(port, hostname, () => {
  console.log(`Example app listening on port ${port}`)
})