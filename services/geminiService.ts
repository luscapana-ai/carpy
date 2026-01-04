
import { GoogleGenAI, Type } from "@google/genai";
import type { Catch } from '../types';

const MODEL_NAME = "gemini-3-flash-preview";
const IMAGE_MODEL = "gemini-2.5-flash-image";

export type WeatherIconType = 'SUNNY' | 'PARTLY_CLOUDY' | 'CLOUDY' | 'RAINY' | 'SNOWY' | 'THUNDERSTORM';

export interface BriefingAdvice {
    locations: string[];
    tactics: string[];
    rigs: string[];
    baitingStrategy: string[];
}

export interface SimpleForecastData {
    day: string;
    temp: number;
    condition: string;
    icon: WeatherIconType;
    windSpeed: number;
    windDirection: string;
    pressure: number;
    sunrise?: string;
    sunset?: string;
}

export interface TodayForecastData extends SimpleForecastData {
    briefing: {
        morning: BriefingAdvice;
        afternoon: BriefingAdvice;
        evening: BriefingAdvice;
    };
}

export type ForecastData = SimpleForecastData | TodayForecastData;

export const BASE_SYSTEM_INSTRUCTION = "You are 'The Ghillie', a world-class UK carp fishing expert. You are friendly, tactical, and concise. You know every rig (Ronnie, Chod, German, etc.) and bait. Your goal is to help the angler catch their target fish by analyzing weather, location, and previous catch data.";

/**
 * Validates and cleans base64 strings to ensure they are correct for the Gemini API.
 */
const cleanBase64 = (data: string) => {
    if (!data) return "";
    return data.includes(',') ? data.split(',')[1] : data;
};

export const getAIAdvice = async (prompt: string, catchData: Catch[] = []) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const catchSummary = catchData.length > 0
            ? `Recent catches: ` + catchData.slice(0, 5).map(c => `${c.weight.lbs}lb ${c.species} on ${c.bait}`).join(', ')
            : "No previous catch data.";

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `${prompt}\n\nContext: ${catchSummary}`,
            config: { systemInstruction: BASE_SYSTEM_INSTRUCTION }
        });
        return response.text || "Error getting advice.";
    } catch (error: any) {
        console.error("AI Advice Error:", error);
        return `The Ghillie is temporarily offline: ${error.message || "Unknown error"}`;
    }
};

export const appraiseGear = async (base64Image: string, description?: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const parts: any[] = [{ text: "Act as a specialist UK Tackle Dealer. Identify this item of carp fishing gear. Provide a suggested used market price in GBP (£), a professional sales description, and a condition assessment (1-10). Response must be JSON." }];
        
        if (base64Image) {
            parts.push({
                inlineData: {
                    mimeType: "image/jpeg",
                    data: cleanBase64(base64Image)
                }
            });
        }
        if (description) parts.push({ text: `Context: ${description}` });

        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: { parts },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        itemName: { type: Type.STRING },
                        suggestedPrice: { type: Type.NUMBER },
                        description: { type: Type.STRING },
                        conditionScore: { type: Type.NUMBER },
                        keyFeatures: { type: Type.ARRAY, items: { type: Type.STRING } }
                    }
                }
            }
        });

        return response.text ? JSON.parse(response.text) : null;
    } catch (error) {
        console.error("Appraisal error:", error);
        return null;
    }
};

export const estimateShipping = async (title: string, price: number, category: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `Suggest UK shipping for: ${title} in category ${category}, valued at £${price}. Suggest courier, cost, and insurance fee.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        courier: { type: Type.STRING, description: "e.g. Royal Mail Tracked 48, ParcelForce 24" },
                        postageCost: { type: Type.NUMBER, description: "Numeric cost in GBP" },
                        insuranceFee: { type: Type.NUMBER, description: "Based on value" },
                        tier: { type: Type.STRING, description: "Small/Medium/Large/Bulky" }
                    },
                    required: ["courier", "postageCost", "insuranceFee", "tier"]
                }
            }
        });
        return response.text ? JSON.parse(response.text) : null;
    } catch (error) {
        console.error("Shipping estimate error:", error);
        return null;
    }
};

export const generateRigBlueprint = async (description: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: IMAGE_MODEL,
            contents: {
                parts: [{ text: `A high-detail, technical macro photograph of a carp fishing rig setup: ${description}. Sharp focus on the hook, bait, and terminal tackle. Realistic watercraft style.` }]
            },
            config: {
                imageConfig: { aspectRatio: "1:1" }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Image generation error:", error);
        return null;
    }
};

export const processVoiceCatch = async (audioBase64: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        // CORRECTED: Wrapped content parts in a single object as per API spec
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: {
                parts: [
                    { inlineData: { mimeType: "audio/wav", data: cleanBase64(audioBase64) } },
                    { text: "Parse this verbal fishing report into a JSON object. Fields: species, lbs, oz, bait, rig, notes." }
                ]
            },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        species: { type: Type.STRING },
                        lbs: { type: Type.NUMBER },
                        oz: { type: Type.NUMBER },
                        bait: { type: Type.STRING },
                        rig: { type: Type.STRING },
                        notes: { type: Type.STRING }
                    }
                }
            }
        });
        return response.text ? JSON.parse(response.text) : null;
    } catch (error) {
        console.error("Voice parse error:", error);
        return null;
    }
};

export const analyzeLakePhoto = async (base64Image: string, mimeType: string) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const imagePart = { 
            inlineData: { 
                data: cleanBase64(base64Image), 
                mimeType 
            } 
        };
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: { parts: [imagePart, { text: "Identify hotspots for carp fishing in this photo." }] },
            config: { systemInstruction: "You are an expert UK scout." }
        });
        return response.text || "Analysis failed.";
    } catch (error) {
        console.error("Photo analysis error:", error);
        return "Error analyzing photo. Please check the image format and try again.";
    }
};

export const getWeatherForLocation = async (lat: number, lon: number) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `Current weather for lat: ${lat}, lon: ${lon}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        temp: { type: Type.NUMBER },
                        condition: { type: Type.STRING },
                        windSpeed: { type: Type.NUMBER },
                        windDirection: { type: Type.STRING }
                    },
                    required: ["temp", "condition", "windSpeed", "windDirection"]
                }
            }
        });
        return response.text ? JSON.parse(response.text) : null;
    } catch (error) {
        return null;
    }
};

export const getWeatherForecast = async (lat: number, lon: number): Promise<ForecastData[] | null> => {
     try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: `3-day fishing weather forecast for lat: ${lat}, lon: ${lon}`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        yesterday: { type: Type.OBJECT, properties: { temp: { type: Type.NUMBER }, condition: { type: Type.STRING }, icon: { type: Type.STRING }, windSpeed: { type: Type.NUMBER }, windDirection: { type: Type.STRING }, pressure: { type: Type.NUMBER } } },
                        today: { type: Type.OBJECT, properties: { temp: { type: Type.NUMBER }, condition: { type: Type.STRING }, icon: { type: Type.STRING }, windSpeed: { type: Type.NUMBER }, windDirection: { type: Type.STRING }, pressure: { type: Type.NUMBER }, briefing: { type: Type.OBJECT, properties: { morning: { type: Type.OBJECT, properties: { locations: { type: Type.ARRAY, items: { type: Type.STRING } }, tactics: { type: Type.ARRAY, items: { type: Type.STRING } }, rigs: { type: Type.ARRAY, items: { type: Type.STRING } }, baitingStrategy: { type: Type.ARRAY, items: { type: Type.STRING } } } }, afternoon: { type: Type.OBJECT, properties: { locations: { type: Type.ARRAY, items: { type: Type.STRING } }, tactics: { type: Type.ARRAY, items: { type: Type.STRING } }, rigs: { type: Type.ARRAY, items: { type: Type.STRING } }, baitingStrategy: { type: Type.ARRAY, items: { type: Type.STRING } } } }, evening: { type: Type.OBJECT, properties: { locations: { type: Type.ARRAY, items: { type: Type.STRING } }, tactics: { type: Type.ARRAY, items: { type: Type.STRING } }, rigs: { type: Type.ARRAY, items: { type: Type.STRING } }, baitingStrategy: { type: Type.ARRAY, items: { type: Type.STRING } } } } } } } },
                        tomorrow: { type: Type.OBJECT, properties: { temp: { type: Type.NUMBER }, condition: { type: Type.STRING }, icon: { type: Type.STRING }, windSpeed: { type: Type.NUMBER }, windDirection: { type: Type.STRING }, pressure: { type: Type.NUMBER } } }
                    }
                }
            }
        });
        if (response.text) {
            const data = JSON.parse(response.text);
            return [
                { ...data.yesterday, day: 'Yesterday' },
                { ...data.today, day: 'Today' },
                { ...data.tomorrow, day: 'Tomorrow' }
            ] as ForecastData[];
        }
        return null;
    } catch (error) {
        return null;
    }
};

export const getHotspotMap = async (lat: number, lon: number, catches: Catch[]) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const catchLocations = catches.map(c => c.location).join(', ');
        const prompt = `Based on these past successful catch locations: ${catchLocations}. Suggest 3 new hotspots nearby latitude ${lat}, longitude ${lon} using Google Maps grounding. Provide URLs.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{ googleMaps: {} }],
                toolConfig: {
                    retrievalConfig: {
                        latLng: { latitude: lat, longitude: lon }
                    }
                }
            }
        });

        return {
            text: response.text,
            links: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
        };
    } catch (error) {
        console.error("Maps grounding error:", error);
        return null;
    }
};
