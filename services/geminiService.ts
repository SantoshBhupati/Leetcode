import { GoogleGenAI, Type } from "@google/genai";
import { ExecutionResult, Language, Problem } from '../types';

const getClient = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const executeCode = async (
  code: string,
  language: Language,
  problem: Problem
): Promise<ExecutionResult> => {
  try {
    const ai = getClient();
    
    // We simulate a secure sandbox execution using Gemini.
    // The prompt instructs the model to act as a compiler/runtime for the specific language.
    const prompt = `
      You are a strict code execution engine for a competitive programming platform (like LeetCode).
      
      Problem Title: ${problem.title}
      Problem Description: ${problem.description}
      Language: ${language}
      
      User Code:
      ${code}
      
      Your Task:
      1. Analyze the code for syntax errors.
      2. If valid, mentally execute the code against 3 representative test cases (including edge cases).
      3. Determine if the solution is correct ("Accepted") or fails ("Wrong Answer", "Runtime Error", "Compilation Error").
      4. Return the result in the specified JSON format.
      
      Restrictions:
      - Be strict. O(n^2) solutions for O(n) problems should technically pass unless they time out, but for this simulation, focus on correctness.
      - If compilation fails, return "Compilation Error" and the error message.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            status: { type: Type.STRING, enum: ['Accepted', 'Wrong Answer', 'Runtime Error', 'Compilation Error'] },
            output: { type: Type.STRING, description: "Console output or error message" },
            executionTime: { type: Type.STRING, description: "Simulated execution time, e.g., '52ms'" },
            memory: { type: Type.STRING, description: "Simulated memory usage, e.g., '14.2MB'" },
            testCasesPassed: { type: Type.INTEGER, description: "Number of test cases passed out of 3" },
            totalTestCases: { type: Type.INTEGER, description: "Total test cases (3)" }
          },
          required: ['status', 'output', 'executionTime', 'testCasesPassed']
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
        status: result.status,
        output: result.output,
        executionTime: result.executionTime,
        memory: result.memory,
        testCasesPassed: result.testCasesPassed,
        totalTestCases: 3,
        error: result.status !== 'Accepted' ? result.output : undefined
    };

  } catch (error: any) {
    console.error("Gemini Execution Error", error);
    return {
      status: 'Runtime Error',
      output: `System Error: ${error.message || 'Unknown error occurred'}`,
      totalTestCases: 0
    };
  }
};

export const getAIHint = async (problem: Problem, code: string): Promise<string> => {
    try {
        const ai = getClient();
        const prompt = `
          The user is stuck on the following problem: "${problem.title}".
          Current code snippet:
          ${code}
          
          Provide a helpful, subtle hint that points them in the right direction without giving away the full solution code. Keep it under 2 sentences.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        return response.text || "No hint available.";
    } catch (e) {
        return "Could not generate hint at this time.";
    }
}
