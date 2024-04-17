const setupAccordion = (accordionNode: Element) => {
  if (!accordionNode) return;

  const panels = Array.from(accordionNode.querySelectorAll('.accordion-panel'));

  const handleClick = ({ target }: Event) => {
    if (!(target instanceof HTMLButtonElement)) return;

    const triggerIndex = Number(target.id.split('accordion-trigger-').at(1));
    const isExpanded = target.ariaExpanded === 'true';

    target.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');

    if (isExpanded) {
      panels.at(triggerIndex)?.setAttribute('hidden', '');
    } else {
      panels.at(triggerIndex)?.removeAttribute('hidden');
    }
  };

  accordionNode.addEventListener('click', handleClick);
};

export const initAccordion = () => {
  const accordions = Array.from(document.querySelectorAll<Element>('[data-interactive="accordion"]'));

  accordions.forEach(setupAccordion);
};
