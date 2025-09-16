import { GoogleGenAI, Modality } from "@google/genai";
import { Settings } from "../types";
import { 
  PRODUCT_DIRECTIONS,
  LIGHTING_DIRECTIONS,
  LIGHTING_BRIGHTNESS_OPTIONS,
  QUANTITY_OPTIONS,
  PRODUCT_ARRANGEMENT_OPTIONS,
  BACKGROUND_OPTIONS
} from '../constants';

const buildPrompt = (settings: Settings): string => {
  const {
    productDirection,
    lightingDirection,
    lightingBrightness,
    quantity,
    isCloseup,
    productArrangement,
    background,
    productName,
  } = settings;

  const getMappedValue = (options: {label: string, value: string}[], label: string) => 
    options.find(opt => opt.label === label)?.value || label;

  const getArrangementValue = (id: string) => 
    PRODUCT_ARRANGEMENT_OPTIONS.find(opt => opt.id === id)?.value || 'as a single item';

  let prompt = `Generate a professional, high-resolution e-commerce product photograph of the product in the provided image. Isolate the product from its original background and place it into a new scene based on the following requirements:

- **Background:** Place the product on ${getMappedValue(BACKGROUND_OPTIONS, background)}.
- **Arrangement:** The scene should feature ${getMappedValue(QUANTITY_OPTIONS, quantity)}, arranged ${getArrangementValue(productArrangement)}.
- **Lighting:** The scene should have ${getMappedValue(LIGHTING_BRIGHTNESS_OPTIONS, lightingBrightness)}, with the main light source positioned at the ${getMappedValue(LIGHTING_DIRECTIONS, lightingDirection)}.
- **Camera Angle:** Use a ${getMappedValue(PRODUCT_DIRECTIONS, productDirection)} shot.
- **Zoom:** This should be a ${isCloseup ? 'close-up shot focusing on product details' : 'standard shot showing the full product'}.
`;

  if (productName) {
    prompt += `- **Product Context:** The product is a "${productName}". Use this for contextual accuracy.\n`;
  }
  
  prompt += `\nThe final image must be photorealistic, clean, and visually appealing, suitable for a premium online store. Do not add any text, logos, or watermarks. Focus on creating a believable and high-quality composition.`;

  return prompt;
};

export const generateProductPhoto = async (
  base64Image: string,
  mimeType: string,
  settings: Settings
): Promise<string[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = buildPrompt(settings);

  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: mimeType,
    },
  };

  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  const generatedImages: string[] = [];
  let fallbackText = "Image generation failed. No specific reason provided by the model.";
  
  if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
              generatedImages.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          } else if (part.text) {
              fallbackText = `Image generation failed: ${part.text}`;
          }
      }
  }

  if (generatedImages.length === 0) {
      throw new Error(fallbackText);
  }

  return generatedImages;
};