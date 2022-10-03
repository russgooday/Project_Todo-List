import { render } from './views/task-template.js'
import storage from './models/storage.js'

window.addEventListener('DOMContentLoaded', () => {
  const toggleBetween = (elem, nameA, nameB) => {
    const classList = elem.classList

    switch (true) {
      case classList.contains(nameA):
        classList.replace(nameA, nameB)
        break
      case classList.contains(nameB):
        classList.replace(nameB, nameA)
    }
  }

  const tasks = {
    update (tasks) {
      render(storage.save(tasks), handlers)
    },

    add (task) {
      const tasks = storage.add(task)

      this.update(tasks)
    },

    remove (id) {
      const tasks = storage.remove(id)

      this.update(tasks)
    },

    edit (id, props) {
      const tasks = storage.edit(id, props)

      storage.save(tasks)
    },

    clearAll () {
      const tasks = storage.clearAll()

      this.update(tasks)
    }
  }

  const handlers = {
    add (event) {
      event.preventDefault()

      const form = event.target
      const input = form.elements['input-task']

      if (input === '') return

      tasks.add(input.value)
      form.reset()
    },

    remove ({ target: button }) {
      const listItem = button.closest('li')

      tasks.remove(listItem.id)
    },

    edit ({ target: button }) {
      const listItem = button.closest('li')
      const input = listItem.querySelector('.input-task')
      const disabled = input.toggleAttribute('disabled')

      toggleBetween(button, 'bi-pencil', 'bi-pencil-fill')

      if (disabled) {
        // save edit
        tasks.edit(listItem.id, { task: input.value })
      } else {
        // focus for editing
        input.focus()
      }
    },

    setStatus ({ target: checkbox }) {
      const listItem = checkbox.closest('li')

      tasks.edit(
        listItem.id, {
          status: (checkbox.checked) ? 'done' : 'todo'
        })
      // trigger a refresh with currently selected filter
      filters.dispatchEvent(new Event('change'))
    },

    filter ({ target: option }) {
      const tasks = storage.fetchAll()
      const selected = option.value

      const filtered = tasks.filter((task) => {
        if (selected === 'all') return task

        return (task.status === selected)
      })

      render(filtered, handlers)
    },

    clearAll () {
      tasks.clearAll()
    }
  }

  const form = document.querySelector('#add-todo-form')
  const filters = document.querySelector('#filters')
  const clearAll = document.querySelector('#clear-all')

  form.addEventListener('submit', handlers.add)
  filters.addEventListener('change', handlers.filter)
  clearAll.addEventListener('click', handlers.clearAll)

  render(storage.fetchAll(), handlers)
})
