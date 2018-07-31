
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
            menu.classList.add('navigation-menu_hidden');
        }
    }

    function changeActiveClass(target) {
        if(target == activeItem) return

        activeItem.classList.remove('navigation__link_active');
        target.classList.add('navigation__link_active');
        activeItem = target;
    }
})()

class ScrollMenu {
    constructor() {
        this.menu = document.querySelector('.navigation-menu');
        this.scrollSize = 0;

        document.addEventListener('wheel', this.scrollElem.bind(this));

    }

    scrollElem(event) {
        this.hidden = this.menu.classList.contains('navigation-menu_hidden');

        if(!this.hidden) {

            if(document.documentElement.clientHeight > this.menu.scrollHeight) {
                event.preventDefault();
                return
            }

            this.scrollSize -= +event.deltaY / 2;

            if(this.scrollSize > 0) this.scrollSize = 0;
            if(this.scrollSize < document.documentElement.clientHeight - this.menu.scrollHeight) {
                this.scrollSize = document.documentElement.clientHeight - this.menu.scrollHeight;
            }

            this.menu.style.top = this.scrollSize + 'px';

            event.preventDefault();
        }
    }

}

class LogoAnimation {
    
    constructor() {
        this.logo = document.querySelector('.logo');

        this.logo.addEventListener('click', this.addAnimation.bind(this));
    }

    addAnimation() {
        let classList = this.logo.classList;

        if(!classList.contains('crash')) {
            this.logo.classList.add('crash');
        } else if(classList.contains('crash') && classList.contains('drop')) {
            classList.remove('crash');
            classList.remove('drop');
            classList.add('crash');
        } else {
            this.logo.classList.add('drop');
        }
        
    }
}

new ScrollMenu();
new LogoAnimation();