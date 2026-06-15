
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Brain, Plus, Trash2, Eye, Save, Lightbulb, Layers, Network } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ScaffoldingElement {
  id: string;
  type: 'cognitive_support' | 'knowledge_discovery' | 'expert_inquiry';
  name: string;
  description: string;
  implementation: string;
}

interface MetacognitivePrompt {
  id: string;
  purpose: string;
  prompt: string;
  trigger: string;
}

interface CognitiveArchitecture {
  name: string;
  description: string;
  reasoningLevel: 'single_shot' | 'chain_of_thought' | 'tree_of_thoughts' | 'advanced_simulation';
  scaffolding: ScaffoldingElement[];
  metacognitive: MetacognitivePrompt[];
  architecture_prompt: string;
}

export default function CognitiveArchitecturePage() {
  const [architecture, setArchitecture] = useState<CognitiveArchitecture>({
    name: '',
    description: '',
    reasoningLevel: 'chain_of_thought',
    scaffolding: [],
    metacognitive: [],
    architecture_prompt: ''
  });

  const [newScaffolding, setNewScaffolding] = useState<{
    type: 'cognitive_support' | 'knowledge_discovery' | 'expert_inquiry';
    name: string;
    description: string;
    implementation: string;
  }>({
    type: 'cognitive_support',
    name: '',
    description: '',
    implementation: ''
  });

  const [newMetacognitive, setNewMetacognitive] = useState({
    purpose: '',
    prompt: '',
    trigger: ''
  });

  const [generatedArchitecture, setGeneratedArchitecture] = useState('');

  // Reasoning Level Templates
  const reasoningTemplates = {
    single_shot: {
      name: 'Single-Shot Reasoning',
      description: 'Direct, immediate response generation',
      template: 'Provide a direct, comprehensive answer to the following question: {question}',
      complexity: 1,
      use_cases: ['Simple queries', 'Factual questions', 'Basic classifications']
    },
    chain_of_thought: {
      name: 'Chain-of-Thought (CoT)',
      description: 'Step-by-step reasoning process',
      template: 'Let\'s think through this step by step:\n1. First, I\'ll analyze...\n2. Then, I\'ll consider...\n3. Finally, I\'ll conclude...',
      complexity: 2,
      use_cases: ['Problem solving', 'Analysis tasks', 'Multi-step reasoning']
    },
    tree_of_thoughts: {
      name: 'Tree of Thoughts (ToT)',
      description: 'Exploration of multiple reasoning paths',
      template: 'I\'ll explore multiple approaches to this problem:\n\nPath A: {approach_a}\nPath B: {approach_b}\nPath C: {approach_c}\n\nEvaluating each path...',
      complexity: 4,
      use_cases: ['Complex problem solving', 'Creative tasks', 'Strategic planning']
    },
    advanced_simulation: {
      name: 'Advanced Cognitive Simulation',
      description: 'Sophisticated multi-layer reasoning with self-reflection',
      template: 'Engaging advanced cognitive simulation:\n1. Problem decomposition\n2. Multi-perspective analysis\n3. Recursive refinement\n4. Meta-cognitive evaluation\n5. Synthesis',
      complexity: 5,
      use_cases: ['Research tasks', 'Complex analysis', 'Philosophical inquiry']
    }
  };

  // Scaffolding Templates
  const scaffoldingTemplates = {
    cognitive_support: [
      {
        name: 'Working Memory Expansion',
        description: 'Helps maintain complex information during processing',
        implementation: 'Create an information tracking system that maintains key facts, assumptions, and intermediate conclusions throughout the reasoning process.'
      },
      {
        name: 'Attention Direction',
        description: 'Guides focus to relevant aspects of the problem',
        implementation: 'Use explicit focus directives: "Now focusing on...", "Key aspect to consider...", "Important detail..."'
      },
      {
        name: 'Cognitive Load Management',
        description: 'Breaks complex problems into manageable chunks',
        implementation: 'Decompose complex tasks into smaller, sequential steps with clear boundaries and checkpoints.'
      }
    ],
    knowledge_discovery: [
      {
        name: 'Analogical Reasoning',
        description: 'Discovers insights through analogies and patterns',
        implementation: 'Systematically explore analogies: "This is similar to...", "The pattern here resembles...", "By analogy with..."'
      },
      {
        name: 'Contradiction Detection',
        description: 'Identifies inconsistencies and tensions',
        implementation: 'Actively search for contradictions: "However, this conflicts with...", "An alternative view suggests...", "This assumption may not hold because..."'
      },
      {
        name: 'Assumption Surfacing',
        description: 'Makes implicit assumptions explicit',
        implementation: 'Regularly surface assumptions: "I\'m assuming that...", "This depends on the assumption that...", "A key premise here is..."'
      }
    ],
    expert_inquiry: [
      {
        name: 'Domain Expert Consultation',
        description: 'Simulates expert-level domain knowledge',
        implementation: 'Channel domain expertise: "From a {domain} perspective...", "An expert in {field} would consider...", "Best practices in {area} suggest..."'
      },
      {
        name: 'Methodological Rigor',
        description: 'Applies systematic methodological approaches',
        implementation: 'Apply rigorous methods: "Using {methodology}...", "Following the {framework} approach...", "Applying {principle} systematically..."'
      },
      {
        name: 'Evidence Evaluation',
        description: 'Critically evaluates evidence quality and relevance',
        implementation: 'Systematically evaluate evidence: "The strength of this evidence is...", "Limitations include...", "Additional evidence needed..."'
      }
    ]
  };

  const addScaffolding = () => {
    if (newScaffolding.name && newScaffolding.description && newScaffolding.implementation) {
      const scaffolding: ScaffoldingElement = {
        ...newScaffolding,
        id: Date.now().toString()
      };
      
      setArchitecture(prev => ({
        ...prev,
        scaffolding: [...prev.scaffolding, scaffolding]
      }));
      
      setNewScaffolding({
        type: 'cognitive_support',
        name: '',
        description: '',
        implementation: ''
      });
    }
  };

  const addMetacognitive = () => {
    if (newMetacognitive.purpose && newMetacognitive.prompt) {
      const metacognitive: MetacognitivePrompt = {
        ...newMetacognitive,
        id: Date.now().toString()
      };
      
      setArchitecture(prev => ({
        ...prev,
        metacognitive: [...prev.metacognitive, metacognitive]
      }));
      
      setNewMetacognitive({
        purpose: '',
        prompt: '',
        trigger: ''
      });
    }
  };

  const loadScaffoldingTemplate = (type: keyof typeof scaffoldingTemplates) => {
    const templates = scaffoldingTemplates[type];
    const template = templates[Math.floor(Math.random() * templates.length)];
    
    setNewScaffolding({
      type: type,
      name: template.name,
      description: template.description,
      implementation: template.implementation
    });
  };

  const generateArchitecturePrompt = () => {
    if (!architecture.name || !architecture.reasoningLevel) {
      setGeneratedArchitecture('Please complete the basic architecture configuration first.');
      return;
    }

    const selectedTemplate = reasoningTemplates[architecture.reasoningLevel];
    
    let prompt = `# Cognitive Architecture: ${architecture.name}\n\n`;
    
    if (architecture.description) {
      prompt += `## Architecture Description\n${architecture.description}\n\n`;
    }

    // Reasoning Framework
    prompt += `## Reasoning Framework: ${selectedTemplate.name}\n`;
    prompt += `${selectedTemplate.description}\n\n`;
    prompt += `**Complexity Level:** ${selectedTemplate.complexity}/5\n`;
    prompt += `**Best for:** ${selectedTemplate.use_cases.join(', ')}\n\n`;

    // Core Template
    prompt += `## Core Reasoning Template\n\`\`\`\n${selectedTemplate.template}\n\`\`\`\n\n`;

    // Epistemic Scaffolding
    if (architecture.scaffolding.length > 0) {
      prompt += `## Epistemic Scaffolding\n\n`;
      
      // Group by type
      const groupedScaffolding = architecture.scaffolding.reduce((acc, item) => {
        if (!acc[item.type]) acc[item.type] = [];
        acc[item.type].push(item);
        return acc;
      }, {} as Record<string, ScaffoldingElement[]>);

      Object.entries(groupedScaffolding).forEach(([type, items]) => {
        prompt += `### ${type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}\n`;
        items.forEach(item => {
          prompt += `**${item.name}:** ${item.description}\n`;
          prompt += `*Implementation:* ${item.implementation}\n\n`;
        });
      });
    }

    // Metacognitive Prompts
    if (architecture.metacognitive.length > 0) {
      prompt += `## Metacognitive Prompts\n\n`;
      architecture.metacognitive.forEach((meta, index) => {
        prompt += `### ${index + 1}. ${meta.purpose}\n`;
        prompt += `**Prompt:** ${meta.prompt}\n`;
        if (meta.trigger) {
          prompt += `**Trigger:** ${meta.trigger}\n`;
        }
        prompt += '\n';
      });
    }

    // Custom Architecture Prompt
    if (architecture.architecture_prompt) {
      prompt += `## Custom Architecture Instructions\n${architecture.architecture_prompt}\n\n`;
    }

    // Implementation Guidelines
    prompt += `## Implementation Guidelines\n\n`;
    prompt += `1. **Initialization:** Begin each interaction with the specified reasoning framework\n`;
    prompt += `2. **Scaffolding Integration:** Apply scaffolding elements throughout the reasoning process\n`;
    prompt += `3. **Metacognitive Monitoring:** Use metacognitive prompts to evaluate and improve reasoning\n`;
    prompt += `4. **Adaptive Application:** Adjust the cognitive architecture based on task complexity and domain\n`;
    prompt += `5. **Continuous Improvement:** Incorporate feedback to refine the cognitive approach\n\n`;

    prompt += `---\n*Generated with Cognitive Architecture Builder*`;

    setGeneratedArchitecture(prompt);
  };

  const getScaffoldingColor = (type: string) => {
    const colors = {
      cognitive_support: 'bg-blue-100 text-blue-800',
      knowledge_discovery: 'bg-green-100 text-green-800',
      expert_inquiry: 'bg-purple-100 text-purple-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getComplexityColor = (level: number) => {
    if (level >= 4) return 'text-red-600';
    if (level >= 3) return 'text-orange-600';
    if (level >= 2) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Brain className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cognitive Architecture Builder</h1>
          <p className="text-gray-600">Design complex reasoning frameworks for advanced AI cognition</p>
        </div>
      </div>

      <Alert>
        <Lightbulb className="h-4 w-4" />
        <AlertDescription>
          Build sophisticated cognitive architectures that progress from simple instructions to complex reasoning 
          frameworks. Combine scaffolding elements and metacognitive prompts for enhanced AI cognition.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Architecture Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Configuration</CardTitle>
              <CardDescription>
                Define the basic parameters of your cognitive architecture
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="archName">Architecture Name</Label>
                  <Input
                    id="archName"
                    placeholder="e.g., Research Analysis Framework"
                    value={architecture.name}
                    onChange={(e) => setArchitecture(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="archDesc">Description</Label>
                <Textarea
                  id="archDesc"
                  placeholder="Describe the purpose and context for this cognitive architecture..."
                  value={architecture.description}
                  onChange={(e) => setArchitecture(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="customPrompt">Custom Architecture Instructions</Label>
                <Textarea
                  id="customPrompt"
                  placeholder="Additional specific instructions for this cognitive architecture..."
                  value={architecture.architecture_prompt}
                  onChange={(e) => setArchitecture(prev => ({ ...prev, architecture_prompt: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="reasoning" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reasoning">Reasoning Level</TabsTrigger>
              <TabsTrigger value="scaffolding">Scaffolding</TabsTrigger>
              <TabsTrigger value="metacognitive">Metacognitive</TabsTrigger>
            </TabsList>

            <TabsContent value="reasoning" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Select Reasoning Level</CardTitle>
                  <CardDescription>
                    Choose the complexity level for your cognitive architecture
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={architecture.reasoningLevel}
                    onValueChange={(value) => setArchitecture(prev => ({ 
                      ...prev, 
                      reasoningLevel: value as any 
                    }))}
                  >
                    {Object.entries(reasoningTemplates).map(([key, template]) => (
                      <div key={key} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value={key} id={key} />
                          <Label htmlFor={key} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant="outline" className={getComplexityColor(template.complexity)}>
                                Complexity: {template.complexity}/5
                              </Badge>
                            </div>
                          </Label>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">{template.description}</p>
                        <div className="ml-6">
                          <p className="text-xs text-gray-500 mb-2"><strong>Best for:</strong></p>
                          <div className="flex flex-wrap gap-1">
                            {template.use_cases.map((use_case, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {use_case}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="ml-6 bg-gray-50 p-2 rounded text-xs font-mono">
                          {template.template.substring(0, 100)}...
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scaffolding" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Scaffolding Templates</CardTitle>
                  <CardDescription>
                    Quick-load common scaffolding patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(scaffoldingTemplates).map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        size="sm"
                        onClick={() => loadScaffoldingTemplate(type as keyof typeof scaffoldingTemplates)}
                        className="h-auto p-3 flex flex-col"
                      >
                        <h4 className="font-medium text-xs capitalize">
                          {type.replace('_', ' ')}
                        </h4>
                        <p className="text-xs text-gray-600">Load template</p>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Scaffolding Element</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="scaffoldType">Type</Label>
                      <select
                        id="scaffoldType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newScaffolding.type}
                        onChange={(e) => setNewScaffolding({...newScaffolding, type: e.target.value as any})}
                      >
                        <option value="cognitive_support">Cognitive Support</option>
                        <option value="knowledge_discovery">Knowledge Discovery</option>
                        <option value="expert_inquiry">Expert Inquiry</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="scaffoldName">Name</Label>
                      <Input
                        id="scaffoldName"
                        placeholder="e.g., Working Memory Expansion"
                        value={newScaffolding.name}
                        onChange={(e) => setNewScaffolding({...newScaffolding, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="scaffoldDesc">Description</Label>
                    <Input
                      id="scaffoldDesc"
                      placeholder="What does this scaffolding element do?"
                      value={newScaffolding.description}
                      onChange={(e) => setNewScaffolding({...newScaffolding, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scaffoldImpl">Implementation</Label>
                    <Textarea
                      id="scaffoldImpl"
                      placeholder="How will this scaffolding be implemented in the reasoning process?"
                      value={newScaffolding.implementation}
                      onChange={(e) => setNewScaffolding({...newScaffolding, implementation: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button onClick={addScaffolding} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Scaffolding Element
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Active Scaffolding ({architecture.scaffolding.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {architecture.scaffolding.length > 0 ? (
                    <div className="space-y-3">
                      {architecture.scaffolding.map((scaffold) => (
                        <div key={scaffold.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{scaffold.name}</h4>
                            <Badge className={getScaffoldingColor(scaffold.type)}>
                              {scaffold.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{scaffold.description}</p>
                          <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                            <strong>Implementation:</strong> {scaffold.implementation}
                          </p>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setArchitecture(prev => ({
                              ...prev,
                              scaffolding: prev.scaffolding.filter(s => s.id !== scaffold.id)
                            }))}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No scaffolding elements added yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="metacognitive" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Metacognitive Prompt</CardTitle>
                  <CardDescription>
                    Create prompts that help the AI reflect on its own reasoning
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="metaPurpose">Purpose</Label>
                    <Input
                      id="metaPurpose"
                      placeholder="e.g., Self-evaluation of reasoning quality"
                      value={newMetacognitive.purpose}
                      onChange={(e) => setNewMetacognitive({...newMetacognitive, purpose: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaPrompt">Metacognitive Prompt</Label>
                    <Textarea
                      id="metaPrompt"
                      placeholder="e.g., How confident am I in this reasoning? What assumptions am I making?"
                      value={newMetacognitive.prompt}
                      onChange={(e) => setNewMetacognitive({...newMetacognitive, prompt: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaTrigger">Trigger Condition</Label>
                    <Input
                      id="metaTrigger"
                      placeholder="e.g., After reaching a conclusion, Before making a decision"
                      value={newMetacognitive.trigger}
                      onChange={(e) => setNewMetacognitive({...newMetacognitive, trigger: e.target.value})}
                    />
                  </div>
                  <Button onClick={addMetacognitive} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Metacognitive Prompt
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Metacognitive Prompts ({architecture.metacognitive.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {architecture.metacognitive.length > 0 ? (
                    <div className="space-y-3">
                      {architecture.metacognitive.map((meta) => (
                        <div key={meta.id} className="border rounded-lg p-3 space-y-2">
                          <h4 className="font-medium">{meta.purpose}</h4>
                          <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded">
                            {meta.prompt}
                          </p>
                          {meta.trigger && (
                            <p className="text-xs text-gray-500">
                              <strong>Trigger:</strong> {meta.trigger}
                            </p>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setArchitecture(prev => ({
                              ...prev,
                              metacognitive: prev.metacognitive.filter(m => m.id !== meta.id)
                            }))}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No metacognitive prompts added yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Architecture Preview */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Architecture Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Reasoning Level:</span>
                  <Badge variant="outline" className={getComplexityColor(reasoningTemplates[architecture.reasoningLevel].complexity)}>
                    {reasoningTemplates[architecture.reasoningLevel].complexity}/5
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Scaffolding Elements:</span>
                  <Badge variant="secondary">{architecture.scaffolding.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Metacognitive Prompts:</span>
                  <Badge variant="secondary">{architecture.metacognitive.length}</Badge>
                </div>
              </div>
              
              <div className="pt-3 border-t">
                <h4 className="font-medium text-sm mb-2">Scaffolding Distribution</h4>
                <div className="space-y-1 text-xs">
                  {['cognitive_support', 'knowledge_discovery', 'expert_inquiry'].map(type => {
                    const count = architecture.scaffolding.filter(s => s.type === type).length;
                    return (
                      <div key={type} className="flex justify-between">
                        <span className="capitalize">{type.replace('_', ' ')}:</span>
                        <span>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button 
                onClick={generateArchitecturePrompt}
                className="w-full"
                disabled={!architecture.name}
              >
                <Eye className="h-4 w-4 mr-2" />
                Generate Architecture
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedArchitecture ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded-lg">
                      {generatedArchitecture}
                    </pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Copy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Brain className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Configure your architecture and generate the cognitive framework
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Layers className="h-4 w-4 mr-2" />
                Load Template
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Network className="h-4 w-4 mr-2" />
                Test Architecture
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export Config
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Compare Architectures
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
