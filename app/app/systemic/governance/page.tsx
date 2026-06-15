
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Settings, Scale, Network, Brain, Eye, Save, CheckCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type GovernanceApproach = 'typological_drift' | 'agonistic_contestation' | 'neuro_symbolic_justification' | '';

interface GovernanceAnalysis {
  context: string;
  selectedApproach: GovernanceApproach;
  rationale: string;
  tradeoffs: string[];
  implementation: string;
  criticalConsiderations: string;
}

export default function GovernancePage() {
  const [analysis, setAnalysis] = useState<GovernanceAnalysis>({
    context: '',
    selectedApproach: '',
    rationale: '',
    tradeoffs: [],
    implementation: '',
    criticalConsiderations: ''
  });
  const [generatedReport, setGeneratedReport] = useState('');

  const governanceApproaches = [
    {
      id: 'typological_drift' as const,
      name: 'Typological Drift',
      description: 'Adaptive management with flexible categorization systems',
      icon: Settings,
      color: 'blue',
      philosophy: 'Embraces uncertainty and evolution in AI systems through adaptive governance structures that can evolve with the technology.',
      strengths: [
        'Flexible response to emerging challenges',
        'Accommodates technological evolution',
        'Encourages experimentation and learning',
        'Reduces rigid bureaucratic constraints'
      ],
      weaknesses: [
        'Potential for inconsistent application',
        'Difficulty in maintaining accountability',
        'May lack clear boundaries',
        'Complex to implement across organizations'
      ],
      bestFor: [
        'Rapidly evolving AI domains',
        'Research and development contexts',
        'Organizations with high adaptability',
        'Experimental AI applications'
      ]
    },
    {
      id: 'agonistic_contestation' as const,
      name: 'Agonistic Contestation',
      description: 'Decentralized consensus through constructive disagreement',
      icon: Network,
      color: 'green',
      philosophy: 'Leverages productive conflict and diverse perspectives to reach more robust governance decisions through democratic deliberation.',
      strengths: [
        'Incorporates diverse stakeholder perspectives',
        'Democratic and inclusive decision-making',
        'Robust to individual biases',
        'Encourages transparency and debate'
      ],
      weaknesses: [
        'Time-intensive decision processes',
        'Potential for gridlock',
        'May amplify existing power imbalances',
        'Complex coordination requirements'
      ],
      bestFor: [
        'High-stakes AI decisions',
        'Multi-stakeholder environments',
        'Organizations prioritizing legitimacy',
        'Public sector AI governance'
      ]
    },
    {
      id: 'neuro_symbolic_justification' as const,
      name: 'Neuro-Symbolic Justification',
      description: 'Formal verification through hybrid reasoning systems',
      icon: Brain,
      color: 'purple',
      philosophy: 'Combines neural network capabilities with symbolic reasoning to provide explainable and verifiable AI governance decisions.',
      strengths: [
        'Provides formal verification capabilities',
        'Combines intuitive and logical reasoning',
        'Enables auditable decision traces',
        'Supports both learning and rule-based governance'
      ],
      weaknesses: [
        'High technical complexity',
        'Requires significant computational resources',
        'Limited to problems with clear formal structure',
        'May not capture all relevant contextual factors'
      ],
      bestFor: [
        'Safety-critical AI systems',
        'Regulated industries',
        'Applications requiring formal verification',
        'High-precision governance requirements'
      ]
    }
  ];

  const updateAnalysis = (key: keyof GovernanceAnalysis, value: any) => {
    setAnalysis(prev => ({...prev, [key]: value}));
  };

  const addTradeoff = (tradeoff: string) => {
    if (tradeoff && !analysis.tradeoffs.includes(tradeoff)) {
      updateAnalysis('tradeoffs', [...analysis.tradeoffs, tradeoff]);
    }
  };

  const removeTradeoff = (index: number) => {
    updateAnalysis('tradeoffs', analysis.tradeoffs.filter((_, i) => i !== index));
  };

  const generateReport = () => {
    const selectedApproachData = governanceApproaches.find(a => a.id === analysis.selectedApproach);
    
    if (!selectedApproachData) {
      setGeneratedReport('Please select a governance approach first.');
      return;
    }

    const report = `
# AI Governance Framework Analysis Report

## Context Assessment
${analysis.context}

## Selected Approach: ${selectedApproachData.name}

### Philosophy
${selectedApproachData.philosophy}

### Rationale for Selection
${analysis.rationale}

### Key Strengths for This Context
${selectedApproachData.strengths.map(s => `• ${s}`).join('\n')}

### Potential Challenges
${selectedApproachData.weaknesses.map(w => `• ${w}`).join('\n')}

### Identified Tradeoffs
${analysis.tradeoffs.length > 0 ? analysis.tradeoffs.map(t => `• ${t}`).join('\n') : 'No specific tradeoffs identified'}

### Implementation Strategy
${analysis.implementation || 'Implementation strategy not specified'}

### Critical Considerations
${analysis.criticalConsiderations || 'No critical considerations specified'}

## Recommendations

### Immediate Actions
1. Establish governance committee with relevant stakeholders
2. Define clear metrics for measuring governance effectiveness
3. Create feedback mechanisms for continuous improvement
4. Develop training programs for governance stakeholders

### Long-term Strategy
1. Regular review and adaptation of governance mechanisms
2. Integration with existing organizational governance structures
3. Monitoring of emerging challenges and opportunities
4. Building capabilities for the selected approach

### Risk Mitigation
${selectedApproachData.weaknesses.map(w => `• Address: ${w}`).join('\n')}

---
*Generated on ${new Date().toLocaleDateString()} using Governance Framework Builder*
`;

    setGeneratedReport(report);
  };

  const getApproachColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-800 border-blue-200',
      green: 'bg-green-100 text-green-800 border-green-200',
      purple: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Scale className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Governance Framework Builder</h1>
          <p className="text-gray-600">Navigate governance trilemma and select optimal control mechanisms</p>
        </div>
      </div>

      <Alert>
        <Settings className="h-4 w-4" />
        <AlertDescription>
          The Governance Trilemma presents three competing approaches to AI system control. Each offers unique 
          advantages and challenges. This tool helps you analyze your context and select the most appropriate approach.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="context" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="context">Context Analysis</TabsTrigger>
          <TabsTrigger value="approaches">Governance Approaches</TabsTrigger>
          <TabsTrigger value="selection">Selection & Analysis</TabsTrigger>
          <TabsTrigger value="report">Implementation Report</TabsTrigger>
        </TabsList>

        <TabsContent value="context" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Governance Context</CardTitle>
              <CardDescription>
                Describe the AI system, organization, and governance challenges you're addressing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="e.g., Large-scale language model deployment in healthcare organization with multiple stakeholders, regulatory requirements, and need for both innovation and safety..."
                value={analysis.context}
                onChange={(e) => updateAnalysis('context', e.target.value)}
                className="min-h-[150px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Governance Challenges</CardTitle>
              <CardDescription>
                Consider these questions as you analyze your context
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Stakeholder Dynamics</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Who are the key stakeholders?</li>
                    <li>• What are their competing interests?</li>
                    <li>• How much consensus exists?</li>
                    <li>• What power dynamics are present?</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Technical Constraints</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• How complex is the AI system?</li>
                    <li>• What level of explainability is needed?</li>
                    <li>• Are there formal verification requirements?</li>
                    <li>• How rapidly is the technology evolving?</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Organizational Factors</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• What is the organizational culture?</li>
                    <li>• How much change can the system absorb?</li>
                    <li>• What governance structures already exist?</li>
                    <li>• What resources are available?</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">External Environment</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• What regulatory requirements apply?</li>
                    <li>• How high are the stakes of failure?</li>
                    <li>• What is the competitive landscape?</li>
                    <li>• How much public scrutiny exists?</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approaches" className="space-y-6">
          <div className="grid gap-6">
            {governanceApproaches.map((approach) => {
              const Icon = approach.icon;
              return (
                <Card key={approach.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getApproachColor(approach.color)}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{approach.name}</CardTitle>
                        <CardDescription>{approach.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-700">{approach.philosophy}</p>
                    
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-green-900 mb-2">Strengths</h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          {approach.strengths.map((strength, index) => (
                            <li key={index}>• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-900 mb-2">Challenges</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          {approach.weaknesses.map((weakness, index) => (
                            <li key={index}>• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-blue-900 mb-2">Best For</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          {approach.bestFor.map((use, index) => (
                            <li key={index}>• {use}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="selection" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Governance Approach</CardTitle>
              <CardDescription>
                Choose the approach that best fits your context and requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={analysis.selectedApproach}
                onValueChange={(value) => updateAnalysis('selectedApproach', value as GovernanceApproach)}
              >
                {governanceApproaches.map((approach) => {
                  const Icon = approach.icon;
                  return (
                    <div key={approach.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={approach.id} id={approach.id} />
                      <Icon className="h-5 w-5 text-gray-600" />
                      <Label htmlFor={approach.id} className="flex-1 cursor-pointer">
                        <div>
                          <p className="font-medium">{approach.name}</p>
                          <p className="text-sm text-gray-600">{approach.description}</p>
                        </div>
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </CardContent>
          </Card>

          {analysis.selectedApproach && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Rationale for Selection</CardTitle>
                  <CardDescription>
                    Explain why this approach is most suitable for your context
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe why this governance approach aligns with your needs, constraints, and objectives..."
                    value={analysis.rationale}
                    onChange={(e) => updateAnalysis('rationale', e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Strategy</CardTitle>
                  <CardDescription>
                    Outline how you plan to implement this governance approach
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Describe implementation steps, timeline, resources needed, and success metrics..."
                    value={analysis.implementation}
                    onChange={(e) => updateAnalysis('implementation', e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Critical Considerations</CardTitle>
                  <CardDescription>
                    Identify key risks, dependencies, and success factors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Note important considerations for successful implementation..."
                    value={analysis.criticalConsiderations}
                    onChange={(e) => updateAnalysis('criticalConsiderations', e.target.value)}
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tradeoffs Analysis</CardTitle>
                  <CardDescription>
                    Document the tradeoffs and compromises involved in your choice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Add a tradeoff..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            addTradeoff((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = '';
                          }
                        }}
                      />
                      <Button
                        onClick={() => {
                          const input = document.querySelector('input[placeholder="Add a tradeoff..."]') as HTMLInputElement;
                          if (input) {
                            addTradeoff(input.value);
                            input.value = '';
                          }
                        }}
                      >
                        Add
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {analysis.tradeoffs.map((tradeoff, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{tradeoff}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeTradeoff(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Implementation Report</span>
                <Button onClick={generateReport} disabled={!analysis.selectedApproach}>
                  <Eye className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedReport ? (
                <div className="space-y-4">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto">
                    {generatedReport}
                  </pre>
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Report
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Export PDF
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">
                    Complete your analysis and generate a comprehensive implementation report
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
