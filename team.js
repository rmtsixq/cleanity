// Team Page JavaScript - Enhanced Portfolio Style
document.addEventListener('DOMContentLoaded', function() {
    
    // Team member detailed information
    const memberData = {
        'mehmet-arda-gun': {
            name: 'Mehmet Arda Gün',
            role: 'Co Founder',
            location: 'Diyarbakır, Turkey',
            image: 'mehmetardagün.jpeg',
            description: `Hi, I'm Arda, 16 years old. I'm curious and eager to learn across different fields. I enjoy solving problems and actively participating in new projects. While I'm disciplined in my work, I always prioritize creative thinking. I value teamwork and believe in progressing together by embracing diverse perspectives. A clean and organized workspace motivates me and helps me stay focused. My interest in technology and innovation drives me to constantly explore new ideas. Developing myself and contributing positively to my environment are important to me. Being part of Cleanity will make this journey even more meaningful.`
        },
        'ekin-dila-kasimoglu': {
            name: 'Ekin Dila Kasimoğlu',
            role: 'Co Founder',
            location: 'Istanbul, Turkey',
            image: 'Ekin Dila Kasimoglu.jpeg',
            description: `Driven by a love for nature and empowering young changemakers, Ekin brings passionate leadership to environmental initiatives. With a deep commitment to sustainability and community building, she works tirelessly to create meaningful impact through youth engagement. Her innovative approach to environmental challenges has inspired countless young people to take action in their communities. Ekin believes that environmental change starts with education and empowering the next generation to become environmental stewards.`
        },
        'ada-nur-eskikoyuncu': {
            name: 'Ada Nur Eskikoyuncu',
            role: 'Local Coordinator',
            location: 'Ankara, Turkey',
            image: 'Ada Nur Eskikoyuncu.jpeg',
            description: `Hi, my name is Ada Nur Eskikoyuncu. I'm 16 and a high school student. I've always been interested in science, and currently I am doing research about biology. I participated in competitions about science and got a degree from them. My aim is to get into the university I want, work deeply in my own field, and improve myself. I really want to team up with the students who have the same mindset as me, learn, and protect the environment. I'm proud to be in this community and hope we can reach our goals.`
        },
        'civan-ure': {
            name: 'Civan Üre',
            role: 'Local Coordinator',
            location: 'Diyarbakır, Turkey',
            image: 'civanüre.jpeg',
            description: `Hi, my name is Civan I'm an IB student at Diyarbakir, and I'm the local coordinator of Diyarbakir at Cleanity. I'm really glad to be making a change here at Cleanity for our environment. I believe even small or subtle actions can pile up and lead to big changes. I believe everyone can take at least one small responsibility in order to make a difference whether significant or small. Let's make a change.`
        },
        'arda-kaan-turhan': {
            name: 'Arda Kaan Turhan',
            role: 'Local Coordinator',
            location: 'Istanbul, Turkey',
            image: 'placeholder',
            description: `My name is Arda, I would like to give world a better vision. And the first stop of it is clean environment. In the cleanity community, I'll work as local coordinator. We will take part in diverse of activities. As a responsible content creator, social impact advocate or a student, I will do whatever I can in available circumstances.`
        },
        'alina-burdukovskaia': {
            name: 'Alina Burdukovskaia',
            role: 'Local Coordinator',
            location: 'Moscow, Russia',
            image: 'Alina Burdukovskaia.jpeg',
            description: `Bringing global perspective and energy to every project, Alina connects international communities through environmental action. Her multicultural background and language skills enable her to bridge gaps between different communities and create inclusive environmental programs. She specializes in developing cross-cultural environmental initiatives that promote understanding and cooperation across borders. Alina's vision extends beyond local impact to global environmental consciousness and international cooperation for sustainability.`
        },
        'rumet-asan': {
            name: 'Rumet Asan',
            role: 'Head Of IT',
            location: 'Diyarbakır, Turkey',
            image: 'rumetasan.jpeg',
            description: `Tech enthusiast dedicated to building a better, cleaner world through innovative digital solutions. Rumet combines technical expertise with environmental passion to create cutting-edge platforms that amplify our impact. His work in developing digital tools for environmental tracking, community engagement, and educational resources has revolutionized how we approach environmental action in the digital age. He believes that technology, when used responsibly, can be one of our most powerful tools for creating positive environmental change.`
        },
        'oguz-abdullah-kucukkilinc': {
            name: 'Oğuz Abdullah Küçükkılınç',
            role: 'Local Coordinator',
            location: 'Istanbul, Turkey',
            image: 'Arda Kaan Turhan.jpeg',
            description: `Motivated to turn ideas into action for a greener future, Oğuz excels at project management and community mobilization. His strategic thinking and execution skills have led to successful environmental campaigns that create lasting change. He has a particular talent for identifying opportunities for environmental improvement and developing practical solutions that communities can implement. Oğuz's approach emphasizes sustainable practices that can be maintained long-term while creating measurable environmental benefits.`
        },
        'lena-deniz-zorcu': {
            name: 'Lena Deniz Zorcu',
            role: 'Local Coordinator',
            location: 'Izmir, Turkey',
            image: 'placeholder',
            description: `Believes in the power of youth to change the world and dedicates her efforts to empowering young environmental advocates. Lena has a gift for inspiring others and creating inclusive spaces where everyone feels valued and heard. Her work focuses on youth engagement, environmental education, and building sustainable leadership pipelines for the future. She believes that by investing in young people today, we can create a generation of environmental leaders who will continue fighting for our planet long into the future.`
        },
        'bora-boroglu': {
            name: 'Bora Boroğlu',
            role: 'Local Coordinator',
            location: 'Kocaeli, Turkey',
            image: 'Bora Boroğlu.jpeg',
            description: `Hello, I'm Bora, 17 years old. I live in Kocaeli, Turkey, and I'm currently a 12th grader at Ülkün Yalçın Anatolian High School. I really enjoy being active I like running, cycling, and playing basketball. I'm also interested in kickboxing. Doing sports helps me feel relaxed and refreshed, which is why it's such a big part of my life. I also love spending time in nature. I enjoy walking in natural places and taking photos of landscapes. I joined this club because I care about the environment, and I want to help raise awareness about nature among people. As someone who loves both sports and the outdoors, I believe this club is a great opportunity to do something meaningful.`
        },
        'yigit-kaan-kizlier': {
            name: 'Yiğit Kaan Kızlıer',
            role: 'Research Coordinator',
            location: 'Izmir, Turkey',
            image: 'Yiğit Kaan Kızlıer.jpeg',
            description: `Hello, my name is Yiğit Kaan Kızlıer. I'm 17 years old and currently a high school junior. I have a strong interest in scientific research, especially in the field of neuroscience. My goal is to pursue higher education abroad and contribute to academic studies in this area. I'm also actively involved in a volunteer project called "Aydınlık Gelecek," where we focus on social impact and community support. I joined this community to learn, grow, and connect with like-minded individuals. I'm glad to be here and look forward to meaningful interactions.`
        }
    };
    
    // DOM Elements
    const memberCards = document.querySelectorAll('.member-card');
    const memberModal = document.getElementById('memberModal');
    const closeMemberModal = document.getElementById('closeMemberModal');
    const modalMemberName = document.getElementById('modalMemberName');
    const modalMemberRole = document.getElementById('modalMemberRole');
    const modalMemberLocation = document.getElementById('modalMemberLocation');
    const modalMemberImage = document.getElementById('modalMemberImage');
    const modalMemberDescription = document.getElementById('modalMemberDescription');
    
    // Check if device supports hover
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    
    memberCards.forEach(card => {
        let memberElement = card.closest('.team-member');
        let memberId = null;
        if (memberElement) {
            memberId = memberElement.getAttribute('data-member');
        }
        // Eğer closest ile bulamazsa, parentElement veya card'ın kendisi üzerinden dene
        if (!memberId && card.parentElement && card.parentElement.classList.contains('team-member')) {
            memberId = card.parentElement.getAttribute('data-member');
        }
        if (!memberId && card.hasAttribute('data-member')) {
            memberId = card.getAttribute('data-member');
        }
        
        if (hasHover) {
            // Desktop: hover effects
            card.addEventListener('mouseenter', function() {
                // Add hover effect to other cards
                memberCards.forEach(otherCard => {
                    if (otherCard !== card) {
                        otherCard.style.opacity = '0.7';
                        otherCard.style.transform = 'scale(0.95)';
                    }
                });
            });
            
            card.addEventListener('mouseleave', function() {
                // Remove hover effect from other cards
                memberCards.forEach(otherCard => {
                    otherCard.style.opacity = '1';
                    otherCard.style.transform = 'scale(1)';
                });
            });
        }
        
        // Click handler for both mobile and desktop
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (memberId && memberData[memberId]) {
                showMemberModal(memberData[memberId]);
            } else {
                console.warn('Takım üyesi ID bulunamadı veya memberData eksik:', memberId);
            }
        });
    });
    
    // Modal functions
    function showMemberModal(member) {
        modalMemberName.textContent = member.name;
        modalMemberRole.textContent = member.role;
        modalMemberLocation.textContent = `📍 ${member.location}`;
        modalMemberDescription.innerHTML = formatDescription(member.description);
        
        // Set image
        if (member.image && member.image !== 'placeholder') {
            modalMemberImage.src = member.image;
            modalMemberImage.alt = member.name;
            modalMemberImage.style.display = 'block';
        } else {
            modalMemberImage.style.display = 'none';
        }
        
        memberModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        setTimeout(() => {
            memberModal.querySelector('.modal-content').style.transform = 'scale(1)';
            memberModal.querySelector('.modal-content').style.opacity = '1';
        }, 10);
    }
    
    function hideMemberModal() {
        memberModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function formatDescription(description) {
        // Split description into paragraphs for better readability
        const paragraphs = description.split('. ').reduce((acc, sentence, index, array) => {
            if (index % 3 === 0) {
                acc.push(sentence);
            } else {
                acc[acc.length - 1] += '. ' + sentence;
            }
            return acc;
        }, []);
        
        return paragraphs.map(p => `<p>${p.trim()}${p.endsWith('.') ? '' : '.'}</p>`).join('');
    }
    
    // Modal event listeners
    closeMemberModal.addEventListener('click', hideMemberModal);
    
    // Close modal when clicking outside
    memberModal.addEventListener('click', function(e) {
        if (e.target === memberModal) {
            hideMemberModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && memberModal.style.display === 'block') {
            hideMemberModal();
        }
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
    
    // Observe team members for scroll animations
    memberCards.forEach(card => {
        observer.observe(card);
    });
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'scale(1.2) rotate(15deg)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // Team stats animation (for leadership cards)
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(number => {
        statsObserver.observe(number);
    });
    
    function animateStatNumber(element) {
        const finalText = element.textContent;
        const numericValue = parseInt(finalText.replace(/[^\d]/g, ''));
        const suffix = finalText.replace(/[\d]/g, '');
        
        if (numericValue > 0) {
            const duration = 1500;
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
    }
    
    // Region badge interactions
    const regionBadges = document.querySelectorAll('.region-badge');
    regionBadges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add some interactive features for mobile
    if (!hasHover) {
        // Add touch feedback for mobile devices
        memberCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
    }
});