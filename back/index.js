require('dotenv').config();

const
    express = require('express'),
    app = express(),
    bodyparser = require('body-parser'),
    cors = require('cors'),
    db = require('./services/database')

    authVerify = require('./middlewares/authVerify')
    authRoutes = require('./router/authRouter')
    usuarioRoutes = require('./router/usuarioRoutes')
    categoriaRoutes = require('./router/categoriaRouter')
    prestadorRoutes = require('./router/prestadorRouter')
    servicoRoutes = require('./router/servicoRouter')


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
var corsOptions = {
  origin: '*',
  optionSuccesStatus:200
}
app.use(cors(corsOptions));
app.use(authRoutes);//rota de login
app.use(authVerify);// verificação de token
app.use('/categoria',categoriaRoutes)
app.use('/usuario',usuarioRoutes)
app.use('/prestador',prestadorRoutes)
app.use('/servico',servicoRoutes)

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {    
  console.log('Server running on port' + port);
  
})
app.use(express.static('public'))