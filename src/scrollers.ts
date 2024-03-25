const setupScrolling = (event: Event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  const { target: targetId } = event.target.dataset;

  if (!targetId) return;

  const targetNode = document.querySelector<HTMLElement>(targetId);

  if (!targetNode) return;

  const pageHeaderBlockSize = document.querySelector('#page-header')?.getBoundingClientRect().height ?? 0;

  const scrollY = targetNode.offsetTop - pageHeaderBlockSize;

  window.scrollTo({
    top: scrollY,
    behavior: 'smooth',
  });
};

export const initScrollers = () => {
  const scrollers = Array.from(document.querySelectorAll('[data-interaction="scroll"]'));

  if (!scrollers.length) return;

  scrollers.forEach((element) => element.addEventListener('click', setupScrolling));
};
