export function animate(duration: number, from: number, to: number, onProcess: Function) {
  const start = Date.now();
  const delta = to - from;

  function _run() {
    const elapsed = Date.now() - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = from + delta * progress;

    onProcess(current);

    if (progress < 1) {
      requestAnimationFrame(_run);
    }
  }

  _run();
}