const form = document.querySelector('#enrol-form');
const classChoice = document.querySelector('#class-choice');
const focusChoice = document.querySelector('#focus-choice');
const result = document.querySelector('#result');
const languageButton = document.querySelector('#language');
let language = 'en';

function renderResult() {
  if (result.hidden) return;
  const classLabel = classChoice.selectedOptions[0].textContent.trim();
  const focusLabel = focusChoice.selectedOptions[0].textContent.trim();
  result.replaceChildren();
  const heading = document.createElement('strong');
  heading.textContent = language === 'zh' ? '申请预览已生成' : 'Application preview ready';
  const detail = document.createElement('p');
  detail.textContent = language === 'zh'
    ? `意向课程：${classLabel} · 学习方向：${focusLabel}`
    : `Class: ${classLabel} · Learning focus: ${focusLabel}`;
  const status = document.createElement('small');
  status.textContent = language === 'zh'
    ? '演示状态：未提交。此页面没有发送或保存资料，也没有预留名额。'
    : 'Demo status: not submitted. No information was sent or saved, and no place was reserved.';
  result.append(heading, detail, status);
}

form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  result.hidden = false;
  renderResult();
  result.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
});

for (const select of [classChoice, focusChoice]) {
  select.addEventListener('change', () => { result.hidden = true; });
}

languageButton.addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  document.title = language === 'zh' ? '报名申请预览 | 致远教育' : 'Enrolment enquiry preview | Zhiyuan Education';
  document.querySelectorAll('[data-en][data-zh]').forEach(element => {
    element.textContent = element.dataset[language];
  });
  languageButton.textContent = language === 'en' ? '中文' : 'English';
  renderResult();
});
