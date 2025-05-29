export interface Project {
  id: string;
  name: string;
  status: string;
  url: string;
  lastUpdated: string;
  agents: string[];
}

export interface Site {
  id: string;
  name: string;
  domain: string;
  customDomain?: string;
  status: string;
  lastDeployed: string;
  visitors: number;
  size: string;
}

export interface DatabaseTable {
  id: string;
  name: string;
  records: number;
  lastModified: string;
  status: "active" | "inactive";
}
