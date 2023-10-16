/* eslint-disable no-console */

// this url and functions is provided for testing purposes
const baseUrl = 'https://6516d99209e3260018ca6496.mockapi.io/tasks';

export async function getTasksData() {
  try {
    const response = await fetch(baseUrl);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    } else {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
}

export async function postTaskData(projectData) {
  try {
    const response = await (fetch(`${baseUrl}Save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    }));
    if (response.status === 'error') {
      throw new Error(`Request failed with status${response.status}`);
    }
  } catch (error) {
    console.error('Error saving task:', error);
  }
}

// here is the url and the functions that follow the task request

/* const baseUrl = 'https://flexxter.de/Tasks/';

export const getTasksData = async (projectId) => {
  try {
    const response = await fetch(`${baseUrl}Get?project-id=${projectId}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    } else {
      const data = await response.json();
      return data.tasks;
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const postTaskData = async (projectData) => {
  try {
    const response = await (fetch(`${baseUrl}Save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    }));
    if (response.status === 'error') {
      throw new Error(`Request failed with status${response.status}`);
    }
  } catch (error) {
    console.error('Error saving task:', error);
  }
}; */
