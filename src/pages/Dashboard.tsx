
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Globe, Database, Settings, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects] = useState([
    {
      id: 1,
      name: "E-commerce Store",
      status: "deployed",
      url: "store.example.com",
      lastUpdated: "2 hours ago",
      agents: ["Frontend", "Backend", "Database"]
    },
    {
      id: 2,
      name: "Portfolio Website",
      status: "building",
      url: "portfolio.staging.com",
      lastUpdated: "5 minutes ago",
      agents: ["Design", "Frontend"]
    },
    {
      id: 3,
      name: "SaaS Dashboard",
      status: "planning",
      url: "Not deployed",
      lastUpdated: "1 day ago",
      agents: ["Backend", "DevOps"]
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "deployed": return "bg-green-100 text-green-800";
      case "building": return "bg-yellow-100 text-yellow-800";
      case "planning": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Development Pipeline
            </h1>
            <p className="text-slate-600 mt-2">Deploy websites and web apps with AI-powered development agents</p>
          </div>
          <Button 
            onClick={() => navigate('/chat')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Globe className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-slate-600">+2 from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Deployments</CardTitle>
              <Settings className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-slate-600">4 building, 4 live</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Agents</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-slate-600">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Usage</CardTitle>
              <Database className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4GB</div>
              <p className="text-xs text-slate-600">68% of quota used</p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="border-0 shadow-lg bg-white/70 backdrop-blur hover:shadow-xl transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {project.url}
                    </CardDescription>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Active Agents:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.agents.map((agent) => (
                        <span key={agent} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {agent}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-xs text-slate-500">Updated {project.lastUpdated}</span>
                    <Button variant="outline" size="sm" onClick={() => navigate(`/project/${project.id}`)}>
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
