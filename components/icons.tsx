import React from 'react';

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
  </svg>
);

export const StudioIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        <path d="M15.5 10.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" stroke="none" fill="currentColor" fillOpacity="0.1" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 21 12m-6-6-1.5-1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="m15 12-8.375 8.375M15 12l8.375 8.375M15 12V3m0 9h5.25M3 12h5.25" />
    </svg>
);

export const Spinner: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

export const ArrangementRowIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={className}>
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
    </div>
);
export const ArrangementTriangleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className="grid grid-cols-2 gap-1 w-6 h-6 items-center justify-items-center">
        <span className="col-span-2 w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
    </div>
);
export const ArrangementSquareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className="grid grid-cols-2 gap-1">
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
        <span className="w-2 h-2 bg-current rounded-full"></span>
    </div>
);
export const ArrangementCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className="relative w-6 h-6">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></span>
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-current rounded-full"></span>
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full"></span>
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-current rounded-full"></span>
    </div>
);

export const CameraIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
  </svg>
);

export const RetakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.664 0l3.181-3.183m-4.991-2.696a8.25 8.25 0 00-11.664 0l-3.181 3.183" />
  </svg>
);

export const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

export const IconMap = {
    ArrangementRow: ArrangementRowIcon,
    ArrangementTriangle: ArrangementTriangleIcon,
    ArrangementSquare: ArrangementSquareIcon,
    ArrangementCircle: ArrangementCircleIcon,
};