import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Settings = () => {
  const [openaiKey, setOpenaiKey] = useState("");
  const [azureKey, setAzureKey] = useState("");

  useEffect(() => {
    setOpenaiKey(localStorage.getItem("openaiKey") || "");
    setAzureKey(localStorage.getItem("azureKey") || "");
  }, []);

  const save = () => {
    localStorage.setItem("openaiKey", openaiKey);
    localStorage.setItem("azureKey", azureKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">API Keys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">OpenAI Key</label>
              <Input value={openaiKey} onChange={e => setOpenaiKey(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Azure Key</label>
              <Input value={azureKey} onChange={e => setAzureKey(e.target.value)} />
            </div>
            <Button onClick={save} className="bg-gradient-to-r from-blue-600 to-purple-600">Save</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
