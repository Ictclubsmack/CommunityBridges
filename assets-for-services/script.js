// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        e.target !== mobileMenuBtn) {
        mobileMenu.classList.remove('active');
    }
});

// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// Add animation on scroll for service cards
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Add animation class for CSS
document.head.insertAdjacentHTML('beforeend', `
<style>
    .service-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .service-card.animate {
        opacity: 1;
        transform: translateY(0);
    }
    .service-card:nth-child(2) {
        transition-delay: 0.2s;
    }
    .service-card:nth-child(3) {
        transition-delay: 0.4s;
    }
</style>
`);