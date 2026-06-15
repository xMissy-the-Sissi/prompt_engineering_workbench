
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Layers, 
  Workflow, 
  GitCompareArrows, 
  BookOpen, 
  Library,
  ChevronRight,
  Users,
  Brain,
  AlertTriangle,
  Shuffle,
  Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationSections = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/', icon: Home },
    ]
  },
  {
    title: 'Core Frameworks', 
    items: [
      { name: 'PALS Builder', href: '/pals-builder', icon: Layers },
      { name: 'CxEP Simulator', href: '/cxep-simulator', icon: Workflow },
      { name: 'Systemic Analysis', href: '/systemic/failure-cascade', icon: AlertTriangle },
      { name: 'Role Prompting', href: '/role/persona-architect', icon: Users },
      { name: 'LensGPT Deep Prompting', href: '/lens/cognitive-architecture', icon: Eye },
    ]
  },
  {
    title: 'Geometric Control Systems',
    items: [
      { name: 'Polygonal Grammar', href: '/geometric/polygonal-grammar', icon: Layers },
      { name: 'Narrative Geometry', href: '/geometric/narrative-geometry', icon: Workflow },
      { name: 'Multimodal Design', href: '/geometric/multimodal-design', icon: Shuffle },
      { name: 'Semiotics Analyzer', href: '/geometric/semiotics', icon: Eye },
    ]
  },
  {
    title: 'Meta-Cognitive Enhancement',
    items: [
      { name: 'Meta-Recursive Engine', href: '/meta/recursive-engine', icon: Brain },
      { name: 'Temporal Palimpsest', href: '/meta/temporal-palimpsest', icon: Workflow },
      { name: 'Cognitive Architecture', href: '/meta/cognitive-architecture', icon: Layers },
    ]
  },
  {
    title: 'Quality Assurance Systems',
    items: [
      { name: 'Symbolic Drift Monitor', href: '/quality/symbolic-drift', icon: AlertTriangle },
      { name: 'Contradiction Emergence', href: '/quality/contradiction-emergence', icon: Brain },
      { name: 'Failure Optimization', href: '/quality/failure-optimization', icon: Workflow },
    ]
  },
  {
    title: 'Cross-Domain Translation',
    items: [
      { name: 'Synthesized Composition', href: '/cross/synthesized-composition', icon: Shuffle },
      { name: 'Advanced Techniques', href: '/cross/advanced-techniques', icon: Layers },
      { name: 'Domain Translator', href: '/cross/domain-translator', icon: GitCompareArrows },
    ]
  },
  {
    title: 'Creative & Research Tools',
    items: [
      { name: 'Prompt Poetry', href: '/creative/prompt-poetry', icon: BookOpen },
      { name: 'Deep Research Framework', href: '/creative/deep-research', icon: Brain },
      { name: 'Visual Storytelling', href: '/creative/visual-storytelling', icon: Eye },
    ]
  },
  {
    title: 'Integration & Analysis',
    items: [
      { name: 'Framework Combiner', href: '/integration/combiner', icon: Shuffle },
      { name: 'Compare All Frameworks', href: '/compare', icon: GitCompareArrows },
      { name: 'Practice Exercises', href: '/exercises', icon: BookOpen },
      { name: 'Prompt Library', href: '/library', icon: Library },
    ]
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex items-center h-16 px-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <Layers className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-lg font-semibold text-gray-900">PE Research Platform</h1>
            <p className="text-sm text-gray-500">17 Advanced Frameworks</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        {navigationSections.map((section, sectionIndex) => (
          <div key={section.title} className={cn("space-y-1", sectionIndex > 0 && "mt-6")}>
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1 mt-2">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <Icon 
                      className={cn(
                        'mr-3 h-4 w-4 flex-shrink-0',
                        isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                      )} 
                    />
                    <span className="truncate">{item.name}</span>
                    {isActive && (
                      <ChevronRight className="ml-auto h-3 w-3 text-blue-600" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          <p>17 Revolutionary Frameworks</p>
          <p className="mt-1">© 2025 Advanced Prompt Engineering Research Platform</p>
        </div>
      </div>
    </div>
  );
}
