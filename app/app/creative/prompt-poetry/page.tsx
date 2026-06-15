
'use client';

import React, { useState } from 'react';
import { BookOpen, Feather, Image, Heart, Sparkles, Download, Save, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';

export default function PromptPoetryPage() {
  const [theme, setTheme] = useState('nature');
  const [meterType, setMeterType] = useState('iambic_pentameter');
  const [rhymeScheme, setRhymeScheme] = useState('ABAB');
  const [emotionalTone, setEmotionalTone] = useState(7);
  const [visualStyle, setVisualStyle] = useState('impressionistic');
  const [generatedPoetry, setGeneratedPoetry] = useState('');
  const [imagePrompts, setImagePrompts] = useState<string[]>([]);

  const themes = [
    { id: 'nature', name: 'Nature & Landscape', description: 'Forests, mountains, oceans, seasons' },
    { id: 'urban', name: 'Urban Life', description: 'Cities, streets, crowds, architecture' },
    { id: 'memory', name: 'Memory & Time', description: 'Nostalgia, past, future, moments' },
    { id: 'journey', name: 'Journey & Discovery', description: 'Travel, exploration, growth, adventure' },
    { id: 'emotion', name: 'Deep Emotion', description: 'Love, loss, joy, melancholy' }
  ];

  const meters = [
    { id: 'iambic_pentameter', name: 'Iambic Pentameter', pattern: 'da-DUM da-DUM da-DUM da-DUM da-DUM' },
    { id: 'trochaic_tetrameter', name: 'Trochaic Tetrameter', pattern: 'DUM-da DUM-da DUM-da DUM-da' },
    { id: 'anapestic_trimeter', name: 'Anapestic Trimeter', pattern: 'da-da-DUM da-da-DUM da-da-DUM' },
    { id: 'free_verse', name: 'Free Verse', pattern: 'Natural speech rhythm' }
  ];

  const rhymeSchemes = [
    { id: 'ABAB', name: 'ABAB (Alternate)', description: 'Lines 1&3 rhyme, 2&4 rhyme' },
    { id: 'AABB', name: 'AABB (Couplets)', description: 'Adjacent lines rhyme' },
    { id: 'ABCB', name: 'ABCB (Ballad)', description: 'Lines 2&4 rhyme' },
    { id: 'ABBA', name: 'ABBA (Enclosed)', description: 'Outer lines rhyme, inner lines rhyme' }
  ];

  const visualStyles = [
    { id: 'impressionistic', name: 'Impressionistic', description: 'Soft, dreamy, light-focused' },
    { id: 'dramatic', name: 'Dramatic', description: 'High contrast, bold compositions' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, focused elements' },
    { id: 'surreal', name: 'Surreal', description: 'Dreamlike, fantastical, unexpected' }
  ];

  const generatePoetry = () => {
    const selectedTheme = themes.find(t => t.id === theme);
    const selectedMeter = meters.find(m => m.id === meterType);
    const selectedRhyme = rhymeSchemes.find(r => r.id === rhymeScheme);
    const selectedStyle = visualStyles.find(s => s.id === visualStyle);
    
    const emotionalIntensity = emotionalTone >= 7 ? 'high' : emotionalTone >= 4 ? 'medium' : 'low';

    const poetry = `Create a visual story poem with the following poetic structure:

THEME: ${selectedTheme?.name}
${selectedTheme?.description}

POETIC ELEMENTS:
- Meter: ${selectedMeter?.name} (${selectedMeter?.pattern})
- Rhyme Scheme: ${selectedRhyme?.name} - ${selectedRhyme?.description}
- Emotional Intensity: ${emotionalIntensity} (${emotionalTone}/10)
- Visual Style: ${selectedStyle?.name} - ${selectedStyle?.description}

NARRATIVE STRUCTURE:
Exposition: Establish the scene with gentle, evocative imagery
Rising Action: Build emotional tension through progressive visual elements
Climax: Converge powerful visual metaphors at the emotional peak
Resolution: Return to peaceful imagery with transformed perspective

VISUAL STORYTELLING REQUIREMENTS:
- Use rich sensory details that translate to visual imagery
- Create smooth transitions between scenes/stanzas
- Employ visual metaphors that enhance the ${selectedTheme?.description.toLowerCase()}
- Balance ${selectedStyle?.description.toLowerCase()} composition style
- Ensure each stanza could be a distinct visual frame

REFINEMENT GUIDELINES:
- Maintain consistent ${selectedMeter?.name} throughout
- Follow ${selectedRhyme?.name} pattern precisely
- Escalate emotional resonance to match ${emotionalIntensity} intensity
- Create visual flow that guides the reader's imagination
- End with a memorable, visually striking conclusion

Generate a 4-stanza poem that embodies these poetic and visual storytelling principles.`;

    setGeneratedPoetry(poetry);

    // Generate accompanying image prompts
    const prompts = [
      `${selectedStyle?.description} ${selectedTheme?.description.split(',')[0]} scene, soft lighting, ${emotionalIntensity} emotional tone`,
      `Visual metaphor representing ${selectedTheme?.name.toLowerCase()}, ${selectedStyle?.name.toLowerCase()} style, cinematic composition`,
      `Climactic moment in ${selectedTheme?.description.split(',')[1] || selectedTheme?.description}, dramatic lighting, ${selectedStyle?.description}`,
      `Peaceful resolution scene, ${selectedTheme?.name.toLowerCase()} theme, gentle ${selectedStyle?.description} aesthetic`
    ];
    
    setImagePrompts(prompts);
  };

  const getEmotionalLabel = (value: number) => {
    if (value >= 8) return 'Intense';
    if (value >= 6) return 'Strong';
    if (value >= 4) return 'Moderate';
    if (value >= 2) return 'Gentle';
    return 'Subtle';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Feather className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prompt Poetry Studio</h1>
            <p className="text-lg text-gray-600">Poetic language structures for visual storytelling</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">∞</div>
            <div>Poetic Forms</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">4</div>
            <div>Visual Styles</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-pink-600">♥</div>
            <div>Emotional Resonance</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Poetry Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Poetic Elements</span>
              </CardTitle>
              <CardDescription>Configure the structural elements of your visual poetry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Theme & Subject</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-gray-500">{t.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Meter & Rhythm</Label>
                <Select value={meterType} onValueChange={setMeterType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {meters.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        <div>
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-gray-500">{m.pattern}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Rhyme Scheme</Label>
                <Select value={rhymeScheme} onValueChange={setRhymeScheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {rhymeSchemes.map((r) => (
                      <SelectItem key={r.id} value={r.id}>
                        <div>
                          <div className="font-medium">{r.name}</div>
                          <div className="text-xs text-gray-500">{r.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Image className="h-5 w-5" />
                <span>Visual Storytelling</span>
              </CardTitle>
              <CardDescription>Configure visual and emotional elements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Visual Style</Label>
                <Select value={visualStyle} onValueChange={setVisualStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visualStyles.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-gray-500">{s.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Emotional Intensity</span>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{getEmotionalLabel(emotionalTone)}</span>
                  </Badge>
                </Label>
                <Slider
                  value={[emotionalTone]}
                  onValueChange={(value) => setEmotionalTone(value[0])}
                  max={10}
                  min={1}
                  step={1}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Subtle</span>
                  <span>Intense</span>
                </div>
              </div>

              <Button onClick={generatePoetry} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Poetic Prompt
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Output & Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Generated Poetry Prompt</span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedPoetry}
                onChange={(e) => setGeneratedPoetry(e.target.value)}
                placeholder="Click 'Generate Poetic Prompt' to create a visual storytelling prompt..."
                className="min-h-[300px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {imagePrompts.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Image className="h-5 w-5" />
                  <span>Companion Image Prompts</span>
                </CardTitle>
                <CardDescription>Visual prompts to accompany your poetry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {imagePrompts.map((prompt, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary">Scene {index + 1}</Badge>
                        <Button size="sm" variant="ghost">
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-700">{prompt}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle>Prompt Poetry Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Poetic Structure</h4>
              <p className="text-gray-600 text-sm">
                Apply traditional poetic elements (meter, rhyme, imagery) to create 
                structured, emotionally resonant prompt frameworks for visual storytelling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Visual Translation</h4>
              <p className="text-gray-600 text-sm">
                Bridge the gap between poetic language and visual representation, 
                creating prompts that generate cohesive visual narratives.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Emotional Resonance</h4>
              <p className="text-gray-600 text-sm">
                Calibrate emotional intensity and aesthetic style to create 
                meaningful, impactful visual stories that connect with audiences.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
