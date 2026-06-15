
'use client';

import React, { useState } from 'react';
import { Copy, Save, Download, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { PALSPrompt } from '@/lib/types';
import { clipboardUtils } from '@/lib/utils';

const palsLayers = [
  {
    key: 'persona' as keyof PALSPrompt,
    title: 'Persona Layer',
    description: 'Define the AI\'s role, expertise, and perspective',
    tooltip: 'Establishes the AI\'s identity, knowledge domain, and speaking voice. This layer activates specific mental models and expertise areas.',
    placeholder: 'You are an expert software architect with 15 years of experience in distributed systems...'
  },
  {
    key: 'audience' as keyof PALSPrompt,
    title: 'Audience Layer', 
    description: 'Specify the target audience and communication style',
    tooltip: 'Defines who the response is for, their knowledge level, and preferred communication style. Controls register and technical depth.',
    placeholder: 'Your audience consists of senior developers who are familiar with microservices but new to event-driven architecture...'
  },
  {
    key: 'logic' as keyof PALSPrompt,
    title: 'Logic Layer',
    description: 'Structure the reasoning approach and methodology',
    tooltip: 'Activates specific reasoning pathways and mental models. Controls whether to use analytical, creative, or systematic thinking approaches.',
    placeholder: 'Use a systematic analysis approach: first analyze requirements, then evaluate trade-offs, finally recommend solutions...'
  },
  {
    key: 'structure' as keyof PALSPrompt,
    title: 'Structure Layer',
    description: 'Define the format and organization of the response',
    tooltip: 'Controls grammar, syntax, and formal structure. Ensures syntactic correctness and consistent formatting patterns.',
    placeholder: 'Format your response as: 1) Executive Summary 2) Technical Analysis 3) Implementation Steps 4) Risk Assessment...'
  },
  {
    key: 'style' as keyof PALSPrompt,
    title: 'Style Layer',
    description: 'Set the tone, voice, and linguistic preferences',
    tooltip: 'Controls the linguistic style, tone, and voice. Manages formal vs informal register, technical vs accessible language.',
    placeholder: 'Use a professional but approachable tone. Prefer concrete examples over abstract concepts. Be direct and actionable...'
  },
  {
    key: 'safety' as keyof PALSPrompt,
    title: 'Safety Layer',
    description: 'Establish boundaries, ethics, and knowledge limitations',
    tooltip: 'Manages relationship to knowledge and truth. Controls confidence calibration, attribution, and ethical boundaries.',
    placeholder: 'If uncertain about any technical details, clearly state your confidence level. Avoid recommending unproven technologies...'
  }
];

export default function PALSBuilder() {
  const [prompt, setPrompt] = useState<PALSPrompt>({
    persona: '',
    audience: '',
    logic: '',
    structure: '',
    style: '',
    safety: ''
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');

  React.useEffect(() => {
    const layers = Object.entries(prompt)
      .filter(([_, value]) => value?.trim())
      .map(([key, value]) => {
        const layer = palsLayers.find(l => l.key === key);
        return `${layer?.title}: ${value}`;
      });
    
    setGeneratedPrompt(layers.join('\n\n'));
  }, [prompt]);

  const handleLayerChange = (key: keyof PALSPrompt, value: string) => {
    setPrompt(prev => ({ ...prev, [key]: value }));
  };

  const copyPrompt = () => {
    clipboardUtils.copyToClipboard(generatedPrompt, 'PALS prompt copied to clipboard');
  };

  const savePrompt = () => {
    if (!generatedPrompt) {
      return;
    }

    const promptData = {
      framework: 'PALS',
      content: prompt,
      generatedPrompt,
      timestamp: new Date().toISOString()
    };
    
    clipboardUtils.saveData(promptData, `pals_prompt_${Date.now()}`, 'PALS prompt saved successfully');
  };

  const clearAll = () => {
    setPrompt({
      persona: '',
      audience: '',
      logic: '',
      structure: '',
      style: '',
      safety: ''
    });
  };

  const loadExample = () => {
    setPrompt({
      persona: 'You are an expert technical writer and software architect with deep expertise in system design and developer documentation.',
      audience: 'Your audience consists of software engineers ranging from mid-level to senior, who need clear, actionable guidance for implementing complex systems.',
      logic: 'Use a systematic approach: start with core concepts, provide concrete examples, then show implementation patterns. Always connect abstract ideas to practical applications.',
      structure: 'Organize your response as: 1) Brief overview 2) Key concepts with examples 3) Step-by-step implementation 4) Common pitfalls and solutions 5) Further resources.',
      style: 'Use clear, professional language with concrete examples. Prefer active voice and specific terminology. Include code snippets where helpful.',
      safety: 'If uncertain about implementation details, clearly state assumptions. Recommend established patterns over experimental approaches. Always mention testing and validation steps.'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">PALS Prompt Builder</h1>
        <p className="text-gray-600">
          Construct sophisticated prompts using the 6-layer PALS architecture
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Builder Panel */}
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

          {palsLayers.map((layer) => (
            <Card key={layer.key} className="hover:shadow-sm transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{layer.title}</CardTitle>
                    <CardDescription>{layer.description}</CardDescription>
                  </div>
                  <InfoTooltip content={layer.tooltip} />
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={layer.placeholder}
                  value={prompt[layer.key]}
                  onChange={(e) => handleLayerChange(layer.key, e.target.value)}
                  className="min-h-[100px] resize-y"
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Output Panel */}
        <div className="space-y-4">
          <Card className="sticky top-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Generated Prompt</CardTitle>
                  <CardDescription>
                    Live preview of your PALS-structured prompt
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={copyPrompt} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={savePrompt} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
                {generatedPrompt ? (
                  <pre className="whitespace-pre-wrap text-sm text-gray-700">
                    {generatedPrompt}
                  </pre>
                ) : (
                  <p className="text-gray-500 italic">
                    Start filling in the layers above to see your prompt preview here...
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg">About PALS Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Core Layers</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Structural: Grammar & syntax control</li>
                <li>• Meaning: Semantic & discourse structure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Meta Layers</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Cognitive: Mental models & reasoning</li>
                <li>• Functional: Social context & purpose</li>
                <li>• Trust & Epistemics: Knowledge relationship</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Multimodal Layer</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Cross-Modal Semiotics</li>
                <li>• Different data type orchestration</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
