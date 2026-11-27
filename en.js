const projects=[
 {id:'perdiknas',name:'Perdiknas Web App',type:'WEB APPLICATION',summary:'A foundation portal for information and administration.',status:'Design',detail:'I designed a portal introducing the history, mission, and departments of Perdiknas. An internal workspace is designed to help staff manage employee records, correspondence, and archives.',tech:'Interface design · Administrative workflows'},
 {id:'hr-mobile',name:'HR Mobile App',type:'MOBILE APPLICATION',summary:'Employee records management on mobile.',status:'Development',detail:'This app lets staff add, find, edit, and delete employee records. I focused on validating email addresses, preventing duplicates, and keeping the employee list up to date after each change.',tech:'Flutter · Provider · JSON Server'},
 {id:'ecommerce',name:'E-commerce Web App',type:'WEB DEVELOPMENT',summary:'Designing an online store from catalog to checkout.',status:'Technical design',detail:'I planned the store’s application structure, database schema, and checkout flow. The challenge was keeping products, cart items, and orders linked throughout each transaction.',tech:'Next.js · Prisma · Database design'}
];
const people=['Employee records','Employee directory','Departments','Contact details'].map(s=>'<div class="person">'+s+'</div>').join('');
const previews=[
 '<div class="mock"><header><b>◈ &nbsp; Perdiknas</b></header><div class="dash"><div class="side">Dashboard<br>Departments<br>Employees<br>Mail<br>Archives</div><div><b>Foundation dashboard</b><div class="metrics"><i>Departments</i><i>Employees</i><i>Archives</i></div><small>Annual statistics</small><div class="bars">'+[22,34,29,41,36,50,56,48,62,70,66,82].map(h=>'<i style="height:'+h+'%"></i>').join('')+'</div></div></div></div>',
 '<div class="phones"><div class="phone"><small>09.41</small><b>HR workspace</b>'+people+'</div><div class="phone"><small>09.41</small><b>Staff records</b>'+people+'</div></div>',
 '<div class="mock shop"><header><b>STORE / CATALOG</b></header><strong>Latest collection.</strong><div class="tiles"><i>◒</i><i>◈</i><i>◓</i></div><p>Featured products</p></div>'
];
const copy = {
  "stage": "Stage",
  "illustration": "The preview illustrates the project’s interface.",
  "sending": "Sending your message…",
  "sent": "Your message has been received. Thank you for getting in touch.",
  "error": "Your message could not be sent. Check your connection and try again."
};
