import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { AlertTriangle, Shield, Ban, X, Lock, Bell, Play, Pause } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

const preventionActions = [
  {
    id: 1,
    name: 'Block Source IPs',
    description: 'Block all traffic from identified malicious IP addresses',
    severity: 'High',
    autoExecute: true,
    target: '203.0.113.42, 198.51.100.27',
    estimatedImpact: 'Low',
    status: 'Ready'
  },
  {
    id: 2, 
    name: 'Kill Suspicious Processes',
    description: 'Terminate processes showing malicious behavior patterns',
    severity: 'Critical',
    autoExecute: false,
    target: 'PID 4521, 4522 on web-01',
    estimatedImpact: 'Medium',
    status: 'Pending'
  },
  {
    id: 3,
    name: 'Quarantine Affected Host',
    description: 'Isolate compromised system from network',
    severity: 'High',
    autoExecute: false,
    target: 'web-01.company.local',
    estimatedImpact: 'High',
    status: 'Ready'
  },
  {
    id: 4,
    name: 'Notify Security Team',
    description: 'Send immediate alert to on-call security personnel',
    severity: 'Medium',
    autoExecute: true,
    target: 'SOC Team, CISO',
    estimatedImpact: 'None',
    status: 'Executed'
  },
  {
    id: 5,
    name: 'Disable User Accounts',
    description: 'Temporarily disable compromised user accounts',
    severity: 'High',
    autoExecute: false,
    target: 'admin, administrator',
    estimatedImpact: 'Medium',
    status: 'Ready'
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical': return 'bg-red-600/20 text-red-400 border-red-400/30';
    case 'high': return 'bg-red-500/20 text-red-400 border-red-400/30';
    case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
    case 'low': return 'bg-green-500/20 text-green-400 border-green-400/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
  }
};

const getImpactColor = (impact: string) => {
  switch (impact.toLowerCase()) {
    case 'high': return 'text-red-400';
    case 'medium': return 'text-yellow-400'; 
    case 'low': return 'text-green-400';
    case 'none': return 'text-gray-400';
    default: return 'text-gray-400';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'ready': return <Play className="h-4 w-4 text-green-400" />;
    case 'pending': return <Pause className="h-4 w-4 text-yellow-400" />;
    case 'executed': return <Shield className="h-4 w-4 text-blue-400" />;
    default: return <AlertTriangle className="h-4 w-4 text-gray-400" />;
  }
};

export function ThreatPrevention() {
  const [actions, setActions] = useState(preventionActions);
  const [autoMode, setAutoMode] = useState(true);

  const executeAction = (actionId: number) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: 'Executed' }
        : action
    ));
  };

  const toggleAutoExecute = (actionId: number) => {
    setActions(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, autoExecute: !action.autoExecute }
        : action
    ));
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>Threat Prevention Engine</CardTitle>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Auto Mode:</span>
              <Switch 
                checked={autoMode} 
                onCheckedChange={setAutoMode}
              />
            </div>
            
            <Badge 
              variant="outline" 
              className={autoMode 
                ? 'bg-green-400/20 text-green-400 border-green-400/30' 
                : 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30'
              }
            >
              {autoMode ? 'Automated' : 'Manual'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!autoMode && (
          <Alert className="border-yellow-400/30 bg-yellow-400/10">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <AlertDescription className="text-yellow-400">
              Automatic prevention is disabled. Manual approval required for all actions.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {actions.map((action) => (
            <div key={action.id} className="p-4 rounded-lg bg-muted/20 border border-border/30">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(action.status)}
                  <h4 className="font-medium">{action.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={getSeverityColor(action.severity)}
                  >
                    {action.severity}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-muted-foreground">Auto:</span>
                    <Switch 
                      checked={action.autoExecute} 
                      onCheckedChange={() => toggleAutoExecute(action.id)}
                      size="sm"
                    />
                  </div>
                  
                  {action.status === 'Ready' && (
                    <Button 
                      size="sm" 
                      onClick={() => executeAction(action.id)}
                      className="bg-primary hover:bg-primary/80"
                    >
                      Execute
                    </Button>
                  )}
                  
                  {action.status === 'Executed' && (
                    <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400/30">
                      Completed
                    </Badge>
                  )}
                  
                  {action.status === 'Pending' && (
                    <Badge variant="outline" className="bg-yellow-400/20 text-yellow-400 border-yellow-400/30">
                      Waiting
                    </Badge>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {action.description}
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-muted-foreground">Target:</span>
                  <div className="font-mono text-primary mt-1">{action.target}</div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Impact:</span>
                  <div className={`font-medium mt-1 ${getImpactColor(action.estimatedImpact)}`}>
                    {action.estimatedImpact}
                  </div>
                </div>
                
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <div className="font-medium mt-1">{action.status}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/50">
          <div className="grid grid-cols-4 gap-4 text-center text-sm">
            <div>
              <div className="text-green-400 font-bold">
                {actions.filter(a => a.status === 'Executed').length}
              </div>
              <div className="text-muted-foreground text-xs">Executed</div>
            </div>
            
            <div>
              <div className="text-yellow-400 font-bold">
                {actions.filter(a => a.status === 'Pending').length}
              </div>
              <div className="text-muted-foreground text-xs">Pending</div>
            </div>
            
            <div>
              <div className="text-blue-400 font-bold">
                {actions.filter(a => a.status === 'Ready').length}
              </div>
              <div className="text-muted-foreground text-xs">Ready</div>
            </div>
            
            <div>
              <div className="text-primary font-bold">
                {actions.filter(a => a.autoExecute).length}
              </div>
              <div className="text-muted-foreground text-xs">Auto-enabled</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}