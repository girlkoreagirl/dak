import React, { useState, useCallback, useRef, useEffect } from 'react';
import { UploadIcon, CameraIcon, RetakeIcon, CheckIcon, CloseIcon } from './icons';

interface ImageUploaderProps {
  onImageUpload: (base64: string, mimeType: string) => void;
  onImageRemove: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, onImageRemove }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraMode, setCameraMode] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopCameraStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, []);

  useEffect(() => {
    const startUserMedia = async () => {
      if (cameraMode) {
        try {
          setCameraError(null);
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          setCameraError("카메라에 액세스할 수 없습니다. 브라우저 설정을 확인해주세요.");
          setCameraMode(false);
        }
      } else {
        stopCameraStream();
      }
    };
    startUserMedia();

    return () => {
      stopCameraStream();
    };
  }, [cameraMode, stopCameraStream]);


  const handleFile = useCallback((file: File) => {
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setPreview(reader.result as string);
        onImageUpload(base64String, file.type);
      };
      reader.readAsDataURL(file);
    } else {
      console.error("Invalid file type. Please upload PNG, JPG, or WEBP.");
    }
  }, [onImageUpload]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFile(event.target.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFile(event.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPreview(null);
    const fileInput = document.querySelector('input[name="file_upload"]') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = "";
    }
    onImageRemove();
  };

  const startCamera = () => {
    setCameraMode(true);
    setPreview(null);
    setCapturedImage(null);
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(dataUrl);
      }
    }
  };

  const handleRetake = () => setCapturedImage(null);
  
  const handleUsePhoto = () => {
    if (capturedImage) {
      const base64String = capturedImage.split(',')[1];
      setPreview(capturedImage);
      onImageUpload(base64String, 'image/jpeg');
      setCameraMode(false);
      setCapturedImage(null);
    }
  };

  const renderFileUpload = () => (
     <label
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative flex justify-center items-center w-full h-48 px-4 transition bg-slate-800 border-2 border-dashed rounded-md appearance-none hover:border-blue-400 focus:outline-none ${isDragging ? 'border-blue-400' : 'border-slate-600'} ${preview ? 'cursor-default' : 'cursor-pointer'}`}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="h-full w-full object-contain" />
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-60 rounded-full text-white hover:bg-opacity-80 transition-opacity z-10"
              aria-label="Remove image"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center space-y-2 text-center">
            <UploadIcon className="w-10 h-10 text-gray-500" />
            <span className="font-medium text-gray-400">
              여기를 클릭하거나 파일을 드래그하세요
            </span>
            <span className="text-xs text-gray-500">PNG, JPG, WEBP</span>
            <div className="flex items-center w-full pt-2">
                <div className="flex-grow border-t border-slate-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-xs">또는</span>
                <div className="flex-grow border-t border-slate-700"></div>
            </div>
            <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); startCamera(); }}
                className="inline-flex items-center px-3 py-1.5 border border-slate-600 text-xs font-medium rounded-md text-gray-300 bg-slate-700 hover:bg-slate-600"
            >
                <CameraIcon className="-ml-1 mr-2 h-4 w-4" />
                카메라로 촬영
            </button>
          </div>
        )}
        <input type="file" name="file_upload" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
  );

  const renderCameraView = () => (
     <div className="w-full h-48 bg-black rounded-md flex flex-col justify-center items-center relative text-white overflow-hidden">
        {capturedImage ? (
            <>
                <img src={capturedImage} alt="Captured" className="h-full w-full object-contain" />
                <div className="absolute bottom-3 flex space-x-4">
                    <button onClick={handleRetake} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700">
                        <RetakeIcon className="w-5 h-5 mr-2" /> 다시 촬영
                    </button>
                    <button onClick={handleUsePhoto} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                        <CheckIcon className="w-5 h-5 mr-2" /> 이 사진 사용
                    </button>
                </div>
            </>
        ) : (
            <>
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover"></video>
                <div className="absolute bottom-0 inset-x-0 bg-black bg-opacity-30 flex justify-center p-2">
                    <button onClick={handleCapture} className="p-3 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white">
                        <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white"></div>
                    </button>
                </div>
                <button onClick={() => setCameraMode(false)} className="absolute top-2 right-2 p-1.5 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-75">
                  <CloseIcon className="w-5 h-5" />
                </button>
            </>
        )}
        <canvas ref={canvasRef} className="hidden"></canvas>
    </div>
  );


  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold text-gray-300 mb-3">사진 업로드</h2>
      {cameraError && <div className="text-red-400 text-xs mb-2">{cameraError}</div>}
      {cameraMode ? renderCameraView() : renderFileUpload()}
    </div>
  );
};

export default ImageUploader;