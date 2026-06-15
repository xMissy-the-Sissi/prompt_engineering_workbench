
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Search, Plus, Star, Filter, RotateCcw, Play, BookOpen } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AnalyticalLens {
  id: string;
  name: string;
  category: 'epistemological' | 'methodological' | 'theoretical' | 'critical' | 'creative';
  perspective: string;
  analysisFramework: string;
  questions: string[];
  recursiveDepth: number;
  description: string;
  examples: string[];
  tags: string[];
}

interface LensApplication {
  lensId: string;
  inputText: string;
  depth: number;
  results: string[];
  insights: string[];
}

export default function LensLibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLens, setSelectedLens] = useState<AnalyticalLens | null>(null);
  const [applicationInput, setApplicationInput] = useState('');
  const [applicationDepth, setApplicationDepth] = useState(1);
  const [applicationResults, setApplicationResults] = useState<LensApplication | null>(null);

  // Comprehensive lens library
  const lensLibrary: AnalyticalLens[] = [
    {
      id: 'systems-thinking',
      name: 'Systems Thinking Lens',
      category: 'methodological',
      perspective: 'Holistic interconnection analysis',
      analysisFramework: 'Examine relationships, feedback loops, emergent properties, and system boundaries',
      questions: [
        'What are the key components and their relationships?',
        'What feedback loops exist in this system?',
        'What emergent properties arise from component interactions?',
        'How do changes in one part affect the whole?',
        'What are the system boundaries and what lies outside them?'
      ],
      recursiveDepth: 3,
      description: 'Analyzes phenomena as interconnected systems rather than isolated components, revealing emergent properties and feedback mechanisms.',
      examples: [
        'Analyzing organizational culture as a complex adaptive system',
        'Understanding climate change through interconnected environmental systems',
        'Examining market dynamics and economic feedback loops'
      ],
      tags: ['complexity', 'emergence', 'relationships', 'holistic']
    },
    {
      id: 'power-analysis',
      name: 'Power Analysis Lens',
      category: 'critical',
      perspective: 'Power dynamics and structural inequality examination',
      analysisFramework: 'Identify power structures, agency, resistance, and systemic advantages/disadvantages',
      questions: [
        'Who holds power in this situation and how is it exercised?',
        'What power structures are invisible or taken for granted?',
        'How do different groups experience power differently?',
        'What forms of resistance or counter-power exist?',
        'How does power shape what is considered normal or legitimate?'
      ],
      recursiveDepth: 4,
      description: 'Examines how power operates, who benefits, and how structural inequalities are maintained or challenged.',
      examples: [
        'Analyzing workplace hierarchies and decision-making processes',
        'Examining educational systems and access to opportunity',
        'Understanding media representation and narrative control'
      ],
      tags: ['inequality', 'structure', 'resistance', 'agency']
    },
    {
      id: 'temporal-analysis',
      name: 'Temporal Analysis Lens',
      category: 'methodological',
      perspective: 'Time-based patterns and historical development',
      analysisFramework: 'Examine historical context, trends, cycles, and future implications across multiple timescales',
      questions: [
        'How has this phenomenon evolved over time?',
        'What historical patterns or cycles are evident?',
        'How do different timescales reveal different insights?',
        'What are the short-term vs. long-term implications?',
        'How might this develop in the future?'
      ],
      recursiveDepth: 3,
      description: 'Analyzes phenomena across multiple time horizons to reveal patterns, trends, and evolutionary dynamics.',
      examples: [
        'Tracing the evolution of technological adoption patterns',
        'Understanding generational changes in social attitudes',
        'Analyzing boom-bust cycles in economic markets'
      ],
      tags: ['history', 'evolution', 'patterns', 'prediction']
    },
    {
      id: 'stakeholder-lens',
      name: 'Multi-Stakeholder Lens',
      category: 'methodological',
      perspective: 'Multiple viewpoint integration',
      analysisFramework: 'Identify all stakeholders, understand their perspectives, interests, and potential conflicts',
      questions: [
        'Who are all the stakeholders affected by this issue?',
        'What are each stakeholder\'s interests and concerns?',
        'How do different stakeholders frame the problem?',
        'Where do stakeholder interests align or conflict?',
        'What voices might be missing from the current discussion?'
      ],
      recursiveDepth: 2,
      description: 'Examines issues from multiple stakeholder perspectives to reveal different interests, concerns, and potential solutions.',
      examples: [
        'Analyzing urban development from residents, developers, and city planners perspectives',
        'Understanding healthcare policy from patients, providers, and insurers viewpoints',
        'Examining environmental policies across community, industry, and government interests'
      ],
      tags: ['perspectives', 'interests', 'conflict', 'collaboration']
    },
    {
      id: 'contradiction-lens',
      name: 'Dialectical Contradiction Lens',
      category: 'theoretical',
      perspective: 'Tension and contradiction analysis',
      analysisFramework: 'Identify inherent contradictions, tensions, and their potential resolution or synthesis',
      questions: [
        'What contradictions or tensions exist within this phenomenon?',
        'How do opposing forces interact and influence each other?',
        'What synthesis or resolution might emerge from these contradictions?',
        'How do contradictions drive change and development?',
        'What would happen if we embraced rather than resolved the tension?'
      ],
      recursiveDepth: 4,
      description: 'Explores inherent contradictions and tensions as sources of insight, change, and development.',
      examples: [
        'Analyzing the tension between innovation and stability in organizations',
        'Understanding individual freedom vs. collective responsibility in policy',
        'Examining quality vs. efficiency trade-offs in production systems'
      ],
      tags: ['tension', 'paradox', 'synthesis', 'change']
    },
    {
      id: 'assumptions-lens',
      name: 'Assumption Surfacing Lens',
      category: 'epistemological',
      perspective: 'Hidden assumption identification',
      analysisFramework: 'Systematically surface and examine underlying assumptions, beliefs, and taken-for-granted elements',
      questions: [
        'What assumptions underlie this analysis or position?',
        'What is being taken for granted as true or normal?',
        'How would the analysis change if key assumptions were different?',
        'What cultural or historical assumptions are embedded here?',
        'What assumptions might be invisible to those involved?'
      ],
      recursiveDepth: 3,
      description: 'Systematically identifies and examines often-invisible assumptions that shape thinking and analysis.',
      examples: [
        'Questioning assumptions about economic growth and progress',
        'Examining assumptions in research methodologies',
        'Surfacing cultural assumptions in international business practices'
      ],
      tags: ['beliefs', 'culture', 'invisible', 'questioning']
    },
    {
      id: 'metaphor-lens',
      name: 'Metaphorical Analysis Lens',
      category: 'creative',
      perspective: 'Metaphor and analogy exploration',
      analysisFramework: 'Identify underlying metaphors, explore alternative metaphors, and examine their implications',
      questions: [
        'What metaphors are implicitly shaping how we think about this?',
        'What alternative metaphors could illuminate different aspects?',
        'How do different metaphors suggest different solutions?',
        'What does this metaphor highlight and what does it hide?',
        'How might people from different cultures metaphorically understand this?'
      ],
      recursiveDepth: 2,
      description: 'Examines how metaphors shape understanding and explores alternative metaphorical frameworks for new insights.',
      examples: [
        'Analyzing organizational metaphors (machine, organism, brain, culture)',
        'Exploring different metaphors for learning (construction, acquisition, participation)',
        'Understanding economic metaphors (flow, growth, equilibrium, ecology)'
      ],
      tags: ['language', 'framing', 'creativity', 'perspective']
    },
    {
      id: 'resource-lens',
      name: 'Resource Flow Analysis Lens',
      category: 'methodological',
      perspective: 'Resource allocation and flow examination',
      analysisFramework: 'Track how resources (material, information, energy, attention) flow through systems',
      questions: [
        'What resources are involved and how do they flow?',
        'Where are the bottlenecks or accumulation points?',
        'How efficient or wasteful are the resource flows?',
        'Who controls resource allocation decisions?',
        'What happens when resource flows are disrupted?'
      ],
      recursiveDepth: 3,
      description: 'Analyzes how various types of resources move through systems, revealing efficiency patterns and control points.',
      examples: [
        'Tracing information flow in organizational decision-making',
        'Analyzing energy flows in urban systems',
        'Understanding attention economics in digital platforms'
      ],
      tags: ['efficiency', 'control', 'distribution', 'systems']
    },
    {
      id: 'emergence-lens',
      name: 'Emergence and Complexity Lens',
      category: 'theoretical',
      perspective: 'Emergent properties and complex behavior analysis',
      analysisFramework: 'Identify emergent properties, non-linear relationships, and complex adaptive behaviors',
      questions: [
        'What properties emerge that aren\'t present in individual components?',
        'How do small changes lead to large effects (or vice versa)?',
        'What self-organizing patterns can be observed?',
        'How does the system adapt and evolve over time?',
        'What would be impossible to predict from studying parts alone?'
      ],
      recursiveDepth: 4,
      description: 'Focuses on emergent properties and complex behaviors that arise from interactions between simpler components.',
      examples: [
        'Understanding consciousness as emergent from neural activity',
        'Analyzing market behaviors emerging from individual trading decisions',
        'Examining social movements as emergent collective phenomena'
      ],
      tags: ['complexity', 'emergence', 'non-linear', 'adaptation']
    },
    {
      id: 'scale-lens',
      name: 'Multi-Scale Analysis Lens',
      category: 'methodological',
      perspective: 'Cross-scale pattern and relationship analysis',
      analysisFramework: 'Examine phenomena across multiple scales (micro, meso, macro) and their interactions',
      questions: [
        'How does this phenomenon manifest at different scales?',
        'What patterns are consistent or different across scales?',
        'How do micro-level actions aggregate to macro-level outcomes?',
        'What cross-scale interactions are important?',
        'How do interventions at one scale affect other scales?'
      ],
      recursiveDepth: 3,
      description: 'Analyzes how phenomena manifest differently at various scales and how cross-scale interactions create complex behaviors.',
      examples: [
        'Understanding climate change from molecular to global scales',
        'Analyzing economic inequality from individual to societal levels',
        'Examining learning from neural to classroom to educational system scales'
      ],
      tags: ['micro', 'macro', 'aggregation', 'interaction']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Lenses', count: lensLibrary.length },
    { id: 'epistemological', name: 'Epistemological', count: lensLibrary.filter(l => l.category === 'epistemological').length },
    { id: 'methodological', name: 'Methodological', count: lensLibrary.filter(l => l.category === 'methodological').length },
    { id: 'theoretical', name: 'Theoretical', count: lensLibrary.filter(l => l.category === 'theoretical').length },
    { id: 'critical', name: 'Critical', count: lensLibrary.filter(l => l.category === 'critical').length },
    { id: 'creative', name: 'Creative', count: lensLibrary.filter(l => l.category === 'creative').length }
  ];

  const filteredLenses = lensLibrary.filter(lens => {
    const matchesSearch = lens.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lens.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lens.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || lens.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      epistemological: 'bg-blue-100 text-blue-800',
      methodological: 'bg-green-100 text-green-800',
      theoretical: 'bg-purple-100 text-purple-800',
      critical: 'bg-red-100 text-red-800',
      creative: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const applyLens = () => {
    if (!selectedLens || !applicationInput) return;

    // Simulate lens application (in real implementation, this would use LLM)
    const mockResults: string[] = [];
    const mockInsights: string[] = [];

    for (let depth = 1; depth <= applicationDepth; depth++) {
      selectedLens.questions.forEach((question, index) => {
        mockResults.push(`Depth ${depth}, Q${index + 1}: ${question}`);
        mockInsights.push(`Analysis from perspective: ${selectedLens.perspective} - Iteration ${depth}`);
      });
    }

    setApplicationResults({
      lensId: selectedLens.id,
      inputText: applicationInput,
      depth: applicationDepth,
      results: mockResults,
      insights: mockInsights
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Eye className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lens Library Browser</h1>
          <p className="text-gray-600">Multi-perspective analysis tools for deep inquiry</p>
        </div>
      </div>

      <Alert>
        <BookOpen className="h-4 w-4" />
        <AlertDescription>
          Explore a curated collection of analytical lenses for multi-perspective inquiry. Apply lenses recursively 
          to uncover insights that single-perspective analysis might miss.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lens Browser */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Browse Analytical Lenses</CardTitle>
              <CardDescription>
                Search and filter the lens library to find the right perspectives for your analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Input
                    placeholder="Search lenses by name, description, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                    className="flex items-center space-x-1"
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lens Grid */}
          <div className="grid gap-4">
            {filteredLenses.map((lens) => (
              <Card 
                key={lens.id} 
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedLens?.id === lens.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                }`}
                onClick={() => setSelectedLens(lens)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{lens.name}</CardTitle>
                      <CardDescription className="mt-1">{lens.perspective}</CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge className={getCategoryColor(lens.category)}>
                        {lens.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Depth: {lens.recursiveDepth}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{lens.description}</p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Questions:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {lens.questions.slice(0, 2).map((question, index) => (
                        <li key={index}>• {question}</li>
                      ))}
                      {lens.questions.length > 2 && (
                        <li className="text-gray-400">+ {lens.questions.length - 2} more questions</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {lens.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredLenses.length === 0 && (
            <Card>
              <CardContent className="text-center py-12">
                <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No lenses found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search terms or category filter
                </p>
                <Button variant="outline" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Lens Application Panel */}
        <div className="space-y-6">
          {selectedLens ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>{selectedLens.name}</span>
                  </CardTitle>
                  <CardDescription>{selectedLens.perspective}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Analysis Framework</h4>
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      {selectedLens.analysisFramework}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Key Questions ({selectedLens.questions.length})</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {selectedLens.questions.map((question, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-gray-400 mt-1">•</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Examples</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {selectedLens.examples.map((example, index) => (
                        <li key={index} className="bg-blue-50 p-2 rounded text-blue-700">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Apply Lens</CardTitle>
                  <CardDescription>
                    Use this lens to analyze your text or problem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="analysisInput">Text or Problem to Analyze</Label>
                    <Textarea
                      id="analysisInput"
                      placeholder="Enter the text, problem, or situation you want to analyze through this lens..."
                      value={applicationInput}
                      onChange={(e) => setApplicationInput(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="recursiveDepth">Recursive Depth (1-{selectedLens.recursiveDepth})</Label>
                    <select
                      id="recursiveDepth"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      value={applicationDepth}
                      onChange={(e) => setApplicationDepth(Number(e.target.value))}
                    >
                      {Array.from({ length: selectedLens.recursiveDepth }, (_, i) => i + 1).map(depth => (
                        <option key={depth} value={depth}>
                          Depth {depth} {depth === 1 ? '(Surface)' : depth === selectedLens.recursiveDepth ? '(Maximum)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={applyLens} 
                    className="w-full"
                    disabled={!applicationInput}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Apply Lens Analysis
                  </Button>
                </CardContent>
              </Card>

              {applicationResults && (
                <Card>
                  <CardHeader>
                    <CardTitle>Analysis Results</CardTitle>
                    <CardDescription>
                      Results from applying {selectedLens.name} at depth {applicationResults.depth}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="questions" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="questions">Questions</TabsTrigger>
                        <TabsTrigger value="insights">Insights</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="questions" className="space-y-2">
                        <div className="max-h-64 overflow-y-auto space-y-2">
                          {applicationResults.results.map((result, index) => (
                            <div key={index} className="text-sm p-2 bg-gray-50 rounded">
                              {result}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="insights" className="space-y-2">
                        <div className="max-h-64 overflow-y-auto space-y-2">
                          {applicationResults.insights.map((insight, index) => (
                            <div key={index} className="text-sm p-2 bg-blue-50 rounded text-blue-800">
                              {insight}
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Lens</h3>
                <p className="text-gray-600">
                  Choose an analytical lens from the library to explore its details and apply it to your analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
