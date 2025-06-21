"use client"

import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { 
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { 
  BarChart3, 
  Users, 
  Zap, 
  Target, 
  Globe,
  MessageSquare,
  TrendingUp,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter,
  Plus,
  Mail,
  Eye,
  AlertCircle,
  Home,
  Activity,
  Database,
  Shield,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Dot,
  ChevronRight,
  User,
  Phone,
  Clock,
  PlayCircle,
  Pause,
  MoreHorizontal
} from "lucide-react"
import LeadMap from "@/components/charts/lead-map"

// Modern premium color palette
const colors = {
  background: '#0A0B0D',
  surfaceLight: '#161B22',
  surface: '#21262D', 
  surfaceDark: '#0D1117',
  primary: '#00D9FF',
  primaryDark: '#0099CC',
  accent: '#7C3AED',
  accentLight: '#8B5CF6',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  textPrimary: '#FFFFFF',
  textSecondary: '#8B949E',
  textMuted: '#6B7280',
  border: '#30363D',
  borderLight: '#484F58'
}

// Chart data with more realistic numbers
const trendData = [
  { name: '29 Oct', messages: 156, replies: 42, meetings: 8, conversion: 27 },
  { name: '30 Oct', messages: 189, replies: 67, meetings: 15, conversion: 35 },
  { name: '31 Oct', messages: 134, replies: 38, meetings: 9, conversion: 28 },
  { name: '1 Nov', messages: 234, replies: 89, meetings: 23, conversion: 38 },
  { name: '2 Nov', messages: 287, replies: 124, meetings: 31, conversion: 43 },
  { name: '3 Nov', messages: 198, replies: 76, meetings: 18, conversion: 38 },
  { name: '4 Nov', messages: 312, replies: 142, meetings: 38, conversion: 46 },
  { name: '5 Nov', messages: 267, replies: 98, meetings: 24, conversion: 37 },
  { name: '6 Nov', messages: 345, replies: 156, meetings: 42, conversion: 45 }
]

const performanceData = [
  { name: 'LinkedIn Outreach', value: 52, color: colors.primary },
  { name: 'Email Campaigns', value: 28, color: colors.accent },
  { name: 'Referrals', value: 15, color: colors.success },
  { name: 'Intent Data', value: 5, color: colors.warning }
]

const riskData = [
  { name: 'Week 1', high: 12, medium: 35, low: 53 },
  { name: 'Week 2', high: 18, medium: 42, low: 40 },
  { name: 'Week 3', high: 8, medium: 38, low: 54 },
  { name: 'Week 4', high: 15, medium: 33, low: 52 }
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div 
        className="rounded-xl border p-4 shadow-2xl backdrop-blur-xl" 
        style={{ 
          backgroundColor: `${colors.surface}F0`,
          borderColor: colors.border,
          backdropFilter: 'blur(20px)'
        }}
      >
        <p className="text-sm font-semibold mb-2" style={{ color: colors.textPrimary }}>{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div 
              className="w-2 h-2 rounded-full" 
              style={{ backgroundColor: entry.color }}
            ></div>
            <span style={{ color: colors.textSecondary }}>
              {entry.dataKey}: <span style={{ color: colors.textPrimary, fontWeight: '600' }}>{entry.value}</span>
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

function AppSidebar() {
  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r-0 sidebar-override"
      style={{ 
        backgroundColor: `${colors.surfaceDark} !important`,
        borderRight: `1px solid ${colors.border}`,
        minHeight: '100vh'
      }}
    >
      <SidebarHeader 
        className="p-6 border-b group-data-[collapsible=icon]:p-4" 
        style={{ 
          borderColor: colors.border,
          backgroundColor: 'transparent'
        }}
      >
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center relative overflow-hidden group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8"
            style={{ 
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`,
              boxShadow: `0 8px 32px ${colors.primary}30`
            }}
          >
            <Zap className="w-5 h-5 text-white group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="text-xl font-bold" style={{ color: colors.textPrimary }}>
              Prospera AI
            </h2>
            <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
              LinkedIn AI SDR Platform
            </p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent 
        className="px-4 py-6 group-data-[collapsible=icon]:px-2" 
        style={{ backgroundColor: 'transparent' }}
      >
        <SidebarMenu className="space-y-2 group-data-[collapsible=icon]:space-y-3">
          {[
            { icon: Home, label: 'Dashboard', active: true, badge: null },
            { icon: Users, label: 'Leads', active: false, badge: '2.4k' },
            { icon: MessageSquare, label: 'Campaigns', active: false, badge: '18' },
            { icon: BarChart3, label: 'Analytics', active: false, badge: null },
            { icon: Target, label: 'Intent Data', active: false, badge: '156' },
            { icon: Calendar, label: 'Meetings', active: false, badge: '42' },
            { icon: Database, label: 'CRM Sync', active: false, badge: null },
            { icon: Shield, label: 'Security', active: false, badge: null },
          ].map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton 
                className="h-12 px-4 rounded-2xl transition-all duration-300 group hover:scale-105 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center"
                style={{
                  backgroundColor: item.active ? `${colors.primary}20` : 'transparent',
                  color: item.active ? colors.primary : colors.textSecondary,
                  border: item.active ? `1px solid ${colors.primary}40` : '1px solid transparent',
                  boxShadow: item.active ? `0 4px 20px ${colors.primary}30` : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.backgroundColor = `${colors.surface}80`
                    e.currentTarget.style.color = colors.textPrimary
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = colors.textSecondary
                  }
                }}
                tooltip={item.label}
              >
                <item.icon className="w-5 h-5 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4" />
                <span className="font-medium group-data-[collapsible=icon]:hidden">{item.label}</span>
                {item.badge && (
                  <span 
                    className="ml-auto text-xs px-2.5 py-1.5 rounded-xl font-bold group-data-[collapsible=icon]:hidden"
                    style={{ 
                      backgroundColor: item.active ? colors.primary : `${colors.surface}80`,
                      color: item.active ? colors.surfaceDark : colors.textPrimary,
                      boxShadow: item.active ? `0 2px 10px ${colors.primary}40` : 'none'
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <Separator className="my-6" style={{ backgroundColor: colors.border }} />
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="h-12 px-4 rounded-2xl transition-all duration-300 hover:scale-105 group-data-[collapsible=icon]:h-10 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center" 
              style={{ 
                color: colors.textSecondary,
                backgroundColor: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.surface}80`
                e.currentTarget.style.color = colors.textPrimary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = colors.textSecondary
              }}
              tooltip="Settings"
            >
              <Settings className="w-5 h-5 group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4" />
              <span className="font-medium group-data-[collapsible=icon]:hidden">Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter 
        className="p-6 border-t group-data-[collapsible=icon]:p-4" 
        style={{ 
          borderColor: colors.border,
          backgroundColor: 'transparent'
        }}
      >
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center p-3 rounded-2xl transition-all duration-300 hover:scale-105 group-data-[collapsible=icon]:p-2" style={{ backgroundColor: `${colors.surface}60` }}>
          <div 
            className="w-10 h-10 rounded-2xl flex items-center justify-center group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8" 
            style={{ 
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.success} 100%)`,
              boxShadow: `0 4px 20px ${colors.accent}40`
            }}
          >
            <User className="w-5 h-5 text-white group-data-[collapsible=icon]:w-4 group-data-[collapsible=icon]:h-4" />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-bold" style={{ color: colors.textPrimary }}>Admin User</p>
            <p className="text-xs font-medium" style={{ color: colors.textSecondary }}>admin@prospera.ai</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function Dashboard() {
  return (
    <SidebarProvider defaultOpen={false}>
      <style jsx global>{`
        [data-sidebar] {
          background-color: ${colors.surfaceDark} !important;
          border-color: ${colors.border} !important;
        }
        [data-sidebar] * {
          border-color: ${colors.border} !important;
        }
        [data-sidebar-header], [data-sidebar-content], [data-sidebar-footer] {
          background-color: transparent !important;
        }
        [data-sidebar-menu-button] {
          background-color: transparent !important;
        }
        .sidebar-override {
          background: ${colors.surfaceDark} !important;
          border-right: 1px solid ${colors.border} !important;
        }
      `}</style>
      <div 
        className="flex h-screen w-full" 
        style={{ 
          backgroundColor: colors.background,
          backgroundImage: `radial-gradient(circle at 20% 80%, ${colors.primary}15 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${colors.accent}15 0%, transparent 50%)`
        }}
      >
        <AppSidebar />
        
        <main className="flex-1 overflow-auto min-w-0">
          {/* Modern Header */}
          <header 
            className="sticky top-0 z-50 border-b px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6"
            style={{ 
              backgroundColor: `${colors.surface}F0`,
              backdropFilter: 'blur(20px)',
              borderColor: colors.border
            }}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <SidebarTrigger 
                  className="p-2 rounded-lg transition-all duration-200 flex-shrink-0"
                  style={{ 
                    color: colors.textSecondary,
                    backgroundColor: `${colors.border}40`,
                    border: `1px solid ${colors.border}`
                  }} 
                />
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold truncate" style={{ color: colors.textPrimary }}>
                    AI SDR Analytics
                  </h1>
                  <p className="text-xs md:text-sm font-medium text-gray-400 hidden sm:block" style={{ color: colors.textSecondary }}>
                    Real-time performance monitoring & insights
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative hidden md:block">
                  <Search className="w-4 h-4 absolute left-4 top-1/2 transform -translate-y-1/2 z-10" style={{ color: colors.textMuted }} />
                  <Input 
                    placeholder="Search campaigns, leads, locations..."
                    className="pl-12 pr-4 w-48 lg:w-64 xl:w-80 h-11 border-0 text-sm rounded-xl transition-all duration-300 focus:w-72 lg:focus:w-80 xl:focus:w-96"
                    style={{ 
                      backgroundColor: `${colors.surface}90`,
                      color: colors.textPrimary,
                      backdropFilter: 'blur(20px)',
                      border: `1px solid ${colors.border}60`,
                      boxShadow: `0 4px 20px ${colors.surfaceDark}40`,
                    }}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
                    style={{ 
                      background: `linear-gradient(90deg, transparent 0%, ${colors.primary}10 50%, transparent 100%)` 
                    }}
                  ></div>
                </div>
                <Button 
                  size="sm" 
                  className="relative h-10 px-3 rounded-xl md:hidden" 
                  style={{ 
                    backgroundColor: `${colors.surface}80`,
                    color: colors.textSecondary,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  className="relative h-10 px-3 rounded-xl" 
                  style={{ 
                    backgroundColor: `${colors.surface}80`,
                    color: colors.textSecondary,
                    border: `1px solid ${colors.border}`
                  }}
                >
                  <Bell className="w-4 h-4" />
                  <span 
                    className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse" 
                    style={{ backgroundColor: colors.danger }}
                  ></span>
                </Button>
                <Button 
                  size="sm" 
                  className="h-10 px-3 lg:px-4 rounded-xl hidden sm:flex"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`
                  }}
                >
                  <Plus className="w-4 h-4 lg:mr-2" />
                  <span className="hidden lg:inline">New Campaign</span>
                </Button>
                <Button 
                  size="sm" 
                  className="h-10 px-3 rounded-xl sm:hidden"
                  style={{ 
                    backgroundColor: `${colors.primary}20`,
                    color: colors.primary,
                    border: `1px solid ${colors.primary}40`
                  }}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          <div className="p-3 sm:p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 lg:space-y-8">
            {/* Enhanced Stats Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              {[
                { 
                  title: '2,847', 
                  subtitle: 'Messages Sent Today', 
                  change: '+23.5%',
                  trend: true,
                  icon: MessageSquare,
                  color: colors.primary,
                  bgGradient: `linear-gradient(135deg, ${colors.primary}20 0%, ${colors.primary}05 100%)`
                },
                { 
                  title: '1,156', 
                  subtitle: 'Replies Received', 
                  change: '+18.2%',
                  trend: true,
                  icon: Mail,
                  color: colors.accent,
                  bgGradient: `linear-gradient(135deg, ${colors.accent}20 0%, ${colors.accent}05 100%)`
                },
                { 
                  title: '342', 
                  subtitle: 'Meetings Booked', 
                  change: '+24.7%',
                  trend: true,
                  icon: Calendar,
                  color: colors.success,
                  bgGradient: `linear-gradient(135deg, ${colors.success}20 0%, ${colors.success}05 100%)`
                },
                { 
                  title: '89.2%', 
                  subtitle: 'Response Rate', 
                  change: '+5.1%',
                  trend: true,
                  icon: Target,
                  color: colors.warning,
                  bgGradient: `linear-gradient(135deg, ${colors.warning}20 0%, ${colors.warning}05 100%)`
                }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className="border-0 rounded-2xl backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group" 
                    style={{ 
                      backgroundColor: colors.surface,
                      borderColor: colors.border,
                      backgroundImage: stat.bgGradient,
                      boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                    }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                          style={{ 
                            backgroundColor: `${stat.color}20`,
                            boxShadow: `0 4px 20px ${stat.color}30`
                          }}
                        >
                          <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                        </div>
                        <div 
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg font-semibold"
                          style={{ 
                            backgroundColor: `${colors.success}20`, 
                            color: colors.success 
                          }}
                        >
                          <ArrowUpRight className="w-3 h-3" />
                          {stat.change}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold mb-1" style={{ color: colors.textPrimary }}>
                          {stat.title}
                        </h3>
                        <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                          {stat.subtitle}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Advanced Trend Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="xl:col-span-2"
              >
                <Card 
                  className="border-0 h-[400px] md:h-[480px] rounded-2xl backdrop-blur-sm" 
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                  }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                          Performance Analytics
                        </CardTitle>
                        <p className="text-sm font-medium mt-1" style={{ color: colors.textSecondary }}>
                          Daily engagement metrics & conversion trends
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.primary }}></div>
                          <span style={{ color: colors.textSecondary }}>Messages</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.accent }}></div>
                          <span style={{ color: colors.textSecondary }}>Replies</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.success }}></div>
                          <span style={{ color: colors.textSecondary }}>Meetings</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <AreaChart data={trendData} margin={{ top: 20, right: 10, left: 0, bottom: 5 }}>
                        <defs>
                          <linearGradient id="messagesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.primary} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={colors.primary} stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="repliesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.accent} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={colors.accent} stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="meetingsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={colors.success} stopOpacity={0.8}/>
                            <stop offset="95%" stopColor={colors.success} stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 500 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                          type="monotone"
                          dataKey="messages"
                          stroke={colors.primary}
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#messagesGradient)"
                        />
                        <Area
                          type="monotone"
                          dataKey="replies"
                          stroke={colors.accent}
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#repliesGradient)"
                        />
                        <Area
                          type="monotone"
                          dataKey="meetings"
                          stroke={colors.success}
                          strokeWidth={3}
                          fillOpacity={1}
                          fill="url(#meetingsGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Pie Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card 
                  className="border-0 rounded-2xl backdrop-blur-sm" 
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                  }}
                >
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg md:text-xl font-bold" style={{ color: colors.textPrimary }}>
                      Lead Sources
                    </CardTitle>
                    <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                      Distribution by acquisition channel
                    </p>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={performanceData}
                          cx="50%"
                          cy="50%"
                          outerRadius={65}
                          innerRadius={35}
                          paddingAngle={3}
                          dataKey="value"
                        >
                          {performanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="space-y-2 mt-4">
                      {performanceData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 hover:scale-[1.02]" style={{ backgroundColor: `${colors.surfaceLight}80` }}>
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            <div 
                              className="w-4 h-4 rounded-full flex-shrink-0" 
                              style={{ 
                                backgroundColor: item.color,
                                boxShadow: `0 0 10px ${item.color}40`
                              }}
                            ></div>
                            <span className="text-sm font-medium truncate" style={{ color: colors.textSecondary }}>{item.name}</span>
                          </div>
                          <span className="text-sm font-bold flex-shrink-0 ml-2" style={{ color: colors.textPrimary }}>{item.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Enhanced Bottom Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {/* Interactive Lead Map */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="xl:col-span-2"
              >
                <Card 
                  className="border-0 rounded-2xl backdrop-blur-sm h-[400px] md:h-[480px]" 
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                          Global Lead Distribution
                        </CardTitle>
                        <p className="text-sm font-medium mt-1" style={{ color: colors.textSecondary }}>
                          Real-time outreach activity across regions
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-3 rounded-lg"
                        style={{ 
                          borderColor: colors.border,
                          color: colors.textSecondary,
                          backgroundColor: 'transparent'
                        }}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        View All
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0 h-[320px] md:h-[380px]">
                    <LeadMap />
                  </CardContent>
                </Card>
              </motion.div>

              {/* Modern Risk Analysis */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card 
                  className="border-0 rounded-2xl backdrop-blur-sm" 
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                          Campaign Health Score
                        </CardTitle>
                        <p className="text-sm font-medium mt-1" style={{ color: colors.textSecondary }}>
                          Weekly performance assessment
                        </p>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.danger }}></div>
                          <span style={{ color: colors.textSecondary }}>High Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.warning }}></div>
                          <span style={{ color: colors.textSecondary }}>Medium</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.success }}></div>
                          <span style={{ color: colors.textSecondary }}>Low Risk</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={riskData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 500 }}
                        />
                        <YAxis 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: colors.textSecondary, fontSize: 12, fontWeight: 500 }}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="high" stackId="a" fill={colors.danger} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="medium" stackId="a" fill={colors.warning} radius={[0, 0, 0, 0]} />
                        <Bar dataKey="low" stackId="a" fill={colors.success} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Enhanced Activity Feed */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card 
                  className="border-0 rounded-2xl backdrop-blur-sm" 
                  style={{ 
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    boxShadow: `0 8px 32px ${colors.surfaceDark}80`
                  }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold" style={{ color: colors.textPrimary }}>
                          Live Activity Stream
                        </CardTitle>
                        <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                          Real-time system events & notifications
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-3 rounded-lg"
                        style={{ 
                          borderColor: colors.border,
                          color: colors.textSecondary,
                          backgroundColor: 'transparent'
                        }}
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        icon: Phone,
                        title: 'High-value meeting confirmed',
                        description: 'Sarah Wilson - Enterprise SaaS CEO • $50k potential',
                        time: '2 min ago',
                        type: 'success'
                      },
                      {
                        icon: Mail,
                        title: 'Premium lead responded',
                        description: 'John Smith from TechCorp • Fortune 500 company',
                        time: '8 min ago',
                        type: 'success'
                      },
                      {
                        icon: Target,
                        title: 'Intent signals detected',
                        description: '23 new high-intent prospects identified',
                        time: '12 min ago',
                        type: 'info'
                      },
                      {
                        icon: AlertCircle,
                        title: 'Rate limit approaching',
                        description: '85% of daily LinkedIn quota used',
                        time: '25 min ago',
                        type: 'warning'
                      },
                      {
                        icon: PlayCircle,
                        title: 'Campaign launched',
                        description: 'Enterprise outreach sequence activated',
                        time: '1h ago',
                        type: 'info'
                      }
                    ].map((activity, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer" 
                        style={{ 
                          backgroundColor: `${colors.surfaceLight}60`,
                          border: `1px solid ${colors.border}40`
                        }}
                      >
                        <div 
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: activity.type === 'success' ? `${colors.success}20` :
                                           activity.type === 'warning' ? `${colors.warning}20` : `${colors.primary}20`,
                            boxShadow: activity.type === 'success' ? `0 4px 20px ${colors.success}30` :
                                      activity.type === 'warning' ? `0 4px 20px ${colors.warning}30` : `0 4px 20px ${colors.primary}30`
                          }}
                        >
                          <activity.icon 
                            className="w-5 h-5"
                            style={{
                              color: activity.type === 'success' ? colors.success :
                                     activity.type === 'warning' ? colors.warning : colors.primary
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold mb-1" style={{ color: colors.textPrimary }}>
                            {activity.title}
                          </p>
                          <p className="text-xs mb-2" style={{ color: colors.textSecondary }}>
                            {activity.description}
                          </p>
                          <p className="text-xs font-medium" style={{ color: colors.textMuted }}>
                            {activity.time}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
} 