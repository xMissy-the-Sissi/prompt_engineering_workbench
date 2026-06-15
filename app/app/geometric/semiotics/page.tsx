
'use client';

import React, { useState } from 'react';
import { Shapes, Copy, Save, Download, RefreshCw, Eye, Layers, Zap, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

export default function SemioticsPage() {
  const [analysisContext, setAnalysisContext] = useState('cultural');
  const [symbolicDomain, setSymbolicDomain] = useState('geometric');
  const [inputSymbols, setInputSymbols] = useState('');
  const [meaningLayers, setMeaningLayers] = useState(['denotative', 'connotative']);
  const [culturalFramework, setCulturalFramework] = useState('western');
  const [analysisDepth, setAnalysisDepth] = useState('comprehensive');
  const [generatedAnalysis, setGeneratedAnalysis] = useState('');
  const [symbolicMap, setSymbolicMap] = useState('');

  const analysisContexts = [
    { id: 'cultural', name: 'Cultural Analysis', description: 'Society and cultural meaning interpretation' },
    { id: 'geometric', name: 'Geometric Symbolism', description: 'Shape and spatial meaning analysis' },
    { id: 'historical', name: 'Historical Context', description: 'Temporal and evolutionary meaning' },
    { id: 'psychological', name: 'Psychological Interpretation', description: 'Cognitive and emotional responses' },
    { id: 'linguistic', name: 'Linguistic Semiotics', description: 'Language and communication analysis' },
    { id: 'visual', name: 'Visual Semiotics', description: 'Image and visual meaning interpretation' }
  ];

  const symbolicDomains = [
    { id: 'geometric', name: 'Geometric Shapes', description: 'Circles, triangles, squares, polygons' },
    { id: 'color', name: 'Color Symbolism', description: 'Color meanings and associations' },
    { id: 'spatial', name: 'Spatial Relations', description: 'Position, direction, and arrangement' },
    { id: 'textual', name: 'Textual Symbols', description: 'Letters, words, and typographic elements' },
    { id: 'natural', name: 'Natural Symbols', description: 'Elements from nature and environment' },
    { id: 'cultural', name: 'Cultural Artifacts', description: 'Objects with cultural significance' },
    { id: 'numerical', name: 'Numerical Symbolism', description: 'Numbers and mathematical concepts' },
    { id: 'temporal', name: 'Temporal Symbols', description: 'Time-based and sequential meanings' }
  ];

  const meaningLayerTypes = [
    { id: 'denotative', name: 'Denotative Layer', description: 'Direct, literal meaning' },
    { id: 'connotative', name: 'Connotative Layer', description: 'Associated and implied meanings' },
    { id: 'mythic', name: 'Mythic Layer', description: 'Deep cultural and archetypal meanings' },
    { id: 'symbolic', name: 'Symbolic Layer', description: 'Abstract and metaphorical representations' },
    { id: 'indexical', name: 'Indexical Layer', description: 'Causal and contextual relationships' },
    { id: 'iconic', name: 'Iconic Layer', description: 'Resemblance and similarity-based meanings' }
  ];

  const culturalFrameworks = [
    { id: 'western', name: 'Western Culture', description: 'European and North American contexts' },
    { id: 'eastern', name: 'Eastern Culture', description: 'Asian philosophical and cultural contexts' },
    { id: 'indigenous', name: 'Indigenous Cultures', description: 'Traditional and tribal symbolism' },
    { id: 'contemporary', name: 'Contemporary Global', description: 'Modern digital and global culture' },
    { id: 'religious', name: 'Religious Traditions', description: 'Spiritual and religious symbolism' },
    { id: 'academic', name: 'Academic Discourse', description: 'Scholarly and scientific contexts' }
  ];

  const analysisDepths = [
    { id: 'surface', name: 'Surface Analysis', description: 'Basic symbolic identification' },
    { id: 'intermediate', name: 'Intermediate Analysis', description: 'Cultural and contextual meanings' },
    { id: 'comprehensive', name: 'Comprehensive Analysis', description: 'Multi-layered deep analysis' },
    { id: 'exhaustive', name: 'Exhaustive Analysis', description: 'Complete semiotic deconstruction' }
  ];

  const generateAnalysis = () => {
    if (!inputSymbols.trim()) {
      toast.error('Please provide symbols or content to analyze');
      return;
    }

    const contextInfo = analysisContexts.find(c => c.id === analysisContext);
    const domainInfo = symbolicDomains.find(d => d.id === symbolicDomain);
    const frameworkInfo = culturalFrameworks.find(f => f.id === culturalFramework);
    const depthInfo = analysisDepths.find(d => d.id === analysisDepth);

    const analysis = `SEMIOTIC ANALYSIS REPORT

ANALYSIS CONFIGURATION:
Context: ${contextInfo?.name}
Domain: ${domainInfo?.name}
Cultural Framework: ${frameworkInfo?.name}
Analysis Depth: ${depthInfo?.name}

INPUT SYMBOLS/CONTENT:
${inputSymbols}

SYMBOLIC STRUCTURE ANALYSIS:
${generateSymbolicStructure()}

MEANING LAYER ANALYSIS:
${generateMeaningLayerAnalysis()}

CULTURAL CONTEXT INTERPRETATION:
${generateCulturalContext()}

GEOMETRIC SYMBOLISM MAPPING:
${generateGeometricSymbolism()}

POWER STRUCTURE ANALYSIS:
${generatePowerStructureAnalysis()}

HISTORICAL EVOLUTION:
${generateHistoricalEvolution()}

PSYCHOLOGICAL INTERPRETATION:
${generatePsychologicalInterpretation()}

CROSS-CULTURAL COMPARISON:
${generateCrossCulturalComparison()}

SYMBOLIC TRANSFORMATIONS:
${generateSymbolicTransformations()}

INTERPRETIVE FRAMEWORKS:
${generateInterpretiveFrameworks()}

PRACTICAL APPLICATIONS:
${generatePracticalApplications()}

VALIDATION AND VERIFICATION:
${generateValidationFramework()}`;

    setGeneratedAnalysis(analysis);
    
    // Generate symbolic mapping
    const mapping = generateSymbolicMapping();
    setSymbolicMap(mapping);
    
    toast.success('Semiotic analysis completed');
  };

  const generateSymbolicStructure = () => {
    const structures = {
      'geometric': `Primary Symbols: ${getGeometricSymbols()}
Secondary Symbols: Derived forms and combinations
Symbolic Relationships: Spatial arrangements and proportional relationships
Hierarchical Structure: Central → peripheral, large → small`,
      
      'color': `Primary Colors: Dominant hues and their symbolic weight
Secondary Colors: Supporting and contrasting elements
Color Relationships: Complementary, analogous, and triadic schemes
Symbolic Hierarchy: Cultural significance and emotional impact`,
      
      'spatial': `Spatial Organization: Center, periphery, directional orientations
Positional Significance: Above/below, left/right, inside/outside
Movement Patterns: Flow, progression, and transition indicators
Boundary Definitions: Inclusion, exclusion, and liminal spaces`,
      
      'textual': `Typographic Elements: Font choice, size, weight, and style
Textual Hierarchy: Headers, body text, captions, and annotations
Linguistic Structure: Syntax, semantics, and pragmatic elements
Symbolic Integration: Text-image relationships and meaning creation`
    };

    return structures[symbolicDomain as keyof typeof structures] || structures.geometric;
  };

  const getGeometricSymbols = () => {
    const symbols = [
      'Circle: Unity, wholeness, infinity, cycles',
      'Triangle: Stability, hierarchy, divine trinity', 
      'Square: Order, stability, earth, materiality',
      'Pentagon: Human form, balance, golden ratio',
      'Hexagon: Nature, efficiency, crystalline structure',
      'Spiral: Growth, evolution, cosmic order'
    ];
    return symbols.join('\n');
  };

  const generateMeaningLayerAnalysis = () => {
    const selectedLayers = meaningLayerTypes.filter(l => meaningLayers.includes(l.id));
    
    return selectedLayers.map(layer => {
      const layerAnalysis = generateLayerSpecificAnalysis(layer.id);
      return `${layer.name}:
${layer.description}
${layerAnalysis}`;
    }).join('\n\n');
  };

  const generateLayerSpecificAnalysis = (layerId: string) => {
    const analyses: Record<string, string> = {
      'denotative': `Direct Meaning: Literal identification and basic categorization
Observable Features: Physical characteristics and measurable properties
Factual Content: Objective description without interpretation
Universal Recognition: Cross-cultural basic identification`,
      
      'connotative': `Associated Meanings: Cultural and personal associations
Emotional Resonance: Feelings and mood evocations
Social Implications: Status, group identity, and social positioning
Historical Connections: Time-period and contextual associations`,
      
      'mythic': `Archetypal Patterns: Universal human symbols and motifs
Creation Narratives: Origin stories and foundational myths
Hero's Journey: Transformation and growth narratives
Collective Unconscious: Deep psychological and spiritual meanings`,
      
      'symbolic': `Abstract Representations: Concepts beyond literal form
Metaphorical Mappings: Conceptual connections and analogies
Philosophical Implications: Existential and metaphysical meanings
Systems of Meaning: Integrated symbolic frameworks`,
      
      'indexical': `Causal Relationships: Cause-effect connections and traces
Contextual Dependencies: Environmental and situational factors
Evidence and Traces: Signs pointing to absent referents
Temporal Connections: Before-after and sequential relationships`,
      
      'iconic': `Resemblance Patterns: Similarity-based meaning relationships
Visual Analogies: Form-based connections and comparisons
Mimetic Qualities: Imitation and representation aspects
Perceptual Similarities: Sensory and experiential parallels`
    };

    return analyses[layerId] || 'Analysis of symbolic layer meaning and interpretation';
  };

  const generateCulturalContext = () => {
    const frameworks: Record<string, string> = {
      'western': `Western Symbolic Framework:
- Individual agency and personal achievement
- Linear time progression and goal orientation
- Rationality and scientific methodology
- Democratic values and egalitarian ideals
- Material progress and technological advancement`,
      
      'eastern': `Eastern Symbolic Framework:
- Collective harmony and social balance
- Cyclical time and eternal return concepts
- Intuitive wisdom and contemplative practice
- Hierarchical respect and ancestral veneration
- Spiritual development and inner cultivation`,
      
      'indigenous': `Indigenous Symbolic Framework:
- Relationship with natural world and environment
- Circular time and seasonal consciousness
- Oral tradition and storytelling wisdom
- Community solidarity and collective responsibility
- Spiritual animism and sacred geography`,
      
      'contemporary': `Contemporary Global Framework:
- Digital connectivity and virtual relationships
- Rapid change and technological acceleration
- Global awareness and cultural hybridization
- Consumer identity and brand symbolism
- Environmental consciousness and sustainability`,
      
      'religious': `Religious Symbolic Framework:
- Sacred and profane distinctions
- Transcendent meaning and divine purpose
- Ritual practice and ceremonial significance
- Moral order and ethical frameworks
- Community worship and collective belief`,
      
      'academic': `Academic Symbolic Framework:
- Knowledge creation and intellectual inquiry
- Peer review and scholarly validation
- Disciplinary boundaries and methodological rigor
- Critical thinking and analytical reasoning
- Educational hierarchy and credential systems`
    };

    return frameworks[culturalFramework] || frameworks.western;
  };

  const generateGeometricSymbolism = () => {
    return `Geometric Symbolic Analysis:

Shape Symbolism:
- Circles: Perfection, unity, eternity, protection, wholeness
- Triangles: Stability, ascension, trinity, masculinity, conflict
- Squares: Order, material world, stability, limitation, earth
- Pentagons: Human form, balance, natural harmony, sacred geometry
- Hexagons: Nature's efficiency, crystalline structure, beehive community
- Spirals: Growth, evolution, cosmic order, life force, transformation

Spatial Meaning:
- Center: Focus, importance, sacred space, control, power
- Periphery: Marginality, boundary, transition, protection, exclusion
- Vertical: Hierarchy, aspiration, spiritual ascent, authority, growth
- Horizontal: Equality, earthly plane, temporal progression, community
- Diagonal: Dynamic tension, movement, instability, change, energy

Proportional Relationships:
- Golden Ratio: Divine proportion, natural beauty, perfect harmony
- Symmetry: Balance, order, stability, classical beauty, perfection
- Asymmetry: Dynamic tension, modern aesthetics, natural variation
- Scale Relationships: Hierarchy, importance, emphasis, visual weight

Transformational Symbolism:
- Rotation: Change, cycle, cosmic order, temporal progression
- Reflection: Duality, mirror worlds, self-examination, symmetry
- Translation: Movement, journey, progress, displacement, flow
- Scaling: Growth, importance, emphasis, hierarchical relationships`;
  };

  const generatePowerStructureAnalysis = () => {
    return `Power Structure and Ideological Analysis:

Hierarchical Representations:
- Vertical arrangements indicating authority and subordination
- Size relationships demonstrating importance and influence
- Central positioning showing control and dominance
- Color coding representing status and privilege

Inclusion/Exclusion Mechanisms:
- Boundary creation and maintenance
- Access control and gatekeeping symbols
- In-group/out-group visual markers
- Privilege indicators and status symbols

Ideological Reinforcement:
- Naturalization of social arrangements
- Legitimization of existing power structures
- Normalization of inequality and difference
- Symbolic violence and subtle coercion

Resistance and Counter-Narratives:
- Subversive symbol appropriation
- Alternative meaning construction
- Underground and marginalized symbolism
- Protest and opposition visual languages

Economic Symbolism:
- Wealth and poverty visual markers
- Consumer culture and brand symbolism
- Labor and class representation
- Economic aspiration and success symbols`;
  };

  const generateHistoricalEvolution = () => {
    return `Historical Evolution of Symbolic Meanings:

Temporal Development:
- Ancient origins and mythological foundations
- Medieval transformations and religious influences
- Renaissance revival and humanistic reinterpretation
- Modern industrial and technological impacts
- Contemporary digital and global transformations

Cultural Transmission:
- Migration and cultural exchange processes
- Colonial impact and symbolic appropriation
- Globalization and meaning homogenization
- Digital culture and virtual symbol systems
- Generation gaps and changing interpretations

Semantic Drift:
- Original meaning erosion and transformation
- New context adoption and adaptation
- Popular culture influence and commercialization
- Academic reinterpretation and theoretical frameworks
- Contemporary relevance and updated significance

Preservation and Revival:
- Traditional knowledge maintenance efforts
- Cultural heritage and symbolic conservation
- Academic study and documentation projects
- Artistic revival and contemporary reinterpretation
- Digital archiving and accessible preservation`;
  };

  const generatePsychologicalInterpretation = () => {
    return `Psychological and Cognitive Analysis:

Cognitive Processing:
- Pattern recognition and gestalt principles
- Memory activation and associative networks
- Attention capture and visual hierarchy
- Cognitive load and processing efficiency
- Emotional response and affective processing

Archetypal Resonance:
- Universal symbolic patterns and recognition
- Unconscious association and automatic responses
- Collective memory and shared human experiences
- Individual variation and personal history
- Cultural conditioning and learned responses

Emotional Impact:
- Color psychology and mood influence
- Shape associations and feeling states
- Spatial relationships and comfort levels
- Symmetry preferences and aesthetic pleasure
- Complexity tolerance and cognitive strain

Behavioral Influence:
- Decision-making and choice architecture
- Persuasion and influence mechanisms
- Group behavior and social conformity
- Identity formation and self-expression
- Cultural adaptation and meaning negotiation

Developmental Considerations:
- Age-related interpretation differences
- Cultural learning and symbolic acquisition
- Educational impact and meaning literacy
- Generational symbol system evolution
- Lifecycle meaning transformation`;
  };

  const generateCrossCulturalComparison = () => {
    return `Cross-Cultural Symbolic Comparison:

Universal Elements:
- Shared human experiences and biological constraints
- Common environmental and natural phenomena
- Basic geometric forms and spatial relationships
- Primary color associations and perceptual constants
- Fundamental life cycle and seasonal patterns

Cultural Variations:
- Religious and spiritual interpretation differences
- Historical context and collective memory impact
- Language structure and conceptual frameworks
- Social organization and power structure reflections
- Economic system and value structure influences

Translation Challenges:
- Untranslatable symbolic concepts
- Context-dependent meaning variations
- Colonial and power dynamic impacts
- Globalization and cultural homogenization
- Digital culture and virtual symbol emergence

Synthesis Opportunities:
- Hybrid symbol system development
- Cross-cultural dialogue and understanding
- Global symbolic literacy and education
- Respectful appropriation and cultural exchange
- Universal design and accessible symbolism

Conflict Resolution:
- Competing interpretation negotiation
- Cultural sensitivity and respect protocols
- Misunderstanding prevention and correction
- Inclusive symbol system development
- Peaceful coexistence and mutual recognition`;
  };

  const generateSymbolicTransformations = () => {
    return `Symbolic Transformation Patterns:

Geometric Transformations:
- Rotation: Symbolic revolution and cyclical change
- Reflection: Duality exploration and mirror meanings
- Scaling: Emphasis and hierarchical positioning
- Translation: Movement and progressive development
- Distortion: Tension and dynamic interpretation

Meaning Transformations:
- Metaphorical extension and analogical thinking
- Metonymic reduction and part-whole relationships
- Synecdoche and representative symbolism
- Irony and contrary meaning development
- Hybridization and cultural mixing

Temporal Transformations:
- Historical recontextualization
- Contemporary reinterpretation
- Future projection and speculative meaning
- Nostalgia and romantic idealization
- Progress narratives and evolutionary thinking

Media Transformations:
- Digital representation and pixel-based meaning
- Interactive symbolism and user-generated content
- Virtual reality and immersive symbol systems
- Augmented reality and layered meaning
- Artificial intelligence and algorithmic interpretation`;
  };

  const generateInterpretiveFrameworks = () => {
    return `Interpretive Frameworks and Methodologies:

Structuralist Approach:
- Binary opposition identification
- System of differences analysis
- Paradigmatic and syntagmatic relationships
- Deep structure and surface manifestation
- Universal grammar and symbolic logic

Post-Structuralist Critique:
- Meaning instability and deconstruction
- Power dynamics and ideological critique
- Reader response and interpretation diversity
- Context dependency and situational meaning
- Difference and deferral of fixed meaning

Phenomenological Interpretation:
- Lived experience and embodied meaning
- Intentionality and consciousness structure
- Temporal flow and meaning emergence
- Intersubjectivity and shared understanding
- Lifeworld and everyday symbolic practice

Hermeneutic Understanding:
- Historical horizon and tradition impact
- Fusion of horizons and interpretive dialogue
- Prejudice acknowledgment and perspective integration
- Circular understanding and iterative interpretation
- Application and practical wisdom development

Pragmatic Analysis:
- Use context and functional meaning
- Speech act and performative symbolism
- Communication effectiveness and purpose
- Social action and symbolic interaction
- Practical consequences and real-world impact`;
  };

  const generatePracticalApplications = () => {
    return `Practical Applications and Implementation:

Design Applications:
- Brand identity and corporate symbolism
- User interface and experience design
- Architectural and spatial planning
- Product design and symbolic functionality
- Communication design and visual rhetoric

Educational Implementation:
- Symbol literacy and critical thinking
- Cultural competency and global awareness
- Visual communication and media literacy
- Historical understanding and context appreciation
- Creative expression and artistic development

Therapeutic Applications:
- Art therapy and symbolic expression
- Cultural healing and identity work
- Trauma processing and meaning making
- Group therapy and community building
- Personal growth and self-understanding

Research Applications:
- Cultural analysis and ethnographic study
- Media analysis and communication research
- Historical investigation and archaeology
- Psychological study and cognitive research
- Anthropological fieldwork and documentation

Policy and Planning:
- Inclusive design and accessibility
- Cultural preservation and heritage protection
- Public space planning and community design
- International relations and diplomatic protocol
- Social justice and equitable representation`;
  };

  const generateValidationFramework = () => {
    return `Validation and Verification Methods:

Expert Validation:
- Cultural authority consultation
- Academic peer review and criticism
- Practitioner feedback and real-world testing
- Historical accuracy and scholarly verification
- Cross-disciplinary expert integration

Community Validation:
- Cultural community input and approval
- User testing and audience feedback
- Focus group analysis and response measurement
- Participatory research and collaborative interpretation
- Grassroots validation and authentic representation

Empirical Testing:
- Psychological measurement and response analysis
- Behavioral observation and usage patterns
- Statistical analysis and quantitative assessment
- Experimental design and controlled testing
- Longitudinal study and temporal validation

Theoretical Validation:
- Consistency with established theoretical frameworks
- Logical coherence and internal consistency
- Explanatory power and predictive capability
- Integration with existing knowledge systems
- Innovation and theoretical advancement

Practical Validation:
- Real-world application and effectiveness
- Problem-solving capability and utility
- Implementation feasibility and resource requirements
- Scalability and adaptation potential
- Sustainability and long-term viability`;
  };

  const generateSymbolicMapping = () => {
    return `SYMBOLIC MAPPING REFERENCE

Domain: ${symbolicDomain}
Framework: ${culturalFramework}
Analysis: ${analysisDepth}

Primary Symbol Mappings:
- Input symbols → Cultural meanings
- Geometric forms → Psychological responses
- Color elements → Emotional associations
- Spatial relations → Social hierarchies

Transformation Rules:
1. Direct correspondence mapping
2. Metaphorical extension patterns
3. Cultural adaptation protocols
4. Contextual meaning adjustment

Validation Criteria:
- Cultural authenticity
- Historical accuracy
- Psychological validity
- Practical applicability`;
  };

  const toggleMeaningLayer = (layer: string) => {
    setMeaningLayers(prev => 
      prev.includes(layer) 
        ? prev.filter(l => l !== layer)
        : [...prev, layer]
    );
  };

  const copyAnalysis = async () => {
    if (generatedAnalysis) {
      try {
        await navigator.clipboard.writeText(generatedAnalysis);
        toast.success('Analysis copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy analysis');
      }
    } else {
      toast.error('No analysis to copy');
    }
  };

  const saveAnalysis = async () => {
    if (!generatedAnalysis) {
      toast.error('No analysis to save');
      return;
    }

    try {
      const analysisData = {
        analysisContext,
        symbolicDomain,
        inputSymbols: inputSymbols.substring(0, 500),
        meaningLayers,
        culturalFramework,
        analysisDepth,
        generatedAnalysis,
        symbolicMap,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving semiotic analysis:', analysisData);
      toast.success('Analysis saved successfully');
    } catch (err) {
      toast.error('Failed to save analysis');
    }
  };

  const exportAnalysis = () => {
    if (!generatedAnalysis) {
      toast.error('No analysis to export');
      return;
    }

    try {
      const fullReport = `${generatedAnalysis}\n\n--- SYMBOLIC MAPPING ---\n${symbolicMap}`;
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fullReport);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `semiotic_analysis_${symbolicDomain}_${Date.now()}.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Analysis exported successfully');
    } catch (err) {
      toast.error('Failed to export analysis');
    }
  };

  const loadExample = () => {
    setAnalysisContext('cultural');
    setSymbolicDomain('geometric');
    setInputSymbols('A circular logo containing a triangle pointing upward, surrounded by six smaller circles arranged in a hexagonal pattern, with blue and gold color scheme.');
    setMeaningLayers(['denotative', 'connotative', 'mythic']);
    setCulturalFramework('western');
    setAnalysisDepth('comprehensive');
    toast.info('Example symbolic content loaded for analysis');
  };

  const clearAll = () => {
    setInputSymbols('');
    setGeneratedAnalysis('');
    setSymbolicMap('');
    setMeaningLayers(['denotative']);
    toast.info('Form cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-green-100 rounded-lg">
            <Shapes className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Semiotics Analyzer</h1>
            <p className="text-lg text-gray-600">Complete symbol-meaning relationship mapping and cultural analysis</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>• Symbol Analysis</span>
          <span>• Cultural Mapping</span>
          <span>• Meaning Layers</span>
          <span>• Power Structures</span>
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

          <Tabs defaultValue="context" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="context">Context</TabsTrigger>
              <TabsTrigger value="symbols">Symbols</TabsTrigger>
              <TabsTrigger value="meanings">Meanings</TabsTrigger>
            </TabsList>

            <TabsContent value="context" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Analysis Context</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Analysis Context</Label>
                    <Select value={analysisContext} onValueChange={setAnalysisContext}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {analysisContexts.map(context => (
                          <SelectItem key={context.id} value={context.id}>
                            {context.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {analysisContexts.find(c => c.id === analysisContext)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Cultural Framework</Label>
                    <Select value={culturalFramework} onValueChange={setCulturalFramework}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {culturalFrameworks.map(framework => (
                          <SelectItem key={framework.id} value={framework.id}>
                            {framework.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {culturalFrameworks.find(f => f.id === culturalFramework)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Analysis Depth</Label>
                    <Select value={analysisDepth} onValueChange={setAnalysisDepth}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {analysisDepths.map(depth => (
                          <SelectItem key={depth.id} value={depth.id}>
                            {depth.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {analysisDepths.find(d => d.id === analysisDepth)?.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="symbols" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Symbolic Content</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Symbolic Domain</Label>
                    <Select value={symbolicDomain} onValueChange={setSymbolicDomain}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {symbolicDomains.map(domain => (
                          <SelectItem key={domain.id} value={domain.id}>
                            {domain.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {symbolicDomains.find(d => d.id === symbolicDomain)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Symbols/Content to Analyze</Label>
                    <Textarea
                      value={inputSymbols}
                      onChange={(e) => setInputSymbols(e.target.value)}
                      placeholder="Describe the symbols, images, text, or content you want to analyze. Include details about shapes, colors, positions, and any cultural context..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-sm text-green-900 mb-2">Analysis Preview</h4>
                    <p className="text-sm text-green-800">
                      Analyzing {symbolicDomain} symbols through {culturalFramework} cultural framework
                      with {analysisDepth} depth in {analysisContext} context.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meanings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="h-5 w-5" />
                    <span>Meaning Layers</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {meaningLayerTypes.map(layer => (
                      <div key={layer.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={layer.id}
                          checked={meaningLayers.includes(layer.id)}
                          onCheckedChange={() => toggleMeaningLayer(layer.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={layer.id} className="text-sm font-medium">
                            {layer.name}
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
                            {layer.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected: {meaningLayers.length} meaning layer{meaningLayers.length !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {meaningLayers.map(layer => {
                        const layerInfo = meaningLayerTypes.find(l => l.id === layer);
                        return (
                          <Badge key={layer} variant="secondary" className="text-xs">
                            {layerInfo?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={generateAnalysis} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Generate Semiotic Analysis
          </Button>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Shapes className="h-5 w-5" />
                    <span>Semiotic Analysis</span>
                  </CardTitle>
                  <CardDescription>
                    Comprehensive symbol-meaning relationship analysis
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={copyAnalysis} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={saveAnalysis} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportAnalysis} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedAnalysis}
                onChange={(e) => setGeneratedAnalysis(e.target.value)}
                placeholder="Click 'Generate Semiotic Analysis' to create a comprehensive symbol analysis..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {symbolicMap && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Symbolic Mapping Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                  {symbolicMap}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-green-50 to-teal-50">
        <CardHeader>
          <CardTitle>Semiotics Analysis Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Multi-Layer Analysis</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive examination across denotative, connotative, mythic, and 
                symbolic layers for complete meaning interpretation.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cultural Mapping</h4>
              <p className="text-gray-600 text-sm">
                Cross-cultural analysis with framework-specific interpretations and 
                power structure examination for contextual understanding.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Practical Application</h4>
              <p className="text-gray-600 text-sm">
                Real-world applications in design, education, therapy, and research 
                with validation frameworks and implementation guidance.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

