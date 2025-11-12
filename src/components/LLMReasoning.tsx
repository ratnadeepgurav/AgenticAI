import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, CheckCircle, AlertTriangle, FileText, Target } from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

const aiAnalysis = {
  hypothesis: "A coordinated brute force attack is currently in progress from multiple IP addresses, likely originating from a botnet. The attack pattern shows sophisticated evasion techniques including IP rotation and timing variations to avoid simple rate limiting.",
  confidence: 87,
  explanation: "The analysis reveals several concerning indicators: (1) Multiple failed authentication attempts from geographically distributed IPs within a short timeframe, (2) Consistent targeting of administrative accounts, (3) Use of common password patterns, and (4) Correlation with known threat intelligence feeds showing these IPs in previous attack campaigns.",
  recommendedActions: [
    "Immediately block all source IPs involved in the attack pattern",
    "Temporarily disable the targeted administrative accounts",
    "Enable additional MFA requirements for all admin logins",
    "Increase monitoring sensitivity for authentication events",
    "Review and update password policies organization-wide"
  ],
  evidenceLines: [
    "203.0.113.42: 15 failed logins for 'admin' account in 2 minutes",
    "198.51.100.27: 8 failed logins for 'administrator' account in 3 minutes", 
    "172.16.254.100: 12 failed logins for 'root' account in 1.5 minutes",
    "Pattern match: IPs found in Emerging Threats IP reputation feed",
    "Temporal correlation: Attack timing matches known APT28 campaign patterns"
  ],
  threatActors: ["APT28", "Unknown Botnet"],
  tactics: ["Credential Access", "Initial Access"],
  severity: "High"
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return 'text-green-400';
  if (confidence >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export function LLMReasoning() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle>AI Reasoning Assistant (GPT-4)</CardTitle>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <span className={`font-bold ${getConfidenceColor(aiAnalysis.confidence)}`}>
              {aiAnalysis.confidence}%
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Hypothesis</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {aiAnalysis.hypothesis}
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <h3 className="font-medium">Explanation</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {aiAnalysis.explanation}
          </p>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <h3 className="font-medium">Confidence Score</h3>
          </div>
          <div className="space-y-2">
            <Progress value={aiAnalysis.confidence} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <Target className="h-4 w-4 text-blue-400" />
            <h3 className="font-medium">Recommended Actions</h3>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {aiAnalysis.recommendedActions.map((action, index) => (
                <div key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-primary font-mono mt-0.5">{index + 1}.</span>
                  <span className="text-muted-foreground leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-3">
            <FileText className="h-4 w-4 text-purple-400" />
            <h3 className="font-medium">Evidence Lines</h3>
          </div>
          <ScrollArea className="h-32">
            <div className="space-y-2">
              {aiAnalysis.evidenceLines.map((evidence, index) => (
                <div key={index} className="p-2 rounded bg-muted/20 border border-border/30">
                  <span className="text-xs font-mono text-muted-foreground">{evidence}</span>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center space-x-4">
            <div>
              <span className="text-xs text-muted-foreground">Threat Actors:</span>
              <div className="flex space-x-1 mt-1">
                {aiAnalysis.threatActors.map((actor) => (
                  <Badge key={actor} variant="outline" className="text-xs bg-red-500/20 text-red-400 border-red-400/30">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-xs text-muted-foreground">Tactics:</span>
              <div className="flex space-x-1 mt-1">
                {aiAnalysis.tactics.map((tactic) => (
                  <Badge key={tactic} variant="outline" className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-400/30">
                    {tactic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <Badge 
            variant="outline" 
            className="bg-red-500/20 text-red-400 border-red-400/30"
          >
            {aiAnalysis.severity} Severity
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}