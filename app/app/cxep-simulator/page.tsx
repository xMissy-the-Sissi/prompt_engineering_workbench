
'use client';

import React, { useState } from 'react';
import { Play, FileText, CheckCircle, AlertCircle, Loader2, Copy, Save, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { clipboardUtils } from '@/lib/utils';

interface PRPResult {
  goal: string;
  persona: string;
  documentation: string;
  codePatterns: string;
  relevantFiles: string;
  preconditions: string;
  postconditions: string;
  invariants: string;
  stepByStepPlan: string;
  selfTestCommands: string;
  successCondition: string;
  reflexiveCheck: string;
}

export default function CxEPSimulator() {
  const [initialPrompt, setInitialPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [prpResult, setPrpResult] = useState<PRPResult | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  const generatePRP = async () => {
    if (!initialPrompt.trim()) return;
    
    setIsGenerating(true);
    setCurrentStep(2);
    
    try {
      const response = await fetch('/api/generate-prp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: initialPrompt }),
      });
      
      if (!response.ok) throw new Error('Failed to generate PRP');
      
      const result = await response.json();
      setPrpResult(result.prp);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error generating PRP:', error);
      // Handle error state
    } finally {
      setIsGenerating(false);
    }
  };

  const resetSimulation = () => {
    setInitialPrompt('');
    setPrpResult(null);
    setCurrentStep(1);
  };

  const loadExample = () => {
    setInitialPrompt(`Create a user authentication system for a web application that supports:
- Email/password login
- Password reset functionality
- Session management
- Rate limiting for security
- Integration with existing user database

The system should be secure, scalable, and follow best practices for web security.`);
  };

  const copyPRP = () => {
    if (!prpResult) return;
    
    const prpText = Object.entries(prpResult)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}:\n${value}\n`)
      .join('\n');
    
    clipboardUtils.copyToClipboard(prpText, 'PRP copied to clipboard');
  };

  const savePRP = () => {
    if (!prpResult) return;
    
    const prpData = {
      framework: 'CxEP',
      initialPrompt,
      prpResult,
      currentStep,
      timestamp: new Date().toISOString()
    };
    
    clipboardUtils.saveData(prpData, `cxep_prp_${Date.now()}`, 'CxEP PRP saved successfully');
  };

  const exportPRP = () => {
    if (!prpResult) return;
    
    const prpText = `CONTEXT ENGINEERING PIPELINE (CxEP) - PRODUCT REQUIREMENTS PROMPT

INITIAL PROMPT:
${initialPrompt}

GENERATED PRP:
${Object.entries(prpResult)
  .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}:\n${value}`)
  .join('\n\n')}

Generated: ${new Date().toISOString()}`;
    
    clipboardUtils.exportData(prpText, `cxep_prp_${Date.now()}.txt`, 'CxEP PRP exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Context Engineering Pipeline Simulator</h1>
        <p className="text-gray-600">
          Experience the CxEP workflow with Product-Requirements Prompt generation
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center space-x-4 py-4">
        {[
          { step: 1, title: 'Initial Prompt', icon: FileText },
          { step: 2, title: 'Generate PRP', icon: Play },
          { step: 3, title: 'Pipeline Stages', icon: CheckCircle }
        ].map(({ step, title, icon: Icon }) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
              currentStep >= step 
                ? 'bg-blue-600 border-blue-600 text-white' 
                : 'border-gray-300 text-gray-400'
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step ? 'text-blue-600' : 'text-gray-400'
            }`}>
              {title}
            </span>
            {step < 3 && (
              <div className={`w-8 h-0.5 mx-4 ${
                currentStep > step ? 'bg-blue-600' : 'bg-gray-300'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Initial Prompt */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Step 1: Initial Prompt Input
          </CardTitle>
          <CardDescription>
            Enter your high-level requirement or user story to begin the CxEP process
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe what you want to build. Be specific about functionality, constraints, and requirements..."
            value={initialPrompt}
            onChange={(e) => setInitialPrompt(e.target.value)}
            className="min-h-[120px]"
          />
          <div className="flex gap-2">
            <Button onClick={generatePRP} disabled={!initialPrompt.trim() || isGenerating}>
              {isGenerating ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Play className="h-4 w-4 mr-2" />
              )}
              Generate PRP
            </Button>
            <Button onClick={loadExample} variant="outline">
              Load Example
            </Button>
            <Button onClick={resetSimulation} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Generated PRP */}
      {(isGenerating || prpResult) && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Step 2: Product-Requirements Prompt (PRP)
                </CardTitle>
                <CardDescription>
                  Systematically generated specification with formal validation criteria
                </CardDescription>
              </div>
              {prpResult && (
                <div className="flex space-x-2">
                  <Button onClick={copyPRP} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={savePRP} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportPRP} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isGenerating ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-3 text-gray-600">Generating structured PRP...</span>
              </div>
            ) : prpResult ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(prpResult).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </label>
                      <div className="bg-gray-50 rounded-md p-3 text-sm text-gray-700">
                        {value || 'Not specified'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Step 3: Pipeline Stages */}
      {currentStep >= 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Step 3: CxEP Pipeline Stages
            </CardTitle>
            <CardDescription>
              Visual representation of the complete Context-to-Execution Pipeline
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <Badge className="bg-green-100 text-green-800">Context Assembly</Badge>
                </div>
                <div className="bg-green-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Tasks Completed:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Documentation gathered</li>
                    <li>✓ Code patterns identified</li>
                    <li>✓ Relevant files scoped</li>
                    <li>✓ Context validated</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Badge className="bg-blue-100 text-blue-800">Code Generation</Badge>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Process:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>→ PRP execution</li>
                    <li>→ Code synthesis</li>
                    <li>→ Pattern application</li>
                    <li>→ Quality checks</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Badge className="bg-purple-100 text-purple-800">Validation Loop</Badge>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                  <h4 className="font-semibold text-sm">Verification:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>→ Self-test execution</li>
                    <li>→ Success criteria check</li>
                    <li>→ Reflexive validation</li>
                    <li>→ Context integrity</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Framework Information */}
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg">About Context Engineering 2.0</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Core Principles</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• <strong>Traceability:</strong> Every generated code traceable to PRP version</li>
                <li>• <strong>Verifiability:</strong> Automatic validation against success criteria</li>
                <li>• <strong>Immutability:</strong> Version-controlled prompt artifacts</li>
                <li>• <strong>Decoupling:</strong> PRPs managed separately from application code</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Benefits</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Transforms "vibe coding" to systematic engineering</li>
                <li>• Reduces context misinterpretation</li>
                <li>• Prevents context drift in multi-step interactions</li>
                <li>• Enables reliable, production-ready code generation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
