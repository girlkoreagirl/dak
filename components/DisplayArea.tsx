import React from 'react';
import { StudioIcon, Spinner } from './icons';

interface DisplayAreaProps {
  generatedImages: string[];
  isLoading: boolean;
  error: string | null;
}

const DisplayArea: React.FC<DisplayAreaProps> = ({ generatedImages, isLoading, error }) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-400">
          <Spinner className="w-12 h-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold text-white mb-2">AI가 이미지를 생성하고 있습니다...</h2>
          <p>잠시만 기다려 주세요. 멋진 결과물을 만들고 있어요.</p>
        </div>
      );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center text-center text-red-400">
                <StudioIcon className="w-16 h-16 mb-4" />
                <h2 className="text-xl font-semibold text-red-300 mb-2">오류 발생</h2>
                <p className="max-w-md">{error}</p>
            </div>
        );
    }
    
    if (generatedImages.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full h-full p-4">
            {generatedImages.map((src, index) => (
                <div key={index} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg">
                    <img src={src} alt={`Generated product shot ${index + 1}`} className="w-full h-full object-contain"/>
                </div>
            ))}
        </div>
      );
    }

    return (
        <div className="flex flex-col items-center justify-center text-center text-gray-500">
            <StudioIcon className="w-16 h-16 mb-4"/>
            <h2 className="text-2xl font-bold text-white mb-2">AI 제품 사진 스튜디오</h2>
            <p className="max-w-sm">
                먼저 제품 사진을 업로드하여 시작하세요. AI가 사진을 전문가 수준으로 변환해 드립니다.
            </p>
        </div>
    );
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4 lg:p-8">
      {renderContent()}
    </div>
  );
};

export default DisplayArea;