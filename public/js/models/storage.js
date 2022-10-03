const create = (task) => {
  return {
    task,
    id: crypto.randomUUID(),
    status: 'todo'
  }
}

const save = (taskList = []) => {
  localStorage.setItem(
    'task-list',
    JSON.stringify(taskList, null, 2)
  )

  return [...taskList]
}

const fetchAll = () => {
  const json = localStorage.getItem('task-list')

  return (json !== null) ? JSON.parse(json) : []
}

const clearAll = () => {
  localStorage.removeItem('task-list')

  return []
}

const add = (task) => {
  const tasks = [...fetchAll(), create(task)]

  return tasks
}

const remove = (id) => {
  const tasks = fetchAll().filter(
    (prevTask) => prevTask.id !== id
  )

  return tasks
}

const edit = (id, props) => {
  const tasks = fetchAll().map(
    (prevTask) => {
      return (prevTask.id === id)
        ? { ...prevTask, ...props }
        : prevTask
    }
  )

  return tasks
}

export default {
  add,
  remove,
  edit,
  save,
  clearAll,
  fetchAll
}
