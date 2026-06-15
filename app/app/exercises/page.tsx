
'use client';

import React, { useState } from 'react';
import { BookOpen, Play, Trophy, Clock, ChevronRight, X, Check, Save, Copy, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Exercise } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { clipboardUtils } from '@/lib/utils';

const sampleExercises: Exercise[] = [
  {
    id: '1',
    title: 'Craft a Technical Expert Persona',
    description: 'Practice creating the Persona layer for a software architecture consultant.',
    difficulty: 'Beginner',
    framework: 'PALS',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Create a compelling persona layer for an AI that needs to provide software architecture advice to a startup team. Consider expertise areas, communication style, and knowledge boundaries.',
      template: {
        persona: 'You are...'
      }
    }
  },
  {
    id: '2',
    title: 'Define Audience for Code Review',
    description: 'Master the Audience layer by specifying different developer skill levels.',
    difficulty: 'Beginner',
    framework: 'PALS',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Define the audience characteristics for an AI performing code reviews. Consider skill levels, domain knowledge, and communication preferences.',
      template: {
        audience: 'Your audience consists of...'
      }
    }
  },
  {
    id: '3',
    title: 'Structure a Multi-Step Logic Flow',
    description: 'Build complex reasoning patterns using the Logic layer.',
    difficulty: 'Intermediate',
    framework: 'PALS',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Create a logic layer that guides systematic problem-solving for debugging complex distributed systems.',
      template: {
        logic: 'Use a systematic approach...'
      }
    }
  },
  {
    id: '4',
    title: 'Generate PRP for Authentication System',
    description: 'Practice creating a complete Product-Requirements Prompt for user authentication.',
    difficulty: 'Intermediate',
    framework: 'CxEP',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Create a comprehensive PRP for building a secure user authentication system with modern best practices.',
      template: {
        goal: 'Implement...',
        persona: 'You are...',
        preconditions: 'Before starting...',
        postconditions: 'After completion...'
      }
    }
  },
  {
    id: '5',
    title: 'Advanced Safety Constraints',
    description: 'Design robust safety and ethical boundaries for AI systems.',
    difficulty: 'Advanced',
    framework: 'PALS',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Create comprehensive safety constraints for an AI system that provides financial advice.',
      template: {
        safety: 'To ensure responsible operation...'
      }
    }
  },
  {
    id: '6',
    title: 'Full CxEP Pipeline Design',
    description: 'Design a complete context engineering pipeline for a complex project.',
    difficulty: 'Advanced',
    framework: 'CxEP',
    category: 'Core',
    exerciseType: 'single_framework',
    createdAt: new Date(),
    content: {
      instructions: 'Design a full CxEP workflow for building a microservices architecture, including all validation steps.',
      template: {
        goal: 'Design and implement...',
        stepByStepPlan: '1. Architecture analysis...',
        selfTestCommands: 'Execute integration tests...',
        successCondition: 'All services communicate correctly...'
      }
    }
  }
];

export default function ExercisesPage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedFramework, setSelectedFramework] = useState<string>('All');
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [exerciseOpen, setExerciseOpen] = useState(false);
  const [exerciseResponse, setExerciseResponse] = useState<Record<string, string>>({});
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const frameworks = ['All', 'PALS', 'CxEP'];

  const startExercise = (exercise: Exercise) => {
    setCurrentExercise(exercise);
    setExerciseResponse({});
    setExerciseOpen(true);
  };

  const closeExercise = () => {
    setExerciseOpen(false);
    setCurrentExercise(null);
    setExerciseResponse({});
  };

  const completeExercise = () => {
    if (currentExercise) {
      const newCompleted = new Set(completedExercises);
      newCompleted.add(currentExercise.id);
      setCompletedExercises(newCompleted);
      
      // Save the exercise response
      clipboardUtils.saveData({
        exerciseId: currentExercise.id,
        exerciseTitle: currentExercise.title,
        framework: currentExercise.framework,
        response: exerciseResponse,
        completedAt: new Date().toISOString()
      }, `exercise_${currentExercise.id}_${Date.now()}`, 'Exercise completed and saved!');
      
      closeExercise();
    }
  };

  const copyExerciseResponse = () => {
    if (currentExercise) {
      const responseText = Object.entries(exerciseResponse)
        .map(([key, value]) => `${key.toUpperCase()}:\n${value}\n`)
        .join('\n');
      
      clipboardUtils.copyToClipboard(responseText, 'Exercise response copied to clipboard');
    }
  };

  const filteredExercises = sampleExercises.filter(exercise => {
    const difficultyMatch = selectedDifficulty === 'All' || exercise.difficulty === selectedDifficulty;
    const frameworkMatch = selectedFramework === 'All' || exercise.framework === selectedFramework;
    return difficultyMatch && frameworkMatch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFrameworkColor = (framework: string) => {
    return framework === 'PALS' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-green-100 text-green-800';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Practice Exercises</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Hands-on learning activities to master PALS and Context Engineering concepts
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{sampleExercises.length}</p>
                <p className="text-sm text-gray-600">Total Exercises</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {sampleExercises.filter(e => e.framework === 'PALS').length}
                </p>
                <p className="text-sm text-gray-600">PALS Exercises</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {sampleExercises.filter(e => e.framework === 'CxEP').length}
                </p>
                <p className="text-sm text-gray-600">CxEP Exercises</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Exercises</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Difficulty Level:</label>
              <div className="flex gap-2">
                {difficulties.map(difficulty => (
                  <Button
                    key={difficulty}
                    variant={selectedDifficulty === difficulty ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDifficulty(difficulty)}
                  >
                    {difficulty}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Framework:</label>
              <div className="flex gap-2">
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
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight">{exercise.title}</CardTitle>
                  <CardDescription className="text-sm">{exercise.description}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2 mt-3">
                <Badge className={getDifficultyColor(exercise.difficulty)}>
                  {exercise.difficulty}
                </Badge>
                <Badge className={getFrameworkColor(exercise.framework)}>
                  {exercise.framework}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="font-medium mb-1">Learning Goals:</p>
                  <p>{exercise.content.instructions.substring(0, 100)}...</p>
                </div>
                
                <Button 
                  className="w-full group" 
                  onClick={() => startExercise(exercise)}
                  variant={completedExercises.has(exercise.id) ? "outline" : "default"}
                >
                  {completedExercises.has(exercise.id) ? (
                    <>
                      <Check className="h-4 w-4 mr-2 text-green-600" />
                      Review Exercise
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4 mr-2" />
                      Start Exercise
                    </>
                  )}
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No exercises found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more exercises.</p>
          </CardContent>
        </Card>
      )}

      {/* Learning Path Suggestion */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle>Recommended Learning Path</CardTitle>
          <CardDescription>Follow this progression to master both frameworks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">PALS Framework Path</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Start with Persona and Audience layers</li>
                <li>2. Practice Logic and Structure combinations</li>
                <li>3. Master Style and Safety constraints</li>
                <li>4. Integrate all 6 layers effectively</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">CxEP Pipeline Path</h4>
              <ol className="space-y-2 text-sm text-gray-600">
                <li>1. Understand PRP structure and components</li>
                <li>2. Practice creating clear success criteria</li>
                <li>3. Design validation and testing strategies</li>
                <li>4. Build complete pipeline workflows</li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Dialog */}
      <Dialog open={exerciseOpen} onOpenChange={setExerciseOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">{currentExercise?.title}</DialogTitle>
                <DialogDescription className="mt-2">
                  {currentExercise?.description}
                </DialogDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getDifficultyColor(currentExercise?.difficulty || '')}>
                  {currentExercise?.difficulty}
                </Badge>
                <Badge className={getFrameworkColor(currentExercise?.framework || '')}>
                  {currentExercise?.framework}
                </Badge>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6 mt-6">
            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{currentExercise?.content.instructions}</p>
              </CardContent>
            </Card>

            {/* Exercise Fields */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Response</CardTitle>
                <CardDescription>
                  Complete each section based on the instructions above
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentExercise?.content.template && Object.entries(currentExercise.content.template).map(([key, placeholder]) => (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                    <Textarea
                      id={key}
                      value={exerciseResponse[key] || ''}
                      onChange={(e) => setExerciseResponse(prev => ({
                        ...prev,
                        [key]: e.target.value
                      }))}
                      placeholder={typeof placeholder === 'string' ? placeholder : `Enter your ${key} here...`}
                      className="min-h-[100px]"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={copyExerciseResponse}
                  disabled={Object.keys(exerciseResponse).length === 0}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Response
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setExerciseResponse({})}
                  disabled={Object.keys(exerciseResponse).length === 0}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={closeExercise}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button 
                  onClick={completeExercise}
                  disabled={Object.keys(exerciseResponse).length === 0 || 
                           Object.values(exerciseResponse).some(value => !value?.trim())}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Complete Exercise
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
