// Depends on `$` (defined in projects.js), so projects.js must load first.

// Keep the current #hash when switching language.
document.querySelectorAll(".languages a").forEach((link) => {
  link.addEventListener("click", () => {
    link.hash = location.hash;
  });
});

// Highlight the nav link of the section currently in view.
const navLinks = [...document.querySelectorAll("nav a")];

new IntersectionObserver(
  (entries) => {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry) => {
        navLinks.forEach((a) => a.classList.toggle("active", a.hash === "#" + entry.target.id));
      });
  },
  { rootMargin: "-8% 0px -46%" },
).observe($("#beranda"));

for (const a of navLinks) {
  a.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.toggle("active", l === a));
  });
}

// ---------------------------------------------------------------------------
// Generative art: a tubular trefoil knot projected onto a canvas.
// Depth ordering (painter's algorithm) hides the back of each coil.
// ---------------------------------------------------------------------------
const canvas = $("canvas");
const ctx = canvas.getContext("2d");
const TAU = Math.PI * 2;

const RINGS = 196; // samples along the knot
const LANES = 36; // samples around the tube
const TUBE_RADIUS = 0.445;

// Point on the knot's center line for parameter t.
function center(t) {
  const r = 1.21 + 0.55 * Math.cos(3 * t);
  return [r * Math.cos(2 * t), r * Math.sin(2 * t), 0.75 * Math.sin(3 * t)];
}

const normalize = (v) => {
  const length = Math.hypot(...v);
  return v.map((x) => x / length);
};

const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];

const subtract = (a, b) => a.map((x, k) => x - b[k]);

// Rotate a 3D point to the fixed viewing angle.
function rotateView([x, y, z]) {
  const tiltedY = y * 0.91 - z * 0.415;
  const tiltedZ = y * 0.415 + z * 0.91;
  return [x * 0.945 - tiltedY * 0.327, tiltedY * 0.945 + x * 0.327, tiltedZ];
}

// Build the tube surface as a grid of rings x lanes vertices.
function buildMesh() {
  const mesh = [];
  for (let i = 0; i < RINGS; i++) {
    const t = (i * TAU) / RINGS;
    const point = center(t);
    const tangent = normalize(subtract(center(t + 0.001), point));
    const normal = normalize(cross(tangent, [0, 0, 1]));
    const binormal = cross(tangent, normal);

    const ring = [];
    for (let j = 0; j < LANES; j++) {
      const angle = (j * TAU) / LANES;
      const offset = point.map(
        (x, k) => x + TUBE_RADIUS * (normal[k] * Math.cos(angle) + binormal[k] * Math.sin(angle)),
      );
      ring.push(rotateView(offset));
    }
    mesh.push(ring);
  }
  return mesh;
}

// Turn the mesh into quads, sorted back to front by average depth.
function buildFaces(mesh) {
  const faces = [];
  for (let i = 0; i < RINGS; i++) {
    for (let j = 0; j < LANES; j++) {
      const nextI = (i + 1) % RINGS;
      const nextJ = (j + 1) % LANES;
      const vertices = [mesh[i][j], mesh[nextI][j], mesh[nextI][nextJ], mesh[i][nextJ]];
      const depth = vertices.reduce((sum, p) => sum + p[2], 0) / 4;
      faces.push({ vertices, depth });
    }
  }
  return faces.sort((a, b) => a.depth - b.depth);
}

function draw() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const pixelRatio = Math.min(devicePixelRatio || 1, 2);
  canvas.width = width * pixelRatio;
  canvas.height = height * pixelRatio;
  ctx.scale(pixelRatio, pixelRatio);

  const faces = buildFaces(buildMesh());
  const scale = Math.min(width * 0.221, height * 0.217);

  for (const { vertices, depth } of faces) {
    const [p, q, r] = vertices;
    const normal = normalize(cross(subtract(q, p), subtract(r, q)));

    // Simple directional lighting, brightened for faces closer to the viewer.
    let glow = Math.max(0, -normal[0] * 0.37 + normal[1] * 0.73 + normal[2] * 0.57) * 0.81 + 0.18;
    glow = Math.min(1, glow * (0.89 + 0.14 * depth));
    const green = Math.round(42 + glow * 193);

    ctx.beginPath();
    vertices.forEach(([x, y], k) => {
      const px = width * 0.5 + x * scale;
      const py = height * 0.51 - y * scale;
      if (k === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    });
    ctx.closePath();

    ctx.fillStyle = `rgb(${Math.round(13 + glow * 20)},${Math.round(22 + glow * 26)},15)`;
    ctx.fill();

    ctx.strokeStyle = `rgb(${Math.round(green * 0.81)},${green},${Math.round(green * 0.58)})`;
    ctx.lineWidth = 0.62;
    ctx.stroke();
  }
}

new ResizeObserver(draw).observe(canvas);
