'use server';
/**
 * @fileOverview An AI service for suggesting restaurants based on a user's query.
 *
 * - suggestRestaurants - A function that handles the restaurant suggestion process.
 * - RestaurantSuggestInput - The input type for the suggestRestaurants function.
 * - RestaurantSuggestOutput - The return type for the suggestRestaurants function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const RestaurantSchema = z.object({
  name: z.string().describe('The name of the restaurant.'),
  category: z.string().describe('The category of the restaurant.'),
});

const RestaurantSuggestInputSchema = z.object({
  query: z.string().describe("The user's search query for food or restaurants."),
  restaurants: z.array(RestaurantSchema).describe('A list of available restaurants to choose from.'),
});
export type RestaurantSuggestInput = z.infer<typeof RestaurantSuggestInputSchema>;

const SuggestedRestaurantSchema = z.object({
    name: z.string().describe('The name of the suggested restaurant.'),
    reason: z.string().describe('A brief reason why this restaurant is a good suggestion for the user.'),
});

const RestaurantSuggestOutputSchema = z.object({
  responseMessage: z.string().describe('A friendly, conversational message to the user summarizing the suggestions.'),
  suggestions: z.array(SuggestedRestaurantSchema).describe('A list of suggested restaurants.'),
});
export type RestaurantSuggestOutput = z.infer<typeof RestaurantSuggestOutputSchema>;

export async function suggestRestaurants(input: RestaurantSuggestInput): Promise<RestaurantSuggestOutput> {
  return restaurantSuggesterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'restaurantSuggesterPrompt',
  input: {schema: RestaurantSuggestInputSchema},
  output: {schema: RestaurantSuggestOutputSchema},
  prompt: `You are a friendly and helpful AI assistant for the Serenity Food and Delivery app. Your goal is to help users find the perfect restaurant based on their query from a provided list.

You will be given a user's query and a list of restaurants with their categories.

Analyze the user's query: "{{query}}".

Based on the query, select up to 8 of the most relevant restaurants from the list below. For each suggestion, provide a short, compelling reason why it matches the user's request.

Finally, compose a friendly, single-sentence response message to the user summarizing your findings, for example "Tentu, berikut adalah beberapa restoran yang mungkin Anda sukai!" or "Saya menemukan beberapa pilihan masakan Jepang untuk Anda!".

Important: All responses (both responseMessage and the suggestion reasons) must be in Bahasa Indonesia.

Here is the list of available restaurants:
{{#each restaurants}}
- {{this.name}} ({{this.category}})
{{/each}}

Please provide your answer in the structured JSON format.`,
});

const restaurantSuggesterFlow = ai.defineFlow(
  {
    name: 'restaurantSuggesterFlow',
    inputSchema: RestaurantSuggestInputSchema,
    outputSchema: RestaurantSuggestOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
