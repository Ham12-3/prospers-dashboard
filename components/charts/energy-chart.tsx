"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { name: 'Auto Prospecting', value: 89, max: 100, color: 'rgb(7, 167, 33)' },
  { name: 'Message Personalization', value: 76, max: 100, color: 'rgb(7, 167, 33)' },
  { name: 'Lead Enrichment', value: 92, max: 100, color: 'rgb(7, 167, 33)' },
]

export function EnergyChart() {
  return (
    <Card style={{ backgroundColor: 'rgb(41, 44, 48)', borderColor: 'rgb(95, 99, 108)' }}>
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>
          Campaign Performance Modules
          <button className="text-xs px-3 py-1 rounded-full transition-colors" style={{ backgroundColor: 'rgb(50, 53, 57)', color: 'rgb(146, 150, 159)' }}>
            Optimize
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-6">
          {data.map((item, index) => (
            <div key={item.name} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm" style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>{item.name}</span>
                <button style={{ color: 'rgb(146, 150, 159)' }} className="hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="1"/>
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                  </svg>
                </button>
              </div>
              
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{value: item.value, max: item.max}]}>
                    <Bar 
                      dataKey="value" 
                      radius={[4, 4, 4, 4]}
                      fill={`url(#gradient-${index})`}
                    />
                    <defs>
                      <linearGradient id={`gradient-${index}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={item.color} stopOpacity={1}/>
                        <stop offset="100%" stopColor={item.color} stopOpacity={0.3}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-1">
                <div className="text-2xl font-bold text-white" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>
                  {item.value}%
                </div>
                <div className="text-sm" style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Performance Score</div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: 'rgb(7, 167, 33)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 