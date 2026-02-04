
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(0, 0, 0, 1)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
});


window.addEventListener('load', () => {
    const content = document.querySelector('.content');
    content.style.opacity = '1';
});