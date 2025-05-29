
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Globe, Settings, Plus, ExternalLink, Copy, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { getSites, deleteSite } from "../services/api";
import { Site } from "../types/app";

interface Site {
  id: string;
  name: string;
  domain: string;
  customDomain?: string;
  status: "active" | "inactive" | "building";
  lastDeployed: string;
  visitors: number;
  size: string;
}

const Sites = () => {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    getSites().then(setSites);
  }, []);

  const [showAddDomain, setShowAddDomain] = useState<string | null>(null);
  const [newDomain, setNewDomain] = useState("");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "building": return "bg-yellow-100 text-yellow-800";
      case "inactive": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const addCustomDomain = (siteId: string) => {
    if (!newDomain.trim()) return;
    
    setSites(sites.map(site => 
      site.id === siteId 
        ? { ...site, customDomain: newDomain }
        : site
    ));
    setNewDomain("");
    setShowAddDomain(null);
    toast.success("Custom domain added successfully!");
  };

  const handleDeleteSite = async (siteId: string) => {
    await deleteSite(siteId);
    setSites(sites.filter(site => site.id !== siteId));
    toast.success("Site deleted successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Site Management
            </h1>
            <p className="text-slate-600 mt-2">Manage your deployed websites and custom domains</p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Deploy New Site
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
              <Globe className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sites.length}</div>
              <p className="text-xs text-slate-600">{sites.filter(s => s.status === 'active').length} active</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
              <ExternalLink className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sites.reduce((sum, site) => sum + site.visitors, 0).toLocaleString()}
              </div>
              <p className="text-xs text-slate-600">This month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Custom Domains</CardTitle>
              <Settings className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {sites.filter(s => s.customDomain).length}
              </div>
              <p className="text-xs text-slate-600">Connected domains</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Globe className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127 MB</div>
              <p className="text-xs text-slate-600">12% of quota</p>
            </CardContent>
          </Card>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sites.map((site) => (
            <Card key={site.id} className="border-0 shadow-lg bg-white/70 backdrop-blur">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {site.name}
                      <Badge className={getStatusColor(site.status)}>
                        {site.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">Pipeline Domain:</span>
                          <code className="text-xs bg-slate-100 px-2 py-1 rounded">
                            {site.domain}
                          </code>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => copyToClipboard(`https://${site.domain}`)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {site.customDomain ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium">Custom Domain:</span>
                            <code className="text-xs bg-green-100 px-2 py-1 rounded text-green-800">
                              {site.customDomain}
                            </code>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => copyToClipboard(`https://${site.customDomain}`)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">No custom domain</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setShowAddDomain(site.id)}
                              className="text-xs"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add Domain
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteSite(site.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {showAddDomain === site.id && (
                  <div className="mb-4 p-3 bg-slate-50 rounded-lg">
                    <div className="flex gap-2">
                      <Input
                        placeholder="example.com"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={() => addCustomDomain(site.id)}
                        size="sm"
                      >
                        Add
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          setShowAddDomain(null);
                          setNewDomain("");
                        }}
                        size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">{site.visitors.toLocaleString()}</p>
                    <p className="text-xs text-slate-600">Visitors</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-600">{site.size}</p>
                    <p className="text-xs text-slate-600">Size</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Last Deploy</p>
                    <p className="text-xs text-slate-600">{site.lastDeployed}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => window.open(`https://${site.customDomain || site.domain}`, '_blank')}
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Visit Site
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sites;
