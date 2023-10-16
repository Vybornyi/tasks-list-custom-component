import TaskElement from '../components/Task/Task';

describe('TaskElement component', () => {
  customElements.define('task-element', TaskElement);
  let element;

  beforeEach(() => {
    element = new TaskElement();
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should be defined', () => {
    expect(element).toBeDefined();
  });

  it('should have default properties', () => {
    expect(element.id).toBe('null');
    expect(element.title).toBe('');
    expect(element.description).toBe('');
    expect(element.checked).toBe(false);
    expect(element.projectId).toBeNull();
  });

  it('should have a shadow DOM', () => {
    const { shadowRoot } = element;
    expect(shadowRoot).toBeDefined();
  });

  it('should have shadow DOM elements', () => {
    const { shadowRoot } = element;
    const statusItem = shadowRoot.getElementById('status-item');
    const checkIcon = shadowRoot.getElementById('check-icon');
    const titleSlot = shadowRoot.querySelector('slot[name="title"]');
    const descriptionSlot = shadowRoot.querySelector('slot[name="description"]');
    const taskArrowIcon = shadowRoot.querySelector('.task_arrow-icon');

    expect(statusItem).toBeDefined();
    expect(checkIcon).toBeDefined();
    expect(titleSlot).toBeDefined();
    expect(descriptionSlot).toBeDefined();
    expect(taskArrowIcon).toBeDefined();
  });

  it('should load data correctly', () => {
    const tasksData = {
      id: '1',
      title: 'Sample Task',
      description: 'Description of the task',
      checked: 'true',
    };
    const projectId = 42;

    element.loadData(tasksData, projectId);

    expect(element.id).toBe(tasksData.id);
    expect(element.title).toBe(tasksData.title);
    expect(element.description).toBe(tasksData.description);
    expect(element.checked).toBe(tasksData.checked);
    expect(element.projectId).toBe(projectId);
  });

  it('should toggle status', () => {
    expect(element.checked).toBe(false);
    element.toggleStatus();
    expect(element.checked).toBe(true);
  });
});
