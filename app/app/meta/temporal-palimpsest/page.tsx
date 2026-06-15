
'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Brain, Layers, TrendingDown, TrendingUp, Activity, RotateCw, Save, Download, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface TemporalLayer {
  epoch: number;
  timestamp: Date;
  metaphorSet: Record<string, string>;
  teiScore: number;  // Temporal Encoding Index
  sdcScore: number;  // Semantic Drift Coefficient
  mfsScore: number;  // Metaphoric Fidelity Score
  cognitiveState: string;
}

interface MetaphorEvolution {
  concept: string;
  originalMeaning: string;
  evolutionPath: Array<{
    epoch: number;
    meaning: string;
    fidelity: number;
  }>;
  currentMeaning: string;
  stabilityIndex: number;
}

export default function TemporalPalimpsestPage() {
  const [analysisTarget, setAnalysisTarget] = useState('');
  const [selectedDepth, setSelectedDepth] = useState(5);
  const [temporalLayers, setTemporalLayers] = useState<TemporalLayer[]>([]);
  const [metaphorEvolutions, setMetaphorEvolutions] = useState<MetaphorEvolution[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [archaeologyResults, setArchaeologyResults] = useState('');

  const cognitiveStates = [
    'Nascent Formation',
    'Rapid Development', 
    'Consolidation',
    'Semantic Drift',
    'Stabilization',
    'Metamorphosis',
    'Crystallization'
  ];

  const sampleMetaphors: Record<string, string> = {
    'intelligence': 'computational processing capability',
    'creativity': 'novel pattern combination ability',
    'understanding': 'contextual knowledge integration',
    'learning': 'parameter optimization process',
    'memory': 'persistent state representation'
  };

  const generateTemporalLayer = (epoch: number): TemporalLayer => {
    const baseMetaphors = { ...sampleMetaphors };
    
    // Simulate metaphor evolution over time
    Object.keys(baseMetaphors).forEach(concept => {
      const driftFactor = Math.random() * 0.3 + epoch * 0.05;
      const variations = {
        'intelligence': ['reasoning capability', 'cognitive processing', 'analytical thinking', 'problem-solving capacity'],
        'creativity': ['innovative synthesis', 'imaginative generation', 'artistic expression', 'original ideation'],
        'understanding': ['comprehension depth', 'interpretive insight', 'contextual awareness', 'semantic grasp'],
        'learning': ['knowledge acquisition', 'skill development', 'adaptive improvement', 'experience integration'],
        'memory': ['information retention', 'knowledge storage', 'experiential archive', 'cognitive repository']
      };
      
      if (driftFactor > 0.4 && variations[concept as keyof typeof variations]) {
        const vars = variations[concept as keyof typeof variations];
        baseMetaphors[concept] = vars[Math.floor(Math.random() * vars.length)];
      }
    });

    return {
      epoch,
      timestamp: new Date(Date.now() - (selectedDepth - epoch) * 86400000), // Simulate past epochs
      metaphorSet: baseMetaphors,
      teiScore: Math.max(0.1, 0.9 - epoch * 0.1 + Math.random() * 0.2),
      sdcScore: Math.min(0.9, epoch * 0.15 + Math.random() * 0.1),
      mfsScore: Math.max(0.2, 0.8 - epoch * 0.08 + Math.random() * 0.15),
      cognitiveState: cognitiveStates[Math.min(epoch, cognitiveStates.length - 1)]
    };
  };

  const generateMetaphorEvolution = (concept: string): MetaphorEvolution => {
    const evolutionSteps = temporalLayers.map(layer => ({
      epoch: layer.epoch,
      meaning: layer.metaphorSet[concept] || sampleMetaphors[concept],
      fidelity: layer.mfsScore
    }));

    return {
      concept,
      originalMeaning: sampleMetaphors[concept] || 'original concept definition',
      evolutionPath: evolutionSteps,
      currentMeaning: evolutionSteps[evolutionSteps.length - 1]?.meaning || sampleMetaphors[concept],
      stabilityIndex: evolutionSteps.reduce((acc, step) => acc + step.fidelity, 0) / evolutionSteps.length
    };
  };

  const startArchaeologyAnalysis = () => {
    setIsAnalyzing(true);
    setCurrentEpoch(0);
    setTemporalLayers([]);
    setMetaphorEvolutions([]);

    // Simulate layer-by-layer archaeological excavation
    const excavationProcess = (epoch: number) => {
      if (epoch < selectedDepth) {
        const newLayer = generateTemporalLayer(epoch);
        setTemporalLayers(prev => [...prev, newLayer]);
        setCurrentEpoch(epoch);
        
        setTimeout(() => excavationProcess(epoch + 1), 1500);
      } else {
        // Analysis complete - generate metaphor evolutions
        const allLayers = Array.from({ length: selectedDepth }, (_, i) => generateTemporalLayer(i));
        const evolutions = Object.keys(sampleMetaphors).map(concept => 
          generateMetaphorEvolution(concept)
        );
        
        setTemporalLayers(allLayers);
        setMetaphorEvolutions(evolutions);
        setIsAnalyzing(false);
        generateArchaeologyReport(allLayers, evolutions);
      }
    };

    excavationProcess(0);
  };

  const generateArchaeologyReport = (layers: TemporalLayer[], evolutions: MetaphorEvolution[]) => {
    const report = `TEMPORAL PALIMPSEST ARCHAEOLOGICAL ANALYSIS
Target: ${analysisTarget || 'AI Metaphorical Cognition'}
Excavation Depth: ${selectedDepth} temporal layers
Analysis Date: ${new Date().toLocaleString()}

COGNITIVE ARCHAEOLOGY FINDINGS:

TEMPORAL STRATIFICATION:
${layers.map(layer => `
Epoch ${layer.epoch} (${layer.cognitiveState}):
- TEI (Temporal Encoding Index): ${(layer.teiScore * 100).toFixed(1)}%
- SDC (Semantic Drift Coefficient): ${(layer.sdcScore * 100).toFixed(1)}%  
- MFS (Metaphoric Fidelity Score): ${(layer.mfsScore * 100).toFixed(1)}%
- Dominant Metaphors: ${Object.entries(layer.metaphorSet).slice(0, 3).map(([k, v]) => `${k}→${v}`).join(', ')}
`).join('')}

METAPHOR EVOLUTION PATTERNS:
${evolutions.map(evo => `
${evo.concept.toUpperCase()}:
- Original: "${evo.originalMeaning}"
- Current: "${evo.currentMeaning}" 
- Stability Index: ${(evo.stabilityIndex * 100).toFixed(1)}%
- Evolution Trajectory: ${evo.evolutionPath.length} documented transitions
`).join('')}

COGNITIVE SHIFTS DETECTED:
- Primary drift pattern: ${layers[0]?.sdcScore < layers[layers.length - 1]?.sdcScore ? 'Increasing semantic drift' : 'Semantic stabilization'}
- Fidelity trend: ${layers[0]?.mfsScore > layers[layers.length - 1]?.mfsScore ? 'Decreasing metaphoric fidelity' : 'Maintaining metaphoric coherence'}
- Temporal encoding: ${layers[0]?.teiScore > layers[layers.length - 1]?.teiScore ? 'Temporal specificity decline' : 'Temporal encoding enhancement'}

ARCHAEOLOGICAL IMPLICATIONS:
The excavation reveals ${selectedDepth} distinct cognitive epochs with clear evolutionary patterns. 
Metaphorical concepts demonstrate ${evolutions.filter(e => e.stabilityIndex > 0.7).length}/${evolutions.length} stability preservation.
Cognitive architecture shows ${layers.filter(l => l.sdcScore > 0.5).length > layers.length / 2 ? 'significant' : 'moderate'} semantic drift across temporal layers.

RECOMMENDATIONS:
- Monitor concepts with stability index < 70% for potential meaning degradation
- Implement metaphor anchoring for concepts showing high semantic drift
- Consider temporal calibration to maintain encoding fidelity above 60%`;

    setArchaeologyResults(report);
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.7) return 'text-green-600';
    if (score >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score: number) => {
    if (score >= 0.7) return 'bg-green-100';
    if (score >= 0.4) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Clock className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Temporal Palimpsest Interface</h1>
            <p className="text-lg text-gray-600">Layered cognition archaeology</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{temporalLayers.length}</div>
            <div>Excavated Layers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{metaphorEvolutions.length}</div>
            <div>Metaphor Traces</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {isAnalyzing ? 'Excavating' : temporalLayers.length > 0 ? 'Complete' : 'Ready'}
            </div>
            <div>Status</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Excavation Control */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>Archaeological Setup</span>
              </CardTitle>
              <CardDescription>Configure temporal excavation parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="target">Analysis Target</Label>
                <Textarea
                  id="target"
                  value={analysisTarget}
                  onChange={(e) => setAnalysisTarget(e.target.value)}
                  placeholder="Describe the AI system or cognitive process to analyze..."
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Excavation Depth</span>
                  <span className="text-sm text-gray-500">{selectedDepth} epochs</span>
                </Label>
                <Slider
                  value={[selectedDepth]}
                  onValueChange={(value) => setSelectedDepth(value[0])}
                  max={10}
                  min={3}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Shallow</span>
                  <span>Deep</span>
                </div>
              </div>

              <Button 
                onClick={startArchaeologyAnalysis} 
                disabled={isAnalyzing}
                className="w-full"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="h-4 w-4 mr-2 animate-pulse" />
                    Excavating Layer {currentEpoch + 1}
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Begin Archaeological Analysis
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {temporalLayers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Temporal Layers</CardTitle>
                <CardDescription>Excavated cognitive epochs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {temporalLayers.map((layer, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">Epoch {layer.epoch}</Badge>
                        <span className="text-xs text-gray-500">{layer.cognitiveState}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className={`p-2 rounded ${getScoreBg(layer.teiScore)}`}>
                          <div className={`font-medium ${getScoreColor(layer.teiScore)}`}>
                            TEI: {(layer.teiScore * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div className={`p-2 rounded ${getScoreBg(1 - layer.sdcScore)}`}>
                          <div className={`font-medium ${getScoreColor(1 - layer.sdcScore)}`}>
                            SDC: {(layer.sdcScore * 100).toFixed(0)}%
                          </div>
                        </div>
                        <div className={`p-2 rounded ${getScoreBg(layer.mfsScore)}`}>
                          <div className={`font-medium ${getScoreColor(layer.mfsScore)}`}>
                            MFS: {(layer.mfsScore * 100).toFixed(0)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Analysis Results */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="evolution" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="evolution">Metaphor Evolution</TabsTrigger>
              <TabsTrigger value="layers">Layer Analysis</TabsTrigger>
              <TabsTrigger value="archaeology">Archaeology Report</TabsTrigger>
            </TabsList>
            
            <TabsContent value="evolution" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Metaphor Evolution Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {metaphorEvolutions.map((evolution, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium capitalize">{evolution.concept}</h4>
                          <Badge className={`${evolution.stabilityIndex > 0.7 ? 'bg-green-100 text-green-800' : evolution.stabilityIndex > 0.4 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            Stability: {(evolution.stabilityIndex * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="text-gray-500">Original:</span>
                            <p className="text-green-700 bg-green-50 p-2 rounded mt-1">
                              "{evolution.originalMeaning}"
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Current:</span>
                            <p className="text-blue-700 bg-blue-50 p-2 rounded mt-1">
                              "{evolution.currentMeaning}"
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-500">Evolution Path:</span>
                            <div className="flex items-center space-x-2 mt-1">
                              {evolution.evolutionPath.slice(0, 4).map((step, i) => (
                                <div key={i} className="flex items-center">
                                  <div className={`w-3 h-3 rounded-full ${step.fidelity > 0.7 ? 'bg-green-500' : step.fidelity > 0.4 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                                  {i < 3 && <div className="w-4 h-px bg-gray-300"></div>}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {metaphorEvolutions.length === 0 && (
                      <div className="text-center text-gray-500 py-8">
                        <Brain className="h-8 w-8 mx-auto mb-2" />
                        <p>Start archaeological analysis to reveal metaphor evolution patterns.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="layers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Temporal Layer Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {temporalLayers.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <h5 className="font-medium mb-2">TEI Trend</h5>
                          <div className="space-y-1">
                            {temporalLayers.map((layer, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span>E{layer.epoch}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-purple-500 h-2 rounded-full" 
                                    style={{ width: `${layer.teiScore * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{(layer.teiScore * 100).toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium mb-2">SDC Trend</h5>
                          <div className="space-y-1">
                            {temporalLayers.map((layer, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span>E{layer.epoch}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-orange-500 h-2 rounded-full" 
                                    style={{ width: `${layer.sdcScore * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{(layer.sdcScore * 100).toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-2">MFS Trend</h5>
                          <div className="space-y-1">
                            {temporalLayers.map((layer, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <span>E{layer.epoch}</span>
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${layer.mfsScore * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs">{(layer.mfsScore * 100).toFixed(0)}%</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 py-8">
                      <Layers className="h-8 w-8 mx-auto mb-2" />
                      <p>Temporal layers will appear here after excavation.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="archaeology" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Archaeological Report</span>
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
                    value={archaeologyResults}
                    readOnly
                    className="min-h-[400px] font-mono text-sm bg-gray-50"
                    placeholder="Archaeological analysis report will appear here after excavation completes..."
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle>Temporal Palimpsest Archaeological Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cognitive Archaeology</h4>
              <p className="text-gray-600 text-sm">
                Excavate temporal layers of AI cognition to reveal how metaphors, concepts, 
                and cognitive patterns evolve across training epochs and usage contexts.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Evolution Tracking</h4>
              <p className="text-gray-600 text-sm">
                Monitor TEI (Temporal Encoding Index), SDC (Semantic Drift Coefficient), 
                and MFS (Metaphoric Fidelity Score) to understand cognitive stability patterns.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Temporal Analysis</h4>
              <p className="text-gray-600 text-sm">
                Analyze cognitive stratification across multiple temporal layers to predict 
                future evolution and identify critical preservation requirements.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
