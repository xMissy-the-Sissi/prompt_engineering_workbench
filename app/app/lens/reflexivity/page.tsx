
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { GitCompareArrows, AlertTriangle, Eye, Lightbulb, RotateCcw, Save, Play } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface BiasDetection {
  id: string;
  type: string;
  description: string;
  detected: boolean;
  confidence: number;
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}

interface LimitationAcknowledgment {
  id: string;
  category: string;
  limitation: string;
  scope: string;
  workaround: string;
}

interface FrameDeconstruction {
  id: string;
  frame: string;
  assumptions: string[];
  alternatives: string[];
  implications: string[];
}

interface SelfCorrectionAction {
  id: string;
  issue: string;
  correction: string;
  rationale: string;
  verification: string;
}

interface ReflexivitySession {
  inputText: string;
  biasDetections: BiasDetection[];
  limitations: LimitationAcknowledgment[];
  frameDestructions: FrameDeconstruction[];
  selfCorrections: SelfCorrectionAction[];
  reflexivityScore: number;
  insights: string[];
}

export default function ReflexivityDashboardPage() {
  const [session, setSession] = useState<ReflexivitySession>({
    inputText: '',
    biasDetections: [],
    limitations: [],
    frameDestructions: [],
    selfCorrections: [],
    reflexivityScore: 0,
    insights: []
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  // Common biases to detect
  const biasTypes = [
    {
      type: 'Confirmation Bias',
      description: 'Tendency to search for, interpret, and recall information that confirms pre-existing beliefs',
      questions: ['Am I only looking for information that supports my view?', 'What contradictory evidence am I ignoring?']
    },
    {
      type: 'Availability Heuristic',
      description: 'Overweighting easily recalled information over base rates or less memorable data',
      questions: ['Am I overemphasizing recent or memorable examples?', 'What systematic data am I overlooking?']
    },
    {
      type: 'Anchoring Bias',
      description: 'Over-reliance on first piece of information encountered',
      questions: ['Am I anchored to initial assumptions?', 'How would my analysis change with different starting points?']
    },
    {
      type: 'Representativeness Heuristic',
      description: 'Judging probability by similarity to mental prototypes',
      questions: ['Am I assuming this case is typical?', 'What base rates or context am I missing?']
    },
    {
      type: 'Cultural Bias',
      description: 'Unconscious preference for one\'s own cultural perspective',
      questions: ['How might my cultural background influence this analysis?', 'What perspectives from other cultures am I missing?']
    },
    {
      type: 'Expert Blind Spot',
      description: 'Overconfidence in domain expertise leading to oversimplification',
      questions: ['Am I oversimplifying due to expertise?', 'What might a novice notice that I\'m missing?']
    }
  ];

  // Limitation categories
  const limitationCategories = [
    {
      category: 'Knowledge Limits',
      examples: ['Incomplete information', 'Domain expertise gaps', 'Current knowledge cutoffs']
    },
    {
      category: 'Methodological Limits',
      examples: ['Analysis framework constraints', 'Time limitations', 'Resource constraints']
    },
    {
      category: 'Cognitive Limits',
      examples: ['Processing capacity', 'Attention limitations', 'Memory constraints']
    },
    {
      category: 'Perspective Limits',
      examples: ['Single viewpoint', 'Cultural constraints', 'Personal experience limits']
    }
  ];

  const runReflexivityAnalysis = () => {
    if (!session.inputText) return;

    setIsAnalyzing(true);
    
    // Simulate analysis process
    setTimeout(() => {
      // Mock bias detection
      const detectedBiases: BiasDetection[] = biasTypes.slice(0, 3).map((bias, index) => ({
        id: `bias-${index}`,
        type: bias.type,
        description: bias.description,
        detected: Math.random() > 0.3,
        confidence: Math.random() * 40 + 60, // 60-100%
        impact: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as any,
        mitigation: `Consider ${bias.questions[0].toLowerCase()}`
      }));

      // Mock limitations
      const limitations: LimitationAcknowledgment[] = [
        {
          id: 'limit-1',
          category: 'Knowledge Limits',
          limitation: 'Limited access to real-time data',
          scope: 'Analysis may not reflect most recent developments',
          workaround: 'Acknowledge temporal boundaries and recommend verification'
        },
        {
          id: 'limit-2',
          category: 'Perspective Limits',
          limitation: 'Single analytical perspective',
          scope: 'May miss important alternative viewpoints',
          workaround: 'Explicitly consider multiple stakeholder perspectives'
        }
      ];

      // Mock frame deconstruction
      const frames: FrameDeconstruction[] = [
        {
          id: 'frame-1',
          frame: 'Problem-solution framing',
          assumptions: ['Issue can be solved', 'Clear cause-effect relationship exists'],
          alternatives: ['Systems thinking approach', 'Tension management rather than resolution'],
          implications: ['May oversimplify complex dynamics', 'Could miss emergent opportunities']
        }
      ];

      // Mock self-corrections
      const corrections: SelfCorrectionAction[] = [
        {
          id: 'correction-1',
          issue: 'Initial overconfidence in causal claims',
          correction: 'Qualified statements with uncertainty acknowledgment',
          rationale: 'Correlation does not imply causation without additional evidence',
          verification: 'Check for alternative explanations and confounding factors'
        }
      ];

      // Calculate reflexivity score
      const biasScore = (detectedBiases.filter(b => b.detected).length / biasTypes.length) * 25;
      const limitationScore = (limitations.length > 0 ? 20 : 0);
      const frameScore = (frames.length > 0 ? 25 : 0);
      const correctionScore = (corrections.length > 0 ? 30 : 0);
      const reflexivityScore = biasScore + limitationScore + frameScore + correctionScore;

      const insights = [
        'Strong awareness of confirmation bias detected',
        'Good acknowledgment of knowledge limitations',
        'Frame deconstruction reveals alternative approaches',
        'Self-correction demonstrates adaptive thinking'
      ];

      setSession(prev => ({
        ...prev,
        biasDetections: detectedBiases,
        limitations,
        frameDestructions: frames,
        selfCorrections: corrections,
        reflexivityScore,
        insights
      }));

      setIsAnalyzing(false);
      setAnalysisComplete(true);
    }, 3000);
  };

  const getBiasColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReflexivityLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent', color: 'text-green-600' };
    if (score >= 60) return { level: 'Good', color: 'text-blue-600' };
    if (score >= 40) return { level: 'Moderate', color: 'text-yellow-600' };
    return { level: 'Needs Improvement', color: 'text-red-600' };
  };

  const resetAnalysis = () => {
    setSession(prev => ({
      ...prev,
      biasDetections: [],
      limitations: [],
      frameDestructions: [],
      selfCorrections: [],
      reflexivityScore: 0,
      insights: []
    }));
    setAnalysisComplete(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <GitCompareArrows className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reflexivity Dashboard</h1>
          <p className="text-gray-600">Real-time bias detection and self-correction monitoring</p>
        </div>
      </div>

      <Alert>
        <Eye className="h-4 w-4" />
        <AlertDescription>
          The Reflexivity Dashboard provides real-time analysis of potential biases, limitations, and frame assumptions 
          in AI reasoning. It promotes transparent self-awareness and adaptive correction.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Analysis Input */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Analysis</CardTitle>
              <CardDescription>
                Enter text, reasoning, or analysis for reflexive examination
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="analysisText">Text or Reasoning to Examine</Label>
                <Textarea
                  id="analysisText"
                  placeholder="Enter the text, reasoning, analysis, or decision-making process you want to examine for biases and limitations..."
                  value={session.inputText}
                  onChange={(e) => setSession(prev => ({ ...prev, inputText: e.target.value }))}
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={runReflexivityAnalysis}
                  disabled={!session.inputText || isAnalyzing}
                  className="flex-1"
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Run Reflexivity Analysis
                    </>
                  )}
                </Button>
                
                {analysisComplete && (
                  <Button variant="outline" onClick={resetAnalysis}>
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                )}
              </div>

              {isAnalyzing && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Running reflexivity analysis...</span>
                    <span>Processing</span>
                  </div>
                  <Progress value={66} className="w-full" />
                  <p className="text-xs text-gray-600">
                    Detecting biases, examining limitations, deconstructing frames...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {analysisComplete && (
            <Tabs defaultValue="biases" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="biases">Bias Detection</TabsTrigger>
                <TabsTrigger value="limitations">Limitations</TabsTrigger>
                <TabsTrigger value="frames">Frame Analysis</TabsTrigger>
                <TabsTrigger value="corrections">Self-Correction</TabsTrigger>
              </TabsList>

              <TabsContent value="biases" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span>Bias Detection Results</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {session.biasDetections.map((bias) => (
                        <div key={bias.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{bias.type}</h4>
                            <div className="flex space-x-2">
                              <Badge className={getBiasColor(bias.impact)}>
                                {bias.impact} Impact
                              </Badge>
                              <Badge variant="outline">
                                {Math.round(bias.confidence)}% confidence
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{bias.description}</p>
                          {bias.detected && (
                            <div className="bg-orange-50 p-2 rounded text-sm">
                              <strong className="text-orange-800">Mitigation:</strong>
                              <p className="text-orange-700">{bias.mitigation}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="limitations" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Limitation Acknowledgments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {session.limitations.map((limitation) => (
                        <div key={limitation.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{limitation.limitation}</h4>
                            <Badge variant="outline">{limitation.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            <strong>Scope:</strong> {limitation.scope}
                          </p>
                          <div className="bg-blue-50 p-2 rounded text-sm">
                            <strong className="text-blue-800">Workaround:</strong>
                            <p className="text-blue-700">{limitation.workaround}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="frames" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Frame Deconstruction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {session.frameDestructions.map((frame) => (
                        <div key={frame.id} className="border rounded-lg p-4 space-y-3">
                          <h4 className="font-medium text-lg">{frame.frame}</h4>
                          
                          <div>
                            <h5 className="font-medium text-sm text-gray-900 mb-1">Underlying Assumptions:</h5>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {frame.assumptions.map((assumption, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <span className="text-gray-400 mt-1">•</span>
                                  <span>{assumption}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-green-900 mb-1">Alternative Frames:</h5>
                            <ul className="text-sm text-green-700 space-y-1">
                              {frame.alternatives.map((alternative, index) => (
                                <li key={index} className="bg-green-50 p-1 rounded">
                                  {alternative}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-sm text-purple-900 mb-1">Implications:</h5>
                            <ul className="text-sm text-purple-700 space-y-1">
                              {frame.implications.map((implication, index) => (
                                <li key={index} className="bg-purple-50 p-1 rounded">
                                  {implication}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="corrections" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Self-Correction Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {session.selfCorrections.map((correction) => (
                        <div key={correction.id} className="border rounded-lg p-3 space-y-2">
                          <h4 className="font-medium text-red-900">Issue: {correction.issue}</h4>
                          <div className="bg-green-50 p-2 rounded">
                            <strong className="text-green-800">Correction:</strong>
                            <p className="text-green-700 text-sm">{correction.correction}</p>
                          </div>
                          <div className="bg-blue-50 p-2 rounded">
                            <strong className="text-blue-800">Rationale:</strong>
                            <p className="text-blue-700 text-sm">{correction.rationale}</p>
                          </div>
                          <div className="bg-purple-50 p-2 rounded">
                            <strong className="text-purple-800">Verification:</strong>
                            <p className="text-purple-700 text-sm">{correction.verification}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>

        {/* Reflexivity Score Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reflexivity Score</CardTitle>
              <CardDescription>
                Overall reflexivity and self-awareness assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {analysisComplete ? (
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-indigo-600">
                    {Math.round(session.reflexivityScore)}
                  </div>
                  <div className={`font-medium ${getReflexivityLevel(session.reflexivityScore).color}`}>
                    {getReflexivityLevel(session.reflexivityScore).level}
                  </div>
                  <Progress value={session.reflexivityScore} className="w-full" />
                  
                  <div className="text-left text-sm space-y-2">
                    <div className="flex justify-between">
                      <span>Bias Detection:</span>
                      <span>{session.biasDetections.filter(b => b.detected).length}/{biasTypes.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Limitations:</span>
                      <span>{session.limitations.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frames Analyzed:</span>
                      <span>{session.frameDestructions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Self-Corrections:</span>
                      <span>{session.selfCorrections.length}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <GitCompareArrows className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Run analysis to see reflexivity score
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {analysisComplete && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  <span>Key Insights</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {session.insights.map((insight, index) => (
                    <div key={index} className="text-sm p-2 bg-yellow-50 rounded text-yellow-800">
                      {insight}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Bias Detection Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {biasTypes.slice(0, 3).map((bias, index) => (
                  <div key={index} className="text-xs">
                    <h4 className="font-medium">{bias.type}</h4>
                    <p className="text-gray-600 mb-1">{bias.description}</p>
                    <p className="text-gray-500 italic">{bias.questions[0]}</p>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Biases
                </Button>
              </div>
            </CardContent>
          </Card>

          {analysisComplete && (
            <Card>
              <CardHeader>
                <CardTitle>Export Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Save className="h-4 w-4 mr-2" />
                  Save Analysis
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Generate Report
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  Export to Library
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
