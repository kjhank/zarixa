const ALWAYS_VALID_LICENSE = 'PTA-230713';

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
  formNode.addEventListener('submit', (event) => {
    event.preventDefault();
    // validateForm();

    const { elements } = formNode;

    const isLicenseValid = validateLicense(elements['practice-license'].value);

    if (isLicenseValid) {
      const dialog = document.querySelector<HTMLDialogElement>('dialog.entry-dialog');

      if (!dialog) return;

      dialog.close();
      document.body.style.overflow = 'clip';
    }
  });
};

export const initForm = () => {
  const formNode = document.querySelector<FormElement>('#entry-form');

  if (!formNode) return;

  setupForm(formNode);
};
