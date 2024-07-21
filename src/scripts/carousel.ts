const INTERVAL = 5000;

const setupCarousel = (carousel: Element) => {
  const items = carousel.querySelectorAll('.item');
  const buttons = carousel.querySelectorAll('carousel-button');

  const initTimeout = () => setInterval(() => {
    const currentActive = Array.from(items).find((item) => item.hasAttribute('data-active'));

    if (!currentActive) return;
    const nextActive = currentActive.nextElementSibling;

    const isLast = currentActive === [...items].at(-1);

    currentActive?.setAttribute('data-inactive', '');

    items.forEach((item) => item.removeAttribute('data-active'));
    items.forEach((item) => item.setAttribute('data-inactive', ''));

    if (isLast) {
      [...items].at(0)?.setAttribute('data-active', '');
      [...items].at(0)?.removeAttribute('data-inactive');
    } else {
      nextActive?.removeAttribute('data-inactive');
      nextActive?.setAttribute('data-active', '');
    }
  }, INTERVAL);

  let timeoutId = initTimeout();

  const handleSteps = (event: Event | KeyboardEvent) => {
    const { currentTarget } = event;
    if (!currentTarget || !(currentTarget instanceof Element)) return;
    if (event instanceof KeyboardEvent && event.key !== 'Enter') return;

    const direction = currentTarget?.getAttribute('direction');

    const currentActive = Array.from(items).find((item) => item.hasAttribute('data-active'));

    if (!currentActive) return;

    const isFirst = currentActive === [...items].at(0);
    const isLast = currentActive === [...items].at(-1);

    items.forEach((item) => item.removeAttribute('data-active'));
    items.forEach((item) => item.setAttribute('data-inactive', ''));

    const nextActive = currentActive.nextElementSibling;
    const previousActive = currentActive.previousElementSibling;

    clearInterval(timeoutId);
    timeoutId = initTimeout();

    if (direction === 'previous' && isFirst) {
      [...items].at(-1)?.setAttribute('data-active', '');
      [...items].at(-1)?.removeAttribute('data-inactive');
      return;
    }

    if (direction === 'next' && isLast) {
      [...items].at(0)?.setAttribute('data-active', '');
      [...items].at(0)?.removeAttribute('data-inactive');
      return;
    }

    if (direction === 'previous') {
      previousActive?.setAttribute('data-active', '');
      previousActive?.removeAttribute('data-inactive');
    } else {
      nextActive?.setAttribute('data-active', '');
      nextActive?.removeAttribute('data-inactive');
    }
  };

  buttons.forEach((button) => button.addEventListener('click', handleSteps));
  buttons.forEach((button) => button.addEventListener('keydown', handleSteps));
};

export const initCarousels = () => {
  const carousels = document.querySelectorAll('[data-interaction="carousel"]');
  if (!carousels) return;

  carousels.forEach((carousel) => setupCarousel(carousel));
};
