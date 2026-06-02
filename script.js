// Simple text animation for hero section
const heroText = document.querySelector('.hero-content h1');
const text = "Hi, I'm Sayak Bhattacharya";
let index = 0;

function typeEffect() {
  heroText.textContent = text.slice(0, index++);
  if (index <= text.length) setTimeout(typeEffect, 150);
}

// ==================== Smooth Scrolling ====================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Update URL hash for browser history
                    const targetId = this.getAttribute('href');
                    history.pushState(null, null, targetId);
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // ==================== Browser Back/Forward Button Support ====================
        window.addEventListener('popstate', () => {
            const hash = window.location.hash;
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                // If no hash, scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });

        // ==================== Scroll to Top Button ====================
        const scrollToTopBtn = document.getElementById('scrollToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            // Update URL to home
            history.pushState(null, null, '#home');
        });

        // ==================== Navbar Background on Scroll ====================
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 15, 0.98)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 255, 136, 0.1)';
            } else {
                navbar.style.background = 'rgba(10, 10, 15, 0.95)';
                navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
        });

        // ==================== Scroll Reveal Animation ====================
        const revealElements = document.querySelectorAll('.scroll-reveal');
        
        const revealOnScroll = () => {
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ==================== Animated Progress Bars ====================
        const animateProgressBars = () => {
            const progressBars = document.querySelectorAll('.progress-bar');
            
            progressBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 100 && bar.style.width === '0%') {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth + '%';
                    }, 200);
                }
            });
        };

        window.addEventListener('scroll', animateProgressBars);
        window.addEventListener('load', animateProgressBars);

        // ==================== 3D Tilt Effect for Skill Cards ====================
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });

        // ==================== API Configuration ====================
            const API_BASE_URL = window.location.protocol === 'file:'
                ? 'https://sayak-protfolio.onrender.com/api'
                : '/api';

        // ==================== Form Validation and Submission ====================
        const contactForm = document.getElementById('contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                try {
                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const subject = document.getElementById('subject').value.trim();
                    const message = document.getElementById('message').value.trim();
                    
                    // Email validation regex
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    
                    if (name === '') {
                        alert('Please enter your name');
                        return;
                    }
                    
                    if (!emailRegex.test(email)) {
                        alert('Please enter a valid email address');
                        return;
                    }
                    
                    if (subject === '') {
                        alert('Please enter a subject');
                        return;
                    }
                    
                    if (message === '') {
                        alert('Please enter your message');
                        return;
                    }
                    
                    // Show loading state
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    
                    // Send to backend
                    const response = await fetch(`${API_BASE_URL}/contact`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            subject,
                            message
                        })
                    });
                    
                    const data = await response.json();
                    
                    if (response.ok) {
                        alert('✅ ' + data.message);
                        contactForm.reset();
                    } else {
                        alert('❌ Error: ' + (data.error || 'Failed to send message'));
                    }
                } catch (error) {
                    console.error('Contact form error:', error);
                    alert('❌ Error sending message: ' + error.message + '\n\nMake sure the backend server is running on http://localhost:5000');
                } finally {
                    // Restore button state
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        }

        // ==================== Fetch and Display Projects from MongoDB ====================
        async function loadProjects() {
            try {
                const projectsContainer = document.querySelector('#projects .row');
                
                if (!projectsContainer) return;
                
                // Show loading state
                projectsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><i class="fas fa-spinner fa-spin" style="font-size: 2rem; color: var(--primary-color);"></i> Loading projects...</div>';
                
                const apiUrl = `${API_BASE_URL}/projects`;
                const response = await fetch(apiUrl);
                let result;
                try {
                    result = await response.json();
                } catch (err) {
                    throw new Error('Invalid JSON response from ' + apiUrl + ' — ' + err.message);
                }
                console.log('Projects API response', response.status, response.statusText, result);

                if (!response.ok) {
                    throw new Error(`Server responded ${response.status} ${response.statusText} for ${apiUrl}`);
                }

                if (result.success && Array.isArray(result.data) && result.data.length > 0) {
                    // Clear loading state
                    projectsContainer.innerHTML = '';
                    
                    // Display each project
                    result.data.forEach(project => {
                        const projectCard = createProjectCard(project);
                        projectsContainer.innerHTML += projectCard;
                    });

                    // Activate scroll reveal and progress animations for newly inserted items
                    setTimeout(() => {
                        // add active class to reveal elements inside projects section
                        document.querySelectorAll('#projects .scroll-reveal').forEach(el => el.classList.add('active'));
                        // trigger progress bar animations if any were added
                        animateProgressBars();
                    }, 50);
                } else {
                    projectsContainer.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><p style="color: var(--text-gray);">No projects found yet. Projects will appear here once added to the database.</p></div>';
                }
                } catch (error) {
                console.error('Error loading projects:', error);
                const projectsContainer = document.querySelector('#projects .row');
                if (projectsContainer) {
                    projectsContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px;"><p style="color: #ff6b6b;">⚠️ Error loading projects: ${error.message}</p><p style="color: var(--text-gray); margin-top:8px; font-size:0.95rem;">Tried: <strong>${API_BASE_URL}/projects</strong></p></div>`;
                }
            }
        }

        // ==================== Open Project Details Modal ====================
        let projectDetailsModal;

        function openProjectDetails(button) {
            const modalTitle = document.getElementById('projectDetailModalTitle');
            const modalImage = document.getElementById('projectDetailModalImage');
            const modalDescription = document.getElementById('projectDetailModalDescription');
            const modalDetails = document.getElementById('projectDetailModalDetails');
            const modalTags = document.getElementById('projectDetailModalTags');
            const modalLink = document.getElementById('projectDetailModalLink');

            const title = decodeURIComponent(button.dataset.projectTitle || 'Project Details');
            const image = decodeURIComponent(button.dataset.projectImage || '');
            const description = decodeURIComponent(button.dataset.projectDescription || '');
            const detailsText = decodeURIComponent(button.dataset.projectDetailsText || '');
            const detailsLink = decodeURIComponent(button.dataset.projectDetailsLink || '');
            const tags = decodeURIComponent(button.dataset.projectTags || '');

            modalTitle.textContent = title;
            modalImage.src = image || 'https://via.placeholder.com/800x400/1a1a2e/00ff88?text=Project+Image';
            modalImage.alt = title;
            modalDescription.textContent = description;
            modalDetails.innerHTML = detailsText ? detailsText.replace(/\n/g, '<br>') : '<span style="color: var(--text-gray);">No additional project details available.</span>';
            modalTags.innerHTML = tags
                ? tags.split('|').map(tag => `<span class="tag">${tag}</span>`).join('')
                : '';

            if (detailsLink) {
                modalLink.innerHTML = `<a href="${detailsLink}" target="_blank" class="project-btn details"><i class="fas fa-info-circle"></i> Open Details Page</a>`;
            } else {
                modalLink.innerHTML = '';
            }

            projectDetailsModal.show();
        }

        // ==================== Create Project Card HTML ====================
        function createProjectCard(project) {
            const projectTags = Array.isArray(project.tags)
                ? project.tags
                : project.tags
                    ? [project.tags]
                    : [];

            const tagsHTML = projectTags.map(tag => `<span class="tag">${tag}</span>`).join('');
            const demoLink = project.demoLink ? project.demoLink : '';
            const githubLink = project.githubLink ? project.githubLink : '';
            const detailsRaw = project.details ? project.details.toString().trim() : '';
            const detailsLink = /^(https?:\/\/|\/|www\.)/i.test(detailsRaw) ? detailsRaw : '';
            const detailsText = detailsRaw && !detailsLink ? detailsRaw : '';
            const defaultImage = project.image || `https://via.placeholder.com/400x250/1a1a2e/00ff88?text=${encodeURIComponent(project.title || 'Project')}`;
            const detailsButton = detailsRaw
                ? `<button type="button" class="project-btn details" onclick="openProjectDetails(this)" data-project-title="${encodeURIComponent(project.title || 'Untitled Project')}" data-project-image="${encodeURIComponent(defaultImage)}" data-project-description="${encodeURIComponent(project.description || '')}" data-project-details-text="${encodeURIComponent(detailsText)}" data-project-details-link="${encodeURIComponent(detailsLink)}" data-project-tags="${encodeURIComponent(projectTags.join('|'))}"><i class="fas fa-info-circle"></i> Details</button>`
                : '';

            return `
                <div class="col-lg-4 col-md-6">
                    <div class="project-card scroll-reveal">
                        <img src="${project.image || 'https://via.placeholder.com/400x250/1a1a2e/00ff88?text=${encodeURIComponent(project.title)}'}" alt="${project.title || 'Project'}" class="project-image" onerror="this.src='https://via.placeholder.com/400x250/1a1a2e/00ff88?text=${encodeURIComponent(project.title || 'Project')}'">
                        <div class="project-content">
                            <h3 class="project-title">${project.title || 'Untitled Project'}</h3>
                            <p class="project-description">${project.description || 'No description provided.'}</p>
                            <div class="project-tags">
                                ${tagsHTML}
                            </div>
                            <div class="project-links">
                                ${demoLink ? `<a href="${demoLink}" target="_blank" class="project-btn" onclick="event.stopPropagation();"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                                ${githubLink ? `<a href="${githubLink}" target="_blank" class="project-btn github" onclick="event.stopPropagation();"><i class="fab fa-github"></i> Code</a>` : ''}
                                ${detailsButton}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        // Load projects when page loads
        window.addEventListener('DOMContentLoaded', () => {
            if (heroText) {
                typeEffect();
            }
            if (typeof bootstrap !== 'undefined') {
                projectDetailsModal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
            }
            console.log('Portfolio script loaded. Fetching projects from', `${API_BASE_URL}/projects`);
            loadProjects();
        });

        // ==================== Parallax Effect on Hero Section ====================
        window.addEventListener('mousemove', (e) => {
            const heroSection = document.querySelector('.hero-section');
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            
            heroSection.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
        });

        // ==================== Active Navigation Link ====================
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // ==================== Add dynamic particles effect ====================
        function createParticles() {
            const heroSection = document.querySelector('.hero-section');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 4 + 1 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = Math.random() > 0.5 ? 'var(--primary-color)' : 'var(--secondary-color)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.opacity = Math.random() * 0.5;
                particle.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
                particle.style.pointerEvents = 'none';
                
                heroSection.appendChild(particle);
            }
        }

        // Initialize particles on page load
        window.addEventListener('load', createParticles);