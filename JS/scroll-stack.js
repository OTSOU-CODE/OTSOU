/**
 * Sherif-Auto - ScrollStack Component (Vanilla JS Port - Optimized)
 * Matches 1:1 the React Bits ScrollStack component logic and settings.
 * Optimized with layout caching to eliminate layout thrashing during scroll.
 */
export default class ScrollStack {
  constructor(options = {}) {
    this.container = typeof options.container === 'string' ? document.querySelector(options.container) : options.container;
    if (!this.container) return;

    this.itemDistance = options.itemDistance !== undefined ? options.itemDistance : 100;
    this.itemScale = options.itemScale !== undefined ? options.itemScale : 0.03;
    this.itemStackDistance = options.itemStackDistance !== undefined ? options.itemStackDistance : 30;
    this.stackPosition = options.stackPosition || '20%';
    this.scaleEndPosition = options.scaleEndPosition || '10%';
    this.baseScale = options.baseScale !== undefined ? options.baseScale : 0.85;
    this.scaleDuration = options.scaleDuration !== undefined ? options.scaleDuration : 0.5;
    this.rotationAmount = options.rotationAmount !== undefined ? options.rotationAmount : 0;
    this.blurAmount = options.blurAmount !== undefined ? options.blurAmount : 0;
    this.useWindowScroll = options.useWindowScroll !== undefined ? options.useWindowScroll : false;
    this.onStackComplete = options.onStackComplete;

    this.stackCompleted = false;
    this.lastTransforms = new Map();
    this.isUpdating = false;

    // Cache arrays
    this.cachedCardTops = [];
    this.cachedEndElementTop = 0;

    this.init();
  }

  init() {
    // Select cards based on scroll target (document or local wrapper)
    this.cards = Array.from(
      this.useWindowScroll
        ? document.querySelectorAll('.scroll-stack-card')
        : this.container.querySelectorAll('.scroll-stack-card')
    );

    this.endElement = this.useWindowScroll
      ? document.querySelector('.scroll-stack-end')
      : this.container.querySelector('.scroll-stack-end');

    this.cards.forEach((card, i) => {
      if (i < this.cards.length - 1) {
        card.style.marginBottom = `${this.itemDistance}px`;
      }
      card.style.willChange = 'transform, filter';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
      card.style.webkitBackfaceVisibility = 'hidden';
      card.style.transform = 'translateZ(0)';
      card.style.webkitTransform = 'translateZ(0)';
      card.style.perspective = '1000px';
      card.style.webkitPerspective = '1000px';
    });

    // Populate positions cache after setting style attributes
    this.cacheOffsets();

    this.setupLenis();
    this.updateCardTransforms();

    // Bind debounced resize listener to re-evaluate card coordinates when layout shifts
    let resizeTimeout;
    this.resizeListener = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.cacheOffsets();
        this.updateCardTransforms();
      }, 100);
    };
    window.addEventListener('resize', this.resizeListener);
    window.addEventListener('load', this.resizeListener);
  }

  cacheOffsets() {
    this.cachedCardTops = this.cards.map(card => this.getElementOffset(card));
    this.cachedEndElementTop = this.endElement ? this.getElementOffset(this.endElement) : 0;
  }

  calculateProgress(scrollTop, start, end) {
    if (scrollTop < start) return 0;
    if (scrollTop > end) return 1;
    return (scrollTop - start) / (end - start);
  }

  parsePercentage(value, containerHeight) {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return parseFloat(value);
  }

  getScrollData() {
    if (this.useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
        scrollContainer: document.documentElement
      };
    } else {
      const scroller = this.container;
      return {
        scrollTop: scroller.scrollTop,
        containerHeight: scroller.clientHeight,
        scrollContainer: scroller
      };
    }
  }

  getElementOffset(element) {
    if (this.useWindowScroll) {
      const rect = element.getBoundingClientRect();
      return rect.top + window.scrollY;
    } else {
      return element.offsetTop;
    }
  }

  updateCardTransforms() {
    if (!this.cards.length || this.isUpdating) return;

    this.isUpdating = true;

    const { scrollTop, containerHeight } = this.getScrollData();
    const stackPositionPx = this.parsePercentage(this.stackPosition, containerHeight);
    const scaleEndPositionPx = this.parsePercentage(this.scaleEndPosition, containerHeight);

    const endElementTop = this.cachedEndElementTop;

    this.cards.forEach((card, i) => {
      if (!card) return;

      const cardTop = this.cachedCardTops[i];
      const triggerStart = cardTop - stackPositionPx - this.itemStackDistance * i;
      const triggerEnd = cardTop - scaleEndPositionPx;
      const pinStart = cardTop - stackPositionPx - this.itemStackDistance * i;
      const pinEnd = endElementTop - containerHeight / 2;

      const scaleProgress = this.calculateProgress(scrollTop, triggerStart, triggerEnd);
      const targetScale = this.baseScale + i * this.itemScale;
      const scale = 1 - scaleProgress * (1 - targetScale);
      const rotation = this.rotationAmount ? i * this.rotationAmount * scaleProgress : 0;

      let blur = 0;
      if (this.blurAmount) {
        let topCardIndex = 0;
        for (let j = 0; j < this.cards.length; j++) {
          const jCardTop = this.cachedCardTops[j];
          const jTriggerStart = jCardTop - stackPositionPx - this.itemStackDistance * j;
          if (scrollTop >= jTriggerStart) {
            topCardIndex = j;
          }
        }

        if (i < topCardIndex) {
          const depthInStack = topCardIndex - i;
          blur = Math.max(0, depthInStack * this.blurAmount);
        }
      }

      let translateY = 0;
      const isPinned = scrollTop >= pinStart && scrollTop <= pinEnd;

      if (isPinned) {
        translateY = scrollTop - cardTop + stackPositionPx + this.itemStackDistance * i;
      } else if (scrollTop > pinEnd) {
        translateY = pinEnd - cardTop + stackPositionPx + this.itemStackDistance * i;
      }

      const newTransform = {
        translateY: Math.round(translateY * 100) / 100,
        scale: Math.round(scale * 1000) / 1000,
        rotation: Math.round(rotation * 100) / 100,
        blur: Math.round(blur * 100) / 100
      };

      const lastTransform = this.lastTransforms.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.rotation - newTransform.rotation) > 0.1 ||
        Math.abs(lastTransform.blur - newTransform.blur) > 0.1;

      if (hasChanged) {
        const transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale}) rotate(${newTransform.rotation}deg)`;
        const filter = newTransform.blur > 0 ? `blur(${newTransform.blur}px)` : '';

        card.style.transform = transform;
        card.style.filter = filter;

        this.lastTransforms.set(i, newTransform);
      }

      if (i === this.cards.length - 1) {
        const isInView = scrollTop >= pinStart && scrollTop <= pinEnd;
        if (isInView && !this.stackCompleted) {
          this.stackCompleted = true;
          if (this.onStackComplete) this.onStackComplete();
        } else if (!isInView && this.stackCompleted) {
          this.stackCompleted = false;
        }
      }
    });

    this.isUpdating = false;
  }

  setupLenis() {
    const handleScroll = () => this.updateCardTransforms();

    // To make scrolling completely instant and prevent spongy delay, we bypass Lenis smoothing on window scroll.
    if (window.Lenis) {
      let lenis;
      if (this.useWindowScroll) {
        // Direct native scroll binding for instant response matching the rest of the site
        const scrollTarget = window;
        scrollTarget.addEventListener('scroll', handleScroll);
        this.scrollListener = handleScroll;
        return;
      } else {
        const scroller = this.container;
        lenis = new window.Lenis({
          wrapper: scroller,
          content: scroller.querySelector('.scroll-stack-inner'),
          duration: 0.1,
          lerp: 0.95,
          smoothWheel: false, // Instant response for local containers
          syncTouch: false     // Instant response for local touch swipe
        });
      }

      lenis.on('scroll', handleScroll);

      const raf = time => {
        lenis.raf(time);
        this.animationFrame = requestAnimationFrame(raf);
      };
      this.animationFrame = requestAnimationFrame(raf);
      this.lenis = lenis;
    } else {
      const scrollTarget = this.useWindowScroll ? window : this.container;
      scrollTarget.addEventListener('scroll', handleScroll);
      this.scrollListener = handleScroll;
    }
  }

  destroy() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
    }
    if (this.lenis) {
      this.lenis.destroy();
    }
    if (this.scrollListener) {
      const scrollTarget = this.useWindowScroll ? window : this.container;
      scrollTarget.removeEventListener('scroll', this.scrollListener);
    }
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
      window.removeEventListener('load', this.resizeListener);
    }
    this.cards = [];
    this.lastTransforms.clear();
  }
}
