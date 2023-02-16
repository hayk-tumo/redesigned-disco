/**
 * Lightens or darkens the colour.
 *
 * Examples:
 * shade('#ffffff', -20); // darken by 20
 */
const shade = (colour, amount) => {
  // The channel value must be in range of 0..255
  const normalise = (value) => {
    if (value > 255) {
      return 255;
    }

    if (value < 0) {
      return 0;
    }

    return value;
  };

  // Remove the # from the beginning of the colour code
  const hex = colour[0] === '#' ? colour.substring(1) : colour;

  // Get the red, green, blue numeric values
  const decimalColour = parseInt(hex, 16);
  const red = decimalColour >> 16;
  const green = decimalColour >> 8 & 0x00ff;
  const blue = decimalColour & 0x00ff;

  // Add the shade
  const shadedRed = normalise(red + amount);
  const shadedGreen = normalise(green + amount);
  const shadedBlue = normalise(blue + amount);

  // Get the final colour hex
  const shadedColour = (shadedRed << 16 | shadedGreen << 8 | shadedBlue).toString(16);

  // Add padding
  const result = shadedColour.padStart(6, shadedColour);

  return `#${result}`;
};
