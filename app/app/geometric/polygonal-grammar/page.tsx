
'use client';

import React, { useState } from 'react';
import { Triangle, Square, Hexagon, Pentagon, Octagon, Save, Download, RotateCw, ZoomIn } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function PolygonalGrammarPage() {
  const [selectedPolygon, setSelectedPolygon] = useState('hexagon');
  const [semanticDomain, setSemanticDomain] = useState('user_interface');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  const polygonTypes = [
    { id: 'triangle', name: 'Triangle', icon: Triangle, vertices: 3, angles: [60, 60, 60] },
    { id: 'square', name: 'Square', icon: Square, vertices: 4, angles: [90, 90, 90, 90] },
    { id: 'pentagon', name: 'Pentagon', icon: Pentagon, vertices: 5, angles: [108, 108, 108, 108, 108] },
    { id: 'hexagon', name: 'Hexagon', icon: Hexagon, vertices: 6, angles: [120, 120, 120, 120, 120, 120] },
    { id: 'octagon', name: 'Octagon', icon: Octagon, vertices: 8, angles: [135, 135, 135, 135, 135, 135, 135, 135] },
  ];

  const semanticMappings = {
    user_interface: {
      vertices: 'navigation_points',
      angles: 'interaction_flow',
      symmetry: 'visual_balance',
      center: 'focal_content'
    },
    storytelling: {
      vertices: 'plot_points',
      angles: 'narrative_tension',
      symmetry: 'thematic_balance',
      center: 'core_conflict'
    },
    architecture: {
      vertices: 'structural_supports',
      angles: 'load_distribution',
      symmetry: 'aesthetic_harmony',
      center: 'functional_core'
    }
  };

  const selectedPolygonData = polygonTypes.find(p => p.id === selectedPolygon);
  const currentMappings = semanticMappings[semanticDomain as keyof typeof semanticMappings];

  const generatePrompt = () => {
    const polygon = selectedPolygonData;
    const mappings = currentMappings;
    
    const prompt = `Create a ${semanticDomain.replace('_', ' ')} design using ${polygon?.name.toLowerCase()} geometry as the foundational grammar:

GEOMETRIC PROPERTIES:
- Shape: ${polygon?.name} (${polygon?.vertices} vertices)
- Angles: ${polygon?.angles.join('°, ')}°
- Symmetry: Rotational symmetry

SEMANTIC MAPPING:
- Vertices → ${mappings.vertices}
- Angles → ${mappings.angles}
- Symmetry → ${mappings.symmetry}
- Center → ${mappings.center}

GENERATIVE RULES:
1. Use ${polygon?.vertices} primary ${mappings.vertices}
2. Distribute ${mappings.angles} evenly across the design
3. Maintain ${mappings.symmetry} throughout the composition
4. Focus attention on the ${mappings.center}

TRANSFORMATION CONSTRAINTS:
- Scale elements proportionally to maintain geometric integrity
- Rotate elements in multiples of ${360 / (polygon?.vertices || 6)}° for harmony
- Use tessellation patterns for complex layouts
- Preserve accessibility and usability standards

Generate a comprehensive design that embodies these geometric principles while serving the functional requirements of ${semanticDomain.replace('_', ' ')}.`;

    setGeneratedPrompt(prompt);
  };

  const savePrompt = async () => {
    if (!generatedPrompt) {
      toast.error('No prompt to save');
      return;
    }

    try {
      const promptData = {
        framework: 'Polygonal Grammar',
        selectedPolygon,
        semanticDomain,
        generatedPrompt,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving geometric prompt:', promptData);
      toast.success('Geometric prompt saved successfully');
    } catch (err) {
      toast.error('Failed to save prompt');
    }
  };

  const exportPrompt = () => {
    if (!generatedPrompt) {
      toast.error('No prompt to export');
      return;
    }

    try {
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(generatedPrompt);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `geometric_prompt_${selectedPolygon}_${semanticDomain}.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Prompt exported successfully');
    } catch (err) {
      toast.error('Failed to export prompt');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Hexagon className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Polygonal Grammar Composer</h1>
            <p className="text-lg text-gray-600">Geometric primitives as generative syntax</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">∞</div>
            <div>Geometric Forms</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-blue-600">3+</div>
            <div>Semantic Domains</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">∞</div>
            <div>Design Possibilities</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Control Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Triangle className="h-5 w-5" />
                <span>Geometric Selection</span>
              </CardTitle>
              <CardDescription>Choose your foundational geometric primitive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {polygonTypes.map((polygon) => {
                  const Icon = polygon.icon;
                  return (
                    <button
                      key={polygon.id}
                      onClick={() => setSelectedPolygon(polygon.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedPolygon === polygon.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`h-8 w-8 mx-auto mb-2 ${
                        selectedPolygon === polygon.id ? 'text-green-600' : 'text-gray-400'
                      }`} />
                      <div className="text-sm font-medium">{polygon.name}</div>
                      <div className="text-xs text-gray-500">{polygon.vertices} vertices</div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Semantic Domain</CardTitle>
              <CardDescription>Map geometric properties to conceptual domains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="domain">Target Domain</Label>
                <Select value={semanticDomain} onValueChange={setSemanticDomain}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user_interface">User Interface Design</SelectItem>
                    <SelectItem value="storytelling">Narrative Storytelling</SelectItem>
                    <SelectItem value="architecture">Architectural Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentMappings && (
                <div className="space-y-3">
                  <h4 className="font-medium text-sm text-gray-700">Semantic Mappings</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-blue-50 rounded text-xs">
                      <div className="font-medium">Vertices</div>
                      <div className="text-gray-600">{currentMappings.vertices}</div>
                    </div>
                    <div className="p-2 bg-green-50 rounded text-xs">
                      <div className="font-medium">Angles</div>
                      <div className="text-gray-600">{currentMappings.angles}</div>
                    </div>
                    <div className="p-2 bg-purple-50 rounded text-xs">
                      <div className="font-medium">Symmetry</div>
                      <div className="text-gray-600">{currentMappings.symmetry}</div>
                    </div>
                    <div className="p-2 bg-orange-50 rounded text-xs">
                      <div className="font-medium">Center</div>
                      <div className="text-gray-600">{currentMappings.center}</div>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={generatePrompt} className="w-full">
                <RotateCw className="h-4 w-4 mr-2" />
                Generate Geometric Prompt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Visualization & Output */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ZoomIn className="h-5 w-5" />
                <span>Geometric Properties</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPolygonData && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-lg mb-4">
                      <selectedPolygonData.icon className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold">{selectedPolygonData.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <Label className="text-gray-500">Vertices</Label>
                      <div className="font-medium">{selectedPolygonData.vertices}</div>
                    </div>
                    <div>
                      <Label className="text-gray-500">Symmetry</Label>
                      <div className="font-medium">Rotational</div>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-500">Interior Angles</Label>
                      <div className="font-medium">{selectedPolygonData.angles.join('°, ')}°</div>
                    </div>
                    <div className="col-span-2">
                      <Label className="text-gray-500">Rotation Harmony</Label>
                      <div className="font-medium">{360 / selectedPolygonData.vertices}° increments</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Prompt</span>
                <div className="flex space-x-2">
                  <Button onClick={savePrompt} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportPrompt} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedPrompt}
                onChange={(e) => setGeneratedPrompt(e.target.value)}
                placeholder="Click 'Generate Geometric Prompt' to create a prompt based on your geometric selections..."
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50">
        <CardHeader>
          <CardTitle>Polygonal Grammar Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Geometric Foundation</h4>
              <p className="text-gray-600 text-sm">
                Use mathematical geometric primitives as the foundational syntax for design and prompt generation, 
                ensuring structural consistency and harmonic proportions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Semantic Mapping</h4>
              <p className="text-gray-600 text-sm">
                Translate geometric properties (vertices, angles, symmetry) into domain-specific conceptual 
                elements, creating coherent design languages across disciplines.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Generative Rules</h4>
              <p className="text-gray-600 text-sm">
                Apply transformation constraints and tessellation patterns while preserving geometric 
                integrity, enabling infinite variations within structured boundaries.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
