// Gallery Page JavaScript - New Implementation
document.addEventListener('DOMContentLoaded', function() {
    
    // Password for admin access
    const ADMIN_PASSWORD = 'sayınmehmetruzgarbeyhoca';
    
    // DOM Elements
    const addNewBtn = document.getElementById('addNewBtn');
    const passwordModal = document.getElementById('passwordModal');
    const addCardModal = document.getElementById('addCardModal');
    const closePasswordModal = document.getElementById('closePasswordModal');
    const closeAddCardModal = document.getElementById('closeAddCardModal');
    const passwordInput = document.getElementById('passwordInput');
    const submitPassword = document.getElementById('submitPassword');
    const passwordError = document.getElementById('passwordError');
    const addCardForm = document.getElementById('addCardForm');
    const cancelForm = document.getElementById('cancelForm');
    const galleryGrid = document.getElementById('galleryGrid');

    // LocalStorage Key
    const STORAGE_KEY = 'gallery_cards';

    // Load cards from localStorage on page load
    loadCardsFromStorage();
    
    // Event Listeners
    addNewBtn.addEventListener('click', showPasswordModal);
    closePasswordModal.addEventListener('click', hidePasswordModal);
    closeAddCardModal.addEventListener('click', hideAddCardModal);
    submitPassword.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });
    addCardForm.addEventListener('submit', handleFormSubmit);
    cancelForm.addEventListener('click', hideAddCardModal);
    
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === passwordModal) {
            hidePasswordModal();
        }
        if (e.target === addCardModal) {
            hideAddCardModal();
        }
    });
    
    // Functions
    function showPasswordModal() {
        passwordModal.style.display = 'block';
        passwordInput.focus();
        passwordError.style.display = 'none';
        passwordInput.value = '';
    }
    
    function hidePasswordModal() {
        passwordModal.style.display = 'none';
        passwordInput.value = '';
        passwordError.style.display = 'none';
    }
    
    function showAddCardModal() {
        hidePasswordModal();
        addCardModal.style.display = 'block';
        document.getElementById('cardName').focus();
    }
    
    function hideAddCardModal() {
        addCardModal.style.display = 'none';
        addCardForm.reset();
    }
    
    function checkPassword() {
        const enteredPassword = passwordInput.value.trim();
        
        if (enteredPassword === ADMIN_PASSWORD) {
            showAddCardModal();
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            
            // Hide error after 3 seconds
            setTimeout(() => {
                passwordError.style.display = 'none';
            }, 3000);
        }
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const cardData = {
            name: document.getElementById('cardName').value,
            description: document.getElementById('cardDescription').value,
            date: document.getElementById('cardDate').value,
            location: document.getElementById('cardLocation').value,
            image: document.getElementById('cardImage').files[0]
        };
        
        // Validate form
        if (!cardData.name || !cardData.description || !cardData.date || !cardData.location || !cardData.image) {
            alert('Please fill in all fields!');
            return;
        }
        
        // Convert image to base64 and then save
        const reader = new FileReader();
        reader.onload = function(event) {
            cardData.imageBase64 = event.target.result;
            saveCardToStorage(cardData);
            createNewCard(cardData, true); // true: from form
            hideAddCardModal();
        };
        reader.readAsDataURL(cardData.image);
    }

    function saveCardToStorage(cardData) {
        // Remove File object, only keep base64
        const cardToSave = {
            name: cardData.name,
            description: cardData.description,
            date: cardData.date,
            location: cardData.location,
            imageBase64: cardData.imageBase64
        };
        let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        cards.unshift(cardToSave); // Add to start
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    }

    function loadCardsFromStorage() {
        let cards = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        cards.forEach(card => {
            createNewCard(card, false); // false: from storage
        });
    }
    
    function createNewCard(cardData, isNew) {
        const cardElement = document.createElement('div');
        cardElement.className = 'gallery-item';
        cardElement.style.opacity = '0';
        cardElement.style.transform = 'translateY(50px)';
        
        // Format date
        const dateObj = new Date(cardData.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Use base64 image
        const imageUrl = cardData.imageBase64;
        
        cardElement.innerHTML = `
            <div class="glass-card gallery-card">
                <div class="card-image">
                    <img src="${imageUrl}" alt="${cardData.name}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 20px;" />
                    <div class="image-overlay">
                        <button class="view-btn">
                            <span>View Details</span>
                        </button>
                    </div>
                </div>
                <div class="card-content">
                    <h3 class="card-title">${cardData.name}</h3>
                    <p class="card-description">${cardData.description}</p>
                    <div class="card-stats">
                        <span class="stat">📍 ${cardData.location}</span>
                        <span class="stat">📅 ${formattedDate}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the add button
        galleryGrid.insertBefore(cardElement, galleryGrid.firstChild);
        
        // Animate in
        setTimeout(() => {
            cardElement.style.transition = 'all 0.8s ease-out';
            cardElement.style.opacity = '1';
            cardElement.style.transform = 'translateY(0)';
        }, isNew ? 100 : 0);
        
        // Add hover effects and view button functionality
        const viewBtn = cardElement.querySelector('.view-btn');
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            showCardDetails(cardData, imageUrl);
        });
        
        // Update stats (optional)
        updateGalleryStats();
    }
    
    function showCardDetails(cardData, imageUrl) {
        // Create detail modal (simple implementation)
        const detailModal = document.createElement('div');
        detailModal.className = 'modal';
        detailModal.style.display = 'block';
        
        detailModal.innerHTML = `
            <div class="modal-content" style="max-width: 800px;">
                <div class="modal-header">
                    <h2>${cardData.name}</h2>
                    <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
                </div>
                <div class="modal-body">
                    <img src="${imageUrl}" alt="${cardData.name}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 10px; margin-bottom: 1rem;" />
                    <p style="margin-bottom: 1rem; line-height: 1.6;">${cardData.description}</p>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        <span class="stat">📍 ${cardData.location}</span>
                        <span class="stat">📅 ${new Date(cardData.date).toLocaleDateString('en-US')}</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(detailModal);
        
        // Close when clicking outside
        detailModal.addEventListener('click', function(e) {
            if (e.target === detailModal) {
                detailModal.remove();
            }
        });
    }
    
    function updateGalleryStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const newValue = currentValue + 1;
            const suffix = stat.textContent.replace(/[\d]/g, '');
            stat.textContent = newValue + suffix;
        });
    }
    
    // Intersection Observer for scroll animations (keep existing functionality)
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
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        observer.observe(item);
    });
    
    // Stats animation (keep existing functionality)
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