const setupDialog = (dialog: HTMLDialogElement) => {
  document.body.style.overflow = 'clip';
  dialog.showModal();

  dialog.addEventListener('close', () => {
    document.body.removeAttribute('style');
  });
};

export const initDialog = () => {
  const dialog = document.querySelector<HTMLDialogElement>('dialog.entry-dialog');

  if (!dialog) return;

  setupDialog(dialog);
};
