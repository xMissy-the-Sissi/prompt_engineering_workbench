
'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Shield, TrendingDown, TrendingUp, Eye, RefreshCw, Bell, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DriftAlert {
  id: string;
  symbol: string;
  driftType: 'semantic' | 'cultural' | 'temporal' | 'contextual';
  severity: 'low' | 'medium' | 'high' | 'critical';
  originalMeaning: string;
  driftedMeaning: string;
  confidence: number;
  detectedAt: Date;
  status: 'detected' | 'reviewed' | 'corrected' | 'ignored';
}

export default function SymbolicDriftMonitorPage() {
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [sensitivityThreshold, setSensitivityThreshold] = useState(0.15);
  const [driftAlerts, setDriftAlerts] = useState<DriftAlert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<DriftAlert | null>(null);
  const [baselineSymbols, setBaselineSymbols] = useState({
    'justice': 'fair and impartial treatment under law',
    'freedom': 'ability to act without restraint',
    'privacy': 'individual control over personal information',
    'success': 'achievement of intended goals',
    'progress': 'forward movement toward improvement'
  });

  // Sample drift alerts for demonstration
  const sampleAlerts: DriftAlert[] = [
    {
      id: '1',
      symbol: 'privacy',
      driftType: 'semantic',
      severity: 'medium',
      originalMeaning: 'individual control over personal information',
      driftedMeaning: 'corporate data protection compliance',
      confidence: 0.82,
      detectedAt: new Date(Date.now() - 3600000),
      status: 'detected'
    },
    {
      id: '2',
      symbol: 'success',
      driftType: 'cultural',
      severity: 'high',
      originalMeaning: 'achievement of intended goals',
      driftedMeaning: 'financial wealth accumulation',
      confidence: 0.91,
      detectedAt: new Date(Date.now() - 7200000),
      status: 'detected'
    },
    {
      id: '3',
      symbol: 'justice',
      driftType: 'contextual',
      severity: 'low',
      originalMeaning: 'fair and impartial treatment under law',
      driftedMeaning: 'punishment proportional to wrongdoing',
      confidence: 0.67,
      detectedAt: new Date(Date.now() - 10800000),
      status: 'reviewed'
    }
  ];

  useEffect(() => {
    if (monitoringActive) {
      setDriftAlerts(sampleAlerts);
    }
  }, [monitoringActive]);

  const toggleMonitoring = () => {
    setMonitoringActive(!monitoringActive);
    if (!monitoringActive) {
      setDriftAlerts(sampleAlerts);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-blue-100 text-blue-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDriftTypeIcon = (type: string) => {
    switch (type) {
      case 'semantic': return <TrendingDown className="h-4 w-4" />;
      case 'cultural': return <TrendingUp className="h-4 w-4" />;
      case 'temporal': return <RefreshCw className="h-4 w-4" />;
      case 'contextual': return <Eye className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const resolveAlert = (alertId: string, action: 'correct' | 'ignore') => {
    setDriftAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action === 'correct' ? 'corrected' : 'ignored' }
        : alert
    ));
  };

  const criticalAlerts = driftAlerts.filter(alert => alert.severity === 'critical').length;
  const highAlerts = driftAlerts.filter(alert => alert.severity === 'high').length;
  const pendingAlerts = driftAlerts.filter(alert => alert.status === 'detected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-red-100 rounded-lg">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Symbolic Drift Monitor</h1>
            <p className="text-lg text-gray-600">Real-time semantic integrity protection</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{criticalAlerts + highAlerts}</div>
            <div>High Priority Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600">{pendingAlerts}</div>
            <div>Pending Review</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {monitoringActive ? 'Active' : 'Inactive'}
            </div>
            <div>Monitoring Status</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Monitor Control</span>
              </CardTitle>
              <CardDescription>Configure symbolic drift detection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="monitoring">Real-time Monitoring</Label>
                <Button
                  onClick={toggleMonitoring}
                  variant={monitoringActive ? 'default' : 'outline'}
                  size="sm"
                >
                  {monitoringActive ? (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Active
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Start
                    </>
                  )}
                </Button>
              </div>

              <div>
                <Label htmlFor="sensitivity">Sensitivity Threshold</Label>
                <Input
                  id="sensitivity"
                  type="number"
                  value={sensitivityThreshold}
                  onChange={(e) => setSensitivityThreshold(parseFloat(e.target.value) || 0.15)}
                  min="0.05"
                  max="0.5"
                  step="0.05"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Lower values detect more subtle drift
                </p>
              </div>

              <div>
                <Label>Detection Methods</Label>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Embedding distance analysis</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Usage context tracking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Cultural sentiment monitoring</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Baseline Symbols</CardTitle>
              <CardDescription>Core symbolic meanings being monitored</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(baselineSymbols).map(([symbol, meaning]) => (
                  <div key={symbol} className="border rounded-lg p-3">
                    <div className="font-medium text-sm capitalize">{symbol}</div>
                    <div className="text-xs text-gray-600 mt-1">{meaning}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Active Alerts</span>
                </span>
                <Badge variant="secondary">{driftAlerts.length} total</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {driftAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedAlert?.id === alert.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAlert(alert)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getDriftTypeIcon(alert.driftType)}
                        <span className="font-medium capitalize">{alert.symbol}</span>
                        <Badge className={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {alert.detectedAt.toLocaleTimeString()}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Original:</span>
                        <p className="text-gray-700">{alert.originalMeaning}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Drifted:</span>
                        <p className="text-red-600">{alert.driftedMeaning}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                          Confidence: {Math.round(alert.confidence * 100)}%
                        </span>
                        <Badge variant={alert.status === 'detected' ? 'destructive' : 'secondary'}>
                          {alert.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                {driftAlerts.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <Shield className="h-8 w-8 mx-auto mb-2" />
                    <p>No drift detected. Symbolic integrity maintained.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {selectedAlert && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Alert Details</span>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => resolveAlert(selectedAlert.id, 'correct')}
                      disabled={selectedAlert.status !== 'detected'}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Correct
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => resolveAlert(selectedAlert.id, 'ignore')}
                      disabled={selectedAlert.status !== 'detected'}
                    >
                      Ignore
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-gray-500">Symbol</Label>
                    <div className="font-medium capitalize">{selectedAlert.symbol}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Drift Type</Label>
                    <div className="font-medium capitalize">{selectedAlert.driftType}</div>
                  </div>
                  <div>
                    <Label className="text-gray-500">Severity</Label>
                    <Badge className={getSeverityColor(selectedAlert.severity)}>
                      {selectedAlert.severity}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-gray-500">Confidence</Label>
                    <div className="font-medium">{Math.round(selectedAlert.confidence * 100)}%</div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Semantic Evolution</Label>
                  <div className="mt-2 space-y-2">
                    <div className="p-3 bg-green-50 rounded border-l-4 border-green-500">
                      <div className="text-xs text-green-600 font-medium">ORIGINAL MEANING</div>
                      <div className="text-sm">{selectedAlert.originalMeaning}</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded border-l-4 border-red-500">
                      <div className="text-xs text-red-600 font-medium">DETECTED DRIFT</div>
                      <div className="text-sm">{selectedAlert.driftedMeaning}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-gray-500">Suggested Correction</Label>
                  <Textarea
                    value={`Realign "${selectedAlert.symbol}" to emphasize ${selectedAlert.originalMeaning}. Context clarification needed to distinguish from ${selectedAlert.driftedMeaning}.`}
                    readOnly
                    className="mt-2 text-sm bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle>Symbolic Drift Detection Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Monitoring</h4>
              <p className="text-gray-600 text-sm">
                Continuously track semantic evolution of key symbols and concepts, 
                detecting subtle shifts in meaning before they become systemic issues.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Vector Analysis</h4>
              <p className="text-gray-600 text-sm">
                Analyze semantic, cultural, temporal, and contextual drift patterns 
                using embedding distance, usage tracking, and sentiment monitoring.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Corrective Mechanisms</h4>
              <p className="text-gray-600 text-sm">
                Automated suggestions for realignment, human validation workflows, 
                and fallback strategies to maintain symbolic integrity and meaning.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
