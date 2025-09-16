import { Settings } from './types';

export const PRODUCT_DIRECTIONS = [
  { label: '정면 (정면에서 촬영)', value: 'front-on' },
  { label: '탑 다운', value: 'top-down' },
  { label: '45도 각도', value: '45-degree angle' },
  { label: '측면', value: 'side profile' },
];

export const LIGHTING_DIRECTIONS = [
  { label: '왼쪽 위', value: 'top-left' },
  { label: '정면', value: 'front' },
  { label: '오른쪽 위', value: 'top-right' },
  { label: '부드러운 확산광', value: 'soft diffused' },
];

export const LIGHTING_BRIGHTNESS_OPTIONS = [
  { label: '밝은 스튜디오 조명', value: 'bright studio lighting' },
  { label: '자연스러운 햇빛', value: 'natural sunlight' },
  { label: '어둡고 극적인 조명', value: 'dark, dramatic lighting' },
];

export const QUANTITY_OPTIONS = [
  { label: '1개 (기본값)', value: 'a single item' },
  { label: '2개', value: 'two items' },
  { label: '3개', value: 'three items' },
];

export const PRODUCT_ARRANGEMENT_OPTIONS = [
  { id: '일렬', value: 'in a row', icon: 'ArrangementRow' },
  { id: '삼각형', value: 'in a triangle formation', icon: 'ArrangementTriangle' },
  { id: '사각형', value: 'in a square grid', icon: 'ArrangementSquare' },
  { id: '원형', value: 'in a circular pattern', icon: 'ArrangementCircle' },
] as const;


export const BACKGROUND_OPTIONS = [
    { label: '깨끗한 흰색', value: 'a clean, seamless white background' },
    { label: '부드러운 회색 그라데이션', value: 'a soft gray gradient background' },
    { label: '나무 질감 테이블', value: 'a rustic wood-textured table surface' },
    { label: '대리석 표면', value: 'a luxurious marble surface' },
    { label: '자연광 창가', value: 'a setting near a window with natural light' },
    { label: '야외 자연 풍경', value: 'an outdoor nature scene' },
];

export const initialSettings: Settings = {
  productDirection: PRODUCT_DIRECTIONS[0].label,
  lightingDirection: LIGHTING_DIRECTIONS[0].label,
  lightingBrightness: LIGHTING_BRIGHTNESS_OPTIONS[0].label,
  quantity: QUANTITY_OPTIONS[0].label,
  isCloseup: false,
  productArrangement: PRODUCT_ARRANGEMENT_OPTIONS[0].id,
  background: BACKGROUND_OPTIONS[0].label,
  productName: '',
};