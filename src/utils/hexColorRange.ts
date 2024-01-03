export default function hexColorRange(percentage: number) {
  // Ensure the percentage is between 0 and 100
  percentage = Math.min(100, Math.max(0, percentage));

  // Convert percentage to a value between 0 and 1
  var value = percentage / 100;

  // Calculate the RGB values based on the percentage
  var red = Math.round((1 - value) * 255);
  var green = Math.round(value * 255);
  var blue = 0;

  // Convert RGB to hex
  var hex = rgbToHex(red, green, blue);

  return hex;
}

function rgbToHex(red, green, blue) {
  var componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  return (
    "#" + componentToHex(red) + componentToHex(green) + componentToHex(blue)
  );
}
