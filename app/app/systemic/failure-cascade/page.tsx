
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertTriangle, Plus, Trash2, ArrowDown, Save, Eye, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface CascadeStep {
  id: string;
  event: string;
  impact: string;
  probability: 'Low' | 'Medium' | 'High';
  severity: 'Minor' | 'Moderate' | 'Major' | 'Critical';
}

export default function FailureCascadePage() {
  const [initiatingEvent, setInitiatingEvent] = useState('');
  const [cascadeSteps, setCascadeSteps] = useState<CascadeStep[]>([]);
  const [newStep, setNewStep] = useState<Omit<CascadeStep, 'id'>>({
    event: '',
    impact: '',
    probability: 'Medium',
    severity: 'Moderate'
  });
  const [systemicVulnerabilities, setSystemicVulnerabilities] = useState<string[]>([]);
  const [modularityRisk, setModularityRisk] = useState('');
  const [analysis, setAnalysis] = useState('');

  const addCascadeStep = () => {
    if (newStep.event && newStep.impact) {
      const step: CascadeStep = {
        ...newStep,
        id: Date.now().toString()
      };
      setCascadeSteps([...cascadeSteps, step]);
      setNewStep({
        event: '',
        impact: '',
        probability: 'Medium',
        severity: 'Moderate'
      });
    }
  };

  const removeCascadeStep = (id: string) => {
    setCascadeSteps(cascadeSteps.filter(step => step.id !== id));
  };

  const addVulnerability = (vulnerability: string) => {
    if (vulnerability && !systemicVulnerabilities.includes(vulnerability)) {
      setSystemicVulnerabilities([...systemicVulnerabilities, vulnerability]);
    }
  };

  const removeVulnerability = (index: number) => {
    setSystemicVulnerabilities(systemicVulnerabilities.filter((_, i) => i !== index));
  };

  const generateAnalysis = () => {
    const riskLevel = cascadeSteps.length > 3 ? 'High' : cascadeSteps.length > 1 ? 'Medium' : 'Low';
    const criticalSteps = cascadeSteps.filter(step => step.severity === 'Critical').length;
    
    const analysisText = `
# Failure Cascade Analysis Report

## Risk Assessment: ${riskLevel}

**Initiating Event:** ${initiatingEvent}

**Cascade Complexity:** ${cascadeSteps.length} identified propagation steps
**Critical Events:** ${criticalSteps} critical severity events
**High Probability Events:** ${cascadeSteps.filter(s => s.probability === 'High').length}

## Key Findings:

${cascadeSteps.length > 2 ? '⚠️ **Complex Cascade Detected**: This failure chain shows potential for significant propagation.' : ''}
${criticalSteps > 0 ? `🚨 **Critical Risk Points**: ${criticalSteps} events could cause system-wide failure.` : ''}
${systemicVulnerabilities.length > 2 ? '🔍 **Multiple Vulnerabilities**: System shows several structural weaknesses.' : ''}

## Recommended Actions:
- Implement circuit breakers at high-risk transition points
- Develop monitoring for early cascade detection
- Create fallback mechanisms for critical steps
- ${modularityRisk ? 'Address modularity-risk paradox concerns' : 'Review system modularity design'}
`;

    setAnalysis(analysisText);
  };

  const saveAnalysis = async () => {
    if (!analysis) {
      toast.error('No analysis to save');
      return;
    }

    try {
      const analysisData = {
        framework: 'Failure Cascade',
        initiatingEvent,
        cascadeSteps,
        analysis,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving failure cascade analysis:', analysisData);
      toast.success('Analysis saved successfully');
    } catch (err) {
      toast.error('Failed to save analysis');
    }
  };

  const getProbabilityColor = (probability: string) => {
    switch (probability) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'Major': return 'bg-orange-100 text-orange-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Minor': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <AlertTriangle className="h-8 w-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Failure Cascade Simulator</h1>
          <p className="text-gray-600">Analyze how prompt failures propagate through AI systems</p>
        </div>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          Model how minor prompt issues can escalate into system-wide failures. This tool helps identify 
          critical intervention points and systemic vulnerabilities in AI workflows.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Initiating Event */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Initiating Event</span>
              </CardTitle>
              <CardDescription>
                Define the initial prompt or system failure that triggers the cascade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Ambiguous persona definition in PALS framework leads to inconsistent AI responses..."
                value={initiatingEvent}
                onChange={(e) => setInitiatingEvent(e.target.value)}
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Cascade Steps */}
          <Card>
            <CardHeader>
              <CardTitle>Propagation Chain</CardTitle>
              <CardDescription>
                Add subsequent failure events and their impacts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="event">Event Description</Label>
                  <Input
                    id="event"
                    placeholder="Next failure event..."
                    value={newStep.event}
                    onChange={(e) => setNewStep({...newStep, event: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="impact">Impact</Label>
                  <Input
                    id="impact"
                    placeholder="Resulting impact..."
                    value={newStep.impact}
                    onChange={(e) => setNewStep({...newStep, impact: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="probability">Probability</Label>
                  <select
                    id="probability"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newStep.probability}
                    onChange={(e) => setNewStep({...newStep, probability: e.target.value as any})}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="severity">Severity</Label>
                  <select
                    id="severity"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={newStep.severity}
                    onChange={(e) => setNewStep({...newStep, severity: e.target.value as any})}
                  >
                    <option value="Minor">Minor</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Major">Major</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <Button onClick={addCascadeStep} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Cascade Step
              </Button>
            </CardContent>
          </Card>

          {/* Systemic Vulnerabilities */}
          <Card>
            <CardHeader>
              <CardTitle>Systemic Vulnerabilities</CardTitle>
              <CardDescription>
                Identify underlying system weaknesses that enable cascade propagation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Add vulnerability..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addVulnerability((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Add vulnerability..."]') as HTMLInputElement;
                    if (input) {
                      addVulnerability(input.value);
                      input.value = '';
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {systemicVulnerabilities.map((vulnerability, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                    <span>{vulnerability}</span>
                    <button onClick={() => removeVulnerability(index)}>
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Modularity Risk */}
          <Card>
            <CardHeader>
              <CardTitle>Modularity-Risk Paradox</CardTitle>
              <CardDescription>
                Assess how system modularity might paradoxically increase failure risk
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe how modular design might contribute to cascade risk..."
                value={modularityRisk}
                onChange={(e) => setModularityRisk(e.target.value)}
                className="min-h-[80px]"
              />
            </CardContent>
          </Card>
        </div>

        {/* Analysis Section */}
        <div className="space-y-6">
          {/* Cascade Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Cascade Visualization</CardTitle>
              <CardDescription>Visual representation of the failure propagation</CardDescription>
            </CardHeader>
            <CardContent>
              {initiatingEvent && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    <div>
                      <h4 className="font-medium text-red-900">Initiating Event</h4>
                      <p className="text-sm text-red-700">{initiatingEvent}</p>
                    </div>
                  </div>
                  
                  {cascadeSteps.map((step, index) => (
                    <div key={step.id} className="space-y-2">
                      <div className="flex justify-center">
                        <ArrowDown className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Step {index + 1}</h4>
                          <p className="text-sm text-gray-700 mb-2">{step.event}</p>
                          <p className="text-xs text-gray-600">{step.impact}</p>
                        </div>
                        <div className="space-y-1">
                          <Badge className={getProbabilityColor(step.probability)}>
                            {step.probability}
                          </Badge>
                          <Badge className={getSeverityColor(step.severity)}>
                            {step.severity}
                          </Badge>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeCascadeStep(step.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Output */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Analysis Report</span>
                <Button onClick={generateAnalysis} size="sm">
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
                  <Button onClick={saveAnalysis} className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Analysis
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Click "Generate Analysis" to create a comprehensive report
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
