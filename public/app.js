const { axios } = window

document.getElementById('addItem').addEventListener('click', event => {
  event.preventDefault()

  const item = {
    text: document.getElementById('text').value,
    isDone: false
  }

  axios.post('/items', item)
    .then(() => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <hr>
      `
      document.getElementById('items').append(itemElem)

      document.getElementById('text').value = ''
    })
    .catch(err => console.error(err))
})

axios.get('/items')
  .then(({ data: items }) => {
    items.forEach(item => {
      const itemElem = document.createElement('div')
      itemElem.innerHTML = `
        <p>${item.text}</p>
        <hr>
      `
      document.getElementById('items').append(itemElem)
    })
  })
  .catch(err => console.error(err))
