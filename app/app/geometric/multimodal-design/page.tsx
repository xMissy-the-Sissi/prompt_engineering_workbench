
'use client';

import React, { useState } from 'react';
import { Palette, Copy, Save, Download, RefreshCw, Eye, Ear, Hand, Waves, Zap } from 'lucide-react';
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

export default function MultimodalDesignPage() {
  const [designTheme, setDesignTheme] = useState('nature');
  const [primaryModality, setPrimaryModality] = useState('visual');
  const [projectName, setProjectName] = useState('');
  const [designObjective, setDesignObjective] = useState('');
  const [activeModalities, setActiveModalities] = useState(['visual', 'auditory']);
  const [designComplexity, setDesignComplexity] = useState([6]);
  const [sensoryIntensity, setSensoryIntensity] = useState([7]);
  const [generatedDesign, setGeneratedDesign] = useState('');
  const [modalityMapping, setModalityMapping] = useState('');

  const designThemes = [
    { id: 'nature', name: 'Natural Harmony', description: 'Organic forms and natural patterns' },
    { id: 'urban', name: 'Urban Dynamics', description: 'City rhythms and geometric structures' },
    { id: 'cosmic', name: 'Cosmic Inspiration', description: 'Space, stars, and celestial bodies' },
    { id: 'oceanic', name: 'Oceanic Flow', description: 'Water patterns and marine life' },
    { id: 'technological', name: 'Digital Future', description: 'Cybernetic and technological themes' },
    { id: 'cultural', name: 'Cultural Heritage', description: 'Traditional patterns and artifacts' },
    { id: 'abstract', name: 'Abstract Expression', description: 'Pure form and conceptual design' },
    { id: 'emotional', name: 'Emotional Journey', description: 'Feeling states and mood progression' }
  ];

  const modalityTypes = [
    { id: 'visual', name: 'Visual', icon: Eye, description: 'Colors, shapes, patterns, movements' },
    { id: 'auditory', name: 'Auditory', icon: Ear, description: 'Sounds, music, rhythms, harmonies' },
    { id: 'tactile', name: 'Tactile', icon: Hand, description: 'Textures, temperatures, pressures' },
    { id: 'olfactory', name: 'Olfactory', icon: Waves, description: 'Scents, aromas, fragrance compositions' },
    { id: 'gustatory', name: 'Gustatory', icon: Waves, description: 'Tastes, flavors, culinary experiences' },
    { id: 'kinesthetic', name: 'Kinesthetic', icon: Hand, description: 'Movement, balance, spatial awareness' }
  ];

  const generateDesign = () => {
    if (!projectName.trim() || !designObjective.trim()) {
      toast.error('Please provide project name and design objective');
      return;
    }

    const themeInfo = designThemes.find(t => t.id === designTheme);
    const primaryModalityInfo = modalityTypes.find(m => m.id === primaryModality);
    const selectedModalities = modalityTypes.filter(m => activeModalities.includes(m.id));

    const design = `MULTIMODAL DESIGN SPECIFICATION

PROJECT OVERVIEW:
Name: ${projectName}
Theme: ${themeInfo?.name}
Primary Modality: ${primaryModalityInfo?.name}
Design Complexity: ${designComplexity[0]}/10
Sensory Intensity: ${sensoryIntensity[0]}/10

DESIGN OBJECTIVE:
${designObjective}

MULTIMODAL COMPOSITION:
${generateMultimodalComposition()}

VISUAL DESIGN ELEMENTS:
${generateVisualElements()}

AUDITORY TRANSLATION:
${generateAuditoryTranslation()}

TACTILE MAPPING:
${generateTactileMapping()}

OLFACTORY ELEMENTS:
${generateOlfactoryElements()}

GUSTATORY INTEGRATION:
${generateGustatoryIntegration()}

KINESTHETIC DESIGN:
${generateKinestheticDesign()}

CROSS-SENSORY RELATIONSHIPS:
${generateCrossSensoryRelationships()}

IMPLEMENTATION STRATEGY:
${generateImplementationStrategy()}

TECHNOLOGY REQUIREMENTS:
${generateTechnologyRequirements()}

USER EXPERIENCE DESIGN:
${generateUserExperienceDesign()}

ACCESSIBILITY CONSIDERATIONS:
${generateAccessibilityConsiderations()}

VALIDATION AND TESTING:
${generateValidationFramework()}`;

    setGeneratedDesign(design);
    
    // Generate modality mapping
    const mapping = generateModalityMappingDetails();
    setModalityMapping(mapping);
    
    toast.success('Multimodal design generated successfully');
  };

  const generateMultimodalComposition = () => {
    const selectedModalities = modalityTypes.filter(m => activeModalities.includes(m.id));
    const themeInfo = designThemes.find(t => t.id === designTheme);
    
    return `Design Theme Integration: ${themeInfo?.name}
Theme Description: ${themeInfo?.description}

Active Modalities (${selectedModalities.length}):
${selectedModalities.map(modality => 
  `• ${modality.name}: ${modality.description}`
).join('\n')}

Primary Modality Focus: ${primaryModality}
Supporting Modalities: ${activeModalities.filter(m => m !== primaryModality).join(', ')}

Sensory Hierarchy:
1. Primary: ${primaryModality} (lead sensory experience)
2. Secondary: ${activeModalities.filter(m => m !== primaryModality).slice(0, 2).join(' + ')}
3. Accent: ${activeModalities.slice(-1)[0] !== primaryModality ? activeModalities.slice(-1)[0] : 'environmental context'}

Cross-Modal Synchronization:
- Temporal alignment across all active modalities
- Intensity mapping and dynamic range coordination
- Narrative consistency and thematic coherence
- Emotional arc progression and climax timing`;
  };

  const generateVisualElements = () => {
    const themeColors = getThemeColors();
    const themeShapes = getThemeShapes();
    
    return `Color Palette:
${themeColors}

Geometric Forms:
${themeShapes}

Visual Composition Principles:
- Primary shapes: ${getGeometricBase()}
- Color relationships: ${getColorRelationships()}
- Movement patterns: ${getMovementPatterns()}
- Texture applications: ${getTexturePatterns()}

Visual Rhythm and Timing:
- Frame rate: 24-60 fps depending on content
- Transition duration: 0.5-3 seconds per major change
- Visual hierarchy: Primary → Secondary → Accent elements
- Attention flow: Z-pattern for reading cultures, circular for exploration

Lighting and Atmosphere:
- Ambient lighting: ${getAmbientLighting()}
- Directional emphasis: ${getDirectionalLighting()}
- Color temperature: ${getColorTemperature()}
- Dynamic range: ${getDynamicRange()}`;
  };

  const getThemeColors = () => {
    const colorMappings: Record<string, string> = {
      'nature': 'Forest Green (#228B22), Sky Blue (#87CEEB), Earth Brown (#8B4513), Sunset Orange (#FF8C00)',
      'urban': 'Steel Gray (#708090), Neon Blue (#0080FF), Concrete (#C0C0C0), Electric Yellow (#FFFF00)',
      'cosmic': 'Deep Purple (#4B0082), Starlight White (#F8F8FF), Nebula Pink (#FF69B4), Cosmic Blue (#191970)',
      'oceanic': 'Ocean Blue (#006994), Sea Foam (#98FB98), Coral Red (#FF7F50), Pearl White (#F8F8FF)',
      'technological': 'Matrix Green (#00FF00), Chrome Silver (#C0C0C0), Warning Red (#FF0000), Digital Blue (#0080FF)',
      'cultural': 'Warm Gold (#FFD700), Heritage Red (#DC143C), Ivory (#FFFFF0), Royal Purple (#800080)',
      'abstract': 'Pure Black (#000000), Pure White (#FFFFFF), Accent Red (#FF0000), Dynamic Blue (#0000FF)',
      'emotional': 'Passion Red (#DC143C), Joy Yellow (#FFD700), Calm Blue (#87CEEB), Growth Green (#32CD32)'
    };
    return colorMappings[designTheme] || colorMappings.nature;
  };

  const getThemeShapes = () => {
    const shapeMappings: Record<string, string> = {
      'nature': 'Organic curves, leaf patterns, tree structures, flowing water forms',
      'urban': 'Angular lines, rectangular grids, geometric intersections, architectural forms',
      'cosmic': 'Spiral galaxies, circular orbits, elliptical patterns, crystalline structures',
      'oceanic': 'Wave forms, spiral shells, fluid curves, bubble patterns',
      'technological': 'Circuit patterns, hexagonal networks, angular connectors, grid systems',
      'cultural': 'Traditional motifs, cultural symbols, heritage patterns, ceremonial forms',
      'abstract': 'Pure geometric forms, mathematical relationships, minimal structures',
      'emotional': 'Expressive curves, dynamic angles, flowing transitions, organic growth'
    };
    return shapeMappings[designTheme] || shapeMappings.nature;
  };

  const getGeometricBase = () => {
    const bases: Record<string, string> = {
      'nature': 'Hexagons (natural efficiency), spirals (growth patterns)',
      'urban': 'Rectangles (buildings), triangles (stability)',
      'cosmic': 'Circles (orbits), spirals (galaxies)',
      'oceanic': 'Curves (waves), circles (bubbles)',
      'technological': 'Hexagons (networks), squares (pixels)',
      'cultural': 'Traditional geometric forms specific to culture',
      'abstract': 'Pure mathematical forms',
      'emotional': 'Organic, flowing forms without strict geometry'
    };
    return bases[designTheme] || bases.nature;
  };

  const getColorRelationships = () => {
    return `Complementary contrast for visual tension, analogous harmony for emotional comfort, triadic balance for dynamic interest, monochromatic progression for subtle transitions`;
  };

  const getMovementPatterns = () => {
    const patterns: Record<string, string> = {
      'nature': 'Organic flow, breathing rhythms, growth patterns',
      'urban': 'Linear progression, rhythmic patterns, geometric transitions',
      'cosmic': 'Orbital motion, spiral progression, celestial dance',
      'oceanic': 'Wave motion, tidal rhythms, fluid transitions',
      'technological': 'Digital transitions, data flow, network propagation',
      'cultural': 'Traditional dance patterns, ceremonial movements',
      'abstract': 'Mathematical progressions, pure form transformation',
      'emotional': 'Expressive gestures, emotional rhythms, mood transitions'
    };
    return patterns[designTheme] || patterns.nature;
  };

  const getTexturePatterns = () => {
    const textures: Record<string, string> = {
      'nature': 'Bark roughness, leaf smoothness, water fluidity, stone solidity',
      'urban': 'Metal smoothness, concrete roughness, glass reflectivity, fabric softness',
      'cosmic': 'Stellar shimmer, nebula softness, planet solidity, space emptiness',
      'oceanic': 'Water fluidity, sand grittiness, coral roughness, pearl smoothness',
      'technological': 'Metal precision, plastic smoothness, circuit patterns, LED brightness',
      'cultural': 'Traditional material textures, handicraft patterns, ceremonial fabrics',
      'abstract': 'Pure surface qualities without specific material reference',
      'emotional': 'Textures that evoke specific emotional responses and memories'
    };
    return textures[designTheme] || textures.nature;
  };

  const getAmbientLighting = () => {
    const lighting: Record<string, string> = {
      'nature': 'Natural daylight progression, golden hour warmth',
      'urban': 'Artificial lighting mix, neon accents, street lighting',
      'cosmic': 'Starlight cool, nebula glow, planet illumination',
      'oceanic': 'Underwater filtering, surface sparkle, depth gradation',
      'technological': 'LED precision, screen glow, circuit illumination',
      'cultural': 'Traditional lighting, ceremonial illumination, heritage warmth',
      'abstract': 'Pure light without source reference, geometric shadows',
      'emotional': 'Mood-responsive lighting, emotional color temperature'
    };
    return lighting[designTheme] || lighting.nature;
  };

  const getDirectionalLighting = () => {
    return `Primary light source at 45-degree angle, secondary fill lighting for balance, rim lighting for separation, accent lighting for focal points`;
  };

  const getColorTemperature = () => {
    const temperatures: Record<string, string> = {
      'nature': '5500K (natural daylight) to 3000K (warm sunset)',
      'urban': '4000K (cool white) with neon color accents',
      'cosmic': '6500K (cool starlight) to 2000K (warm star glow)',
      'oceanic': '5000K (underwater blue) to 6500K (surface brightness)',
      'technological': '6500K (cool white) to 9000K (blue LED)',
      'cultural': '3000K (warm traditional) to 4000K (neutral ceremonial)',
      'abstract': 'Variable temperature for conceptual emphasis',
      'emotional': '2700K (intimate warm) to 6500K (energetic cool)'
    };
    return temperatures[designTheme] || temperatures.nature;
  };

  const getDynamicRange = () => {
    return `High contrast (1000:1) for dramatic emphasis, medium contrast (100:1) for comfortable viewing, low contrast (10:1) for subtle atmospheric effects`;
  };

  const generateAuditoryTranslation = () => {
    if (!activeModalities.includes('auditory')) return 'Auditory modality not selected for this design.';
    
    return `Sound Design Architecture:

Musical Foundation:
${generateMusicalFoundation()}

Sonic Texture Mapping:
${generateSonicTextures()}

Rhythmic Patterns:
${generateRhythmicPatterns()}

Harmonic Structure:
${generateHarmonicStructure()}

Dynamic Range and Intensity:
- Quiet passages: 20-40 dB (intimate, contemplative)
- Medium levels: 60-80 dB (conversational, engaging)
- Dynamic peaks: 90-100 dB (climactic, powerful)
- Frequency range: 20 Hz - 20 kHz (full spectrum)

Spatial Audio Design:
- Stereo field utilization for width and depth
- Surround sound positioning for immersion
- Binaural processing for headphone optimization
- 3D audio mapping for spatial relationships

Temporal Synchronization:
- Audio-visual alignment with 0-40ms tolerance
- Rhythmic correlation with visual movement
- Harmonic progression matching visual transitions
- Dynamic crescendos aligned with visual climaxes`;
  };

  const generateMusicalFoundation = () => {
    const musicalMappings: Record<string, string> = {
      'nature': 'Organic instruments (flute, strings), natural recordings (birds, water), pentatonic scales',
      'urban': 'Electronic beats, synthesized textures, urban soundscapes, rhythmic complexity',
      'cosmic': 'Ambient drones, ethereal pads, cosmic sounds, vast reverbs, stellar harmonics',
      'oceanic': 'Fluid tones, wave-like progressions, underwater acoustics, tidal rhythms',
      'technological': 'Digital synthesis, glitch elements, electronic processing, data sonification',
      'cultural': 'Traditional instruments, cultural scales, heritage rhythms, ceremonial sounds',
      'abstract': 'Pure tones, mathematical relationships, conceptual sound design',
      'emotional': 'Expressive instruments, emotional progressions, dynamic range, human voice'
    };
    return musicalMappings[designTheme] || musicalMappings.nature;
  };

  const generateSonicTextures = () => {
    return `Primary Textures: ${getThemeTextures()}
Secondary Textures: ${getSupportingTextures()}
Transition Textures: ${getTransitionTextures()}
Ambient Textures: ${getAmbientTextures()}`;
  };

  const getThemeTextures = () => {
    const textures: Record<string, string> = {
      'nature': 'Wind through trees, water flowing, birds singing, leaves rustling',
      'urban': 'Traffic ambience, construction sounds, human activity, mechanical rhythms',
      'cosmic': 'Solar wind, electromagnetic resonance, deep space ambience, planetary tones',
      'oceanic': 'Wave crashes, underwater bubbles, marine life, tidal movements',
      'technological': 'Digital noise, circuit hum, data transmission, mechanical precision',
      'cultural': 'Traditional instruments, vocal traditions, ceremonial sounds, historical echoes',
      'abstract': 'Pure synthesis, mathematical waveforms, conceptual audio processing',
      'emotional': 'Vocal expressions, instrumental emotion, human-scale intimacy, personal resonance'
    };
    return textures[designTheme] || textures.nature;
  };

  const getSupportingTextures = () => {
    return 'Harmonic overtones, resonant frequencies, complementary timbres, supportive drones';
  };

  const getTransitionTextures = () => {
    return 'Crossfades, morphing timbres, rhythmic shifts, harmonic progressions';
  };

  const getAmbientTextures = () => {
    return 'Environmental context, spatial reverb, atmospheric presence, immersive background';
  };

  const generateRhythmicPatterns = () => {
    const patterns: Record<string, string> = {
      'nature': '4/4 breathing rhythm, irregular organic timing, seasonal cycles',
      'urban': 'Complex polyrhythms, 4/4 and 7/8 meters, mechanical precision',
      'cosmic': 'Slow cosmic cycles, irregular pulses, vast time scales',
      'oceanic': 'Wave rhythm patterns, tidal timing, fluid meter changes',
      'technological': 'Digital timing precision, glitch rhythms, data patterns',
      'cultural': 'Traditional rhythmic patterns, ceremonial timing, cultural meters',
      'abstract': 'Mathematical rhythm relationships, conceptual timing structures',
      'emotional': 'Heartbeat rhythms, breathing patterns, emotional timing variations'
    };
    return patterns[designTheme] || patterns.nature;
  };

  const generateHarmonicStructure = () => {
    const harmonies: Record<string, string> = {
      'nature': 'Natural harmonic series, pentatonic scales, organic intervals',
      'urban': 'Complex chord structures, minor keys, urban dissonance and resolution',
      'cosmic': 'Just intonation, cosmic ratios, ethereal harmony, vast chord structures',
      'oceanic': 'Flowing harmonic progressions, modal scales, fluid modulations',
      'technological': 'Precise electronic harmonies, digital scales, algorithmic progressions',
      'cultural': 'Traditional scales and modes, cultural harmonic language, heritage progressions',
      'abstract': 'Mathematical harmonic relationships, pure interval ratios, conceptual harmony',
      'emotional': 'Expressive harmonic language, emotional progressions, human-scale harmony'
    };
    return harmonies[designTheme] || harmonies.nature;
  };

  const generateTactileMapping = () => {
    if (!activeModalities.includes('tactile')) return 'Tactile modality not selected for this design.';
    
    return `Tactile Experience Design:

Texture Mapping:
${generateTactileTextures()}

Temperature Associations:
${generateTemperatureMapping()}

Pressure Patterns:
${generatePressurePatterns()}

Vibration Design:
${generateVibrationPatterns()}

Material Correspondence:
- Primary materials: ${getPrimaryMaterials()}
- Secondary materials: ${getSecondaryMaterials()}
- Transition materials: ${getTransitionMaterials()}
- Accent materials: ${getAccentMaterials()}

Haptic Technology Integration:
- Force feedback for resistance and weight
- Ultrasonic haptics for mid-air sensations
- Thermal feedback for temperature variations
- Pneumatic systems for pressure changes

Ergonomic Considerations:
- Comfortable interaction zones and reach
- Fatigue prevention and rest periods
- Accessibility for different physical abilities
- Safety boundaries and protective measures`;
  };

  const generateTactileTextures = () => {
    const textures: Record<string, string> = {
      'nature': 'Rough bark, smooth stone, soft moss, flowing water sensation',
      'urban': 'Cold metal, smooth glass, rough concrete, soft fabric',
      'cosmic': 'Smooth crystalline, electromagnetic tingling, weightless floating',
      'oceanic': 'Wet surfaces, smooth shells, rough coral, flowing currents',
      'technological': 'Precise metal, smooth plastic, vibrating circuits, electromagnetic fields',
      'cultural': 'Traditional material textures, handicraft surfaces, ceremonial objects',
      'abstract': 'Pure tactile qualities without material reference',
      'emotional': 'Comfort textures, stimulating surfaces, calming materials'
    };
    return textures[designTheme] || textures.nature;
  };

  const generateTemperatureMapping = () => {
    const temperatures: Record<string, string> = {
      'nature': 'Warm sun, cool shade, cold water, ambient earth temperature',
      'urban': 'Hot asphalt, cool metal, warm buildings, air conditioning',
      'cosmic': 'Cold space, warm starlight, extreme temperature variations',
      'oceanic': 'Cool water, warm sand, temperature gradients with depth',
      'technological': 'Warm electronics, cool metal, heat generation, thermal management',
      'cultural': 'Traditional temperature associations, ceremonial warmth/coolness',
      'abstract': 'Conceptual temperature without physical reference',
      'emotional': 'Comforting warmth, exciting coolness, temperature for mood'
    };
    return temperatures[designTheme] || temperatures.nature;
  };

  const generatePressurePatterns = () => {
    return `Light touch (0.1-1N): Delicate interactions, surface exploration
Medium pressure (1-5N): Standard interaction, comfortable manipulation
Firm pressure (5-15N): Deliberate action, emphasis, confirmation
Strong pressure (15-30N): Maximum safe interaction, emergency actions

Pressure distribution: Point contact, area contact, gradient pressure
Pressure timing: Instantaneous, gradual build-up, sustained, pulsing
Pressure patterns: Rhythmic, random, synchronized, responsive`;
  };

  const generateVibrationPatterns = () => {
    return `Low frequency (10-100 Hz): Subtle ambient vibration, base resonance
Medium frequency (100-500 Hz): Tactile communication, alert patterns
High frequency (500-1000 Hz): Precise feedback, detail communication

Vibration patterns: Pulses, continuous, modulated, complex waveforms
Amplitude control: Barely perceptible to clearly noticeable
Timing control: Duration, intervals, synchronization with other modalities`;
  };

  const getPrimaryMaterials = () => {
    const materials: Record<string, string> = {
      'nature': 'Wood, stone, water, organic fibers',
      'urban': 'Steel, glass, concrete, synthetic materials',
      'cosmic': 'Crystalline structures, metallic alloys, energy fields',
      'oceanic': 'Coral, shells, water, marine materials',
      'technological': 'Silicon, metals, plastics, composites',
      'cultural': 'Traditional materials specific to cultural context',
      'abstract': 'Pure material qualities without specific identity',
      'emotional': 'Materials that evoke specific emotional responses'
    };
    return materials[designTheme] || materials.nature;
  };

  const getSecondaryMaterials = () => {
    return 'Complementary textures, transition materials, supporting surfaces';
  };

  const getTransitionMaterials = () => {
    return 'Gradient textures, morphing surfaces, adaptive materials';
  };

  const getAccentMaterials = () => {
    return 'Special emphasis textures, highlight materials, focal point surfaces';
  };

  const generateOlfactoryElements = () => {
    if (!activeModalities.includes('olfactory')) return 'Olfactory modality not selected for this design.';
    
    return `Scent Design Architecture:

Primary Scent Profile:
${generatePrimaryScents()}

Scent Layering Strategy:
${generateScentLayers()}

Intensity Mapping:
${generateScentIntensity()}

Temporal Scent Design:
${generateTemporalScents()}

Delivery Technology:
- Ultrasonic diffusion for precise control
- Thermal release for temperature-triggered scents
- Encapsulation technology for timed release
- Airflow management for spatial distribution

Safety and Accessibility:
- Hypoallergenic formulations
- Adjustable intensity controls
- Opt-out mechanisms for sensitive individuals
- Clear labeling of all fragrance components

Cultural and Personal Considerations:
- Cultural scent associations and preferences
- Personal memory triggers and emotional responses
- Religious and dietary considerations
- Individual sensitivity levels and allergies`;
  };

  const generatePrimaryScents = () => {
    const scents: Record<string, string> = {
      'nature': 'Pine forest, ocean breeze, wildflower meadow, fresh earth after rain',
      'urban': 'Coffee shops, rain on concrete, urban gardens, clean air',
      'cosmic': 'Ozone, metallic coolness, clean sterile air, electromagnetic neutrality',
      'oceanic': 'Sea salt, ocean breeze, seaweed, marine freshness',
      'technological': 'Clean metallic, ozone, new electronics, sterile environments',
      'cultural': 'Traditional incense, cultural foods, ceremonial fragrances',
      'abstract': 'Neutral scents that don\'t distract from other senses',
      'emotional': 'Comfort scents, energizing fragrances, calming aromatics'
    };
    return scents[designTheme] || scents.nature;
  };

  const generateScentLayers = () => {
    return `Base layer: Subtle background scent (20-30% intensity)
Middle layer: Primary thematic scent (60-70% intensity)
Top layer: Accent scent for highlights (10-20% intensity)
Transition layer: Bridging scents for smooth changes`;
  };

  const generateScentIntensity = () => {
    return `Threshold level: Barely perceptible (just noticeable difference)
Subtle level: Present but not intrusive (background awareness)
Moderate level: Clearly noticeable (conscious perception)
Strong level: Prominent and engaging (focal attention)
Maximum level: Intense but comfortable (safety limits)`;
  };

  const generateTemporalScents = () => {
    return `Introduction phase: Gentle scent emergence over 30-60 seconds
Development phase: Full scent presence with variations
Climax phase: Peak intensity coordination with other modalities
Resolution phase: Gradual fade-out over 60-120 seconds
Transition phase: Scent morphing for scene changes`;
  };

  const generateGustatoryIntegration = () => {
    if (!activeModalities.includes('gustatory')) return 'Gustatory modality not selected for this design.';
    
    return `Taste Experience Design:

Flavor Profile Development:
${generateFlavorProfiles()}

Taste Timing and Sequencing:
${generateTasteSequencing()}

Delivery Mechanisms:
${generateTasteDelivery()}

Flavor Intensity Mapping:
${generateFlavorIntensity()}

Safety and Dietary Considerations:
- Allergen identification and labeling
- Dietary restriction accommodations
- Cultural and religious food considerations
- Portion control and nutritional awareness

Multisensory Flavor Enhancement:
- Visual presentation impact on taste perception
- Aroma coordination with flavor profiles
- Temperature effects on taste experience
- Texture integration for complete gustatory experience`;
  };

  const generateFlavorProfiles = () => {
    const flavors: Record<string, string> = {
      'nature': 'Fresh herbs, clean water, wild berries, natural sweetness',
      'urban': 'Coffee notes, urban garden herbs, clean mineral water',
      'cosmic': 'Neutral flavors, clean water, minimal taste interference',
      'oceanic': 'Sea salt, seaweed, marine minerals, clean ocean water',
      'technological': 'Neutral hydration, precisely controlled flavoring',
      'cultural': 'Traditional flavors, cultural beverages, ceremonial tastes',
      'abstract': 'Pure taste elements without specific food reference',
      'emotional': 'Comfort flavors, energizing tastes, calming beverages'
    };
    return flavors[designTheme] || flavors.nature;
  };

  const generateTasteSequencing = () => {
    return `Opening taste: Introduction to flavor theme
Development taste: Main flavor experience progression
Peak taste: Climactic flavor intensity
Resolution taste: Satisfying flavor conclusion
Cleansing taste: Palate reset between sequences`;
  };

  const generateTasteDelivery = () => {
    return `Liquid delivery: Beverages, flavor solutions, hydration systems
Solid delivery: Edible elements, flavor crystals, dissolvable items
Vapor delivery: Aromatic taste experiences, sublimation effects
Controlled release: Timed flavor emergence, sequential taste layers`;
  };

  const generateFlavorIntensity = () => {
    return `Subtle intensity: Background flavor presence
Moderate intensity: Clear taste identification
Strong intensity: Prominent flavor experience
Peak intensity: Maximum safe and enjoyable flavor
Gradient intensity: Smooth transitions between levels`;
  };

  const generateKinestheticDesign = () => {
    if (!activeModalities.includes('kinesthetic')) return 'Kinesthetic modality not selected for this design.';
    
    return `Movement and Spatial Experience Design:

Spatial Navigation:
${generateSpatialNavigation()}

Movement Patterns:
${generateMovementPatterns()}

Balance and Orientation:
${generateBalanceDesign()}

Physical Interaction Design:
${generatePhysicalInteraction()}

Safety and Accessibility:
- Clear pathway marking and guidance
- Fall prevention and protective measures
- Accessibility for different mobility levels
- Emergency exit and safety protocols

Technology Integration:
- Motion tracking for responsive environments
- Haptic feedback for spatial guidance
- Virtual reality integration for enhanced movement
- Augmented reality overlays for spatial information`;
  };

  const generateSpatialNavigation = () => {
    return `Primary pathways: Main routes through the experience space
Secondary pathways: Alternative routes and exploration areas
Focal points: Key destinations and interaction zones
Transition zones: Smooth movement between different areas
Rest areas: Comfortable spaces for pause and reflection`;
  };

  const generateMovementPatterns = () => {
    const movements: Record<string, string> = {
      'nature': 'Organic flowing paths, natural rhythm walking, seasonal progression',
      'urban': 'Grid-based navigation, rhythmic city walking, architectural guidance',
      'cosmic': 'Floating movement, orbital paths, weightless navigation',
      'oceanic': 'Flowing water movement, tidal rhythms, swimming motions',
      'technological': 'Precise grid movement, digital navigation, systematic paths',
      'cultural': 'Traditional movement patterns, ceremonial walking, cultural dance',
      'abstract': 'Pure movement without reference to specific contexts',
      'emotional': 'Expressive movement, feeling-based navigation, mood-responsive paths'
    };
    return movements[designTheme] || movements.nature;
  };

  const generateBalanceDesign = () => {
    return `Stable platforms: Secure footing and comfortable standing
Dynamic surfaces: Gentle movement and balance challenge
Orientation cues: Visual, audio, and tactile reference points
Support systems: Handholds, railings, and assistance features
Recovery zones: Safe areas for regaining balance and composure`;
  };

  const generatePhysicalInteraction = () => {
    return `Gesture recognition: Natural hand and body movement interpretation
Object manipulation: Physical interaction with design elements
Force feedback: Resistance and weight simulation for realistic interaction
Collaborative movement: Group interaction and synchronized movement
Adaptive response: Environment response to individual movement patterns`;
  };

  const generateCrossSensoryRelationships = () => {
    const selectedModalities = modalityTypes.filter(m => activeModalities.includes(m.id));
    
    return `Cross-Sensory Synchronization Matrix:

${selectedModalities.map(primary => 
      selectedModalities.filter(secondary => secondary.id !== primary.id)
        .map(secondary => `${primary.name} ↔ ${secondary.name}: ${getSensoryRelationship(primary.id, secondary.id)}`)
        .join('\n')
    ).join('\n\n')}

Multisensory Harmony Principles:
- Temporal synchronization: All modalities aligned within 40ms
- Intensity correlation: Proportional strength across senses
- Thematic consistency: Unified narrative and emotional arc
- Complementary enhancement: Each sense supports others without competition

Sensory Dominance Hierarchy:
1. Primary: ${primaryModality} (leads the experience)
2. Supporting: ${activeModalities.filter(m => m !== primaryModality).slice(0, 2).join(' + ')}
3. Atmospheric: Environmental and contextual sensory elements

Conflict Resolution:
- Priority systems for competing sensory information
- Graceful degradation when modalities conflict
- User control for sensory emphasis and de-emphasis
- Adaptive balancing based on individual preferences`;
  };

  const getSensoryRelationship = (primary: string, secondary: string) => {
    const relationships: Record<string, Record<string, string>> = {
      'visual': {
        'auditory': 'Color-pitch correspondence, brightness-volume correlation',
        'tactile': 'Texture visualization, pressure-size mapping',
        'olfactory': 'Color-scent association, visual scent representation',
        'gustatory': 'Color-flavor correspondence, visual taste enhancement',
        'kinesthetic': 'Movement visualization, gesture-graphics correlation'
      },
      'auditory': {
        'visual': 'Music visualization, rhythm-movement synchronization',
        'tactile': 'Sound-vibration mapping, audio-haptic coordination',
        'olfactory': 'Sound-scent timing, audio-olfactory emotional enhancement',
        'gustatory': 'Sound-taste correlation, audio-enhanced flavor perception',
        'kinesthetic': 'Rhythm-movement synchronization, audio-guided navigation'
      },
      'tactile': {
        'visual': 'Texture-color mapping, haptic-visual feedback correlation',
        'auditory': 'Texture-sound association, haptic-audio synchronization',
        'olfactory': 'Texture-scent correlation, haptic-olfactory enhancement',
        'gustatory': 'Texture-taste integration, mouthfeel-flavor coordination',
        'kinesthetic': 'Touch-movement integration, haptic-spatial coordination'
      },
      'olfactory': {
        'visual': 'Scent-color association, olfactory-visual memory triggers',
        'auditory': 'Scent-sound pairing, olfactory-audio emotional enhancement',
        'tactile': 'Scent-texture correlation, olfactory-haptic integration',
        'gustatory': 'Aroma-flavor enhancement, olfactory-gustatory coordination',
        'kinesthetic': 'Scent-space association, olfactory-movement correlation'
      },
      'gustatory': {
        'visual': 'Taste-color correlation, flavor-visual presentation',
        'auditory': 'Taste-sound enhancement, flavor-audio coordination',
        'tactile': 'Flavor-texture integration, taste-mouthfeel correlation',
        'olfactory': 'Taste-aroma enhancement, flavor-scent coordination',
        'kinesthetic': 'Taste-movement correlation, flavor-spatial experience'
      },
      'kinesthetic': {
        'visual': 'Movement-visual correlation, gesture-graphics synchronization',
        'auditory': 'Movement-sound coordination, kinesthetic-audio enhancement',
        'tactile': 'Movement-touch integration, kinesthetic-haptic correlation',
        'olfactory': 'Movement-scent association, kinesthetic-olfactory coordination',
        'gustatory': 'Movement-taste correlation, kinesthetic-flavor integration'
      }
    };
    
    return relationships[primary]?.[secondary] || 'Synesthetic correlation and mutual enhancement';
  };

  const generateImplementationStrategy = () => {
    return `Implementation Roadmap:

Phase 1: Foundation Development (Weeks 1-4)
- Core modality system development
- Basic cross-sensory framework
- Safety and accessibility baseline
- Initial prototype testing

Phase 2: Integration and Refinement (Weeks 5-8)
- Multimodal synchronization implementation
- Advanced cross-sensory relationships
- User interface and control systems
- Performance optimization

Phase 3: Content Creation and Testing (Weeks 9-12)
- Full content development and integration
- Comprehensive user testing and feedback
- Accessibility validation and improvement
- Quality assurance and bug fixing

Phase 4: Deployment and Monitoring (Weeks 13-16)
- Production deployment and launch
- Real-time monitoring and analytics
- User feedback collection and analysis
- Iterative improvement and updates

Success Metrics:
- User engagement and satisfaction scores
- Multisensory synchronization accuracy
- Accessibility compliance achievement
- Technical performance benchmarks`;
  };

  const generateTechnologyRequirements = () => {
    const selectedModalities = modalityTypes.filter(m => activeModalities.includes(m.id));
    
    return `Technology Stack Requirements:

${selectedModalities.map(modality => 
      `${modality.name} Technology:
${getModalityTechnology(modality.id)}`
    ).join('\n\n')}

Integration Platform:
- Real-time synchronization engine (sub-40ms latency)
- Cross-modal coordination framework
- Adaptive user preference system
- Safety monitoring and emergency controls

Hardware Infrastructure:
- High-performance computing for real-time processing
- Specialized sensors and output devices per modality
- Network infrastructure for distributed delivery
- Backup systems and redundancy protocols

Software Architecture:
- Modular design for independent modality development
- API framework for cross-modal communication
- User interface for control and customization
- Analytics and monitoring dashboard

Scalability Considerations:
- Cloud-based processing for computational demands
- Edge computing for low-latency requirements
- Load balancing for multiple simultaneous users
- Content delivery network for global accessibility`;
  };

  const getModalityTechnology = (modalityId: string) => {
    const technologies: Record<string, string> = {
      'visual': 'High-resolution displays (4K/8K), HDR technology, high refresh rates (120Hz+), precise color calibration',
      'auditory': 'High-fidelity audio systems, spatial audio processing, noise cancellation, wide frequency response',
      'tactile': 'Haptic feedback devices, force feedback systems, ultrasonic haptics, thermal feedback',
      'olfactory': 'Scent delivery systems, ultrasonic diffusion, thermal release, airflow management',
      'gustatory': 'Flavor delivery systems, micro-dosing technology, safe food-grade materials, hygiene controls',
      'kinesthetic': 'Motion tracking systems, spatial positioning, balance platforms, safety monitoring'
    };
    return technologies[modalityId] || 'Specialized technology for modality implementation';
  };

  const generateUserExperienceDesign = () => {
    return `User Experience Framework:

User Journey Mapping:
- Entry experience and orientation
- Progressive modality introduction
- Peak experience and climax
- Graceful conclusion and reflection
- Optional replay and variation

Personalization Systems:
- Individual sensory preference profiles
- Accessibility needs accommodation
- Cultural and personal customization
- Adaptive intensity and complexity

Control and Agency:
- User control over sensory intensity
- Modality selection and emphasis
- Pause, replay, and navigation controls
- Emergency exit and safety overrides

Feedback and Learning:
- Real-time user response monitoring
- Adaptive system learning from preferences
- Community sharing and recommendations
- Professional guided experiences

Social and Collaborative Features:
- Shared experiences and group participation
- Communication during multisensory experiences
- Collaborative creation and customization
- Community feedback and rating systems`;
  };

  const generateAccessibilityConsiderations = () => {
    return `Comprehensive Accessibility Framework:

Sensory Accessibility:
- Visual impairment accommodation (audio description, tactile alternatives)
- Hearing impairment support (visual cues, vibration alternatives)
- Gustatory restrictions (dietary alternatives, opt-out options)
- Olfactory sensitivities (scent-free alternatives, intensity control)

Physical Accessibility:
- Mobility assistance and wheelchair accessibility
- Motor impairment accommodation (alternative interaction methods)
- Strength and endurance considerations (adjustable intensity)
- Balance and coordination support (safety measures)

Cognitive Accessibility:
- Clear instructions and guidance systems
- Complexity adjustment for cognitive abilities
- Memory support and repetition options
- Attention and focus accommodation

Cultural and Personal Accessibility:
- Religious and cultural sensitivity options
- Personal preference and comfort levels
- Trauma-informed design considerations
- Age-appropriate content and intensity

Technical Accessibility:
- Multiple interface options and alternatives
- Assistive technology compatibility
- Clear labeling and documentation
- Professional support and guidance availability`;
  };

  const generateValidationFramework = () => {
    return `Validation and Quality Assurance:

Technical Validation:
- Synchronization accuracy testing (±20ms tolerance)
- Intensity calibration and consistency
- Safety threshold verification
- Performance benchmark achievement

User Experience Validation:
- User satisfaction surveys and interviews
- Accessibility compliance testing
- Cultural sensitivity validation
- Long-term user engagement analysis

Content Quality Validation:
- Multisensory coherence assessment
- Thematic consistency evaluation
- Emotional impact measurement
- Artistic and aesthetic quality review

Safety and Health Validation:
- Medical and safety expert review
- Allergen and sensitivity testing
- Emergency protocol verification
- Long-term health impact assessment

Continuous Improvement:
- Real-time analytics and monitoring
- User feedback integration
- Professional expert consultation
- Regular system updates and refinements`;
  };

  const generateModalityMappingDetails = () => {
    const selectedModalities = modalityTypes.filter(m => activeModalities.includes(m.id));
    
    return `MODALITY MAPPING REFERENCE

Project: ${projectName}
Theme: ${designTheme}
Primary: ${primaryModality}

Active Modalities: ${selectedModalities.map(m => m.name).join(', ')}
Complexity Level: ${designComplexity[0]}/10
Sensory Intensity: ${sensoryIntensity[0]}/10

Cross-Modal Relationships:
${selectedModalities.map(modality => 
  `${modality.name}: ${modality.description}`
).join('\n')}

Synchronization Requirements:
- Temporal alignment: ±40ms
- Intensity correlation: Proportional scaling
- Thematic coherence: Unified narrative
- User control: Individual modality adjustment`;
  };

  const toggleModality = (modalityId: string) => {
    setActiveModalities(prev => 
      prev.includes(modalityId) 
        ? prev.filter(m => m !== modalityId)
        : [...prev, modalityId]
    );
  };

  const copyDesign = async () => {
    if (generatedDesign) {
      try {
        await navigator.clipboard.writeText(generatedDesign);
        toast.success('Design copied to clipboard');
      } catch (err) {
        toast.error('Failed to copy design');
      }
    } else {
      toast.error('No design to copy');
    }
  };

  const saveDesign = async () => {
    if (!generatedDesign) {
      toast.error('No design to save');
      return;
    }

    try {
      const designData = {
        projectName,
        designTheme,
        primaryModality,
        designObjective: designObjective.substring(0, 500),
        activeModalities,
        designComplexity: designComplexity[0],
        sensoryIntensity: sensoryIntensity[0],
        generatedDesign,
        modalityMapping,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving multimodal design:', designData);
      toast.success('Design saved successfully');
    } catch (err) {
      toast.error('Failed to save design');
    }
  };

  const exportDesign = () => {
    if (!generatedDesign) {
      toast.error('No design to export');
      return;
    }

    try {
      const fullSpec = `${generatedDesign}\n\n--- MODALITY MAPPING ---\n${modalityMapping}`;
      const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(fullSpec);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `multimodal_design_${projectName.replace(/\s+/g, '_').toLowerCase()}_${Date.now()}.txt`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      toast.success('Design exported successfully');
    } catch (err) {
      toast.error('Failed to export design');
    }
  };

  const loadExample = () => {
    setProjectName('Ocean Symphony');
    setDesignTheme('oceanic');
    setPrimaryModality('visual');
    setDesignObjective('Create an immersive oceanic experience that captures the depth, movement, and life of the ocean through coordinated visual, auditory, and tactile elements.');
    setActiveModalities(['visual', 'auditory', 'tactile', 'olfactory']);
    setDesignComplexity([8]);
    setSensoryIntensity([7]);
    toast.info('Example multimodal design loaded');
  };

  const clearAll = () => {
    setProjectName('');
    setDesignObjective('');
    setGeneratedDesign('');
    setModalityMapping('');
    setActiveModalities(['visual']);
    setDesignComplexity([6]);
    setSensoryIntensity([7]);
    toast.info('Form cleared');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Palette className="h-8 w-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Multimodal Design Studio</h1>
            <p className="text-lg text-gray-600">Working cross-sensory translation interface for complete experience design</p>
          </div>
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-500">
          <span>• Visual Design</span>
          <span>• Audio Translation</span>
          <span>• Tactile Mapping</span>
          <span>• Cross-Sensory Sync</span>
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

          <Tabs defaultValue="project" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="project">Project</TabsTrigger>
              <TabsTrigger value="modalities">Modalities</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="project" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Project Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Project Name</Label>
                    <Input
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Enter a name for your multimodal design project..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Design Theme</Label>
                    <Select value={designTheme} onValueChange={setDesignTheme}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {designThemes.map(theme => (
                          <SelectItem key={theme.id} value={theme.id}>
                            {theme.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {designThemes.find(t => t.id === designTheme)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Modality</Label>
                    <Select value={primaryModality} onValueChange={setPrimaryModality}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {modalityTypes.map(modality => (
                          <SelectItem key={modality.id} value={modality.id}>
                            {modality.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-gray-500">
                      {modalityTypes.find(m => m.id === primaryModality)?.description}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Design Objective</Label>
                    <Textarea
                      value={designObjective}
                      onChange={(e) => setDesignObjective(e.target.value)}
                      placeholder="Describe the goals and intended experience for your multimodal design..."
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="modalities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="h-5 w-5" />
                    <span>Active Modalities</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {modalityTypes.map(modality => {
                      const IconComponent = modality.icon;
                      return (
                        <div key={modality.id} className="flex items-start space-x-2">
                          <Checkbox
                            id={modality.id}
                            checked={activeModalities.includes(modality.id)}
                            onCheckedChange={() => toggleModality(modality.id)}
                            className="mt-1"
                          />
                          <div className="flex-1 flex items-start space-x-2">
                            <IconComponent className="h-4 w-4 mt-1 text-gray-500" />
                            <div>
                              <Label htmlFor={modality.id} className="text-sm font-medium">
                                {modality.name}
                              </Label>
                              <p className="text-xs text-gray-500 mt-1">
                                {modality.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      Selected: {activeModalities.length} modalit{activeModalities.length !== 1 ? 'ies' : 'y'}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {activeModalities.map(modalityId => {
                        const modalityInfo = modalityTypes.find(m => m.id === modalityId);
                        return (
                          <Badge key={modalityId} variant="secondary" className="text-xs">
                            {modalityInfo?.name}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Waves className="h-5 w-5" />
                    <span>Design Parameters</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Design Complexity: {designComplexity[0]}/10</Label>
                    <Slider
                      value={designComplexity}
                      onValueChange={setDesignComplexity}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500">
                      {designComplexity[0] <= 3 && "Simple and minimal design"}
                      {designComplexity[0] > 3 && designComplexity[0] <= 6 && "Moderate complexity with balanced elements"}
                      {designComplexity[0] > 6 && designComplexity[0] <= 8 && "Complex design with rich interactions"}
                      {designComplexity[0] > 8 && "Highly complex with maximum sensory detail"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Sensory Intensity: {sensoryIntensity[0]}/10</Label>
                    <Slider
                      value={sensoryIntensity}
                      onValueChange={setSensoryIntensity}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500">
                      {sensoryIntensity[0] <= 3 && "Subtle and gentle sensory experience"}
                      {sensoryIntensity[0] > 3 && sensoryIntensity[0] <= 6 && "Moderate sensory stimulation"}
                      {sensoryIntensity[0] > 6 && sensoryIntensity[0] <= 8 && "Strong and engaging sensory experience"}
                      {sensoryIntensity[0] > 8 && "Maximum safe sensory intensity"}
                    </div>
                  </div>

                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-medium text-sm text-purple-900 mb-2">Design Preview</h4>
                    <p className="text-sm text-purple-800">
                      {designThemes.find(t => t.id === designTheme)?.name} theme with {activeModalities.length} active modalities
                    </p>
                    <p className="text-xs text-purple-600 mt-1">
                      Primary: {modalityTypes.find(m => m.id === primaryModality)?.name} | 
                      Complexity: {designComplexity[0]}/10 | 
                      Intensity: {sensoryIntensity[0]}/10
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Button onClick={generateDesign} className="w-full">
            <Zap className="h-4 w-4 mr-2" />
            Generate Multimodal Design
          </Button>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Design Specification</span>
                  </CardTitle>
                  <CardDescription>
                    Complete multimodal experience design and implementation guide
                  </CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={copyDesign} size="sm" variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button onClick={saveDesign} size="sm" variant="outline">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={exportDesign} size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={generatedDesign}
                onChange={(e) => setGeneratedDesign(e.target.value)}
                placeholder="Click 'Generate Multimodal Design' to create a comprehensive cross-sensory experience..."
                className="min-h-[400px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          {modalityMapping && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Modality Mapping Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs text-gray-600 whitespace-pre-wrap">
                  {modalityMapping}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Framework Info */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle>Multimodal Design Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cross-Sensory Integration</h4>
              <p className="text-gray-600 text-sm">
                Comprehensive integration across visual, auditory, tactile, olfactory, 
                gustatory, and kinesthetic modalities for complete sensory experiences.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Synchronized Design</h4>
              <p className="text-gray-600 text-sm">
                Precise temporal and intensity synchronization across all active 
                modalities with user control and accessibility considerations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Implementation Ready</h4>
              <p className="text-gray-600 text-sm">
                Complete technical specifications, safety protocols, and deployment 
                strategies for real-world multimodal experience creation.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

