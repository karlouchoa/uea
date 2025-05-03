const express = require('express'); // Importando o express
const cors = require('cors'); // Importando o cors para permitir requisições de outros domínios
require('dotenv').config(); // Importando o dotenv para variáveis de ambiente
const Prisma = require('./prisma/client'); // Importando o Prisma Client


const app = express(); // Criando uma instância do express
app.use(express.json()); // Middleware para trabalhar com JSON
app.use(cors()); // Middleware para permitir requisições de outros domínios


app.get('/', (req, res) => { // Rota raiz
    res.send('Hello World!'); // Retorrna "Hello World!" quando acessa a rota raiz
    }
);

app.get('api/usuarios', async (req, res) => { 
    const usuarios = await Prisma.user.findMany(    )
    const listUsuarios = usuarios.map(usuario => {
        return {
            id: usuario.id,
            name: usuario.name,
            email: usuario.email
        }
    })
    res.json(listUsuarios) 
}
)

app.post('/api/usuarios', async (req, res) => {
    const { name, email, password } = req.body
    const usuario = await Prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    res.json(usuario) 
})

app.listen(process.env.PORT || 3000, () => { // Ligando o servidor na porta 3000
    console.log('Servidor rodando na porta 3000');
    }
);