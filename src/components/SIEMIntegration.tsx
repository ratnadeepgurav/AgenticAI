import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Shield, Wifi, WifiOff, Clock, MapPin } from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    timestamp: '2024-12-19 15:43:12',
    sourceIP: '203.0.113.42',
    eventType: 'Brute Force Attack',
    severity: 'High',
    description: 'Multiple failed login attempts detected',
    geoLocation: 'India'
  },
  {
    id: 2,
    timestamp: '2024-12-19 15:41:55',
    sourceIP: '192.168.1.105',
    eventType: 'Privilege Escalation',
    severity: 'Medium',
    description: 'Unauthorized sudo access attempt',
    geoLocation: 'India'
  },
  {
    id: 3,
    timestamp: '2024-12-19 15:40:33',
    sourceIP: '10.0.0.45',
    eventType: 'Malware Detection',
    severity: 'High',
    description: 'Suspicious file execution detected',
    geoLocation: 'India'
  },
  {
    id: 4,
    timestamp: '2024-12-19 15:39:18',
    sourceIP: '198.51.100.27',
    eventType: 'DDoS Attempt',
    severity: 'Critical',
    description: 'High volume of requests from single source',
    geoLocation: 'India'
  },
  {
    id: 5,
    timestamp: '2024-12-19 15:38:44',
    sourceIP: '172.16.0.89',
    eventType: 'Data Exfiltration',
    severity: 'Medium',
    description: 'Unusual outbound data transfer patterns',
    geoLocation: 'India'
  }
];

const severityColors = {
  Critical: 'bg-red-600/20 text-red-400 border-red-400/30',
  High: 'bg-red-500/20 text-red-400 border-red-400/30',
  Medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30',
  Low: 'bg-blue-500/20 text-blue-400 border-blue-400/30'
};

export function SIEMIntegration() {
  const isOnline = true;

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <CardTitle>SIEM Integration (Wazuh)</CardTitle>
          </div>
          
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Wifi className="h-4 w-4 text-green-400" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-400" />
            )}
            <Badge 
              variant="outline" 
              className={isOnline 
                ? 'bg-green-400/20 text-green-400 border-green-400/30' 
                : 'bg-red-400/20 text-red-400 border-red-400/30'
              }
            >
              {isOnline ? 'Online' : 'Offline'}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ScrollArea className="h-80">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground">Timestamp</TableHead>
                <TableHead className="text-muted-foreground">Source IP</TableHead>
                <TableHead className="text-muted-foreground">Event Type</TableHead>
                <TableHead className="text-muted-foreground">Severity</TableHead>
                <TableHead className="text-muted-foreground">Location</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockAlerts.map((alert) => (
                <TableRow key={alert.id} className="border-border/50 hover:bg-muted/20">
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm text-primary">
                    {alert.sourceIP}
                  </TableCell>
                  <TableCell className="text-sm">
                    {alert.eventType}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${severityColors[alert.severity as keyof typeof severityColors]}`}
                    >
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3" />
                      <span>{alert.geoLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-xs truncate">
                    {alert.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}