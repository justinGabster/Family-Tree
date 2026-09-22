export function initLeaves() {
  const canvas = document.createElement('canvas');
  canvas.id = 'leaves-canvas';
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d')!;
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  interface Leaf {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
  }

  const colors = ['#d97706', '#b45309', '#f59e0b', '#9a3412'];
  const maxLeaves = 20;
  const leaves: Leaf[] = [];

  for (let i = 0; i < maxLeaves; i++) {
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height - height, // start somewhat above or on screen
      size: Math.random() * 8 + 8,
      speedX: Math.random() * 1 - 0.5,
      speedY: Math.random() * 1.5 + 0.5,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  // Draw a simple path for a leaf
  function drawLeaf(leaf: Leaf, opacity: number) {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = leaf.color;

    ctx.beginPath();
    // A simple almond shape for a leaf
    ctx.ellipse(0, 0, leaf.size, leaf.size / 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    const theme = document.documentElement.getAttribute('data-theme');
    
    // Default opacity for hero or other seasons
    let targetOpacity = 0.15; // Subtle for hero
    if (theme === 'autumn') {
      targetOpacity = 1.0; // Intensified for autumn/modern
    } else if (theme === 'summer') {
      targetOpacity = 0.4;
    } else if (theme === 'spring' || theme === 'winter') {
      targetOpacity = 0.05; // Barely visible
    }

    leaves.forEach(leaf => {
      leaf.x += leaf.speedX;
      leaf.y += leaf.speedY;
      leaf.rotation += leaf.rotationSpeed;

      // Gentle swaying
      leaf.speedX += (Math.random() - 0.5) * 0.03;
      
      // Clamp speedX to prevent leaves blowing away too fast
      if (leaf.speedX > 1.5) leaf.speedX = 1.5;
      if (leaf.speedX < -1.5) leaf.speedX = -1.5;

      // Reset leaf when it goes off the bottom
      if (leaf.y > height + 20) {
        leaf.y = -20;
        leaf.x = Math.random() * width;
        leaf.speedX = Math.random() * 1 - 0.5;
      }

      drawLeaf(leaf, targetOpacity);
    });

    requestAnimationFrame(animate);
  }

  animate();
}
