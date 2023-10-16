import { postTaskData } from '../../gateway/index';
import checkIcon from '../../images/check-lg.svg';
import xIcon from '../../images/x-lg.svg';
import arrRightIcon from '../../images/chevron-right.svg';

const template = document.createElement('template');

template.innerHTML = `
   <style>
    .task{
      position: relative;
      display: flex;
      justify-content: start;
      align-items: center;
      margin-bottom: 1.2em;
      padding:   1rem 3rem 1rem 1rem ;
      border: 3px solid #3D405B;
      border-radius: 15px;
      background-color: #F4F1DE;
      cursor: pointer;
    }

    #check-icon{
      height: 2.5rem;
    }

    .task__status-item{
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 1rem;
      padding: 5px;
      background-color: #E07A5F;
      border-radius: 50%;
      border: 2px solid #3D405B;
      font-size: 3em;
      color:aliceblue
    }

    .task__status-item_checked{
      background-color: #81B29A;
    }

    p{
      font-size: 1.2rem;
    }

    .task_arrow-icon{
      position: absolute;
      right: 1rem;
    }
  </style>
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
      <img class="task_arrow-icon" src="${arrRightIcon}"/>
    </div>
`;

export default class TaskElement extends HTMLElement {
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
    this.statusItem = shadowRoot.getElementById('status-item');
    this.checkIcon = shadowRoot.getElementById('check-icon');
  }

  loadData(tasksData, projectId) {
    const {
      id, title, description, checked,
    } = tasksData;
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
      checked: this.checked,
    };

    postTaskData(taskInfo);
  }

  initialize() {
    this.titleSlot.textContent = this.title;
    this.descriptionSlot.textContent = this.description;
    this.updateUI();
  }

  updateUI() {
    this.statusItem.className = this.checked ? 'task__status-item task__status-item_checked' : 'task__status-item';
    this.checkIcon.src = this.checked ? checkIcon : xIcon;
  }

  connectedCallback() {
    this.addEventListener('click', this.toggleStatus);
    this.initialize();
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.toggleStatus);
  }
}
