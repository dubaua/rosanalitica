// планирует выполнение функции
// в начале следующего такта эвент лупа
export function nextTick(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}