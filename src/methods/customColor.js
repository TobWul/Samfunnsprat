import ColorThief from 'colorthief';
import chroma from 'chroma-js';

const generateScale = scaleSourceHex => {
  // Settings.
  const useBezierInterpolation = true;
  const useLightnessCorrection = true;
  // Prepare color scale.
  let colors = ['#fff', scaleSourceHex, '#000'];

  // if (useBezierInterpolation) {
  //   colors = chroma.interpolate.bezier(colors);
  // }

  const scale = chroma
    .scale(colors)
    .mode('lab')
    .correctLightness(useLightnessCorrection);
  // Output source color.

  return scale;
};

const rgbToHex = color =>
  '#' +
  color
    .map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    })
    .join('');

const getEmblemColors = img => {
  const colorThief = new ColorThief(); // Instantiate Color Thief
  let palette = colorThief.getPalette(img, 2); // Get the two first colors from the emblem
  palette = palette.map(color => rgbToHex(color)); // Change values to hex
  // If secondary color is more saturated, switch to primary
  if (
    chroma(palette[0]).get('hsl.s') < 0.2 &&
    chroma(palette[1]).get('hsl.s') > 0.2
  ) {
    palette = [palette[1], palette[0]];
  }
  return palette; // Returns an array with two hex colors;
};

const setCSSvariable = (varName, hex) => {
  document.documentElement.style.setProperty(varName, hex);
};

const createColorPalettes = palette => {
  const scaleVarNameDelimiter = '--';
  palette.forEach((hex, index) => {
    const scaleVarName = index === 0 ? 'primary' : 'secondary';
    setCSSvariable('--' + scaleVarName, hex); // TODO Only for debugging purposes
    const scale = generateScale(hex);
    // Interpolate colors, skipping the generation of white and black.
    for (let i = 1, steps = 10; i < steps; i++) {
      const point = i / steps;
      // Convert point to numbering system value: 100-900.
      const name = Math.round(point * 1000);
      // Generate HEX color from luminance location along scale.
      const hex = scale(point).hex();
      // Output.
      const varName = scaleVarNameDelimiter + scaleVarName + '-' + name; // Output: --primary-100
      setCSSvariable(varName, hex);
    }
    // Create background color
    const backgroundHex = scale(0.05).hex();
    setCSSvariable('--' + scaleVarName + '-50', backgroundHex);
  });
};

const setCustomColor = img => {
  let palette;
  if (img.complete) {
    palette = getEmblemColors(img);
    createColorPalettes(palette);
  } else {
    img.addEventListener('load', () => {
      palette = getEmblemColors(img);
      createColorPalettes(palette);
    });
  }
};

export default setCustomColor;
