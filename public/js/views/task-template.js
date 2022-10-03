/**
 * Creates an htmlElement with eventListeners applied.
 * @param {String} id
 * @param {String} task
 * @param {Object} handlers e.g. { edit: fn (evt) remove: fn (evt)}
 * @returns htmlElement
 */
export const createTask = (props, handlers) => {
  // listItem is the roor element
  const listItem = document.createElement('li')
  listItem.id = props.id

  listItem.insertAdjacentHTML('afterbegin', `
    <fieldset>
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
      <button class='edit bi bi-pencil'></button>
      <button class='delete bi bi-x-lg'></button>
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
  const todoList = document.querySelector('.todo-list')
  const create = (props) => createTask(props, handlers)

  todoList.replaceChildren(...tasks.map(create))
}
