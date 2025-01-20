const setupFocus = (event: MouseEvent) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  const { dataset } = event.target;

  const { target } = dataset;

  if (!target) return;

  const targetNode = document.querySelector<HTMLElement>(target);

  if (!targetNode) return;

  const targetAccordion = targetNode.closest('.accordion-item');

  const targetPanel = targetNode.closest<HTMLButtonElement>('.tab-panel');

  if (targetPanel) {
    const tabTrigger = targetPanel.closest<HTMLElement>('.tabs')?.querySelector<HTMLButtonElement>(`[aria-controls="${targetPanel.id}"]`);

    if (!tabTrigger) return;

    tabTrigger.click();
  }

  if (targetAccordion) {
    const accordionTrigger = targetAccordion.closest<HTMLElement>('.accordion-item')?.querySelector<HTMLButtonElement>('.accordion-trigger');

    if (!accordionTrigger) return;

    accordionTrigger.click();

    accordionTrigger.focus();
  }

  targetNode.scrollIntoView();
};

export const initFocus = () => {
  const focusTriggers = document.querySelectorAll<HTMLButtonElement>('[data-interaction="focus"]');

  focusTriggers.forEach((trigger) => trigger.addEventListener('click', setupFocus));
};
