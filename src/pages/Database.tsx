
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Database as DatabaseIcon, 
  Plus, 
  Search, 
  Settings, 
  ArrowLeft, 
  Table, 
  Users, 
  Activity,
  Trash2,
  Edit
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DatabaseTable {
  id: string;
  name: string;
  records: number;
  lastModified: string;
  status: "active" | "inactive";
}

interface DatabaseConnection {
  id: string;
  name: string;
  type: "PostgreSQL" | "MySQL" | "MongoDB" | "Redis";
  status: "connected" | "disconnected";
  url: string;
}

const DatabasePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"tables" | "connections" | "queries">("tables");
  const [searchTerm, setSearchTerm] = useState("");

  const [tables] = useState<DatabaseTable[]>([
    {
      id: "1",
      name: "users",
      records: 1250,
      lastModified: "2 hours ago",
      status: "active"
    },
    {
      id: "2",
      name: "projects",
      records: 89,
      lastModified: "1 day ago",
      status: "active"
    },
    {
      id: "3",
      name: "deployments",
      records: 342,
      lastModified: "3 hours ago",
      status: "active"
    },
    {
      id: "4",
      name: "analytics",
      records: 5670,
      lastModified: "5 minutes ago",
      status: "active"
    }
  ]);

  const [connections] = useState<DatabaseConnection[]>([
    {
      id: "1",
      name: "Main Database",
      type: "PostgreSQL",
      status: "connected",
      url: "postgresql://localhost:5432/main"
    },
    {
      id: "2",
      name: "Cache Store",
      type: "Redis",
      status: "connected",
      url: "redis://localhost:6379"
    },
    {
      id: "3",
      name: "Analytics DB",
      type: "MongoDB",
      status: "disconnected",
      url: "mongodb://localhost:27017/analytics"
    }
  ]);

  const filteredTables = tables.filter(table =>
    table.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredConnections = connections.filter(conn =>
    conn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Database Management
            </h1>
            <p className="text-slate-600">Manage your data stores and database connections</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Table className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Tables</p>
                  <p className="text-2xl font-bold text-slate-900">{tables.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Total Records</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {tables.reduce((sum, table) => sum + table.records, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <DatabaseIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Connections</p>
                  <p className="text-2xl font-bold text-slate-900">{connections.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Activity className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-600">Active</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {connections.filter(c => c.status === "connected").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <CardTitle className="text-xl">Database Overview</CardTitle>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Plus className="h-4 w-4 mr-2" />
                  New Table
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg w-fit">
              <Button
                variant={activeTab === "tables" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("tables")}
                className={activeTab === "tables" ? "bg-white shadow-sm" : ""}
              >
                Tables
              </Button>
              <Button
                variant={activeTab === "connections" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("connections")}
                className={activeTab === "connections" ? "bg-white shadow-sm" : ""}
              >
                Connections
              </Button>
              <Button
                variant={activeTab === "queries" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("queries")}
                className={activeTab === "queries" ? "bg-white shadow-sm" : ""}
              >
                Query Builder
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {activeTab === "tables" && (
              <div className="space-y-4">
                {filteredTables.map((table) => (
                  <div key={table.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Table className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{table.name}</h3>
                        <p className="text-sm text-slate-600">
                          {table.records.toLocaleString()} records • Last modified {table.lastModified}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={table.status === "active" ? "default" : "secondary"}>
                        {table.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "connections" && (
              <div className="space-y-4">
                {filteredConnections.map((connection) => (
                  <div key={connection.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DatabaseIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{connection.name}</h3>
                        <p className="text-sm text-slate-600">
                          {connection.type} • {connection.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={connection.status === "connected" ? "default" : "destructive"}>
                        {connection.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "queries" && (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-lg">
                  <h3 className="font-semibold mb-4">Quick Query Builder</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Select Table
                      </label>
                      <select className="w-full p-2 border border-slate-300 rounded-md">
                        <option>Choose a table...</option>
                        {tables.map((table) => (
                          <option key={table.id} value={table.name}>
                            {table.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Query Type
                      </label>
                      <select className="w-full p-2 border border-slate-300 rounded-md">
                        <option>SELECT</option>
                        <option>INSERT</option>
                        <option>UPDATE</option>
                        <option>DELETE</option>
                      </select>
                    </div>
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                      Execute Query
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DatabasePage;
