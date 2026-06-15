
'use client';

import React, { useState } from 'react';
import { Eye, Image, BookOpen, Film, Camera, Palette, Sparkles, Play, Save, Download, RotateCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface StoryScene {
  id: string;
  title: string;
  description: string;
  visualElements: string[];
  emotionalTone: string;
  imagePrompt: string;
  duration: number;
  transition: string;
}

export default function VisualStorytellingPage() {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyTheme, setStoryTheme] = useState('adventure');
  const [visualStyle, setVisualStyle] = useState('cinematic');
  const [narrativeStructure, setNarrativeStructure] = useState('three_act');
  const [emotionalIntensity, setEmotionalIntensity] = useState(7);
  const [scenes, setScenes] = useState<StoryScene[]>([]);
  const [currentScene, setCurrentScene] = useState(0);
  const [generatedStoryboard, setGeneratedStoryboard] = useState('');

  const themes = [
    { id: 'adventure', name: 'Adventure', description: 'Journeys, exploration, discovery' },
    { id: 'mystery', name: 'Mystery', description: 'Secrets, investigation, revelation' },
    { id: 'romance', name: 'Romance', description: 'Love, relationships, connection' },
    { id: 'sci_fi', name: 'Science Fiction', description: 'Future, technology, space' },
    { id: 'fantasy', name: 'Fantasy', description: 'Magic, mythical, otherworldly' },
    { id: 'drama', name: 'Drama', description: 'Emotion, conflict, human nature' },
    { id: 'documentary', name: 'Documentary', description: 'Reality, information, truth' }
  ];

  const visualStyles = [
    { id: 'cinematic', name: 'Cinematic', description: 'Film-like composition, dramatic lighting' },
    { id: 'artistic', name: 'Artistic', description: 'Painterly, stylized, creative interpretation' },
    { id: 'photorealistic', name: 'Photorealistic', description: 'Highly detailed, lifelike imagery' },
    { id: 'minimalist', name: 'Minimalist', description: 'Clean, simple, focused elements' },
    { id: 'surreal', name: 'Surreal', description: 'Dreamlike, fantastical, impossible scenes' },
    { id: 'noir', name: 'Film Noir', description: 'High contrast, dramatic shadows' }
  ];

  const narrativeStructures = [
    { id: 'three_act', name: 'Three-Act Structure', acts: ['Setup', 'Confrontation', 'Resolution'] },
    { id: 'hero_journey', name: 'Hero\'s Journey', acts: ['Ordinary World', 'Call to Adventure', 'Transformation', 'Return'] },
    { id: 'five_act', name: 'Five-Act Structure', acts: ['Exposition', 'Rising Action', 'Climax', 'Falling Action', 'Denouement'] },
    { id: 'circular', name: 'Circular Narrative', acts: ['Beginning', 'Development', 'Climax', 'Return to Beginning'] }
  ];

  const emotionalTones = [
    'Joyful', 'Melancholic', 'Tense', 'Peaceful', 'Energetic', 
    'Mysterious', 'Romantic', 'Dramatic', 'Hopeful', 'Nostalgic'
  ];

  const transitions = [
    'Fade to Black', 'Cross Dissolve', 'Cut', 'Wipe', 'Zoom In', 'Zoom Out', 'Pan'
  ];

  const generateStoryScenes = () => {
    const selectedStructure = narrativeStructures.find(s => s.id === narrativeStructure);
    const selectedTheme = themes.find(t => t.id === storyTheme);
    const selectedStyle = visualStyles.find(s => s.id === visualStyle);
    
    if (!selectedStructure || !selectedTheme || !selectedStyle) return;

    const sceneTemplates = {
      adventure: {
        'Setup': 'Character in ordinary environment preparing for journey',
        'Confrontation': 'Character faces major challenge or obstacle',
        'Resolution': 'Character overcomes challenge and finds resolution',
        'Ordinary World': 'Hero in familiar, comfortable setting',
        'Call to Adventure': 'Inciting incident that starts the journey',
        'Transformation': 'Hero faces ultimate test and transforms',
        'Return': 'Hero returns changed to original world'
      },
      mystery: {
        'Setup': 'Introduction of the mystery or crime scene',
        'Confrontation': 'Investigation reveals deeper complexities',
        'Resolution': 'Truth is revealed and mystery solved'
      },
      romance: {
        'Setup': 'Meeting of romantic interests',
        'Confrontation': 'Obstacles that test the relationship',
        'Resolution': 'Love conquers all, union achieved'
      }
    };

    const templates = sceneTemplates[storyTheme as keyof typeof sceneTemplates] || sceneTemplates.adventure;
    
    const newScenes: StoryScene[] = selectedStructure.acts.map((act, index) => {
      const sceneDescription = templates[act as keyof typeof templates] || `${act} scene development`;
      const emotionalTone = emotionalTones[Math.floor(Math.random() * emotionalTones.length)];
      
      return {
        id: `scene_${index}`,
        title: `${act}`,
        description: sceneDescription,
        visualElements: generateVisualElements(selectedTheme, selectedStyle, emotionalTone),
        emotionalTone,
        imagePrompt: generateImagePrompt(sceneDescription, selectedStyle, emotionalTone),
        duration: index === Math.floor(selectedStructure.acts.length / 2) ? 8 : 5, // Longer for climax
        transition: transitions[Math.floor(Math.random() * transitions.length)]
      };
    });

    setScenes(newScenes);
    generateStoryboard(newScenes, selectedTheme, selectedStyle);
  };

  const generateVisualElements = (theme: any, style: any, tone: string) => {
    const baseElements = {
      adventure: ['Wide landscape shots', 'Character in motion', 'Dramatic sky'],
      mystery: ['Close-up details', 'Shadowy environments', 'Hidden clues'],
      romance: ['Intimate framing', 'Soft lighting', 'Emotional expressions'],
      sci_fi: ['Futuristic architecture', 'Technology elements', 'Vast spaces'],
      fantasy: ['Magical elements', 'Mystical creatures', 'Enchanted environments']
    };

    const styleModifiers = {
      cinematic: ['Dynamic camera angles', 'Depth of field', 'Color grading'],
      artistic: ['Stylized composition', 'Creative perspective', 'Artistic interpretation'],
      photorealistic: ['Sharp details', 'Natural lighting', 'Realistic textures']
    };

    const elements = baseElements[theme.id as keyof typeof baseElements] || baseElements.adventure;
    const modifiers = styleModifiers[style.id as keyof typeof styleModifiers] || styleModifiers.cinematic;
    
    return [...elements, ...modifiers];
  };

  const generateImagePrompt = (description: string, style: any, tone: string) => {
    return `${description}, ${style.description}, ${tone.toLowerCase()} mood, professional ${style.name.toLowerCase()} style, high quality composition, dramatic lighting, ${emotionalIntensity > 7 ? 'intense' : emotionalIntensity > 4 ? 'moderate' : 'subtle'} emotional impact`;
  };

  const generateStoryboard = (sceneList: StoryScene[], theme: any, style: any) => {
    const storyboard = `VISUAL STORYTELLING STORYBOARD
Title: ${storyTitle || 'Untitled Story'}
Theme: ${theme.name} - ${theme.description}
Visual Style: ${style.name} - ${style.description}
Narrative Structure: ${narrativeStructures.find(s => s.id === narrativeStructure)?.name}
Emotional Intensity: ${emotionalIntensity}/10

SCENE BREAKDOWN:

${sceneList.map((scene, index) => `
SCENE ${index + 1}: ${scene.title.toUpperCase()}
Duration: ${scene.duration} seconds
Emotional Tone: ${scene.emotionalTone}
Transition: ${scene.transition}

Description: ${scene.description}

Visual Elements:
${scene.visualElements.map(element => `• ${element}`).join('\n')}

Image Prompt:
"${scene.imagePrompt}"

Production Notes:
- Focus on ${scene.emotionalTone.toLowerCase()} emotional resonance
- Maintain ${style.name.toLowerCase()} visual consistency
- Prepare for ${scene.transition.toLowerCase()} transition to next scene
`).join('\n---\n')}

VISUAL FLOW SUMMARY:
${sceneList.map((scene, index) => `${index + 1}. ${scene.title} (${scene.emotionalTone})`).join(' → ')}

PRODUCTION GUIDELINES:
- Maintain consistent ${style.name.toLowerCase()} visual style throughout
- Build emotional intensity toward scene ${Math.floor(sceneList.length / 2) + 1}
- Use ${theme.name.toLowerCase()} thematic elements consistently
- Ensure smooth transitions between emotional tones
- Total estimated runtime: ${sceneList.reduce((total, scene) => total + scene.duration, 0)} seconds

POST-PRODUCTION NOTES:
- Color grade for ${style.name.toLowerCase()} aesthetic
- Audio design should complement ${theme.name.toLowerCase()} theme
- Pacing should support ${narrativeStructures.find(s => s.id === narrativeStructure)?.name} structure
- Final emotional impact: ${emotionalIntensity > 7 ? 'High intensity' : emotionalIntensity > 4 ? 'Moderate resonance' : 'Subtle impression'}`;

    setGeneratedStoryboard(storyboard);
  };

  const updateScene = (sceneId: string, field: keyof StoryScene, value: any) => {
    setScenes(prev => prev.map(scene => 
      scene.id === sceneId ? { ...scene, [field]: value } : scene
    ));
  };

  const addScene = () => {
    const newScene: StoryScene = {
      id: `scene_${scenes.length}`,
      title: `Scene ${scenes.length + 1}`,
      description: 'New scene description',
      visualElements: ['Visual element 1', 'Visual element 2'],
      emotionalTone: 'Neutral',
      imagePrompt: 'Custom image prompt',
      duration: 5,
      transition: 'Cut'
    };
    setScenes([...scenes, newScene]);
  };

  const removeScene = (sceneId: string) => {
    setScenes(scenes.filter(scene => scene.id !== sceneId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-indigo-100 rounded-lg">
            <Film className="h-8 w-8 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Visual Storytelling Studio</h1>
            <p className="text-lg text-gray-600">Advanced visual narrative creation</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-xl font-bold text-indigo-600">{scenes.length}</div>
            <div>Scenes</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-purple-600">
              {scenes.reduce((total, scene) => total + scene.duration, 0)}s
            </div>
            <div>Duration</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">{emotionalIntensity}/10</div>
            <div>Intensity</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Story Configuration */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Story Setup</span>
              </CardTitle>
              <CardDescription>Configure your visual narrative foundation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Story Title</Label>
                <Input
                  id="title"
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="Enter your story title..."
                />
              </div>

              <div>
                <Label>Theme</Label>
                <Select value={storyTheme} onValueChange={setStoryTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        <div>
                          <div className="font-medium">{theme.name}</div>
                          <div className="text-xs text-gray-500">{theme.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Visual Style</Label>
                <Select value={visualStyle} onValueChange={setVisualStyle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {visualStyles.map((style) => (
                      <SelectItem key={style.id} value={style.id}>
                        <div>
                          <div className="font-medium">{style.name}</div>
                          <div className="text-xs text-gray-500">{style.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Narrative Structure</Label>
                <Select value={narrativeStructure} onValueChange={setNarrativeStructure}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {narrativeStructures.map((structure) => (
                      <SelectItem key={structure.id} value={structure.id}>
                        <div>
                          <div className="font-medium">{structure.name}</div>
                          <div className="text-xs text-gray-500">
                            {structure.acts.length} acts: {structure.acts.join(', ')}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center justify-between">
                  <span>Emotional Intensity</span>
                  <span className="text-sm text-gray-500">{emotionalIntensity}/10</span>
                </Label>
                <Slider
                  value={[emotionalIntensity]}
                  onValueChange={(value) => setEmotionalIntensity(value[0])}
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

              <Button onClick={generateStoryScenes} className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Story Scenes
              </Button>
            </CardContent>
          </Card>

          {scenes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Scene Navigator</span>
                  <Button size="sm" onClick={addScene}>
                    <Camera className="h-4 w-4 mr-2" />
                    Add Scene
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {scenes.map((scene, index) => (
                    <div
                      key={scene.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        currentScene === index ? 'border-indigo-500 bg-indigo-50' : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentScene(index)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{scene.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {scene.duration}s
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-600 mb-1">
                        {scene.description.substring(0, 50)}...
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{scene.emotionalTone}</span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeScene(scene.id);
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Scene Editor & Storyboard */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="scenes" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="scenes">Scene Editor</TabsTrigger>
              <TabsTrigger value="storyboard">Storyboard</TabsTrigger>
              <TabsTrigger value="export">Export</TabsTrigger>
            </TabsList>

            <TabsContent value="scenes" className="space-y-4">
              {scenes.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Camera className="h-5 w-5" />
                      <span>Scene {currentScene + 1}: {scenes[currentScene]?.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="sceneTitle">Scene Title</Label>
                      <Input
                        id="sceneTitle"
                        value={scenes[currentScene]?.title || ''}
                        onChange={(e) => updateScene(scenes[currentScene]?.id, 'title', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="sceneDescription">Description</Label>
                      <Textarea
                        id="sceneDescription"
                        value={scenes[currentScene]?.description || ''}
                        onChange={(e) => updateScene(scenes[currentScene]?.id, 'description', e.target.value)}
                        className="min-h-[80px]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Emotional Tone</Label>
                        <Select
                          value={scenes[currentScene]?.emotionalTone || ''}
                          onValueChange={(value) => updateScene(scenes[currentScene]?.id, 'emotionalTone', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {emotionalTones.map((tone) => (
                              <SelectItem key={tone} value={tone}>
                                {tone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Transition</Label>
                        <Select
                          value={scenes[currentScene]?.transition || ''}
                          onValueChange={(value) => updateScene(scenes[currentScene]?.id, 'transition', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {transitions.map((transition) => (
                              <SelectItem key={transition} value={transition}>
                                {transition}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="imagePrompt">Image Prompt</Label>
                      <Textarea
                        id="imagePrompt"
                        value={scenes[currentScene]?.imagePrompt || ''}
                        onChange={(e) => updateScene(scenes[currentScene]?.id, 'imagePrompt', e.target.value)}
                        className="min-h-[100px] font-mono text-sm"
                      />
                    </div>

                    <div>
                      <Label>Visual Elements</Label>
                      <div className="space-y-2">
                        {scenes[currentScene]?.visualElements?.map((element, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              value={element}
                              onChange={(e) => {
                                const newElements = [...(scenes[currentScene]?.visualElements || [])];
                                newElements[index] = e.target.value;
                                updateScene(scenes[currentScene]?.id, 'visualElements', newElements);
                              }}
                            />
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                const newElements = scenes[currentScene]?.visualElements?.filter((_, i) => i !== index);
                                updateScene(scenes[currentScene]?.id, 'visualElements', newElements);
                              }}
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            const newElements = [...(scenes[currentScene]?.visualElements || []), 'New visual element'];
                            updateScene(scenes[currentScene]?.id, 'visualElements', newElements);
                          }}
                        >
                          + Add Element
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center text-gray-500 py-12">
                  <Eye className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No Scenes Yet</h3>
                  <p className="mb-4">Configure your story setup and generate scenes to start creating your visual narrative.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="storyboard" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Film className="h-5 w-5" />
                      <span>Complete Storyboard</span>
                    </span>
                    <Button onClick={() => generateStoryboard(scenes, themes.find(t => t.id === storyTheme), visualStyles.find(s => s.id === visualStyle))}>
                      <RotateCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={generatedStoryboard}
                    readOnly
                    className="min-h-[500px] font-mono text-sm bg-gray-50"
                    placeholder="Generate scenes first to see your complete storyboard here..."
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Export Options</CardTitle>
                  <CardDescription>Export your visual story in various formats</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="h-20 flex flex-col items-center justify-center">
                      <Save className="h-6 w-6 mb-2" />
                      <span>Save Project</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Download className="h-6 w-6 mb-2" />
                      <span>Export Storyboard</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Image className="h-6 w-6 mb-2" />
                      <span>Export Image Prompts</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                      <Palette className="h-6 w-6 mb-2" />
                      <span>Style Guide</span>
                    </Button>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Export Summary</h4>
                    <div className="text-sm text-blue-800 space-y-1">
                      <p>• {scenes.length} scenes ready for production</p>
                      <p>• Total runtime: {scenes.reduce((total, scene) => total + scene.duration, 0)} seconds</p>
                      <p>• Style: {visualStyles.find(s => s.id === visualStyle)?.name}</p>
                      <p>• Structure: {narrativeStructures.find(s => s.id === narrativeStructure)?.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader>
          <CardTitle>Visual Storytelling Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Narrative Structure</h4>
              <p className="text-gray-600 text-sm">
                Apply proven storytelling structures and emotional arcs to create 
                compelling visual narratives that engage and resonate with audiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Visual Design</h4>
              <p className="text-gray-600 text-sm">
                Integrate cinematic techniques, composition principles, and visual styles 
                to create cohesive, professional-quality visual storytelling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Production Pipeline</h4>
              <p className="text-gray-600 text-sm">
                Generate detailed storyboards, image prompts, and production notes 
                for seamless transition from concept to final visual narrative.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
