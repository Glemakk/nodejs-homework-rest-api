const mongoose = require('mongoose');
require('dotenv').config();
// ниже более длинная запись подключения dotenv
// const dotenv = require('dotenv')
// dotenv.config()

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env;
// const {DB_USER, DB_USER_PASS, DB_NAME} = process.env;
// const DB_HOST = `mongodb+srv://${DB_USER}:${DB_USER_PASS}@cluster0.fbkoo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

mongoose
  .connect(DB_HOST
  //   , {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
  )
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  })

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`)
// })
