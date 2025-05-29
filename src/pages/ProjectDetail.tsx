import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProject, deployProject } from "../services/api";
import { Project } from "../types/app";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (projectId) {
      getProject(projectId).then(setProject).catch(() => navigate("/dashboard"));
    }
  }, [projectId, navigate]);

  const deploy = async () => {
    if (!projectId) return;
    await deployProject(projectId);
    const updated = await getProject(projectId);
    setProject(updated);
  };

  if (!project) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Button variant="outline" onClick={() => navigate('/dashboard')}>Back</Button>
        <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-lg">{project.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Status: {project.status}</p>
            <p>URL: {project.url}</p>
            <div>
              <p className="font-medium mb-1">Agents</p>
              <div className="flex flex-wrap gap-1">
                {project.agents.map(a => (
                  <span key={a} className="px-2 py-1 bg-blue-100 rounded text-xs text-blue-800">{a}</span>
                ))}
              </div>
            </div>
            <Button onClick={deploy} className="bg-gradient-to-r from-blue-600 to-purple-600">Deploy</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetail;
