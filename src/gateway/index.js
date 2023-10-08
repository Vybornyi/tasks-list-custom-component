const baseUrl = 'https://flexxter.de/Tasks/';

export const getTasksData = async (projectId) => {
  try {
    const response = await fetch(`${baseUrl}Get?project-id=${projectId}`);

    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    } else {
      const data = await response.json();
      return data.tasks;
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

export const postTaskData = async (projectData) => {
  try {
    const response = await (fetch(`${baseUrl}Save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    }));
    if (response.status === 'error') {
      throw new Error('Request failed with status' + response.status);
    }
  } catch (error) {
    console.error('Error saving task:', error);
  }
}