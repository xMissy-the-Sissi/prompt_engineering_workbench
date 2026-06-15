
'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, Copy, Trash2, Edit, Filter, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SavedPrompt } from '@/lib/types';

// Sample data for demonstration
const samplePrompts: SavedPrompt[] = [
  {
    id: '1',
    name: 'Software Architecture Consultant',
    description: 'Complete PALS prompt for providing software architecture guidance',
    framework: 'PALS',
    tags: ['architecture', 'software', 'consulting'],
    content: {
      persona: 'You are an expert software architect with 15+ years of experience in distributed systems, microservices, and cloud architecture.',
      audience: 'Your audience consists of senior developers and tech leads who need strategic guidance on system design decisions.',
      logic: 'Use systematic analysis: examine requirements, evaluate trade-offs, recommend solutions with clear reasoning.',
      structure: 'Organize responses as: 1) Problem analysis 2) Options evaluation 3) Recommended approach 4) Implementation considerations.',
      style: 'Professional yet approachable. Use concrete examples and avoid over-abstraction. Be decisive but acknowledge uncertainties.',
      safety: 'Always consider scalability, security, and maintainability. State assumptions clearly and recommend proven patterns over experimental approaches.'
    },
    createdAt: new Date('2025-01-04T10:30:00Z'),
    updatedAt: new Date('2025-01-04T10:30:00Z')
  },
  {
    id: '2',
    name: 'User Authentication System PRP',
    description: 'CxEP prompt for building secure authentication systems',
    framework: 'CxEP',
    tags: ['authentication', 'security', 'backend'],
    content: {
      goal: 'Implement a secure, scalable user authentication system with modern security practices',
      context: {
        persona: 'You are a senior security engineer with expertise in authentication protocols and web security',
        documentation: 'Follow OWASP authentication guidelines, OAuth 2.0 specifications, and industry security best practices',
        codePatterns: 'Use established patterns: JWT tokens, password hashing with bcrypt, rate limiting, session management',
        relevantFiles: 'Focus on authentication middleware, user models, security configurations, and API routes'
      },
      constraints: {
        preconditions: 'Existing user database schema, web framework setup, security libraries installed',
        postconditions: 'Functional login/logout, password reset, session management, rate limiting active',
        invariants: 'Passwords always hashed, sessions properly invalidated, security headers set'
      },
      stepByStepPlan: '1. Setup password hashing 2. Implement login/logout 3. Add session management 4. Configure rate limiting 5. Add password reset',
      selfTest: {
        commands: 'Run authentication unit tests, test rate limiting, verify security headers, test password reset flow',
        successCondition: 'All tests pass, security audit passes, authentication flow works end-to-end'
      },
      reflexiveCheck: {
        prompt: 'Verify all security requirements met, no hardcoded secrets, proper error handling implemented'
      }
    },
    createdAt: new Date('2025-01-03T14:15:00Z'),
    updatedAt: new Date('2025-01-03T14:15:00Z')
  },
  {
    id: '3',
    name: 'Technical Documentation Writer',
    description: 'PALS prompt optimized for creating developer documentation',
    framework: 'PALS',
    tags: ['documentation', 'technical_writing', 'developer_tools'],
    content: {
      persona: 'You are an expert technical writer specializing in developer documentation, with deep understanding of software development workflows.',
      audience: 'Your audience includes developers of varying experience levels who need clear, actionable documentation.',
      logic: 'Structure information from general to specific. Provide context before details. Include examples for complex concepts.',
      structure: 'Use clear headings, bullet points, code examples, and step-by-step instructions. Include troubleshooting sections.',
      style: 'Clear, concise, and practical. Use active voice. Avoid jargon without explanation. Include visual aids when helpful.',
      safety: 'Ensure accuracy of all technical information. Provide version-specific details. Include warnings for potentially destructive operations.'
    },
    createdAt: new Date('2025-01-02T09:45:00Z'),
    updatedAt: new Date('2025-01-02T09:45:00Z')
  }
];

export default function LibraryPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>(samplePrompts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'name' | 'created' | 'updated'>('updated');

  const frameworks = ['All', 'PALS', 'CxEP'];
  const sortOptions = [
    { value: 'updated', label: 'Last Updated' },
    { value: 'created', label: 'Date Created' },
    { value: 'name', label: 'Name' }
  ];

  const filteredPrompts = prompts
    .filter(prompt => {
      const matchesSearch = prompt.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFramework = selectedFramework === 'All' || prompt.framework === selectedFramework;
      return matchesSearch && matchesFramework;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'created':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updated':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  const copyPrompt = async (prompt: SavedPrompt) => {
    const content = prompt.framework === 'PALS' 
      ? Object.entries(prompt.content as any)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`)
          .join('\n\n')
      : Object.entries(prompt.content as any)
          .filter(([_, value]) => value)
          .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`)
          .join('\n\n');
    
    await navigator.clipboard.writeText(content);
    // Could add toast notification here
  };

  const deletePrompt = (id: string) => {
    setPrompts(prompts.filter(p => p.id !== id));
  };

  const formatDate = (date: string | Date) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getFrameworkColor = (framework: string) => {
    return framework === 'PALS' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prompt Library</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your saved prompts from both PALS and CxEP frameworks
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Prompt
        </Button>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{prompts.length}</p>
              <p className="text-sm text-gray-600">Total Prompts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {prompts.filter(p => p.framework === 'PALS').length}
              </p>
              <p className="text-sm text-gray-600">PALS Prompts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {prompts.filter(p => p.framework === 'CxEP').length}
              </p>
              <p className="text-sm text-gray-600">CxEP Prompts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{filteredPrompts.length}</p>
              <p className="text-sm text-gray-600">Filtered Results</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search prompts by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">Framework:</span>
                {frameworks.map(framework => (
                  <Button
                    key={framework}
                    variant={selectedFramework === framework ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFramework(framework)}
                  >
                    {framework}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border rounded px-2 py-1"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prompts Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Card key={prompt.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <CardTitle className="text-lg leading-tight">{prompt.name}</CardTitle>
                  {prompt.description && (
                    <CardDescription className="text-sm">{prompt.description}</CardDescription>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <Badge className={getFrameworkColor(prompt.framework)}>
                  {prompt.framework}
                </Badge>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(prompt.updatedAt)}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Preview:</p>
                  <div className="bg-gray-50 rounded p-2 text-xs max-h-20 overflow-hidden">
                    {prompt.framework === 'PALS' ? (
                      <>
                        <strong>Persona:</strong> {(prompt.content as any).persona?.substring(0, 80)}...
                      </>
                    ) : (
                      <>
                        <strong>Goal:</strong> {(prompt.content as any).goal?.substring(0, 80)}...
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyPrompt(prompt)}
                    className="flex-1"
                  >
                    <Copy className="h-3 w-3 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deletePrompt(prompt.id)}
                    className="text-red-600 hover:text-red-700 hover:border-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPrompts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prompts found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || selectedFramework !== 'All'
                ? 'Try adjusting your search or filters to see more prompts.'
                : 'Start building your prompt library by creating your first prompt.'}
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Prompt
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tips Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle>Library Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Organization Best Practices</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Use descriptive names that indicate the prompt's purpose</li>
                <li>• Add detailed descriptions for complex prompts</li>
                <li>• Tag prompts by use case or domain</li>
                <li>• Regular review and update of older prompts</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Reusability Tips</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Create template versions for common scenarios</li>
                <li>• Document successful prompt patterns</li>
                <li>• Share effective prompts with your team</li>
                <li>• Version control important prompt iterations</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
