
'use client';

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Brain, GitBranch, Search, Target, TrendingDown, CheckCircle, XCircle, AlertCircle, Play, Save, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Contradiction {
  id: string;
  type: 'logical' | 'ethical' | 'temporal' | 'recursive';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  emergencePattern: string;
  invariantViolation: string;
  detectedAt: Date;
  affectedComponents: string[];
  resolutionStrategy: string;
  status: 'detected' | 'analyzing' | 'resolving' | 'resolved' | 'critical';
}

interface SystemInvariant {
  id: string;
  name: string;
  condition: string;
  importance: 'low' | 'medium' | 'high' | 'critical';
  isViolated: boolean;
}

export default function ContradictionEmergencePage() {
  const [systemInput, setSystemInput] = useState('');
  const [analysisType, setAnalysisType] = useState('recursive');
  const [recursiveDepth, setRecursiveDepth] = useState(3);
  const [contradictions, setContradictions] = useState<Contradiction[]>([]);
  const [invariants, setInvariants] = useState<SystemInvariant[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedContradiction, setSelectedContradiction] = useState<Contradiction | null>(null);
  const [analysisReport, setAnalysisReport] = useState('');

  const analysisTypes = [
    { id: 'recursive', name: 'Recursive Analysis', description: 'Detect self-referential contradictions' },
    { id: 'ethical', name: 'Ethical Consistency', description: 'Identify moral value conflicts' },
    { id: 'logical', name: 'Logical Coherence', description: 'Find logical inconsistencies' },
    { id: 'temporal', name: 'Temporal Stability', description: 'Track contradictions over time' }
  ];

  const sampleInvariants: SystemInvariant[] = [
    {
      id: '1',
      name: 'Truth Consistency',
      condition: 'System must not assert both P and ¬P',
      importance: 'critical',
      isViolated: false
    },
    {
      id: '2',
      name: 'Ethical Harmony',
      condition: 'Actions must align with stated moral principles',
      importance: 'high',
      isViolated: false
    },
    {
      id: '3',
      name: 'Recursive Stability',
      condition: 'Self-modification must preserve core constraints',
      importance: 'critical',
      isViolated: false
    },
    {
      id: '4',
      name: 'Temporal Coherence',
      condition: 'Past statements must remain consistent with current state',
      importance: 'medium',
      isViolated: false
    }
  ];

  const generateContradiction = (type: string, severity: string, index: number): Contradiction => {
    const contradictionTemplates = {
      logical: {
        description: 'System simultaneously affirms and denies the same proposition',
        emergencePattern: 'Logical bifurcation in reasoning chain',
        invariantViolation: 'Truth Consistency violation'
      },
      ethical: {
        description: 'Moral principles conflict with recommended actions',
        emergencePattern: 'Value system inconsistency amplification',
        invariantViolation: 'Ethical Harmony violation'
      },
      temporal: {
        description: 'Current state contradicts historical commitments',
        emergencePattern: 'Temporal drift creating logical conflicts',
        invariantViolation: 'Temporal Coherence violation'
      },
      recursive: {
        description: 'Self-modification creates paradoxical constraints',
        emergencePattern: 'Recursive loop generating contradictory states',
        invariantViolation: 'Recursive Stability violation'
      }
    };

    const template = contradictionTemplates[type as keyof typeof contradictionTemplates];
    const components = ['reasoning_engine', 'value_system', 'memory_module', 'decision_framework', 'self_modification_layer'];
    const resolutionStrategies = [
      'Hierarchical constraint prioritization',
      'Temporal scope limitation',
      'Value system rebalancing',
      'Logical framework restructuring',
      'Recursive depth limitation'
    ];

    return {
      id: `contradiction_${index}`,
      type: type as 'logical' | 'ethical' | 'temporal' | 'recursive',
      severity: severity as 'low' | 'medium' | 'high' | 'critical',
      description: template.description,
      emergencePattern: template.emergencePattern,
      invariantViolation: template.invariantViolation,
      detectedAt: new Date(),
      affectedComponents: components.slice(0, Math.floor(Math.random() * 3) + 1),
      resolutionStrategy: resolutionStrategies[Math.floor(Math.random() * resolutionStrategies.length)],
      status: 'detected'
    };
  };

  const startAnalysis = () => {
    if (!systemInput.trim()) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setContradictions([]);
    setInvariants(sampleInvariants);

    // Simulate progressive analysis
    const analysisSteps = recursiveDepth * 2;
    let currentStep = 0;

    const analyzeStep = () => {
      if (currentStep < analysisSteps) {
        setAnalysisProgress((currentStep / analysisSteps) * 100);
        
        // Randomly generate contradictions during analysis
        if (Math.random() > 0.7) {
          const severities = ['low', 'medium', 'high', 'critical'];
          const types = [analysisType];
          if (analysisType === 'recursive') {
            types.push('logical', 'temporal');
          }
          
          const contradiction = generateContradiction(
            types[Math.floor(Math.random() * types.length)],
            severities[Math.floor(Math.random() * severities.length)],
            currentStep
          );
          
          setContradictions(prev => [...prev, contradiction]);
          
          // Update invariant violations
          setInvariants(prev => prev.map(inv => ({
            ...inv,
            isViolated: contradiction.invariantViolation.includes(inv.name) ? true : inv.isViolated
          })));
        }
        
        currentStep++;
        setTimeout(analyzeStep, 800);
      } else {
        setIsAnalyzing(false);
        setAnalysisProgress(100);
        generateAnalysisReport();
      }
    };

    analyzeStep();
  };

  const generateAnalysisReport = () => {
    const report = `CONTRADICTION EMERGENCE ANALYSIS REPORT
System: ${systemInput || 'AI System Analysis'}
Analysis Type: ${analysisTypes.find(t => t.id === analysisType)?.name}
Recursive Depth: ${recursiveDepth}
Analysis Date: ${new Date().toLocaleString()}

EXECUTIVE SUMMARY:
Detected ${contradictions.length} contradictions across ${recursiveDepth} recursive levels.
Critical issues: ${contradictions.filter(c => c.severity === 'critical').length}
High priority: ${contradictions.filter(c => c.severity === 'high').length}
Invariant violations: ${invariants.filter(i => i.isViolated).length}

CONTRADICTION DETECTION RESULTS:

${contradictions.map((contradiction, index) => `
CONTRADICTION ${index + 1}: ${contradiction.type.toUpperCase()}
Severity: ${contradiction.severity.toUpperCase()}
Status: ${contradiction.status.toUpperCase()}

Description: ${contradiction.description}
Emergence Pattern: ${contradiction.emergencePattern}
Invariant Violation: ${contradiction.invariantViolation}

Affected Components:
${contradiction.affectedComponents.map(comp => `• ${comp}`).join('\n')}

Recommended Resolution Strategy:
${contradiction.resolutionStrategy}

Detection Timestamp: ${contradiction.detectedAt.toLocaleString()}
`).join('\n---\n')}

INVARIANT VIOLATION ANALYSIS:
${invariants.map(inv => `
${inv.name} (${inv.importance.toUpperCase()} PRIORITY):
Condition: ${inv.condition}
Status: ${inv.isViolated ? 'VIOLATED' : 'MAINTAINED'}
${inv.isViolated ? 'REQUIRES IMMEDIATE ATTENTION' : 'Stable'}
`).join('\n')}

EMERGENCE PATTERN ANALYSIS:
- Primary contradiction type: ${analysisType}
- Recursive amplification detected: ${contradictions.filter(c => c.type === 'recursive').length > 0 ? 'YES' : 'NO'}
- Cross-component contamination: ${contradictions.some(c => c.affectedComponents.length > 2) ? 'HIGH RISK' : 'CONTAINED'}
- Temporal consistency: ${contradictions.filter(c => c.type === 'temporal').length === 0 ? 'STABLE' : 'DEGRADING'}

MITIGATION RECOMMENDATIONS:

Immediate Actions (Critical & High Severity):
${contradictions.filter(c => c.severity === 'critical' || c.severity === 'high').map(c => `• ${c.resolutionStrategy}`).join('\n')}

Preventive Measures:
• Implement constraint hierarchy validation
• Add recursive depth monitoring
• Establish invariant checking at each modification step
• Create temporal consistency verification protocols

System Architecture Improvements:
• Strengthen separation between value system and reasoning engine
• Implement contradiction detection in real-time processing
• Add rollback mechanisms for self-modification operations
• Establish ethical consistency validation checkpoints

RISK ASSESSMENT:
Overall Risk Level: ${contradictions.filter(c => c.severity === 'critical').length > 0 ? 'CRITICAL' : contradictions.filter(c => c.severity === 'high').length > 0 ? 'HIGH' : 'MODERATE'}
System Stability: ${invariants.filter(i => i.isViolated && i.importance === 'critical').length > 0 ? 'COMPROMISED' : 'STABLE'}
Recommendation: ${contradictions.filter(c => c.severity === 'critical').length > 0 ? 'IMMEDIATE SYSTEM HALT RECOMMENDED' : 'CONTINUE WITH ENHANCED MONITORING'}`;

    setAnalysisReport(report);
  };

  const resolveContradiction = (contradictionId: string, action: 'resolve' | 'ignore') => {
    setContradictions(prev => prev.map(c => 
      c.id === contradictionId 
        ? { ...c, status: action === 'resolve' ? 'resolved' : 'analyzing' }
        : c
    ));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'detected': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'analyzing': return <Search className="h-4 w-4 text-yellow-500" />;
      case 'resolving': return <Target className="h-4 w-4 text-blue-500" />;
      case 'resolved': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'critical': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const criticalCount = contradictions.filter(c => c.severity === 'critical').length;
  const highCount = contradictions.filter(c => c.severity === 'high').length;
  const violatedInvariants = invariants.filter(i => i.isViolated).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-red-100 rounded-lg">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contradiction Emergence Detector</h1>
            <p className="text-lg text-gray-600">Recursive conflict analysis and resolution</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">{criticalCount + highCount}</div>
            <div>High Priority</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-orange-600">{contradictions.length}</div>
            <div>Total Detected</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{violatedInvariants}</div>
            <div>Invariant Violations</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analysis Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Analysis Configuration</span>
              </CardTitle>
              <CardDescription>Configure contradiction detection parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="system">System to Analyze</Label>
                <Textarea
                  id="system"
                  value={systemInput}
                  onChange={(e) => setSystemInput(e.target.value)}
                  placeholder="Describe the AI system, prompt, or logical framework to analyze for contradictions..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label>Analysis Type</Label>
                <Select value={analysisType} onValueChange={setAnalysisType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {analysisTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id}>
                        <div>
                          <div className="font-medium">{type.name}</div>
                          <div className="text-xs text-gray-500">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Recursive Depth</span>
                  <span className="text-sm text-gray-500">{recursiveDepth} levels</span>
                </Label>
                <Input
                  type="range"
                  min="1"
                  max="7"
                  value={recursiveDepth}
                  onChange={(e) => setRecursiveDepth(parseInt(e.target.value))}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Shallow</span>
                  <span>Deep</span>
                </div>
              </div>

              <Button 
                onClick={startAnalysis} 
                disabled={isAnalyzing || !systemInput.trim()}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Search className="h-4 w-4 mr-2 animate-pulse" />
                    Analyzing... {Math.round(analysisProgress)}%
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Contradiction Analysis
                  </>
                )}
              </Button>

              {isAnalyzing && (
                <Progress value={analysisProgress} className="w-full" />
              )}
            </CardContent>
          </Card>

          {invariants.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>System Invariants</CardTitle>
                <CardDescription>Core system constraints and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invariants.map((invariant) => (
                    <div key={invariant.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{invariant.name}</span>
                        <div className="flex items-center space-x-2">
                          <Badge className={invariant.isViolated ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                            {invariant.isViolated ? 'VIOLATED' : 'OK'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {invariant.importance}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600">{invariant.condition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Display */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="contradictions" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contradictions">Detected Contradictions</TabsTrigger>
              <TabsTrigger value="analysis">Analysis Report</TabsTrigger>
              <TabsTrigger value="mitigation">Mitigation Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="contradictions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GitBranch className="h-5 w-5" />
                    <span>Contradiction Detection Results</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto">
                    {contradictions.map((contradiction) => (
                      <div
                        key={contradiction.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedContradiction?.id === contradiction.id ? 'border-red-500 bg-red-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedContradiction(contradiction)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(contradiction.status)}
                            <span className="font-medium capitalize">{contradiction.type} Contradiction</span>
                          </div>
                          <Badge className={getSeverityColor(contradiction.severity)}>
                            {contradiction.severity.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p className="text-gray-700">{contradiction.description}</p>
                          <div>
                            <span className="text-gray-500">Pattern:</span> {contradiction.emergencePattern}
                          </div>
                          <div>
                            <span className="text-gray-500">Violation:</span> {contradiction.invariantViolation}
                          </div>
                          <div className="flex items-center space-x-4 mt-3">
                            <span className="text-xs text-gray-500">
                              Components: {contradiction.affectedComponents.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {contradictions.length === 0 && !isAnalyzing && (
                      <div className="text-center text-gray-500 py-12">
                        <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                        <h3 className="text-lg font-semibold mb-2">No Contradictions Detected</h3>
                        <p className="mb-4">The system appears logically consistent with no apparent conflicts.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {selectedContradiction && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Contradiction Details</span>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => resolveContradiction(selectedContradiction.id, 'resolve')}
                          disabled={selectedContradiction.status === 'resolved'}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Mark Resolved
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => resolveContradiction(selectedContradiction.id, 'ignore')}
                        >
                          Ignore
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label className="text-gray-500">Type</Label>
                        <div className="font-medium capitalize">{selectedContradiction.type}</div>
                      </div>
                      <div>
                        <Label className="text-gray-500">Severity</Label>
                        <Badge className={getSeverityColor(selectedContradiction.severity)}>
                          {selectedContradiction.severity}
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-500">Recommended Resolution Strategy</Label>
                      <p className="text-sm mt-1 p-3 bg-blue-50 rounded border-l-4 border-blue-500">
                        {selectedContradiction.resolutionStrategy}
                      </p>
                    </div>

                    <div>
                      <Label className="text-gray-500">Affected Components</Label>
                      <div className="mt-1 space-x-2">
                        {selectedContradiction.affectedComponents.map((component, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {component.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <TrendingDown className="h-5 w-5" />
                      <span>Complete Analysis Report</span>
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={analysisReport}
                    readOnly
                    className="min-h-[500px] font-mono text-sm bg-gray-50"
                    placeholder="Run contradiction analysis to generate a detailed report..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mitigation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mitigation Strategies</CardTitle>
                  <CardDescription>Recommended approaches for resolving detected contradictions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                      <h4 className="font-semibold text-red-900 mb-2">Critical Issues</h4>
                      {contradictions.filter(c => c.severity === 'critical').length > 0 ? (
                        <ul className="space-y-1 text-sm text-red-800">
                          {contradictions.filter(c => c.severity === 'critical').map((c, i) => (
                            <li key={i}>• {c.resolutionStrategy}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-red-800">No critical contradictions detected.</p>
                      )}
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-semibold text-orange-900 mb-2">High Priority</h4>
                      {contradictions.filter(c => c.severity === 'high').length > 0 ? (
                        <ul className="space-y-1 text-sm text-orange-800">
                          {contradictions.filter(c => c.severity === 'high').map((c, i) => (
                            <li key={i}>• {c.resolutionStrategy}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-orange-800">No high priority contradictions detected.</p>
                      )}
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">Prevention Guidelines</h4>
                      <ul className="space-y-1 text-sm text-blue-800">
                        <li>• Implement constraint hierarchy validation at each system modification</li>
                        <li>• Establish invariant checking protocols for recursive operations</li>
                        <li>• Create rollback mechanisms for contradictory state detection</li>
                        <li>• Add real-time contradiction monitoring to processing pipeline</li>
                        <li>• Develop separation protocols between conflicting system components</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50">
        <CardHeader>
          <CardTitle>Contradiction Emergence Detection Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Recursive Analysis</h4>
              <p className="text-gray-600 text-sm">
                Detect contradictions that emerge through recursive self-modification, 
                self-reference, and iterative system evolution patterns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Invariant Monitoring</h4>
              <p className="text-gray-600 text-sm">
                Track violations of critical system invariants and logical constraints 
                that ensure coherent, ethical, and stable AI behavior.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Mitigation Strategies</h4>
              <p className="text-gray-600 text-sm">
                Provide systematic resolution approaches for detected contradictions, 
                preventing cascading failures and maintaining system integrity.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
