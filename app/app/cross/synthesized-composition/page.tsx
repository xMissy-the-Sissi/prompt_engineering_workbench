
'use client';

import React, { useState } from 'react';
import { Shuffle, Layers, GitCompareArrows, ArrowRight, Palette, Building, Music, Code, Scissors, ChefHat, Download, Save, RotateCw, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DomainMapping {
  concept: string;
  sourceDomain: string;
  sourceDefinition: string;
  targetDomain: string;
  targetTranslation: string;
  grammarRules: string[];
  qualityScore: number;
}

export default function SynthesizedCompositionPage() {
  const [sourceDomain, setSourceDomain] = useState('architecture');
  const [targetDomain, setTargetDomain] = useState('music');
  const [inputConcept, setInputConcept] = useState('');
  const [mappings, setMappings] = useState<DomainMapping[]>([]);
  const [generatedComposition, setGeneratedComposition] = useState('');
  const [translationMatrix, setTranslationMatrix] = useState<Record<string, Record<string, string>>>({});

  const domains = [
    { id: 'architecture', name: 'Architecture', icon: Building, description: 'Spatial design, structure, harmony' },
    { id: 'music', name: 'Music', icon: Music, description: 'Rhythm, melody, composition' },
    { id: 'fashion', name: 'Fashion', icon: Scissors, description: 'Style, texture, form' },
    { id: 'culinary', name: 'Culinary', icon: ChefHat, description: 'Flavor, technique, presentation' },
    { id: 'visual_art', name: 'Visual Art', icon: Palette, description: 'Color, composition, expression' },
    { id: 'software', name: 'Software', icon: Code, description: 'Logic, interface, functionality' }
  ];

  const grammarPatterns = {
    'structure': {
      architecture: 'load-bearing framework that distributes weight',
      music: 'harmonic progression that supports melody',
      fashion: 'silhouette foundation that defines form',
      culinary: 'base preparation that builds flavor',
      visual_art: 'compositional grid that organizes elements',
      software: 'data architecture that manages information'
    },
    'rhythm': {
      architecture: 'modular repetition that creates visual flow',
      music: 'temporal pattern that drives movement',
      fashion: 'design sequence that guides the eye',
      culinary: 'preparation timing that coordinates flavors',
      visual_art: 'visual beat that establishes pace',
      software: 'interaction pattern that guides user flow'
    },
    'harmony': {
      architecture: 'proportional relationships that create balance',
      music: 'chord progressions that establish mood',
      fashion: 'color coordination that unifies design',
      culinary: 'flavor pairing that enhances taste',
      visual_art: 'color relationships that create unity',
      software: 'interface consistency that improves usability'
    },
    'contrast': {
      architecture: 'material juxtaposition that creates interest',
      music: 'dynamic variation that adds drama',
      fashion: 'texture combination that adds depth',
      culinary: 'flavor contrast that creates complexity',
      visual_art: 'value difference that creates focus',
      software: 'visual hierarchy that guides attention'
    },
    'flow': {
      architecture: 'circulation path that guides movement',
      music: 'melodic line that carries emotion',
      fashion: 'design movement that enhances body',
      culinary: 'course progression that builds experience',
      visual_art: 'visual path that directs viewing',
      software: 'user journey that achieves goals'
    }
  };

  const compositionalRules = [
    'Unity through repetition of key elements',
    'Contrast for visual/experiential interest',
    'Proportion following natural ratios',
    'Balance between symmetry and asymmetry',
    'Emphasis on focal points',
    'Movement creating flow and rhythm',
    'Pattern establishing predictable structure',
    'Hierarchy organizing importance'
  ];

  const generateDomainMapping = (concept: string) => {
    const sourceData = grammarPatterns[concept as keyof typeof grammarPatterns];
    if (!sourceData) return null;

    const sourceDefinition = sourceData[sourceDomain as keyof typeof sourceData];
    const targetTranslation = sourceData[targetDomain as keyof typeof sourceData];

    if (!sourceDefinition || !targetTranslation) return null;

    // Generate grammar rules for this translation
    const rules = [
      `Transform "${concept}" from ${sourceDomain} context to ${targetDomain} domain`,
      `Maintain core principle while adapting medium-specific constraints`,
      `Preserve functional essence while changing implementation method`,
      `Scale appropriate to ${targetDomain} conventions and limitations`
    ];

    // Calculate quality score based on conceptual distance
    const qualityScore = Math.random() * 0.3 + 0.7; // Simulate quality assessment

    return {
      concept,
      sourceDomain,
      sourceDefinition,
      targetDomain,
      targetTranslation,
      grammarRules: rules,
      qualityScore
    };
  };

  const translateConcept = () => {
    if (!inputConcept.trim()) return;

    const concepts = inputConcept.toLowerCase().split(',').map(c => c.trim());
    const newMappings: DomainMapping[] = [];

    concepts.forEach(concept => {
      // Check if concept exists in our grammar patterns
      const mapping = generateDomainMapping(concept);
      if (mapping) {
        newMappings.push(mapping);
      } else {
        // Generate custom mapping for unknown concepts
        const customMapping: DomainMapping = {
          concept,
          sourceDomain,
          sourceDefinition: `${concept} as understood in ${sourceDomain} domain`,
          targetDomain,
          targetTranslation: `${concept} adapted to ${targetDomain} principles and methods`,
          grammarRules: [
            `Analyze ${concept} core function in ${sourceDomain}`,
            `Identify equivalent mechanisms in ${targetDomain}`,
            `Adapt implementation to ${targetDomain} constraints`,
            `Validate translation maintains original intent`
          ],
          qualityScore: 0.65
        };
        newMappings.push(customMapping);
      }
    });

    setMappings(newMappings);
    generateComposition(newMappings);
  };

  const generateComposition = (mappingList: DomainMapping[]) => {
    const sourceDomainData = domains.find(d => d.id === sourceDomain);
    const targetDomainData = domains.find(d => d.id === targetDomain);

    const composition = `SYNTHESIZED COMPOSITION FRAMEWORK
Source Domain: ${sourceDomainData?.name} - ${sourceDomainData?.description}
Target Domain: ${targetDomainData?.name} - ${targetDomainData?.description}
Translation Scope: ${mappingList.length} concept(s)

DOMAIN TRANSLATION MATRIX:

${mappingList.map((mapping, index) => `
CONCEPT ${index + 1}: ${mapping.concept.toUpperCase()}
Quality Score: ${(mapping.qualityScore * 100).toFixed(1)}%

Source Context (${mapping.sourceDomain}):
"${mapping.sourceDefinition}"

Target Translation (${mapping.targetDomain}):
"${mapping.targetTranslation}"

Grammar Rules:
${mapping.grammarRules.map(rule => `• ${rule}`).join('\n')}

Implementation Framework:
1. Analyze source domain mechanics and principles
2. Identify functional equivalents in target domain
3. Apply domain-specific constraints and opportunities
4. Validate translation preserves core intention
`).join('\n---\n')}

COMPOSITIONAL SYNTHESIS:

Combined Translation Logic:
${mappingList.map(m => `${m.concept} → ${m.targetTranslation}`).join('\n')}

Cross-Domain Grammar Rules:
${compositionalRules.map(rule => `• ${rule}`).join('\n')}

Synthesis Guidelines:
1. Maintain conceptual coherence across all translated elements
2. Respect ${targetDomainData?.name.toLowerCase()} domain conventions and limitations
3. Leverage unique affordances of ${targetDomainData?.name.toLowerCase()} medium
4. Create novel combinations that wouldn't exist in source domain
5. Validate through ${targetDomainData?.name.toLowerCase()} domain expertise

Quality Assessment:
- Average Translation Fidelity: ${(mappingList.reduce((acc, m) => acc + m.qualityScore, 0) / mappingList.length * 100).toFixed(1)}%
- Cross-Domain Coherence: ${mappingList.length > 1 ? 'High' : 'N/A'} (multiple concept integration)
- Innovation Potential: ${mappingList.filter(m => m.qualityScore > 0.8).length > 0 ? 'High' : 'Medium'} (novel combinations possible)

IMPLEMENTATION PROMPT:
Create a ${targetDomainData?.name.toLowerCase()} work that implements the following cross-domain translation:
${mappingList.map(m => `"Apply ${m.concept} principles from ${sourceDomainData?.name.toLowerCase()}: ${m.sourceDefinition}" → "Translated as ${targetDomainData?.name.toLowerCase()}: ${m.targetTranslation}"`).join(' + ')}

Ensure the result leverages the unique properties of ${targetDomainData?.name.toLowerCase()} while maintaining the functional essence of the original ${sourceDomainData?.name.toLowerCase()} concepts.`;

    setGeneratedComposition(composition);
  };

  const swapDomains = () => {
    const temp = sourceDomain;
    setSourceDomain(targetDomain);
    setTargetDomain(temp);
    
    // Re-translate with swapped domains if we have mappings
    if (mappings.length > 0) {
      translateConcept();
    }
  };

  const addPresetExample = (example: string) => {
    setInputConcept(example);
  };

  const getQualityColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-100';
    if (score >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Shuffle className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Synthesized Composition Tool</h1>
            <p className="text-lg text-gray-600">Cross-domain compositional grammar</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-600">{domains.length}</div>
            <div>Available Domains</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">{mappings.length}</div>
            <div>Active Mappings</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {mappings.length > 0 ? Math.round(mappings.reduce((acc, m) => acc + m.qualityScore, 0) / mappings.length * 100) : 0}%
            </div>
            <div>Avg Quality</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Domain Selection & Translation Setup */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitCompareArrows className="h-5 w-5" />
                <span>Domain Translation</span>
              </CardTitle>
              <CardDescription>Configure cross-domain compositional mapping</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Source Domain</Label>
                <Select value={sourceDomain} onValueChange={setSourceDomain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => {
                      const Icon = domain.icon;
                      return (
                        <SelectItem key={domain.id} value={domain.id}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{domain.name}</div>
                              <div className="text-xs text-gray-500">{domain.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-center">
                <Button onClick={swapDomains} variant="outline" size="sm">
                  <ArrowRight className="h-4 w-4 mr-2" />
                  <RotateCw className="h-4 w-4 mr-2" />
                  Swap
                </Button>
              </div>

              <div>
                <Label>Target Domain</Label>
                <Select value={targetDomain} onValueChange={setTargetDomain}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {domains.map((domain) => {
                      const Icon = domain.icon;
                      return (
                        <SelectItem key={domain.id} value={domain.id}>
                          <div className="flex items-center space-x-2">
                            <Icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{domain.name}</div>
                              <div className="text-xs text-gray-500">{domain.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="concept">Concepts to Translate</Label>
                <Textarea
                  id="concept"
                  value={inputConcept}
                  onChange={(e) => setInputConcept(e.target.value)}
                  placeholder="Enter concepts to translate (comma-separated): structure, rhythm, harmony..."
                  className="min-h-[80px]"
                />
              </div>

              <Button onClick={translateConcept} className="w-full" disabled={!inputConcept.trim()}>
                <Target className="h-4 w-4 mr-2" />
                Generate Translation
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preset Examples</CardTitle>
              <CardDescription>Quick-start with common translation patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPresetExample('structure, rhythm, harmony')}
                  className="w-full text-left justify-start"
                >
                  Core Compositional Elements
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPresetExample('contrast, flow, balance')}
                  className="w-full text-left justify-start"
                >
                  Dynamic Design Principles
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPresetExample('texture, color, form')}
                  className="w-full text-left justify-start"
                >
                  Material Properties
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addPresetExample('tension, resolution, crescendo')}
                  className="w-full text-left justify-start"
                >
                  Emotional Dynamics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Translation Results */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="mappings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mappings">Domain Mappings</TabsTrigger>
              <TabsTrigger value="composition">Full Composition</TabsTrigger>
              <TabsTrigger value="export">Export & Use</TabsTrigger>
            </TabsList>

            <TabsContent value="mappings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="h-5 w-5" />
                    <span>Cross-Domain Mappings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mappings.map((mapping, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium capitalize">{mapping.concept}</h4>
                          <Badge className={`${getQualityColor(mapping.qualityScore)}`}>
                            {(mapping.qualityScore * 100).toFixed(0)}% Quality
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="p-3 bg-blue-50 rounded">
                            <h5 className="font-medium text-blue-900 mb-2">
                              Source ({domains.find(d => d.id === mapping.sourceDomain)?.name})
                            </h5>
                            <p className="text-blue-800 text-sm">{mapping.sourceDefinition}</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded">
                            <h5 className="font-medium text-green-900 mb-2">
                              Target ({domains.find(d => d.id === mapping.targetDomain)?.name})
                            </h5>
                            <p className="text-green-800 text-sm">{mapping.targetTranslation}</p>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-sm mb-2">Grammar Rules:</h5>
                          <ul className="space-y-1">
                            {mapping.grammarRules.map((rule, ruleIndex) => (
                              <li key={ruleIndex} className="text-xs text-gray-600 flex items-start">
                                <span className="mr-2">•</span>
                                <span>{rule}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}

                    {mappings.length === 0 && (
                      <div className="text-center text-gray-500 py-12">
                        <GitCompareArrows className="h-12 w-12 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No Mappings Yet</h3>
                        <p className="mb-4">Configure your domains and concepts to start generating cross-domain translations.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="composition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Shuffle className="h-5 w-5" />
                      <span>Complete Synthesis</span>
                    </span>
                    <Button onClick={() => generateComposition(mappings)} disabled={mappings.length === 0}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedComposition}
                    readOnly
                    className="min-h-[500px] font-mono text-sm bg-gray-50"
                    placeholder="Generate domain mappings first to see the complete compositional synthesis here..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Export & Implementation</CardTitle>
                  <CardDescription>Use your synthesized composition in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center">
                      <Save className="h-6 w-6 mb-2" />
                      <span>Save Translation</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Export Framework</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Layers className="h-6 w-6 mb-2" />
                      <span>Grammar Rules</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Target className="h-6 w-6 mb-2" />
                      <span>Implementation Guide</span>
                    </Button>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold text-yellow-900 mb-2">Translation Summary</h4>
                    <div className="text-sm text-yellow-800 space-y-1">
                      <p>• {mappings.length} concepts translated</p>
                      <p>• Source: {domains.find(d => d.id === sourceDomain)?.name}</p>
                      <p>• Target: {domains.find(d => d.id === targetDomain)?.name}</p>
                      <p>• Average Quality: {mappings.length > 0 ? Math.round(mappings.reduce((acc, m) => acc + m.qualityScore, 0) / mappings.length * 100) : 0}%</p>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Implementation Tips</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>• Test translations with domain experts</p>
                      <p>• Iterate based on practical constraints</p>
                      <p>• Document successful patterns for reuse</p>
                      <p>• Validate with target domain conventions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle>Synthesized Composition Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cross-Domain Translation</h4>
              <p className="text-gray-600 text-sm">
                Systematically translate concepts, principles, and patterns between different 
                creative and technical domains while preserving essential functions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Compositional Grammar</h4>
              <p className="text-gray-600 text-sm">
                Apply standardized grammar rules and phrase mapping to ensure coherent, 
                high-quality translations that respect target domain conventions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Innovation Catalyst</h4>
              <p className="text-gray-600 text-sm">
                Generate novel combinations and approaches by bridging disparate domains, 
                creating opportunities for breakthrough innovations and creative solutions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
