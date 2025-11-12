import { useState } from 'react';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarHeader
} from './components/ui/sidebar';
import { TopBar } from './components/TopBar';
import { EventLogsPanel } from './components/EventLogsPanel';
import { SIEMIntegration } from './components/SIEMIntegration';
import { EventAnalysis } from './components/EventAnalysis';
import { LLMReasoning } from './components/LLMReasoning';
import { ThreatDetection } from './components/ThreatDetection';
import { ThreatPrevention } from './components/ThreatPrevention';
import { ThreatReporting } from './components/ThreatReporting';
import { AdminFeedback } from './components/AdminFeedback';
import { 
  FileText, 
  Shield, 
  Activity, 
  Brain, 
  Search, 
  AlertTriangle, 
  Lock, 
  BarChart3,
  MessageSquare,
  Settings
} from 'lucide-react';

const navigationItems = [
  { id: 'logs', label: 'Event Logs', icon: FileText },
  { id: 'alerts', label: 'SIEM Alerts', icon: Shield },
  { id: 'analysis', label: 'Event Analysis', icon: Activity },
  { id: 'reasoning', label: 'AI Reasoning', icon: Brain },
  { id: 'detection', label: 'Threat Detection', icon: Search },
  { id: 'prevention', label: 'Threat Prevention', icon: Lock },
  { id: 'reports', label: 'Incident Reports', icon: BarChart3 },
  { id: 'feedback', label: 'Admin Feedback', icon: MessageSquare },
];

export default function App() {
  const [activeSection, setActiveSection] = useState('logs');

  const renderContent = () => {
    switch (activeSection) {
      case 'logs':
        return <EventLogsPanel />;
      case 'alerts':
        return <SIEMIntegration />;
      case 'analysis':
        return <EventAnalysis />;
      case 'reasoning':
        return <LLMReasoning />;
      case 'detection':
        return <ThreatDetection />;
      case 'prevention':
        return <ThreatPrevention />;
      case 'reports':
        return <ThreatReporting />;
      case 'feedback':
        return <AdminFeedback />;
      default:
        return <EventLogsPanel />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background dark">
        <Sidebar className="border-r border-border">
          <SidebarHeader className="border-b border-border p-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-primary">CyberWatch</h1>
                <p className="text-xs text-muted-foreground">Security Operations Center</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        isActive={activeSection === item.id}
                        className="w-full justify-start"
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t border-border p-4">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Settings className="h-3 w-3" />
              <span>CyberWatch v2.1.0</span>
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <TopBar />
          
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {navigationItems.find(item => item.id === activeSection)?.label}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Real-time cybersecurity monitoring and threat response dashboard
                </p>
              </div>
              
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}