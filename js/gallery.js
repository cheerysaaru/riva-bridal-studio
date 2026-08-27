/* ============================================
   RIVAA BRIDAL STUDIO — Gallery JavaScript
   ============================================ */

(function () {
    'use strict';

    const galleryFilters = document.querySelectorAll('.gallery-filter');
    const galleryItems = document.querySelectorAll('.masonry-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentIndex = 0;
    let visibleItems = [];

    // Gallery Filtering
    function filterGallery(category) {
        visibleItems = [];

        galleryItems.forEach(function (item) {
            const itemCategory = item.getAttribute('data-category');

            if (category === 'all' || itemCategory === category) {
                item.style.display = '';
                visibleItems.push(item);
            } else {
                item.style.display = 'none';
            }
        });
    }

    galleryFilters.forEach(function (filter) {
        filter.addEventListener('click', function () {
            // Update active filter
            galleryFilters.forEach(function (f) {
                f.classList.remove('active');
            });
            this.classList.add('active');

            // Filter gallery
            const category = this.getAttribute('data-filter');
            filterGallery(category);
        });
    });

    // Lightbox
    function openLightbox(index) {
        if (!lightbox || !lightboxImage) return;

        currentIndex = index;
        const item = visibleItems[currentIndex];
        if (!item) return;

        const img = item.querySelector('img');
        if (img) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function showPrev() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        if (img && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    function showNext() {
        if (visibleItems.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleItems.length;
        const img = visibleItems[currentIndex].querySelector('img');
        if (img && lightboxImage) {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
        }
    }

    // Click events for gallery items
    galleryItems.forEach(function (item, index) {
        item.addEventListener('click', function () {
            // Find the index in visibleItems
            const visibleIndex = visibleItems.indexOf(item);
            if (visibleIndex !== -1) {
                openLightbox(visibleIndex);
            }
        });
    });

    // Lightbox controls
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }

    // Close lightbox on overlay click
    if (lightbox) {
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', function (e) {
        if (!lightbox || !lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrev();
                break;
            case 'ArrowRight':
                showNext();
                break;
        }
    });

    // Initialize visible items
    visibleItems = Array.from(galleryItems);

})();
