import { getTasksData } from '../../gateway/index';
import TaskElement from '../Task/Task';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    section {
      display: flex;
      flex-direction: column;
      max-width: 100%;
      min-height: 100vh;
      padding: 5% 10%;
      background-color: #3D405B;
    }
  </style>
    <section></section>
`;
export default class TasksListElement extends HTMLElement {
  constructor() {
    super();
    this.tasksList = [];
    this.projectId = 123;
    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.appendChild(template.content.cloneNode(true));
    this.section = shadowRoot.querySelector('section');
  }

  renderTasks() {
    this.tasksList.forEach((taskData) => {
      const taskElement = new TaskElement();

      taskElement.loadData(taskData, this.projectId);
      this.section.appendChild(taskElement);
    });
  }

  async getTasksList() {
    this.tasksList = await getTasksData(this.projectId);
  }

  connectedCallback() {
    this.getTasksList().then(() => {
      if (this.tasksList) {
        this.renderTasks();
      }
    });
  }
}
