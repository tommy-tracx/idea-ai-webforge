const http = require('http');
const { randomUUID } = require('crypto');
const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'data.json');
let state = { projects: [], sites: [], tables: [] };
try {
  state = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
} catch (e) {
  console.log('No data file, starting fresh');
}

function save() {
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
}

function send(res, code, data) {
  res.writeHead(code, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function parseBody(req, cb) {
  let body = '';
  req.on('data', chunk => (body += chunk));
  req.on('end', () => {
    try {
      cb(JSON.parse(body || '{}'));
    } catch {
      cb({});
    }
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname } = url;

  if (pathname === '/api/projects' && req.method === 'GET') {
    return send(res, 200, state.projects);
  }
  if (pathname === '/api/projects' && req.method === 'POST') {
    return parseBody(req, body => {
      const project = {
        id: randomUUID(),
        name: body.name || 'New Project',
        status: 'planning',
        url: 'Not deployed',
        lastUpdated: new Date().toISOString(),
        agents: ['Frontend', 'Backend', 'Database']
      };
      state.projects.push(project);
      save();
      send(res, 200, project);
    });
  }
  if (pathname.startsWith('/api/projects/') && req.method === 'GET') {
    const id = pathname.split('/')[3];
    const project = state.projects.find(p => p.id === id);
    return project ? send(res, 200, project) : send(res, 404, { error: 'Not found' });
  }
  if (pathname.endsWith('/deploy') && req.method === 'POST') {
    const id = pathname.split('/')[3];
    const project = state.projects.find(p => p.id === id);
    if (!project) return send(res, 404, { error: 'Not found' });
    project.status = 'deployed';
    project.url = `${project.name.toLowerCase().replace(/\s+/g, '-')}-${id.slice(0,6)}.pipeline.app`;
    project.lastUpdated = new Date().toISOString();
    const site = {
      id: randomUUID(),
      name: project.name,
      domain: project.url,
      status: 'active',
      lastDeployed: 'just now',
      visitors: 0,
      size: '0 MB'
    };
    state.sites.push(site);
    save();
    return send(res, 200, project);
  }
  if (pathname === '/api/sites' && req.method === 'GET') {
    return send(res, 200, state.sites);
  }
  if (pathname.startsWith('/api/sites/') && req.method === 'DELETE') {
    const id = pathname.split('/')[3];
    state.sites = state.sites.filter(s => s.id !== id);
    save();
    return send(res, 200, { success: true });
  }
  if (pathname === '/api/database/tables' && req.method === 'GET') {
    return send(res, 200, state.tables);
  }

  send(res, 404, { error: 'Not found' });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('API server listening on', PORT);
});
