const mobileMenuBTN = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu(){
    mobileMenu.classList.toggle('open');
}
function mySearch() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const ul = document.getElementById('products-grid');
    const li = ul.getElementsByClassName('product-list');


    for (let i = 0; i < li.length; i++) {
        const titleElement = li[i].getElementsByClassName('product-title')[0]; 
        const txtValue = titleElement.textContent || titleElement.innerText;  //product name

        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}

mobileMenuBTN.addEventListener('click', toggleMobileMenu);