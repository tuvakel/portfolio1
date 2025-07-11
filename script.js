document.addEventListener('DOMContentLoaded', () => {
    // Magnetic cursor system
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Smooth cursor following
    function updateCursor() {
        const diffX = mouseX - cursorX;
        const diffY = mouseY - cursorY;
        
        cursorX += diffX * 0.1;
        cursorY += diffY * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Magnetic effect for interactive elements
    const magneticElements = document.querySelectorAll('.nav-item, .project-card, .mode-indicator');
    
    magneticElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
        });
        
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) * 0.15;
            const deltaY = (y - centerY) * 0.15;
            
            element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'translate(0, 0)';
        });
    });
    
    // --- Refactored Navigation System ---
    const navItems = document.querySelectorAll('.nav-item');
    
    // Map section names to their corresponding elements
    const contentSections = {
        'info': document.getElementById('bio-content'),
        'projects': document.getElementById('project-grid'),
        'skills': document.getElementById('skills-grid'),
        'blog': document.getElementById('experience-grid'),
        // New sections can be easily added here
    };

    // A single function to handle showing/hiding sections
    const showSection = (sectionName) => {
        // Hide all sections and remove active classes
        Object.values(contentSections).forEach(section => {
            if (section) { // Check if the section exists
                section.classList.remove('active');
            }
        });

        // A delay to allow the fade-out animation to complete
        setTimeout(() => {
            Object.values(contentSections).forEach(section => {
                if (section) {
                    section.style.display = 'none';
                }
            });

            // Show the target section
            const targetSection = contentSections[sectionName];
            if (targetSection) {
                targetSection.style.display = (sectionName === 'projects' || sectionName === 'skills') ? 'grid' : 'block';
                // A tiny delay to ensure the display property is set before adding the class
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 20);
            }
        }, 800); // This duration MUST match the CSS transition time
    };

    // --- Scroll-Based Navigation ---
    let currentSectionIndex = 0;
    let isThrottled = false;
    const scrollThrottleDuration = 800; // ms

    const navigateToSection = (index) => {
        // Clamp the index to be within the bounds of navItems
        currentSectionIndex = Math.max(0, Math.min(index, navItems.length - 1));

        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));

        // Add active class to the new current item
        const newActiveItem = navItems[currentSectionIndex];
        newActiveItem.classList.add('active');

        // Show the corresponding section
        const sectionName = newActiveItem.getAttribute('data-section');
        showSection(sectionName);
    };

    const handleWheel = (e) => {
        if (isThrottled) return;
        isThrottled = true;

        setTimeout(() => {
            isThrottled = false;
        }, scrollThrottleDuration);

        // Determine scroll direction
        if (e.deltaY > 0) { // Scrolling down
            if (currentSectionIndex < navItems.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            }
        } else { // Scrolling up
            if (currentSectionIndex > 0) {
                navigateToSection(currentSectionIndex - 1);
            }
        }
    };

    window.addEventListener('wheel', handleWheel);

    // Attach the click event listener to each nav item
    navItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navigateToSection(index);
        });
    });
    
    // Project card interactions
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) rotateX(5deg) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) scale(1)';
        });
    });
    
    // Mode toggle (placeholder for future dark mode)
    const modeToggle = document.getElementById('mode-toggle');
    modeToggle.addEventListener('click', () => {
        // Future dark mode implementation
        console.log('Mode toggle clicked - dark mode coming soon!');
    });
    
    // --- Dynamic Content Rendering from data.js ---
    function renderInfoSection() {
        const info = window.portfolioData.info;
        const bioContent = document.getElementById('bio-content');
        if (bioContent && info) {
            bioContent.innerHTML = `
                <h1 class="name">${info.name}</h1>
                <p class="subtitle">${info.subtitle}</p>
                <p class="bio">${info.bio.replace(/\n/g, '<br>')}</p>
                <div class="connect-label">Connect</div>
                <div class="social-icons">
                  ${info.socials.map(social => {
                    let icon = '';
                    switch(social.name) {
                      case 'GitHub':
                        icon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.35 1.9-1.33 2.74-1.05 2.74-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/></svg>`;
                        break;
                      case 'LinkedIn':
                        icon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>`;
                        break;
                      case 'CodePen':
                        icon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M21.438 7.012c-.007-.047-.021-.092-.032-.137-.016-.067-.032-.134-.057-.197-.021-.055-.049-.107-.077-.158-.03-.054-.06-.107-.098-.156-.035-.045-.076-.086-.117-.127-.045-.045-.09-.088-.142-.125-.002-.002-.003-.004-.005-.005l-8.25-5.25c-.348-.221-.797-.221-1.145 0l-8.25 5.25c-.002.001-.003.003-.005.005-.052.037-.097.08-.142.125-.041.041-.082.082-.117.127-.038.049-.068.102-.098.156-.028.051-.056.103-.077.158-.025.063-.041.13-.057.197-.011.045-.025.09-.032.137-.013.09-.02.181-.02.273v9.75c0 .092.007.183.02.273.007.047.021.092.032.137.016.067.032.134.057.197.021.055.049.107.077.158.03.054.06.107.098.156.035.045.076.086.117.127.045.045.09.088.142.125.002.002.003.004.005.005l8.25 5.25c.174.111.377.166.573.166s.399-.055.573-.166l8.25-5.25c.002-.001.003-.003.005-.005.052-.037.097-.08.142-.125.041-.041.082-.082.117-.127.038-.049.068-.102.098-.156.028-.051.056-.103.077-.158.025-.063.041-.13.057-.197.011-.045.025-.09.032-.137.013-.09.02-.181.02-.273v-9.75c0-.092-.007-.183-.02-.273zm-9.438 3.555-2.062-1.375 2.062-1.375 2.062 1.375-2.062 1.375zm-2.75-2.062-3.062 2.042v-4.083l3.062 2.041zm-4.062 3.062 2.625-1.75 2.187 1.458v2.25l-2.187 1.458-2.625-1.75v-1.666zm7.062 7.021-3.062-1.947 2.062-1.375 2.062 1.375-3.062 1.947zm7.062-5.271-2.625 1.75-2.187-1.458v-2.25l2.187-1.458 2.625 1.75v1.666zm-2-4.041 3.062-2.041v4.083l-3.062-2.042zm-2.5 3.021v-2.25l2.187-1.458 2.625 1.75-2.625 1.75-2.187-1.458zm-2.5 3.021v-2.25l2.187-1.458 2.625 1.75-2.625 1.75-2.187-1.458zm7.062 5.271-3.062-1.947 2.062-1.375 2.062 1.375-3.062 1.947zm-7.062-5.271-2.625-1.75 2.187-1.458v2.25l-2.187 1.458zm7.062-5.271-3.062 1.947-2.062-1.375 2.062-1.375 3.062 1.947zm-7.062 5.271-2.625 1.75 2.187 1.458v-2.25l-2.187-1.458zm7.062 5.271-3.062-1.947 2.062-1.375 2.062 1.375-3.062 1.947zm-7.062-5.271-2.625-1.75 2.187-1.458v2.25l-2.187 1.458zm7.062-5.271-3.062 1.947-2.062-1.375 2.062-1.375 3.062 1.947zm-7.062 5.271-2.625 1.75 2.187 1.458v-2.25l-2.187-1.458zm7.062 5.271-3.062-1.947 2.062-1.375 2.062 1.375-3.062 1.947z"/></svg>`;
                        break;
                      case 'Instagram':
                        icon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07 5.77.128 4.77.312 4.01.54c-.77.23-1.42.54-2.07 1.19-.65.65-.96 1.3-1.19 2.07C.312 4.77.128 5.77.07 7.052.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.282.242 2.282.47 3.042.23.77.54 1.42 1.19 2.07.65.65 1.3.96 2.07 1.19.76.228 1.76.412 3.042.47C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.282-.058 2.282-.242 3.042-.47.77-.23 1.42-.54 2.07-1.19.65-.65.96-1.3 1.19-2.07.228-.76.412-1.76.47-3.042.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.282-.242-2.282-.47-3.042-.23-.77-.54-1.42-1.19-2.07-.65-.65-1.3-.96-2.07-1.19-.76-.228-1.76-.412-3.042-.47C15.668.012 15.264 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm7.844-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>`;
                        break;
                      case 'Goodreads':
                        icon = `<svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M17.5 2c-2.5 0-4.5 2-4.5 4.5S15 11 17.5 11 22 9 22 6.5 20 2 17.5 2zm0 7C16.1 9 15 7.9 15 6.5S16.1 4 17.5 4 20 5.1 20 6.5 18.9 9 17.5 9zM6.5 2C4 2 2 4 2 6.5S4 11 6.5 11 11 9 11 6.5 9 2 6.5 2zm0 7C5.1 9 4 7.9 4 6.5S5.1 4 6.5 4 9 5.1 9 6.5 7.9 9 6.5 9zM12 13c-2.5 0-4.5 2-4.5 4.5S9.5 22 12 22s4.5-2 4.5-4.5S14.5 13 12 13zm0 7c-1.4 0-2.5-1.1-2.5-2.5S10.6 15 12 15s2.5 1.1 2.5 2.5S13.4 20 12 20z"/></svg>`;
                        break;
                    }
                    return `<a href="${social.url}" class="social-link" target="_blank" rel="noopener" aria-label="${social.name}">${icon}</a>`;
                  }).join('')}
                </div>
            `;
        }
    }

    function renderProjectsSection() {
        const projects = window.portfolioData.projects;
        const projectGrid = document.getElementById('project-grid');
        if (projectGrid && projects) {
            projectGrid.innerHTML = projects.map(project => {
                const clickable = project.url ? `onclick=\"window.open('${project.url}', '_blank')\" style=\"cursor:pointer\"` : '';
                return `
                <div class="project-card" ${clickable}>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                `;
            }).join('');
        }
    }

    function renderSkillsSection() {
        const skills = window.portfolioData.skills;
        const skillsGrid = document.getElementById('skills-grid');
        if (skillsGrid && skills) {
            skillsGrid.innerHTML = skills.map(skillCat => `
                <div class="project-card">
                    <h3 class="project-title">${skillCat.category}</h3>
                    <div class="project-tech">
                        ${skillCat.items.map(item => `<span class="tech-tag">${item}</span>`).join('')}
                    </div>
                </div>
            `).join('');
        }
    }
    
    function renderExperienceSection() {
        const experience = window.portfolioData.experience;
        const experienceGrid = document.getElementById('experience-grid');
        if (experienceGrid && experience) {
            experienceGrid.innerHTML = experience.map(exp => `
                <div class="experience-card">
                  <div class="experience-meta">
                    <span class="experience-duration">${exp.duration}</span>
                  </div>
                  <div class="experience-main">
                    <div class="experience-title-row">
                      <h3 class="experience-title">${exp.title}</h3>
                      ${exp.companyUrl ? `<a href="${exp.companyUrl}" class="experience-company" target="_blank" rel="noopener">${exp.company} <span class="external-link">↗</span></a>` : `<span class="experience-company">${exp.company}</span>`}
                    </div>
                    <p class="experience-description">${exp.description}</p>
                    <div class="experience-tech">
                        ${exp.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                  </div>
                </div>
            `).join('');
        }
    }

    // Render all sections on DOMContentLoaded
    renderInfoSection();
    renderProjectsSection();
    renderSkillsSection();
    renderExperienceSection();
    
    // Initialize cursor animation
    updateCursor();
    
    // Breathing effect for project cards (optimized with requestAnimationFrame)
    function animateCards() {
        projectCards.forEach((card, index) => {
            if (!card.matches(':hover')) {
                card.style.transform = `translateY(${Math.sin(Date.now() * 0.001 + index) * 2}px)`;
            }
        });
        requestAnimationFrame(animateCards);
    }
    animateCards();

    // Set 'Info' as the default section on page load
    navigateToSection(0);
    
    // Remove the particle canvas if it exists
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas) {
        particleCanvas.parentNode.removeChild(particleCanvas);
    }
    
    // Remove the SVG particle system overlay if it exists
    const particleSVG = document.getElementById('particle-svg');
    if (particleSVG) {
        particleSVG.parentNode.removeChild(particleSVG);
    }
    
    // --- Two Big Circles Following Cursor ---
    const big1 = document.querySelector('.cursor-big-1');
    const big2 = document.querySelector('.cursor-big-2');
    let big1X = 0, big1Y = 0, big2X = 0, big2Y = 0;
    function updateBigCircles() {
        // Big1 follows cursor closely
        big1X += (mouseX - big1X) * 0.18;
        big1Y += (mouseY - big1Y) * 0.18;
        big1.style.transform = `translate(-50%, -50%) translate(${big1X}px, ${big1Y}px)`;
        // Big2 follows with more lag
        big2X += (mouseX - big2X) * 0.08;
        big2Y += (mouseY - big2Y) * 0.08;
        big2.style.transform = `translate(-50%, -50%) translate(${big2X}px, ${big2Y}px)`;
        requestAnimationFrame(updateBigCircles);
    }
    updateBigCircles();
});