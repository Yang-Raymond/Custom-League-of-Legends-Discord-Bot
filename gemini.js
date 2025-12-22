import { GoogleGenAI } from "@google/genai";
import * as fs from "node:fs";

const ai = new GoogleGenAI({});

export async function LeagueScoreboardAnalyzer(imagePath) {
    const base64ImageFile = fs.readFileSync(imagePath, {
        encoding: "base64",
    });

    const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        {
            text: `I will give you an image of a League of Legends scoreboard. Analyze the image and respond in the following format:
[{
    "username": string,
    "kills": number,
    "deaths": number,
    "assists": number,
    "win": boolean
}]

If you do not have enough information or if the image doesn't look like a League of Legends scoreboard respond with "Not enough information"` },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
    });

    return response;
}

