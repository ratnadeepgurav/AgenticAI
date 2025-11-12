import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Globe, User, Terminal, MapPin, Clock } from 'lucide-react';

const sessionData = [
  {
    id: 1,
    ip: '203.0.113.42',
    failedLogins: 15,
    binariesExecuted: 3,
    country: 'India',
    city: 'UP',
    lastActivity: '15:43:12',
    riskScore: 95
  },
  {
    id: 2,
    ip: '198.51.100.27',
    failedLogins: 8,
    binariesExecuted: 0,
    country: 'India',
    city: 'MP',
    lastActivity: '15:39:18',
    riskScore: 78
  },
  {
    id: 3,
    ip: '172.16.0.89',
    failedLogins: 2,
    binariesExecuted: 12,
    country: 'India',
    city: 'MH',
    lastActivity: '15:38:44',
    riskScore: 62
  }
];

const loginFailureData = [
  { time: '15:35', failures: 2 },
  { time: '15:40', failures: 8 },
  { time: '15:45', failures: 15 },
  { time: '15:50', failures: 12 },
  { time: '15:55', failures: 6 },
  { time: '16:00', failures: 3 },
];

const portUsageData = [
  { port: '22', connections: 45, label: 'SSH' },
  { port: '80', connections: 234, label: 'HTTP' },
  { port: '443', connections: 189, label: 'HTTPS' },
  { port: '3389', connections: 12, label: 'RDP' },
  { port: '8080', connections: 67, label: 'Proxy' },
  { port: '9999', connections: 8, label: 'Unknown' },
];

const getRiskColor = (score: number) => {
  if (score >= 80) return 'bg-red-500/20 text-red-400 border-red-400/30';
  if (score >= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30';
  return 'bg-green-500/20 text-green-400 border-green-400/30';
};

export function EventAnalysis() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-primary" />
            <CardTitle>Session Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {sessionData.map((session) => (
              <div key={session.id} className="p-4 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="font-mono text-primary">{session.ip}</span>
                    <Badge variant="outline" className={getRiskColor(session.riskScore)}>
                      Risk: {session.riskScore}%
                    </Badge>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{session.lastActivity}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-red-400" />
                    <span className="text-muted-foreground">Failed Logins:</span>
                    <span className="text-red-400 font-medium">{session.failedLogins}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Terminal className="h-4 w-4 text-yellow-400" />
                    <span className="text-muted-foreground">Binaries:</span>
                    <span className="text-yellow-400 font-medium">{session.binariesExecuted}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-blue-400" />
                    <span className="text-muted-foreground">Location:</span>
                    <span className="text-blue-400 font-medium">{session.country}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-purple-400" />
                    <span className="text-muted-foreground">City:</span>
                    <span className="text-purple-400 font-medium">{session.city}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Failed Logins (5min intervals)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={loginFailureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis 
                  dataKey="time" 
                  stroke="#8892b0" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#8892b0" 
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#001122', 
                    border: '1px solid #2d3748',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="failures" 
                  stroke="#ff073a" 
                  strokeWidth={2}
                  dot={{ fill: '#ff073a', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Unusual Port Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={portUsageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
                <XAxis 
                  dataKey="port" 
                  stroke="#8892b0" 
                  fontSize={12}
                />
                <YAxis 
                  stroke="#8892b0" 
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#001122', 
                    border: '1px solid #2d3748',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="connections" 
                  fill="#00f5ff"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}