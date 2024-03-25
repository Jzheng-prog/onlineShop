const mobileMenuBTN = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu(){
    mobileMenu.classList.toggle('open');
}

mobileMenuBTN.addEventListener('click', toggleMobileMenu);