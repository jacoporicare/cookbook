import { GlassView as ExpoGlassView } from 'expo-glass-effect';
import { Image as ExpoImage } from 'expo-image';
import { withUniwind } from 'uniwind';

// Use manual mapping to prevent withUniwind from mangling glassEffectStyle
// (auto mode treats any prop ending with "Style" as a style-array prop)
export const GlassView = withUniwind(ExpoGlassView, {
  style: { fromClassName: 'className' },
});
export const Image = withUniwind(ExpoImage);
