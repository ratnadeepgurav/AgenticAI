import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Brain, Zap, Shield, BarChart3, TrendingUp } from 'lucide-react';

const detectionData = {
  overallRisk: 89,
  mlScore: 92,
  llmConfidence: 87,
  ruleBasedChecks: 85,
  severity: 'High',
  detectionEngines: [
    {
      name: 'Machine Learning',
      score: 92,
      status: 'Active',
      model: 'Anomaly Detection v2.1',
      confidence: 'High'
    },
    {
      name: 'LLM Analysis',
      score: 87,
      status: 'Active', 
      model: 'GPT-4 Security Assistant',
      confidence: 'High'
    },
    {
      name: 'Rule-Based',
      score: 85,
      status: 'Active',
      model: 'YARA + Sigma Rules',
      confidence: 'Medium'
    },
    {
      name: 'Behavioral Analysis',
      score: 78,
      status: 'Active',
      model: 'User Behavior Analytics',
      confidence: 'Medium'
    }
  ],
  riskFactors: [
    { factor: 'Geographic Anomaly', weight: 25, triggered: true },
    { factor: 'Failed Authentication', weight: 30, triggered: true },
    { factor: 'Unusual Time Activity', weight: 15, triggered: false },
    { factor: 'Known Bad IP', weight: 20, triggered: true },
    { factor: 'Privilege Escalation', weight: 10, triggered: false }
  ]
};

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'bg-red-600/20 text-red-400 border-red-400/30';
    case 'high': return 'bg-red-500/20 text-red-400 border-red-400/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'low': return 'bg-green-500/20 text-green-400 border-green-400/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-red-400';
  if (score >= 60) return 'text-yellow-400';
  return 'text-green-400';
};

export function ThreatDetection() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Threat Detection Engine</CardTitle>
          </div>
          
          <Badge 
            variant="outline" 
            className={getSeverityColor(detectionData.severity)}
          >
            {detectionData.severity} Risk
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="text-center p-6 bg-muted/10 rounded-lg border border-border/30">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Combined Risk Score</h3>
          </div>
          <div className={`text-4xl font-bold mb-2 ${getScoreColor(detectionData.overallRisk)}`}>
            {detectionData.overallRisk}%
          </div>
          <Progress value={detectionData.overallRisk} className="h-3 mb-2" />
          <p className="text-sm text-muted-foreground">
            Based on ML, LLM, and rule-based analysis
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="font-medium flex items-center space-x-2">
              <Brain className="h-4 w-4 text-purple-400" />
              <span>Detection Engines</span>
            </h4>
            
            {detectionData.detectionEngines.map((engine, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{engine.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-bold ${getScoreColor(engine.score)}`}>
                      {engine.score}%
                    </span>
                    <div className="h-2 w-2 rounded-full bg-green-400" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <div>Model: {engine.model}</div>
                  <div>Confidence: {engine.confidence}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="font-medium flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-400" />
              <span>Risk Factors</span>
            </h4>
            
            {detectionData.riskFactors.map((risk, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{risk.factor}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">{risk.weight}%</span>
                    <div className={`h-2 w-2 rounded-full ${
                      risk.triggered ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>
                <Progress 
                  value={risk.triggered ? risk.weight : 0} 
                  className="h-1" 
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Brain className="h-4 w-4 text-purple-400" />
              <span className="text-xs text-muted-foreground">ML Score</span>
            </div>
            <div className={`text-lg font-bold ${getScoreColor(detectionData.mlScore)}`}>
              {detectionData.mlScore}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="text-xs text-muted-foreground">LLM Score</span>
            </div>
            <div className={`text-lg font-bold ${getScoreColor(detectionData.llmConfidence)}`}>
              {detectionData.llmConfidence}%
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Shield className="h-4 w-4 text-blue-400" />
              <span className="text-xs text-muted-foreground">Rule Score</span>
            </div>
            <div className={`text-lg font-bold ${getScoreColor(detectionData.ruleBasedChecks)}`}>
              {detectionData.ruleBasedChecks}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}