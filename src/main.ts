import './style.css';
import { familyData } from './familyData';
import type { FamilyMember } from './familyData';
import { initLeaves } from './leaves';

// Helper to get season from generation
const getSeasonForGen = (gen: number): string => {
  switch (gen) {
    case 1: return 'spring';
    case 2: return 'summer';
    case 3: return 'autumn';
    case 4: return 'winter';
    default: return 'spring';
  }
};

const getSeasonIcon = (gen: number): string => {
  switch (gen) {
    case 1: // Spring - Sprout
      return '🌱';
    case 2: // Summer - Sun
      return '☀️';
    case 3: // Autumn - Maple Leaf
      return '🍁';
    case 4: // Winter - Snowflake
      return '❄️';
    default:
      return '🌱';
  }
};

const getGenTitle = (gen: number): string => {
  switch (gen) {
    case 1: return '1st Generation: The Future & Branches';
    case 2: return '2nd Generation: The Parents & Trunks';
    case 3: return '3rd Generation: The Grandparents & Foundations';
    case 4: return '4th Generation: The Great Grandparents & Roots';
    default: return `${gen}th Generation`;
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
  <!-- Tree background container with flashlight effect -->
  <div class="tree-bg-container">
    <div class="tree-base-layer"></div>
    <div class="tree-color-layer"></div>
  </div>

  <div class="tree-container">
    ${[1, 2, 3, 4].map(gen => `
      <section class="generation-section" id="gen-${gen}" data-season="${getSeasonForGen(gen)}">
        <div class="generation-header">
          <span class="season-icon">${getSeasonIcon(gen)}</span>
          <h2 class="serif">${getGenTitle(gen)}</h2>
        </div>
        ${gen === 1 ? `
          <button class="methodology-btn" id="methodology-btn" type="button" aria-label="Methodology">
            <span class="methodology-btn-icon">📖</span>
            <span class="methodology-btn-text">Methodology</span>
          </button>
        ` : ''}
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
                  ${member.birthyear ? `<div class="lifespan">${member.birthyear}</div>` : ''}
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
        <div class="avatar-container">
          ${member.photoUrl && !member.photoUrl.startsWith('[PASTE')
          ? `<img src="${member.photoUrl}" alt="${member.name}" style="width: 100%; height: 100%; object-fit: cover;" />`
          : `<span>${member.name.charAt(0)}</span>`}
        </div>
        <div class="card-content">
          <span class="relation-tag">${member.relation}</span>
          <h3 class="serif">${member.name}</h3>
          <p class="lifespan">${member.birthyear}</p>
          <p class="bio">${member.shortBio}</p>
        </div>
      `;

      modal.classList.add('active');
    }
  });
});

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

// Track mouse for flashlight effect (accounting for scroll position)
window.addEventListener('pointermove', (e) => {
  const scrollTop = app.scrollTop;
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY + scrollTop}px`);
});

// Initialize falling leaves
initLeaves();
