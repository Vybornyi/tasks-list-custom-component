import { postTaskData } from "../../gateway/index.js";

const template = document.createElement('template');

template.innerHTML = `
  <link rel="stylesheet" href="./src/components/Task/Task.css"/>
    <div class="task">
      <div id="status-item" class="task__status-item">
        <img id="check-icon"/>
      </div>
      <div class="task__info-wrapper">
        <h2 class="task__title">
          <slot name="title"/>
        </h2>
        <p class="task__description">
          <slot name="description"/>
        </p>
      </div>
      <img class="task_arrow-icon" src="./src/icons/chevron-right.svg"/>
    </div>
`

export class TaskElement extends HTMLElement {
  constructor() {
    super();
    this.id = null;
    this.title = '';
    this.description = '';
    this.checked = false;
    this.projectId = null;
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));

    this.titleSlot = shadowRoot.querySelector('slot[name="title');
    this.descriptionSlot = shadowRoot.querySelector('slot[name="description"]');
    this.statusItem = shadowRoot.getElementById("status-item");
    this.checkIcon = shadowRoot.getElementById("check-icon");
  }
  loadData(tasksData, projectId) {
    const { id, title, description, checked } = tasksData;
    this.id = id;
    this.title = title;
    this.description = description;
    this.checked = checked;
    this.projectId = projectId;
  }

  toggleStatus() {
    this.checked = !this.checked;
    this.updateUI();
    const taskInfo = {
      projectId: this.projectId,
      taskId: this.id,
      checked: this.checked
    };

    postTaskData(taskInfo);
  }

  initialize() {
    this.titleSlot.textContent = this.title;
    this.descriptionSlot.textContent = this.description;
    this.updateUI();
  }

  updateUI() {
    this.statusItem.className = this.checked ? "task__status-item task__status-item_checked" : "task__status-item";
    this.checkIcon.src = this.checked ? "./src/icons/check-lg.svg" : "./src/icons/x-lg.svg";
  }

  connectedCallback() {
    this.addEventListener('click', this.toggleStatus);
    this.initialize();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.toggleStatus);
  }
}

window.customElements.define('task-element', TaskElement);

