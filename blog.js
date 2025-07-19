// Blog Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Blog category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog posts
            blogPosts.forEach(post => {
                const postCategory = post.getAttribute('data-category');
                
                if (category === 'all' || postCategory === category) {
                    post.style.display = 'block';
                    post.classList.remove('filtering-out');
                    post.classList.add('filtering-in');
                } else {
                    post.classList.add('filtering-out');
                    setTimeout(() => {
                        post.style.display = 'none';
                        post.classList.remove('filtering-out');
                    }, 300);
                }
            });
        });
    });
    
    // Blog post interactions
    blogPosts.forEach(post => {
        const postCard = post.querySelector('.post-card');
        
        postCard.addEventListener('click', function() {
            const postTitle = this.querySelector('.post-title').textContent;
            const postCategory = post.getAttribute('data-category');
            
            console.log(`Opening article: ${postTitle} (${postCategory})`);
            // This would typically navigate to the full article page
        });
        
        // Hover effects
        postCard.addEventListener('mouseenter', function() {
            const postImage = this.querySelector('.post-image');
            if (postImage) {
                postImage.style.transform = 'scale(1.05)';
            }
        });
        
        postCard.addEventListener('mouseleave', function() {
            const postImage = this.querySelector('.post-image');
            if (postImage) {
                postImage.style.transform = 'scale(1)';
            }
        });
    });
    
    // Featured article interaction
    const featuredCard = document.querySelector('.featured-card');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (readMoreBtn) {
        readMoreBtn.addEventListener('click', function() {
            const featuredTitle = document.querySelector('.featured-title').textContent;
            console.log(`Reading featured article: ${featuredTitle}`);
            // This would typically navigate to the full article page
        });
    }
    
    if (featuredCard) {
        featuredCard.addEventListener('click', function(e) {
            if (!e.target.closest('.read-more-btn')) {
                const featuredTitle = this.querySelector('.featured-title').textContent;
                console.log(`Opening featured article: ${featuredTitle}`);
            }
        });
    }
    
    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                subscribeToNewsletter(email, emailInput);
            } else {
                showNewsletterError('Please enter a valid email address');
            }
        });
    }
    
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function subscribeToNewsletter(email, inputElement) {
        const submitBtn = newsletterForm.querySelector('.btn');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Subscribing...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success
            showNewsletterSuccess();
            
            // Reset form
            inputElement.value = '';
            
            // Reset button
            submitBtn.querySelector('span').textContent = originalText;
            submitBtn.disabled = false;
            
            console.log('Newsletter subscription:', email);
        }, 1500);
    }
    
    function showNewsletterSuccess() {
        const form = newsletterForm;
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid var(--primary-green);
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            color: var(--primary-green);
            text-align: center;
        `;
        
        successMessage.innerHTML = '✓ Successfully subscribed to our newsletter!';
        
        // Remove existing messages
        const existingMessages = form.parentElement.querySelectorAll('.newsletter-message');
        existingMessages.forEach(msg => msg.remove());
        
        successMessage.className = 'newsletter-message';
        form.parentElement.appendChild(successMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 3000);
    }
    
    function showNewsletterError(message) {
        const form = newsletterForm;
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid #ef4444;
            border-radius: 8px;
            padding: 1rem;
            margin-top: 1rem;
            color: #ef4444;
            text-align: center;
        `;
        
        errorMessage.innerHTML = message;
        
        // Remove existing messages
        const existingMessages = form.parentElement.querySelectorAll('.newsletter-message');
        existingMessages.forEach(msg => msg.remove());
        
        errorMessage.className = 'newsletter-message';
        form.parentElement.appendChild(errorMessage);
        
        // Remove after 3 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 3000);
    }
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            console.log('Loading more blog posts...');
            
            // Show loading state
            this.querySelector('span').textContent = 'Loading...';
            
            // Simulate loading
            setTimeout(() => {
                this.querySelector('span').textContent = 'Load More Articles';
                // Here you would typically load more posts from an API
            }, 1500);
        });
    }
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.3) rotate(10deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                
                // Special handling for staggered animations
                const siblings = entry.target.parentElement.children;
                Array.from(siblings).forEach((sibling, index) => {
                    if (sibling.classList.contains('blog-post')) {
                        setTimeout(() => {
                            sibling.style.animationPlayState = 'running';
                        }, index * 100);
                    }
                });
            }
        });
    }, observerOptions);
    
    // Observe blog posts for scroll animations
    blogPosts.forEach(post => {
        observer.observe(post);
    });
    
    // Post meta hover effects
    const postAuthors = document.querySelectorAll('.post-author');
    postAuthors.forEach(author => {
        author.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-green-light)';
            this.style.transform = 'scale(1.05)';
        });
        
        author.addEventListener('mouseleave', function() {
            this.style.color = 'var(--primary-green)';
            this.style.transform = 'scale(1)';
        });
    });
    
    // Featured article meta animations
    const articleStats = document.querySelectorAll('.article-stats .stat');
    articleStats.forEach((stat, index) => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.color = 'var(--primary-green)';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.color = 'var(--dark-text-secondary)';
        });
    });
});