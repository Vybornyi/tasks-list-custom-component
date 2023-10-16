import './index.css';
import TaskElement from './components/Task/Task';
import TasksListElement from './components/TasksList/TasksList';

window.customElements.define('task-element', TaskElement);
window.customElements.define('tasks-list', TasksListElement);

const element = document.createElement('tasks-list');

document.body.appendChild(element);
