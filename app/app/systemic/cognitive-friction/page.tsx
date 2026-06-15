
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, AlertCircle, Users, Zap, Eye, Save, Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface FrictionPoint {
  id: string;
  task: string;
  cognitive_load: 'Low' | 'Medium' | 'High';
  frequency: 'Rare' | 'Occasional' | 'Frequent';
  impact: string;
  mitigation: string;
}

interface SociotechnicalFactor {
  id: string;
  factor: string;
  category: 'Technical' | 'Social' | 'Organizational' | 'Environmental';
  influence: 'Positive' | 'Negative' | 'Mixed';
  description: string;
}

export default function CognitiveFrictionPage() {
  const [interactionContext, setInteractionContext] = useState('');
  const [alarmFatigue, setAlarmFatigue] = useState('');
  const [automationBias, setAutomationBias] = useState('');
  const [invisibleWork, setInvisibleWork] = useState<string[]>([]);
  const [frictionPoints, setFrictionPoints] = useState<FrictionPoint[]>([]);
  const [sociotechnicalFactors, setSociotechnicalFactors] = useState<SociotechnicalFactor[]>([]);
  const [analysis, setAnalysis] = useState('');

  const [newFriction, setNewFriction] = useState<Omit<FrictionPoint, 'id'>>({
    task: '',
    cognitive_load: 'Medium',
    frequency: 'Occasional',
    impact: '',
    mitigation: ''
  });

  const [newFactor, setNewFactor] = useState<Omit<SociotechnicalFactor, 'id'>>({
    factor: '',
    category: 'Technical',
    influence: 'Negative',
    description: ''
  });

  const addFrictionPoint = () => {
    if (newFriction.task && newFriction.impact) {
      const friction: FrictionPoint = {
        ...newFriction,
        id: Date.now().toString()
      };
      setFrictionPoints([...frictionPoints, friction]);
      setNewFriction({
        task: '',
        cognitive_load: 'Medium',
        frequency: 'Occasional',
        impact: '',
        mitigation: ''
      });
    }
  };

  const addSociotechnicalFactor = () => {
    if (newFactor.factor && newFactor.description) {
      const factor: SociotechnicalFactor = {
        ...newFactor,
        id: Date.now().toString()
      };
      setSociotechnicalFactors([...sociotechnicalFactors, factor]);
      setNewFactor({
        factor: '',
        category: 'Technical',
        influence: 'Negative',
        description: ''
      });
    }
  };

  const addInvisibleWork = (work: string) => {
    if (work && !invisibleWork.includes(work)) {
      setInvisibleWork([...invisibleWork, work]);
    }
  };

  const generateAnalysis = () => {
    const highLoadTasks = frictionPoints.filter(p => p.cognitive_load === 'High').length;
    const frequentIssues = frictionPoints.filter(p => p.frequency === 'Frequent').length;
    const totalWorkItems = invisibleWork.length;
    
    const analysisText = `
# Cognitive Friction Audit Report

## Human-AI Interaction Context
${interactionContext}

## Executive Summary
- **High Cognitive Load Tasks:** ${highLoadTasks}
- **Frequent Friction Points:** ${frequentIssues}
- **Invisible Work Items:** ${totalWorkItems}
- **Sociotechnical Factors:** ${sociotechnicalFactors.length}

## Key Findings

### Alarm Fatigue Assessment
${alarmFatigue || 'No alarm fatigue analysis provided'}

### Automation Bias Analysis
${automationBias || 'No automation bias analysis provided'}

### Invisible Work Burden
${invisibleWork.length > 0 ? `
Identified ${invisibleWork.length} invisible work activities:
${invisibleWork.map(work => `• ${work}`).join('\n')}
` : 'No invisible work identified'}

### Critical Friction Points
${frictionPoints.filter(p => p.cognitive_load === 'High' && p.frequency === 'Frequent').length > 0 ? 
  'Critical high-load, frequent issues requiring immediate attention:' : 
  'No critical friction points identified'}

## Recommendations
${highLoadTasks > 2 ? '• Prioritize automation or assistance for high cognitive load tasks' : ''}
${frequentIssues > 2 ? '• Implement workflow optimizations for frequent friction points' : ''}
${totalWorkItems > 3 ? '• Make invisible work visible through better documentation and recognition' : ''}
• Conduct regular friction audits to prevent accumulation
• Implement feedback loops for continuous improvement
`;

    setAnalysis(analysisText);
  };

  const getCognitiveLoadColor = (load: string) => {
    switch (load) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Frequent': return 'bg-red-100 text-red-800';
      case 'Occasional': return 'bg-yellow-100 text-yellow-800';
      case 'Rare': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInfluenceColor = (influence: string) => {
    switch (influence) {
      case 'Positive': return 'bg-green-100 text-green-800';
      case 'Negative': return 'bg-red-100 text-red-800';
      case 'Mixed': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cognitive Friction Audit</h1>
          <p className="text-gray-600">Assess human-AI interaction burdens and psychological pressures</p>
        </div>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Analyze the hidden cognitive costs of AI interactions using dual-frame analysis 
          (individual cognitive + sociotechnical factors) to identify friction points and optimization opportunities.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="context" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="context">Context & Assessment</TabsTrigger>
          <TabsTrigger value="friction">Friction Points</TabsTrigger>
          <TabsTrigger value="sociotech">Sociotechnical</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="context" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Interaction Context</CardTitle>
              <CardDescription>
                Describe the human-AI interaction scenario being analyzed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Data scientists using AI-assisted code generation for machine learning pipeline development..."
                value={interactionContext}
                onChange={(e) => setInteractionContext(e.target.value)}
                className="min-h-[120px]"
              />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  <span>Alarm Fatigue Analysis</span>
                </CardTitle>
                <CardDescription>
                  Assess cognitive overload from excessive alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe alert frequency, types, and impact on user attention and decision-making..."
                  value={alarmFatigue}
                  onChange={(e) => setAlarmFatigue(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span>Automation Bias</span>
                </CardTitle>
                <CardDescription>
                  Evaluate over-reliance on AI suggestions and reduced critical thinking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Analyze tendencies to accept AI outputs without verification, reduced human oversight..."
                  value={automationBias}
                  onChange={(e) => setAutomationBias(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Invisible Work</CardTitle>
              <CardDescription>
                Identify hidden tasks and mental labor not recognized in formal workflows
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Add invisible work item..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addInvisibleWork((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add invisible work item..."]') as HTMLInputElement;
                    if (input) {
                      addInvisibleWork(input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {invisibleWork.map((work, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{work}</span>
                    <button onClick={() => setInvisibleWork(invisibleWork.filter((_, i) => i !== index))}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="friction" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Friction Point</CardTitle>
              <CardDescription>
                Document specific tasks that create cognitive burden
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="task">Task Description</Label>
                  <Input
                    id="task"
                    placeholder="e.g., Reviewing AI-generated code for errors..."
                    value={newFriction.task}
                    onChange={(e) => setNewFriction({...newFriction, task: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="impact">Impact</Label>
                  <Input
                    id="impact"
                    placeholder="How this affects the user..."
                    value={newFriction.impact}
                    onChange={(e) => setNewFriction({...newFriction, impact: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="load">Cognitive Load</Label>
                  <select
                    id="load"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newFriction.cognitive_load}
                    onChange={(e) => setNewFriction({...newFriction, cognitive_load: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <select
                    id="frequency"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newFriction.frequency}
                    onChange={(e) => setNewFriction({...newFriction, frequency: e.target.value as any})}
                  >
                    <option value="Rare">Rare</option>
                    <option value="Occasional">Occasional</option>
                    <option value="Frequent">Frequent</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="mitigation">Potential Mitigation</Label>
                <Textarea
                  id="mitigation"
                  placeholder="Suggestions for reducing friction..."
                  value={newFriction.mitigation}
                  onChange={(e) => setNewFriction({...newFriction, mitigation: e.target.value})}
                />
              </div>
              <Button onClick={addFrictionPoint} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Friction Point
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Identified Friction Points</CardTitle>
            </CardHeader>
            <CardContent>
              {frictionPoints.length > 0 ? (
                <div className="space-y-4">
                  {frictionPoints.map((friction) => (
                    <div key={friction.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{friction.task}</h4>
                        <div className="flex space-x-2">
                          <Badge className={getCognitiveLoadColor(friction.cognitive_load)}>
                            {friction.cognitive_load} Load
                          </Badge>
                          <Badge className={getFrequencyColor(friction.frequency)}>
                            {friction.frequency}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{friction.impact}</p>
                      {friction.mitigation && (
                        <p className="text-sm text-green-700 bg-green-50 p-2 rounded">
                          <strong>Mitigation:</strong> {friction.mitigation}
                        </p>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setFrictionPoints(frictionPoints.filter(f => f.id !== friction.id))}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No friction points added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sociotech" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Sociotechnical Factor</CardTitle>
              <CardDescription>
                Document environmental and organizational factors affecting interaction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="factor">Factor</Label>
                  <Input
                    id="factor"
                    placeholder="e.g., Team pressure for quick delivery..."
                    value={newFactor.factor}
                    onChange={(e) => setNewFactor({...newFactor, factor: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newFactor.category}
                    onChange={(e) => setNewFactor({...newFactor, category: e.target.value as any})}
                  >
                    <option value="Technical">Technical</option>
                    <option value="Social">Social</option>
                    <option value="Organizational">Organizational</option>
                    <option value="Environmental">Environmental</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="influence">Influence</Label>
                  <select
                    id="influence"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newFactor.influence}
                    onChange={(e) => setNewFactor({...newFactor, influence: e.target.value as any})}
                  >
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Mixed">Mixed</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of how this factor affects human-AI interaction..."
                  value={newFactor.description}
                  onChange={(e) => setNewFactor({...newFactor, description: e.target.value})}
                />
              </div>
              <Button onClick={addSociotechnicalFactor} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Factor
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sociotechnical Factors</CardTitle>
            </CardHeader>
            <CardContent>
              {sociotechnicalFactors.length > 0 ? (
                <div className="space-y-4">
                  {sociotechnicalFactors.map((factor) => (
                    <div key={factor.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{factor.factor}</h4>
                        <div className="flex space-x-2">
                          <Badge variant="outline">{factor.category}</Badge>
                          <Badge className={getInfluenceColor(factor.influence)}>
                            {factor.influence}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{factor.description}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setSociotechnicalFactors(sociotechnicalFactors.filter(f => f.id !== factor.id))}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No sociotechnical factors added yet</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cognitive Friction Analysis</span>
                <Button onClick={generateAnalysis}>
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Analysis
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {analysis ? (
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg">
                    {analysis}
                  </pre>
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Analysis
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Complete the assessment and click "Generate Analysis" for a comprehensive report
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
