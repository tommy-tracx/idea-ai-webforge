
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Table, Plus, Download, Upload, Settings, BarChart3 } from "lucide-react";

interface DatabaseTable {
  id: string;
  name: string;
  records: number;
  size: string;
  lastUpdated: string;
  status: "active" | "syncing" | "error";
}

interface DataStore {
  id: string;
  name: string;
  type: "Vector" | "Cache" | "Session" | "File";
  usage: string;
  status: "active" | "inactive";
}

const Database = () => {
  const [tables] = useState<DatabaseTable[]>([
    {
      id: "1",
      name: "users",
      records: 1247,
      size: "2.3 MB",
      lastUpdated: "5 minutes ago",
      status: "active"
    },
    {
      id: "2",
      name: "projects",
      records: 89,
      size: "856 KB",
      lastUpdated: "1 hour ago",
      status: "active"
    },
    {
      id: "3",
      name: "deployments",
      records: 2456,
      size: "4.1 MB",
      lastUpdated: "2 minutes ago",
      status: "syncing"
    },
    {
      id: "4",
      name: "analytics",
      records: 15678,
      size: "12.7 MB",
      lastUpdated: "10 minutes ago",
      status: "active"
    }
  ]);

  const [dataStores] = useState<DataStore[]>([
    {
      id: "1",
      name: "AI Vector Store",
      type: "Vector",
      usage: "2.1 GB",
      status: "active"
    },
    {
      id: "2",
      name: "Redis Cache",
      type: "Cache",
      usage: "512 MB",
      status: "active"
    },
    {
      id: "3",
      name: "Session Storage",
      type: "Session",
      usage: "128 MB",
      status: "active"
    },
    {
      id: "4",
      name: "File Storage",
      type: "File",
      usage: "5.8 GB",
      status: "active"
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "syncing": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Vector": return "bg-purple-100 text-purple-800";
      case "Cache": return "bg-blue-100 text-blue-800";
      case "Session": return "bg-orange-100 text-orange-800";
      case "File": return "bg-green-100 text-green-800";
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
              Database Management
            </h1>
            <p className="text-slate-600 mt-2">Manage your databases and specialized data stores</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Data
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="mr-2 h-4 w-4" />
              New Table
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Records</CardTitle>
              <Database className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tables.reduce((sum, table) => sum + table.records, 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-600">Across all tables</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Database Size</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">19.2 MB</div>
              <p className="text-xs text-slate-600">Primary database</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Data Stores</CardTitle>
              <Settings className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dataStores.length}</div>
              <p className="text-xs text-slate-600">Specialized stores</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
              <Upload className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5 GB</div>
              <p className="text-xs text-slate-600">All data stores</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Database Tables */}
          <div>
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Table className="h-5 w-5" />
                  Database Tables
                </CardTitle>
                <CardDescription>
                  Primary PostgreSQL database tables
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tables.map((table) => (
                    <div key={table.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{table.name}</p>
                          <Badge className={getStatusColor(table.status)}>
                            {table.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-600">
                          <span>{table.records.toLocaleString()} records</span>
                          <span>{table.size}</span>
                          <span>Updated {table.lastUpdated}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Stores */}
          <div>
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Specialized Data Stores
                </CardTitle>
                <CardDescription>
                  Vector databases, caches, and file storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataStores.map((store) => (
                    <div key={store.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{store.name}</p>
                          <Badge className={getTypeColor(store.type)}>
                            {store.type}
                          </Badge>
                          <Badge className={getStatusColor(store.status)}>
                            {store.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-600">
                          Usage: {store.usage}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Database;
