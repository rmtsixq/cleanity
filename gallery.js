// Gallery Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('filtering-out');
                    item.classList.add('filtering-in');
                } else {
                    item.classList.add('filtering-out');
                    setTimeout(() => {
                        item.style.display = 'none';
                        item.classList.remove('filtering-out');
                    }, 300);
                }
            });
        });
    });
    
    // View Details Button Functionality
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.gallery-card');
            const title = card.querySelector('.card-title').textContent;
            
            // Create modal or navigate to detail page
            console.log('Viewing details for:', title);
            // This would typically open a modal or navigate to a detail page
        });
    });
    
    // Load More Functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Simulate loading more content
            console.log('Loading more gallery items...');
            
            // Add loading state
            this.innerHTML = '<span>Loading...</span>';
            
            // Simulate API call
            setTimeout(() => {
                this.innerHTML = '<span>Load More Projects</span><div class="btn-ripple"></div>';
                // Here you would typically load more items from an API
            }, 1500);
        });
    }
    
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
    
    // Observe gallery items for scroll animations
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Stats animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
    
    function animateNumber(element) {
        const finalNumber = element.textContent;
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        const suffix = finalNumber.replace(/[\d]/g, '');
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentNumber = Math.floor(numericValue * progress);
            
            element.textContent = currentNumber + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        updateNumber();
    }
});