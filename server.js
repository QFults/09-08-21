const express = require('express')
const { join } = require('path')

const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

let items = [
  {
    text: 'Take out trash',
    isDone: true
  },
  {
    text: 'Cook dinner',
    isDone: false
  },
  {
    text: 'Do laundry',
    isDone: false
  }
]

app.get('/items', (req, res) => {
  res.json(items)
})

app.post('/items', (req, res) => {
  items.push(req.body)
  res.sendStatus(200)
})

app.put('/items/:text', (req, res) => {
  const text = req.params.text
  items.forEach(item => {
    if (item.text === text) {
      item.isDone = !item.isDone
    }
  })
  res.sendStatus(200)
})

app.delete('/items/:text', (req, res) => {
  const text = req.params.text
  items = items.filter(item => item.text !== text)
  res.sendStatus(200)
})

app.listen(3000)
