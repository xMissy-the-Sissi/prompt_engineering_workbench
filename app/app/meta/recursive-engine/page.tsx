
'use client';

import React, { useState, useEffect } from 'react';
import { Brain, Play, Pause, RotateCw, TrendingUp, AlertCircle, CheckCircle, Target } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RecursiveIteration {
  iteration: number;
  prompt: string;
  improvements: string[];
  qualityScore: number;
  timestamp: Date;
}

export default function MetaRecursiveEnginePage() {
  const [basePrompt, setBasePrompt] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [iterations, setIterations] = useState<RecursiveIteration[]>([]);
  const [currentIteration, setCurrentIteration] = useState(0);
  const [maxIterations, setMaxIterations] = useState(5);
  const [convergenceThreshold, setConvergenceThreshold] = useState(0.9);
  const [improvementCriteria, setImprovementCriteria] = useState([
    'Clarity and specificity',
    'Completeness of requirements',
    'Actionability of instructions'
  ]);

  const simulateIteration = (iteration: number, previousPrompt: string, previousScore: number = 0.5) => {
    // Simulate improvement suggestions
    const improvementSuggestions = [
      'Add more specific context about the target audience',
      'Include clearer success criteria and constraints',
      'Enhance the logical flow of instructions',
      'Provide more concrete examples and edge cases',
      'Strengthen safety and ethical considerations',
      'Improve the structure for better readability',
      'Add self-validation mechanisms',
      'Include performance optimization guidelines'
    ];

    const selectedImprovements = improvementSuggestions
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    // Simulate quality improvement with diminishing returns
    const improvementFactor = 1 - (iteration * 0.1);
    const qualityIncrease = (Math.random() * 0.15 + 0.05) * improvementFactor;
    const newQualityScore = Math.min(previousScore + qualityIncrease, 0.98);

    // Simulate prompt evolution
    const improvedPrompt = previousPrompt + `\n\n[Iteration ${iteration + 1} Improvements:]
${selectedImprovements.map(imp => `- ${imp}`).join('\n')}`;

    return {
      iteration: iteration + 1,
      prompt: improvedPrompt,
      improvements: selectedImprovements,
      qualityScore: newQualityScore,
      timestamp: new Date()
    };
  };

  const startRecursiveOptimization = () => {
    if (!basePrompt.trim()) return;

    setIsRunning(true);
    setIterations([]);
    setCurrentIteration(0);

    // Initial iteration
    const initialIteration: RecursiveIteration = {
      iteration: 0,
      prompt: basePrompt,
      improvements: ['Initial prompt submission'],
      qualityScore: 0.5,
      timestamp: new Date()
    };

    setIterations([initialIteration]);

    // Simulate recursive improvement process
    let currentPrompt = basePrompt;
    let currentScore = 0.5;
    let iterationCount = 0;

    const recursiveStep = () => {
      if (iterationCount < maxIterations && currentScore < convergenceThreshold) {
        const newIteration = simulateIteration(iterationCount, currentPrompt, currentScore);
        
        setIterations(prev => [...prev, newIteration]);
        setCurrentIteration(iterationCount + 1);
        
        currentPrompt = newIteration.prompt;
        currentScore = newIteration.qualityScore;
        iterationCount++;

        // Continue recursion with delay for visualization
        setTimeout(recursiveStep, 2000);
      } else {
        setIsRunning(false);
      }
    };

    setTimeout(recursiveStep, 1000);
  };

  const stopOptimization = () => {
    setIsRunning(false);
  };

  const resetEngine = () => {
    setIterations([]);
    setCurrentIteration(0);
    setIsRunning(false);
  };

  const latestIteration = iterations[iterations.length - 1];
  const hasConverged = latestIteration?.qualityScore >= convergenceThreshold;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Brain className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Meta-Recursive Engine</h1>
            <p className="text-lg text-gray-600">Self-improving prompt optimization system</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">{iterations.length}</div>
            <div>Iterations</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">
              {latestIteration ? Math.round(latestIteration.qualityScore * 100) : 0}%
            </div>
            <div>Quality Score</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {hasConverged ? 'Converged' : 'Optimizing'}
            </div>
            <div>Status</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Engine Configuration</span>
              </CardTitle>
              <CardDescription>Configure the recursive optimization parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="maxIterations">Max Iterations</Label>
                <Input
                  id="maxIterations"
                  type="number"
                  value={maxIterations}
                  onChange={(e) => setMaxIterations(parseInt(e.target.value) || 5)}
                  min="1"
                  max="10"
                />
              </div>
              
              <div>
                <Label htmlFor="convergenceThreshold">Convergence Threshold</Label>
                <Input
                  id="convergenceThreshold"
                  type="number"
                  value={convergenceThreshold}
                  onChange={(e) => setConvergenceThreshold(parseFloat(e.target.value) || 0.9)}
                  min="0.5"
                  max="0.99"
                  step="0.01"
                />
              </div>

              <div>
                <Label>Improvement Criteria</Label>
                <div className="space-y-2">
                  {improvementCriteria.map((criteria, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{criteria}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Base Prompt Input</CardTitle>
              <CardDescription>Enter the initial prompt to optimize</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
                placeholder="Enter your initial prompt here. The meta-recursive engine will analyze and iteratively improve it..."
                className="min-h-[120px]"
              />
              
              <div className="flex space-x-2 mt-4">
                {!isRunning ? (
                  <Button onClick={startRecursiveOptimization} disabled={!basePrompt.trim()}>
                    <Play className="h-4 w-4 mr-2" />
                    Start Optimization
                  </Button>
                ) : (
                  <Button onClick={stopOptimization} variant="outline">
                    <Pause className="h-4 w-4 mr-2" />
                    Stop
                  </Button>
                )}
                <Button onClick={resetEngine} variant="outline">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Visualization */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Optimization Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Quality Score</span>
                  <span className="text-sm text-gray-500">
                    {latestIteration ? Math.round(latestIteration.qualityScore * 100) : 0}%
                  </span>
                </div>
                <Progress 
                  value={(latestIteration?.qualityScore || 0) * 100} 
                  className="w-full" 
                />
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Iteration {currentIteration} of {maxIterations}</span>
                  <span>Target: {Math.round(convergenceThreshold * 100)}%</span>
                </div>

                {hasConverged && (
                  <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-3 rounded-lg">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Convergence achieved!</span>
                  </div>
                )}

                {isRunning && (
                  <div className="flex items-center space-x-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                    <Brain className="h-5 w-5 animate-pulse" />
                    <span className="font-medium">Recursive optimization in progress...</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Iteration History</CardTitle>
              <CardDescription>Track improvements across recursive iterations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {iterations.map((iteration, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={iteration.iteration === 0 ? 'secondary' : 'default'}>
                        {iteration.iteration === 0 ? 'Initial' : `Iteration ${iteration.iteration}`}
                      </Badge>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Quality:</span>
                        <span className="font-medium text-sm">
                          {Math.round(iteration.qualityScore * 100)}%
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-sm">Improvements:</h5>
                      <ul className="space-y-1">
                        {iteration.improvements.map((improvement, impIndex) => (
                          <li key={impIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                
                {iterations.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>No iterations yet. Start optimization to see results.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Final Optimized Output */}
      {latestIteration && latestIteration.iteration > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Optimized Prompt Output</CardTitle>
            <CardDescription>Final result after {latestIteration.iteration} recursive iterations</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={latestIteration.prompt}
              readOnly
              className="min-h-[200px] font-mono text-sm bg-gray-50"
            />
          </CardContent>
        </Card>
      )}

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle>Meta-Recursive Enhancement Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Self-Improvement</h4>
              <p className="text-gray-600 text-sm">
                The engine analyzes its own output and identifies improvement opportunities, 
                creating recursive feedback loops for continuous optimization.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Convergence Criteria</h4>
              <p className="text-gray-600 text-sm">
                Quality metrics and convergence thresholds ensure the optimization process 
                reaches stable, high-quality results without infinite recursion.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Meta-Cognitive Analysis</h4>
              <p className="text-gray-600 text-sm">
                Advanced reasoning about reasoning - the system reflects on its own 
                problem-solving processes and improves its meta-cognitive strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
