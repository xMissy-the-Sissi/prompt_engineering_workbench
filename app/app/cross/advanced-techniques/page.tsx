
'use client';

import React, { useState } from 'react';
import { Shuffle, Layers, Brain, Target, TrendingUp, Settings, Play, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TechniqueConfig {
  chainOfThought: boolean;
  treeOfThoughts: boolean;
  fewShotLearning: boolean;
  zeroShotLearning: boolean;
  selfConsistency: boolean;
}

export default function AdvancedTechniquesPage() {
  const [techniques, setTechniques] = useState<TechniqueConfig>({
    chainOfThought: true,
    treeOfThoughts: true,
    fewShotLearning: true,
    zeroShotLearning: false,
    selfConsistency: true
  });

  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [thinkingDepth, setThinkingDepth] = useState(3);
  const [basePrompt, setBasePrompt] = useState('');
  const [optimizedPrompt, setOptimizedPrompt] = useState('');
  const [performanceMetrics, setPerformanceMetrics] = useState({
    accuracy: 0,
    efficiency: 0,
    consistency: 0
  });

  const techniqueDescriptions = {
    chainOfThought: {
      name: 'Chain-of-Thought (CoT)',
      description: 'Step-by-step reasoning through complex problems',
      benefit: 'Improved logical reasoning and explanation quality'
    },
    treeOfThoughts: {
      name: 'Tree-of-Thoughts (ToT)',
      description: 'Explore multiple reasoning paths simultaneously',
      benefit: 'Enhanced problem-solving through parallel exploration'
    },
    fewShotLearning: {
      name: 'Few-Shot Learning',
      description: 'Provide examples to guide response patterns',
      benefit: 'Better task understanding and format consistency'
    },
    zeroShotLearning: {
      name: 'Zero-Shot Learning',
      description: 'Task completion without specific examples',
      benefit: 'Generalization to novel scenarios'
    },
    selfConsistency: {
      name: 'Self-Consistency',
      description: 'Generate multiple responses and synthesize best answer',
      benefit: 'Improved reliability and confidence'
    }
  };

  const updateTechnique = (technique: keyof TechniqueConfig, enabled: boolean) => {
    setTechniques(prev => ({ ...prev, [technique]: enabled }));
  };

  const generateOptimizedPrompt = () => {
    const enabledTechniques = Object.entries(techniques)
      .filter(([_, enabled]) => enabled)
      .map(([technique, _]) => technique);

    if (enabledTechniques.length === 0 || !basePrompt.trim()) {
      return;
    }

    let optimized = `ADVANCED PROMPTING INTEGRATION\n\n`;
    optimized += `TASK: ${basePrompt}\n\n`;

    optimized += `TECHNIQUE STACK:\n`;
    enabledTechniques.forEach(technique => {
      const desc = techniqueDescriptions[technique as keyof typeof techniqueDescriptions];
      optimized += `✓ ${desc.name}: ${desc.description}\n`;
    });

    optimized += `\nOPTIMIZATION PARAMETERS:\n`;
    optimized += `- Temperature: ${temperature} (creativity control)\n`;
    optimized += `- Top-P: ${topP} (diversity control)\n`;
    optimized += `- Thinking Depth: ${thinkingDepth} levels\n\n`;

    if (techniques.chainOfThought) {
      optimized += `CHAIN-OF-THOUGHT INSTRUCTIONS:\n`;
      optimized += `Think through this step-by-step:\n`;
      optimized += `1. Break down the problem into manageable components\n`;
      optimized += `2. Address each component systematically\n`;
      optimized += `3. Show your reasoning process clearly\n`;
      optimized += `4. Connect your steps to reach a conclusion\n\n`;
    }

    if (techniques.treeOfThoughts) {
      optimized += `TREE-OF-THOUGHTS EXPLORATION:\n`;
      optimized += `Consider multiple reasoning paths:\n`;
      optimized += `• Path A: [Primary approach]\n`;
      optimized += `• Path B: [Alternative approach]\n`;
      optimized += `• Path C: [Creative approach]\n`;
      optimized += `Evaluate each path and synthesize the best elements.\n\n`;
    }

    if (techniques.fewShotLearning) {
      optimized += `FEW-SHOT EXAMPLES:\n`;
      optimized += `Example 1: [Provide relevant example]\n`;
      optimized += `Example 2: [Provide relevant example]\n`;
      optimized += `Example 3: [Provide relevant example]\n`;
      optimized += `Follow the pattern established in these examples.\n\n`;
    }

    if (techniques.selfConsistency) {
      optimized += `SELF-CONSISTENCY CHECK:\n`;
      optimized += `1. Generate your initial response\n`;
      optimized += `2. Verify consistency across all elements\n`;
      optimized += `3. Check for logical contradictions\n`;
      optimized += `4. Refine if necessary for coherence\n\n`;
    }

    optimized += `INTEGRATION STRATEGY:\n`;
    if (enabledTechniques.length > 1) {
      optimized += `Sequential Processing: Apply techniques in optimal order\n`;
      optimized += `Parallel Validation: Cross-check results between methods\n`;
      optimized += `Adaptive Selection: Choose most appropriate technique per subtask\n`;
    }

    optimized += `\nOUTPUT REQUIREMENTS:\n`;
    optimized += `- Demonstrate clear reasoning process\n`;
    optimized += `- Maintain consistency across all components\n`;
    optimized += `- Provide confidence indicators where applicable\n`;
    optimized += `- Include self-validation of final answer\n`;

    setOptimizedPrompt(optimized);

    // Simulate performance metrics
    const baseAccuracy = 0.6;
    const techniqueBonus = enabledTechniques.length * 0.08;
    const synergBonus = enabledTechniques.length > 1 ? 0.05 : 0;
    const consistency = techniques.selfConsistency ? 0.95 : 0.75;
    
    setPerformanceMetrics({
      accuracy: Math.min(baseAccuracy + techniqueBonus + synergBonus, 0.98),
      efficiency: Math.max(0.95 - (enabledTechniques.length * 0.05), 0.65),
      consistency: consistency
    });
  };

  const activeTechniques = Object.values(techniques).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Shuffle className="h-8 w-8 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Advanced Techniques Integration</h1>
            <p className="text-lg text-gray-600">Combine multiple prompting methodologies</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-600">{activeTechniques}</div>
            <div>Active Techniques</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {Math.round((performanceMetrics.accuracy) * 100)}%
            </div>
            <div>Expected Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {Math.round((performanceMetrics.consistency) * 100)}%
            </div>
            <div>Consistency</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Technique Selection */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Layers className="h-5 w-5" />
                <span>Technique Stack</span>
              </CardTitle>
              <CardDescription>Select and configure advanced prompting techniques</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(techniqueDescriptions).map(([key, desc]) => (
                <div key={key} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Switch
                    checked={techniques[key as keyof TechniqueConfig]}
                    onCheckedChange={(checked) => updateTechnique(key as keyof TechniqueConfig, checked)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{desc.name}</h4>
                      {techniques[key as keyof TechniqueConfig] && (
                        <Badge variant="secondary" className="text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{desc.description}</p>
                    <p className="text-xs text-green-600 mt-1">⚡ {desc.benefit}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Optimization Parameters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center justify-between">
                  <span>Temperature</span>
                  <span className="text-sm text-gray-500">{temperature}</span>
                </Label>
                <Slider
                  value={[temperature]}
                  onValueChange={(value) => setTemperature(value[0])}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Focused</span>
                  <span>Creative</span>
                </div>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Top-P (Nucleus Sampling)</span>
                  <span className="text-sm text-gray-500">{topP}</span>
                </Label>
                <Slider
                  value={[topP]}
                  onValueChange={(value) => setTopP(value[0])}
                  max={1}
                  min={0.1}
                  step={0.1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Thinking Depth</span>
                  <span className="text-sm text-gray-500">{thinkingDepth}</span>
                </Label>
                <Slider
                  value={[thinkingDepth]}
                  onValueChange={(value) => setThinkingDepth(value[0])}
                  max={5}
                  min={1}
                  step={1}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Prompt Engineering */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Base Prompt Input</CardTitle>
              <CardDescription>Enter your task or question to optimize</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
                placeholder="Enter your base prompt or task description here..."
                className="min-h-[120px]"
              />
              
              <Button 
                onClick={generateOptimizedPrompt}
                disabled={!basePrompt.trim() || activeTechniques === 0}
                className="w-full"
              >
                <Play className="h-4 w-4 mr-2" />
                Generate Optimized Prompt
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Accuracy</span>
                    <span>{Math.round(performanceMetrics.accuracy * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.accuracy * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Efficiency</span>
                    <span>{Math.round(performanceMetrics.efficiency * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.efficiency * 100}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Consistency</span>
                    <span>{Math.round(performanceMetrics.consistency * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${performanceMetrics.consistency * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Optimized Output */}
      {optimizedPrompt && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Optimized Integrated Prompt</span>
              <div className="flex space-x-2">
                <Badge variant="outline">{activeTechniques} techniques</Badge>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              Advanced prompt integrating {activeTechniques} techniques with optimized parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={optimizedPrompt}
              readOnly
              className="min-h-[400px] font-mono text-sm bg-gray-50"
            />
          </CardContent>
        </Card>
      )}

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50">
        <CardHeader>
          <CardTitle>Advanced Techniques Integration Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Technique Synergy</h4>
              <p className="text-gray-600 text-sm">
                Combine multiple advanced prompting methodologies to leverage their 
                complementary strengths and achieve superior performance.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Adaptive Integration</h4>
              <p className="text-gray-600 text-sm">
                Intelligently select and sequence techniques based on task requirements, 
                optimizing for accuracy, efficiency, and consistency.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Performance Optimization</h4>
              <p className="text-gray-600 text-sm">
                Fine-tune parameters and monitor performance metrics to achieve 
                optimal results across diverse prompting scenarios.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
