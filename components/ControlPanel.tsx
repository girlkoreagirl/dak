import React from 'react';
import ImageUploader from './ImageUploader';
import { Settings } from '../types';
import { 
  PRODUCT_DIRECTIONS,
  LIGHTING_DIRECTIONS,
  LIGHTING_BRIGHTNESS_OPTIONS,
  QUANTITY_OPTIONS,
  PRODUCT_ARRANGEMENT_OPTIONS,
  BACKGROUND_OPTIONS
} from '../constants';
import { IconMap, Spinner } from './icons';

interface ControlPanelProps {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
  onImageUpload: (base64: string, mimeType: string) => void;
  onImageRemove: () => void;
  onGenerate: () => void;
  isLoading: boolean;
  hasUploadedImage: boolean;
}

// Reusable components defined within this file to keep file count low
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-gray-400 mb-2">{title}</label>
        {children}
    </div>
);

interface DropdownProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { label: string, value: string }[];
    name: keyof Settings;
}
const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, name }) => (
    <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
    >
        {options.map(opt => <option key={opt.label} value={opt.label}>{opt.label}</option>)}
    </select>
);

interface ToggleButtonProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
}
const ToggleButton: React.FC<ToggleButtonProps> = ({ label, checked, onChange }) => (
    <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm font-medium text-gray-400">{label}</span>
        <div className="relative">
            <input type="checkbox" className="sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
            <div className={`block w-12 h-6 rounded-full transition ${checked ? 'bg-blue-600' : 'bg-slate-700'}`}></div>
            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform ${checked ? 'translate-x-6' : ''}`}></div>
        </div>
    </label>
);

const ControlPanel: React.FC<ControlPanelProps> = ({ settings, setSettings, onImageUpload, onImageRemove, onGenerate, isLoading, hasUploadedImage }) => {
    
    const handleSettingChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleArrangementClick = (id: string) => {
        setSettings(prev => ({ ...prev, productArrangement: id }));
    };

    const handleBackgroundClick = (label: string) => {
        setSettings(prev => ({ ...prev, background: label }));
    };

    return (
        <div className="w-full lg:w-96 bg-slate-800 p-6 shadow-lg h-full overflow-y-auto">
            <ImageUploader onImageUpload={onImageUpload} onImageRemove={onImageRemove} />

            <h2 className="text-sm font-semibold text-gray-300 mb-3">이미지 맞춤 설정</h2>

            <Section title="제품 방향">
                <Dropdown name="productDirection" value={settings.productDirection} onChange={handleSettingChange} options={PRODUCT_DIRECTIONS} />
            </Section>

            <Section title="조명 방향">
                <Dropdown name="lightingDirection" value={settings.lightingDirection} onChange={handleSettingChange} options={LIGHTING_DIRECTIONS} />
            </Section>
            
            <Section title="조명 밝기">
                <Dropdown name="lightingBrightness" value={settings.lightingBrightness} onChange={handleSettingChange} options={LIGHTING_BRIGHTNESS_OPTIONS} />
            </Section>

            <Section title="수량">
                <Dropdown name="quantity" value={settings.quantity} onChange={handleSettingChange} options={QUANTITY_OPTIONS} />
            </Section>

            <Section title="확대 화면 (클로즈업)">
                <ToggleButton label="" checked={settings.isCloseup} onChange={(checked) => setSettings(p => ({ ...p, isCloseup: checked }))} />
            </Section>

            <Section title="제품 배열">
                <div className="grid grid-cols-4 gap-2">
                    {PRODUCT_ARRANGEMENT_OPTIONS.map(({ id, icon }) => {
                        const IconComponent = IconMap[icon];
                        return (
                            <button
                                key={id}
                                onClick={() => handleArrangementClick(id)}
                                className={`flex flex-col items-center justify-center p-2 rounded-md transition border-2 ${settings.productArrangement === id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 border-slate-600 text-gray-400 hover:bg-slate-600'}`}
                            >
                                <IconComponent className="flex items-center justify-center gap-1 w-6 h-6 mb-1" />
                                <span className="text-xs">{id}</span>
                            </button>
                        );
                    })}
                </div>
            </Section>

            <Section title="배경">
                <div className="grid grid-cols-3 gap-2">
                    {BACKGROUND_OPTIONS.map(({ label }) => (
                        <button
                            key={label}
                            onClick={() => handleBackgroundClick(label)}
                            className={`px-2 py-4 text-xs rounded-md transition border ${settings.background === label ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-700 border-slate-600 text-gray-300 hover:bg-slate-600'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </Section>

            <Section title="제품명 (선택 사항)">
                <input
                    type="text"
                    name="productName"
                    value={settings.productName}
                    onChange={handleSettingChange}
                    placeholder="AI가 참고할 제품/브랜드 이름"
                    className="w-full bg-slate-700 border border-slate-600 text-white text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                />
            </Section>

            <button
                onClick={onGenerate}
                disabled={isLoading || !hasUploadedImage}
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition"
            >
                {isLoading ? (
                    <>
                        <Spinner className="w-5 h-5 mr-3" />
                        생성 중...
                    </>
                ) : '생성'}
            </button>
        </div>
    );
};

export default ControlPanel;