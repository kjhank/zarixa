const INTERVAL = 5000;

const setupCarousel = (carousel: Element) => {
  const items = carousel.querySelectorAll('.item');
  const buttons = carousel.querySelectorAll('carousel-button');

  // const handleClick = ({ target }: Event) => {

  // };

  // console.log(items, buttons);

  setInterval(() => {
    // items.forEach((item) => item.setAttribute('data-inactive', ''));
    // items[0].removeAttribute('data-inactive');
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

    console.log('ping');
  }, INTERVAL);
};

export const initCarousels = () => {
  const carousels = document.querySelectorAll('[data-interaction="carousel"]');
  if (!carousels) return;

  carousels.forEach((carousel) => setupCarousel(carousel));
};
