import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Github } from "lucide-react";

const Support = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
    <div className="max-w-xl mx-auto space-y-6">
      <Card className="border-0 shadow-lg bg-white/70 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-lg">Need Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-slate-700">
          <p>
            Check the full documentation under <code>docs/</code> in the repository.
            If you run into issues or have questions, we are happy to assist.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>support@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4" />
              <span>Open an issue on GitHub</span>
            </div>
          </div>
          <p>
            For security concerns please contact us privately before disclosing
            information publicly.
          </p>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default Support;
