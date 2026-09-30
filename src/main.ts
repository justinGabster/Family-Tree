import './style.css';
import { familyData } from './familyData';
import { initLeaves } from './leaves';

// Build the single-page tree layout
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <!-- Tree background container with flashlight effect -->
  <div class="tree-bg-container">
    <div class="tree-silhouette"></div>
  </div>

  <!-- Main tree container -->
  <div class="tree-wrapper">
    
    <!-- SVG for connector lines -->
    <svg class="connector-svg" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Define line style -->
      </defs>
      
      <!-- Main vertical trunk -->
      <line x1="50%" y1="0" x2="50%" y2="100%" class="trunk-line" />
      
      <!-- Generation 1 branches -->
      <line x1="50%" y1="12%" x2="30%" y2="12%" class="branch-line" />
      <line x1="50%" y1="12%" x2="70%" y2="12%" class="branch-line" />
      
      <!-- Generation 2 connector -->
      <line x1="50%" y1="22%" x2="30%" y2="22%" class="branch-line" />
      <line x1="50%" y1="28%" x2="70%" y2="28%" class="branch-line" />
      <line x1="50%" y1="38%" x2="70%" y2="38%" class="branch-line" />
      <line x1="50%" y1="48%" x2="70%" y2="48%" class="branch-line" />
      
      <!-- Generation 3 branches -->
      <line x1="50%" y1="58%" x2="20%" y2="58%" class="branch-line" />
      <line x1="50%" y1="64%" x2="25%" y2="64%" class="branch-line" />
      <line x1="50%" y1="58%" x2="60%" y2="58%" class="branch-line" />
      <line x1="50%" y1="64%" x2="70%" y2="64%" class="branch-line" />
      
      <!-- Generation 4 branches -->
      <line x1="50%" y1="78%" x2="20%" y2="78%" class="branch-line" />
      <line x1="50%" y1="88%" x2="20%" y2="88%" class="branch-line" />
      <line x1="50%" y1="82%" x2="60%" y2="82%" class="branch-line" />
      
      <!-- Siblings branches (right side) -->
      <line x1="60%" y1="82%" x2="80%" y2="82%" class="branch-line" />
    </svg>

    <!-- PANEL 1 - Green Spring Background -->
    <div class="panel panel-1">
      <!-- Justin -->
      <div class="capsule capsule-large" style="top: 10%; left: 15%;" data-id="justin">
        <span class="capsule-name">Justin A Jose</span>
      </div>
      
      <!-- Lance -->
      <div class="capsule capsule-large" style="top: 10%; right: 15%;" data-id="lance">
        <span class="capsule-name">Lance A Jose</span>
      </div>
      
      <!-- Connector label -->
      <div class="connector-label" style="top: 19%; left: 50%; transform: translateX(-50%);">
        Children of Cristina and Jeffrey
      </div>
    </div>

    <!-- PANEL 2 - Orange Summer Background -->
    <div class="panel panel-2">
      <!-- Cristina -->
      <div class="capsule" style="top: 28%; left: 12%;" data-id="cristina">
        <span class="capsule-name">Cristina Dela Cruz</span>
      </div>
      
      <!-- Jeffrey -->
      <div class="capsule" style="top: 24%; right: 12%;" data-id="jeffrey">
        <span class="capsule-name">Jeffrey A Jose</span>
      </div>
      
      <!-- Janice -->
      <div class="capsule" style="top: 34%; right: 12%;" data-id="janice">
        <span class="capsule-name">Janice A Jose</span>
      </div>
      
      <!-- Jerome -->
      <div class="capsule" style="top: 44%; right: 12%;" data-id="jerome">
        <span class="capsule-name">Jerome A Jose</span>
      </div>
      
      <!-- Jefferex -->
      <div class="capsule" style="top: 54%; right: 12%;" data-id="jefferex">
        <span class="capsule-name">Jefferex A Jose</span>
      </div>
      
      <!-- Connector label -->
      <div class="connector-label" style="top: 39%; left: 50%; transform: translateX(-50%);">
        Children of Florinda<br>and Marcelino
      </div>
    </div>

    <!-- PANEL 3 - Lighter Orange Autumn Background -->
    <div class="panel panel-3">
      <!-- Flordeliza -->
      <div class="capsule" style="top: 56%; left: 8%;" data-id="flordeliza">
        <span class="capsule-name">Flordeliza Paguia</span>
      </div>
      
      <!-- Domingo -->
      <div class="capsule" style="top: 67%; left: 15%;" data-id="domingo">
        <span class="capsule-name">Domingo Dela Cruz</span>
      </div>
      
      <!-- Marcelino -->
      <div class="capsule" style="top: 56%; right: 25%;" data-id="marcelino">
        <span class="capsule-name">Marcelino A Jose</span>
      </div>
      
      <!-- Florida -->
      <div class="capsule" style="top: 62%; right: 12%;" data-id="florida">
        <span class="capsule-name">Florida Calalang</span>
      </div>
      
      <!-- Filomena -->
      <div class="capsule" style="top: 69%; right: 12%;" data-id="filomena">
        <span class="capsule-name">Filomena Calalang</span>
      </div>
      
      <!-- Connector label -->
      <div class="connector-label" style="top: 50%; left: 50%; transform: translateX(-50%);">
        Child of Flordeliza and Domingo
      </div>
      
      <!-- Connector label -->
      <div class="connector-label" style="top: 73%; left: 50%; transform: translateX(-50%);">
        Child of Pablo and Gloria
      </div>
    </div>

    <!-- PANEL 4 - Dark Green Winter Background -->
    <div class="panel panel-4">
      <!-- Timoteo -->
      <div class="capsule" style="top: 76%; left: 8%;" data-id="timoteo">
        <span class="capsule-name">Timoteo Dela Cruz</span>
      </div>
      
      <!-- Maria -->
      <div class="capsule" style="top: 86%; left: 8%;" data-id="maria">
        <span class="capsule-name">Maria Paguia</span>
      </div>
      
      <!-- Pablo -->
      <div class="capsule" style="top: 80%; right: 25%;" data-id="pablo">
        <span class="capsule-name">Pablo Calalang</span>
      </div>
      
      <!-- Gloria -->
      <div class="capsule" style="top: 86%; right: 28%;" data-id="gloria">
        <span class="capsule-name">Gloria Adornado</span>
      </div>
      
      <!-- Siblings capsule (non-clickable) -->
      <div class="capsule capsule-siblings" style="top: 92%; right: 28%;">
        <span class="capsule-name">Siblings</span>
      </div>
      
      <!-- Right side: 9 Calalang siblings -->
      <div class="siblings-column" style="top: 78%; right: 5%;">
        <div class="capsule capsule-small" data-id="rody">
          <span class="capsule-name">Rody Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="ely">
          <span class="capsule-name">Ely Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="anicia">
          <span class="capsule-name">Anicia Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="linda">
          <span class="capsule-name">Linda Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="tricing">
          <span class="capsule-name">Tricing Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="corazon">
          <span class="capsule-name">Corazon Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="erming">
          <span class="capsule-name">Erming Calalang</span>
        </div>
        <div class="capsule capsule-small" data-id="juanito">
          <span class="capsule-name">Juanito Calalang</span>
        </div>
      </div>
      
      <!-- Connector label for siblings -->
      <div class="connector-label" style="top: 76%; right: 12%; transform: translateX(50%);">
        Child of Timoteo and Maria
      </div>
    </div>
    
    <!-- Generation headers (right-aligned) -->
    <div class="gen-header" style="top: 2%; right: 2%;">
      ?? 1st Generation: The Future & Branches
    </div>
    <div class="gen-header" style="top: 27%; right: 2%;">
      ?? 2nd Generation: The Parents & Trunks
    </div>
    <div class="gen-header" style="top: 52%; right: 2%;">
      ?? 3rd Generation: The Grandparents & Foundations
    </div>
    <div class="gen-header" style="top: 77%; right: 2%;">
      ?? 4th Generation: The Great Grandparents & Roots
    </div>
    
    <!-- Methodology button (top-left) -->
    <button class="methodology-btn" id="methodology-btn">
      ?? Methodology
    </button>
  </div>

  <!-- Modal -->
  <div class="modal-overlay" id="detail-modal">
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <div id="modal-body-content"></div>
    </div>
  </div>
`;

// Modal Logic
const modal = document.getElementById('detail-modal')!;
const closeBtn = document.querySelector('.close-btn')!;
const modalBodyContent = document.getElementById('modal-body-content')!;
const capsules = document.querySelectorAll('.capsule[data-id]');

capsules.forEach(capsule => {
  capsule.addEventListener('click', (e) => {
    const id = (e.currentTarget as HTMLElement).getAttribute('data-id');
    const member = familyData.find(m => m.id === id);

    if (member) {
      modalBodyContent.innerHTML = `
        <div class="modal-inner">
          ${member.photoUrl 
            ? `<div class="modal-avatar">
                 <img src="${member.photoUrl}" alt="${member.name}" />
               </div>`
            : ''}
          <h3 class="modal-name">${member.name}</h3>
          <span class="modal-relation">${member.relation}</span>
          ${member.birthyear ? `<p class="modal-birthyear">${member.birthyear}</p>` : ''}
          ${member.shortBio ? `<p class="modal-bio">${member.shortBio}</p>` : ''}
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
      <div class="modal-inner">
        <h2 class="serif">Methodology</h2>
        <p class="modal-subtitle">How this family tree was researched and preserved</p>
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

// Track mouse for flashlight effect
window.addEventListener('pointermove', (e) => {
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Initialize falling leaves
initLeaves();
