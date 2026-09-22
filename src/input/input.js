export function createInput(canvas) {
  const bounds = canvas.getBoundingClientRect();
  const pointer = { x: 0, y: 0 };

  pointer.x = bounds.width / 2;
  pointer.y = bounds.height / 2;

  function updatePointer(event) {
    const canvasBounds = canvas.getBoundingClientRect();
    pointer.x = event.clientX - canvasBounds.left;
    pointer.y = event.clientY - canvasBounds.top;
  }

  canvas.addEventListener('pointermove', updatePointer);

  return { pointer };
}
