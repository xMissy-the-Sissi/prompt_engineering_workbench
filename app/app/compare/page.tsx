
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, Workflow, Target, CheckCircle } from 'lucide-react';

const comparisonData = [
  {
    aspect: 'Core Philosophy',
    pals: 'Multi-layered linguistic architecture for prompt control. Transforms prompt engineering from art to systematic, theoretically-grounded design.',
    cxep: 'Context-to-Execution Pipeline methodology. Transforms AI-assisted development from "vibe coding" to disciplined engineering practice.'
  },
  {
    aspect: 'Primary Focus',
    pals: 'Linguistic and cognitive control mechanisms. Controls how AI reasons, communicates, and structures responses.',
    cxep: 'Software engineering rigor and automated validation. Ensures reliable, production-ready code generation.'
  },
  {
    aspect: 'Architecture Approach',
    pals: '6-layer stack: Structural, Meaning, Cognitive, Functional, Trust & Epistemics, Cross-Modal Semiotics.',
    cxep: 'Pipeline-based: PRP Generator → Execution Engine → Context Store → Validation Loop → Audit Trail.'
  },
  {
    aspect: 'Key Artifacts',
    pals: 'PALS-aligned prompt schemas, layer-to-effect atlas, prompt audit toolkit, multilayer prompt library.',
    cxep: 'Product-Requirements Prompts (PRPs), context stores, prompt registries, validation pipelines, context-diff dashboards.'
  },
  {
    aspect: 'Measurable Benefits',
    pals: '45% improvement in syntactic correctness, enhanced logical coherence, reduced epistemic miscalibration.',
    cxep: 'Systematic context engineering, automated validation loops, prevention of context drift and misinterpretation.'
  },
  {
    aspect: 'Use Case Optimization',
    pals: 'General AI interactions, content generation, complex reasoning tasks, multimodal applications.',
    cxep: 'Software development, code generation, technical documentation, system implementation projects.'
  },
  {
    aspect: 'Quality Assurance',
    pals: 'Layer-specific validation, prompt auditing, effect measurement, syntactic correctness verification.',
    cxep: 'Automated test execution, success criteria validation, context integrity monitoring, traceability audits.'
  },
  {
    aspect: 'Scalability Model',
    pals: 'Horizontal: add more layers. Vertical: deepen layer sophistication. Template libraries for reusability.',
    cxep: 'Version-controlled PRPs, immutable prompt artifacts, Git-based workflows, automated pipeline orchestration.'
  }
];

export default function FrameworkComparison() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Framework Comparison</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Side-by-side analysis of PALS and Context Engineering 2.0 methodologies
        </p>
      </div>

      {/* Framework Overview Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Layers className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-blue-900">PALS Framework</CardTitle>
                <CardDescription className="text-blue-700">
                  Prompt-Craft Aware Linguistic Stack
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-800">Linguistic & Cognitive Control</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-800">6-Layer Architecture</span>
              </div>
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 mr-2 text-blue-600" />
                <span className="text-blue-800">45% Syntactic Improvement</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Workflow className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-green-900">Context Engineering 2.0</CardTitle>
                <CardDescription className="text-green-700">
                  Context-to-Execution Pipeline
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-green-800">Engineering Rigor & Validation</span>
              </div>
              <div className="flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-green-800">Pipeline-Based Architecture</span>
              </div>
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 mr-2 text-green-600" />
                <span className="text-green-800">Systematic Code Generation</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison Table */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Comparison</CardTitle>
          <CardDescription>
            Comprehensive analysis of both frameworks across key dimensions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {comparisonData.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{item.aspect}</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Layers className="h-3 w-3 mr-1" />
                        PALS
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.pals}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        <Workflow className="h-3 w-3 mr-1" />
                        CxEP
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{item.cxep}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Synthesis Section */}
      <Card className="bg-gradient-to-r from-blue-50 via-purple-50 to-green-50">
        <CardHeader>
          <CardTitle>Framework Synthesis</CardTitle>
          <CardDescription>How these frameworks complement each other</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Shared Principles</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Systematic architecture over intuition</li>
                <li>• Layered decomposition of complexity</li>
                <li>• Measurable, quantifiable outcomes</li>
                <li>• Complete audit trails and governance</li>
                <li>• Context integrity maintenance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Complementary Strengths</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• PALS: Linguistic control mechanisms</li>
                <li>• CxEP: Engineering rigor and validation</li>
                <li>• PALS: Granular reasoning control</li>
                <li>• CxEP: Production-ready reliability</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Integration Opportunities</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• PALS layers enhance PRP context</li>
                <li>• CxEP validation verifies PALS effectiveness</li>
                <li>• Combined schema provides both control and rigor</li>
                <li>• Unified approach for complex projects</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
