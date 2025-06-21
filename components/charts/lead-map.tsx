import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  Graticule,
  Sphere
} from 'react-simple-maps'

// Using a reliable alternative topojson source
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"

interface MapLocation {
  id: string
  name: string
  country: string
  coordinates: [number, number] // [longitude, latitude]
  leads: number
  status: 'active' | 'pending' | 'completed'
  value: string
  pipeline: string
  lastActivity: string
  region: string
}

const colors = {
  primary: '#00E6FF',
  accent: '#7C3AED', 
  success: '#00D084',
  warning: '#FFB800',
  surface: '#0A0E1A',
  border: '#1E293B',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  mapCountry: '#374151',
  mapCountryHover: '#4B5563',
  ocean: '#111827',
  grid: '#1E293B'
}

// Enhanced location data with more realistic information
const mapLocations: MapLocation[] = [
  { 
    id: 'nyc', 
    name: 'New York', 
    country: 'USA', 
    coordinates: [-74.006, 40.7128], 
    leads: 342, 
    status: 'active', 
    value: '$2.4M',
    pipeline: '$4.8M',
    lastActivity: '2 min ago',
    region: 'Americas'
  },
  { 
    id: 'london', 
    name: 'London', 
    country: 'UK', 
    coordinates: [-0.1276, 51.5074], 
    leads: 156, 
    status: 'completed', 
    value: '$890K',
    pipeline: '$1.2M',
    lastActivity: '5 min ago',
    region: 'EMEA'
  },
  { 
    id: 'tokyo', 
    name: 'Tokyo', 
    country: 'Japan', 
    coordinates: [139.6917, 35.6895], 
    leads: 89, 
    status: 'pending', 
    value: '$1.2M',
    pipeline: '$2.1M',
    lastActivity: '12 min ago',
    region: 'APAC'
  },
  { 
    id: 'sydney', 
    name: 'Sydney', 
    country: 'Australia', 
    coordinates: [151.2093, -33.8688], 
    leads: 67, 
    status: 'active', 
    value: '$650K',
    pipeline: '$980K',
    lastActivity: '8 min ago',
    region: 'APAC'
  },
  { 
    id: 'toronto', 
    name: 'Toronto', 
    country: 'Canada', 
    coordinates: [-79.3832, 43.6532], 
    leads: 234, 
    status: 'completed', 
    value: '$1.8M',
    pipeline: '$2.5M',
    lastActivity: '1 min ago',
    region: 'Americas'
  },
  { 
    id: 'berlin', 
    name: 'Berlin', 
    country: 'Germany', 
    coordinates: [13.4050, 52.5200], 
    leads: 178, 
    status: 'active', 
    value: '$1.1M',
    pipeline: '$1.9M',
    lastActivity: '4 min ago',
    region: 'EMEA'
  }
]

const connections = [
  { from: 'nyc', to: 'london', strength: 0.9, dataFlow: 'bi-directional' },
  { from: 'london', to: 'berlin', strength: 0.7, dataFlow: 'outbound' },
  { from: 'berlin', to: 'tokyo', strength: 0.6, dataFlow: 'outbound' },
  { from: 'tokyo', to: 'sydney', strength: 0.8, dataFlow: 'bi-directional' },
  { from: 'toronto', to: 'nyc', strength: 0.85, dataFlow: 'inbound' },
  { from: 'nyc', to: 'berlin', strength: 0.75, dataFlow: 'bi-directional' }
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return colors.primary
    case 'pending': return colors.warning
    case 'completed': return colors.success
    default: return colors.textSecondary
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active': return { color: colors.primary, label: 'ACTIVE', bg: 'bg-cyan-500/20' }
    case 'pending': return { color: colors.warning, label: 'PENDING', bg: 'bg-amber-500/20' }
    case 'completed': return { color: colors.success, label: 'COMPLETED', bg: 'bg-emerald-500/20' }
    default: return { color: colors.textSecondary, label: 'UNKNOWN', bg: 'bg-gray-500/20' }
  }
}

export default function LeadMap() {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null)
  const [animationKey, setAnimationKey] = useState(0)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)
  const [geographiesCount, setGeographiesCount] = useState(0)

  useEffect(() => {
    // Update time every second for realistic feel
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Animation key for periodic effects
    const animationInterval = setInterval(() => {
      setAnimationKey(prev => prev + 1)
    }, 3000)

    // Debug log
    console.log('LeadMap component mounted')

    return () => {
      clearInterval(timeInterval)
      clearInterval(animationInterval)
    }
  }, [])

  // Get connection coordinates for lines
  const getConnectionPath = (from: string, to: string) => {
    const fromLocation = mapLocations.find(loc => loc.id === from)
    const toLocation = mapLocations.find(loc => loc.id === to)
    
    if (!fromLocation || !toLocation) return null
    
    return {
      from: fromLocation.coordinates,
      to: toLocation.coordinates
    }
  }

  const totalLeads = mapLocations.reduce((sum, loc) => sum + loc.leads, 0)
  const totalPipeline = mapLocations.reduce((sum, loc) => sum + parseFloat(loc.pipeline.replace(/[$M,K]/g, '')), 0)
  const activeRegions = mapLocations.filter(loc => loc.status === 'active').length

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      {/* Debug Info */}
      <div className="absolute top-2 right-2 z-50 text-xs text-cyan-400 bg-slate-900/80 p-2 rounded">
        <div>Map Loaded: {mapLoaded ? 'Yes' : 'No'}</div>
        <div>Geographies: {geographiesCount}</div>
        <div>Error: {mapError || 'None'}</div>
      </div>

      {/* Futuristic Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        
        {/* Animated grid pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 230, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 230, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            animation: 'gridShift 30s linear infinite'
          }}
        />
        
        {/* Secondary grid for depth */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 230, 255, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 230, 255, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
            animation: 'gridShift 15s linear infinite reverse'
          }}
        />
        
        {/* Ambient lighting effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl -translate-x-20 -translate-y-20 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl translate-x-20 translate-y-20 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-emerald-500/8 rounded-full blur-3xl -translate-x-30 -translate-y-30 animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Radar sweep effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-1/2 left-1/2 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent origin-left"
            style={{
              transform: 'translate(-50%, -50%)',
              animation: 'radarSweep 8s linear infinite'
            }}
          />
        </div>
      </div>

      {/* Subtle scanlines effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="h-full w-full" style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 230, 255, 0.1) 2px, rgba(0, 230, 255, 0.1) 4px)',
          animation: 'scanlines 2s linear infinite'
        }} />
      </div>

      {/* Header with real-time info - Responsive */}
      <motion.div 
        className="absolute top-2 left-2 md:top-4 md:left-4 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-slate-950/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 md:p-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="flex items-center gap-1 md:gap-2">
              <div className="w-2 h-2 md:w-3 md:h-3 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-cyan-400 text-xs md:text-sm font-mono font-bold">PROSPER AI</span>
            </div>
            <div className="text-slate-400 text-xs font-mono hidden sm:block">
              {currentTime.toLocaleTimeString()} UTC
            </div>
          </div>
          <div className="text-slate-300 text-xs font-mono mt-1 hidden md:block">
            Global Lead Distribution System
          </div>
        </div>
      </motion.div>

      {/* Loading indicator */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-cyan-400 text-lg font-mono">
            <div className="animate-pulse">Loading Global Map...</div>
          </div>
        </div>
      )}

      {/* Error indicator */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-red-400 text-lg font-mono bg-slate-900/80 p-4 rounded-lg">
            <div>Map Error: {mapError}</div>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="absolute inset-0 z-0">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 100,
            center: [0, 0]
          }}
          width={800}
          height={320}
          style={{
            width: "100%",
            height: "100%"
          }}
          onError={(error) => {
            console.error('Map error:', error)
            setMapError(error.toString())
          }}
        >
          {/* Map Sphere (Ocean) */}
          <Sphere 
            id="rsm-sphere"
            fill={colors.ocean}
            stroke={colors.primary}
            strokeWidth={0.3}
            strokeOpacity={0.2}
          />

          {/* Professional Graticule (Coordinate Grid) */}
          <Graticule
            fill="none"
            stroke={colors.primary}
            strokeWidth={0.3}
            strokeOpacity={0.15}
            step={[20, 10]}
            style={{
              filter: `drop-shadow(0 0 2px ${colors.primary}20)`
            }}
          />

          {/* World Countries with enhanced styling */}
          <Geographies geography={geoUrl}>
            {({ geographies }) => {
              // Debug logging
              console.log('Geographies loaded:', geographies.length)
              setGeographiesCount(geographies.length)
              
              // Set map as loaded when geographies are available
              if (geographies.length > 0 && !mapLoaded) {
                console.log('Setting map as loaded')
                setMapLoaded(true)
              }
              
              if (geographies.length === 0) {
                console.warn('No geographies loaded')
                setMapError('No geography data loaded')
              }
              
              return geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colors.mapCountry}
                  stroke={colors.primary}
                  strokeWidth={0.5}
                  strokeOpacity={0.3}
                  style={{
                    default: {
                      fill: colors.mapCountry,
                      stroke: colors.primary,
                      strokeWidth: 0.5,
                      strokeOpacity: 0.3,
                      outline: "none"
                    },
                    hover: {
                      fill: colors.mapCountryHover,
                      stroke: colors.primary,
                      strokeWidth: 1,
                      strokeOpacity: 0.8,
                      outline: "none"
                    }
                  }}
                />
              ))
            }}
          </Geographies>

          {/* Enhanced Connection Lines with Animations */}
          {connections.map((connection, index) => {
            const path = getConnectionPath(connection.from, connection.to)
            if (!path) return null

            return (
              <g key={`connection-group-${index}`}>
                {/* Base connection line */}
                <Line
                  from={path.from}
                  to={path.to}
                  stroke={colors.primary}
                  strokeWidth={1}
                  strokeOpacity={0.2}
                  strokeLinecap="round"
                />
                
                {/* Animated data flow */}
                <Line
                  from={path.from}
                  to={path.to}
                  stroke={colors.primary}
                  strokeWidth={2.5}
                  strokeOpacity={connection.strength * 0.8}
                  strokeDasharray="10,15"
                  strokeLinecap="round"
                  style={{
                    animation: `dataFlow 4s linear infinite ${index * 0.6}s`,
                    filter: `drop-shadow(0 0 4px ${colors.primary}40)`
                  }}
                />
                
                {/* Pulse effect for high-strength connections */}
                {connection.strength > 0.8 && (
                  <Line
                    from={path.from}
                    to={path.to}
                    stroke={colors.primary}
                    strokeWidth={6}
                    strokeOpacity={0.1}
                    strokeLinecap="round"
                    style={{
                      animation: `connectionGlow 3s ease-in-out infinite ${index * 0.8}s`
                    }}
                  />
                )}
                
                {/* Data packets animation */}
                <circle
                  r="2"
                  fill={colors.primary}
                  style={{
                    animation: `travelPath 5s linear infinite ${index * 1.2}s`
                  }}
                >
                  <animateMotion
                    dur={`${5 + index}s`}
                    repeatCount="indefinite"
                    begin={`${index * 1.2}s`}
                  >
                    <mpath>
                      <path d={`M ${path.from[0]} ${path.from[1]} L ${path.to[0]} ${path.to[1]}`} />
                    </mpath>
                  </animateMotion>
                </circle>
              </g>
            )
          })}

          {/* Ultra-Enhanced Location Markers */}
          {mapLocations.map((location, index) => {
            const isSelected = selectedLocation?.id === location.id
            const isHovered = hoveredLocation === location.id
            const statusColor = getStatusColor(location.status)
            
            return (
              <Marker
                key={location.id}
                coordinates={location.coordinates}
                onClick={() => setSelectedLocation(location)}
                onMouseEnter={() => setHoveredLocation(location.id)}
                onMouseLeave={() => setHoveredLocation(null)}
              >
                <g style={{ cursor: "pointer" }}>
                  {/* Outermost detection ring */}
                  <circle
                    r={isSelected || isHovered ? "35" : "30"}
                    fill={statusColor}
                    opacity="0.05"
                    style={{
                      animation: `detectionRing 4s ease-in-out infinite ${index * 0.5}s`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Secondary pulse ring */}
                  <circle
                    r={isSelected || isHovered ? "25" : "22"}
                    fill={statusColor}
                    opacity="0.1"
                    style={{
                      animation: `pulseRing 3s ease-in-out infinite ${index * 0.3 + 0.5}s`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Tertiary pulse */}
                  <circle
                    r={isSelected || isHovered ? "18" : "16"}
                    fill={statusColor}
                    opacity="0.15"
                    style={{
                      animation: `pulseRing 3s ease-in-out infinite ${index * 0.3 + 1}s`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Status indicator ring with glow */}
                  <circle
                    r={isSelected || isHovered ? "14" : "12"}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth={isSelected || isHovered ? "3" : "2.5"}
                    opacity={isSelected || isHovered ? "1" : "0.9"}
                    style={{
                      filter: `drop-shadow(0 0 12px ${statusColor}60)`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Inner status ring */}
                  <circle
                    r={isSelected || isHovered ? "10" : "8"}
                    fill="none"
                    stroke={statusColor}
                    strokeWidth="1.5"
                    opacity="0.6"
                    strokeDasharray={isSelected || isHovered ? "none" : "2,2"}
                    style={{
                      animation: isSelected || isHovered ? 'none' : `rotate 10s linear infinite`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Core marker */}
                  <circle
                    r={isSelected || isHovered ? "8" : "6"}
                    fill={statusColor}
                    style={{
                      filter: `drop-shadow(0 0 8px ${statusColor}) drop-shadow(0 0 16px ${statusColor}40)`,
                      transition: "all 0.4s ease"
                    }}
                  />
                  
                  {/* Central highlight */}
                  <circle
                    r={isSelected || isHovered ? "4" : "3"}
                    fill="#FFFFFF"
                    opacity="0.9"
                    style={{ transition: "all 0.4s ease" }}
                  />
                  
                  {/* Lead count display */}
                  <text
                    textAnchor="middle"
                    y={isSelected || isHovered ? "24" : "22"}
                    className="fill-white text-xs font-bold"
                    style={{
                      filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
                      fontSize: isSelected || isHovered ? "12px" : "11px",
                      transition: "all 0.4s ease"
                    }}
                  >
                    {location.leads}
                  </text>
                  
                  {/* Region indicator */}
                  <text
                    textAnchor="middle"
                    y={isSelected || isHovered ? "-20" : "-18"}
                    className="fill-slate-300 text-xs font-mono"
                    style={{
                      filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.8))",
                      fontSize: "8px",
                      opacity: isSelected || isHovered ? "1" : "0.7",
                      transition: "all 0.4s ease"
                    }}
                  >
                    {location.region}
                  </text>
                </g>
              </Marker>
            )
          })}
        </ComposableMap>
      </div>

      {/* Enhanced Statistics Panel */}
      <motion.div 
        className="absolute bottom-6 left-6 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="bg-slate-950/95 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6 min-w-[300px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-lg font-mono font-bold">GLOBAL ANALYTICS</span>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-slate-400 text-xs font-mono mb-2">REGIONS</div>
              <div className="text-white font-bold text-2xl">{mapLocations.length}</div>
              <div className="text-cyan-400 text-xs font-mono mt-1">ACTIVE</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400 text-xs font-mono mb-2">TOTAL LEADS</div>
              <div className="text-emerald-400 font-bold text-2xl">{totalLeads.toLocaleString()}</div>
              <div className="text-emerald-400 text-xs font-mono mt-1">IDENTIFIED</div>
            </div>
            <div className="text-center">
              <div className="text-slate-400 text-xs font-mono mb-2">PIPELINE</div>
              <div className="text-amber-400 font-bold text-2xl">${totalPipeline.toFixed(1)}M</div>
              <div className="text-amber-400 text-xs font-mono mt-1">VALUE</div>
            </div>
          </div>
          
          {/* Real-time activity indicator */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-xs font-mono">SYSTEM STATUS</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-xs font-mono">OPERATIONAL</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Status Legend */}
      <motion.div 
        className="absolute bottom-6 right-6 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <div className="bg-slate-950/95 backdrop-blur-lg border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 text-lg font-mono font-bold">STATUS MATRIX</span>
          </div>
          
          <div className="space-y-4">
            {['active', 'pending', 'completed'].map((status) => {
              const badge = getStatusBadge(status)
              const count = mapLocations.filter(loc => loc.status === status).length
              const percentage = Math.round((count / mapLocations.length) * 100)
              
              return (
                <div key={status} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: badge.color, boxShadow: `0 0 8px ${badge.color}40` }}
                      />
                      <span className="text-slate-300 text-sm font-mono uppercase font-bold">
                        {badge.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-bold text-lg">{count}</div>
                      <div className="text-slate-400 text-xs font-mono">{percentage}%</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full transition-all duration-1000"
                      style={{ 
                        backgroundColor: badge.color,
                        width: `${percentage}%`,
                        boxShadow: `0 0 6px ${badge.color}60`
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Ultra-Enhanced Location Details Panel */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -30 }}
            className="absolute top-6 right-6 z-40"
          >
            <div className="bg-slate-950/98 backdrop-blur-xl border border-cyan-500/40 rounded-2xl p-8 min-w-[350px] shadow-2xl">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-2xl">{selectedLocation.name}</h3>
                  <p className="text-slate-400 text-lg font-mono">{selectedLocation.country}</p>
                  <p className="text-cyan-400 text-sm font-mono mt-1">{selectedLocation.region} Region</p>
                </div>
                <button
                  onClick={() => setSelectedLocation(null)}
                  className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800/50 rounded-lg"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Enhanced Status Badge */}
              <div className="mb-6">
                <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full text-sm font-mono font-bold ${getStatusBadge(selectedLocation.status).bg} border border-current`}>
                  <div 
                    className="w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: getStatusColor(selectedLocation.status) }}
                  />
                  {getStatusBadge(selectedLocation.status).label}
                  <div className="text-xs opacity-75">ZONE</div>
                </div>
              </div>

              {/* Enhanced Metrics Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="text-slate-400 text-xs font-mono">ACTIVE LEADS</div>
                  <div className="text-white font-bold text-3xl">{selectedLocation.leads}</div>
                  <div className="text-cyan-400 text-xs font-mono">IDENTIFIED</div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-400 text-xs font-mono">PIPELINE VALUE</div>
                  <div className="text-amber-400 font-bold text-3xl">{selectedLocation.pipeline}</div>
                  <div className="text-amber-400 text-xs font-mono">PROJECTED</div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-400 text-xs font-mono">CLOSED DEALS</div>
                  <div className="text-emerald-400 font-bold text-3xl">{selectedLocation.value}</div>
                  <div className="text-emerald-400 text-xs font-mono">REALIZED</div>
                </div>
                <div className="space-y-2">
                  <div className="text-slate-400 text-xs font-mono">LAST ACTIVITY</div>
                  <div className="text-cyan-400 font-bold text-lg">{selectedLocation.lastActivity}</div>
                  <div className="text-cyan-400 text-xs font-mono">UPDATED</div>
                </div>
              </div>

              {/* Enhanced Progress Indicators */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-mono">CONVERSION RATE</span>
                    <span className="text-white font-mono font-bold">
                      {Math.round((parseFloat(selectedLocation.value.replace(/[$M,K]/g, '')) / parseFloat(selectedLocation.pipeline.replace(/[$M,K]/g, ''))) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 via-emerald-500 to-amber-500 h-3 rounded-full transition-all duration-2000 relative"
                      style={{ 
                        width: `${Math.round((parseFloat(selectedLocation.value.replace(/[$M,K]/g, '')) / parseFloat(selectedLocation.pipeline.replace(/[$M,K]/g, ''))) * 100)}%` 
                      }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400 font-mono">ACTIVITY LEVEL</span>
                    <span className="text-emerald-400 font-mono font-bold">HIGH</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full w-4/5 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Advanced CSS Animations */}
      <style jsx>{`
        @keyframes gridShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
        
        @keyframes radarSweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translate(-50%, -50%) rotate(360deg); opacity: 0; }
        }
        
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        
        @keyframes detectionRing {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.05; 
          }
          50% { 
            transform: scale(1.4); 
            opacity: 0.15; 
          }
        }
        
        @keyframes pulseRing {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.1; 
          }
          50% { 
            transform: scale(1.2); 
            opacity: 0.25; 
          }
        }
        
        @keyframes dataFlow {
          0% { stroke-dashoffset: 0; opacity: 0.8; }
          100% { stroke-dashoffset: -25; opacity: 0.3; }
        }
        
        @keyframes connectionGlow {
          0%, 100% { 
            stroke-width: 4; 
            opacity: 0.1; 
          }
          50% { 
            stroke-width: 8; 
            opacity: 0.3; 
          }
        }
        
        @keyframes travelPath {
          0% { opacity: 0; transform: scale(0.5); }
          10% { opacity: 1; transform: scale(1); }
          90% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
