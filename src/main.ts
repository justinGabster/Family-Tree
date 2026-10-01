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

  // Dynamic font size based on name length
  const nameLength = displayName.length;
  let fontSize = '0.95rem';
  if (nameLength > 18) {
    fontSize = '0.75rem';
  } else if (nameLength > 14) {
    fontSize = '0.82rem';
  } else if (nameLength > 10) {
    fontSize = '0.88rem';
  }

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
        <h3 class="serif card-name vertical-name" style="font-size: ${fontSize};">${displayName}</h3>
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
    <span class="methodology-btn-icon">?</span>
    <span class="methodology-btn-text">Methodology</span>
  </button>

  <!-- Music Player Button (Next to Methodology) -->
  <div class="music-player-container">
    <button class="music-btn" id="music-btn" type="button" aria-label="Toggle Music">
      <svg class="music-btn-icon" id="music-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </button>

    <!-- Music Player Controls Dropdown -->
    <div class="music-controls-dropdown" id="music-controls-dropdown">
      <!-- Track Progress -->
      <div class="track-controls">
        <span class="time-display" id="current-time">0:00</span>
        <input type="range" class="track-slider" id="track-slider" min="0" max="100" value="0" step="0.1">
        <span class="time-display" id="duration-time">0:00</span>
      </div>
      
      <!-- Volume Control -->
      <div class="volume-controls">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
        <input type="range" class="volume-slider" id="volume-slider" min="0" max="100" value="70" step="1">
        <span class="volume-display" id="volume-display">70%</span>
      </div>
    </div>
  </div>

  <!-- Hidden Audio Element -->
  <audio id="background-music" loop>
    <source src="/music.mp3?v=photograph" type="audio/mpeg">
  </audio>

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
          <span class="season-icon">I</span>
          <h2 class="serif">1st Generation: The Future & Branches</h2>
        </div>

        <!-- 1st Generation Large Horizontal Cards -->
        ${renderHorizontalCard('justin', 'left: 28%; top: 38%;')}
        ${renderHorizontalCard('lance', 'left: 72%; top: 38%;')}

        <!-- Clean Solid Orthogonal Connector Lines (NO ARROWS, EXACT EDGES) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- 
            HOW TO ADJUST LINES:
            - x1, y1 = start point (x: 0-1000 left?right, y: 0-1000 top?bottom)
            - x2, y2 = end point
            - VERTICAL line: x1=x2 (same x), adjust y values
            - HORIZONTAL line: y1=y2 (same y), adjust x values
          -->
          
          <!-- Justin card bottom ? down | Change y2 to lengthen/shorten -->
          <line x1="280" y1="465" x2="280" y2="620" />
          
          <!-- Lance card bottom ? down | Change y2 to lengthen/shorten -->
          <line x1="720" y1="465" x2="720" y2="620" />
          
          <!-- Horizontal: joins Justin & Lance | Change x1/x2 for width -->
          <path d="M 280 620 L 720 620" />
          
          <!-- Center ? down to pill | Change y2 for gap -->
          <line x1="500" y1="620" x2="500" y2="700" />
          
          <!-- Pill bottom ? down to Gen 2 | Change y1 to adjust gap from pill -->
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
          <span class="season-icon">II</span>
          <h2 class="serif">2nd Generation: The Parents & Trunks</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (NO ARROWS, ZERO INTERSECTIONS) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!--
            ADJUSTMENT GUIDE:
            x1,y1 = start | x2,y2 = end
            Vertical: x1=x2 | Horizontal: y1=y2
          -->
          
          <!-- From Gen 1 ? down | Adjust y2 for split point -->
          <line x1="500" y1="0" x2="500" y2="80" />
          
          <!-- Horizontal split: Cristina ? ? Jeffrey | Adjust x1/x2 for spacing -->
          <path d="M 240 80 L 680 80" />
          
          <!-- Split ? down to Cristina top | Adjust y2 to card top -->
          <line x1="240" y1="80" x2="240" y2="145" />
          
          <!-- Split ? down to Jeffrey top | Adjust y2 to card top -->
          <line x1="680" y1="80" x2="680" y2="145" />

          <!-- Cristina bottom ? down to pill area | Adjust y1 (card bottom) & y2 -->
          <line x1="240" y1="355" x2="240" y2="560" />
          <line x1="240" y1="600" x2="240" y2="750" />
          
          <!-- Turn left toward Flordeliza | Adjust x2 for position -->
          <line x1="240" y1="750" x2="180" y2="750" />
          
          <!-- Down to Gen 3 | Adjust y1/y2 for length -->
          <line x1="180" y1="750" x2="180" y2="1000" />

          <!-- Jeffrey bottom ? down | Adjust y1 (card bottom) -->
          <line x1="680" y1="355" x2="680" y2="405" />
          
          <!-- Turn left toward center pill | Adjust x2 for pill position -->
          <line x1="680" y1="405" x2="560" y2="405" />
          
          <!-- Down to Children pill | Adjust y2 to pill top -->
          <line x1="560" y1="405" x2="560" y2="480" />

          <!-- From Children pill ? right to siblings vertical trunk -->
          <line x1="660" y1="500" x2="760" y2="500" />
          
          <!-- Siblings vertical trunk | Adjust y1/y2 for range -->
          <line x1="760" y1="250" x2="760" y2="850" />
          
          <!-- Trunk ? Janice | Adjust x2 to capsule -->
          <line x1="760" y1="250" x2="810" y2="250" />
          
          <!-- Trunk ? Jerome | Adjust x2 to capsule -->
          <line x1="760" y1="550" x2="810" y2="550" />
          
          <!-- Trunk ? Jefferex | Adjust x2 to capsule -->
          <line x1="760" y1="850" x2="810" y2="850" />

          <!-- Children pill ? down | For Gen 3 branch -->
          <line x1="560" y1="520" x2="560" y2="800" />
          
          <!-- Horizontal split: Marcelino ? ? Florida -->
          <line x1="560" y1="800" x2="500" y2="800" />
          
          <!-- Marcelino branch ? down to Gen 3 -->
          <line x1="500" y1="800" x2="500" y2="1000" />
          
          <!-- Continue horizontal to Florida branch -->
          <line x1="560" y1="800" x2="760" y2="800" />
          
          <!-- Florida branch ? down to Gen 3 -->
          <line x1="730" y1="800" x2="730" y2="1000" />
        </svg>

        <!-- Generation 2 Cards -->
        ${renderHorizontalCard('cristina', 'left: 24%; top: 25%;')}
        ${renderVerticalCard('jeffrey', 'left: 68%; top: 25%;')}

        <!-- Sibling vertical cards stacked on right with INCREASED SPACING -->
        ${renderVerticalCard('janice', 'left: 86%; top: 25%;')}
        ${renderVerticalCard('jerome', 'left: 86%; top: 55%;')}
        ${renderVerticalCard('jefferex', 'left: 86%; top: 85%;')}

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
          <span class="season-icon">III</span>
          <h2 class="serif">3rd Generation: The Grandparents & Foundations</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (Florida & Filomena connect to Pablo) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- From Gen 2 down to Flordeliza top -->
          <line x1="180 " y1="0" x2="180" y2="165" />
          
          <!-- Flordeliza bottom to horizontal connector between Flordeliza and Domingo -->
         
          
          <!-- Horizontal connector between Flordeliza and Domingo (couple connection) -->
          <line x1="25" y1="250" x2="145" y2="250" />
          <line x1="25" y1="250" x2="25" y2="625" />
<line x1="25" y1="625" x2="145" y2="625" />
          
          <!-- Domingo bottom down to pill -->
          <line x1="180" y1="680" x2="180" y2="760" />
          
          <!-- Below pill down to Gen 4 -->
          <line x1="180" y1="800" x2="180" y2="1000" />

          <!-- From Gen 2 center down to Marcelino top -->
          <line x1="500" y1="0" x2="500" y2="245" />
          
          <!-- Bracket connecting Florida and Filomena on the left, fed by the Children pill -->

<!-- Vertical bracket spine between the tree and the two cards -->
<line x1="685" y1="285" x2="685" y2="580" />

<!-- Top branch into Florida left edge -->
<line x1="685" y1="285" x2="720" y2="285" />

<!-- Bottom branch into Filomena left edge -->
<line x1="685" y1="580" x2="720" y2="580" />

<!-- Stem from "Children of Pablo and Gloria" pill right edge into the bracket spine -->
<line x1="575" y1="580" x2="685" y2="580" />
                  
          <!-- Below pill down -->
          <line x1="550" y1="600" x2="550" y2="2000" />
          
          
          <!-- Enters through the top of Gen 3 down into Florida -->
<line x1="730" y1="0" x2="730" y2="165" />
         
                  </svg>

        <!-- Generation 3 Distinct Cards -->
        ${renderHorizontalCard('flordeliza', 'left: 18%; top: 25%;')}
        ${renderHorizontalCard('domingo', 'left: 18%; top: 58%;')}
        ${renderHorizontalCard('marcelino', 'left: 50%; top: 35%;')}
        ${renderVerticalCard('florida', 'left: 78%; top: 25%;')}
        ${renderVerticalCard('filomena', 'left: 78%; top: 58%;')}

        <!-- Single-Line Connector Pill Badges -->
        <div class="connector-pill" style="left: 18%; top: 78%;">Child of Timoteo and Maria</div>
        <div class="connector-pill" style="left: 60%; top: 58%;">Children of Pablo and Gloria</div>
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
          <span class="season-icon">IV</span>
          <h2 class="serif">4th Generation: The Great Grandparents & Roots</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines (Pablo & Gloria as parents) -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!--
            ADJUSTMENT GUIDE FOR PANEL 4:
            x1,y1 = start point | x2,y2 = end point
            VERTICAL line: x1=x2 (keep x same) | HORIZONTAL line: y1=y2 (keep y same)
            Coordinate system: x=0-1000 (left?right), y=0-1000 (top?bottom)
          -->
          
          <!-- LEFT SIDE: Timoteo & Maria branch -->
          <!-- From Gen 3 down to Timoteo top -->
          <line x1="180" y1="0" x2="180" y2="165" />
          
          <!-- Timoteo & Maria vertical connector bracket -->
          <line x1="60" y1="230" x2="60" y2="710" />
          <!-- Top horizontal branch -->
          <line x1="60" y1="230" x2="120" y2="230" />
          <!-- Bottom horizontal branch -->
          <line x1="60" y1="710" x2="120" y2="710" />

          <!-- RIGHT SIDE: Pablo, Gloria, & Siblings branch -->
          <!-- From Gen 3 down to Pablo top -->
          <line x1="550" y1="0" x2="550" y2="165" />
          

          <!-- Pablo & Gloria vertical connector bracket -->
          <line x1="485" y1="240" x2="525" y2="240" />
          <line x1="485" y1="240" x2="485" y2="685" />
          <line x1="600" y1="500" x2="600" y2="5000" />
          
          <!-- Pablo bottom edge -> Siblings top edge -->
          <line x1="700" y1="360" x2="700" y2="478" />

          <!-- Siblings right edge -> vertical sibling spine (x=798) -->
          <line x1="720" y1="478" x2="798" y2="478" />
          
          <!-- Vertical spine: connects all 8 siblings | Adjust y1 (top) & y2 (bottom) for spine length -->
          <line x1="798" y1="145" x2="798" y2="925" />

       <!-- 8 Horizontal branches: spine (x=798) ? sibling capsules (x=838) -->
          <!-- Branch to Ely (top sibling) -->
          <line x1="798" y1="145" x2="838" y2="145" />
          
          <!-- Branch to Anicia -->
          <line x1="798" y1="256" x2="838" y2="256" />
          
          <!-- Branch to Linda -->
          <line x1="798" y1="367" x2="838" y2="367" />
          
          <!-- Branch to Tricing (middle sibling) -->
          <line x1="798" y1="478" x2="838" y2="478" />
          
          <!-- Branch to Corazon -->
          <line x1="798" y1="590" x2="838" y2="590" />
          
          <!-- Branch to Rody -->
          <line x1="798" y1="701" x2="838" y2="701" />
          
          <!-- Branch to Erming -->
          <line x1="798" y1="812" x2="838" y2="812" />
          
          <!-- Branch to Juanito (bottom sibling) -->
          <line x1="798" y1="925" x2="838" y2="925" />
        </svg>

        <!-- Generation 4 Distinct Cards -->
        ${renderVerticalCard('timoteo', 'left: 18%; top: 25%;')}
        ${renderVerticalCard('maria', 'left: 18%; top: 70%;')}

        <!-- Right side: Pablo & Gloria as parents -->
        ${renderHorizontalCard('pablo', 'left: 65%; top: 25%;')}
        ${renderVerticalCard('gloria', 'left: 48%; top: 70%;')}
        
        <!-- Siblings capsule below Gloria -->
        <div class="connector-pill siblings-capsule" style="left: 66%; top: 48%;" aria-label="Children of Francisco and Anastacia">
          Children of Francisco and Anastacia
        </div>

        <!-- Right Side: 8 Calalang Siblings (Pablo's siblings, not including him) -->
        ${renderCapsule('ely', 'left: 88%; top: 15%;')}
        ${renderCapsule('anicia', 'left: 88%; top: 26%;')}
        ${renderCapsule('linda', 'left: 88%; top: 37%;')}
        ${renderCapsule('tricing', 'left: 88%; top: 48%;')}
        ${renderCapsule('corazon', 'left: 88%; top: 59%;')}
        ${renderCapsule('rody', 'left: 88%; top: 70%;')}
        ${renderCapsule('erming', 'left: 88%; top: 81%;')}
        ${renderCapsule('juanito', 'left: 88%; top: 92%;')}
      </div>

      <!-- Bouncing Scroll Down Indicator -->
      <button class="scroll-indicator" data-target="#gen-5" aria-label="Scroll to Generation 5">
        <svg viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" /></svg>
      </button>
    </section>

    <!-- ========================================================
         PANEL 5: GENERATION 5 (Ancient Roots & Origins)
         ======================================================== -->
    <section class="generation-section" id="gen-5" data-season="spring">
      <div class="panel-inner">
        <!-- Right-Aligned Generation Title Header -->
        <div class="generation-header">
          <span class="season-icon">V</span>
          <h2 class="serif">5th Generation: The Ancient Roots & Origins</h2>
        </div>

        <!-- Clean Solid Orthogonal Connector Lines -->
        <svg class="connector-svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <!-- Connector lines from Gen 4 -->
          
         
          <line x1="600" y1="0" x2="600" y2="200" />

          <!-- Couple bracket linking Francisco and Anastacia (left side) -->
          <line x1="460" y1="300" x2="485" y2="300" />
          <line x1="460" y1="300" x2="460" y2="650" />
          <line x1="460" y1="650" x2="485" y2="650" />
        </svg>

        <!-- Generation 5 Horizontal Cards -->
        ${renderHorizontalCard('francisco', 'left: 60%; top: 30%;')}
        ${renderHorizontalCard('anastacia', 'left: 60%; top: 65%;')}
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
          <p class="methodology-subtitle">How this family tree was researched and documented</p>
        </div>
        <div class="methodology-body">
          <h3>Data Collection & Research Approach</h3>
          <p>This project was carried out using a qualitative research approach to accurately identify four generations of family lineage and connections. Relatives were interviewed to trace lineages, confirm full names, and establish proper sibling groupings. Alongside these conversations, physical research was done by searching through old family journals, keepsake albums, and stored records. This made it possible to retrieve and digitize vintage photos, primarily across the second and third generations, ensuring authentic visual records were linked to each person's card.</p>
          
          <h3>Ethical Considerations</h3>
          <p>Respect and privacy were strictly prioritized throughout the project. Consent was gathered from living relatives prior to digitizing and displaying their portraits and full names in the interactive tree. For deceased relatives, care was taken to record their names, lineage ties, and identities with accuracy, dignity, and respect.</p>
          
          <h3>Limitations</h3>
          <p>The primary challenge encountered during the project was generational physical record loss. For some of the great-grandparents, no physical photographs, identification documents, or portraits survived through the decades. Because of this historical gap, their profiles are represented via initialed placeholder avatars, relying entirely on verified kinship accounts from living relatives rather than photographic proof.</p>
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

// ========================================================
// Music Player Functionality
// ========================================================
const musicBtn = document.getElementById('music-btn') as HTMLButtonElement;
const musicIcon = document.getElementById('music-icon') as unknown as SVGSVGElement;
const backgroundMusic = document.getElementById('background-music') as HTMLAudioElement;
const trackSlider = document.getElementById('track-slider') as HTMLInputElement;
const volumeSlider = document.getElementById('volume-slider') as HTMLInputElement;
const currentTimeDisplay = document.getElementById('current-time') as HTMLSpanElement;
const durationTimeDisplay = document.getElementById('duration-time') as HTMLSpanElement;
const volumeDisplay = document.getElementById('volume-display') as HTMLSpanElement;

let isPlaying = false;

// Set initial volume
backgroundMusic.volume = 0.7;

// Helper to update icon
function updateMusicIcon(isPlaying: boolean) {
  if (isPlaying) {
    musicIcon.innerHTML = `<rect x="6" y="4" width="4" height="16" fill="currentColor"></rect><rect x="14" y="4" width="4" height="16" fill="currentColor"></rect>`;
  } else {
    musicIcon.innerHTML = `<polygon points="5 3 19 12 5 21 5 3" fill="currentColor"></polygon>`;
  }
}

// Format time helper
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Play/Pause button click
musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    // Pause music
    backgroundMusic.pause();
    updateMusicIcon(false);
    musicBtn.classList.remove('playing');
    isPlaying = false;
  } else {
    // Play music
    backgroundMusic.play().catch(error => {
      console.error('Error playing music:', error);
    });
    updateMusicIcon(true);
    musicBtn.classList.add('playing');
    isPlaying = true;
  }
});

// Update track progress
backgroundMusic.addEventListener('timeupdate', () => {
  if (!backgroundMusic.duration) return;
  
  const progress = (backgroundMusic.currentTime / backgroundMusic.duration) * 100;
  trackSlider.value = progress.toString();
  currentTimeDisplay.textContent = formatTime(backgroundMusic.currentTime);
});

// Update duration display from the actual audio file (works for any track)
const updateDuration = () => {
  if (!isFinite(backgroundMusic.duration)) return;
  durationTimeDisplay.textContent = formatTime(backgroundMusic.duration);
};
backgroundMusic.addEventListener('loadedmetadata', updateDuration);
backgroundMusic.addEventListener('durationchange', updateDuration);
// In case metadata was already loaded (e.g. from cache) before listeners attached
if (backgroundMusic.readyState >= 1) updateDuration();

// Track slider input
trackSlider.addEventListener('input', () => {
  const seekTime = (parseFloat(trackSlider.value) / 100) * backgroundMusic.duration;
  backgroundMusic.currentTime = seekTime;
});

// Volume slider input
volumeSlider.addEventListener('input', () => {
  const volume = parseFloat(volumeSlider.value) / 100;
  backgroundMusic.volume = volume;
  volumeDisplay.textContent = `${volumeSlider.value}%`;
});

// Handle audio ended event (in case loop fails)
backgroundMusic.addEventListener('ended', () => {
  updateMusicIcon(false);
  musicBtn.classList.remove('playing');
  isPlaying = false;
});
