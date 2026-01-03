export const isInteractiveElement = (element: HTMLElement | null): boolean => {
  if (!element) return false;

  return Boolean(
    element.closest(
      'button, a, input, textarea, select, [contenteditable="true"],.editable-text-el'
    )
  );
};
