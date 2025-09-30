// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
    } else {
        scrollToTopBtn.style.opacity = '0';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add scroll reveal animations (optional)
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('section');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('opacity-100');
            reveal.classList.remove('opacity-0');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get references to DOM elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const lightIcon = document.getElementById('light-icon');
    const darkIcon = document.getElementById('dark-icon');

    // Check if elements exist to prevent errors
    if (!themeToggleBtn || !lightIcon || !darkIcon) {
        console.error('Theme toggle elements not found');
        return;
    }

    // Function to set theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
            localStorage.setItem('theme', 'light');
        }
    }

    // Check initial theme
    if (localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle theme when button is clicked
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            setTheme('light');
        } else {
            setTheme('dark');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Image loading animation
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';

        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const technologies = [
        'JavaScript', 'PHP', 'Python', 'React', 'Vue.js',
        'Laravel', 'Node.js', 'TypeScript', 'MongoDB',
        'PostgreSQL', 'Docker', 'AWS', 'Git', 'REST API',
        'HTML5', 'CSS3', 'Tailwind', 'MySQL', 'Redis', 'Inertia.js',
        'Socket.io', 'Composer', 'Nginx', 'Apache'
    ];

    const container = document.getElementById('techBg');
    const sectionHeight = container.offsetHeight;
    const sectionWidth = container.offsetWidth;

    // Track occupied spaces
    const occupiedSpaces = [];

    function isSpaceOccupied(x, y, width, height) {
        const margin = 50; // Minimum space between elements
        return occupiedSpaces.some(space => {
            return !(x + width + margin < space.x ||
                x > space.x + space.width + margin ||
                y + height + margin < space.y ||
                y > space.y + space.height + margin);
        });
    }

    function findFreeSpace(textWidth, textHeight) {
        let attempts = 0;
        let x, y;

        do {
            x = Math.random() * (sectionWidth - textWidth);
            y = Math.random() * (sectionHeight - textHeight);
            attempts++;

            if (attempts > 50) return null; // Prevent infinite loop
        } while (isSpaceOccupied(x, y, textWidth, textHeight));

        return { x, y };
    }

    function createTechElement() {
        const tech = technologies[Math.floor(Math.random() * technologies.length)];
        const element = document.createElement('div');
        element.className = 'floating-tech';
        element.textContent = tech;

        // Estimate text dimensions
        const textWidth = tech.length * 15; // Rough estimate of text width
        const textHeight = 30; // Rough estimate of text height

        // Find free space
        const freeSpace = findFreeSpace(textWidth, textHeight);
        if (!freeSpace) return; // Skip if no free space found

        // Random size between 1rem and 1.5rem (smaller range)
        const size = 1 + Math.random() * 0.5;

        element.style.cssText = `
                left: ${freeSpace.x}px;
                top: ${freeSpace.y}px;
                font-size: ${size}rem;
                animation: fadeInOut ${2.5 + Math.random() * 1.5}s ease-in-out forwards;
                z-index: 1;
            `;

        // Track occupied space
        occupiedSpaces.push({
            x: freeSpace.x,
            y: freeSpace.y,
            width: textWidth,
            height: textHeight,
            element: element
        });

        container.appendChild(element);

        element.addEventListener('animationend', () => {
            const index = occupiedSpaces.findIndex(space => space.element === element);
            if (index > -1) {
                occupiedSpaces.splice(index, 1);
            }
            element.remove();
        });
    }

    // Create new elements periodically
    setInterval(createTechElement, 500); // One element per second

    // Initial elements
    for (let i = 0; i < 4; i++) {
        setTimeout(createTechElement, i * 800);
    }

    // Update occupied spaces on window resize
    window.addEventListener('resize', () => {
        occupiedSpaces.length = 0; // Clear occupied spaces
    });
});

// Global Geometric Animation
document.addEventListener('DOMContentLoaded', function () {
    const globalBg = document.getElementById('globalBg');
    if (!globalBg) return;

    const shapes = ['circle', 'square', 'diamond'];
    const colors = [
        'rgba(59, 130, 246, 0.08)', // blue - more subtle for global use
        'rgba(139, 92, 246, 0.08)',  // purple
        'rgba(16, 185, 129, 0.08)',  // emerald
        'rgba(245, 158, 11, 0.08)'   // amber
    ];

    function createGeometricShape() {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Random size between 12px and 35px (slightly smaller for global)
        const size = 12 + Math.random() * 23;

        shape.className = `floating-shape floating-${shapeType}`;
        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${Math.random() * 100}%;
            background: ${color};
            border-color: ${color.replace('0.08', '0.15')};
            animation-duration: ${20 + Math.random() * 15}s;
            animation-delay: ${Math.random() * 8}s;
        `;

        globalBg.appendChild(shape);

        // Remove element after animation
        shape.addEventListener('animationend', () => {
            shape.remove();
        });
    }

    function createPulseDot() {
        const dot = document.createElement('div');
        dot.className = 'pulse-dot';
        dot.style.cssText = `
            left: ${10 + Math.random() * 80}%;
            top: ${10 + Math.random() * 80}%;
            animation-delay: ${Math.random() * 4}s;
            opacity: 0.4;
        `;

        globalBg.appendChild(dot);

        // Remove after 8 seconds
        setTimeout(() => {
            dot.remove();
        }, 8000);
    }

    // Create shapes periodically - slower for global background
    setInterval(createGeometricShape, 3000); // New shape every 3 seconds
    setInterval(createPulseDot, 5000); // New pulse dot every 5 seconds

    // Initial shapes - fewer for subtlety
    for (let i = 0; i < 2; i++) {
        setTimeout(createGeometricShape, i * 1500);
    }

    // Initial pulse dots
    for (let i = 0; i < 4; i++) {
        setTimeout(createPulseDot, i * 1200);
    }
});