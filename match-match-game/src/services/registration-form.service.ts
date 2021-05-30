import { Render } from '../components/Render';
import { addUserInDb } from '../DB/db';
import { changeDisplay, hideModal } from './modal.service';

export function fieldValidation(str: string, fieldName: string): string[] {
  const errors: string[] = [];
  // eslint-disable-next-line max-len
  const emailValidation = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!str) {
    errors.push(`${fieldName} is empty`);
  }
  if (fieldName === 'Name' || fieldName === 'Lastname') {
    if (str.match(/[~ ! @ # $ % * () _ — + = | : ; " ' ` < > , . ? / ^]/g)) {
      errors.push(`${fieldName} can't contains the following characters 
                                ~ ! @ # $ % * () _ — + = | : ; " ' \` < > , . ? / ^`);
    }
    if (str.split('').every((el) => el.match(/\d/g)) && str) {
      errors.push(`${fieldName} must contain letters`);
    }
    if (str.length > 30) {
      errors.push(`${fieldName} cannot exceed 30 characters`);
    }
  }
  if (fieldName === 'Email') {
    if (!str.match(emailValidation) && str) {
      errors.push(`${fieldName} incorrect`);
    }
  }
  return errors;
}

function removeErrors(errors: HTMLElement | null): void {
  while (errors?.hasChildNodes()) {
    errors?.childNodes.forEach((error) => {
      error.remove();
    });
  }
}

export function resetForm(formClassName: string): void {
  const form: HTMLFormElement | null = document.querySelector(formClassName);
  const inputs: NodeListOf<HTMLInputElement> | undefined = form?.querySelectorAll('input');
  const errorsContainer: NodeListOf<HTMLElement> | undefined = form?.querySelectorAll('.errors');
  const submitBtn: HTMLElement | undefined | null = form?.querySelector('.submit-btn');

  submitBtn?.classList.add('disabled');

  errorsContainer?.forEach((error) => {
    removeErrors(error);
    error.classList.add('hidden');
  });
  inputs?.forEach((input) => input.classList.add('incorrect'));
  form?.reset();
}

export function closeForm(btn: HTMLElement | null, formContainerClassName: string): void {
  const form: HTMLElement | null = document.querySelector(formContainerClassName);
  const fields = form?.querySelectorAll('input') as NodeListOf<HTMLInputElement>;
  const arr: string[] = [];
  btn?.addEventListener('click', () => {
    if (form && !btn.classList.contains('disabled')) {
      if (btn.classList.contains('submit-btn')) {
        fields.forEach((field) => {
          arr.push(field.value);
        });
        addUserInDb(arr[0], arr[1], arr[2]);
        changeDisplay('.start-btn', '.registration-btn');
      }
      resetForm('.registration');
      hideModal(form);
    }
  });
}

function checkFieldCorrect(inputs: NodeListOf<HTMLInputElement>, submitBtn: HTMLElement | null): void {
  const arr: boolean[] = [];
  if (submitBtn) {
    inputs.forEach((input) => {
      if (input.classList.contains('incorrect')) {
        arr.push(false);
      } else {
        arr.push(true);
      }
    });
    if (arr.indexOf(false) === -1) {
      submitBtn.classList.remove('disabled');
    } else {
      submitBtn.classList.add('disabled');
    }
  }
}

export function showErrors(registrationInput: HTMLElement | null, fieldName: string): void {
  if (registrationInput) {
    const inputField: HTMLInputElement | null = registrationInput.querySelector('input');

    inputField?.addEventListener('input', () => {
      const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('input');
      const submitBtn: HTMLElement | null = document.querySelector('.submit-btn');
      const errorsContainer: HTMLElement | null = registrationInput.querySelector('.errors');
      const errors = fieldValidation(inputField.value, fieldName);

      removeErrors(errorsContainer);

      if (errors.length !== 0) {
        errors.forEach((error) => {
          errorsContainer?.classList.remove('hidden');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const errorContainer = new Render(errorsContainer, 'span', ['error'], error);
          inputField.classList.add('incorrect');
          inputField.classList.remove('correct');
        });
      } else {
        errorsContainer?.classList.add('hidden');
        inputField.classList.add('correct');
        inputField.classList.remove('incorrect');
      }
      checkFieldCorrect(inputs, submitBtn);
    });
  }
}
