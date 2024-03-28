const setupNav = (button: HTMLButtonElement, navList: HTMLUListElement) => {
  const handleButtonClick = () => {
    navList.classList.toggle('is-active');
    button.classList.toggle('is-active');
  };

  button.addEventListener('click', handleButtonClick);
};

export const initMenu = () => {
  const button = document.querySelector<HTMLButtonElement>('#buttons-trigger');
  const navList = document.querySelector<HTMLUListElement>('#header-nav-list');

  if (!button || !navList) return;

  setupNav(button, navList);
};
