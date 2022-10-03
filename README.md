# Vanilla Js Todo List
### Save to localStorage

A very common project, but one I haven't done before.

Having assisted a member of the Sitepoint forum recently with their todo list, it inspired me to write my own.

Running demo can be found [here](https://codepen.io/rpg2019/pen/abGYxxY/04d3d81eae1497c853f984ce1f952749)

I have loosely followed a MVC pattern, as it is such a nice way to work.

For creating the HTML for each task, I used a hybrid approach with a mix of document.createElement for the root list item and insertAdjacentHTML for the content. Doing it this way enabled me to not only use readable HTML in the form of a template string, but also have a dom object I could attach eventListeners to.

See [template code here](https://github.com/russgooday/Project_Todo-List/blob/main/public/js/views/task-template.js)
