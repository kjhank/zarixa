const setupTrigger = (event: Event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  const { target: targetId } = event.target.dataset;

  if (!targetId) return;

  const targetNode = document.querySelector<HTMLElement>(targetId);

  if (!targetNode) return;

  targetNode.click();
};

export const initTriggers = () => {
  const triggers = Array.from(document.querySelectorAll('[data-interaction="trigger"]'));

  triggers.forEach((element) => element.addEventListener('click', setupTrigger));
};
