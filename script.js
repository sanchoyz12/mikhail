/* 
   Script for Mikhail Kozlovsky Negotiation Site
   Includes: Custom Cursor, Vanilla Tilt, Scroll Reveal, SVG Animations
*/

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        // Use requestAnimationFrame for smooth cursor dot
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Delay for outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects on clickable elements
    const clickables = document.querySelectorAll('a, button, input, textarea, .tilt-card');
    clickables.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovered'));
    });

    // --- Navbar Scroll & Hamburger ---
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .reveal-up');

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                
                // Trigger SVG draw animations if inside
                const svgs = entry.target.querySelectorAll('.draw-line');
                if(svgs.length > 0) {
                    svgs.forEach(svg => {
                        svg.style.transition = "stroke-dashoffset 2s ease-in-out";
                        svg.style.strokeDashoffset = "0";
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Animate Hero Lines immediately
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('active');
        document.querySelectorAll('.hero-lines .draw-line').forEach(line => {
            line.style.transition = "stroke-dashoffset 2.5s cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s";
            line.style.strokeDashoffset = "0";
        });
        document.querySelectorAll('.reveal-up').forEach(el => el.classList.add('active'));
    }, 100);

    // --- Minimal Vanilla Tilt Implementation ---
    const tiltCards = document.querySelectorAll('[data-tilt]');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = "transform 0.5s ease";
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = "none";
        });
    });

    // --- Form Handling Mock ---
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.querySelector('.form-success-msg');
    const submitBtn = document.querySelector('.submit-btn');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple submit animation
            submitBtn.innerHTML = '<span>Отправка...</span>';
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = '<span>Отправлено ✓</span>';
                submitBtn.style.background = 'var(--text-main)';
                submitBtn.style.color = 'var(--bg-dark)';
                successMsg.style.display = 'block';
                
                // Show confetti effect conceptually by shaking or glow success
                contactForm.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.2)';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<span>Обсудить задачу</span>';
                    submitBtn.style = '';
                    successMsg.style.display = 'none';
                    contactForm.style.boxShadow = 'none';
                }, 4000);
            }, 1500);
        });
    }
});
