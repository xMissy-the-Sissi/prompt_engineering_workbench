
import Link from 'next/link';
import { 
  Layers, 
  Workflow, 
  Library, 
  GitCompareArrows,
  ArrowRight,
  BookOpen,
  Target,
  AlertTriangle,
  Users,
  Brain,
  Eye,
  Shuffle
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          Revolutionary Prompt Engineering Research Platform
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto">
          A cutting-edge research platform integrating 17 advanced frameworks across 5 revolutionary categories: 
          from geometric control systems to meta-cognitive enhancement, quality assurance, and creative research tools
        </p>
        <div className="flex justify-center space-x-8 text-sm text-gray-500">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">17</div>
            <div>Frameworks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div>Categories</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">∞</div>
            <div>Possibilities</div>
          </div>
        </div>
      </div>

      {/* Revolutionary Framework Categories */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Revolutionary Framework Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Core Frameworks */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-blue-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Layers className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Core Frameworks</CardTitle>
                  <CardDescription>Foundation & Structure</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Master the foundational architectures: PALS 6-layer prompting, CxEP systematic pipelines, 
                Systemic Analysis, Role Prompting, and LensGPT deep inquiry.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  5 proven methodologies
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Systematic prompt architecture
                </div>
              </div>
              <Link href="/pals-builder">
                <Button className="w-full" size="sm">
                  <Layers className="h-4 w-4 mr-2" />
                  Explore Core Frameworks
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Geometric Control Systems */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-green-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Workflow className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Geometric Control</CardTitle>
                  <CardDescription>Mathematical Precision</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Revolutionary geometric primitives as generative syntax: Polygonal Grammar, 
                Narrative Geometry, Multimodal Design, and Semiotics Analysis.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  4 geometric frameworks
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Cross-modal translation
                </div>
              </div>
              <Link href="/geometric/polygonal-grammar">
                <Button className="w-full" size="sm" variant="outline">
                  <Workflow className="h-4 w-4 mr-2" />
                  Design with Geometry
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Meta-Cognitive Enhancement */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-purple-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Brain className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Meta-Cognitive</CardTitle>
                  <CardDescription>Self-Improving Systems</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Advanced recursive optimization: Meta-Recursive Engines, Temporal Palimpsest 
                cognitive archaeology, and adaptive architecture design.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  3 meta-cognitive tools
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Recursive improvement
                </div>
              </div>
              <Link href="/meta/recursive-engine">
                <Button className="w-full" size="sm" variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  Enhance Cognition
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quality Assurance Systems */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-red-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Quality Assurance</CardTitle>
                  <CardDescription>Integrity & Reliability</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Comprehensive monitoring systems: Symbolic Drift Detection, Contradiction 
                Emergence Analysis, and Failure Optimization strategies.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  3 assurance systems
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Real-time monitoring
                </div>
              </div>
              <Link href="/quality/symbolic-drift">
                <Button className="w-full" size="sm" variant="outline">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Ensure Quality
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Cross-Domain Translation */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-yellow-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Shuffle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Cross-Domain</CardTitle>
                  <CardDescription>Universal Translation</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Advanced domain bridging: Synthesized Composition techniques, Advanced 
                Prompting method integration, and universal translation matrices.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  3 translation tools
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Domain synthesis
                </div>
              </div>
              <Link href="/cross/synthesized-composition">
                <Button className="w-full" size="sm" variant="outline">
                  <Shuffle className="h-4 w-4 mr-2" />
                  Translate Domains
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Creative & Research Tools */}
          <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-indigo-500">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <Eye className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Creative Research</CardTitle>
                  <CardDescription>Innovation & Discovery</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600 text-sm">
                Cutting-edge research tools: Prompt Poetry for visual storytelling, Deep Research 
                Analytics with MTAS/SSI/LCM metrics, and advanced evaluation frameworks.
              </p>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  3 creative tools
                </div>
                <div className="flex items-center text-xs text-gray-500">
                  <Target className="h-3 w-3 mr-2" />
                  Research analytics
                </div>
              </div>
              <Link href="/creative/prompt-poetry">
                <Button className="w-full" size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Create & Research
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Integration Tools */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Shuffle className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium text-sm">Framework Combiner</h3>
                  <p className="text-xs text-gray-500">Synergistic mixing</p>
                </div>
              </div>
              <Link href="/integration/combiner">
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GitCompareArrows className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium text-sm">Compare All</h3>
                  <p className="text-xs text-gray-500">5-way analysis</p>
                </div>
              </div>
              <Link href="/compare">
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium text-sm">Practice Exercises</h3>
                  <p className="text-xs text-gray-500">All frameworks</p>
                </div>
              </div>
              <Link href="/exercises">
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Library className="h-5 w-5 text-gray-600" />
                <div>
                  <h3 className="font-medium text-sm">Prompt Library</h3>
                  <p className="text-xs text-gray-500">Enhanced collection</p>
                </div>
              </div>
              <Link href="/library">
                <Button size="sm" variant="ghost">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revolutionary Platform Overview */}
      <Card className="bg-gradient-to-r from-blue-50 via-green-50 via-purple-50 via-red-50 via-yellow-50 to-indigo-50">
        <CardHeader>
          <CardTitle className="text-center">17 Revolutionary Frameworks, Infinite Research Possibilities</CardTitle>
          <CardDescription className="text-center text-lg">
            The most advanced prompt engineering research platform ever created
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Core Foundation</h3>
              <p className="text-gray-600 text-sm">
                Master systematic architectures with PALS, CxEP, Systemic Analysis, Role Prompting, 
                and LensGPT for rigorous prompt engineering foundations.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-green-900 mb-2">Geometric Precision</h3>
              <p className="text-gray-600 text-sm">
                Revolutionary geometric control systems using mathematical primitives for 
                cross-modal design, narrative structures, and semantic mapping.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">Meta-Cognitive Intelligence</h3>
              <p className="text-gray-600 text-sm">
                Self-improving recursive systems with temporal palimpsest analysis 
                and adaptive cognitive architecture design.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-red-900 mb-2">Quality Assurance</h3>
              <p className="text-gray-600 text-sm">
                Comprehensive monitoring with symbolic drift detection, contradiction 
                emergence analysis, and systematic failure optimization.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-indigo-900 mb-2">Creative Research</h3>
              <p className="text-gray-600 text-sm">
                Advanced evaluation frameworks, prompt poetry, cross-domain translation, 
                and cutting-edge research analytics with MTAS/SSI/LCM metrics.
              </p>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-white rounded-lg border border-gray-200">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🔬 Research Impact</h4>
                <p className="text-gray-600 text-sm">
                  Comprehensive evaluation metrics, latent space governance, semiotic analysis, 
                  and advanced research methodologies for cutting-edge AI investigation.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Revolutionary Integration</h4>
                <p className="text-gray-600 text-sm">
                  Seamless framework combination, cross-domain synthesis, adaptive technique 
                  selection, and multi-modal prompt engineering capabilities.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">🎯 Practical Excellence</h4>
                <p className="text-gray-600 text-sm">
                  From geometric UI design to recursive optimization, from quality monitoring 
                  to creative storytelling - comprehensive tools for every use case.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
