/**
 * XIBAS.DESIGN - Main JavaScript Logic
 * - Filtros dinâmicos de categoria
 * - Lightbox Modal para visualização em alta definição
 * - Copiar Discord para clipboard com notificação Toast
 * - Menu mobile interativo
 * - FAQ Accordion
 * - Destaque de navegação no scroll
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano no footer
  const currentYearEl = document.getElementById('currentYear');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // 2.1. Randomizador da Thumbnail em Destaque no Mockup do Hero
  const heroShowcaseList = [
    {
      src: 'assets/images/thumb_user_11.jpg',
      alt: 'Destaque Thumbnail Gamer - Hollow Knight Silksong',
      title: 'silksong_jornada.jpg',
      pill1Icon: '',
      pill1Text: 'Metroidvania / Silksong',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_10.jpg',
      alt: 'Destaque Thumbnail Gamer - Bloodborne',
      title: 'bloodborne_um_jogo_unico.jpg',
      pill1Icon: '',
      pill1Text: 'Souls / Bloodborne',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_9.jpg',
      alt: 'Destaque Thumbnail Gamer - Metal Gear Rising',
      title: 'metal_gear_aura_ego.jpg',
      pill1Icon: '',
      pill1Text: 'Ação / Metal Gear',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_6.jpg',
      alt: 'Destaque Thumbnail Gamer - The Witcher 3',
      title: 'the_witcher_o_melhor.jpg',
      pill1Icon: '',
      pill1Text: 'RPG / The Witcher 3',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_2.jpg',
      alt: 'Destaque Thumbnail Gamer - Elden Ring',
      title: 'elden_ring_segredo.jpg',
      pill1Icon: '',
      pill1Text: 'Souls / Elden Ring',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_7.jpg',
      alt: 'Destaque Thumbnail Gamer - Lies of P',
      title: 'lies_of_p_futuro.jpg',
      pill1Icon: '',
      pill1Text: 'Souls / Lies of P',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_4.jpg',
      alt: 'Destaque Thumbnail Gamer - Dark Souls',
      title: 'dark_souls_desastre.jpg',
      pill1Icon: '',
      pill1Text: 'Souls / Dark Souls',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_3.jpg',
      alt: 'Destaque Thumbnail Gamer - Metroidvania',
      title: 'metroidvania_era_de_ouro.jpg',
      pill1Icon: '',
      pill1Text: 'Metroidvania & Ação',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    },
    {
      src: 'assets/images/thumb_user_1.jpg',
      alt: 'Destaque Thumbnail Gamer - Dark Souls O Primeiro',
      title: 'dark_souls_o_primeiro.jpg',
      pill1Icon: '',
      pill1Text: 'Souls / Dark Souls',
      pill2Icon: '✨',
      pill2Text: '1080p Ultra HD'
    }
  ];

  function randomizeHeroMockup() {
    const heroPreviewImg = document.getElementById('heroPreviewImg');
    const heroPreviewTitle = document.querySelector('.preview-title');
    const heroPillCtr = document.querySelector('.pill-ctr');
    const heroPillQuality = document.querySelector('.pill-quality');

    if (!heroPreviewImg || heroShowcaseList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * heroShowcaseList.length);
    const chosen = heroShowcaseList[randomIndex];

    heroPreviewImg.src = chosen.src;
    heroPreviewImg.alt = chosen.alt;

    if (heroPreviewTitle) {
      heroPreviewTitle.textContent = chosen.title;
    }
    if (heroPillCtr) {
      heroPillCtr.innerHTML = `<span class="pill-icon">${chosen.pill1Icon}</span> <span>${chosen.pill1Text}</span>`;
    }
    if (heroPillQuality) {
      heroPillQuality.innerHTML = `<span class="pill-icon">${chosen.pill2Icon}</span> <span>${chosen.pill2Text}</span>`;
    }
  }

  randomizeHeroMockup();

  // 3. Carrossel & Filtros da Galeria
  const carouselWrapper = document.getElementById('portfolioCarouselWrapper');
  const carouselViewport = document.getElementById('carouselViewport');
  const carouselTrack = document.getElementById('portfolioTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const dotsContainer = document.getElementById('carouselDots');
  const currentSlideNum = document.getElementById('currentSlideNum');
  const totalSlidesNum = document.getElementById('totalSlidesNum');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const thumbCards = Array.from(document.querySelectorAll('.thumb-card'));

  let currentIndex = 0;
  let activeFilter = 'all';
  let visibleCards = [...thumbCards];
  let maxIndex = 0;
  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let movedDistance = 0;
  let autoplayTimer = null;
  let isHovered = false;

  function getStepSize() {
    if (visibleCards.length === 0) return 0;
    const cardWidth = visibleCards[0].offsetWidth;
    const style = window.getComputedStyle(carouselTrack);
    const gap = parseFloat(style.columnGap || style.gap) || 32;
    return cardWidth + gap;
  }

  function getSlidesPerView() {
    if (visibleCards.length === 0 || !carouselViewport) return 1;
    const step = getStepSize();
    if (step <= 0) return 1;
    return Math.max(1, Math.round(carouselViewport.clientWidth / step));
  }

  function updateCarouselState() {
    const slidesPerView = getSlidesPerView();
    maxIndex = Math.max(0, visibleCards.length - slidesPerView);
    if (currentIndex > maxIndex) {
      currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    }

    renderDots();
    updateSlidePosition(true);
    updateButtonsAndCounter();
  }

  function updateButtonsAndCounter() {
    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
    }
    if (nextBtn) {
      nextBtn.disabled = currentIndex >= maxIndex;
    }

    if (currentSlideNum && totalSlidesNum) {
      const current = Math.min(currentIndex + 1, Math.max(1, maxIndex + 1));
      const total = Math.max(1, maxIndex + 1);
      currentSlideNum.textContent = String(current).padStart(2, '0');
      totalSlidesNum.textContent = String(total).padStart(2, '0');
    }

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
        dot.setAttribute('aria-selected', idx === currentIndex ? 'true' : 'false');
      });
    }
  }

  function renderDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    const totalDots = maxIndex + 1;
    if (totalDots <= 1) return;

    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
      dot.setAttribute('aria-selected', i === currentIndex ? 'true' : 'false');
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateSlidePosition(smooth = true) {
    if (!carouselTrack) return;
    const step = getStepSize();
    const targetX = -(currentIndex * step);
    prevTranslate = targetX;
    currentTranslate = targetX;

    if (!smooth) {
      carouselTrack.classList.add('no-transition');
    } else {
      carouselTrack.classList.remove('no-transition');
    }

    carouselTrack.style.transform = `translateX(${targetX}px)`;

    if (!smooth) {
      void carouselTrack.offsetWidth;
      carouselTrack.classList.remove('no-transition');
    }
  }

  function goToSlide(index, smooth = true) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    updateSlidePosition(smooth);
    updateButtonsAndCounter();
  }

  function nextSlide() {
    if (currentIndex >= maxIndex) {
      goToSlide(0);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex <= 0) {
      goToSlide(maxIndex);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  // Filtros da Galeria com Carrossel
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      activeFilter = btn.getAttribute('data-category');

      thumbCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (activeFilter === 'all' || cardCategory === activeFilter) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      visibleCards = thumbCards.filter(card => card.style.display !== 'none');
      currentIndex = 0;
      updateCarouselState();
      resetAutoplay();
    });
  });

  // Gestos de Arrastar (Drag) e Toque (Swipe)
  function getClientX(e) {
    return e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
  }

  function dragStart(e) {
    if (visibleCards.length <= 1) return;
    if (e.type === 'mousedown' && e.button !== 0) return;

    isDragging = true;
    startX = getClientX(e);
    movedDistance = 0;
    carouselTrack.classList.add('no-transition');
    carouselViewport.classList.add('is-dragging');
    stopAutoplay();
  }

  function dragMove(e) {
    if (!isDragging) return;
    const currentX = getClientX(e);
    const diff = currentX - startX;
    movedDistance = Math.abs(diff);

    const step = getStepSize();
    const baseTranslate = -(currentIndex * step);
    let targetTranslate = baseTranslate + diff;

    // Resistência nas extremidades
    if (targetTranslate > 0) {
      targetTranslate = diff * 0.25;
    } else if (targetTranslate < -(maxIndex * step)) {
      const excess = targetTranslate - (-(maxIndex * step));
      targetTranslate = -(maxIndex * step) + excess * 0.25;
    }

    currentTranslate = targetTranslate;
    carouselTrack.style.transform = `translateX(${currentTranslate}px)`;
  }

  function dragEnd() {
    if (!isDragging) return;
    isDragging = false;
    carouselTrack.classList.remove('no-transition');
    carouselViewport.classList.remove('is-dragging');

    const diff = currentTranslate - prevTranslate;

    if (diff < -45 && currentIndex < maxIndex) {
      goToSlide(currentIndex + 1);
    } else if (diff > 45 && currentIndex > 0) {
      goToSlide(currentIndex - 1);
    } else {
      goToSlide(currentIndex);
    }

    resetAutoplay();
  }

  if (carouselViewport) {
    carouselViewport.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);

    carouselViewport.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('touchmove', dragMove, { passive: true });
    window.addEventListener('touchend', dragEnd);
  }

  // Autoplay Suave
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (!isHovered && !isDragging && maxIndex > 0) {
        nextSlide();
      }
    }, 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', () => {
      isHovered = true;
    });
    carouselWrapper.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Navegação por teclado
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
      if (lightboxModal && lightboxModal.classList.contains('active')) return;

      const rect = carouselWrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
          resetAutoplay();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
          resetAutoplay();
        }
      }
    });
  }

  // Redimensionamento de Tela
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarouselState();
    }, 100);
  });

  // Inicialização do Carrossel
  setTimeout(() => {
    updateCarouselState();
    startAutoplay();
  }, 50);

  // 4. Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTag = document.getElementById('lightboxTag');
  const lightboxCtr = document.getElementById('lightboxCtr');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxVideoBtn = document.getElementById('lightboxVideoBtn');
  const lightboxAction = document.getElementById('lightboxAction');

  function openLightbox(card) {
    const imgEl = card.querySelector('.thumb-media img');
    const tagEl = card.querySelector('.thumb-tag');
    const ctrEl = card.querySelector('.thumb-ctr-tag');
    const titleEl = card.querySelector('.thumb-title');
    const descEl = card.querySelector('.thumb-desc');
    const videoUrl = card.getAttribute('data-video');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt;
    }
    if (tagEl && lightboxTag) lightboxTag.textContent = tagEl.textContent;
    if (ctrEl && lightboxCtr) lightboxCtr.textContent = ctrEl.textContent;
    if (titleEl && lightboxTitle) lightboxTitle.textContent = titleEl.textContent;
    if (descEl && lightboxDesc) lightboxDesc.textContent = descEl.textContent;

    // Gerencia botão de YouTube
    if (lightboxVideoBtn) {
      if (videoUrl) {
        lightboxVideoBtn.href = videoUrl;
        lightboxVideoBtn.style.display = 'inline-flex';
        if (lightboxAction) lightboxAction.style.display = 'flex';
      } else {
        lightboxVideoBtn.removeAttribute('href');
        lightboxVideoBtn.style.display = 'none';
        if (lightboxAction) lightboxAction.style.display = 'none';
      }
    }

    lightboxModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  thumbCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Ignora clique se estava arrastando o carrossel
      if (movedDistance > 8) return;
      openLightbox(card);
    });
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 5. Copiar Discord com Toast Notification
  const copyDiscordBtn = document.getElementById('copyDiscordBtn');
  const toastNotification = document.getElementById('toastNotification');
  let toastTimeout;

  if (copyDiscordBtn) {
    copyDiscordBtn.addEventListener('click', async () => {
      const textToCopy = copyDiscordBtn.getAttribute('data-copy') || 'g6vgmdatmf63';
      const btnText = copyDiscordBtn.querySelector('.btn-text');

      try {
        await navigator.clipboard.writeText(textToCopy);
        
        // Feedback no botão
        if (btnText) {
          const originalText = btnText.textContent;
          btnText.textContent = 'Copiado! ✓';
          setTimeout(() => {
            btnText.textContent = originalText;
          }, 2000);
        }

        // Exibir Toast
        if (toastNotification) {
          clearTimeout(toastTimeout);
          toastNotification.classList.add('show');
          toastTimeout = setTimeout(() => {
            toastNotification.classList.remove('show');
          }, 3200);
        }
      } catch (err) {
        // Fallback caso clipboard API falhe
        prompt('Copie o usuário do Discord abaixo:', textToCopy);
      }
    });
  }

  // 6. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const isOpen = parent.classList.contains('open');

      // Fecha outros abertos
      document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== parent) {
          item.classList.remove('open');
          const otherAnswer = item.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        parent.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        parent.classList.remove('open');
        answer.style.maxHeight = null;
      }
    });
  });

  // 7. Navbar Active Indicator no Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
});
