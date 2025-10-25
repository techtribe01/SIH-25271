import { GoogleGenAI, Type } from "@google/genai";
import type { Recommendation } from '../types';

interface Priorities {
  consumer: number;
  farmer: number;
  revenue: number;
  nmeo: number;
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    recommendedTariff: { type: Type.INTEGER, description: "The optimal integer tariff percentage (e.g., 12)." },
    rationale: { type: Type.STRING, description: "A 2-3 sentence explanation for the recommendation." },
    impact: {
      type: Type.OBJECT,
      properties: {
        importVolume: { type: Type.NUMBER },
        consumerPriceChange: { type: Type.NUMBER },
        govtRevenue: { type: Type.NUMBER },
        farmerIncome: { type: Type.NUMBER },
      },
      required: ['importVolume', 'consumerPriceChange', 'govtRevenue', 'farmerIncome']
    },
    nmeoAlignment: { type: Type.STRING, description: "Should be 'High', 'Medium', or 'Low'." },
  },
  required: ['recommendedTariff', 'rationale', 'impact', 'nmeoAlignment']
};


export const getAIRecommendation = async (
  priorities: Priorities,
  globalPrice: number,
  domesticDemand: number
): Promise<Recommendation> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Given the following economic conditions and policy priorities, recommend an optimal palm oil import tariff.

    Economic Model:
    - Import Volume (Million MT) = 10.2 - (0.15 * Tariff) - (0.00008 * Global_Price) + (0.3 * Domestic_Demand)
    - Consumer Price Change (₹/Liter) = -0.8 * (Import_Volume - 9.3)
    - Government Revenue (₹ Crores) = (Tariff / 100) * Import_Volume * (Global_Price * 1.15) / 1000
    - Farmer Income Change (%) = (10 - Import_Volume) * 3.5
    - National Mission on Edible Oils (NMEO-OP) Alignment: This mission aims to reduce import dependency. Higher tariffs, which reduce import volume, are generally more aligned. A tariff below 8% is 'Low' alignment. A tariff between 8% and 18% is 'Medium' alignment. A tariff above 18% is 'High' alignment.

    Current Conditions:
    - Global CPO Price: ${globalPrice} ₹/MT
    - Domestic Demand: ${domesticDemand} Million MT

    Policy Priorities (0=Not Important, 100=Critically Important):
    - Consumer Affordability (keep prices low): ${priorities.consumer}
    - Farmer Protection (boost farmer income): ${priorities.farmer}
    - Government Revenue (maximize revenue): ${priorities.revenue}
    - NMEO-OP Support (reduce imports): ${priorities.nmeo}

    Task:
    1. Analyze the trade-offs based on the priorities.
    2. Choose an optimal integer tariff rate between 0 and 30.
    3. Calculate the predicted impact for your recommended tariff using the provided formulas.
    4. Provide a concise, clear rationale (2-3 sentences) explaining why this tariff is a good balance for the given priorities.
    5. Return the result in the specified JSON format.
  `;

  const systemInstruction = "You are an expert economic policy advisor for the Indian Ministry of Agriculture. Your goal is to recommend an optimal import tariff for crude palm oil based on a set of policy priorities and economic conditions. You must use the provided economic model to base your calculations on. Your recommendation should be balanced and clearly justified.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const cleanedJson = jsonText.replace(/^```json\s*|```\s*$/g, '');
    const data = JSON.parse(cleanedJson);
    
    const impactResults = {
      importVolume: data.impact?.importVolume ?? null,
      consumerPriceChange: data.impact?.consumerPriceChange ?? null,
      govtRevenue: data.impact?.govtRevenue ?? null,
      farmerIncome: data.impact?.farmerIncome ?? null,
    };

    return { ...data, impact: impactResults };
  } catch (error) {
    console.error("Error fetching AI recommendation:", error);
    throw new Error("Failed to generate AI recommendation. Please try again.");
  }
};
