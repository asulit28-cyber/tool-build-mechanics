export function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function lerp(start, end, amount) {
  return start + (end - start) * amount;
}
