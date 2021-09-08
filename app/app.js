const express = require('express')
const cors = require('cors')
const port = process.env.NODE_ENV === 'production' ? 80 : 8090
const app = express()
app.use(cors({ credentials: true }))
app.use(express.static('dist'))
app.listen(port, '0.0.0.0', () => {
  console.log(`srart in ${port} port !`)
})
