
import { Zap } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 justify-start">
      <div className="p-2 rounded-lg bg-yellow-500 text-white flex-shrink-0">
        <Zap className="h-4 w-4" />
      </div>
      <div className="bg-slate-100 p-3 rounded-lg">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
