const MAX_COMPOSE_URL_LENGTH = 1800;

function getFieldError(field) {
    if (field.validity.valueMissing) return 'Please complete this field.';
    if (field.validity.typeMismatch) return 'Enter a valid email address.';
    if (field.validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
    if (field.validity.tooLong) return `Please keep this to ${field.maxLength} characters or fewer.`;
    return '';
}

function setFieldError(field, message) {
    const error = document.getElementById(`${field.id}-error`);
    if (!error) return;

    error.textContent = message;
    error.hidden = !message;
    if (message) field.setAttribute('aria-invalid', 'true');
    else field.removeAttribute('aria-invalid');
}

export function initContact() {
    const form = document.querySelector('[data-contact-form]');
    if (!form || form.dataset.initialized === 'true') return;

    const directEmail = document.querySelector('.contact-email-link')?.getAttribute('href') ?? '';
    const recipient = directEmail.toLowerCase().startsWith('mailto:') ? directEmail.slice(7).split('?')[0] : '';
    if (!recipient) return;

    const nameField = form.elements.namedItem('name');
    const emailField = form.elements.namedItem('email');
    const messageField = form.elements.namedItem('message');
    const fields = [nameField, emailField, messageField];
    const status = form.querySelector('[data-contact-status]');

    fields.forEach((field) => {
        field.addEventListener('input', () => {
            field.setCustomValidity('');
            if (field.getAttribute('aria-invalid') === 'true') setFieldError(field, '');
            status.textContent = '';
        });
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        status.textContent = '';

        nameField.value = nameField.value.trim();
        emailField.value = emailField.value.trim();
        messageField.value = messageField.value.trim();

        const customErrors = new Map([
            [nameField, nameField.value.length > 0 && nameField.value.length < 2 ? 'Please enter at least 2 characters.' : ''],
            [emailField, ''],
            [messageField, messageField.value.length > 0 && messageField.value.length < 20 ? 'Please enter at least 20 characters.' : ''],
        ]);

        fields.forEach((field) => {
            const error = customErrors.get(field) || getFieldError(field);
            field.setCustomValidity(error);
            setFieldError(field, error);
        });

        const invalidField = fields.find((field) => !field.checkValidity());
        if (invalidField) {
            status.textContent = 'Please review the highlighted fields.';
            invalidField.reportValidity();
            return;
        }

        const subject = `Portfolio enquiry from ${nameField.value}`;
        const body = `Name: ${nameField.value}\nEmail: ${emailField.value}\n\n${messageField.value}`;
        const composeUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        if (composeUrl.length > MAX_COMPOSE_URL_LENGTH) {
            status.textContent = 'This message is too long to open reliably in an email app. Copy your details and email me directly at the address shown.';
            return;
        }

        status.textContent = 'Your email app should open with this message prepared. Review it there and press Send to deliver it.';
        window.location.href = composeUrl;
    });

    form.dataset.initialized = 'true';
    form.hidden = false;
}
