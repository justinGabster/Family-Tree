import './style.css';
import { familyData } from './familyData';
import type { FamilyMember } from './familyData';
import { initLeaves } from './leaves';

// Helper to look up member by id
const getMember = (id: string): FamilyMember => {
  const member = familyData.find(m => m.id === id);
  if (!member) {
    return {
      id,
      name: id,
      relation: '',
      generation: 1,
      photoUrl: ''
    };
  }
  return member;
};

// Helper for Panel 1 large horizontal cards
const renderHorizontalCard = (
  id: string,
  style: string
): string => {
  const member = getMember(id);
  const initial = member.name.charAt(0).toUpperCase();
  const hasPhoto = member.photoUrl && !member.photoUrl.startsWith('[PASTE');
  const avatarHtml = hasPhoto
    ? `<img src="${member.photoUrl}" alt="${member.name}" onerror="this.parentElement.innerHTML='${initial}'" />`
    : `<span>${initial}</span>`;

  return `
    <div 
      class="family-card horizontal-card" 
      style="${style}" 
      data-id="${member.id}" 
      tabindex="0" 
      role="button" 
      aria-label="${member.name}"
    >
      <div class="avatar-container horizontal-avatar">
        ${avatarHtml}
      </div>
      <div class="card-content horizontal-content">
        <h3 class="serif card-name horizontal-name">${member.name}</h3>
      </div>
    </div>
  `;
};

// Helper for Panels 2, 3, 4 individual vertical resting cards
const renderVerticalCard = (
  id: string,
  style: string,
  extraClasses = '',
  overrideName?: string
): string => {
  const member = getMember(id);
  const displayName = overrideName || member.name;
  const initial = displayName.charAt(0).toUpperCase();

  const isUnclickable = extraClasses.includes('card-unclickable') || id === 'siblings';
  const hasPhoto = member.photoUrl && !member.photoUrl.startsWith('[PASTE');
  const avatarHtml = hasPhoto
    ? `<img src="${member.photoUrl}" alt="${displayName}" onerror="this.parentElement.innerHTML='${initial}'" />`
    : `<span>${initial}</span>`;

  return `
    <div 
      class="family-card vertical-card ${extraClasses}" 
      style="${style}" 
      ${!isUnclickable ? `data-id="${member.id}" tabindex="0" role="button"` : ''} 
      aria-label="${displayName}"
    >
      <div class="avatar-container vertical-avatar">
        ${avatarHtml}
      </div>
      <div class="card-content vertical-content">
        <h3 class="serif card-name vertical-name">${displayName}</h3>
      </div>
    </div>
  `;
};

// Helper to render compact horizontal capsules (strictly for Calalang siblings on Panel 4)
const renderCapsule = (
  id: string,
  style: string,
  extraClasses = '',
  overrideName?: string
): string => {
  const member = getMember(id);
  const displayName = overrideName || member.name;
  const initial = displayName.charAt(0).toUpperCase();

  const hasPhoto = member.photoUrl && !member.photoUrl.startsWith('[PASTE');
  const avatarHtml = hasPhoto
    ? `<img src="${member.photoUrl}" alt="${displayName}" onerror="this.parentElement.innerHTML='${initial}'" />`
    : `<span>${initial}</span>`;

  return `
    <div 
      class="family-capsule ${extraClasses}" 
      style="${style}" 
      data-id="${member.id}" 
      tabindex="0" 
      role="button" 
      aria-label="${displayName}"
    >
      <div class="capsule-avatar">
        ${avatarHtml}
      </div>
      <span class="capsule-name">${displayName}</span>
    </div>
  `;
};

// Build HTML Structure
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <!-- Persistent Methodology Button (Top Left) -->
  <button class="methodology-btn" id="methodology-btn" type="button" aria-label="Methodology">
    <span class="methodology-btn-icon">📖</span>
    <span class="methodology-btn-text">Methodology</span>
  </button>

  <!-- Tree background container with flashlight effect (fixed full viewport, zero drift) -->
  <div class="tree-bg-container">
    <div class="tree-base-layer"></div>
    <div class="tree-color-layer"></div>
  </div>

  <div class="tree-container">
    
    <!-- ========================================================
         PANEL 1: GENERATION 1 (The Children / Future)
         Large Horizontal Cards (Photo left, Name right)
         ======================================================== -->
    <section class="generation-section" id="gen-1" data-season="spring">
      <div class="panel-inner">
        
        <!-- Right-Aligned Generation Title Header -->
        <div class="generation-header">
          <span class="season-icon">🌱</span>
          <h2 class="serif">1st Generation: The Future & Branches</h2>
        </div>

        <!-- 1st Generation Large Horizontal Cards -->
        ${renderHorizontalCard('justin', 'left: 28%; top: 38%;')}
        ${renderHorizontalCard('lance', 'left: 72%; top: 38%;')}

        <!-- Clean Solid Orthogonal Connector Lines (NO ARROWS, EXACT EDGES) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- Lines drop from bottom center of Justin and Lance cards -->
          <line x1="280" y1="465" x2="280" y2="620" />
          <line x1="720" y1="465" x2="720" y2="620" />
          <path d="M 280 620 L 720 620" />
          <line x1="500" y1="620" x2="500" y2="700" />
          
          <!-- From bottom of pill straight down to Generation 2 -->
          <line x1="500" y1="740" x2="500" y2="1000" />
        </svg>

        <!-- Single-Line Connector Pill Badge -->
        <div class="connector-pill" style="left: 50%; top: 72%;">Children of Cristina and Jeffrey</div>
      </div>

      <!-- Bouncing Scroll Down Indicator -->
      <button class="scroll-indicator" data-target="#gen-2" aria-label="Scroll to Generation 2">
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></svg>
      </button>
    </section>

    <!-- ========================================================
         PANEL 2: GENERATION 2 (Parents & Direct Aunts/Uncles)
         Individual Vertical Cards with Adequate Gap Spacing
         ======================================================== -->
    <section class="generation-section" id="gen-2" data-season="summer">
      <div class="panel-inner">
        <!-- Right-Aligned Generation Title Header -->
        <div class="generation-header">
          <span class="season-icon">☀︝</span>
          <h2 class="serif">2nd Generation: The Parents & Trunks</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (NO ARROWS, ZERO INTERSECTIONS) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- Inflow from Gen 1 at x=500, splits horizontally then drops to card tops -->
          <line x1="500" y1="0" x2="500" y2="80" />
          <path d="M 240 80 L 680 80" />
          
          <!-- Left branch: drops to TOP of Cristina card (not through it) -->
          <line x1="240" y1="80" x2="240" y2="145" />
          
          <!-- Right branch: drops to TOP of Jeffrey card (not through it) -->
          <line x1="680" y1="80" x2="680" y2="145" />

          <!-- Under Cristina: resumes from BOTTOM edge, connects down to Child pill -->
          <line x1="240" y1="355" x2="240" y2="560" />
          <line x1="240" y1="600" x2="240" y2="750" />
          <line x1="240" y1="750" x2="180" y2="750" />
          <line x1="180" y1="750" x2="180" y2="1000" />

          <!-- Under Jeffrey: resumes from BOTTOM edge to Children pill -->
          <line x1="680" y1="355" x2="680" y2="405" />
          <line x1="680" y1="405" x2="560" y2="405" />
          <line x1="560" y1="405" x2="560" y2="480" />

          <!-- Children of Florinda pill splits right with MORE SPACING from trunk -->
          <line x1="660" y1="500" x2="760" y2="500" />
          <line x1="760" y1="180" x2="760" y2="680" />
          <line x1="760" y1="180" x2="810" y2="180" />
          <line x1="760" y1="430" x2="810" y2="430" />
          <line x1="760" y1="680" x2="810" y2="680" />

          <!-- Downwards branches into Generation 3 (Marcelino & Florida) -->
          <line x1="560" y1="520" x2="560" y2="800" />
          <line x1="560" y1="800" x2="500" y2="800" />
          <line x1="500" y1="800" x2="500" y2="1000" />
          <line x1="560" y1="800" x2="760" y2="800" />
          <line x1="760" y1="800" x2="760" y2="1000" />
        </svg>

        <!-- Generation 2 Distinct Vertical Cards (Never Overlapping) -->
        ${renderVerticalCard('cristina', 'left: 24%; top: 25%;')}
        ${renderVerticalCard('jeffrey', 'left: 68%; top: 25%;')}

        <!-- Sibling vertical cards stacked on right with NO OVERLAP -->
        ${renderVerticalCard('janice', 'left: 86%; top: 18%;')}
        ${renderVerticalCard('jerome', 'left: 86%; top: 43%;')}
        ${renderVerticalCard('jefferex', 'left: 86%; top: 68%;')}

        <!-- Single-Line Connector Pill Badges with MORE SPACING from trunk -->
        <div class="connector-pill" style="left: 24%; top: 58%;">Child of Flordeliza and Domingo</div>
        <div class="connector-pill" style="left: 58%; top: 50%;">Children of Florinda and Marcelino</div>
      </div>

      <!-- Bouncing Scroll Down Indicator -->
      <button class="scroll-indicator" data-target="#gen-3" aria-label="Scroll to Generation 3">
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></svg>
      </button>
    </section>

    <!-- ========================================================
         PANEL 3: GENERATION 3 (Grandparents & Siblings)
         Distinct Vertical Cards with Vertical Separation
         ======================================================== -->
    <section class="generation-section" id="gen-3" data-season="autumn">
      <div class="panel-inner">
        <!-- Right-Aligned Generation Title Header -->
        <div class="generation-header">
          <span class="season-icon">🝝</span>
          <h2 class="serif">3rd Generation: The Grandparents & Foundations</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (Florida & Filomena connect to Pablo) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- Left branch: Enters at x=180, drops to TOP of Flordeliza -->
          <line x1="180" y1="0" x2="180" y2="175" />
          <!-- Resumes from BOTTOM of Flordeliza to TOP of Domingo -->
          <line x1="180" y1="385" x2="180" y2="455" />
          <!-- Resumes from BOTTOM of Domingo to pill -->
          <line x1="180" y1="665" x2="180" y2="760" />
          <line x1="180" y1="800" x2="180" y2="1000" />

          <!-- Center: Enters at x=500, drops to TOP of Marcelino, then to pill, then Gen 4 -->
          <line x1="500" y1="0" x2="500" y2="245" />
          <line x1="500" y1="455" x2="500" y2="560" />
          <line x1="500" y1="600" x2="500" y2="800" />
          
          <!-- Branch from center to Pablo line at x=780 -->
          <line x1="500" y1="800" x2="780" y2="800" />
          <line x1="500" y1="800" x2="500" y2="1000" />
          
          <!-- Right branch: Pablo line drops to Florida and Filomena -->
          <line x1="780" y1="800" x2="780" y2="175" />
          <!-- Resumes from BOTTOM of Florida to TOP of Filomena -->
          <line x1="780" y1="385" x2="780" y2="455" />
          <!-- Continue down from Filomena to Gen 4 -->
          <line x1="780" y1="665" x2="780" y2="1000" />
        </svg>

        <!-- Generation 3 Distinct Vertical Cards (Completely Separated) -->
        ${renderVerticalCard('flordeliza', 'left: 18%; top: 28%;')}
        ${renderVerticalCard('domingo', 'left: 18%; top: 56%;')}
        ${renderVerticalCard('marcelino', 'left: 50%; top: 35%;')}
        ${renderVerticalCard('florida', 'left: 78%; top: 28%;')}
        ${renderVerticalCard('filomena', 'left: 78%; top: 56%;')}

        <!-- Single-Line Connector Pill Badges -->
        <div class="connector-pill" style="left: 18%; top: 78%;">Child of Timoteo and Maria</div>
        <div class="connector-pill" style="left: 50%; top: 58%;">Children of Pablo and Gloria</div>
      </div>

      <!-- Bouncing Scroll Down Indicator -->
      <button class="scroll-indicator" data-target="#gen-4" aria-label="Scroll to Generation 4">
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></svg>
      </button>
    </section>

    <!-- ========================================================
         PANEL 4: GENERATION 4 (Roots & Extended Ancestry)
         Clean Timoteo & Maria Inflow + Compact Siblings Capsule
         ======================================================== -->
    <section class="generation-section" id="gen-4" data-season="winter">
      <div class="panel-inner">
        <!-- Right-Aligned Generation Title Header -->
        <div class="generation-header">
          <span class="season-icon">❄︝</span>
          <h2 class="serif">4th Generation: The Great Grandparents & Roots</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (Pablo & Gloria as parents) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- Left branch: Inflow enters at x=180, drops to TOP of Timoteo -->
          <line x1="180" y1="0" x2="180" y2="175" />
          <!-- Resumes from BOTTOM of Timoteo to TOP of Maria -->
          <line x1="180" y1="385" x2="180" y2="575" />

          <!-- Right branch: Inflow from x=780 drops to TOP of Pablo -->
          <line x1="780" y1="0" x2="780" y2="175" />
          <!-- Resumes from BOTTOM of Pablo to TOP of Gloria -->
          <line x1="780" y1="385" x2="780" y2="575" />
          <!-- Resumes from BOTTOM of Gloria down to Siblings capsule -->
          <line x1="780" y1="785" x2="780" y2="860" />

          <!-- From Siblings capsule to Calalang vertical bracket spine -->
          <line x1="720" y1="880" x2="670" y2="880" />
          <line x1="670" y1="180" x2="670" y2="880" />

          <!-- 8 Horizontal branches connecting to remaining Calalang capsules (not Pablo) -->
          <line x1="670" y1="180" x2="740" y2="180" />
          <line x1="670" y1="270" x2="740" y2="270" />
          <line x1="670" y1="360" x2="740" y2="360" />
          <line x1="670" y1="450" x2="740" y2="450" />
          <line x1="670" y1="540" x2="740" y2="540" />
          <line x1="670" y1="630" x2="740" y2="630" />
          <line x1="670" y1="720" x2="740" y2="720" />
          <line x1="670" y1="810" x2="740" y2="810" />
        </svg>

        <!-- Generation 4 Distinct Vertical Cards -->
        ${renderVerticalCard('timoteo', 'left: 18%; top: 28%;')}
        ${renderVerticalCard('maria', 'left: 18%; top: 68%;')}

        <!-- Right side: Pablo & Gloria as parents -->
        ${renderVerticalCard('pablo', 'left: 78%; top: 28%;')}
        ${renderVerticalCard('gloria', 'left: 78%; top: 68%;')}
        
        <!-- Siblings capsule below Gloria -->
        <div class="connector-pill siblings-capsule" style="left: 78%; top: 88%;" aria-label="Siblings">
          Siblings
        </div>

        <!-- Right Side: 8 Calalang Siblings (Pablo's siblings, not including him) -->
        ${renderCapsule('ely', 'left: 94%; top: 18%;')}
        ${renderCapsule('anicia', 'left: 94%; top: 27%;')}
        ${renderCapsule('linda', 'left: 94%; top: 36%;')}
        ${renderCapsule('tricing', 'left: 94%; top: 45%;')}
        ${renderCapsule('corazon', 'left: 94%; top: 54%;')}
        ${renderCapsule('rody', 'left: 94%; top: 63%;')}
        ${renderCapsule('erming', 'left: 94%; top: 72%;')}
        ${renderCapsule('juanito', 'left: 94%; top: 81%;')}
      </div>
    </section>

  </div>

  <!-- Detail Modal with 4:6 Vertical Aspect Ratio Wrapper -->
  <div class="modal-overlay" id="detail-modal">
    <div class="modal-content">
      <button class="close-btn" aria-label="Close dialog">&times;</button>
      <div id="modal-body-content"></div>
    </div>
  </div>
`;

// ========================================================
// Theme Morphing on Scroll (Intersection Observer)
// ========================================================
const sections = document.querySelectorAll('.generation-section');
const rootElement = document.documentElement;

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const season = entry.target.getAttribute('data-season');
      if (season) {
        rootElement.setAttribute('data-theme', season);
      }
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// ========================================================
// Scroll Indicator Click Handlers
// ========================================================
document.querySelectorAll<HTMLButtonElement>('.scroll-indicator').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetSelector = btn.getAttribute('data-target');
    if (targetSelector) {
      const targetElement = document.querySelector(targetSelector);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ========================================================
// Modal Logic (Detail & Methodology)
// Clean vertical format: Framed portrait photo on top, Name centered below
// ========================================================
const modal = document.getElementById('detail-modal')!;
const closeBtn = document.querySelector('.close-btn')!;
const modalBodyContent = document.getElementById('modal-body-content')!;

const setupClickableNode = (element: HTMLElement) => {
  element.addEventListener('click', () => {
    const id = element.getAttribute('data-id');
    if (!id || id === 'siblings') return;
    const member = familyData.find(m => m.id === id);

    if (member) {
      const initial = member.name.charAt(0).toUpperCase();
      const hasPhoto = member.photoUrl && !member.photoUrl.startsWith('[PASTE');
      const avatarHtml = hasPhoto
        ? `<img src="${member.photoUrl}" alt="${member.name}" />`
        : `<span>${initial}</span>`;

      modalBodyContent.innerHTML = `
        <div class="modal-vertical-layout">
          <!-- Photo on top -->
          <div class="modal-portrait-avatar">
            ${avatarHtml}
          </div>
          <!-- Name centered cleanly below photo -->
          <h3 class="serif modal-name">${member.name}</h3>
        </div>
      `;

      modal.classList.add('active');
    }
  });
};

// Attach click listeners to all clickable cards & capsules
document.querySelectorAll<HTMLElement>('.family-card:not(.card-unclickable), .family-capsule:not(.capsule-unclickable)').forEach(setupClickableNode);

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

const methodologyBtn = document.getElementById('methodology-btn');
if (methodologyBtn) {
  methodologyBtn.addEventListener('click', () => {
    modalBodyContent.innerHTML = `
      <div class="methodology-modal-content">
        <div class="methodology-header">
          <span class="relation-tag">Project Overview</span>
          <h2 class="serif">Methodology</h2>
          <p class="methodology-subtitle">How this family tree was researched and preserved</p>
        </div>
        <div class="methodology-body">
          <p>To build this family tree, I gathered stories and information by reaching out to our older and distant relatives, treating the whole thing like a personal research project. For my grandparents, these casual interviews brought back fond memories, everyday stories, and what they were like as people. I was also lucky enough to find old family albums, keepsakes, and journals with real vintage photos, which let me match their stories with clear faces from their era.</p>
          <p>Things were a bit trickier for my great-grandparents since no physical photographs survived through the years. Instead of leaving their profiles blank, I based their bios entirely on the oral stories passed down by our relatives. By cross-checking the details everyone remembered about their work, character, and life in the community, I was able to piece together an honest picture of who they were at the roots of our family.</p>
        </div>
      </div>
    `;
    modal.classList.add('active');
  });
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Escape key to close modal
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    modal.classList.remove('active');
  }
});

// ========================================================
// Pointer & Scroll Tracking for Flashlight Effect
// Centered dynamically on cursor without offset drift
// ========================================================
window.addEventListener('pointermove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

const updateScrollOffset = () => {
  const scrollY = app.scrollTop;
  document.documentElement.style.setProperty('--app-scroll-y', `${scrollY}px`);
};

app.addEventListener('scroll', updateScrollOffset, { passive: true });
updateScrollOffset();

// Initialize falling leaves animation
initLeaves();
