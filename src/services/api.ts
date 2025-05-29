export async function apiRequest(path: string, options: RequestInit = {}) {
  const response = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    ...(options.body ? { body: JSON.stringify(options.body) } : {}),
  } as RequestInit);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Request failed');
  }

  return response.json();
}

export const getProjects = () => apiRequest('/projects');
export const createProject = (name: string) =>
  apiRequest('/projects', { method: 'POST', body: { name } });
export const getProject = (id: string) => apiRequest(`/projects/${id}`);
export const deployProject = (id: string) =>
  apiRequest(`/projects/${id}/deploy`, { method: 'POST' });

export const getSites = () => apiRequest('/sites');
export const deleteSite = (id: string) =>
  apiRequest(`/sites/${id}`, { method: 'DELETE' });
