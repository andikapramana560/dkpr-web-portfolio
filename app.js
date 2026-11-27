document.querySelectorAll('.languages a').forEach(link => {
  link.addEventListener('click', () => { link.hash = location.hash; });
});
const links=[...document.querySelectorAll('nav a')];
new IntersectionObserver(entries=>{entries.filter(e=>e.isIntersecting).forEach(e=>links.forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id)))},{rootMargin:'-8% 0px -46%'}).observe($('#beranda'));
for(const a of links)a.addEventListener('click',()=>links.forEach(l=>l.classList.toggle('active',l===a)));
// Project a tubular trefoil onto canvas. Depth ordering hides the back of each coil.
const canvas=$('canvas'),ctx=canvas.getContext('2d'),tau=Math.PI*2;
function center(t){const r=1.21+.55*Math.cos(3*t);return [r*Math.cos(2*t),r*Math.sin(2*t),.75*Math.sin(3*t)]}
const norm=v=>{let mag=Math.hypot(...v);return v.map(x=>x/mag)};
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
function draw(){
 const w=canvas.clientWidth,h=canvas.clientHeight,px=Math.min(devicePixelRatio||1,2);canvas.width=w*px;canvas.height=h*px;ctx.scale(px,px);
 const rings=196,lanes=36,mesh=[];
 for(let i=0;i<rings;i++){
 const t=i*tau/rings,c=center(t),ahead=center(t+.001),tan=norm(ahead.map((x,k)=>x-c[k])),n=norm(cross(tan,[0,0,1])),b=cross(tan,n);
 mesh.push(Array.from({length:lanes},(_,j)=>{let a=j*tau/lanes,p=c.map((x,k)=>x+.445*(n[k]*Math.cos(a)+b[k]*Math.sin(a))),[x,y,z]=p;let yy=y*.91-z*.415,zz=y*.415+z*.91;return [x*.945-yy*.327,yy*.945+x*.327,zz]}))
 }
 let faces=[];for(let i=0;i<rings;i++)for(let j=0;j<lanes;j++){let ni=(i+1)%rings,nj=(j+1)%lanes;let v=[mesh[i][j],mesh[ni][j],mesh[ni][nj],mesh[i][nj]];faces.push({v,z:v.reduce((s,p)=>s+p[2],0)/4})}
 faces.sort((a,b)=>a.z-b.z);let scale=Math.min(w*.221,h*.217);
 for(const {v,z} of faces){let [p,q,r]=v,n=norm(cross(q.map((x,k)=>x-p[k]),r.map((x,k)=>x-q[k])));let glow=Math.max(0,(-n[0]*.37+n[1]*.73+n[2]*.57))*0.81+.18;glow=Math.min(1,glow*(.89+.14*z));let green=Math.round(42+glow*193);ctx.beginPath();v.forEach(([x,y],k)=>ctx[k?'lineTo':'moveTo'](w*.5+x*scale,h*.51-y*scale));ctx.closePath();ctx.fillStyle='rgb('+Math.round(13+glow*20)+','+Math.round(22+glow*26)+',15)';ctx.fill();ctx.strokeStyle='rgb('+Math.round(green*.81)+','+green+','+Math.round(green*.58)+')';ctx.lineWidth=.62;ctx.stroke()}
}
new ResizeObserver(draw).observe(canvas);
