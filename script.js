// FIXED & UPGRADED NAVIGATION MENU CONTROLLER
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

// Toggle mobile dropdown action
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    
    if (mobileMenu.classList.contains('hidden')) {
        // Open Menu
        mobileMenu.classList.remove('hidden');
        // Use a short timeout so transition animation triggers correctly
        setTimeout(() => {
            mobileMenu.classList.remove('opacity-0', '-translate-y-4');
            mobileMenu.classList.add('opacity-100', 'translate-y-0');
        }, 20);
        menuIcon.className = "fa-solid fa-xmark text-xl transform rotate-90 transition-all duration-300 text-brand-600";
    } else {
        // Close Menu
        closeMobileMenu();
    }
});

function closeMobileMenu() {
    mobileMenu.classList.remove('opacity-100', 'translate-y-0');
    mobileMenu.classList.add('opacity-0', '-translate-y-4');
    menuIcon.className = "fa-solid fa-bars text-xl transform rotate-0 transition-all duration-300";
    
    // Wait for transition end before completely hiding elements
    setTimeout(() => {
        if (mobileMenu.classList.contains('opacity-0')) {
            mobileMenu.classList.add('hidden');
        }
    }, 300);
}

// Close mobile menu when clicking outside of the navbar
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        if (!mobileMenu.classList.contains('hidden')) {
            closeMobileMenu();
        }
    }
});

// Close mobile dropdown when selecting any link option
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});

// Safe Auto-Close handler when viewport expands past mobile breakpoint width
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('opacity-100', 'translate-y-0');
        mobileMenu.classList.add('opacity-0', '-translate-y-4');
        menuIcon.className = "fa-solid fa-bars text-xl";
    }
});

// SCROLL CONTROLLERS: Scroll progress indicator & ScrollSpy highlights
window.addEventListener('scroll', () => {
    // 1. Compute reading track bar percentage width
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('scroll-progress').style.width = scrolled + '%';

    // 2. Continuous ScrollSpy highlights updating
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');
    let activeId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            activeId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const targetId = link.getAttribute('href').substring(1);
        const underline = link.querySelector('span');
        
        if (targetId === activeId) {
            link.classList.add('text-brand-600');
            link.classList.remove('text-slate-600');
            if (underline) {
                underline.classList.remove('scale-x-0');
                underline.classList.add('scale-x-100');
            }
        } else {
            link.classList.remove('text-brand-600');
            link.classList.add('text-slate-600');
            if (underline) {
                underline.classList.remove('scale-x-100');
                underline.classList.add('scale-x-0');
            }
        }
    });
});

// Technical Skills Category Filtering
function filterSkills(category) {
    const tabs = document.querySelectorAll('.skill-tab');
    tabs.forEach(tab => {
        tab.className = "skill-tab px-5 py-2.5 rounded-full font-bold text-sm bg-white text-slate-600 hover:bg-slate-100 transition-all";
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.className = "skill-tab active px-5 py-2.5 rounded-full font-bold text-sm bg-brand-600 text-white shadow-md shadow-brand-600/10 transition-all";
    }

    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
        if(category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

