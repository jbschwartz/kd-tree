// Golden ratio conjugate
const SPACING = 0.618033988749895;

// Number of bits per color component
const BITS = 8;

const HEXADECIMAL = 16;

// Expects rgb = {r: [0..255], g: [0..255], b: [0..255]}
function rgbToHex(rgb) {
  var binary = rgb.r << 2 * BITS | rgb.g << BITS | rgb.b;
  var hexString = binary.toString(HEXADECIMAL).toUpperCase();
  // Zero pad the beginning of the string
  return '#' + '0'.repeat(6 - hexString.length) + hexString;
}

export default function getRandomColor() {
    const h = (Math.random() + SPACING) % 1;
    return rgbToHex(hsvToRGB(h, 0.3, 0.95));
}

// Code courtesy of Martin Ankerl under the Creative Commons Attribution 3.0 Unported License:
// http://martin.ankerl.com/2009/12/09/how-to-create-random-colors-programmatically/
function hsvToRGB(h, s, v) {
  let h_i = Math.floor(h*6)

  let f = h*6 - h_i
  let p = v * (1 - s)
  let q = v * (1 - f*s)
  let t = v * (1 - (1 - f) * s)
  let rgb = {};
  switch(h_i) {
    case 0:
      rgb = {r: v, g: t, b: p}
      break;
    case 1:
      rgb = {r: q, g: v, b: p}
      break;
    case 2:
      rgb = {r: p, g: v, b: t}
      break;
    case 3:
      rgb = {r: p, g: q, b: v}
      break;
    case 4:
      rgb = {r: t, g: p, b: v}
      break;
    case 5:
      rgb = {r: v, g: p, b: q}
      break;
  }

  for(const component in rgb) {
    if(rgb.hasOwnProperty(component)) {
      rgb[component] = Math.floor(rgb[component] * 256);
    }
  }

  return rgb;
}
