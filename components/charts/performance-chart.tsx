"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PerformanceChart() {
  return (
    <Card style={{ backgroundColor: 'rgb(41, 44, 48)', borderColor: 'rgb(95, 99, 108)' }}>
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(7, 167, 33)' }}></div>
            <span>LinkedIn AI SDR Performance</span>
          </div>
          <button className="text-sm px-3 py-1 rounded-full transition-colors" style={{ backgroundColor: 'rgb(50, 53, 57)', color: 'rgb(146, 150, 159)' }}>
            Last 30 days
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-white mb-2" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>82%</div>
              <p className="text-sm" style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>
                Efficiency is above average<br />
                based on <span className="font-semibold" style={{ color: 'rgb(7, 167, 33)' }}>56 parameters</span>
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Reply Rate</span>
                <span className="text-white font-semibold" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>65%</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Conversion Rate</span>
                <span className="text-white font-semibold" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>28%</span>
              </div>
              <div className="flex items-center justify-between">
                <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Active Campaigns</span>
                <span className="text-white font-semibold" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>12</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>Lead Sources</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'rgb(7, 167, 33)' }}></div>
                  <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>LinkedIn Outreach</span>
                </div>
                <span className="text-white font-semibold text-sm" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>61% • 7,512 Leads</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Email Campaigns</span>
                </div>
                <span className="text-white font-semibold text-sm" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>19% • 12,987 Leads</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Referrals</span>
                </div>
                <span className="text-white font-semibold text-sm" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>12% • 8,902 Leads</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span style={{ color: 'rgb(146, 150, 159)', fontFamily: '"Helvetica Neue", sans-serif' }}>Intent Data</span>
                </div>
                <span className="text-white font-semibold text-sm" style={{ fontFamily: '"Helvetica Neue", sans-serif' }}>8% • 4,201 Leads</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 