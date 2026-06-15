export type FrameworkType = 'PALS' | 'CxEP' | 'Systemic' | 'RolePrompting' | 'LensGPT' | 'Geometric' | 'MetaCognitive' | 'QualityAssurance' | 'CrossDomain' | 'CreativeResearch';
export type CombinedFrameworkType = FrameworkType | 'Combined';

// Revolutionary framework categories
export type FrameworkCategory = 'Core' | 'Geometric' | 'MetaCognitive' | 'QualityAssurance' | 'CrossDomain' | 'CreativeResearch' | 'Integration';

// Enhanced Prompt interface matching Prisma schema
export interface Prompt {
  id: string;
  name: string;
  description?: string;
  framework: FrameworkType;
  subFramework?: string;
  content: any;
  tags: string[];
  quality?: number;
  complexity?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Research';
  geometricData?: any;
  recursiveLevel?: number;
  driftMetrics?: any;
  temporalLayers?: any;
  researchMetrics?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Enhanced Exercise interface matching Prisma schema
export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Research';
  framework: CombinedFrameworkType;
  category: FrameworkCategory;
  exerciseType: 'single_framework' | 'multi_framework' | 'comparison' | 'geometric_design' | 'recursive_optimization' | 'drift_analysis';
  content: any;
  expectedOutcome?: any;
  geometricConstraints?: any;
  recursiveDepth?: number;
  evaluationMetrics?: any;
  createdAt: Date;
}

export interface UserProgress {
  id: string;
  exerciseId: string;
  completed: boolean;
  solution?: string;
  score?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FrameworkTemplate {
  id: string;
  name: string;
  framework: FrameworkType;
  templateType: string;
  content: any;
  description?: string;
  tags: string[];
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AnalysisSession {
  id: string;
  name: string;
  frameworks: FrameworkType[];
  sessionType: 'systemic_analysis' | 'role_engineering' | 'lens_application' | 'combined';
  inputData: any;
  results: any;
  insights?: any;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

// Advanced Framework Model Interfaces

export interface GeometricControl {
  id: string;
  name: string;
  polygonType: 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'octagon' | 'custom';
  vertices: any;
  properties: any;
  semanticMap: any;
  modalityMap: any;
  narrative?: any;
  symbolicLoad?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface MetaRecursiveSession {
  id: string;
  name: string;
  sessionType: 'optimization' | 'enhancement' | 'learning' | 'architecture';
  recursiveDepth: number;
  inputPrompt: string;
  iterationHistory: any;
  performanceMetrics: any;
  convergenceData: any;
  finalOutput?: string;
  status: 'active' | 'converged' | 'diverged' | 'stopped';
  createdAt: Date;
  updatedAt: Date;
}

export interface SymbolicDriftMonitor {
  id: string;
  promptId?: string;
  sessionId?: string;
  driftType: 'lexical' | 'semantic' | 'contextual' | 'cultural' | 'temporal' | 'structural';
  severity: 'low' | 'medium' | 'high' | 'critical';
  detectedAt: Date;
  originalValue: any;
  driftedValue: any;
  confidenceScore: number;
  correction?: any;
  status: 'detected' | 'corrected' | 'ignored' | 'false_positive';
  createdAt: Date;
  updatedAt: Date;
}

export interface TemporalPalimpsest {
  id: string;
  name: string;
  description?: string;
  temporalLayers: any;
  metaphorEvolution: any;
  epochData: any;
  cognitiveStates: any;
  fidelityMetrics: any;
  analysisResults?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ContradictionAnalysis {
  id: string;
  name: string;
  analysisType: 'recursive' | 'ethical' | 'logical' | 'temporal';
  inputSystem: any;
  contradictions: any;
  emergencePattern: any;
  invariantViolations: any;
  mitigationStrategy?: any;
  severityScore: number;
  status: 'analyzing' | 'resolved' | 'persistent' | 'critical';
  createdAt: Date;
  updatedAt: Date;
}

export interface CrossDomainTranslation {
  id: string;
  name: string;
  sourceDomain: string;
  targetDomain: string;
  translationMap: any;
  grammarRules: any;
  examples: any;
  qualityMetrics: any;
  validationData?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptPoetry {
  id: string;
  title: string;
  description?: string;
  poeticStructure: any;
  visualElements: any;
  emotionalMap: any;
  narrativeFlow: any;
  imagePrompts: any;
  refinements: any;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ResearchAnalytics {
  id: string;
  name: string;
  analysisType: 'evaluation' | 'latent_space' | 'semiotic' | 'performance';
  frameworks: string[];
  inputData: any;
  mtasScore?: number;
  ssiMetrics?: any;
  lcmData?: any;
  semioticInterface?: any;
  perceptualEval?: any;
  latentGovernance?: any;
  insights?: any;
  visualizations?: any;
  createdAt: Date;
  updatedAt: Date;
}

// Framework-specific structured types
export interface PALSPrompt {
  persona: string;
  audience: string;
  logic: string;
  structure: string;
  style: string;
  safety: string;
}

export interface CxEPPrompt {
  goal: string;
  context: {
    persona: string;
    documentation: string;
    codePatterns: string;
    relevantFiles: string;
  };
  constraints: {
    preconditions: string;
    postconditions: string;
    invariants: string;
  };
  stepByStepPlan: string;
  selfTest: {
    commands: string;
    successCondition: string;
  };
  reflexiveCheck: {
    prompt: string;
  };
}

export interface SystemicAnalysis {
  failureCascade: {
    initiatingEvent: string;
    propagationChain: string[];
    systemicVulnerabilities: string[];
    modularityRisk: string;
  };
  cognitiveFriction: {
    alarmFatigue: string;
    automationBias: string;
    invisibleWork: string[];
    sociotechnicalFactors: string[];
  };
  governanceTrilemma: {
    selectedApproach: 'typological_drift' | 'agonistic_contestation' | 'neuro_symbolic_justification';
    rationale: string;
    tradeoffs: string[];
  };
  criticalLens: {
    powerStructures: string[];
    laborImpact: string[];
    ethicalImplications: string[];
  };
}

export interface RolePromptingStructure {
  persona: {
    directDeclaration: string;
    expertiseLayers: string[];
    communicationStyle: string;
    constraintsBoundaries: string[];
  };
  immersion: {
    roleSettingPrompt: string;
    feedbackConfirmation: string;
    anchoringMechanisms: string[];
  };
  synergy: {
    combinedTechniques: string[];
    chainedPrompts: string[];
    selfConsistency: string[];
  };
  orchestration: {
    agentRoles: Array<{
      name: string;
      responsibilities: string[];
      interactions: string[];
    }>;
    workflow: string[];
    coordination: string;
  };
}

export interface LensGPTStructure {
  cognitiveArchitecture: {
    reasoningLevel: 'single_shot' | 'chain_of_thought' | 'tree_of_thoughts' | 'advanced_simulation';
    scaffolding: string[];
    metacognitive: string[];
  };
  lenses: Array<{
    name: string;
    perspective: string;
    analysisFramework: string;
    recursiveDepth: number;
  }>;
  reflexivity: {
    biasDetection: string[];
    limitationAcknowledgment: string[];
    frameDeconstruction: string[];
    selfCorrection: string[];
  };
  epistemicScaffolding: {
    cognitiveSupport: string[];
    knowledgeDiscovery: string[];
    expertInquiry: string[];
  };
}

// Backward compatibility
export interface SavedPrompt extends Prompt {
  content: PALSPrompt | CxEPPrompt | SystemicAnalysis | RolePromptingStructure | LensGPTStructure;
}

// Enhanced framework comparison
export interface FrameworkComparison {
  aspect: string;
  pals: string;
  cxep: string;
  systemic: string;
  rolePrompting: string;
  lensGPT: string;
}

// Framework integration types
export interface FrameworkCombination {
  id: string;
  name: string;
  frameworks: FrameworkType[];
  synergies: string[];
  conflicts: string[];
  recommendedUseCases: string[];
  integrationStrategy: string;
}

// Advanced Framework Structured Types

// Geometric Control Systems
export interface PolygonalGrammarPrompt {
  polygonType: 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'octagon' | 'custom';
  geometricProperties: {
    vertices: number;
    angles: number[];
    symmetry: string;
    proportions: number[];
  };
  semanticMapping: {
    conceptualDomain: string;
    attributeMapping: Record<string, string>;
    relationshipStructure: string[];
  };
  generativeRules: {
    transformations: string[];
    constraints: string[];
    variationPatterns: string[];
  };
}

export interface NarrativeGeometryPrompt {
  temporalStructure: {
    geometricBase: string;
    timeMapping: Record<string, string>;
    sequencePatterns: string[];
  };
  spatialNarrative: {
    geometricProgression: string[];
    spatialRelationships: string[];
    dimensionalMapping: Record<string, string>;
  };
  storyArchitecture: {
    plotGeometry: string;
    characterPositioning: string[];
    conflictGeometry: string;
    resolutionPattern: string;
  };
}

export interface MultimodalDesignPrompt {
  visualElements: {
    geometricForms: string[];
    colorMapping: Record<string, string>;
    textureAssociations: string[];
  };
  auditoryTranslation: {
    soundMapping: Record<string, string>;
    rhythmicPatterns: string[];
    harmonicStructure: string[];
  };
  tactileMapping: {
    textureCorrespondence: Record<string, string>;
    temperatureAssociations: string[];
    pressurePatterns: string[];
  };
  olfactoryElements: {
    scentAssociations: Record<string, string>;
    intensityMapping: string[];
    compositionStructure: string[];
  };
}

export interface SemioticsPrompt {
  symbolicStructure: {
    primarySymbols: string[];
    secondarySymbols: string[];
    symbolicRelationships: Record<string, string>;
  };
  meaningLayers: {
    denotativeLevel: string;
    connotativeLevel: string[];
    mythicLevel: string[];
  };
  culturalContext: {
    contextualFramework: string;
    culturalReferences: string[];
    powerStructures: string[];
  };
  geometricSymbolism: {
    shapeSymbolism: Record<string, string>;
    spatialMeaning: string[];
    transformationSymbolism: string[];
  };
}

// Meta-Cognitive Enhancement
export interface MetaRecursivePrompt {
  basePrompt: string;
  recursiveRules: {
    improvementCriteria: string[];
    iterationLimits: number;
    convergenceThreshold: number;
  };
  metaCognitive: {
    selfAssessment: string[];
    improvementStrategies: string[];
    qualityMetrics: string[];
  };
  optimizationTargets: {
    primaryObjectives: string[];
    constraintsSatisfaction: string[];
    emergentGoals: string[];
  };
}

export interface TemporalPalimpsestPrompt {
  cognitiveArchaeology: {
    layerDepth: number;
    temporalPeriods: string[];
    cognitiveFossils: string[];
  };
  metaphorEvolution: {
    baseMetaphors: string[];
    evolutionPatterns: string[];
    fidelityTracking: Record<string, number>;
  };
  epochAnalysis: {
    trainingEpochs: number[];
    cognitiveShifts: string[];
    stabilityMetrics: Record<string, number>;
  };
}

// Quality Assurance Systems
export interface SymbolicDriftPrompt {
  baselineSymbols: Record<string, string>;
  driftDetection: {
    monitoringRules: string[];
    sensitivityThreshold: number;
    detectionMethods: string[];
  };
  correctionMechanisms: {
    automaticCorrections: string[];
    humanValidation: string[];
    fallbackStrategies: string[];
  };
  integrityMetrics: {
    semanticConsistency: number;
    culturalAlignment: number;
    temporalStability: number;
  };
}

export interface ContradictionEmergencePrompt {
  systemAnalysis: {
    inputSystem: string;
    logicalStructure: string[];
    invariantConditions: string[];
  };
  contradictionDetection: {
    emergencePatterns: string[];
    logicalViolations: string[];
    ethicalInconsistencies: string[];
  };
  resolutionStrategies: {
    logicalReconciliation: string[];
    systemRedesign: string[];
    acceptableTradeoffs: string[];
  };
}

export interface FailureOptimizationPrompt {
  architectureAnalysis: {
    systemType: 'ToT' | 'Zero-Shot' | 'Prompt-Chaining' | 'Custom';
    failurePoints: string[];
    systemicWeaknesses: string[];
  };
  diagnosticFramework: {
    failureCategorization: string[];
    causationAnalysis: string[];
    impactAssessment: Record<string, number>;
  };
  optimizationStrategy: {
    reconstructionPlan: string[];
    preventiveMeasures: string[];
    performanceTargets: Record<string, number>;
  };
}

// Cross-Domain Translation
export interface SynthesizedCompositionPrompt {
  domainMapping: {
    sourceDomain: string;
    targetDomain: string;
    translationTable: Record<string, string>;
  };
  grammarRules: {
    compositionalPatterns: string[];
    transformationRules: string[];
    validationCriteria: string[];
  };
  qualityAssurance: {
    coherenceMetrics: Record<string, number>;
    domainFidelity: number;
    creativityIndex: number;
  };
}

export interface AdvancedTechniquesPrompt {
  techniqueStack: {
    chainOfThought: boolean;
    treeOfThoughts: boolean;
    fewShotLearning: boolean;
    zeroShotLearning: boolean;
    selfConsistency: boolean;
  };
  optimization: {
    techniqueSelection: string[];
    parameterTuning: Record<string, any>;
    performanceMetrics: Record<string, number>;
  };
  integration: {
    sequentialChaining: string[];
    parallelProcessing: string[];
    hybridApproaches: string[];
  };
}

// Creative & Research Tools
export interface PromptPoetryStructure {
  poeticElements: {
    meter: string;
    rhymeScheme: string;
    imagery: string[];
    metaphors: string[];
  };
  visualStorytelling: {
    sceneConstruction: string[];
    visualFlow: string[];
    emotionalArc: string[];
  };
  narrativeStructure: {
    exposition: string;
    risingAction: string[];
    climax: string;
    resolution: string;
  };
  refinementProcess: {
    iterativeImprovement: string[];
    feedbackIntegration: string[];
    qualityAssessment: Record<string, number>;
  };
}

export interface DeepResearchPrompt {
  researchFramework: {
    investigationScope: string;
    methodologyApproach: string[];
    evaluationCriteria: string[];
  };
  analyticsConfiguration: {
    mtasParameters: Record<string, any>;
    ssiConfiguration: Record<string, any>;
    lcmSettings: Record<string, any>;
  };
  semioticInterface: {
    symbolicAnalysis: string[];
    meaningExtraction: string[];
    culturalMapping: Record<string, string>;
  };
  latentSpaceGovernance: {
    accessControls: string[];
    manipulationLimits: Record<string, number>;
    ethicalBoundaries: string[];
  };
}
