// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateForm(data)) {
                submitForm(data);
            }
        });
    }
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if input has value on page load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Custom checkbox interaction
    const checkboxes = document.querySelectorAll('.form-checkbox');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const customCheckbox = this.nextElementSibling;
            if (this.checked) {
                customCheckbox.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    customCheckbox.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
    
    // FAQ interactions
    const faqCards = document.querySelectorAll('.faq-card');
    faqCards.forEach(card => {
        card.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ cards
            faqCards.forEach(otherCard => {
                otherCard.classList.remove('active');
            });
            
            // Toggle current card
            if (!isActive) {
                this.classList.add('active');
            }
        });
    });
    
    // Social links hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
    
    // Location items hover effects
    const locationItems = document.querySelectorAll('.location-item');
    locationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(5px)';
        });
    });
    
    // Form validation
    function validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject) {
            errors.push('Please select a subject');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showFormErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        errorContainer.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: #ef4444;
        `;
        
        // Add error messages
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '1.5rem';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorList);
        contactForm.insertBefore(errorContainer, contactForm.firstChild);
        
        // Scroll to form
        errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    function submitForm(data) {
        const submitButton = contactForm.querySelector('.form-submit');
        const originalText = submitButton.querySelector('span').textContent;
        
        // Show loading state
        submitButton.querySelector('span').textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showFormSuccess();
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.querySelector('span').textContent = originalText;
            submitButton.disabled = false;
            
            // Remove focused states
            formInputs.forEach(input => {
                input.parentElement.classList.remove('focused');
            });
            
            console.log('Contact form submitted:', data);
        }, 2000);
    }
    
    function showFormSuccess() {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.form-error, .form-success');
        existingMessages.forEach(msg => msg.remove());
        
        // Create success container
        const successContainer = document.createElement('div');
        successContainer.className = 'form-success';
        successContainer.style.cssText = `
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid var(--primary-green);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: var(--primary-green);
            text-align: center;
        `;
        
        successContainer.innerHTML = `
            <strong>✓ Message sent successfully!</strong><br>
            We'll get back to you within 24 hours.
        `;
        
        contactForm.insertBefore(successContainer, contactForm.firstChild);
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successContainer.remove();
        }, 5000);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.faq-item, .contact-method, .location-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});