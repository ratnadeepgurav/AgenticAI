import { Search, Bell, User, Activity, Wifi, Shield, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export function TopBar() {
  return (
    <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-primary">CyberWatch</h1>
        </div>
        
        <div className="flex items-center space-x-3 ml-8">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-green-400" />
            <span className="text-sm text-foreground">System Health: </span>
            <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
              Operational
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-primary" />
            <span className="text-sm text-foreground">API Status: </span>
            <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
              Connected
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-foreground">Active Threats: </span>
            <Badge variant="destructive" className="bg-destructive/20 text-destructive border-destructive/30">
              3
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search events, IPs, threats..." 
            className="pl-10 bg-muted/50 border-border"
          />
        </div>
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-destructive-foreground text-xs">
            7
          </Badge>
        </Button>
        
        <Avatar className="h-8 w-8">
          <AvatarImage src="/avatar.png" />
          <AvatarFallback className="bg-primary text-primary-foreground">SA</AvatarFallback>
        </Avatar>
        
        <span className="text-sm text-muted-foreground">Security Admin</span>
      </div>
    </div>
  );
}