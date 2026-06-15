
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const systemPrompt = `You are an expert in Context Engineering 2.0 methodology. Generate a structured Product-Requirements Prompt (PRP) based on the user's input.

Analyze the input and create a comprehensive PRP with the following structure:

1. goal: Clear, unambiguous functional specification
2. persona: Expert role definition appropriate for the task
3. documentation: Relevant documentation or standards to reference
4. codePatterns: Applicable design patterns or examples
5. relevantFiles: Scope limitations and file considerations
6. preconditions: Required system state before implementation
7. postconditions: Guaranteed state after implementation
8. invariants: Properties that must always hold true
9. stepByStepPlan: Sequential reasoning and implementation guide
10. selfTestCommands: Executable validation tests
11. successCondition: Clear pass/fail criteria
12. reflexiveCheck: Self-evaluation prompt against specification

Respond with raw JSON only. Do not include code blocks, markdown, or any other formatting.`;

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a PRP for: ${prompt}` }
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`);
    }

    const result = await response.json();
    const content = result?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content received from LLM API');
    }

    // Parse and sanitize the JSON response
    let prpData;
    try {
      // Remove any potential markdown code blocks
      const cleanedContent = content.replace(/```json\n?|\n?```/g, '').trim();
      prpData = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      throw new Error('Invalid JSON response from LLM');
    }

    // Ensure all required fields are present with fallbacks
    const prp = {
      goal: prpData.goal || 'Implement the requested functionality',
      persona: prpData.persona || 'You are an experienced software engineer',
      documentation: prpData.documentation || 'Follow industry best practices and coding standards',
      codePatterns: prpData.codePatterns || 'Use appropriate design patterns for the technology stack',
      relevantFiles: prpData.relevantFiles || 'Focus on the core functionality files',
      preconditions: prpData.preconditions || 'System should be in a clean, deployable state',
      postconditions: prpData.postconditions || 'Functionality implemented and tested',
      invariants: prpData.invariants || 'Code should be maintainable and well-documented',
      stepByStepPlan: prpData.stepByStepPlan || '1. Analyze requirements 2. Design solution 3. Implement 4. Test',
      selfTestCommands: prpData.selfTestCommands || 'Run unit tests, integration tests, and manual verification',
      successCondition: prpData.successCondition || 'All tests pass and requirements are met',
      reflexiveCheck: prpData.reflexiveCheck || 'Verify the implementation meets all specified requirements'
    };

    return NextResponse.json({ prp });

  } catch (error) {
    console.error('Error generating PRP:', error);
    return NextResponse.json(
      { error: 'Failed to generate PRP. Please try again.' },
      { status: 500 }
    );
  }
}
