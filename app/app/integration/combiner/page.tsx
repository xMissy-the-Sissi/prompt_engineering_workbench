
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Shuffle, Plus, Minus, Eye, Save, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface FrameworkComponent {
  framework: string;
  component: string;
  description: string;
  contribution: string;
  priority: number;
}

interface Synergy {
  id: string;
  frameworks: string[];
  type: 'reinforcement' | 'complementary' | 'emergent';
  description: string;
  benefit: string;
}

interface Conflict {
  id: string;
  frameworks: string[];
  type: 'methodological' | 'philosophical' | 'practical';
  description: string;
  resolution: string;
}

interface CombinationStrategy {
  name: string;
  description: string;
  selectedFrameworks: string[];
  components: FrameworkComponent[];
  synergies: Synergy[];
  conflicts: Conflict[];
  integrationPattern: 'sequential' | 'parallel' | 'hierarchical' | 'adaptive';
  customInstructions: string;
}

export default function FrameworkCombinerPage() {
  const [strategy, setStrategy] = useState<CombinationStrategy>({
    name: '',
    description: '',
    selectedFrameworks: [],
    components: [],
    synergies: [],
    conflicts: [],
    integrationPattern: 'sequential',
    customInstructions: ''
  });

  const [generatedCombination, setGeneratedCombination] = useState('');

  // Available frameworks and their key components
  const frameworks = {
    PALS: {
      name: 'PALS Framework',
      description: '6-Layer Prompt Architecture',
      color: 'bg-blue-100 text-blue-800',
      components: [
        { name: 'Persona Layer', description: 'Role and expertise definition' },
        { name: 'Audience Layer', description: 'Target audience consideration' },
        { name: 'Logic Layer', description: 'Reasoning structure and flow' },
        { name: 'Structure Layer', description: 'Format and organization' },
        { name: 'Style Layer', description: 'Communication style and tone' },
        { name: 'Safety Layer', description: 'Risk mitigation and constraints' }
      ]
    },
    CxEP: {
      name: 'Context Engineering 2.0',
      description: 'Context-to-Execution Pipeline',
      color: 'bg-green-100 text-green-800',
      components: [
        { name: 'Goal Definition', description: 'Clear functional specification' },
        { name: 'Context Architecture', description: 'Structured context building' },
        { name: 'Constraint System', description: 'Preconditions and invariants' },
        { name: 'Execution Plan', description: 'Step-by-step implementation' },
        { name: 'Validation Loop', description: 'Automated verification' },
        { name: 'Reflexive Check', description: 'Self-evaluation mechanism' }
      ]
    },
    Systemic: {
      name: 'Systemic Analysis',
      description: 'Critical Systems Thinking',
      color: 'bg-red-100 text-red-800',
      components: [
        { name: 'Failure Cascade Analysis', description: 'Propagation chain modeling' },
        { name: 'Cognitive Friction Audit', description: 'Human-AI interaction analysis' },
        { name: 'Power Structure Analysis', description: 'Critical examination of dynamics' },
        { name: 'Governance Framework', description: 'Control mechanism selection' },
        { name: 'Actor-Network Mapping', description: 'Stakeholder relationship analysis' },
        { name: 'Systems Boundary Definition', description: 'Scope and limitation setting' }
      ]
    },
    RolePrompting: {
      name: 'Role Prompting',
      description: 'Advanced Persona Engineering',
      color: 'bg-purple-100 text-purple-800',
      components: [
        { name: 'Persona Architecture', description: 'Sophisticated role definition' },
        { name: 'Immersion Protocol', description: 'Two-stage anchoring process' },
        { name: 'Expertise Layering', description: 'Multi-dimensional competency' },
        { name: 'Communication Calibration', description: 'Style and interaction tuning' },
        { name: 'Multi-Agent Orchestration', description: 'Complex workflow coordination' },
        { name: 'Consistency Enforcement', description: 'Role adherence mechanisms' }
      ]
    },
    LensGPT: {
      name: 'LensGPT Deep Prompting',
      description: 'Epistemic Programming',
      color: 'bg-indigo-100 text-indigo-800',
      components: [
        { name: 'Cognitive Architecture', description: 'Complex reasoning framework' },
        { name: 'Epistemic Scaffolding', description: 'Knowledge discovery support' },
        { name: 'Analytical Lenses', description: 'Multi-perspective inquiry tools' },
        { name: 'Recursive Analysis', description: 'Iterative refinement cycles' },
        { name: 'Reflexivity Engine', description: 'Bias detection and correction' },
        { name: 'Meta-Cognitive Prompts', description: 'Self-awareness mechanisms' }
      ]
    }
  };

  // Predefined synergies and conflicts
  const knownSynergies: Synergy[] = [
    {
      id: 'pals-role',
      frameworks: ['PALS', 'RolePrompting'],
      type: 'reinforcement',
      description: 'PALS Persona layer enhanced by Role Prompting specificity',
      benefit: 'More detailed and consistent persona definition'
    },
    {
      id: 'cxep-systemic',
      frameworks: ['CxEP', 'Systemic'],
      type: 'complementary',
      description: 'CxEP validation enhanced by Systemic failure analysis',
      benefit: 'Robust error detection and system-aware validation'
    },
    {
      id: 'lens-systemic',
      frameworks: ['LensGPT', 'Systemic'],
      type: 'emergent',
      description: 'LensGPT analytical lenses applied to power structure analysis',
      benefit: 'Deep critical analysis with multiple analytical perspectives'
    },
    {
      id: 'pals-cxep',
      frameworks: ['PALS', 'CxEP'],
      type: 'complementary',
      description: 'PALS structure with CxEP validation loops',
      benefit: 'Structured prompts with systematic verification'
    },
    {
      id: 'role-lens',
      frameworks: ['RolePrompting', 'LensGPT'],
      type: 'emergent',
      description: 'Multi-agent roles with analytical lens perspectives',
      benefit: 'Diverse expert perspectives with systematic analytical frameworks'
    }
  ];

  const knownConflicts: Conflict[] = [
    {
      id: 'systemic-cxep',
      frameworks: ['Systemic', 'CxEP'],
      type: 'philosophical',
      description: 'Critical questioning vs. systematic execution',
      resolution: 'Use Systemic for problem framing, CxEP for solution execution'
    },
    {
      id: 'pals-lens',
      frameworks: ['PALS', 'LensGPT'],
      type: 'methodological',
      description: 'Structured layers vs. recursive exploration',
      resolution: 'Apply PALS structure within each LensGPT analytical cycle'
    },
    {
      id: 'role-systemic',
      frameworks: ['RolePrompting', 'Systemic'],
      type: 'practical',
      description: 'Persona consistency vs. critical deconstruction',
      resolution: 'Maintain persona while acknowledging perspective limitations'
    }
  ];

  const toggleFramework = (framework: string) => {
    setStrategy(prev => ({
      ...prev,
      selectedFrameworks: prev.selectedFrameworks.includes(framework)
        ? prev.selectedFrameworks.filter(f => f !== framework)
        : [...prev.selectedFrameworks, framework]
    }));
    updateComponents();
    identifySynergiesAndConflicts();
  };

  const updateComponents = () => {
    const newComponents: FrameworkComponent[] = [];
    strategy.selectedFrameworks.forEach(fw => {
      if (frameworks[fw as keyof typeof frameworks]) {
        frameworks[fw as keyof typeof frameworks].components.forEach(comp => {
          newComponents.push({
            framework: fw,
            component: comp.name,
            description: comp.description,
            contribution: '',
            priority: 3
          });
        });
      }
    });
    setStrategy(prev => ({ ...prev, components: newComponents }));
  };

  const identifySynergiesAndConflicts = () => {
    const selectedSet = new Set(strategy.selectedFrameworks);
    
    const applicableSynergies = knownSynergies.filter(synergy =>
      synergy.frameworks.every(fw => selectedSet.has(fw))
    );
    
    const applicableConflicts = knownConflicts.filter(conflict =>
      conflict.frameworks.every(fw => selectedSet.has(fw))
    );

    setStrategy(prev => ({
      ...prev,
      synergies: applicableSynergies,
      conflicts: applicableConflicts
    }));
  };

  const updateComponentPriority = (index: number, priority: number) => {
    setStrategy(prev => ({
      ...prev,
      components: prev.components.map((comp, i) => 
        i === index ? { ...comp, priority } : comp
      )
    }));
  };

  const updateComponentContribution = (index: number, contribution: string) => {
    setStrategy(prev => ({
      ...prev,
      components: prev.components.map((comp, i) => 
        i === index ? { ...comp, contribution } : comp
      )
    }));
  };

  const generateCombinedFramework = () => {
    if (strategy.selectedFrameworks.length < 2) {
      setGeneratedCombination('Please select at least 2 frameworks to combine.');
      return;
    }

    let prompt = `# Combined Framework: ${strategy.name || 'Multi-Framework Integration'}\n\n`;
    
    if (strategy.description) {
      prompt += `## Description\n${strategy.description}\n\n`;
    }

    // Selected Frameworks
    prompt += `## Integrated Frameworks\n`;
    strategy.selectedFrameworks.forEach(fw => {
      const framework = frameworks[fw as keyof typeof frameworks];
      prompt += `- **${framework.name}**: ${framework.description}\n`;
    });
    prompt += '\n';

    // Integration Pattern
    prompt += `## Integration Pattern: ${strategy.integrationPattern}\n\n`;
    
    const patterns = {
      sequential: 'Apply frameworks in sequence, with each building on the previous',
      parallel: 'Apply frameworks simultaneously, synthesizing results',
      hierarchical: 'Primary framework with secondary frameworks as enhancers',
      adaptive: 'Dynamically select framework elements based on context'
    };
    
    prompt += `${patterns[strategy.integrationPattern]}\n\n`;

    // High Priority Components
    const highPriorityComponents = strategy.components
      .filter(comp => comp.priority >= 4)
      .sort((a, b) => b.priority - a.priority);
    
    if (highPriorityComponents.length > 0) {
      prompt += `## Primary Components\n`;
      highPriorityComponents.forEach(comp => {
        prompt += `### ${comp.component} (${comp.framework})\n`;
        prompt += `${comp.description}\n`;
        if (comp.contribution) {
          prompt += `**Integration Contribution:** ${comp.contribution}\n`;
        }
        prompt += '\n';
      });
    }

    // Synergies
    if (strategy.synergies.length > 0) {
      prompt += `## Framework Synergies\n`;
      strategy.synergies.forEach((synergy, index) => {
        prompt += `### ${index + 1}. ${synergy.frameworks.join(' + ')} Synergy\n`;
        prompt += `**Type:** ${synergy.type}\n`;
        prompt += `**Description:** ${synergy.description}\n`;
        prompt += `**Benefit:** ${synergy.benefit}\n\n`;
      });
    }

    // Conflict Resolution
    if (strategy.conflicts.length > 0) {
      prompt += `## Conflict Resolution\n`;
      strategy.conflicts.forEach((conflict, index) => {
        prompt += `### ${index + 1}. ${conflict.frameworks.join(' vs ')} Tension\n`;
        prompt += `**Type:** ${conflict.type}\n`;
        prompt += `**Issue:** ${conflict.description}\n`;
        prompt += `**Resolution:** ${conflict.resolution}\n\n`;
      });
    }

    // Implementation Strategy
    prompt += `## Implementation Strategy\n\n`;
    
    switch (strategy.integrationPattern) {
      case 'sequential':
        prompt += `1. Begin with ${strategy.selectedFrameworks[0]} framework\n`;
        prompt += `2. Layer in additional frameworks in order of priority\n`;
        prompt += `3. Verify consistency and resolve conflicts at each step\n`;
        break;
      case 'parallel':
        prompt += `1. Apply all selected frameworks simultaneously\n`;
        prompt += `2. Identify convergent and divergent insights\n`;
        prompt += `3. Synthesize results using priority weighting\n`;
        break;
      case 'hierarchical':
        prompt += `1. Establish primary framework as foundation\n`;
        prompt += `2. Use secondary frameworks to enhance specific aspects\n`;
        prompt += `3. Maintain coherence with primary framework principles\n`;
        break;
      case 'adaptive':
        prompt += `1. Assess context and requirements\n`;
        prompt += `2. Dynamically select most relevant framework components\n`;
        prompt += `3. Adjust combination based on feedback and results\n`;
        break;
    }

    // Custom Instructions
    if (strategy.customInstructions) {
      prompt += `\n## Custom Integration Instructions\n${strategy.customInstructions}\n\n`;
    }

    // Quality Assurance
    prompt += `## Quality Assurance\n`;
    prompt += `- Verify framework compatibility and synergy realization\n`;
    prompt += `- Check for unresolved conflicts or contradictions\n`;
    prompt += `- Validate that integration serves intended purpose\n`;
    prompt += `- Monitor for emergent properties or unexpected behaviors\n\n`;

    prompt += `---\n*Generated with Framework Combiner*`;

    setGeneratedCombination(prompt);
  };

  const saveCombination = async () => {
    if (!generatedCombination) {
      toast.error('No combination to save');
      return;
    }

    try {
      const combinationData = {
        framework: 'Framework Combiner',
        selectedFrameworks: [],
        strategy: strategy,
        components: [],
        generatedCombination,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving framework combination:', combinationData);
      toast.success('Framework combination saved successfully');
    } catch (err) {
      toast.error('Failed to save combination');
    }
  };

  const copyCombination = async () => {
    if (generatedCombination) {
      try {
        await navigator.clipboard.writeText(generatedCombination);
        toast.success('Combination copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy combination');
      }
    } else {
      toast.error('No combination to copy');
    }
  };

  const getSynergyColor = (type: string) => {
    const colors = {
      reinforcement: 'bg-green-100 text-green-800',
      complementary: 'bg-blue-100 text-blue-800',
      emergent: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getConflictColor = (type: string) => {
    const colors = {
      methodological: 'bg-orange-100 text-orange-800',
      philosophical: 'bg-red-100 text-red-800',
      practical: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 4) return 'text-green-600';
    if (priority >= 3) return 'text-blue-600';
    if (priority >= 2) return 'text-yellow-600';
    return 'text-gray-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shuffle className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Framework Combiner</h1>
          <p className="text-gray-600">Create synergistic combinations of prompt engineering frameworks</p>
        </div>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          Combine multiple frameworks to leverage their complementary strengths while managing potential conflicts. 
          The tool identifies synergies and provides integration strategies for robust multi-framework approaches.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Framework Selection and Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Combination Strategy</CardTitle>
              <CardDescription>
                Define your multi-framework integration approach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="strategyName">Strategy Name</Label>
                  <Input
                    id="strategyName"
                    placeholder="e.g., Critical Research Framework"
                    value={strategy.name}
                    onChange={(e) => setStrategy(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="integrationPattern">Integration Pattern</Label>
                  <select
                    id="integrationPattern"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    value={strategy.integrationPattern}
                    onChange={(e) => setStrategy(prev => ({ ...prev, integrationPattern: e.target.value as any }))}
                  >
                    <option value="sequential">Sequential</option>
                    <option value="parallel">Parallel</option>
                    <option value="hierarchical">Hierarchical</option>
                    <option value="adaptive">Adaptive</option>
                  </select>
                </div>
              </div>
              <div>
                <Label htmlFor="strategyDesc">Description</Label>
                <Textarea
                  id="strategyDesc"
                  placeholder="Describe the purpose and context for this framework combination..."
                  value={strategy.description}
                  onChange={(e) => setStrategy(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Frameworks</CardTitle>
              <CardDescription>
                Choose the frameworks you want to combine
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(frameworks).map(([key, framework]) => (
                  <div key={key} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={key}
                      checked={strategy.selectedFrameworks.includes(key)}
                      onCheckedChange={() => toggleFramework(key)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={key} className="cursor-pointer">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{framework.name}</h4>
                          <Badge className={framework.color}>{key}</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{framework.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {framework.components.slice(0, 3).map((comp, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {comp.name}
                            </Badge>
                          ))}
                          {framework.components.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{framework.components.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {strategy.selectedFrameworks.length > 0 && (
            <Tabs defaultValue="components" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="components">Components</TabsTrigger>
                <TabsTrigger value="synergies">Synergies</TabsTrigger>
                <TabsTrigger value="conflicts">Conflicts</TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Component Prioritization</CardTitle>
                    <CardDescription>
                      Set priority and contribution for each framework component
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {strategy.components.map((component, index) => (
                        <div key={index} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{component.component}</h4>
                              <p className="text-sm text-gray-600">{component.description}</p>
                            </div>
                            <Badge className={frameworks[component.framework as keyof typeof frameworks].color}>
                              {component.framework}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`priority-${index}`}>Priority (1-5)</Label>
                              <select
                                id={`priority-${index}`}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                                value={component.priority}
                                onChange={(e) => updateComponentPriority(index, Number(e.target.value))}
                              >
                                <option value={1}>1 - Low</option>
                                <option value={2}>2 - Minor</option>
                                <option value={3}>3 - Medium</option>
                                <option value={4}>4 - High</option>
                                <option value={5}>5 - Critical</option>
                              </select>
                            </div>
                            <div className={`text-sm ${getPriorityColor(component.priority)} self-end pb-2`}>
                              Priority: {component.priority}/5
                            </div>
                          </div>
                          
                          <div>
                            <Label htmlFor={`contribution-${index}`}>Integration Contribution</Label>
                            <Input
                              id={`contribution-${index}`}
                              placeholder="How does this component contribute to the combination?"
                              value={component.contribution}
                              onChange={(e) => updateComponentContribution(index, e.target.value)}
                              className="text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="synergies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Identified Synergies</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {strategy.synergies.length > 0 ? (
                      <div className="space-y-3">
                        {strategy.synergies.map((synergy) => (
                          <div key={synergy.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{synergy.frameworks.join(' + ')}</h4>
                              <Badge className={getSynergyColor(synergy.type)}>
                                {synergy.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{synergy.description}</p>
                            <div className="bg-green-50 p-2 rounded text-sm">
                              <strong className="text-green-800">Benefit:</strong>
                              <p className="text-green-700">{synergy.benefit}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No synergies identified for current selection
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="conflicts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span>Potential Conflicts</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {strategy.conflicts.length > 0 ? (
                      <div className="space-y-3">
                        {strategy.conflicts.map((conflict) => (
                          <div key={conflict.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{conflict.frameworks.join(' vs ')}</h4>
                              <Badge className={getConflictColor(conflict.type)}>
                                {conflict.type}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{conflict.description}</p>
                            <div className="bg-blue-50 p-2 rounded text-sm">
                              <strong className="text-blue-800">Resolution:</strong>
                              <p className="text-blue-700">{conflict.resolution}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        No conflicts identified for current selection
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}

          {strategy.selectedFrameworks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Custom Integration Instructions</CardTitle>
                <CardDescription>
                  Add specific instructions for how these frameworks should work together
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Specify any custom rules, priorities, or integration logic for this combination..."
                  value={strategy.customInstructions}
                  onChange={(e) => setStrategy(prev => ({ ...prev, customInstructions: e.target.value }))}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Combination Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Selected Frameworks:</span>
                  <Badge variant="secondary">{strategy.selectedFrameworks.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total Components:</span>
                  <Badge variant="secondary">{strategy.components.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>High Priority:</span>
                  <Badge variant="secondary">
                    {strategy.components.filter(c => c.priority >= 4).length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Synergies:</span>
                  <Badge variant="secondary" className="text-green-700">
                    {strategy.synergies.length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Conflicts:</span>
                  <Badge variant="secondary" className="text-orange-700">
                    {strategy.conflicts.length}
                  </Badge>
                </div>
              </div>

              <Button 
                onClick={generateCombinedFramework}
                className="w-full"
                disabled={strategy.selectedFrameworks.length < 2}
              >
                <Eye className="h-4 w-4 mr-2" />
                Generate Combination
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Framework</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedCombination ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded-lg">
                      {generatedCombination}
                    </pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={saveCombination} size="sm" className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button onClick={copyCombination} size="sm" variant="outline" className="flex-1">
                      Copy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Shuffle className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Select frameworks and generate your combination
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {strategy.selectedFrameworks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Integration Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span>Framework Compatibility</span>
                  <Badge variant={strategy.conflicts.length === 0 ? "default" : "destructive"}>
                    {strategy.conflicts.length === 0 ? "Compatible" : "Conflicts Detected"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Synergy Potential</span>
                  <Badge variant={strategy.synergies.length > 0 ? "default" : "secondary"}>
                    {strategy.synergies.length > 0 ? "High" : "Moderate"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Integration Complexity</span>
                  <Badge variant="outline">
                    {strategy.selectedFrameworks.length <= 2 ? "Simple" : 
                     strategy.selectedFrameworks.length <= 3 ? "Moderate" : "Complex"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
