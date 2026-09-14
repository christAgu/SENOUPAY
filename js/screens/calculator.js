// Project Estimation Calculator — Webfluin Studio

const SERVICE_CONFIG = {
  design: { base: 399, perPage: 100 },
  development: { base: 199, perPage: 100 },
  both: { base: 499, perPage: 200 },
};

const state = {
  serviceType: 'both',
  pages: 5,
  needContent: false,
  needSEO: false,
  timeline: 'regular',
};

function calculatePrice() {
  const { base, perPage } = SERVICE_CONFIG[state.serviceType];
  let total = Math.max(base, base + (state.pages - 1) * perPage);
  if (state.needContent) total += state.pages * 50;
  if (state.needSEO) total += state.pages * 50;
  if (state.timeline === 'rush') total += state.pages * 100;
  if (state.timeline === 'fast') total += state.pages * 25;
  return total;
}

function calculateAgencyCost() {
  const perPage = state.serviceType === 'both' ? 1000 : 400;
  return 8000 + (state.pages - 1) * perPage;
}

function calculateFreelancerCost() {
  const perPage = state.serviceType === 'both' ? 500 : 200;
  return 3000 + (state.pages - 1) * perPage;
}

function formatPrice(amount) {
  return `$${amount.toLocaleString()}`;
}

function updatePagesLabel() {
  const label = document.getElementById('calc-pages-label');
  if (label) {
    label.textContent = state.pages;
  }
}

function updatePrices() {
  document.getElementById('calc-agency-price').textContent = formatPrice(calculateAgencyCost());
  document.getElementById('calc-freelancer-price').textContent = formatPrice(calculateFreelancerCost());
  document.getElementById('calc-your-price').textContent = formatPrice(calculatePrice());
}

function updateSliderUI() {
  const slider = document.getElementById('calc-pages-slider');
  const thumb = slider.querySelector('.calc-slider-thumb');
  const range = slider.querySelector('.calc-slider-range');
  const min = 1;
  const max = 30;
  const pct = ((state.pages - min) / (max - min)) * 100;

  range.style.width = `${pct}%`;
  thumb.style.left = `calc(${pct}% - 0.4375rem)`;
  thumb.style.transform = 'translateY(-50%)';
  slider.setAttribute('aria-valuenow', state.pages);
}

function bindRadioGroup(name, key) {
  document.querySelectorAll(`input[name="${name}"]`).forEach((input) => {
    input.addEventListener('change', () => {
      if (input.checked) {
        state[key] = input.value;
        updatePrices();
      }
    });
  });
}

function bindCheckboxes() {
  document.getElementById('calc-need-content').addEventListener('change', (e) => {
    state.needContent = e.target.checked;
    updatePrices();
  });
  document.getElementById('calc-need-seo').addEventListener('change', (e) => {
    state.needSEO = e.target.checked;
    updatePrices();
  });
}

function bindSlider() {
  const slider = document.getElementById('calc-pages-slider');
  const track = slider.querySelector('.calc-slider-track');
  const thumb = slider.querySelector('.calc-slider-thumb');
  const min = 1;
  const max = 30;

  function setPagesFromClientX(clientX) {
    const rect = track.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    state.pages = Math.round(min + ratio * (max - min));
    updatePagesLabel();
    updateSliderUI();
    updatePrices();
  }

  thumb.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const onMove = (ev) => setPagesFromClientX(ev.clientX);
    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });

  thumb.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const onMove = (ev) => setPagesFromClientX(ev.touches[0].clientX);
    const onEnd = () => {
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
    };
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);
  }, { passive: false });

  track.addEventListener('click', (e) => setPagesFromClientX(e.clientX));

  thumb.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      state.pages = Math.min(max, state.pages + 1);
      updatePagesLabel();
      updateSliderUI();
      updatePrices();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      state.pages = Math.max(min, state.pages - 1);
      updatePagesLabel();
      updateSliderUI();
      updatePrices();
    }
  });
}

function bindFeaturedCardCopy() {
  const { toast } = useToast();
  document.getElementById('calc-your-card').addEventListener('click', async () => {
    const price = formatPrice(calculatePrice());
    try {
      await navigator.clipboard.writeText(price);
      toast({ title: 'Copied!', description: `${price} estimate copied to clipboard` });
    } catch {
      toast({ title: 'Your estimate', description: price });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  bindRadioGroup('service-type', 'serviceType');
  bindRadioGroup('timeline', 'timeline');
  bindCheckboxes();
  bindSlider();
  bindFeaturedCardCopy();
  updatePagesLabel();
  updateSliderUI();
  updatePrices();
});
