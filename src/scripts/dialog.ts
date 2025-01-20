const setupDialog = (dialog: HTMLDialogElement) => {
  document.documentElement.style.overflow = 'clip';
  dialog.showModal();

  document.body.addEventListener('keydown', (event) => {
    if (dialog.open && event.key === 'Escape') {
      event.preventDefault();
    }
  });

  dialog.addEventListener('close', () => {
    document.documentElement.removeAttribute('style');
  });
};

export const initDialog = () => {
  const dialog = document.querySelector<HTMLDialogElement>('dialog.entry-dialog');
  const isDev = import.meta.env.DEV;

  if (!dialog || isDev) return;

  setupDialog(dialog);
};
