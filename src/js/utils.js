// планирует выполнение функции
// в начале следующего такта эвент лупа
export function nextTick(callback) {
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(callback);
  });
}

export function toggleClassname(node, className) {
  const hadClassName = node.classList.contains(className);
  if (hadClassName) {
    node.classList.remove(className);
  } else {
    node.classList.add(className);
  }
  return hadClassName;
}
