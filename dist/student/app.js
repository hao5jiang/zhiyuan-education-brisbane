import { dataSource } from './data-source.js';

const labels = {
  en:{dashboard:'Dashboard',courses:'Courses',assignments:'Assignments',progress:'Progress',schedule:'Schedule',profile:'Profile',portal:'Student Portal',demo:'DEMO MODE',side:'Fictional demo · no account',footer:'This is a fictional interface. Practice responses stay in this browser tab.',back:'Back to website ↗',welcome:'Welcome back, Alex',welcomeCopy:'Explore your sample courses, try a short practice question and see how a student dashboard could work.',practiceNow:'Try a practice question',sample:'Fictional sample data',courseCount:'Courses',assignmentCount:'Practice tasks',average:'Illustrative average',coming:'Coming up',viewAll:'View all',learning:'Your learning',current:'Current',next:'Next topic',lessons:'lessons',open:'Open practice',due:'Due',submitted:'Simulated submission',notSubmitted:'Ready to practise',question:'Practice question',choose:'Choose one answer, then submit for instant feedback.',submit:'Submit answer (demo)',correct:'Correct',incorrect:'Try again',explanation:'Why',returnAssignments:'← Back to assignments',submitInfo:'This action only changes this tab. Nothing is uploaded or saved after refresh.',demoResults:'Illustrative results',completion:'Course completion',sampleScore:'Sample score',noRealGrades:'These numbers are fictional and are not school results.',classSchedule:'Sample class schedule',venue:'Venue',scheduleInfo:'Sample dates for interface demonstration only. Confirm real class times on the public website.',learner:'Learner profile',level:'Year level',campus:'Class venue',account:'Account',noLogin:'No login is connected',privacy:'Privacy',privacyCopy:'No real student details, files or practice responses are sent to a server. Refresh to reset this demo.',missing:'Page not found',missingCopy:'Choose a section from the navigation.',course:'Course',studentArea:'A look at a future student experience',courseIntro:'Browse a small sample of mathematics learning areas.',assignmentIntro:'Try a question and see a simulated submission.',progressIntro:'The chart and scores below are fictional examples.',profileIntro:'This profile demonstrates layout only; it does not identify a real student.'},
  zh:{dashboard:'总览',courses:'课程',assignments:'作业',progress:'学习进度',schedule:'课程安排',profile:'个人资料',portal:'学生中心',demo:'演示模式',side:'虚构演示 · 无需账号',footer:'这是虚构演示。练习作答仅保留在当前浏览器标签页。',back:'返回网站 ↗',welcome:'欢迎，陈同学',welcomeCopy:'浏览示例课程，试做一道互动练习，了解学生学习页面的使用方式。',practiceNow:'开始互动练习',sample:'虚构示例数据',courseCount:'课程数量',assignmentCount:'练习任务',average:'示例平均分',coming:'接下来',viewAll:'查看全部',learning:'正在学习',current:'进行中',next:'下一主题',lessons:'课时',open:'打开练习',due:'截止日期',submitted:'模拟提交完成',notSubmitted:'等待练习',question:'互动练习',choose:'选择一个答案并提交，即可查看反馈。',submit:'提交答案（演示）',correct:'回答正确',incorrect:'再试一次',explanation:'解题说明',returnAssignments:'← 返回作业',submitInfo:'此操作只改变当前标签页的显示。不会上传内容，刷新后演示记录会清空。',demoResults:'示例成绩',completion:'课程进度',sampleScore:'示例分数',noRealGrades:'这里的数字均为虚构示例，并非学校成绩。',classSchedule:'示例课程安排',venue:'上课地点',scheduleInfo:'这里的日期仅用于页面演示。真实上课时间请以网站公开课表及学校通知为准。',learner:'学生档案',level:'年级',campus:'上课地点',account:'账号',noLogin:'尚未接入登录',privacy:'隐私说明',privacyCopy:'没有真实学生信息、文件或练习作答传到服务器。刷新页面即可重置演示。',missing:'页面不存在',missingCopy:'请从导航栏选择页面。',course:'课程',studentArea:'未来学生学习体验示例',courseIntro:'浏览少量数学课程示例。',assignmentIntro:'试做练习并查看模拟提交效果。',progressIntro:'以下图表和分数仅为虚构示例。',profileIntro:'此档案仅用于展示页面布局，不对应真实学生。'}
};
const icons={dashboard:'◫',courses:'▦',assignments:'✎',progress:'◔',schedule:'▤',profile:'○'};
const routes=['dashboard','courses','assignments','progress','schedule','profile'];
let language='en';
const content=document.getElementById('content');
const escapeHtml=value=>String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const t=key=>labels[language][key];
const loc=value=>escapeHtml(value[language]);
const formatDate=value=>new Intl.DateTimeFormat(language==='zh'?'zh-CN':'en-AU',{day:'numeric',month:'short',timeZone:'Australia/Brisbane'}).format(new Date(`${value}T12:00:00+10:00`));
const url=path=>`#/${path}`;
const courseById=(snapshot,id)=>snapshot.courses.find(item=>item.id===id);
const head=(title,description,badge=t('sample'))=>`<div class="page-head"><div><div class="eyebrow">${escapeHtml(t('portal'))}</div><h1>${escapeHtml(title)}</h1><p>${escapeHtml(description)}</p></div><span class="pill">${escapeHtml(badge)}</span></div>`;
const courseTitle=(snapshot,id)=>loc(courseById(snapshot,id).title);

function renderNav(active){
  document.getElementById('nav').innerHTML=routes.map(route=>`<a href="${url(route)}" class="${route===active?'active':''}" ${route===active?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${icons[route]}</span>${escapeHtml(t(route))}</a>`).join('');
  document.getElementById('nav-label').textContent=t('portal').toUpperCase();
  document.getElementById('demo-side').textContent=t('side');
  document.getElementById('top-demo').textContent=t('demo');
  document.getElementById('footer-note').textContent=t('footer');
  document.getElementById('back-site').textContent=t('back');
  document.getElementById('login-link').textContent=language==='en'?'Student sign-in':'学生登录';
  document.getElementById('language').textContent=language==='en'?'中文':'English';
  document.getElementById('crumb').textContent=`${t('portal')} / ${t(active)||t('missing')}`;
}

function dashboard(snapshot){
  const average=Math.round(snapshot.courses.reduce((sum,course)=>sum+course.score,0)/snapshot.courses.length);
  return `${head(t('welcome'),t('welcomeCopy'))}
    <div class="hero-card"><div><div class="eyebrow">${escapeHtml(t('studentArea'))}</div><h2>${escapeHtml(t('question'))}</h2><p>${escapeHtml(snapshot.assignments[0].description[language])}</p></div><a class="button" href="${url('assignments/rates')}">${escapeHtml(t('practiceNow'))} →</a></div>
    <div class="stats"><div class="stat"><span>${escapeHtml(t('courseCount'))}</span><strong>${snapshot.courses.length}</strong><small>${escapeHtml(t('sample'))}</small></div><div class="stat"><span>${escapeHtml(t('assignmentCount'))}</span><strong>${snapshot.assignments.length}</strong><small>${Object.keys(snapshot.submissions).length} ${escapeHtml(t('submitted').toLowerCase())}</small></div><div class="stat"><span>${escapeHtml(t('average'))}</span><strong>${average}%</strong><small>${escapeHtml(t('noRealGrades'))}</small></div></div>
    <div class="two-col"><section class="panel"><h2>${escapeHtml(t('learning'))}</h2>${snapshot.courses.map(course=>`<div class="list-row"><div><strong>${loc(course.title)}</strong><small>${loc(course.next)}</small></div><span class="tag">${course.progress}%</span></div>`).join('')}</section><section class="panel"><h2>${escapeHtml(t('coming'))}</h2>${snapshot.schedule.slice(0,2).map(item=>`<div class="list-row"><div><strong>${courseTitle(snapshot,item.courseId)}</strong><small>${formatDate(item.date)} · ${escapeHtml(item.time)}</small></div></div>`).join('')}<p><a class="text-link" href="${url('schedule')}">${escapeHtml(t('viewAll'))} →</a></p></section></div>`;
}

function courses(snapshot){return `${head(t('courses'),t('courseIntro'))}<div class="grid">${snapshot.courses.map(course=>`<article class="course"><div class="course-top"><span class="eyebrow">${escapeHtml(course.code)}</span><span class="tag">${escapeHtml(t('current'))}</span></div><h2>${loc(course.title)}</h2><p>${loc(course.description)}</p><div class="bar" role="meter" aria-label="${escapeHtml(t('completion'))}" aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${course.progress}%"></span></div><footer><span>${course.lessons} ${escapeHtml(t('lessons'))} · ${course.progress}%</span><span>${escapeHtml(t('next'))}: ${loc(course.next)}</span></footer></article>`).join('')}</div>`;}

function assignments(snapshot){return `${head(t('assignments'),t('assignmentIntro'))}<div class="grid">${snapshot.assignments.map(item=>`<article class="assignment"><div class="course-top"><span class="eyebrow">${courseTitle(snapshot,item.courseId)}</span><span class="tag ${snapshot.submissions[item.id]?'green':'gold'}">${escapeHtml(t(snapshot.submissions[item.id]?'submitted':'notSubmitted'))}</span></div><h2>${loc(item.title)}</h2><p>${loc(item.description)}</p><footer><span>${escapeHtml(t('due'))}: ${formatDate(item.due)}</span><a class="text-link" href="${url(`assignments/${item.id}`)}">${escapeHtml(t('open'))} →</a></footer></article>`).join('')}</div><div class="notice">${escapeHtml(t('submitInfo'))}</div>`;}

function practice(snapshot,id){
  const item=snapshot.assignments.find(assignment=>assignment.id===id);
  if(!item)return missing();
  const previous=snapshot.submissions[id];
  return `<div class="practice">${head(loc(item.title),t('choose'),courseTitle(snapshot,item.courseId))}<div class="panel"><a class="text-link" href="${url('assignments')}">${escapeHtml(t('returnAssignments'))}</a><div class="question">${loc(item.question)}</div><form id="practice-form" data-id="${escapeHtml(item.id)}">${item.choices.map((choice,index)=>`<label class="option"><input type="radio" name="choice" value="${index}" ${previous?.choiceIndex===index?'checked':''} required><span>${loc(choice)}</span></label>`).join('')}<button class="button" type="submit">${escapeHtml(t('submit'))}</button></form><div id="feedback" aria-live="polite">${previous?feedback(item,previous):''}</div></div><div class="notice">${escapeHtml(t('submitInfo'))}</div></div>`;
}

function feedback(item,result){return `<div class="feedback ${result.correct?'':'error'}"><strong>${escapeHtml(t(result.correct?'correct':'incorrect'))}</strong><p>${escapeHtml(t('explanation'))}: ${loc(item.explanation)}</p></div>`;}
function progress(snapshot){return `${head(t('progress'),t('progressIntro'))}<div class="stats"><div class="stat"><span>${escapeHtml(t('average'))}</span><strong>82%</strong><small>${escapeHtml(t('sample'))}</small></div><div class="stat"><span>${escapeHtml(t('courseCount'))}</span><strong>${snapshot.courses.length}</strong><small>${escapeHtml(t('sample'))}</small></div><div class="stat"><span>${escapeHtml(t('submitted'))}</span><strong>${Object.keys(snapshot.submissions).length}</strong><small>${escapeHtml(t('submitInfo'))}</small></div></div><h2 class="section-title">${escapeHtml(t('demoResults'))}</h2><div class="progress-list">${snapshot.courses.map(course=>`<div class="progress-item"><header><strong>${loc(course.title)}</strong><span>${escapeHtml(t('sampleScore'))}: ${course.score}%</span></header><div class="bar" role="meter" aria-label="${escapeHtml(t('completion'))}" aria-valuenow="${course.progress}" aria-valuemin="0" aria-valuemax="100"><span style="width:${course.progress}%"></span></div><small>${escapeHtml(t('completion'))}: ${course.progress}%</small></div>`).join('')}</div><div class="notice">${escapeHtml(t('noRealGrades'))}</div>`;}
function schedule(snapshot){return `${head(t('schedule'),t('scheduleInfo'))}<div class="schedule-list">${snapshot.schedule.map(item=>`<div class="schedule-row"><div class="schedule-date">${formatDate(item.date)}</div><div><strong>${courseTitle(snapshot,item.courseId)}</strong><small>${loc(item.topic)} · ${escapeHtml(item.time)}</small></div><span class="tag">MSHS</span></div>`).join('')}</div><div class="notice">${escapeHtml(t('venue'))}: ${loc(snapshot.student.campus)}. ${escapeHtml(t('scheduleInfo'))}</div>`;}
function profile(snapshot){return `${head(t('profile'),t('profileIntro'))}<div class="profile-card"><div class="profile-head"><div class="avatar">AC</div><div><h2>${loc(snapshot.student.name)}</h2><p>${loc(snapshot.student.status)}</p></div></div><div class="detail"><span>${escapeHtml(t('level'))}</span><strong>${loc(snapshot.student.level)}</strong></div><div class="detail"><span>${escapeHtml(t('campus'))}</span><strong>${loc(snapshot.student.campus)}</strong></div><div class="detail"><span>${escapeHtml(t('account'))}</span><strong>${escapeHtml(t('noLogin'))}</strong></div></div><div class="notice"><strong>${escapeHtml(t('privacy'))}</strong><br>${escapeHtml(t('privacyCopy'))}</div>`;}
function missing(){return head(t('missing'),t('missingCopy'),'404');}

async function render(){
  const path=decodeURIComponent(location.hash.replace(/^#\/?/,'')).split('/').filter(Boolean);
  const section=path[0]||'dashboard';
  const active=routes.includes(section)?section:'dashboard';
  const snapshot=await dataSource.getSnapshot();
  renderNav(active);
  content.innerHTML=section==='dashboard'?dashboard(snapshot):section==='courses'?courses(snapshot):section==='assignments'?(path[1]?practice(snapshot,path[1]):assignments(snapshot)):section==='progress'?progress(snapshot):section==='schedule'?schedule(snapshot):section==='profile'?profile(snapshot):missing();
  const form=document.getElementById('practice-form');
  if(form)form.addEventListener('submit',async event=>{
    event.preventDefault();
    const selected=form.querySelector('input[name="choice"]:checked');
    if(!selected)return;
    const result=await dataSource.submitPractice({assignmentId:form.dataset.id,choiceIndex:Number(selected.value)});
    const item=snapshot.assignments.find(assignment=>assignment.id===form.dataset.id);
    document.getElementById('feedback').innerHTML=feedback(item,result);
  });
  window.scrollTo({top:0,behavior:'instant'});
}

document.getElementById('language').addEventListener('click',()=>{language=language==='en'?'zh':'en';document.documentElement.lang=language==='en'?'en':'zh-CN';render();});
window.addEventListener('hashchange',render);
render();
