const express = require('express')
const logger = require('morgan')
const cors = require('cors')

// const { Contact } = requre('./models')

// const { DB_HOST } = process.env
// console.log(process.env.DB_HOST)

// const newContact = {
//   name: 'Aleksandr',
//   email: 'Idiot@mail.com',
//   phone: '123-123-123',
//   favorite: false,
// }


const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Not found',
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message });
});

module.exports = app
