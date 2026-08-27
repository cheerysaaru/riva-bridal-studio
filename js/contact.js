/* ============================================
   RIVAA BRIDAL STUDIO — Contact JavaScript
   ============================================ */

(function () {
    'use strict';

    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    const modalClose = document.getElementById('modalClose');

    if (!contactForm) return;

    // Validation rules
    function validateField(field) {
        const value = field.value.trim();
        const name = field.name;
        let isValid = true;

        switch (name) {
            case 'fullName':
                if (value.length < 2) {
                    isValid = false;
                }
                break;

            case 'phone':
                // Basic phone validation - at least 7 digits
                const phoneDigits = value.replace(/\D/g, '');
                if (phoneDigits.length < 7) {
                    isValid = false;
                }
                break;

            case 'email':
                // Only validate if field has value (email is optional)
                if (value.length > 0) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        isValid = false;
                    }
                }
                break;

            case 'eventDate':
                if (!value) {
                    isValid = false;
                }
                break;

            case 'service':
                if (!value) {
                    isValid = false;
                }
                break;
        }

        const formGroup = field.closest('.form-group');
        if (formGroup) {
            if (isValid) {
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.add('error');
            }
        }

        return isValid;
    }

    // Real-time validation on blur
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(function (field) {
        field.addEventListener('blur', function () {
            validateField(this);
        });

        // Remove error on input
        field.addEventListener('input', function () {
            const formGroup = this.closest('.form-group');
            if (formGroup && formGroup.classList.contains('error')) {
                // Re-validate on input
                validateField(this);
            }
        });
    });

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        let isFormValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');

        requiredFields.forEach(function (field) {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });

        if (isFormValid) {
            // Show success modal
            if (successModal) {
                successModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }

            // Reset form
            contactForm.reset();
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.form-group.error');
            if (firstError) {
                firstError.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });

    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function () {
            if (successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal on overlay click
    if (successModal) {
        successModal.addEventListener('click', function (e) {
            if (e.target === successModal) {
                successModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && successModal && successModal.classList.contains('active')) {
            successModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

})();
