let language='en';
let program='term';
const programCopy={
  term:{en:['Term tutoring','Weekly course structure and teaching content to be supplied.'],zh:['学期课程','待填写：每周课程安排与教学内容。']},
  holiday:{en:['Holiday tutoring','Program availability, dates and content to be confirmed.'],zh:['假期课程','待确认：是否开设、开课日期及课程内容。']},
  exam:{en:['Exam preparation','Supported subjects, assessment focus and program details to be supplied.'],zh:['考试准备','待填写：适用科目、备考重点及课程安排。']}
};
function renderProgram(){
  document.getElementById('program-title').textContent=programCopy[program][language][0];
  document.getElementById('program-copy').textContent=programCopy[program][language][1];
  document.getElementById('program-panel').setAttribute('aria-labelledby',`tab-${program}`);
  document.querySelectorAll('[data-program]').forEach(button=>{const selected=button.dataset.program===program;button.setAttribute('aria-selected',String(selected));button.tabIndex=selected?0:-1;});
}
document.getElementById('language').addEventListener('click',()=>{
  language=language==='en'?'zh':'en';
  document.documentElement.lang=language==='en'?'en':'zh-CN';
  document.querySelectorAll('[data-en]').forEach(element=>{element.textContent=element.dataset[language];});
  document.getElementById('language').textContent=language==='en'?'中文':'English';
  document.querySelectorAll('[data-enrol]').forEach(link=>{link.href=language==='zh'?'../enrol/?lang=zh&v=2':'../enrol/?v=2';});
  renderProgram();
});
const menu=document.getElementById('main-nav');
const toggle=document.getElementById('menu-toggle');
function closeMenu(){menu.classList.remove('open');toggle.setAttribute('aria-expanded','false');}
toggle.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
menu.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){closeMenu();document.querySelectorAll('nav details[open]').forEach(item=>{item.open=false;});}});
document.querySelectorAll('[data-program]').forEach(button=>{
  button.addEventListener('click',()=>{program=button.dataset.program;renderProgram();});
  button.addEventListener('keydown',event=>{const keys=['ArrowRight','ArrowLeft','Home','End'];if(!keys.includes(event.key))return;event.preventDefault();const buttons=[...document.querySelectorAll('[data-program]')];const index=buttons.indexOf(button);const next=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[next].click();buttons[next].focus();});
});
const venue=document.getElementById('venue-dialog');
document.getElementById('venue-open').addEventListener('click',()=>venue.showModal());
document.getElementById('venue-close').addEventListener('click',()=>venue.close());
venue.addEventListener('click',event=>{if(event.target===venue){const bounds=venue.getBoundingClientRect();if(event.clientX<bounds.left||event.clientX>bounds.right||event.clientY<bounds.top||event.clientY>bounds.bottom)venue.close();}});
renderProgram();
