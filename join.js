// Join Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Modal elements
    const modal = document.getElementById('applicationModal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeBtn = document.getElementById('closeModal');
    const cancelBtn = document.getElementById('cancelBtn');
    const formTitle = document.getElementById('formTitle');
    const applicationForm = document.getElementById('applicationForm');
    
    // Option buttons
    const optionBtns = document.querySelectorAll('.option-btn');
    
    // Role-specific content container
    const roleSpecificSection = document.getElementById('roleSpecificSection');
    const roleSpecificTitle = document.getElementById('roleSpecificTitle');
    const roleSpecificContent = document.getElementById('roleSpecificContent');
    
    // Handle option button clicks
    optionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const formType = this.getAttribute('data-form');
            openApplicationModal(formType);
        });
    });
    
    // Modal close handlers
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    // Prevent modal close when clicking inside modal content
    document.querySelector('.modal-content').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Form submission
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        submitApplication();
    });
    
    function openApplicationModal(formType) {
        // Set form title and role-specific content based on type
        const formConfig = getFormConfig(formType);
        formTitle.textContent = formConfig.title;
        roleSpecificTitle.textContent = formConfig.roleTitle;
        roleSpecificContent.innerHTML = formConfig.roleContent;
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus first input
        const firstInput = applicationForm.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 300);
        }
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset form
        applicationForm.reset();
        
        // Clear role-specific content
        roleSpecificContent.innerHTML = '';
    }
    
    function getFormConfig(formType) {
        const configs = {
            volunteer: {
                title: 'Become a Volunteer',
                roleTitle: 'Volunteer-Specific Questions',
                roleContent: `
                    <div class="form-group">
                        <label for="volunteerInterests" class="form-label">What type of volunteer activities interest you most?</label>
                        <select id="volunteerInterests" name="volunteerInterests" class="form-select" required>
                            <option value="">Select your interests</option>
                            <option value="cleanup-events">Cleanup Events</option>
                            <option value="workshops">Educational Workshops</option>
                            <option value="digital-tasks">Digital/Remote Tasks</option>
                            <option value="community-outreach">Community Outreach</option>
                            <option value="event-planning">Event Planning</option>
                        </select>
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="volunteerSkills" class="form-label">What skills or talents do you bring?</label>
                        <textarea id="volunteerSkills" name="volunteerSkills" class="form-textarea" rows="3"></textarea>
                        <div class="input-underline"></div>
                    </div>
                `
            },
            leader: {
                title: 'Become a Local Leader',
                roleTitle: 'Leadership-Specific Questions',
                roleContent: `
                    <div class="form-group">
                        <label for="leadershipExperience" class="form-label">Describe any previous leadership experience</label>
                        <textarea id="leadershipExperience" name="leadershipExperience" class="form-textarea" rows="3" required></textarea>
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="communityPlan" class="form-label">What's your vision for environmental action in your community?</label>
                        <textarea id="communityPlan" name="communityPlan" class="form-textarea" rows="4" required></textarea>
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="teamSize" class="form-label">How many volunteers do you think you could initially recruit?</label>
                        <select id="teamSize" name="teamSize" class="form-select" required>
                            <option value="">Select team size</option>
                            <option value="5-10">5-10 people</option>
                            <option value="10-20">10-20 people</option>
                            <option value="20-50">20-50 people</option>
                            <option value="50+">More than 50 people</option>
                        </select>
                        <div class="input-underline"></div>
                    </div>
                `
            },
            tech: {
                title: 'Join Tech Team',
                roleTitle: 'Technical Skills & Experience',
                roleContent: `
                    <div class="form-group">
                        <label for="techSkills" class="form-label">Programming languages and technologies you know</label>
                        <textarea id="techSkills" name="techSkills" class="form-textarea" rows="3" required placeholder="e.g., JavaScript, Python, React, Node.js, etc."></textarea>
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="portfolioUrl" class="form-label">Portfolio/GitHub URL (optional)</label>
                        <input type="url" id="portfolioUrl" name="portfolioUrl" class="form-input" placeholder="https://github.com/yourusername">
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="techInterests" class="form-label">What type of tech projects interest you most?</label>
                        <select id="techInterests" name="techInterests" class="form-select" required>
                            <option value="">Select your interests</option>
                            <option value="web-development">Web Development</option>
                            <option value="mobile-apps">Mobile Apps</option>
                            <option value="data-analysis">Data Analysis</option>
                            <option value="ai-ml">AI/Machine Learning</option>
                            <option value="devops">DevOps/Infrastructure</option>
                        </select>
                        <div class="input-underline"></div>
                    </div>
                `
            },
            creative: {
                title: 'Join Creative Team',
                roleTitle: 'Creative Skills & Experience',
                roleContent: `
                    <div class="form-group">
                        <label for="creativeSkills" class="form-label">What creative skills do you have?</label>
                        <textarea id="creativeSkills" name="creativeSkills" class="form-textarea" rows="3" required placeholder="e.g., graphic design, video editing, photography, writing, etc."></textarea>
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="creativePortfolio" class="form-label">Portfolio/Work samples URL (optional)</label>
                        <input type="url" id="creativePortfolio" name="creativePortfolio" class="form-input" placeholder="https://your-portfolio.com">
                        <div class="input-underline"></div>
                    </div>
                    <div class="form-group">
                        <label for="creativeInterests" class="form-label">What type of creative work interests you most?</label>
                        <select id="creativeInterests" name="creativeInterests" class="form-select" required>
                            <option value="">Select your interests</option>
                            <option value="social-media">Social Media Content</option>
                            <option value="video-production">Video Production</option>
                            <option value="graphic-design">Graphic Design</option>
                            <option value="content-writing">Content Writing</option>
                            <option value="photography">Photography</option>
                        </select>
                        <div class="input-underline"></div>
                    </div>
                `
            }
        };
        
        return configs[formType] || configs.volunteer;
    }
    
    function submitApplication() {
        const formData = new FormData(applicationForm);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (validateApplicationForm(data)) {
            const submitButton = applicationForm.querySelector('button[type="submit"]');
            const originalText = submitButton.querySelector('span').textContent;
            
            // Show loading state
            submitButton.querySelector('span').textContent = 'Submitting...';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success and close modal
                showApplicationSuccess();
                closeModal();
                
                // Reset button
                submitButton.querySelector('span').textContent = originalText;
                submitButton.disabled = false;
                
                console.log('Application submitted:', data);
            }, 2000);
        }
    }
    
    function validateApplicationForm(data) {
        const errors = [];
        
        // Basic validation
        if (!data.firstName || data.firstName.trim().length < 2) {
            errors.push('First name is required');
        }
        
        if (!data.lastName || data.lastName.trim().length < 2) {
            errors.push('Last name is required');
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.push('Valid email is required');
        }
        
        if (!data.age || data.age < 13 || data.age > 35) {
            errors.push('Age must be between 13 and 35');
        }
        
        if (!data.motivation || data.motivation.trim().length < 20) {
            errors.push('Please provide a more detailed motivation (at least 20 characters)');
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
        // Similar to contact form error handling
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
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
        
        const errorList = document.createElement('ul');
        errorList.style.margin = '0';
        errorList.style.paddingLeft = '1.5rem';
        
        errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error;
            errorList.appendChild(errorItem);
        });
        
        errorContainer.appendChild(errorList);
        applicationForm.insertBefore(errorContainer, applicationForm.firstChild);
    }
    
    function showApplicationSuccess() {
        // Create success notification
        const successNotification = document.createElement('div');
        successNotification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
        `;
        
        successNotification.innerHTML = `
            <strong>✓ Application submitted successfully!</strong><br>
            We'll review your application and get back to you soon.
        `;
        
        document.body.appendChild(successNotification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            successNotification.remove();
        }, 5000);
    }
    
    // Form input focus effects
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
    });
    
    // Option card hover effects
    const optionCards = document.querySelectorAll('.option-card');
    optionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
        });
    });
    
    // Intersection Observer for scroll animations
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
    const animatedElements = document.querySelectorAll('.join-option, .benefit-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});