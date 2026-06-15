
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Plus, Trash2, Eye, Save, Star, Target, Settings } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface PersonaLayer {
  id: string;
  title: string;
  content: string;
  specificity: number; // 1-5 scale
}

interface PersonaProfile {
  directDeclaration: string;
  expertiseLayers: PersonaLayer[];
  communicationStyle: {
    tone: string;
    vocabulary: string;
    structure: string;
    examples: string;
  };
  constraintsBoundaries: string[];
  contextualFramework: {
    field: string;
    tenor: string;
    mode: string;
  };
}

export default function PersonaArchitectPage() {
  const [persona, setPersona] = useState<PersonaProfile>({
    directDeclaration: '',
    expertiseLayers: [],
    communicationStyle: {
      tone: '',
      vocabulary: '',
      structure: '',
      examples: ''
    },
    constraintsBoundaries: [],
    contextualFramework: {
      field: '',
      tenor: '',
      mode: ''
    }
  });

  const [newLayer, setNewLayer] = useState({ title: '', content: '', specificity: 3 });
  const [newConstraint, setNewConstraint] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [specificityScore, setSpecificityScore] = useState(0);

  const addExpertiseLayer = () => {
    if (newLayer.title && newLayer.content) {
      const layer: PersonaLayer = {
        ...newLayer,
        id: Date.now().toString()
      };
      setPersona(prev => ({
        ...prev,
        expertiseLayers: [...prev.expertiseLayers, layer]
      }));
      setNewLayer({ title: '', content: '', specificity: 3 });
      calculateSpecificityScore();
    }
  };

  const removeExpertiseLayer = (id: string) => {
    setPersona(prev => ({
      ...prev,
      expertiseLayers: prev.expertiseLayers.filter(layer => layer.id !== id)
    }));
    calculateSpecificityScore();
  };

  const addConstraint = () => {
    if (newConstraint && !persona.constraintsBoundaries.includes(newConstraint)) {
      setPersona(prev => ({
        ...prev,
        constraintsBoundaries: [...prev.constraintsBoundaries, newConstraint]
      }));
      setNewConstraint('');
    }
  };

  const removeConstraint = (index: number) => {
    setPersona(prev => ({
      ...prev,
      constraintsBoundaries: prev.constraintsBoundaries.filter((_, i) => i !== index)
    }));
  };

  const calculateSpecificityScore = () => {
    let score = 0;
    
    // Direct declaration specificity (0-20 points)
    if (persona.directDeclaration.length > 50) score += 10;
    if (persona.directDeclaration.includes('expert') || persona.directDeclaration.includes('specialist')) score += 5;
    if (persona.directDeclaration.includes('years') || persona.directDeclaration.includes('experience')) score += 5;
    
    // Expertise layers (0-30 points)
    score += Math.min(persona.expertiseLayers.length * 5, 20);
    const avgSpecificity = persona.expertiseLayers.reduce((sum, layer) => sum + layer.specificity, 0) / (persona.expertiseLayers.length || 1);
    score += avgSpecificity * 2;
    
    // Communication style (0-20 points)
    const styleFields = Object.values(persona.communicationStyle);
    const filledFields = styleFields.filter(field => field.length > 0).length;
    score += filledFields * 5;
    
    // Constraints (0-15 points)
    score += Math.min(persona.constraintsBoundaries.length * 3, 15);
    
    // Contextual framework (0-15 points)
    const contextFields = Object.values(persona.contextualFramework);
    const filledContextFields = contextFields.filter(field => field.length > 0).length;
    score += filledContextFields * 5;
    
    setSpecificityScore(Math.min(score, 100));
  };

  const generatePersonaPrompt = () => {
    let prompt = '';
    
    // Direct Declaration
    if (persona.directDeclaration) {
      prompt += `# Role Definition\n${persona.directDeclaration}\n\n`;
    }
    
    // Expertise Layers
    if (persona.expertiseLayers.length > 0) {
      prompt += `# Expertise Framework\n`;
      persona.expertiseLayers.forEach((layer, index) => {
        prompt += `## ${layer.title}\n${layer.content}\n\n`;
      });
    }
    
    // Communication Style
    if (Object.values(persona.communicationStyle).some(v => v)) {
      prompt += `# Communication Guidelines\n`;
      if (persona.communicationStyle.tone) prompt += `**Tone:** ${persona.communicationStyle.tone}\n`;
      if (persona.communicationStyle.vocabulary) prompt += `**Vocabulary:** ${persona.communicationStyle.vocabulary}\n`;
      if (persona.communicationStyle.structure) prompt += `**Structure:** ${persona.communicationStyle.structure}\n`;
      if (persona.communicationStyle.examples) prompt += `**Examples:** ${persona.communicationStyle.examples}\n`;
      prompt += '\n';
    }
    
    // Constraints and Boundaries
    if (persona.constraintsBoundaries.length > 0) {
      prompt += `# Constraints and Boundaries\n`;
      persona.constraintsBoundaries.forEach(constraint => {
        prompt += `- ${constraint}\n`;
      });
      prompt += '\n';
    }
    
    // Contextual Framework (5C Framework)
    if (Object.values(persona.contextualFramework).some(v => v)) {
      prompt += `# Contextual Framework\n`;
      if (persona.contextualFramework.field) prompt += `**Field:** ${persona.contextualFramework.field}\n`;
      if (persona.contextualFramework.tenor) prompt += `**Tenor:** ${persona.contextualFramework.tenor}\n`;
      if (persona.contextualFramework.mode) prompt += `**Mode:** ${persona.contextualFramework.mode}\n`;
      prompt += '\n';
    }
    
    prompt += `---\n*Generated with Persona Architect - Specificity Score: ${specificityScore}/100*`;
    
    setGeneratedPrompt(prompt);
  };

  const savePrompt = async () => {
    if (!generatedPrompt) {
      toast.error('No prompt to save');
      return;
    }

    try {
      const promptData = {
        framework: 'Persona Architect',
        generatedPrompt,
        specificityScore,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving persona prompt:', promptData);
      toast.success('Persona prompt saved successfully');
    } catch (err) {
      toast.error('Failed to save prompt');
    }
  };

  const copyPrompt = async () => {
    if (generatedPrompt) {
      try {
        await navigator.clipboard.writeText(generatedPrompt);
        toast.success('Prompt copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy prompt');
      }
    } else {
      toast.error('No prompt to copy');
    }
  };

  const exportConfig = () => {
    try {
      const configData = {
        specificityScore,
        generatedPrompt,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `persona_config_${Date.now()}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Configuration exported successfully');
    } catch (err) {
      toast.error('Failed to export configuration');
    }
  };

  const getSpecificityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getSpecificityLevel = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Medium';
    if (score >= 40) return 'Low';
    return 'Very Low';
  };

  useState(() => {
    calculateSpecificityScore();
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Users className="h-8 w-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Persona Architect</h1>
          <p className="text-gray-600">Systematic role definition with specificity metrics</p>
        </div>
      </div>

      <Alert>
        <Target className="h-4 w-4" />
        <AlertDescription>
          Build high-fidelity AI personas through structured expertise layering, communication style definition, 
          and strategic contextualization. Higher specificity scores lead to more consistent role adherence.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Persona Builder */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="declaration" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="declaration">Declaration</TabsTrigger>
              <TabsTrigger value="expertise">Expertise</TabsTrigger>
              <TabsTrigger value="style">Style</TabsTrigger>
              <TabsTrigger value="context">Context</TabsTrigger>
            </TabsList>

            <TabsContent value="declaration" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Declaration</CardTitle>
                  <CardDescription>
                    Define the core persona with specific expertise and role clarity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="You are a senior data scientist with 10+ years experience in machine learning and statistical analysis, specializing in healthcare AI applications..."
                    value={persona.directDeclaration}
                    onChange={(e) => {
                      setPersona(prev => ({...prev, directDeclaration: e.target.value}));
                      calculateSpecificityScore();
                    }}
                    className="min-h-[120px]"
                  />
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Specificity Tips</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Include years of experience or specific credentials</li>
                      <li>• Mention specialized domains or industries</li>
                      <li>• Reference specific tools, methodologies, or frameworks</li>
                      <li>• Define the scope and limits of expertise</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Constraints and Boundaries</CardTitle>
                  <CardDescription>
                    Define what the persona should and shouldn't do
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 mb-4">
                    <Input
                      placeholder="Add constraint or boundary..."
                      value={newConstraint}
                      onChange={(e) => setNewConstraint(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addConstraint();
                        }
                      }}
                    />
                    <Button onClick={addConstraint}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {persona.constraintsBoundaries.map((constraint, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{constraint}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeConstraint(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="expertise" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Expertise Layer</CardTitle>
                  <CardDescription>
                    Build depth through layered expertise definitions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="layerTitle">Layer Title</Label>
                      <Input
                        id="layerTitle"
                        placeholder="e.g., Domain Knowledge"
                        value={newLayer.title}
                        onChange={(e) => setNewLayer({...newLayer, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="specificity">Specificity Level (1-5)</Label>
                      <select
                        id="specificity"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newLayer.specificity}
                        onChange={(e) => setNewLayer({...newLayer, specificity: Number(e.target.value)})}
                      >
                        <option value={1}>1 - General</option>
                        <option value={2}>2 - Broad</option>
                        <option value={3}>3 - Focused</option>
                        <option value={4}>4 - Specialized</option>
                        <option value={5}>5 - Highly Specific</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="layerContent">Layer Content</Label>
                    <Textarea
                      id="layerContent"
                      placeholder="Detailed description of this expertise layer..."
                      value={newLayer.content}
                      onChange={(e) => setNewLayer({...newLayer, content: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <Button onClick={addExpertiseLayer} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Expertise Layer
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expertise Layers</CardTitle>
                </CardHeader>
                <CardContent>
                  {persona.expertiseLayers.length > 0 ? (
                    <div className="space-y-3">
                      {persona.expertiseLayers.map((layer) => (
                        <div key={layer.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{layer.title}</h4>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">
                                Specificity: {layer.specificity}/5
                              </Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeExpertiseLayer(layer.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{layer.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No expertise layers added yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="style" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Style</CardTitle>
                  <CardDescription>
                    Define how the persona should communicate and interact
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tone">Tone</Label>
                      <Input
                        id="tone"
                        placeholder="e.g., Professional, approachable, analytical"
                        value={persona.communicationStyle.tone}
                        onChange={(e) => setPersona(prev => ({
                          ...prev,
                          communicationStyle: {...prev.communicationStyle, tone: e.target.value}
                        }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="vocabulary">Vocabulary Level</Label>
                      <Input
                        id="vocabulary"
                        placeholder="e.g., Technical, accessible, domain-specific"
                        value={persona.communicationStyle.vocabulary}
                        onChange={(e) => setPersona(prev => ({
                          ...prev,
                          communicationStyle: {...prev.communicationStyle, vocabulary: e.target.value}
                        }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="structure">Response Structure</Label>
                    <Input
                      id="structure"
                      placeholder="e.g., Clear headings, bullet points, step-by-step"
                      value={persona.communicationStyle.structure}
                      onChange={(e) => setPersona(prev => ({
                        ...prev,
                        communicationStyle: {...prev.communicationStyle, structure: e.target.value}
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="examples">Example Usage</Label>
                    <Textarea
                      id="examples"
                      placeholder="Provide examples of how this persona should respond..."
                      value={persona.communicationStyle.examples}
                      onChange={(e) => setPersona(prev => ({
                        ...prev,
                        communicationStyle: {...prev.communicationStyle, examples: e.target.value}
                      }))}
                      className="min-h-[80px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="context" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contextual Framework</CardTitle>
                  <CardDescription>
                    Strategic contextualization using Field, Tenor, and Mode dimensions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="field">Field (Domain Context)</Label>
                    <Textarea
                      id="field"
                      placeholder="The subject matter, industry, or domain context where this persona operates..."
                      value={persona.contextualFramework.field}
                      onChange={(e) => setPersona(prev => ({
                        ...prev,
                        contextualFramework: {...prev.contextualFramework, field: e.target.value}
                      }))}
                      className="min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tenor">Tenor (Relationship Context)</Label>
                    <Textarea
                      id="tenor"
                      placeholder="The relationship dynamics, power structures, and social context..."
                      value={persona.contextualFramework.tenor}
                      onChange={(e) => setPersona(prev => ({
                        ...prev,
                        contextualFramework: {...prev.contextualFramework, tenor: e.target.value}
                      }))}
                      className="min-h-[60px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mode">Mode (Communication Context)</Label>
                    <Textarea
                      id="mode"
                      placeholder="The communication medium, format, and interaction style expectations..."
                      value={persona.contextualFramework.mode}
                      onChange={(e) => setPersona(prev => ({
                        ...prev,
                        contextualFramework: {...prev.contextualFramework, mode: e.target.value}
                      }))}
                      className="min-h-[60px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Specificity Metrics & Output */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-600" />
                <span>Specificity Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className={`text-4xl font-bold px-4 py-2 rounded-lg ${getSpecificityColor(specificityScore)}`}>
                  {specificityScore}/100
                </div>
                <div className="space-y-2">
                  <p className="font-medium">Level: {getSpecificityLevel(specificityScore)}</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{width: `${specificityScore}%`}}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Declaration: {persona.directDeclaration ? '✓' : '✗'}</p>
                  <p>Layers: {persona.expertiseLayers.length}</p>
                  <p>Style: {Object.values(persona.communicationStyle).filter(v => v).length}/4</p>
                  <p>Constraints: {persona.constraintsBoundaries.length}</p>
                  <p>Context: {Object.values(persona.contextualFramework).filter(v => v).length}/3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Persona</span>
                <Button onClick={generatePersonaPrompt} size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedPrompt ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded-lg">
                      {generatedPrompt}
                    </pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={savePrompt} size="sm" className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button onClick={copyPrompt} size="sm" variant="outline" className="flex-1">
                      Copy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Build your persona and generate the prompt
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-gray-600" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                Load Template
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Test Persona
              </Button>
              <Button onClick={exportConfig} variant="outline" size="sm" className="w-full justify-start">
                Export Config
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Compare Versions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
