
(function() {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.navigation-menu');
    let activeItem = document.querySelector('.navigation__link_active');

    menuBtn.addEventListener('click', toggleMenu);
    menu.addEventListener('click', toggleMenu);

    function toggleMenu(e) {
        let tagName = e.target.tagName;

        if(tagName === 'IMG') {
            menu.classList.toggle('navigation-menu_hidden');
        } else if(tagName === 'A') {
            changeActiveClass(e.target);
            menu.classList.toggle('navigation-menu_hidden');
        }
    }

    function changeActiveClass(target) {
        if(target == activeItem) return

        activeItem.classList.remove('navigation__link_active');
        target.classList.add('navigation__link_active');
        activeItem = target;
    }
})()