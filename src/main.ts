import './style.css';
import { familyData } from './familyData';
import type { FamilyMember } from './familyData';
import { initLeaves } from './leaves';

// Helper to get season from generation
const getSeasonForGen = (gen: number): string => {
  switch (gen) {
    case 1: return 'autumn';
    case 2: return 'summer';
    case 3: return 'spring';
    case 4: return 'winter';
    default: return 'autumn';
  }
};

const getSeasonIcon = (gen: number): string => {
  switch (gen) {
    case 1: return '??'; // Autumn
    case 2: return '??'; // Summer
    case 3: return '??'; // Spring
    case 4: return '??'; // Winter
    default: return '??';
  }
};

const getGenTitle = (gen: number): string => {
  switch (gen) {
    case 1: return 'Generation 1: Modern Era & Current';
    case 2: return 'Generation 2: Maturation & Flourishing';
    case 3: return 'Generation 3: Foundations & Growth';
    case 4: return 'Generation 4: Roots & Ancestors';
    default: return `Generation ${gen}`;
  }
};

// Group data by generation
const groupedData: Record<number, FamilyMember[]> = {
  1: [], 2: [], 3: [], 4: []
};

familyData.forEach(member => {
  if (groupedData[member.generation]) {
    groupedData[member.generation].push(member);
  }
});

// Build HTML Structure
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <section class="hero">
    <h1 class="serif">Seasons of Generations</h1>
    <p>Journey through the timeline of our family tree. Watch the seasons change as we trace our roots from the historic winter of our ancestors to the vibrant autumn of the present.</p>
    <div class="scroll-indicator">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
    </div>
  </section>

  <div class="tree-container">
    ${[1, 2, 3, 4].map(gen => `
      <section class="generation-section" id="gen-${gen}" data-season="${getSeasonForGen(gen)}">
        <div class="generation-header">
          <span class="season-icon">${getSeasonIcon(gen)}</span>
          <h2 class="serif">${getGenTitle(gen)}</h2>
        </div>
        <div class="nodes-container">
          ${groupedData[gen].map(member => `
            <div class="node-wrapper">
              <div class="family-card" data-id="${member.id}">
                <div class="avatar-container">
                  ${member.photoUrl && !member.photoUrl.startsWith('[PASTE') ? `<img src="${member.photoUrl}" alt="${member.name}" onerror="this.style.display='none'">` : member.name.charAt(0)}
                </div>
                <div class="card-content">
                  <span class="relation-tag">${member.relation}</span>
                  <h3 class="serif">${member.name}</h3>
                  ${member.lifespan ? `<div class="lifespan">${member.lifespan}</div>` : ''}
                  <p class="short-bio">${member.shortBio}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `).join('')}
  </div>

  <!-- Modal -->
  <div class="modal-overlay" id="detail-modal">
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <div id="modal-body-content"></div>
    </div>
  </div>
`;

// Intersection Observer for Theme Morphing
const sections = document.querySelectorAll('.generation-section');
const rootElement = document.documentElement;

const observerOptions = {
  root: null,
  rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of viewport
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

// Modal Logic
const modal = document.getElementById('detail-modal')!;
const closeBtn = document.querySelector('.close-btn')!;
const modalBodyContent = document.getElementById('modal-body-content')!;
const cards = document.querySelectorAll('.family-card');

cards.forEach(card => {
  card.addEventListener('click', (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const member = familyData.find(m => m.id === id);

    if (member) {
      modalBodyContent.innerHTML = `
        <div class="modal-header">
          ${member.photoUrl && !member.photoUrl.startsWith('[PASTE')
          ? `<img src="${member.photoUrl}" alt="${member.name}" class="modal-avatar" onerror="this.style.display='none'">`
          : `<div class="avatar-container" style="width:120px;height:120px;">${member.name.charAt(0)}</div>`}
          <div>
            <span class="relation-tag">${member.relation}</span>
            <h2 class="serif">${member.name}</h2>
            ${member.lifespan ? `<div class="lifespan">${member.lifespan}</div>` : ''}
          </div>
        </div>
        <div class="modal-body">
          <p>${member.shortBio}</p>
          ${member.notableMilestones && member.notableMilestones.length > 0 && !member.notableMilestones[0].startsWith('[PASTE') ? `
            <div class="modal-milestones">
              <h4>Notable Milestones</h4>
              <ul>
                ${member.notableMilestones.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
        </div>
      `;

      modal.classList.add('active');
    }
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
  }
});

// Initialize falling leaves
initLeaves();
