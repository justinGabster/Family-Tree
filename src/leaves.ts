export function initLeaves() {
  // Background canvas (Behind the tree)
  const bgCanvas = document.createElement('canvas');
  bgCanvas.id = 'leaves-canvas-bg';
  bgCanvas.style.position = 'fixed';
  bgCanvas.style.inset = '0';
  bgCanvas.style.pointerEvents = 'none';
  bgCanvas.style.zIndex = '-1';
  document.body.appendChild(bgCanvas);

  // Foreground canvas (In front of the tree, behind the cards)
  const fgCanvas = document.createElement('canvas');
  fgCanvas.id = 'leaves-canvas-fg';
  fgCanvas.style.position = 'fixed';
  fgCanvas.style.inset = '0';
  fgCanvas.style.pointerEvents = 'none';
  fgCanvas.style.zIndex = '0';
  document.body.appendChild(fgCanvas);

  const bgCtx = bgCanvas.getContext('2d')!;
  const fgCtx = fgCanvas.getContext('2d')!;
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  
  const resize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    bgCanvas.width = fgCanvas.width = width;
    bgCanvas.height = fgCanvas.height = height;
  };
  resize();
  window.addEventListener('resize', resize);

  interface Leaf {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    rotation: number;
    rotationSpeed: number;
    color: string;
    isForeground: boolean;
  }

  const colors = ['#d97706', '#b45309', '#f59e0b', '#9a3412'];
  const maxLeaves = 30; // 15 per layer
  const leaves: Leaf[] = [];

  for (let i = 0; i < maxLeaves; i++) {
    const isForeground = i % 2 === 0;
    leaves.push({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: (Math.random() * 8 + 8) * (isForeground ? 1.2 : 0.8), // Foreground leaves are slightly larger
      speedX: Math.random() * 1 - 0.5,
      speedY: (Math.random() * 1.5 + 0.5) * (isForeground ? 1.2 : 0.8), // Foreground leaves fall slightly faster
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      isForeground
    });
  }

  function drawLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf, opacity: number) {
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    // Background leaves are slightly dimmer for depth
    ctx.globalAlpha = leaf.isForeground ? opacity : opacity * 0.6;
    ctx.fillStyle = leaf.color;

    ctx.beginPath();
    ctx.ellipse(0, 0, leaf.size, leaf.size / 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function animate() {
    bgCtx.clearRect(0, 0, width, height);
    fgCtx.clearRect(0, 0, width, height);

    const targetOpacity = 1.0;

    leaves.forEach(leaf => {
      leaf.x += leaf.speedX;
      leaf.y += leaf.speedY;
      leaf.rotation += leaf.rotationSpeed;

      leaf.speedX += (Math.random() - 0.5) * 0.03;
      
      if (leaf.speedX > 1.5) leaf.speedX = 1.5;
      if (leaf.speedX < -1.5) leaf.speedX = -1.5;

      if (leaf.y > height + 20) {
        leaf.y = -20;
        leaf.x = Math.random() * width;
        leaf.speedX = Math.random() * 1 - 0.5;
      }

      if (leaf.isForeground) {
        drawLeaf(fgCtx, leaf, targetOpacity);
      } else {
        drawLeaf(bgCtx, leaf, targetOpacity);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}
