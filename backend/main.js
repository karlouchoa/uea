const express = require('express');
const bcrypt = require('bcrypt')
require('dotenv').config()
const cors = require('cors')
const prisma = require('./prisma/client.js')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!, this is my first API with Node.js!')
    }
)

app.get('/api/usuarios', async (req, res) => {
    const usuarios = await prisma.usuarios.findMany()
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
    const hashPassword = await bcrypt.hash(password, 10)
    const usuario = await prisma.usuarios.create({
        data: {
            name,
            email,
            password: hashPassword
        }
    })
    res.json(usuario)
    })


app.post('/api/login', async (req, res) => {
    const { email, password } = req.body
    const usuario = await prisma.usuarios.findUnique({
        where: {
            email
        }
    })

    if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password)
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha inválida' })
    }
    res.json(usuario)
})

app.put('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params
    const { name, email, password } = req.body
    const usuario = await prisma.usuarios.update({
        where: {
            id
        },
        data: {
            name,
            email,
            password
        }
    })
    res.json(usuario)
    }
)

app.delete('/api/usuarios/:id', async (req, res) => {
    const { id } = req.params
    const usuario = await prisma.usuarios.delete({
        where: {
            id
        }
    })
    res.json(usuario)
    }  )

app.get('/api/test', async (req, res) => {
    const test = await prisma.test.findMany()
    res.json(test)
    }
)

app.post('/api/test', async (req, res) => {
    const { description, name } = req.body
    const test = await prisma.test.create({
        data: {
            name,
            description
        }
    })
    res.json(test)
    }
)
app.listen(process.env.PORT || 3000, () => {   
	console.log('Servidor rodando na porta 3000'); 
	}
);