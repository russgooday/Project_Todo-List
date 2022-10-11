/**
 * Creates an htmlElement with eventListeners applied.
 * @param {Object} props e.g. { id, tasks, status }
 * @param {Object} handlers e.g. { edit: fn (evt){} remove: fn (evt){} }
 * @returns {HTMLElement} a list item with eventListeners attached
 */
const createTask = (props, handlers) => {
  // listItem is the roor element
  const listItem = document.createElement('li')
  listItem.id = props.id

  listItem.insertAdjacentHTML('afterbegin', `
    <fieldset class='input-group'>
      <input
        type='checkbox'
        class='checkbox'
        name='completed'
        ${(props.status === 'done') ? 'checked' : ''}
      >
      <input
        type='text'
        class='input-task'
        value='${props.task}'
        disabled
      >
      <button class='edit bi bi-pencil' data-id='${props.id}'></button>
      <button class='delete bi bi-x-lg' data-id='${props.id}'></button>
    </fieldset>
  `)

  const checkbox = listItem.querySelector('.checkbox')
  const [editBtn, deletBtn] = listItem.querySelectorAll('button')

  checkbox.addEventListener('change', handlers.setStatus)
  editBtn.addEventListener('click', handlers.edit)
  deletBtn.addEventListener('click', handlers.remove)

  return listItem
}

export const render = (tasks, handlers) => {
  const clearAll = document.querySelector('#clear-all')
  const todoList = document.querySelector('.todo-list')
  const create = (props) => createTask(props, handlers)

  todoList.replaceChildren(...tasks.map(create))
  clearAll.classList.toggle('hide', !(tasks.length))
}
