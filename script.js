'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const track = document.getElementById('track');
    const slides = document.querySelectorAll('.slide');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    const pager = document.getElementById('pager');

    let currentIndex = 0;
    let itemsPerView = 1; // По умолчанию для мобильных
    let totalItems = slides.length;

    function updateItemsPerView() {
        itemsPerView = window.innerWidth >= 768 ? 3 : 1;
    }

    function updateSlider() {
        const movePercent = -(currentIndex * (100 / itemsPerView));
        track.style.transform = `translateX(${movePercent}%)`;

        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function renderPager() {
        pager.innerHTML = ''; 
        updateItemsPerView();
        
        const maxIndex = totalItems - itemsPerView;
        
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }

        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === currentIndex) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            
            pager.appendChild(dot);
        }
    }

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    btnNext.addEventListener('click', () => {
        const maxIndex = totalItems - itemsPerView;
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        renderPager();
        updateSlider();
    });

    renderPager();
    updateSlider();
});