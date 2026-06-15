
'use client';

import React, { useState } from 'react';
import { Globe, Copy, Save, Download, RefreshCw, Clock, MapPin, Zap, BookOpen } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

export default function NarrativeGeometryPage() {
  const [narrativeType, setNarrativeType] = useState('hero_journey');
  const [geometricBase, setGeometricBase] = useState('circle');
  const [storyTitle, setStoryTitle] = useState('');
  const [storyPremise, setStoryPremise] = useState('');
  const [temporalStructure, setTemporalStructure] = useState(['linear', 'cyclical']);
  const [dimensionality, setDimensionality] = useState([3]);
  const [complexityLevel, setComplexityLevel] = useState([6]);
  const [generatedStructure, setGeneratedStructure] = useState('');
  const [geometricMapping, setGeometricMapping] = useState('');

  const narrativeTypes = [
    { id: 'hero_journey', name: 'Hero\'s Journey', description: 'Classical monomyth structure with transformation arc' },
    { id: 'three_act', name: 'Three-Act Structure', description: 'Setup, confrontation, and resolution framework' },
    { id: 'freytag', name: 'Freytag\'s Pyramid', description: 'Exposition, rising action, climax, falling action, resolution' },
    { id: 'circular', name: 'Circular Narrative', description: 'Stories that end where they begin with deeper understanding' },
    { id: 'nonlinear', name: 'Non-linear Structure', description: 'Complex temporal arrangements and parallel timelines' },
    { id: 'spiral', name: 'Spiral Narrative', description: 'Recursive themes with increasing complexity and depth' },
    { id: 'fractal', name: 'Fractal Structure', description: 'Self-similar patterns at multiple narrative scales' },
    { id: 'episodic', name: 'Episodic Structure', description: 'Connected episodes with thematic coherence' }
  ];

  const geometricBases = [
    { id: 'circle', name: 'Circle', description: 'Unity, cycles, completeness, eternal return' },
    { id: 'triangle', name: 'Triangle', description: 'Conflict, tension, resolution, stability' },
    { id: 'square', name: 'Square', description: 'Balance, order, four-part structure, foundation' },
    { id: 'pentagon', name: 'Pentagon', description: 'Human-centered, five-act structure, golden ratio' },
    { id: 'hexagon', name: 'Hexagon', description: 'Natural efficiency, six-part harmony, crystalline structure' },
    { id: 'spiral', name: 'Spiral', description: 'Growth, evolution, progressive development, cosmic order' },
    { id: 'helix', name: 'Double Helix', description: 'Dual narratives, parallel development, genetic structure' },
    { id: 'mobius', name: 'Möbius Strip', description: 'Infinite loop, paradox, perspective transformation' }
  ];

  const temporalStructureTypes = [
    { id: 'linear', name: 'Linear Time', description: 'Chronological progression from past to future' },
    { id: 'cyclical', name: 'Cyclical Time', description: 'Recurring patterns and seasonal rhythms' },
    { id: 'spiral', name: 'Spiral Time', description: 'Recursive cycles with progressive evolution' },
    { id: 'branching', name: 'Branching Time', description: 'Multiple timeline possibilities and choices' },
    { id: 'layered', name: 'Layered Time', description: 'Multiple temporal levels and perspectives' },
    { id: 'fragmented', name: 'Fragmented Time', description: 'Non-continuous, mosaic temporal structure' }
  ];

  const generateStructure = () => {
    if (!storyTitle.trim() || !storyPremise.trim()) {
      toast.error('Please provide story title and premise');
      return;
    }

    const narrativeInfo = narrativeTypes.find(n => n.id === narrativeType);
    const geometricInfo = geometricBases.find(g => g.id === geometricBase);
    const selectedTemporal = temporalStructureTypes.filter(t => temporalStructure.includes(t.id));

    const structure = `NARRATIVE GEOMETRY CONSTRUCTION

STORY OVERVIEW:
Title: ${storyTitle}
Geometric Base: ${geometricInfo?.name}
Narrative Type: ${narrativeInfo?.name}
Dimensionality: ${dimensionality[0]}D structure
Complexity Level: ${complexityLevel[0]}/10

STORY PREMISE:
${storyPremise}

GEOMETRIC FOUNDATION:
${generateGeometricFoundation()}

TEMPORAL STRUCTURE:
${generateTemporalStructureDetails()}

SPATIAL NARRATIVE MAPPING:
${generateSpatialNarrative()}

STORY ARCHITECTURE:
${generateStoryArchitecture()}

CHARACTER POSITIONING:
${generateCharacterPositioning()}

CONFLICT GEOMETRY:
${generateConflictGeometry()}

NARRATIVE FLOW PATTERNS:
${generateNarrativeFlow()}

DIMENSIONAL MAPPING:
${generateDimensionalMapping()}

GEOMETRIC TRANSFORMATIONS:
${generateGeometricTransformations()}

STRUCTURAL HARMONY:
${generateStructuralHarmony()}

IMPLEMENTATION FRAMEWORK:
${generateImplementationFramework()}

VISUAL REPRESENTATION:
${generateVisualRepresentation()}

WRITING GUIDELINES:
${generateWritingGuidelines()}`;

    setGeneratedStructure(structure);
    
    // Generate geometric mapping
    const mapping = generateGeometricMappingDetails();
    setGeometricMapping(mapping);
    
    toast.success('Narrative geometry structure generated successfully');
  };

  const generateGeometricFoundation = () => {
    const geometricInfo = geometricBases.find(g => g.id === geometricBase);
    
    const foundations: Record<string, string> = {
      'circle': `Circular Foundation: ${geometricInfo?.description}
- Center Point: Core conflict or central character
- Radius: Story scope and influence range
- Circumference: Journey path and story boundary
- Sectors: Character arcs and thematic divisions
- Rotational Symmetry: Recurring themes and motifs`,
      
      'triangle': `Triangular Foundation: ${geometricInfo?.description}
- Three Vertices: Major plot points or character triangle
- Three Sides: Act boundaries and structural connections
- Base: Stable foundation and established world
- Apex: Climactic moment and peak tension
- Internal Angles: Relationship dynamics and tension`,
      
      'square': `Square Foundation: ${geometricInfo?.description}
- Four Corners: Major story elements or seasons
- Four Sides: Act boundaries and structural progression
- Center: Central theme or core message
- Diagonals: Cross-connections and deeper relationships
- Symmetry: Balanced structure and proportional elements`,
      
      'pentagon': `Pentagonal Foundation: ${geometricInfo?.description}
- Five Points: Five-act structure or character ensemble
- Golden Ratio: Natural proportions and pleasing structure
- Central Pentagon: Core story and essential elements
- Outer Connections: Extended world and context
- Star Pattern: Internal connections and thematic links`,
      
      'hexagon': `Hexagonal Foundation: ${geometricInfo?.description}
- Six Sides: Six-part story structure or character hexad
- Natural Efficiency: Optimal narrative resource utilization
- Tessellation: Connection to larger story universe
- Internal Triangles: Sub-plot structures and nested stories
- Crystalline Growth: Systematic story development`,
      
      'spiral': `Spiral Foundation: ${geometricInfo?.description}
- Center: Origin point and initial condition
- Expanding Radius: Growing complexity and scope
- Pitch: Rate of development and progression speed
- Turns: Recursive themes and deepening understanding
- Golden Spiral: Natural growth and aesthetic proportion`,
      
      'helix': `Helical Foundation: ${geometricInfo?.description}
- Dual Strands: Two intertwining narrative threads
- Base Pairs: Connected plot points and character moments
- Pitch: Rate of narrative development and complexity
- Handedness: Directional bias and perspective orientation
- Double Structure: Parallel development and convergence`,
      
      'mobius': `Möbius Foundation: ${geometricInfo?.description}
- Single Surface: Unified narrative space
- Twist: Perspective transformation and revelation
- Continuity: Seamless story flow and connection
- Paradox: Contradiction and mystery elements
- Infinite Loop: Cyclical structure with transformation`
    };

    return foundations[geometricBase] || foundations.circle;
  };

  const generateTemporalStructureDetails = () => {
    const selectedTemporal = temporalStructureTypes.filter(t => temporalStructure.includes(t.id));
    
    return `Temporal Architecture (${selectedTemporal.length} layers):

${selectedTemporal.map(temporal => {
      const temporalAnalysis = generateTemporalAnalysis(temporal.id);
      return `${temporal.name}:
${temporal.description}
${temporalAnalysis}`;
    }).join('\n\n')}

Temporal Integration:
- Primary Temporal Mode: ${temporalStructure[0]}
- Secondary Temporal Layers: ${temporalStructure.slice(1).join(', ') || 'None'}
- Temporal Transitions: ${generateTemporalTransitions()}
- Rhythm and Pacing: ${generateRhythmPacing()}

Time-Geometry Mapping:
${generateTimeGeometryMapping()}`;
  };

  const generateTemporalAnalysis = (temporalId: string) => {
    const analyses: Record<string, string> = {
      'linear': `Sequential Development: Past → Present → Future progression
Causal Chain: Each event leads to the next in logical sequence
Reader Experience: Forward momentum and anticipation building
Geometric Mapping: Straight lines, progressive vectors, directional flow`,
      
      'cyclical': `Recurring Patterns: Seasonal, generational, or thematic cycles
Return Journeys: Stories that circle back to origins with new understanding
Reader Experience: Recognition, familiarity, and deepening appreciation
Geometric Mapping: Circles, loops, orbital patterns, closed curves`,
      
      'spiral': `Progressive Cycles: Returning themes with increased complexity
Evolutionary Development: Growth through repeated patterns
Reader Experience: Familiar yet evolving, deepening understanding
Geometric Mapping: Spirals, helices, expanding or contracting curves`,
      
      'branching': `Multiple Possibilities: Choice points and alternative outcomes
Parallel Timelines: Simultaneous development of different scenarios
Reader Experience: Anticipation, speculation, active engagement
Geometric Mapping: Tree structures, fork patterns, diverging paths`,
      
      'layered': `Multiple Timeframes: Simultaneous past, present, and future layers
Depth of Perspective: Different temporal viewpoints on same events
Reader Experience: Rich understanding, complex interpretation
Geometric Mapping: Stacked planes, layered surfaces, dimensional depth`,
      
      'fragmented': `Non-linear Sequence: Disconnected temporal moments
Mosaic Structure: Pieces that form complete picture when assembled
Reader Experience: Active reconstruction, puzzle-solving engagement
Geometric Mapping: Scattered points, fragmented shapes, mosaic patterns`
    };

    return analyses[temporalId] || 'Temporal structure analysis';
  };

  const generateTemporalTransitions = () => {
    return `Smooth transitions between temporal modes, bridge scenes for temporal shifts, clear markers for temporal changes, reader guidance through temporal complexity`;
  };

  const generateRhythmPacing = () => {
    const pacing: Record<string, string> = {
      'circle': 'Cyclical pacing with recurring rhythms and seasonal variations',
      'triangle': 'Building tension toward apex, then rapid resolution',
      'square': 'Balanced pacing with four equal movements and steady progression',
      'pentagon': 'Five-part rhythm with golden ratio pacing proportions',
      'hexagon': 'Six-movement rhythm with natural efficiency and balance',
      'spiral': 'Gradually accelerating or decelerating spiral progression',
      'helix': 'Dual rhythm with interweaving pacing between narrative strands',
      'mobius': 'Continuous flow with surprising perspective shifts'
    };
    
    return pacing[geometricBase] || pacing.circle;
  };

  const generateTimeGeometryMapping = () => {
    return `Temporal Vectors: Time represented as geometric directions and movements
Spatial Time: Physical space corresponding to temporal progression
Geometric Rhythm: Shape-based pacing and temporal proportions
Dimensional Time: ${dimensionality[0]}D representation of temporal complexity
Transformation Time: Shape changes representing temporal transitions`;
  };

  const generateSpatialNarrative = () => {
    const spatialMappings: Record<string, string> = {
      'circle': `Radial Narrative Space:
- Center: Core story elements and primary conflicts
- Inner Circle: Main characters and central relationships
- Middle Ring: Supporting characters and secondary plots
- Outer Ring: World context and environmental factors
- Circumference: Story boundaries and external influences`,
      
      'triangle': `Triangular Narrative Space:
- Base: Established world and initial conditions
- Left Side: Character development and internal journey
- Right Side: Plot development and external challenges
- Apex: Climactic convergence and resolution
- Interior: Tension fields and dramatic relationships`,
      
      'square': `Quadrilateral Narrative Space:
- Four Quadrants: Major story domains (character, plot, theme, setting)
- Horizontal Axis: Time progression and plot development
- Vertical Axis: Character depth and thematic exploration
- Center: Core story intersection and unifying elements
- Perimeter: Story boundaries and external context`,
      
      'pentagon': `Pentagonal Narrative Space:
- Five Regions: Character ensemble or five-act structure
- Central Pentagon: Core story and essential conflicts
- Radiating Lines: Character relationships and thematic connections
- Golden Proportions: Natural story rhythms and pleasing structure
- Star Connections: Hidden relationships and deeper patterns`,
      
      'hexagon': `Hexagonal Narrative Space:
- Six Regions: Character hexad or six-part story structure
- Central Hexagon: Core story elements and primary conflicts
- Triangular Subdivisions: Nested sub-plots and character triangles
- Efficient Packing: Optimal use of narrative space and resources
- Natural Boundaries: Organic story divisions and natural flow`,
      
      'spiral': `Spiral Narrative Space:
- Center: Origin point and initial story conditions
- Expanding Path: Progressive development and growing complexity
- Spiral Arms: Thematic development and character growth
- Pitch Variation: Changing rate of development and intensity
- Infinite Extension: Open-ended possibilities and continued growth`,
      
      'helix': `Helical Narrative Space:
- Dual Tracks: Two interweaving narrative strands
- Vertical Axis: Overall story progression and development
- Helical Path: Complex character relationships and plot interactions
- Connection Points: Moments where narrative strands intersect
- Three-Dimensional Flow: Rich spatial narrative development`,
      
      'mobius': `Möbius Narrative Space:
- Single Surface: Unified story world with internal complexity
- Twist Point: Major revelation or perspective transformation
- Continuous Path: Seamless story flow without clear beginning/end
- Inside/Outside: Blurred boundaries between different story aspects
- Paradoxical Structure: Stories that challenge conventional logic`
    };

    return spatialMappings[geometricBase] || spatialMappings.circle;
  };

  const generateStoryArchitecture = () => {
    const narrativeInfo = narrativeTypes.find(n => n.id === narrativeType);
    
    const architectures: Record<string, string> = {
      'hero_journey': `Monomyth Architecture:
1. Departure: Call to adventure, refusal, meeting mentor, crossing threshold
2. Initiation: Tests and trials, approach to ordeal, ordeal, reward
3. Return: Road back, resurrection, return with elixir
Geometric Integration: ${getGeometricIntegration('hero_journey')}`,
      
      'three_act': `Three-Act Architecture:
Act I: Setup - Ordinary world, inciting incident, plot point 1
Act II: Confrontation - Rising action, midpoint, plot point 2
Act III: Resolution - Climax, falling action, resolution
Geometric Integration: ${getGeometricIntegration('three_act')}`,
      
      'freytag': `Freytag's Pyramid Architecture:
1. Exposition: Background, characters, setting establishment
2. Rising Action: Complications, conflicts, tension building
3. Climax: Turning point, peak tension, crucial decision
4. Falling Action: Consequences, unraveling, resolution approach
5. Resolution: Conclusion, new equilibrium, final understanding
Geometric Integration: ${getGeometricIntegration('freytag')}`,
      
      'circular': `Circular Architecture:
Beginning/End: Same location/situation with transformed understanding
Quarter Points: Major transformations and perspective shifts
Midpoint: Maximum distance from origin, deepest change
Return Journey: Recognition, integration, new wisdom
Geometric Integration: ${getGeometricIntegration('circular')}`,
      
      'nonlinear': `Non-linear Architecture:
Multiple Timelines: Parallel development, intersection points
Fragmented Sequence: Pieces revealed in non-chronological order
Thematic Organization: Structure based on themes rather than time
Reader Assembly: Active reconstruction of complete narrative
Geometric Integration: ${getGeometricIntegration('nonlinear')}`,
      
      'spiral': `Spiral Architecture:
Center: Core conflict or central mystery
Expanding Turns: Growing understanding and complexity
Recursive Themes: Similar issues at different levels
Progressive Development: Evolution through repetition
Geometric Integration: ${getGeometricIntegration('spiral')}`,
      
      'fractal': `Fractal Architecture:
Self-Similar Patterns: Story structure repeated at multiple scales
Nested Stories: Stories within stories with similar patterns
Scale Invariance: Themes consistent across different levels
Infinite Detail: Rich development at every level of analysis
Geometric Integration: ${getGeometricIntegration('fractal')}`,
      
      'episodic': `Episodic Architecture:
Connected Episodes: Self-contained segments with thematic unity
Recurring Characters: Character development across episodes
Thematic Coherence: Unified themes and consistent world
Flexible Structure: Allows for expansion and modification
Geometric Integration: ${getGeometricIntegration('episodic')}`
    };

    return architectures[narrativeType] || architectures.hero_journey;
  };

  const getGeometricIntegration = (narrativeType: string) => {
    const integrations: Record<string, Record<string, string>> = {
      'hero_journey': {
        'circle': 'Circular journey with return to origin transformed',
        'triangle': 'Three-part quest with apex as ordeal',
        'spiral': 'Outward journey and upward return spiral'
      },
      'three_act': {
        'triangle': 'Perfect triangular structure with act divisions',
        'square': 'Square base with triangular tension peak',
        'circle': 'Circular acts with continuous flow'
      },
      'circular': {
        'circle': 'Perfect circular geometry with story structure',
        'spiral': 'Circular path with evolutionary spiral element',
        'mobius': 'Infinite circular loop with perspective twist'
      }
    };

    return integrations[narrativeType]?.[geometricBase] || `${geometricBase} structure adapted to ${narrativeType} narrative pattern`;
  };

  const generateCharacterPositioning = () => {
    return `Character Spatial Arrangement:

Protagonist Positioning:
- Central Character: ${getCharacterCenter()}
- Character Movement: ${getCharacterMovement()}
- Relationship Geometry: ${getRelationshipGeometry()}
- Character Arcs: ${getCharacterArcs()}

Supporting Character Layout:
- Primary Support: Positioned at major geometric points
- Secondary Characters: Distributed along geometric boundaries
- Antagonist Placement: Opposing geometric positions
- Character Clusters: Grouped by relationship and function

Dynamic Character Movement:
- Character Paths: Movement along geometric lines and curves
- Intersection Points: Moments of character encounter and conflict
- Transformation Zones: Areas where characters undergo change
- Character Orbits: Recurring patterns and relationship cycles

Ensemble Coordination:
- Group Dynamics: Collective character movement patterns
- Hierarchy Visualization: Character importance through geometric position
- Relationship Networks: Connection lines and interaction patterns
- Character Evolution: Geometric transformation reflecting growth`;
  };

  const getCharacterCenter = () => {
    const centers: Record<string, string> = {
      'circle': 'Protagonist at circle center with all action radiating outward',
      'triangle': 'Protagonist at triangle base or apex depending on story type',
      'square': 'Protagonist at square center with balanced relationships',
      'pentagon': 'Protagonist as one of five equal characters or at center',
      'hexagon': 'Protagonist at hexagon center with efficient relationship network',
      'spiral': 'Protagonist begins at spiral center and moves outward or inward',
      'helix': 'Protagonist on one helix strand with deuteragonist on the other',
      'mobius': 'Protagonist travels the continuous möbius path of transformation'
    };
    return centers[geometricBase] || centers.circle;
  };

  const getCharacterMovement = () => {
    return `Geometric pathways for character development, transformation zones for major character changes, intersection points for character relationships, orbital patterns for recurring character dynamics`;
  };

  const getRelationshipGeometry = () => {
    return `Character triangles for conflict dynamics, parallel lines for similar character journeys, intersecting lines for character connections, concentric circles for character intimacy levels`;
  };

  const getCharacterArcs = () => {
    const arcs: Record<string, string> = {
      'circle': 'Complete circular character transformation returning to origin changed',
      'triangle': 'Rising character development toward apex of transformation',
      'square': 'Four-stage character development with balanced progression',
      'pentagon': 'Five-phase character growth with golden ratio pacing',
      'hexagon': 'Six-stage character development with efficient progression',
      'spiral': 'Evolutionary character growth through recursive patterns',
      'helix': 'Dual character development with interweaving growth patterns',
      'mobius': 'Character transformation that challenges identity boundaries'
    };
    return arcs[geometricBase] || arcs.circle;
  };

  const generateConflictGeometry = () => {
    return `Conflict Spatial Architecture:

Primary Conflict Structure:
${getPrimaryConflictStructure()}

Conflict Escalation Patterns:
${getConflictEscalation()}

Resolution Geometry:
${getResolutionGeometry()}

Tension Fields:
- High Tension Zones: Areas of maximum conflict intensity
- Low Tension Zones: Rest areas and preparation spaces
- Gradient Zones: Gradually building or resolving tension
- Neutral Zones: Spaces free from major conflicts

Conflict Interaction Patterns:
- Conflict Layers: Multiple simultaneous conflicts at different levels
- Conflict Interference: How different conflicts affect each other
- Conflict Resonance: Conflicts that amplify each other
- Conflict Resolution: Geometric patterns for conflict conclusion

Multi-Dimensional Conflict:
- ${dimensionality[0]}D Conflict Space: Complex conflict relationships
- Conflict Projection: How conflicts appear from different perspectives
- Conflict Transformation: How conflicts change throughout story
- Conflict Symmetry: Balanced and unbalanced conflict structures`;
  };

  const getPrimaryConflictStructure = () => {
    const conflicts: Record<string, string> = {
      'circle': 'Central conflict with radiating secondary conflicts, circular tension building to center',
      'triangle': 'Three-way conflict with tension building toward apex resolution',
      'square': 'Four-quadrant conflict with balanced opposing forces',
      'pentagon': 'Five-way conflict with complex interaction patterns',
      'hexagon': 'Six-way conflict with efficient resolution pathways',
      'spiral': 'Escalating conflict following spiral pattern of increasing intensity',
      'helix': 'Dual conflict strands that interweave and influence each other',
      'mobius': 'Paradoxical conflict that transforms perspective and understanding'
    };
    return conflicts[geometricBase] || conflicts.circle;
  };

  const getConflictEscalation = () => {
    return `Geometric progression of conflict intensity, exponential growth patterns for tension building, plateau regions for sustained conflict, breakthrough points for major conflict shifts`;
  };

  const getResolutionGeometry = () => {
    const resolutions: Record<string, string> = {
      'circle': 'Circular resolution returning to harmony with new understanding',
      'triangle': 'Resolution at triangle apex with stable base foundation',
      'square': 'Balanced resolution with all four elements in harmony',
      'pentagon': 'Five-point resolution with golden ratio satisfaction',
      'hexagon': 'Efficient resolution with optimal resource utilization',
      'spiral': 'Progressive resolution following spiral pattern to new level',
      'helix': 'Dual resolution with both narrative strands reaching conclusion',
      'mobius': 'Paradoxical resolution that transcends original conflict framework'
    };
    return resolutions[geometricBase] || resolutions.circle;
  };

  const generateNarrativeFlow = () => {
    return `Narrative Flow Dynamics:

Primary Flow Patterns:
${getPrimaryFlowPatterns()}

Flow Rhythm and Pacing:
${getFlowRhythm()}

Flow Transitions:
${getFlowTransitions()}

Reader Experience Flow:
- Engagement Curves: Patterns of reader interest and attention
- Tension and Release: Rhythmic patterns of conflict and resolution
- Information Flow: How story information is revealed and processed
- Emotional Flow: Emotional journey and feeling state progression

Narrative Current:
- Main Current: Primary story flow and forward momentum
- Cross Currents: Subplot flows and secondary narrative streams
- Eddies and Pools: Areas of reflection and character development
- Rapids and Falls: Intense action and dramatic developments

Flow Visualization:
- Flow Lines: Visual representation of narrative movement
- Flow Velocity: Speed of story progression and pacing
- Flow Direction: Forward, backward, and sideways narrative movement
- Flow Convergence: Points where multiple story streams merge`;
  };

  const getPrimaryFlowPatterns = () => {
    const flows: Record<string, string> = {
      'circle': 'Circular flow with recurring themes and cyclical progression',
      'triangle': 'Directional flow building toward triangular apex and resolution',
      'square': 'Four-directional flow with balanced progression through quadrants',
      'pentagon': 'Five-stage flow with golden ratio pacing and natural rhythm',
      'hexagon': 'Efficient hexagonal flow with optimal narrative resource usage',
      'spiral': 'Spiral flow with progressive development and increasing complexity',
      'helix': 'Dual-strand flow with interweaving narrative threads',
      'mobius': 'Continuous flow with perspective-shifting transformation points'
    };
    return flows[geometricBase] || flows.circle;
  };

  const getFlowRhythm = () => {
    return `Geometric pacing based on ${geometricBase} structure, rhythm variations for emotional impact, accelerando and ritardando patterns, syncopation for surprise and emphasis`;
  };

  const getFlowTransitions = () => {
    return `Smooth geometric transitions between story sections, bridge passages for flow continuity, transition markers for reader guidance, flow direction changes for dramatic effect`;
  };

  const generateDimensionalMapping = () => {
    const dimensions = dimensionality[0];
    
    return `${dimensions}D Narrative Architecture:

Dimensional Structure:
${getDimensionalStructure(dimensions)}

Dimensional Character Development:
${getDimensionalCharacterDevelopment(dimensions)}

Dimensional Plot Progression:
${getDimensionalPlotProgression(dimensions)}

Dimensional Theme Exploration:
${getDimensionalThemeExploration(dimensions)}

Reader Navigation:
- ${dimensions}D reading experience and interpretation
- Dimensional perspective shifting and viewpoint changes
- Cross-dimensional connections and relationships
- Dimensional complexity management for reader accessibility`;
  };

  const getDimensionalStructure = (dims: number) => {
    const structures: Record<number, string> = {
      1: '1D: Linear narrative with single progression line',
      2: '2D: Plane narrative with character and plot axes',
      3: '3D: Volumetric narrative with character, plot, and theme dimensions',
      4: '4D: Temporal-spatial narrative with time as fourth dimension',
      5: '5D: Extended narrative including consciousness dimension',
      6: '6D: Complete narrative space with all story elements'
    };
    return structures[dims] || `${dims}D: Complex multi-dimensional narrative structure`;
  };

  const getDimensionalCharacterDevelopment = (dims: number) => {
    if (dims === 1) return 'Single-axis character development along story timeline';
    if (dims === 2) return 'Character development in 2D plane with internal/external axes';
    if (dims === 3) return 'Volumetric character development with depth, breadth, and height';
    return `${dims}D character development with complex multi-dimensional growth patterns`;
  };

  const getDimensionalPlotProgression = (dims: number) => {
    if (dims === 1) return 'Linear plot progression from beginning to end';
    if (dims === 2) return '2D plot with main storyline and subplot parallel development';
    if (dims === 3) return '3D plot with multiple storylines in complex relationship';
    return `${dims}D plot structure with sophisticated multi-dimensional story architecture`;
  };

  const getDimensionalThemeExploration = (dims: number) => {
    if (dims === 1) return 'Single thematic thread throughout narrative';
    if (dims === 2) return 'Dual themes with complementary or contrasting development';
    if (dims === 3) return 'Multiple themes with complex interactions and relationships';
    return `${dims}D thematic exploration with rich multi-layered meaning development`;
  };

  const generateGeometricTransformations = () => {
    return `Geometric Transformation Principles:

Shape Evolution:
${getShapeEvolution()}

Narrative Metamorphosis:
${getNarrativeMetamorphosis()}

Structural Transformations:
${getStructuralTransformations()}

Character Geometry Changes:
${getCharacterGeometryChanges()}

Plot Geometry Evolution:
${getPlotGeometryEvolution()}

Thematic Geometry Shifts:
${getThematicGeometryShifts()}

Transformation Triggers:
- Character revelations and major discoveries
- Plot twists and unexpected developments
- Thematic deepening and meaning expansion
- Reader perspective shifts and understanding changes

Transformation Patterns:
- Gradual morphing and slow evolution
- Sudden shifts and dramatic changes
- Cyclical transformations and returns
- Progressive transformations and growth`;
  };

  const getShapeEvolution = () => {
    return `Base geometric shape evolves throughout story, transformation reflects character growth and plot development, shape complexity increases with story sophistication, final shape represents resolution and completion`;
  };

  const getNarrativeMetamorphosis = () => {
    return `Story structure undergoes geometric transformation, initial structure morphs into final form, transformation reflects thematic development, metamorphosis creates reader surprise and engagement`;
  };

  const getStructuralTransformations = () => {
    const transformations: Record<string, string> = {
      'circle': 'Circle expands, contracts, or evolves into spiral',
      'triangle': 'Triangle shifts angles, rotates, or becomes pyramid',
      'square': 'Square becomes rectangle, rhombus, or cube',
      'pentagon': 'Pentagon adjusts proportions or becomes pentagonal prism',
      'hexagon': 'Hexagon tessellates, layers, or becomes crystalline structure',
      'spiral': 'Spiral tightens, loosens, or reverses direction',
      'helix': 'Helix pitch changes, strands separate or merge',
      'mobius': 'Möbius strip twists further or untwists to reveal new structure'
    };
    return transformations[geometricBase] || transformations.circle;
  };

  const getCharacterGeometryChanges = () => {
    return `Character positions shift within geometric structure, character relationships form new geometric patterns, character growth creates new geometric connections, character arcs follow geometric transformation paths`;
  };

  const getPlotGeometryEvolution = () => {
    return `Plot structure evolves from simple to complex geometry, plot threads weave new geometric patterns, plot resolution creates final geometric harmony, plot twists create geometric surprises and shifts`;
  };

  const getThematicGeometryShifts = () => {
    return `Themes develop geometric representation, thematic relationships form geometric patterns, theme evolution follows geometric transformation, thematic resolution creates geometric completion`;
  };

  const generateStructuralHarmony = () => {
    return `Narrative Harmony Principles:

Geometric Harmony:
${getGeometricHarmony()}

Proportional Relationships:
${getProportionalRelationships()}

Rhythmic Patterns:
${getRhythmicPatterns()}

Symmetry and Balance:
${getSymmetryBalance()}

Golden Ratio Applications:
${getGoldenRatioApplications()}

Harmonic Resonance:
- Story elements that reinforce each other
- Character relationships that create narrative music
- Plot developments that harmonize with theme
- Structural elements that create pleasing proportions

Dissonance and Resolution:
- Intentional conflicts for dramatic tension
- Harmonic resolution for satisfying conclusions
- Temporary dissonance for reader engagement
- Complex harmonies for sophisticated narratives`;
  };

  const getGeometricHarmony = () => {
    return `All story elements align with geometric foundation, character relationships follow geometric principles, plot development maintains geometric consistency, thematic exploration enhances geometric structure`;
  };

  const getProportionalRelationships = () => {
    return `Story sections maintain pleasing proportions, character development follows proportional scaling, plot complexity scales with geometric complexity, theme depth proportional to structure sophistication`;
  };

  const getRhythmicPatterns = () => {
    return `Narrative rhythm based on geometric patterns, scene lengths follow geometric ratios, chapter divisions align with geometric structure, overall pacing maintains geometric consistency`;
  };

  const getSymmetryBalance = () => {
    const symmetries: Record<string, string> = {
      'circle': 'Radial symmetry with balanced development around center',
      'triangle': 'Triangular balance with three-point stability',
      'square': 'Four-fold symmetry with balanced quadrant development',
      'pentagon': 'Five-fold symmetry with golden ratio harmony',
      'hexagon': 'Six-fold symmetry with natural efficiency balance',
      'spiral': 'Dynamic balance through progressive development',
      'helix': 'Helical balance through dual-strand harmony',
      'mobius': 'Paradoxical balance through continuous transformation'
    };
    return symmetries[geometricBase] || symmetries.circle;
  };

  const getGoldenRatioApplications = () => {
    return `Story sections divided according to golden ratio, character introduction timing follows golden ratio, plot development peaks at golden ratio points, climax positioned at golden ratio of total length`;
  };

  const generateImplementationFramework = () => {
    return `Implementation Strategy:

Planning Phase:
1. Geometric foundation selection and customization
2. Character positioning and relationship mapping
3. Plot structure alignment with geometric principles
4. Theme integration with geometric symbolism

Writing Phase:
1. Geometric scene construction and development
2. Character movement along geometric pathways
3. Plot progression following geometric patterns
4. Thematic development through geometric metaphor

Revision Phase:
1. Geometric consistency checking and refinement
2. Proportional relationship optimization
3. Structural harmony enhancement
4. Reader navigation improvement

Tools and Techniques:
- Geometric visualization software for structure planning
- Mathematical proportion calculators for timing
- Character relationship mapping tools
- Plot progression tracking systems

Quality Assurance:
- Geometric structure integrity verification
- Narrative flow smoothness testing
- Reader comprehension and engagement assessment
- Structural beauty and aesthetic evaluation`;
  };

  const generateVisualRepresentation = () => {
    return `Visual Narrative Architecture:

Geometric Diagrams:
${getGeometricDiagrams()}

Story Mapping:
${getStoryMapping()}

Character Positioning Charts:
${getCharacterPositioningCharts()}

Plot Flow Visualization:
${getPlotFlowVisualization()}

Interactive Elements:
- 3D story structure models for complex visualization
- Character movement animations for relationship dynamics
- Plot progression timelines with geometric overlay
- Theme development charts with geometric integration

Reader Aids:
- Story structure diagrams for reader reference
- Character relationship maps with geometric layout
- Plot progression guides with geometric milestones
- Thematic exploration charts with geometric symbolism`;
  };

  const getGeometricDiagrams = () => {
    return `Complete ${geometricBase} structure with story element mapping, dimensional projections for ${dimensionality[0]}D structure, transformation sequences showing story evolution, harmony diagrams showing proportional relationships`;
  };

  const getStoryMapping = () => {
    return `Story elements positioned on geometric structure, narrative flow lines showing progression, tension fields and conflict zones, resolution areas and harmony zones`;
  };

  const getCharacterPositioningCharts = () => {
    return `Character positions at story beginning, character movement paths throughout story, character relationship geometry and dynamics, character transformation zones and growth areas`;
  };

  const getPlotFlowVisualization = () => {
    return `Plot progression following geometric pathways, subplot integration with main geometric structure, conflict escalation patterns and resolution paths, dramatic peaks and valley positioning`;
  };

  const generateWritingGuidelines = () => {
    return `Writing Implementation Guidelines:

Geometric Writing Principles:
1. Maintain geometric consistency throughout narrative
2. Use geometric metaphors and imagery appropriately
3. Align character development with geometric progression
4. Structure scenes according to geometric principles

Chapter and Scene Structure:
1. Divide story into geometric sections and proportions
2. Align chapter breaks with geometric transition points
3. Structure scenes to support geometric progression
4. Maintain geometric rhythm and pacing throughout

Character Development Guidelines:
1. Position characters according to geometric relationships
2. Develop character arcs following geometric pathways
3. Create character interactions that enhance geometric structure
4. Use character transformation to drive geometric evolution

Plot Development Framework:
1. Construct plot progression along geometric lines
2. Position conflicts at geometrically significant points
3. Build tension following geometric escalation patterns
4. Resolve conflicts using geometric resolution principles

Theme Integration Strategy:
1. Embed themes within geometric symbolism
2. Develop thematic content through geometric progression
3. Use geometric metaphors to enhance thematic depth
4. Create thematic resonance through geometric harmony

Reader Experience Considerations:
1. Guide readers through geometric structure clearly
2. Provide geometric landmarks for navigation
3. Balance geometric sophistication with readability
4. Use geometric beauty to enhance reading pleasure`;
  };

  const generateGeometricMappingDetails = () => {
    return `GEOMETRIC MAPPING REFERENCE

Story: ${storyTitle}
Base: ${geometricBase}
Type: ${narrativeType}
Dimensions: ${dimensionality[0]}D

Geometric Elements:
- Primary Shape: ${geometricBases.find(g => g.id === geometricBase)?.name}
- Temporal Structure: ${temporalStructure.join(' + ')}
- Complexity: ${complexityLevel[0]}/10
- Dimensional Mapping: ${dimensionality[0]}D narrative space

Structure Components:
- Character positioning within geometric framework
- Plot progression along geometric pathways  
- Conflict zones at geometric tension points
- Resolution areas at geometric harmony points

Implementation Notes:
- Maintain geometric consistency throughout
- Use geometric proportions for pacing
- Align dramatic peaks with geometric significance
- Create geometric beauty in narrative structure`;
  };

  const toggleTemporalStructure = (structure: string) => {
    setTemporalStructure(prev => 
      prev.includes(structure) 
        ? prev.filter(s => s !== structure)
        : [...prev, structure]
    );
  };

  const copyStructure = async () => {
    if (generatedStructure) {
      try {
        await navigator.clipboard.writeText(generatedStructure);
        toast.success('Structure copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy structure');
      }
    } else {
      toast.error('No structure to copy');
    }
  };

  const saveStructure = async () => {
    if (!generatedStructure) {
      toast.error('No structure to save');
      return;
    }

    try {
      const structureData = {
        storyTitle,
        narrativeType,
        geometricBase,
        storyPremise: storyPremise.substring(0, 500),
        temporalStructure,
        dimensionality: dimensionality[0],
        complexityLevel: complexityLevel[0],
        generatedStructure,
        geometricMapping,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving narrative geometry structure:', structureData);
      toast.success('Structure saved successfully');
    } catch (err) {
      toast.error('Failed to save structure');
    }
  };

  const exportStructure = () => {
    if (!generatedStructure) {
      toast.error('No structure to export');
      return;
    }

    try {
      const fullSpec = `${generatedStructure}\n\n--- GEOMETRIC MAPPING ---\n${geometricMapping}`;
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fullSpec);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `narrative_geometry_${storyTitle.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Structure exported successfully');
    } catch (err) {
      toast.error('Failed to export structure');
    }
  };

  const loadExample = () => {
    setStoryTitle('The Circular Garden');
    setNarrativeType('circular');
    setGeometricBase('circle');
    setStoryPremise('A young gardener discovers that their family garden exists in a temporal loop, and each season they return to the same spring with deeper understanding of life, growth, and the cyclical nature of existence.');
    setTemporalStructure(['cyclical', 'spiral']);
    setDimensionality([3]);
    setComplexityLevel([7]);
    toast.info('Example narrative geometry project loaded');
  };

  const clearAll = () => {
    setStoryTitle('');
    setStoryPremise('');
    setGeneratedStructure('');
    setGeometricMapping('');
    setTemporalStructure(['linear']);
    setDimensionality([3]);
    setComplexityLevel([6]);
    toast.info('Form cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Narrative Geometry Builder</h1>
            <p className="text-lg text-gray-600">Complete temporal-spatial story architecture with geometric foundations</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>• Geometric Foundation</span>
          <span>• Temporal Mapping</span>
          <span>• Spatial Architecture</span>
          <span>• Character Positioning</span>
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

          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="geometry">Geometry</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
            </TabsList>

            <TabsContent value="story" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Story Foundation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Story Title</Label>
                    <Input
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      placeholder="Enter your story title..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Narrative Type</Label>
                    <Select value={narrativeType} onValueChange={setNarrativeType}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {narrativeTypes.map(type => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {narrativeTypes.find(n => n.id === narrativeType)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Story Premise</Label>
                    <Textarea
                      value={storyPremise}
                      onChange={(e) => setStoryPremise(e.target.value)}
                      placeholder="Describe the basic premise, setting, and central conflict of your story..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geometry" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Geometric Foundation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Geometric Base</Label>
                    <Select value={geometricBase} onValueChange={setGeometricBase}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {geometricBases.map(base => (
                          <SelectItem key={base.id} value={base.id}>
                            {base.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {geometricBases.find(g => g.id === geometricBase)?.description}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <Label>Dimensionality: {dimensionality[0]}D</Label>
                    <Slider
                      value={dimensionality}
                      onValueChange={setDimensionality}
                      min={1}
                      max={6}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500">
                      {dimensionality[0] === 1 && "1D: Linear progression"}
                      {dimensionality[0] === 2 && "2D: Plane with two axes"}
                      {dimensionality[0] === 3 && "3D: Volumetric space"}
                      {dimensionality[0] >= 4 && `${dimensionality[0]}D: Complex multi-dimensional space`}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Complexity Level: {complexityLevel[0]}/10</Label>
                    <Slider
                      value={complexityLevel}
                      onValueChange={setComplexityLevel}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="structure" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Temporal Structure</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {temporalStructureTypes.map(structure => (
                      <div key={structure.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={structure.id}
                          checked={temporalStructure.includes(structure.id)}
                          onCheckedChange={() => toggleTemporalStructure(structure.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={structure.id} className="text-sm font-medium">
                            {structure.name}
                          </Label>
                          <p className="text-xs text-gray-500 mt-1">
                            {structure.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected: {temporalStructure.length} temporal layer{temporalStructure.length !== 1 ? 's' : ''}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {temporalStructure.map(structure => {
                        const structureInfo = temporalStructureTypes.find(s => s.id === structure);
                        return (
                          <Badge key={structure} variant="secondary" className="text-xs">
                            {structureInfo?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={generateStructure} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Generate Narrative Architecture
          </Button>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Narrative Structure</span>
                  </CardTitle>
                  <CardDescription>
                    Complete geometric story architecture and implementation guide
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={copyStructure} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={saveStructure} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportStructure} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedStructure}
                onChange={(e) => setGeneratedStructure(e.target.value)}
                placeholder="Click 'Generate Narrative Architecture' to create a comprehensive geometric story structure..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {geometricMapping && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Geometric Mapping Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                  {geometricMapping}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader>
          <CardTitle>Narrative Geometry Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Geometric Foundation</h4>
              <p className="text-gray-600 text-sm">
                Mathematical geometric principles applied to narrative structure for 
                coherent, harmonious, and aesthetically pleasing story architecture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Temporal-Spatial Mapping</h4>
              <p className="text-gray-600 text-sm">
                Multi-dimensional story space with precise temporal structure mapping 
                and character positioning for complex narrative relationships.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Implementation Ready</h4>
              <p className="text-gray-600 text-sm">
                Complete writing guidelines, visualization tools, and structural 
                frameworks for practical narrative construction and development.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
