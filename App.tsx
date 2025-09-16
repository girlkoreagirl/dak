import React, { useState } from 'react';
import ControlPanel from './components/ControlPanel';
import DisplayArea from './components/DisplayArea';
import { Settings } from './types';
import { initialSettings } from './constants';
import { generateProductPhoto } from './services/geminiService';

const AppHeader: React.FC = () => (
    <header className="p-4 border-b border-slate-700">
        <div className="flex items-center">
            <svg className="w-10 h-10 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm3 10h-2v4h-2v-4H9V9.999h2V6h2v3.999h2V12z"/>
            </svg>
            <div className="ml-4">
                <h1 className="text-gray-200 font-semibold text-sm leading-tight">중국사업 / 이우시장 동행조사 / 로켓그로스 / 로켓배송 / 스마트스토어</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <a href="https://open.kakao.com/o/gk5gtosf" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                        https://open.kakao.com/o/gk5gtosf
                    </a>
                    <a href="https://cafe.naver.com/kingshopping" target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                        https://cafe.naver.com/kingshopping
                    </a>
                </div>
            </div>
        </div>
    </header>
);

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [uploadedImage, setUploadedImage] = useState<{ base64: string; mimeType: string } | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (base64: string, mimeType: string) => {
    setUploadedImage({ base64, mimeType });
    setGeneratedImages([]);
    setError(null);
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError("Please upload an image first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateProductPhoto(uploadedImage.base64, uploadedImage.mimeType, settings);
      setGeneratedImages(images);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred during image generation.";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 text-white">
      <AppHeader />
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <ControlPanel 
          settings={settings}
          setSettings={setSettings}
          onImageUpload={handleImageUpload}
          onGenerate={handleGenerate}
          isLoading={isLoading}
          hasUploadedImage={!!uploadedImage}
        />
        <DisplayArea 
          generatedImages={generatedImages}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
};

export default App;