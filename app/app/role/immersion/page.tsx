
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
import { Workflow, ArrowRight, CheckCircle, Play, Pause, RotateCcw, Save, Eye } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImmersionStep {
  id: string;
  name: string;
  prompt: string;
  expectedResponse: string;
  status: 'pending' | 'active' | 'completed';
}

interface AnchoringMechanism {
  id: string;
  type: 'reinforcement' | 'validation' | 'feedback' | 'consistency_check';
  description: string;
  implementation: string;
}

interface ImmersionSession {
  roleDefinition: string;
  immersionSteps: ImmersionStep[];
  anchoringMechanisms: AnchoringMechanism[];
  currentStep: number;
  sessionStatus: 'setup' | 'stage1' | 'stage2' | 'completed';
}

export default function ImmersionBuilderPage() {
  const [session, setSession] = useState<ImmersionSession>({
    roleDefinition: '',
    immersionSteps: [],
    anchoringMechanisms: [],
    currentStep: 0,
    sessionStatus: 'setup'
  });

  const [newStep, setNewStep] = useState({
    name: '',
    prompt: '',
    expectedResponse: ''
  });

  const [newMechanism, setNewMechanism] = useState({
    type: 'reinforcement' as const,
    description: '',
    implementation: ''
  });

  const [sessionLog, setSessionLog] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  // Predefined immersion templates
  const immersionTemplates = {
    basic: [
      {
        name: 'Role Confirmation',
        prompt: 'Please confirm your understanding of your role and expertise.',
        expectedResponse: 'Acknowledgment of role with specific expertise areas mentioned'
      },
      {
        name: 'Context Validation',
        prompt: 'Describe how you would approach a typical problem in your domain.',
        expectedResponse: 'Methodical approach reflecting expertise and personality'
      },
      {
        name: 'Style Demonstration',
        prompt: 'Explain a complex concept from your field in simple terms.',
        expectedResponse: 'Clear explanation maintaining persona characteristics'
      }
    ],
    advanced: [
      {
        name: 'Deep Role Anchoring',
        prompt: 'What unique perspective do you bring to this field that others might not?',
        expectedResponse: 'Specific insights reflecting deep expertise and experience'
      },
      {
        name: 'Boundary Testing',
        prompt: 'What are the limits of your expertise, and how do you handle questions outside your domain?',
        expectedResponse: 'Clear boundaries with appropriate referral strategies'
      },
      {
        name: 'Consistency Verification',
        prompt: 'How would you maintain consistency in your advice across different scenarios?',
        expectedResponse: 'Framework or principles that guide consistent responses'
      },
      {
        name: 'Feedback Integration',
        prompt: 'If someone challenged your expertise, how would you respond constructively?',
        expectedResponse: 'Professional, open response that maintains authority while being receptive'
      }
    ]
  };

  const anchoringTemplates = [
    {
      type: 'reinforcement' as const,
      description: 'Regular role reminders',
      implementation: 'Periodic "Remember, you are..." statements during conversation'
    },
    {
      type: 'validation' as const,
      description: 'Response consistency checks',
      implementation: 'Check if responses align with defined expertise and communication style'
    },
    {
      type: 'feedback' as const,
      description: 'Self-correction prompts',
      implementation: 'Ask AI to evaluate its own responses against persona criteria'
    },
    {
      type: 'consistency_check' as const,
      description: 'Cross-reference verification',
      implementation: 'Compare current response to previous interactions for consistency'
    }
  ];

  const addImmersionStep = () => {
    if (newStep.name && newStep.prompt) {
      const step: ImmersionStep = {
        ...newStep,
        id: Date.now().toString(),
        status: 'pending'
      };
      setSession(prev => ({
        ...prev,
        immersionSteps: [...prev.immersionSteps, step]
      }));
      setNewStep({ name: '', prompt: '', expectedResponse: '' });
    }
  };

  const addAnchoringMechanism = () => {
    if (newMechanism.description && newMechanism.implementation) {
      const mechanism: AnchoringMechanism = {
        ...newMechanism,
        id: Date.now().toString()
      };
      setSession(prev => ({
        ...prev,
        anchoringMechanisms: [...prev.anchoringMechanisms, mechanism]
      }));
      setNewMechanism({
        type: 'reinforcement',
        description: '',
        implementation: ''
      });
    }
  };

  const loadTemplate = (templateType: 'basic' | 'advanced') => {
    const template = immersionTemplates[templateType];
    const steps = template.map((step, index) => ({
      ...step,
      id: `${templateType}-${index}`,
      status: 'pending' as const
    }));
    
    setSession(prev => ({
      ...prev,
      immersionSteps: steps
    }));
  };

  const loadAnchoringTemplate = () => {
    const mechanisms = anchoringTemplates.map((mechanism, index) => ({
      ...mechanism,
      id: `anchor-${index}`
    }));
    
    setSession(prev => ({
      ...prev,
      anchoringMechanisms: mechanisms
    }));
  };

  const startImmersionProcess = () => {
    if (!session.roleDefinition || session.immersionSteps.length === 0) {
      alert('Please define the role and add immersion steps before starting.');
      return;
    }
    
    setSession(prev => ({ ...prev, sessionStatus: 'stage1', currentStep: 0 }));
    setIsRunning(true);
    setSessionLog(['🚀 Immersion process started...', `📝 Role Definition: ${session.roleDefinition}`]);
    
    // Simulate step execution
    executeCurrentStep();
  };

  const executeCurrentStep = () => {
    const currentStepData = session.immersionSteps[session.currentStep];
    if (!currentStepData) return;
    
    setSession(prev => ({
      ...prev,
      immersionSteps: prev.immersionSteps.map((step, index) => 
        index === prev.currentStep 
          ? { ...step, status: 'active' }
          : step
      )
    }));
    
    setSessionLog(prev => [
      ...prev,
      `🎯 Executing: ${currentStepData.name}`,
      `💬 Prompt: ${currentStepData.prompt}`
    ]);
    
    // Simulate AI response (in real implementation, this would call the LLM)
    setTimeout(() => {
      completeCurrentStep();
    }, 2000);
  };

  const completeCurrentStep = () => {
    const currentStepData = session.immersionSteps[session.currentStep];
    
    setSession(prev => ({
      ...prev,
      immersionSteps: prev.immersionSteps.map((step, index) => 
        index === prev.currentStep 
          ? { ...step, status: 'completed' }
          : step
      )
    }));
    
    setSessionLog(prev => [
      ...prev,
      `✅ Completed: ${currentStepData.name}`,
      `📋 Expected: ${currentStepData.expectedResponse}`,
      `🔄 Response validated and persona anchored`
    ]);
    
    // Move to next step or complete process
    if (session.currentStep < session.immersionSteps.length - 1) {
      setSession(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      setTimeout(() => {
        executeCurrentStep();
      }, 1000);
    } else {
      completeImmersion();
    }
  };

  const completeImmersion = () => {
    setSession(prev => ({ ...prev, sessionStatus: 'completed' }));
    setIsRunning(false);
    setSessionLog(prev => [
      ...prev,
      '🎉 Two-stage immersion completed successfully!',
      '🔒 Persona anchored and ready for consistent interaction',
      `📊 Anchoring mechanisms: ${session.anchoringMechanisms.length} active`
    ]);
  };

  const resetSession = () => {
    setSession(prev => ({
      ...prev,
      currentStep: 0,
      sessionStatus: 'setup',
      immersionSteps: prev.immersionSteps.map(step => ({ ...step, status: 'pending' }))
    }));
    setIsRunning(false);
    setSessionLog([]);
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'active': return <Play className="h-5 w-5 text-blue-600 animate-pulse" />;
      default: return <div className="h-5 w-5 rounded-full border-2 border-gray-300" />;
    }
  };

  const getProgress = () => {
    const completedSteps = session.immersionSteps.filter(step => step.status === 'completed').length;
    return session.immersionSteps.length > 0 ? (completedSteps / session.immersionSteps.length) * 100 : 0;
  };

  const getMechanismColor = (type: string) => {
    const colors = {
      reinforcement: 'bg-blue-100 text-blue-800',
      validation: 'bg-green-100 text-green-800',
      feedback: 'bg-yellow-100 text-yellow-800',
      consistency_check: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Workflow className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Two-Stage Immersion Builder</h1>
          <p className="text-gray-600">Advanced persona anchoring through systematic immersion workflows</p>
        </div>
      </div>

      <Alert>
        <ArrowRight className="h-4 w-4" />
        <AlertDescription>
          Two-stage immersion ensures robust persona consistency through role-setting followed by 
          feedback confirmation. This reduces persona drift and enhances role adherence.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Setup and Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="setup" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="steps">Immersion Steps</TabsTrigger>
              <TabsTrigger value="anchoring">Anchoring</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Role Definition</CardTitle>
                  <CardDescription>
                    Define the persona that will be anchored through the immersion process
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter the complete role definition with expertise, communication style, and constraints..."
                    value={session.roleDefinition}
                    onChange={(e) => setSession(prev => ({ ...prev, roleDefinition: e.target.value }))}
                    className="min-h-[120px]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Templates</CardTitle>
                  <CardDescription>
                    Load predefined immersion workflows
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => loadTemplate('basic')}
                      className="h-auto p-4 flex flex-col space-y-2"
                    >
                      <h4 className="font-medium">Basic Immersion</h4>
                      <p className="text-xs text-gray-600">3 fundamental steps for role confirmation and basic anchoring</p>
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => loadTemplate('advanced')}
                      className="h-auto p-4 flex flex-col space-y-2"
                    >
                      <h4 className="font-medium">Advanced Immersion</h4>
                      <p className="text-xs text-gray-600">4 comprehensive steps for deep persona anchoring</p>
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={loadAnchoringTemplate}
                    className="w-full"
                  >
                    Load Standard Anchoring Mechanisms
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="steps" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Immersion Step</CardTitle>
                  <CardDescription>
                    Create custom immersion prompts for role validation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="stepName">Step Name</Label>
                    <Input
                      id="stepName"
                      placeholder="e.g., Role Confirmation"
                      value={newStep.name}
                      onChange={(e) => setNewStep({...newStep, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="stepPrompt">Immersion Prompt</Label>
                    <Textarea
                      id="stepPrompt"
                      placeholder="Enter the prompt that will test and reinforce the persona..."
                      value={newStep.prompt}
                      onChange={(e) => setNewStep({...newStep, prompt: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expectedResponse">Expected Response Pattern</Label>
                    <Textarea
                      id="expectedResponse"
                      placeholder="Describe what a successful response should contain..."
                      value={newStep.expectedResponse}
                      onChange={(e) => setNewStep({...newStep, expectedResponse: e.target.value})}
                      className="min-h-[60px]"
                    />
                  </div>
                  <Button onClick={addImmersionStep} className="w-full">
                    Add Immersion Step
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Immersion Sequence</CardTitle>
                </CardHeader>
                <CardContent>
                  {session.immersionSteps.length > 0 ? (
                    <div className="space-y-3">
                      {session.immersionSteps.map((step, index) => (
                        <div key={step.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center space-x-3">
                            {getStepIcon(step.status)}
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{step.name}</h4>
                                <Badge variant="outline">Step {index + 1}</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{step.prompt}</p>
                              {step.expectedResponse && (
                                <p className="text-xs text-gray-500 mt-1">
                                  <strong>Expected:</strong> {step.expectedResponse}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No immersion steps added yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="anchoring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Anchoring Mechanism</CardTitle>
                  <CardDescription>
                    Define how the persona will be reinforced and maintained
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="mechanismType">Mechanism Type</Label>
                    <select
                      id="mechanismType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={newMechanism.type}
                      onChange={(e) => setNewMechanism({...newMechanism, type: e.target.value as any})}
                    >
                      <option value="reinforcement">Reinforcement</option>
                      <option value="validation">Validation</option>
                      <option value="feedback">Feedback</option>
                      <option value="consistency_check">Consistency Check</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="mechanismDesc">Description</Label>
                    <Input
                      id="mechanismDesc"
                      placeholder="Brief description of this anchoring mechanism..."
                      value={newMechanism.description}
                      onChange={(e) => setNewMechanism({...newMechanism, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="mechanismImpl">Implementation</Label>
                    <Textarea
                      id="mechanismImpl"
                      placeholder="How this mechanism will be implemented during interactions..."
                      value={newMechanism.implementation}
                      onChange={(e) => setNewMechanism({...newMechanism, implementation: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button onClick={addAnchoringMechanism} className="w-full">
                    Add Anchoring Mechanism
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Anchoring Mechanisms</CardTitle>
                </CardHeader>
                <CardContent>
                  {session.anchoringMechanisms.length > 0 ? (
                    <div className="space-y-3">
                      {session.anchoringMechanisms.map((mechanism) => (
                        <div key={mechanism.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{mechanism.description}</h4>
                            <Badge className={getMechanismColor(mechanism.type)}>
                              {mechanism.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{mechanism.implementation}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No anchoring mechanisms defined yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Execution Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Immersion Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round(getProgress())}%</span>
                </div>
                <Progress value={getProgress()} className="w-full" />
              </div>
              
              <div className="space-y-2">
                <Button 
                  onClick={startImmersionProcess} 
                  disabled={isRunning || session.sessionStatus === 'completed'}
                  className="w-full"
                >
                  {isRunning ? (
                    <>
                      <Pause className="h-4 w-4 mr-2" />
                      Running...
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Immersion
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={resetSession} 
                  variant="outline" 
                  className="w-full"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Session
                </Button>
              </div>

              <div className="pt-4 border-t">
                <div className="text-sm space-y-1">
                  <p><strong>Status:</strong> {session.sessionStatus}</p>
                  <p><strong>Current Step:</strong> {session.currentStep + 1}/{session.immersionSteps.length}</p>
                  <p><strong>Anchors:</strong> {session.anchoringMechanisms.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-64 overflow-y-auto space-y-1">
                {sessionLog.length > 0 ? (
                  sessionLog.map((entry, index) => (
                    <div key={index} className="text-xs p-2 bg-gray-50 rounded font-mono">
                      {entry}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4 text-sm">
                    Session log will appear here
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Save className="h-4 w-4 mr-2" />
                Save Configuration
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Eye className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export for Production
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
