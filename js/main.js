/* ============================================
   RIVAA BRIDAL STUDIO — Main JavaScript
   ============================================ */

(function () {
    'use strict';

    // Page Loader
    var pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                pageLoader.classList.add('loaded');
            }, 600);
        });
    }

    // Header Scroll
    var header = document.getElementById('header');

    function handleScroll() {
        var currentScroll = window.pageYOffset;
        if (header) {
            if (currentScroll > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mobile Navigation
    var hamburger = document.getElementById('hamburger');
    var mobileNav = document.getElementById('mobileNav');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        var mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Scroll Reveal
    function initScrollReveal() {
        var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .clip-reveal');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -40px 0px'
            });

            revealElements.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            revealElements.forEach(function (el) {
                el.classList.add('revealed');
            });
        }
    }

    // Smooth Scrolling for anchor links
    function initSmoothScroll() {
        var anchorLinks = document.querySelectorAll('a[href^="#"]');
        anchorLinks.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var targetId = this.getAttribute('href');
                if (targetId === '#') return;

                var target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    var headerHeight = header ? header.offsetHeight : 0;
                    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Active Navigation Highlight
    function initActiveNav() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        var navLinks = document.querySelectorAll('.nav-links a');

        navLinks.forEach(function (link) {
            var href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize
    document.addEventListener('DOMContentLoaded', function () {
        initScrollReveal();
        initSmoothScroll();
        initActiveNav();
        initHeroParticles();
        initHero3D();
    });

    // Hero Particles
    function initHeroParticles() {
        var heroParticles = document.getElementById('heroParticles');
        if (!heroParticles) return;

        for (var i = 0; i < 20; i++) {
            var particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            heroParticles.appendChild(particle);
        }
    }

    // Hero 3D Mouse Tracking
    function initHero3D() {
        var hero = document.getElementById('hero');
        var imageWrapper = document.querySelector('.hero-image-wrapper');
        if (!hero || !imageWrapper) return;

        hero.addEventListener('mousemove', function (e) {
            var rect = hero.getBoundingClientRect();
            var x = (e.clientX - rect.left) / rect.width - 0.5;
            var y = (e.clientY - rect.top) / rect.height - 0.5;

            var rotateX = y * 8;
            var rotateY = -x * 8;
            var translateZ = 20;

            imageWrapper.style.transform = 
                'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateZ(' + translateZ + 'px)';
        });

        hero.addEventListener('mouseleave', function () {
            imageWrapper.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0px)';
            imageWrapper.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            setTimeout(function () {
                imageWrapper.style.transition = '';
            }, 800);
        });

        // Parallax on scroll
        window.addEventListener('scroll', function () {
            var scrolled = window.pageYOffset;
            var heroContent = document.querySelector('.hero-content');
            if (scrolled < window.innerHeight) {
                var parallaxY = scrolled * 0.4;
                var imageScale = 1.1 - (scrolled * 0.0002);
                imageWrapper.style.transform = 'translateY(' + parallaxY + 'px)';
                imageWrapper.querySelector('.hero-3d-image').style.transform = 'scale(' + imageScale + ')';
                
                if (heroContent) {
                    heroContent.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                }
            }
        }, { passive: true });
    }

})();
