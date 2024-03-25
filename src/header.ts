export const initHeaderScrolling = () => {
  const hero = document.querySelector<HTMLElement>('.hero');
  const pageHeader = document.querySelector('#page-header');

  if (!hero || !pageHeader) return;

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.intersectionRatio < 0.9) {
      pageHeader.classList.add('scrolled');
      return;
    }

    pageHeader.classList.remove('scrolled');
  }, { threshold: [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9] });

  observer.observe(hero);
};
