import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Filter, Server, Clock, Play, Pause } from 'lucide-react';
import { Button } from './ui/button';

const mockLogs = [
  {
    id: 1,
    timestamp: '2024-12-19 15:42:33',
    server: 'web-01',
    type: 'Authentication',
    level: 'INFO',
    message: 'Successful login from user: deepgurav2329@gmail.com',
    source: '192.168.1.105'
  },
  {
    id: 2,
    timestamp: '2024-12-19 15:42:28',
    server: 'db-02',
    type: 'System',
    level: 'WARNING',
    message: 'High CPU usage detected: 89%',
    source: '192.168.1.202'
  },
  {
    id: 3,
    timestamp: '2024-12-19 15:42:25',
    server: 'web-01',
    type: 'Authentication',
    level: 'ERROR',
    message: 'Failed login attempt for user: admin',
    source: '10.0.0.45'
  },
  {
    id: 4,
    timestamp: '2024-12-19 15:42:20',
    server: 'app-03',
    type: 'Application',
    level: 'INFO',
    message: 'Application started successfully',
    source: '192.168.1.103'
  },
  {
    id: 5,
    timestamp: '2024-12-19 15:42:15',
    server: 'fw-01',
    type: 'Network',
    level: 'WARNING',
    message: 'Suspicious traffic pattern detected from external IP',
    source: '203.0.113.42'
  }
];

const logLevelColors = {
  INFO: 'bg-blue-400/20 text-blue-400 border-blue-400/30',
  WARNING: 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30',
  ERROR: 'bg-red-400/20 text-red-400 border-red-400/30',
  DEBUG: 'bg-gray-400/20 text-gray-400 border-gray-400/30'
};

export function EventLogsPanel() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [selectedServer, setSelectedServer] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="h-5 w-5 text-primary" />
            <CardTitle>Event Logs</CardTitle>
            <div className="flex items-center space-x-1">
              <div className={`h-2 w-2 rounded-full ${isStreaming ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
              <span className="text-xs text-muted-foreground">
                {isStreaming ? 'Live' : 'Paused'}
              </span>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsStreaming(!isStreaming)}
            className="text-primary hover:text-primary/80"
          >
            {isStreaming ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedServer} onValueChange={setSelectedServer}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Server" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Servers</SelectItem>
                <SelectItem value="web-01">web-01</SelectItem>
                <SelectItem value="db-02">db-02</SelectItem>
                <SelectItem value="app-03">app-03</SelectItem>
                <SelectItem value="fw-01">fw-01</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Log Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="authentication">Authentication</SelectItem>
              <SelectItem value="application">Application</SelectItem>
              <SelectItem value="network">Network</SelectItem>
            </SelectContent>
          </Select>
          
          <Input placeholder="Search logs..." className="max-w-xs" />
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ScrollArea className="h-80">
          <div className="space-y-2">
            {mockLogs.map((log) => (
              <div 
                key={log.id} 
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border border-border/50"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground min-w-0">
                    <Clock className="h-3 w-3 flex-shrink-0" />
                    <span className="font-mono">{log.timestamp}</span>
                  </div>
                  
                  <Badge variant="outline" className="text-xs">
                    {log.server}
                  </Badge>
                  
                  <Badge variant="outline" className="text-xs">
                    {log.type}
                  </Badge>
                  
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${logLevelColors[log.level as keyof typeof logLevelColors]}`}
                  >
                    {log.level}
                  </Badge>
                </div>
                
                <div className="flex-1 mx-4">
                  <p className="text-sm text-foreground truncate">{log.message}</p>
                  <p className="text-xs text-muted-foreground font-mono">{log.source}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}