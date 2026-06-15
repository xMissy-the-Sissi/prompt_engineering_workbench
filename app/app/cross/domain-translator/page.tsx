
'use client';

import React, { useState } from 'react';
import { ArrowLeftRight, Copy, Save, Download, RefreshCw, GitCompareArrows, Brain, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { clipboardUtils } from '@/lib/utils';
import { toast } from 'sonner';

export default function DomainTranslatorPage() {
  const [sourceDomain, setSourceDomain] = useState('technology');
  const [targetDomain, setTargetDomain] = useState('biology');
  const [inputConcept, setInputConcept] = useState('');
  const [translationApproach, setTranslationApproach] = useState('metaphorical');
  const [generatedTranslation, setGeneratedTranslation] = useState('');
  const [translationMatrix, setTranslationMatrix] = useState('');

  const domains = [
    { id: 'technology', name: 'Technology', description: 'Software, hardware, digital systems' },
    { id: 'biology', name: 'Biology', description: 'Living systems, organisms, life processes' },
    { id: 'physics', name: 'Physics', description: 'Matter, energy, forces, physical laws' },
    { id: 'psychology', name: 'Psychology', description: 'Mind, behavior, cognition, emotion' },
    { id: 'economics', name: 'Economics', description: 'Markets, resources, value, exchange' },
    { id: 'architecture', name: 'Architecture', description: 'Structures, space, design, function' },
    { id: 'music', name: 'Music', description: 'Sound, rhythm, harmony, composition' },
    { id: 'cooking', name: 'Cooking', description: 'Ingredients, processes, flavors, techniques' },
    { id: 'sports', name: 'Sports', description: 'Competition, strategy, physical performance' },
    { id: 'art', name: 'Art', description: 'Visual expression, creativity, aesthetics' }
  ];

  const translationApproaches = [
    { id: 'metaphorical', name: 'Metaphorical Mapping', description: 'Direct conceptual analogies' },
    { id: 'structural', name: 'Structural Isomorphism', description: 'Pattern and relationship mapping' },
    { id: 'functional', name: 'Functional Equivalence', description: 'Purpose and role translation' },
    { id: 'procedural', name: 'Procedural Translation', description: 'Process and workflow mapping' },
    { id: 'hierarchical', name: 'Hierarchical Mapping', description: 'Level and scale correspondence' },
    { id: 'evolutionary', name: 'Evolutionary Adaptation', description: 'Progressive domain bridging' }
  ];

  const translationExamples = {
    'technology-biology': {
      'network': 'neural pathways',
      'virus': 'malicious code',
      'memory': 'genetic encoding',
      'processing': 'metabolism',
      'interface': 'cell membrane'
    },
    'biology-technology': {
      'evolution': 'iterative development',
      'ecosystem': 'software architecture',
      'symbiosis': 'API integration',
      'adaptation': 'machine learning',
      'reproduction': 'code replication'
    }
  };

  const generateTranslation = () => {
    if (!inputConcept.trim()) {
      toast.error('Please enter a concept to translate');
      return;
    }

    const sourceInfo = domains.find(d => d.id === sourceDomain);
    const targetInfo = domains.find(d => d.id === targetDomain);
    const approachInfo = translationApproaches.find(a => a.id === translationApproach);

    const translation = `DOMAIN TRANSLATION ANALYSIS

SOURCE DOMAIN: ${sourceInfo?.name}
Context: ${sourceInfo?.description}

TARGET DOMAIN: ${targetInfo?.name}  
Context: ${targetInfo?.description}

TRANSLATION APPROACH: ${approachInfo?.name}
Method: ${approachInfo?.description}

INPUT CONCEPT: "${inputConcept}"

TRANSLATION MATRIX:
${generateTranslationMatrix()}

TRANSLATED CONCEPT:
${generateTranslatedConcept()}

BIDIRECTIONAL MAPPING:
${generateBidirectionalMapping()}

VALIDATION CRITERIA:
${generateValidationCriteria()}

IMPLEMENTATION STRATEGY:
${generateImplementationStrategy()}`;

    setGeneratedTranslation(translation);
    
    // Generate separate translation matrix
    const matrix = generateTranslationMatrix();
    setTranslationMatrix(matrix);
    
    toast.success('Translation generated successfully');
  };

  const generateTranslationMatrix = () => {
    const approaches = {
      'metaphorical': `1. Identify core metaphorical relationships
2. Map conceptual similarities
3. Preserve essential meaning
4. Adapt contextual elements`,
      
      'structural': `1. Analyze structural patterns
2. Map relationship hierarchies  
3. Preserve organizational logic
4. Adapt scale and scope`,
      
      'functional': `1. Identify core functions
2. Map purposeful elements
3. Preserve operational logic
4. Adapt implementation methods`,
      
      'procedural': `1. Break down processes
2. Map sequential steps
3. Preserve workflow logic
4. Adapt execution methods`,
      
      'hierarchical': `1. Map authority structures
2. Preserve power relationships
3. Adapt organizational levels
4. Maintain command flows`,
      
      'evolutionary': `1. Trace development patterns
2. Map adaptation strategies
3. Preserve growth logic
4. Adapt environmental factors`
    };

    return approaches[translationApproach as keyof typeof approaches] || approaches.metaphorical;
  };

  const generateTranslatedConcept = () => {
    const conceptTransforms = {
      'metaphorical': `"${inputConcept}" → Conceptual bridge: Like a ${targetDomain} equivalent that shares essential characteristics`,
      'structural': `"${inputConcept}" → Structural analog: System pattern that mirrors organizational principles`,
      'functional': `"${inputConcept}" → Functional equivalent: Process that serves the same purpose in ${targetDomain}`,
      'procedural': `"${inputConcept}" → Procedural analog: Workflow that follows similar operational steps`,
      'hierarchical': `"${inputConcept}" → Hierarchical equivalent: Structure with corresponding levels of organization`,
      'evolutionary': `"${inputConcept}" → Evolutionary analog: Development pattern that follows similar adaptive principles`
    };

    return conceptTransforms[translationApproach as keyof typeof conceptTransforms];
  };

  const generateBidirectionalMapping = () => {
    return `Forward Translation (${sourceDomain} → ${targetDomain}):
- Preserve: Core functional relationships
- Adapt: Context-specific terminology
- Transform: Domain-specific processes

Reverse Translation (${targetDomain} → ${sourceDomain}):
- Maintain: Essential operational logic
- Convert: Domain-appropriate language
- Reconstruct: Original conceptual framework`;
  };

  const generateValidationCriteria = () => {
    return `1. Functional Fidelity: Does the translation preserve core functionality?
2. Contextual Appropriateness: Does it fit naturally in the target domain?
3. Explanatory Power: Does it clarify understanding of both concepts?
4. Operational Viability: Can it be practically implemented?
5. Conceptual Coherence: Is the mapping logically consistent?`;
  };

  const generateImplementationStrategy = () => {
    return `Phase 1: Establish conceptual foundation
- Define domain boundaries
- Identify key mapping points
- Validate core relationships

Phase 2: Develop translation protocols
- Create systematic mapping rules
- Test with sample concepts
- Refine translation accuracy

Phase 3: Deploy cross-domain bridge
- Implement translation interface
- Monitor translation quality
- Iterate based on feedback`;
  };

  const copyTranslation = () => {
    clipboardUtils.copyToClipboard(generatedTranslation, 'Domain translation copied to clipboard');
  };

  const saveTranslation = () => {
    if (!generatedTranslation) {
      return;
    }

    const translationData = {
      sourceDomain,
      targetDomain,
      inputConcept,
      translationApproach,
      generatedTranslation,
      timestamp: new Date().toISOString()
    };
    
    clipboardUtils.saveData(translationData, `domain_translation_${sourceDomain}_to_${targetDomain}_${Date.now()}`, 'Domain translation saved successfully');
  };

  const exportTranslation = () => {
    if (!generatedTranslation) {
      return;
    }

    clipboardUtils.exportData(generatedTranslation, `domain_translation_${sourceDomain}_to_${targetDomain}_${Date.now()}.txt`, 'Domain translation exported successfully');
  };

  const loadExample = () => {
    setSourceDomain('technology');
    setTargetDomain('biology');
    setInputConcept('network architecture');
    setTranslationApproach('structural');
    toast.info('Example loaded');
  };

  const clearAll = () => {
    setInputConcept('');
    setGeneratedTranslation('');
    setTranslationMatrix('');
    toast.info('Form cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <ArrowLeftRight className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Domain Translator</h1>
            <p className="text-lg text-gray-600">Universal translation matrices for cross-domain concept bridging</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>• Metaphorical Mapping</span>
          <span>• Structural Isomorphism</span>
          <span>• Functional Equivalence</span>
          <span>• Bidirectional Translation</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <div className="flex gap-2">
            <Button onClick={loadExample} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Load Example
            </Button>
            <Button onClick={clearAll} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GitCompareArrows className="h-5 w-5" />
                <span>Translation Configuration</span>
              </CardTitle>
              <CardDescription>
                Configure the domain translation parameters and approach
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="source-domain">Source Domain</Label>
                  <Select value={sourceDomain} onValueChange={setSourceDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map(domain => (
                        <SelectItem key={domain.id} value={domain.id}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    {domains.find(d => d.id === sourceDomain)?.description}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-domain">Target Domain</Label>
                  <Select value={targetDomain} onValueChange={setTargetDomain}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target domain" />
                    </SelectTrigger>
                    <SelectContent>
                      {domains.map(domain => (
                        <SelectItem key={domain.id} value={domain.id}>
                          {domain.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    {domains.find(d => d.id === targetDomain)?.description}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="translation-approach">Translation Approach</Label>
                <Select value={translationApproach} onValueChange={setTranslationApproach}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select approach" />
                  </SelectTrigger>
                  <SelectContent>
                    {translationApproaches.map(approach => (
                      <SelectItem key={approach.id} value={approach.id}>
                        {approach.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {translationApproaches.find(a => a.id === translationApproach)?.description}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="input-concept">Concept to Translate</Label>
                <Input
                  id="input-concept"
                  value={inputConcept}
                  onChange={(e) => setInputConcept(e.target.value)}
                  placeholder="Enter the concept to translate across domains..."
                />
              </div>

              <Button onClick={generateTranslation} className="w-full">
                <Brain className="h-4 w-4 mr-2" />
                Generate Translation
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Generated Translation</span>
                  </CardTitle>
                  <CardDescription>
                    Cross-domain concept translation and mapping
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={copyTranslation} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={saveTranslation} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportTranslation} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedTranslation}
                onChange={(e) => setGeneratedTranslation(e.target.value)}
                placeholder="Click 'Generate Translation' to create a cross-domain concept bridge..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle>Domain Translation Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Universal Mapping</h4>
              <p className="text-gray-600 text-sm">
                Create systematic bridges between any two domains using multiple translation 
                approaches and validated mapping principles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Bidirectional Translation</h4>
              <p className="text-gray-600 text-sm">
                Enable concepts to be translated in both directions while preserving 
                essential meaning and functional relationships.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Validation Framework</h4>
              <p className="text-gray-600 text-sm">
                Ensure translation quality through systematic validation criteria 
                covering fidelity, appropriateness, and operational viability.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

