// Gallery Page JavaScript - Enhanced with Photo Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery data storage
    let galleryData = JSON.parse(localStorage.getItem('cleanityGallery')) || [];
    let clickCount = parseInt(localStorage.getItem('photosClickCount')) || 0;
    
    // DOM Elements
    const photosCard = document.getElementById('photos-captured-card');
    const photosCount = document.getElementById('photos-count');
    const clickIndicator = document.getElementById('click-indicator');
    const clickCounter = clickIndicator.querySelector('.click-counter');
    const uploadForm = document.getElementById('photo-upload-section');
    const form = document.getElementById('photo-upload-form');
    const galleryGrid = document.querySelector('.gallery-grid');
    const emptyMessage = document.getElementById('empty-gallery-message');
    const loadMoreContainer = document.querySelector('.load-more-container');
    
    // Initialize gallery
    updatePhotosCount();
    renderGallery();
    updateClickIndicator();
    
    // Photos Captured Card Click Handler
    photosCard.addEventListener('click', function() {
        clickCount++;
        localStorage.setItem('photosClickCount', clickCount);
        
        // Add click animation
        this.classList.add('clicked');
        setTimeout(() => this.classList.remove('clicked'), 300);
        
        updateClickIndicator();
        
        // Open form after 3 clicks
        if (clickCount >= 3) {
            openUploadForm();
            // Reset click count
            clickCount = 0;
            localStorage.setItem('photosClickCount', 0);
            updateClickIndicator();
        }
    });
    
    // Form handlers
    document.getElementById('close-form').addEventListener('click', closeUploadForm);
    document.getElementById('cancel-form').addEventListener('click', closeUploadForm);
    
    // File upload preview
    const fileInput = document.getElementById('photo-file');
    const filePreview = document.getElementById('file-preview');
    
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                filePreview.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <div class="file-info">
                        <strong>${file.name}</strong> (${(file.size / 1024 / 1024).toFixed(2)} MB)
                    </div>
                `;
                filePreview.classList.add('has-file');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const file = fileInput.files[0];
        
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoData = {
                    id: Date.now(),
                    title: document.getElementById('photo-title').value,
                    description: document.getElementById('photo-description').value,
                    date: document.getElementById('photo-date').value,
                    location: document.getElementById('photo-location').value,
                    category: document.getElementById('photo-category').value,
                    image: e.target.result,
                    fileName: file.name,
                    timestamp: new Date().toISOString()
                };
                
                // Add to gallery data
                galleryData.unshift(photoData);
                localStorage.setItem('cleanityGallery', JSON.stringify(galleryData));
                
                // Update UI
                updatePhotosCount();
                renderGallery();
                closeUploadForm();
                
                // Show success message
                showSuccessMessage('Fotoğraf başarıyla eklendi! 🎉');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Gallery Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
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
    
    // Functions
    function updatePhotosCount() {
        photosCount.textContent = galleryData.length;
    }
    
    function updateClickIndicator() {
        clickCounter.textContent = `${clickCount}/3`;
        
        if (clickCount >= 2) {
            photosCard.classList.add('ready-to-open');
        } else {
            photosCard.classList.remove('ready-to-open');
        }
    }
    
    function openUploadForm() {
        uploadForm.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Reset form
        form.reset();
        filePreview.innerHTML = '';
        filePreview.classList.remove('has-file');
        
        // Set today's date as default
        document.getElementById('photo-date').value = new Date().toISOString().split('T')[0];
    }
    
    function closeUploadForm() {
        uploadForm.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function renderGallery() {
        if (galleryData.length === 0) {
            emptyMessage.style.display = 'block';
            loadMoreContainer.style.display = 'none';
            return;
        }
        
        emptyMessage.style.display = 'none';
        loadMoreContainer.style.display = 'block';
        
        // Clear existing gallery items (except empty message)
        const existingItems = galleryGrid.querySelectorAll('.gallery-item:not(#empty-gallery-message)');
        existingItems.forEach(item => item.remove());
        
        // Render gallery items
        galleryData.forEach((photo, index) => {
            const galleryItem = createGalleryItem(photo, index);
            galleryGrid.appendChild(galleryItem);
        });
    }
    
    function createGalleryItem(photo, index) {
        const item = document.createElement('div');
        item.className = `gallery-item ${photo.category}-item`;
        item.setAttribute('data-category', photo.category);
        item.style.animationDelay = `${(index % 6) * 0.1}s`;
        
        const categoryEmojis = {
            cleanups: '🧹',
            workshops: '🎓',
            community: '🤝',
            events: '🎉'
        };
        
        const categoryNames = {
            cleanups: 'Temizlik',
            workshops: 'Workshop',
            community: 'Topluluk',
            events: 'Etkinlik'
        };
        
        const formattedDate = new Date(photo.date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        item.innerHTML = `
            <div class="glass-card gallery-card">
                <div class="card-image">
                    <img src="${photo.image}" alt="${photo.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;">
                    <div class="image-overlay">
                        <button class="view-btn" onclick="viewPhoto(${photo.id})">
                            <span>Detayları Gör</span>
                        </button>
                        <button class="delete-btn" onclick="deletePhoto(${photo.id})">
                            <span>🗑️</span>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${photo.title}</h3>
                    <p class="card-description">${photo.description}</p>
                    <div class="card-stats">
                        <span class="stat">📍 ${photo.location}</span>
                        <span class="stat">📅 ${formattedDate}</span>
                        <span class="stat">${categoryEmojis[photo.category]} ${categoryNames[photo.category]}</span>
                    </div>
                </div>
            </div>
        `;
        
        return item;
    }
    
    function showSuccessMessage(message) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: var(--primary-green);
            color: white;
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
            z-index: 1001;
            animation: slideInRight 0.5s ease;
        `;
        successDiv.textContent = message;
        
        document.body.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideOutRight 0.5s ease forwards';
            setTimeout(() => document.body.removeChild(successDiv), 500);
        }, 3000);
    }
    
    // Global functions for photo actions
    window.viewPhoto = function(photoId) {
        const photo = galleryData.find(p => p.id === photoId);
        if (photo) {
            // Create and show photo detail modal
            const modal = createPhotoModal(photo);
            document.body.appendChild(modal);
        }
    };
    
    window.deletePhoto = function(photoId) {
        if (confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
            galleryData = galleryData.filter(p => p.id !== photoId);
            localStorage.setItem('cleanityGallery', JSON.stringify(galleryData));
            updatePhotosCount();
            renderGallery();
            showSuccessMessage('Fotoğraf silindi.');
        }
    };
    
    function createPhotoModal(photo) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.9);
            z-index: 1002;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        `;
        
        const formattedDate = new Date(photo.date).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        modal.innerHTML = `
            <div class="glass-card" style="max-width: 800px; max-height: 90vh; overflow-y: auto;">
                <div style="position: relative;">
                    <button onclick="this.closest('.glass-card').parentElement.remove()" style="position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.9); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 1.5rem; z-index: 10;">&times;</button>
                    <img src="${photo.image}" alt="${photo.title}" style="width: 100%; max-height: 400px; object-fit: contain; border-radius: 15px; margin-bottom: 1rem;">
                    <div style="padding: 1rem;">
                        <h2 style="color: var(--dark-text); margin-bottom: 1rem;">${photo.title}</h2>
                        <p style="color: var(--dark-text-secondary); margin-bottom: 1rem; line-height: 1.6;">${photo.description}</p>
                        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                            <span style="background: var(--surface-green); color: var(--primary-green); padding: 0.5rem 1rem; border-radius: 20px;">📍 ${photo.location}</span>
                            <span style="background: var(--surface-green); color: var(--primary-green); padding: 0.5rem 1rem; border-radius: 20px;">📅 ${formattedDate}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        return modal;
    }
    
    // Close form with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && uploadForm.style.display === 'flex') {
            closeUploadForm();
        }
    });
    
    // Stats animation (existing code)
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
    
    function animateNumber(element) {
        if (element.id === 'photos-count') return; // Don't animate photos count
        
        const finalNumber = element.textContent;
        const numericValue = parseInt(finalNumber.replace(/[^\d]/g, ''));
        const suffix = finalNumber.replace(/[\d]/g, '');
        const duration = 2000;
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