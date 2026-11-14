import Groq from 'groq-sdk';
import { Logger } from './loggers';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export class DataGenerator {

    static async generateTransferNote(): Promise<string> {

        Logger.info('Generating Travel note using Groq AI');

        if (!process.env.GROQ_API_KEY) {
            throw new Error('GROQ_API_KEY is missing in .env');
        }

        const response = await groq.chat.completions.create({
            model: 'openai/gpt-oss-20b',

            messages: [
                {
                    role: 'user',
                    content: 'Write one short transaction note for a travel payment. Return only a note of 5 to 8 words.'
                }
            ],

            reasoning_effort: 'low',
            include_reasoning: false,
            max_completion_tokens: 2048,
            temperature: 0.6
        });

        const choice = response.choices?.[0];

        console.log('Groq diagnostics:', {
            model: response.model,
            finishReason: choice?.finish_reason,
            usage: response.usage,
            content: choice?.message?.content
        });

        const note = choice?.message?.content?.trim();

        if (!note) {
            throw new Error(
                `Groq returned empty content. Finish reason: ${choice?.finish_reason}`
            );
        }

        Logger.success('Travel note generated successfully');

        return note;
    }
}