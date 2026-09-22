export function startLoop(canvasState, input) {
  function frame() {
    const { context, size } = canvasState;
    context.clearRect(0, 0, size.width, size.height);

    const centerX = size.width / 2;
    const centerY = size.height / 2;
    const headRadius = 34;
    const headCenterY = centerY - 150;
    const shoulderY = centerY - 100;
    const hipY = centerY + 70;
    const armEnd = input.pointer;

    context.strokeStyle = '#111111';
    context.fillStyle = '#ffffff';
    context.lineWidth = 8;
    context.lineCap = 'round';
    context.lineJoin = 'round';

    context.beginPath();
    context.moveTo(centerX, shoulderY);
    context.lineTo(centerX, hipY);
    context.moveTo(centerX, hipY);
    context.lineTo(centerX - 85, centerY + 220);
    context.moveTo(centerX, hipY);
    context.lineTo(centerX + 85, centerY + 220);
    context.moveTo(centerX, shoulderY);
    context.lineTo(centerX - 120, centerY - 20);
    context.moveTo(centerX, shoulderY);
    context.lineTo(armEnd.x, armEnd.y);
    context.stroke();

    context.beginPath();
    context.arc(centerX, headCenterY, headRadius, 0, Math.PI * 2);
    context.fill();
    context.stroke();

    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
}
