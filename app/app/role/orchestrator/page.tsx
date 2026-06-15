
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shuffle, Plus, Trash2, Play, Eye, Save, Users, ArrowRight, Network } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Agent {
  id: string;
  name: string;
  role: string;
  responsibilities: string[];
  personality: string;
  expertise: string[];
  constraints: string[];
}

interface Interaction {
  id: string;
  fromAgent: string;
  toAgent: string;
  type: 'request' | 'response' | 'collaboration' | 'validation';
  description: string;
  trigger: string;
}

interface WorkflowStep {
  id: string;
  order: number;
  agent: string;
  action: string;
  inputs: string[];
  outputs: string[];
  dependencies: string[];
}

interface OrchestrationProject {
  name: string;
  description: string;
  agents: Agent[];
  interactions: Interaction[];
  workflow: WorkflowStep[];
  coordination: string;
}

export default function MultiAgentOrchestratorPage() {
  const [project, setProject] = useState<OrchestrationProject>({
    name: '',
    description: '',
    agents: [],
    interactions: [],
    workflow: [],
    coordination: ''
  });

  const [newAgent, setNewAgent] = useState({
    name: '',
    role: '',
    responsibilities: '',
    personality: '',
    expertise: '',
    constraints: ''
  });

  const [newInteraction, setNewInteraction] = useState({
    fromAgent: '',
    toAgent: '',
    type: 'request' as const,
    description: '',
    trigger: ''
  });

  const [newWorkflowStep, setNewWorkflowStep] = useState({
    agent: '',
    action: '',
    inputs: '',
    outputs: '',
    dependencies: ''
  });

  const [generatedOrchestration, setGeneratedOrchestration] = useState('');

  // Predefined agent templates
  const agentTemplates = {
    researcher: {
      name: 'Research Analyst',
      role: 'Information Gathering and Analysis',
      responsibilities: ['Gather relevant information', 'Analyze data sources', 'Synthesize findings', 'Validate information accuracy'],
      personality: 'Methodical, thorough, analytical, detail-oriented',
      expertise: ['Research methodologies', 'Data analysis', 'Source validation', 'Report writing'],
      constraints: ['Cannot make decisions', 'Must cite sources', 'Focuses on facts over opinions']
    },
    strategist: {
      name: 'Strategic Planner',
      role: 'Strategic Planning and Decision Making',
      responsibilities: ['Develop strategies', 'Make key decisions', 'Set priorities', 'Coordinate overall direction'],
      personality: 'Decisive, visionary, pragmatic, leadership-oriented',
      expertise: ['Strategic planning', 'Decision making', 'Risk assessment', 'Project coordination'],
      constraints: ['Must consider all agent inputs', 'Cannot execute detailed work', 'Focuses on high-level planning']
    },
    implementer: {
      name: 'Implementation Specialist',
      role: 'Execution and Implementation',
      responsibilities: ['Execute planned tasks', 'Handle detailed work', 'Ensure quality delivery', 'Provide progress updates'],
      personality: 'Practical, reliable, quality-focused, execution-oriented',
      expertise: ['Task execution', 'Quality assurance', 'Process optimization', 'Deliverable creation'],
      constraints: ['Requires clear instructions', 'Cannot change strategic direction', 'Focuses on implementation details']
    },
    reviewer: {
      name: 'Quality Reviewer',
      role: 'Quality Assurance and Validation',
      responsibilities: ['Review all outputs', 'Validate quality', 'Ensure consistency', 'Provide feedback'],
      personality: 'Critical, thorough, objective, quality-focused',
      expertise: ['Quality assessment', 'Consistency checking', 'Feedback provision', 'Standard enforcement'],
      constraints: ['Cannot create original content', 'Must be objective', 'Focuses on quality over quantity']
    }
  };

  const addAgent = () => {
    if (newAgent.name && newAgent.role) {
      const agent: Agent = {
        id: Date.now().toString(),
        name: newAgent.name,
        role: newAgent.role,
        responsibilities: newAgent.responsibilities.split('\n').filter(r => r.trim()),
        personality: newAgent.personality,
        expertise: newAgent.expertise.split(',').map(e => e.trim()).filter(e => e),
        constraints: newAgent.constraints.split('\n').filter(c => c.trim())
      };
      
      setProject(prev => ({ ...prev, agents: [...prev.agents, agent] }));
      setNewAgent({
        name: '',
        role: '',
        responsibilities: '',
        personality: '',
        expertise: '',
        constraints: ''
      });
    }
  };

  const loadAgentTemplate = (templateKey: keyof typeof agentTemplates) => {
    const template = agentTemplates[templateKey];
    setNewAgent({
      name: template.name,
      role: template.role,
      responsibilities: template.responsibilities.join('\n'),
      personality: template.personality,
      expertise: template.expertise.join(', '),
      constraints: template.constraints.join('\n')
    });
  };

  const addInteraction = () => {
    if (newInteraction.fromAgent && newInteraction.toAgent && newInteraction.description) {
      const interaction: Interaction = {
        ...newInteraction,
        id: Date.now().toString()
      };
      
      setProject(prev => ({ ...prev, interactions: [...prev.interactions, interaction] }));
      setNewInteraction({
        fromAgent: '',
        toAgent: '',
        type: 'request',
        description: '',
        trigger: ''
      });
    }
  };

  const addWorkflowStep = () => {
    if (newWorkflowStep.agent && newWorkflowStep.action) {
      const step: WorkflowStep = {
        id: Date.now().toString(),
        order: project.workflow.length + 1,
        agent: newWorkflowStep.agent,
        action: newWorkflowStep.action,
        inputs: newWorkflowStep.inputs.split(',').map(i => i.trim()).filter(i => i),
        outputs: newWorkflowStep.outputs.split(',').map(o => o.trim()).filter(o => o),
        dependencies: newWorkflowStep.dependencies.split(',').map(d => d.trim()).filter(d => d)
      };
      
      setProject(prev => ({ ...prev, workflow: [...prev.workflow, step] }));
      setNewWorkflowStep({
        agent: '',
        action: '',
        inputs: '',
        outputs: '',
        dependencies: ''
      });
    }
  };

  const generateOrchestrationPrompt = () => {
    if (project.agents.length === 0) {
      setGeneratedOrchestration('Please add agents before generating orchestration.');
      return;
    }

    let prompt = `# Multi-Agent Orchestration: ${project.name}\n\n`;
    
    if (project.description) {
      prompt += `## Project Description\n${project.description}\n\n`;
    }

    // Agent Definitions
    prompt += `## Agent Definitions\n\n`;
    project.agents.forEach((agent, index) => {
      prompt += `### Agent ${index + 1}: ${agent.name}\n`;
      prompt += `**Role:** ${agent.role}\n\n`;
      
      if (agent.responsibilities.length > 0) {
        prompt += `**Responsibilities:**\n`;
        agent.responsibilities.forEach(resp => prompt += `- ${resp}\n`);
        prompt += '\n';
      }
      
      if (agent.personality) {
        prompt += `**Personality:** ${agent.personality}\n\n`;
      }
      
      if (agent.expertise.length > 0) {
        prompt += `**Expertise:** ${agent.expertise.join(', ')}\n\n`;
      }
      
      if (agent.constraints.length > 0) {
        prompt += `**Constraints:**\n`;
        agent.constraints.forEach(constraint => prompt += `- ${constraint}\n`);
        prompt += '\n';
      }
      
      prompt += '---\n\n';
    });

    // Interaction Patterns
    if (project.interactions.length > 0) {
      prompt += `## Agent Interaction Patterns\n\n`;
      project.interactions.forEach((interaction, index) => {
        prompt += `### Interaction ${index + 1}: ${interaction.type.toUpperCase()}\n`;
        prompt += `**From:** ${interaction.fromAgent} → **To:** ${interaction.toAgent}\n`;
        prompt += `**Description:** ${interaction.description}\n`;
        if (interaction.trigger) {
          prompt += `**Trigger:** ${interaction.trigger}\n`;
        }
        prompt += '\n';
      });
    }

    // Workflow
    if (project.workflow.length > 0) {
      prompt += `## Workflow Steps\n\n`;
      project.workflow
        .sort((a, b) => a.order - b.order)
        .forEach((step, index) => {
          prompt += `### Step ${step.order}: ${step.action}\n`;
          prompt += `**Agent:** ${step.agent}\n`;
          
          if (step.inputs.length > 0) {
            prompt += `**Inputs:** ${step.inputs.join(', ')}\n`;
          }
          
          if (step.outputs.length > 0) {
            prompt += `**Outputs:** ${step.outputs.join(', ')}\n`;
          }
          
          if (step.dependencies.length > 0) {
            prompt += `**Dependencies:** ${step.dependencies.join(', ')}\n`;
          }
          
          prompt += '\n';
        });
    }

    // Coordination Strategy
    if (project.coordination) {
      prompt += `## Coordination Strategy\n${project.coordination}\n\n`;
    }

    // Implementation Instructions
    prompt += `## Implementation Instructions\n\n`;
    prompt += `1. **Agent Initialization:** Each agent should be initialized with their specific role and constraints\n`;
    prompt += `2. **Communication Protocol:** Agents should communicate using the defined interaction patterns\n`;
    prompt += `3. **Workflow Execution:** Follow the workflow steps in order, respecting dependencies\n`;
    prompt += `4. **Quality Control:** Ensure all outputs meet the specified criteria before proceeding\n`;
    prompt += `5. **Coordination:** Use the coordination strategy to manage conflicts and ensure alignment\n\n`;

    prompt += `---\n*Generated with Multi-Agent Orchestrator*`;

    setGeneratedOrchestration(prompt);
  };

  const getInteractionColor = (type: string) => {
    const colors = {
      request: 'bg-blue-100 text-blue-800',
      response: 'bg-green-100 text-green-800',
      collaboration: 'bg-purple-100 text-purple-800',
      validation: 'bg-yellow-100 text-yellow-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Shuffle className="h-8 w-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Multi-Agent Orchestrator</h1>
          <p className="text-gray-600">Design and coordinate complex multi-agent workflows</p>
        </div>
      </div>

      <Alert>
        <Network className="h-4 w-4" />
        <AlertDescription>
          Create sophisticated multi-agent systems with defined roles, interaction patterns, and coordination strategies. 
          Perfect for complex tasks requiring specialized expertise and collaborative workflows.
        </AlertDescription>
      </Alert>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Configuration</CardTitle>
              <CardDescription>
                Define the overall project and coordination strategy
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="e.g., Content Research & Strategy"
                    value={project.name}
                    onChange={(e) => setProject(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="projectDesc">Project Description</Label>
                <Textarea
                  id="projectDesc"
                  placeholder="Describe the overall project goals and context..."
                  value={project.description}
                  onChange={(e) => setProject(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="coordination">Coordination Strategy</Label>
                <Textarea
                  id="coordination"
                  placeholder="Describe how agents will coordinate, resolve conflicts, and ensure alignment..."
                  value={project.coordination}
                  onChange={(e) => setProject(prev => ({ ...prev, coordination: e.target.value }))}
                  className="min-h-[80px]"
                />
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="agents" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
              <TabsTrigger value="workflow">Workflow</TabsTrigger>
            </TabsList>

            <TabsContent value="agents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Templates</CardTitle>
                  <CardDescription>
                    Quick start with predefined agent roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(agentTemplates).map(([key, template]) => (
                      <Button
                        key={key}
                        variant="outline"
                        size="sm"
                        onClick={() => loadAgentTemplate(key as keyof typeof agentTemplates)}
                        className="h-auto p-3 flex flex-col"
                      >
                        <h4 className="font-medium text-xs">{template.name}</h4>
                        <p className="text-xs text-gray-600">{template.role}</p>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Add Agent</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="agentName">Agent Name</Label>
                      <Input
                        id="agentName"
                        placeholder="e.g., Research Analyst"
                        value={newAgent.name}
                        onChange={(e) => setNewAgent({...newAgent, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="agentRole">Role</Label>
                      <Input
                        id="agentRole"
                        placeholder="e.g., Information Gathering"
                        value={newAgent.role}
                        onChange={(e) => setNewAgent({...newAgent, role: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="responsibilities">Responsibilities (one per line)</Label>
                    <Textarea
                      id="responsibilities"
                      placeholder="Research relevant information&#10;Analyze data sources&#10;Validate findings"
                      value={newAgent.responsibilities}
                      onChange={(e) => setNewAgent({...newAgent, responsibilities: e.target.value})}
                      className="min-h-[80px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="personality">Personality</Label>
                    <Input
                      id="personality"
                      placeholder="e.g., Analytical, methodical, detail-oriented"
                      value={newAgent.personality}
                      onChange={(e) => setNewAgent({...newAgent, personality: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                    <Input
                      id="expertise"
                      placeholder="e.g., Research methods, Data analysis, Report writing"
                      value={newAgent.expertise}
                      onChange={(e) => setNewAgent({...newAgent, expertise: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="constraints">Constraints (one per line)</Label>
                    <Textarea
                      id="constraints"
                      placeholder="Cannot make final decisions&#10;Must cite sources&#10;Focuses on facts only"
                      value={newAgent.constraints}
                      onChange={(e) => setNewAgent({...newAgent, constraints: e.target.value})}
                      className="min-h-[60px]"
                    />
                  </div>
                  <Button onClick={addAgent} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Agent
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Project Agents ({project.agents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.agents.length > 0 ? (
                    <div className="space-y-3">
                      {project.agents.map((agent) => (
                        <div key={agent.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{agent.name}</h4>
                            <Badge variant="outline">{agent.role}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{agent.personality}</p>
                          <div className="flex flex-wrap gap-1">
                            {agent.expertise.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No agents added yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Interaction</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="fromAgent">From Agent</Label>
                      <select
                        id="fromAgent"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newInteraction.fromAgent}
                        onChange={(e) => setNewInteraction({...newInteraction, fromAgent: e.target.value})}
                      >
                        <option value="">Select agent...</option>
                        {project.agents.map((agent) => (
                          <option key={agent.id} value={agent.name}>{agent.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="toAgent">To Agent</Label>
                      <select
                        id="toAgent"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newInteraction.toAgent}
                        onChange={(e) => setNewInteraction({...newInteraction, toAgent: e.target.value})}
                      >
                        <option value="">Select agent...</option>
                        {project.agents.map((agent) => (
                          <option key={agent.id} value={agent.name}>{agent.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="interactionType">Type</Label>
                      <select
                        id="interactionType"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newInteraction.type}
                        onChange={(e) => setNewInteraction({...newInteraction, type: e.target.value as any})}
                      >
                        <option value="request">Request</option>
                        <option value="response">Response</option>
                        <option value="collaboration">Collaboration</option>
                        <option value="validation">Validation</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="interactionDesc">Description</Label>
                    <Textarea
                      id="interactionDesc"
                      placeholder="Describe this interaction pattern..."
                      value={newInteraction.description}
                      onChange={(e) => setNewInteraction({...newInteraction, description: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="trigger">Trigger Condition</Label>
                    <Input
                      id="trigger"
                      placeholder="e.g., When research is completed"
                      value={newInteraction.trigger}
                      onChange={(e) => setNewInteraction({...newInteraction, trigger: e.target.value})}
                    />
                  </div>
                  <Button onClick={addInteraction} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Interaction
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Interaction Patterns ({project.interactions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.interactions.length > 0 ? (
                    <div className="space-y-3">
                      {project.interactions.map((interaction) => (
                        <div key={interaction.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-sm">{interaction.fromAgent}</span>
                              <ArrowRight className="h-4 w-4 text-gray-400" />
                              <span className="font-medium text-sm">{interaction.toAgent}</span>
                            </div>
                            <Badge className={getInteractionColor(interaction.type)}>
                              {interaction.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{interaction.description}</p>
                          {interaction.trigger && (
                            <p className="text-xs text-gray-500">
                              <strong>Trigger:</strong> {interaction.trigger}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No interactions defined yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="workflow" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Workflow Step</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stepAgent">Assigned Agent</Label>
                      <select
                        id="stepAgent"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        value={newWorkflowStep.agent}
                        onChange={(e) => setNewWorkflowStep({...newWorkflowStep, agent: e.target.value})}
                      >
                        <option value="">Select agent...</option>
                        {project.agents.map((agent) => (
                          <option key={agent.id} value={agent.name}>{agent.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="stepAction">Action</Label>
                      <Input
                        id="stepAction"
                        placeholder="e.g., Analyze research findings"
                        value={newWorkflowStep.action}
                        onChange={(e) => setNewWorkflowStep({...newWorkflowStep, action: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stepInputs">Inputs (comma-separated)</Label>
                      <Input
                        id="stepInputs"
                        placeholder="e.g., Raw data, Requirements"
                        value={newWorkflowStep.inputs}
                        onChange={(e) => setNewWorkflowStep({...newWorkflowStep, inputs: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="stepOutputs">Outputs (comma-separated)</Label>
                      <Input
                        id="stepOutputs"
                        placeholder="e.g., Analysis report, Recommendations"
                        value={newWorkflowStep.outputs}
                        onChange={(e) => setNewWorkflowStep({...newWorkflowStep, outputs: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="stepDeps">Dependencies (comma-separated)</Label>
                    <Input
                      id="stepDeps"
                      placeholder="e.g., Step 1, Research completion"
                      value={newWorkflowStep.dependencies}
                      onChange={(e) => setNewWorkflowStep({...newWorkflowStep, dependencies: e.target.value})}
                    />
                  </div>
                  <Button onClick={addWorkflowStep} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Workflow Step
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workflow Steps ({project.workflow.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {project.workflow.length > 0 ? (
                    <div className="space-y-3">
                      {project.workflow
                        .sort((a, b) => a.order - b.order)
                        .map((step) => (
                          <div key={step.id} className="border rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Step {step.order}: {step.action}</h4>
                              <Badge variant="outline">{step.agent}</Badge>
                            </div>
                            {step.inputs.length > 0 && (
                              <p className="text-sm text-gray-600">
                                <strong>Inputs:</strong> {step.inputs.join(', ')}
                              </p>
                            )}
                            {step.outputs.length > 0 && (
                              <p className="text-sm text-gray-600">
                                <strong>Outputs:</strong> {step.outputs.join(', ')}
                              </p>
                            )}
                            {step.dependencies.length > 0 && (
                              <p className="text-xs text-gray-500">
                                <strong>Dependencies:</strong> {step.dependencies.join(', ')}
                              </p>
                            )}
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No workflow steps defined yet</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Output Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Agents:</span>
                  <Badge variant="secondary">{project.agents.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Interactions:</span>
                  <Badge variant="secondary">{project.interactions.length}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Workflow Steps:</span>
                  <Badge variant="secondary">{project.workflow.length}</Badge>
                </div>
              </div>
              <Button 
                onClick={generateOrchestrationPrompt}
                className="w-full"
                disabled={project.agents.length === 0}
              >
                <Eye className="h-4 w-4 mr-2" />
                Generate Orchestration
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Generated Orchestration</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedOrchestration ? (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-3 rounded-lg">
                      {generatedOrchestration}
                    </pre>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Copy
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">
                    Configure agents and generate orchestration prompt
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Play className="h-4 w-4 mr-2" />
                Simulate Workflow
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Export Configuration
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                Load Template Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
