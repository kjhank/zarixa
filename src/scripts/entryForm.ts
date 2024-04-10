const ALWAYS_VALID_LICENSE = 'PTA-230713';
const TRANSITION_TIMEOUT_MS = 2000;

type FormElements = Readonly<{
  confirmation: HTMLInputElement;
  'practice-license': HTMLInputElement;
} & HTMLFormControlsCollection>;

type FormElement = Readonly<{
  elements: FormElements
} & HTMLFormElement>;

const validateLicense = (license: string): boolean => {
  if (license === ALWAYS_VALID_LICENSE) return true;

  const [control, ...numbers] = license;

  // eslint-disable-next-line max-len
  const result: number = numbers.reduce((previous, current, index) => Number(previous) + Number(current) * (index + 1), 0);

  return Number(control) > 0 && result % 11 === Number(control);
};

const setupForm = (formNode: FormElement) => {
  const assWrapper = document.querySelector('.ass-widget-wrapper');
  formNode.addEventListener('submit', (event) => {
    event.preventDefault();

    const { elements } = formNode;

    const isLicenseValid = validateLicense(elements['practice-license'].value);

    if (isLicenseValid) {
      const dialog = document.querySelector<HTMLDialogElement>('dialog.entry-dialog');

      if (!dialog) return;

      dialog.close();
      document.documentElement.style.overflow = 'clip';

      const timeoutId = setTimeout(() => {
        assWrapper?.removeAttribute('data-state');

        clearTimeout(timeoutId);
      }, TRANSITION_TIMEOUT_MS);
    } else {
      const errorNode = document.querySelector<HTMLElement>('.error-pattern');

      if (!errorNode) return;
      errorNode.style.display = 'inline-block';
    }
  });
};

export const initForm = () => {
  const formNode = document.querySelector<FormElement>('#entry-form');

  if (!formNode) return;

  setupForm(formNode);
};
