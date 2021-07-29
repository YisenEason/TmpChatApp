import { Dimensions } from "react-native";

const window = Dimensions.get('window');
export const ScreenH = window.height;
export const ScreenW = window.width;

export interface Frame {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
} 