import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { FileText, Download, Calendar, Clock, User, Shield, AlertTriangle } from 'lucide-react';
import { Separator } from './ui/separator';

const incidentData = {
  id: 'INC-2024-001247',
  title: 'Coordinated Brute Force Attack Campaign',
  status: 'Active',
  severity: 'High',
  assignee: 'Sarah Chen',
  created: '2024-12-19 15:35:42',
  lastUpdated: '2024-12-19 15:43:12',
  summary: 'Multiple IP addresses conducting coordinated brute force attacks against administrative accounts. Pattern suggests botnet involvement with sophisticated evasion techniques.',
  confidence: 87,
  timeline: [
    {
      timestamp: '15:35:42',
      event: 'Initial detection triggered',
      actor: 'Automated System',
      details: 'Anomaly detected in authentication patterns'
    },
    {
      timestamp: '15:36:15',
      event: 'IP reputation check completed',
      actor: 'SIEM Integration',
      details: 'Source IPs found in threat intelligence feeds'
    },
    {
      timestamp: '15:37:03',
      event: 'AI analysis initiated',
      actor: 'LLM Assistant',
      details: 'GPT-4 analysis started for threat assessment'
    },
    {
      timestamp: '15:38:21',
      event: 'Threat confirmed',
      actor: 'ML Engine',
      details: 'Machine learning model confidence: 92%'
    },
    {
      timestamp: '15:39:45',
      event: 'Automatic IP blocking initiated',
      actor: 'Prevention Engine',
      details: 'Blocked 3 malicious IP addresses'
    },
    {
      timestamp: '15:41:12',
      event: 'Security team notified',
      actor: 'Automated System',
      details: 'Alert sent to SOC team and CISO'
    },
    {
      timestamp: '15:43:12',
      event: 'Manual investigation started',
      actor: 'Sarah Chen',
      details: 'Security analyst assigned to incident'
    }
  ],
  evidence: [
    'Failed authentication logs from multiple sources',
    'IP geolocation data showing distributed attack sources',
    'Threat intelligence correlation with known APT campaigns',
    'Network traffic analysis showing coordinated timing',
    'User account targeting patterns indicating reconnaissance'
  ],
  actionsTaken: [
    'Blocked malicious IP addresses at firewall level',
    'Temporarily disabled targeted administrative accounts',
    'Increased monitoring sensitivity for authentication events',
    'Initiated threat intelligence sharing with partners',
    'Escalated to incident response team'
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

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active': return 'bg-red-500/20 text-red-400 border-red-400/30';
    case 'investigating': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'resolved': return 'bg-green-500/20 text-green-400 border-green-400/30';
    case 'closed': return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    default: return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
  }
};

export function ThreatReporting() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-primary" />
            <CardTitle>Incident Report</CardTitle>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Export JSON</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center space-x-1">
              <Download className="h-4 w-4" />
              <span>Export PDF</span>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Incident ID</span>
            <div className="font-mono text-primary font-medium">{incidentData.id}</div>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Status</span>
            <Badge variant="outline" className={getStatusColor(incidentData.status)}>
              {incidentData.status}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Severity</span>
            <Badge variant="outline" className={getSeverityColor(incidentData.severity)}>
              {incidentData.severity}
            </Badge>
          </div>
          
          <div className="space-y-1">
            <span className="text-xs text-muted-foreground">Confidence</span>
            <div className="text-sm font-medium text-green-400">{incidentData.confidence}%</div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Incident Title</label>
            <Input value={incidentData.title} className="bg-muted/20" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Summary</label>
            <Textarea 
              value={incidentData.summary} 
              className="bg-muted/20 min-h-20"
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-3 flex items-center space-x-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>Timeline</span>
          </h3>
          
          <ScrollArea className="h-48">
            <div className="space-y-3">
              {incidentData.timeline.map((event, index) => (
                <div key={index} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    {index < incidentData.timeline.length - 1 && (
                      <div className="h-8 w-px bg-border mt-1" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-mono text-xs text-primary">{event.timestamp}</span>
                      <span className="text-xs text-muted-foreground">by {event.actor}</span>
                    </div>
                    <div className="text-sm font-medium mb-1">{event.event}</div>
                    <div className="text-xs text-muted-foreground">{event.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <Separator />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <span>Evidence</span>
            </h3>
            
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {incidentData.evidence.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-primary font-mono mt-0.5">•</span>
                    <span className="text-muted-foreground leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          <div>
            <h3 className="font-medium mb-3 flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Actions Taken</span>
            </h3>
            
            <ScrollArea className="h-32">
              <div className="space-y-2">
                {incidentData.actionsTaken.map((action, index) => (
                  <div key={index} className="flex items-start space-x-2 text-sm">
                    <span className="text-primary font-mono mt-0.5">✓</span>
                    <span className="text-muted-foreground leading-relaxed">{action}</span>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Created: {incidentData.created}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>Updated: {incidentData.lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <User className="h-3 w-3" />
            <span>Assigned: {incidentData.assignee}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}