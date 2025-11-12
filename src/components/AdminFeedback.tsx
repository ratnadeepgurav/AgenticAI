import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { Brain, CheckCircle, XCircle, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const pendingAlerts = [
  {
    id: 1,
    timestamp: '2024-12-19 15:43:12',
    description: 'Brute force attack from 203.0.113.42',
    confidence: 92,
    aiDecision: 'Threat Detected',
    feedback: null
  },
  {
    id: 2,
    timestamp: '2024-12-19 15:41:55',
    description: 'Unusual outbound traffic pattern',
    confidence: 68,
    aiDecision: 'Suspicious Activity',
    feedback: null
  },
  {
    id: 3,
    timestamp: '2024-12-19 15:40:33',
    description: 'Failed login from internal IP',
    confidence: 45,
    aiDecision: 'Low Risk',
    feedback: null
  }
];

const recentFeedback = [
  {
    id: 4,
    timestamp: '2024-12-19 15:38:21',
    description: 'Port scan from external source',
    feedback: 'True Positive',
    confidence: 87,
    notes: 'Confirmed malicious activity, good detection'
  },
  {
    id: 5,
    timestamp: '2024-12-19 15:36:14',
    description: 'Large file download during off-hours',
    feedback: 'False Positive',
    confidence: 72,
    notes: 'Legitimate backup operation, update rules'
  },
  {
    id: 6,
    timestamp: '2024-12-19 15:34:05',
    description: 'Multiple failed SSH attempts',
    feedback: 'True Positive',
    confidence: 94,
    notes: 'Confirmed attack, excellent detection'
  }
];

const modelStats = {
  accuracy: 89,
  precision: 85,
  recall: 92,
  f1Score: 88,
  lastTraining: '2024-12-18 02:30:00',
  trainingStatus: 'Completed',
  nextTraining: '2024-12-25 02:30:00',
  feedbackCount: 1247,
  pendingFeedback: 3
};

const getFeedbackColor = (feedback: string) => {
  switch (feedback) {
    case 'True Positive': return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'False Positive': return 'bg-red-500/20 text-red-400 border-red-400/30';
    case 'Needs Review': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const getConfidenceColor = (confidence: number) => {
  if (confidence >= 80) return 'text-green-400';
  if (confidence >= 60) return 'text-yellow-400';
  return 'text-red-400';
};

export function AdminFeedback() {
  const [alerts, setAlerts] = useState(pendingAlerts);
  const [selectedAlert, setSelectedAlert] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [notes, setNotes] = useState('');

  const submitFeedback = () => {
    if (selectedAlert && feedback) {
      setAlerts(prev => prev.filter(alert => alert.id !== selectedAlert));
      setSelectedAlert(null);
      setFeedback('');
      setNotes('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle>Pending Feedback</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                <p>No pending alerts to review</p>
              </div>
            ) : (
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div 
                      key={alert.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedAlert === alert.id 
                          ? 'bg-primary/10 border-primary/50' 
                          : 'bg-muted/20 border-border/30 hover:bg-muted/40'
                      }`}
                      onClick={() => setSelectedAlert(alert.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-muted-foreground">
                          {alert.timestamp}
                        </span>
                        <span className={`text-xs font-bold ${getConfidenceColor(alert.confidence)}`}>
                          {alert.confidence}%
                        </span>
                      </div>
                      
                      <p className="text-sm mb-2">{alert.description}</p>
                      
                      <Badge variant="outline" className="text-xs">
                        {alert.aiDecision}
                      </Badge>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {selectedAlert && (
              <div className="space-y-4 pt-4 border-t border-border/50">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Feedback</Label>
                  <RadioGroup value={feedback} onValueChange={setFeedback}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="True Positive" id="tp" />
                      <Label htmlFor="tp" className="text-sm">True Positive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="False Positive" id="fp" />
                      <Label htmlFor="fp" className="text-sm">False Positive</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Needs Review" id="nr" />
                      <Label htmlFor="nr" className="text-sm">Needs Review</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="notes" className="text-sm font-medium mb-2 block">
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional context or comments..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-16"
                  />
                </div>

                <Button 
                  onClick={submitFeedback}
                  disabled={!feedback}
                  className="w-full"
                >
                  Submit Feedback
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-primary" />
              <CardTitle>Model Performance</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {modelStats.accuracy}%
                </div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">
                  {modelStats.precision}%
                </div>
                <div className="text-xs text-muted-foreground">Precision</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400 mb-1">
                  {modelStats.recall}%
                </div>
                <div className="text-xs text-muted-foreground">Recall</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {modelStats.f1Score}%
                </div>
                <div className="text-xs text-muted-foreground">F1 Score</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Training Status</span>
                <Badge 
                  variant="outline" 
                  className="bg-green-400/20 text-green-400 border-green-400/30"
                >
                  {modelStats.trainingStatus}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Last Training</span>
                <span className="text-xs font-mono">{modelStats.lastTraining}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Next Training</span>
                <span className="text-xs font-mono">{modelStats.nextTraining}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Feedback</span>
                <span className="text-sm font-medium">{modelStats.feedbackCount.toLocaleString()}</span>
              </div>
            </div>

            <Button variant="outline" className="w-full" disabled>
              <RefreshCw className="h-4 w-4 mr-2" />
              Trigger Retraining
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback History</CardTitle>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {recentFeedback.map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-muted-foreground">
                      {item.timestamp}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs font-bold ${getConfidenceColor(item.confidence)}`}>
                        {item.confidence}%
                      </span>
                      <Badge variant="outline" className={getFeedbackColor(item.feedback)}>
                        {item.feedback}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-2">{item.description}</p>
                  
                  {item.notes && (
                    <p className="text-xs text-muted-foreground italic">
                      "{item.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}