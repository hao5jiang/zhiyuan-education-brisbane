import { firebaseConfig } from './firebase-config.js';

const copy = {
  en: { loading:'Checking account access…', ready:'Account access is ready.', unavailable:'Sign-in is not enabled yet. No account details can be submitted on this page.', loadError:'Sign-in could not be loaded. Please try again later.', signingIn:'Signing in…', signedIn:'You are signed in.', signedOut:'You are signed out.', failed:'Sign-in failed. Check your email and password.', resetMissing:'Enter your email address first.', resetSent:'If this address has an account, password-reset instructions will be sent.', resetFailed:'Password reset could not be requested. Please try again later.', signOutFailed:'Sign-out failed. Please try again.' },
  zh: { loading:'正在检查账号入口…', ready:'账号入口已启用。', unavailable:'登录尚未启用。此页面目前无法提交账号资料。', loadError:'登录服务暂时无法加载，请稍后再试。', signingIn:'正在登录…', signedIn:'已登录。', signedOut:'已退出登录。', failed:'登录失败，请检查邮箱和密码。', resetMissing:'请先填写邮箱地址。', resetSent:'如果此邮箱已有账号，系统将发送重设密码说明。', resetFailed:'暂时无法申请重设密码，请稍后再试。', signOutFailed:'退出登录失败，请稍后再试。' }
};
let language = 'en';
let setupState = 'unavailable';
let auth;
let firebaseAuth;
const form = document.getElementById('login-form');
const account = document.getElementById('account');
const setup = document.getElementById('setup-message');
const feedback = document.getElementById('feedback');
const submit = document.getElementById('submit');
const email = document.getElementById('email');
const password = document.getElementById('password');
const message = key => copy[language][key];
function status(key) { feedback.textContent = message(key); }

document.getElementById('language').addEventListener('click', () => {
  language = language === 'en' ? 'zh' : 'en';
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-CN';
  document.querySelectorAll('[data-en]').forEach(element => { element.textContent = element.dataset[language]; });
  document.getElementById('language').textContent = language === 'en' ? '中文' : 'English';
  if (auth) auth.languageCode = language;
  setup.textContent = message(setupState);
  feedback.textContent = '';
});

const configured = ['apiKey', 'authDomain', 'projectId', 'appId'].every(key =>
  typeof firebaseConfig[key] === 'string' && firebaseConfig[key].trim() !== ''
);

if (configured) {
  setupState = 'loading';
  setup.textContent = message(setupState);
  try {
    const [{ initializeApp }, authModule] = await Promise.all([
      import('https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js'),
      import('https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js')
    ]);
    firebaseAuth = authModule;
    auth = authModule.getAuth(initializeApp(firebaseConfig));
    auth.languageCode = language;
    await authModule.setPersistence(auth, authModule.browserSessionPersistence);
    authModule.onAuthStateChanged(auth, user => {
      setup.hidden = true;
      form.hidden = Boolean(user);
      account.hidden = !user;
      document.getElementById('account-email').textContent = user?.email || '';
      if (user) password.value = '';
      feedback.textContent = '';
    }, () => { setupState = 'loadError'; setup.hidden = false; setup.textContent = message(setupState); form.hidden = true; account.hidden = true; });
  } catch {
    setupState = 'loadError';
    setup.textContent = message(setupState);
  }
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!auth || !form.reportValidity()) return;
  submit.disabled = true;
  status('signingIn');
  try {
    await firebaseAuth.signInWithEmailAndPassword(auth, email.value.trim(), password.value);
    password.value = '';
    status('signedIn');
  } catch {
    password.value = '';
    status('failed');
  } finally {
    submit.disabled = false;
  }
});

document.getElementById('reset').addEventListener('click', async () => {
  if (!auth) return;
  if (!email.value.trim() || !email.checkValidity()) { status('resetMissing'); email.focus(); return; }
  try {
    await firebaseAuth.sendPasswordResetEmail(auth, email.value.trim());
    status('resetSent');
  } catch { status('resetFailed'); }
});

document.getElementById('sign-out').addEventListener('click', async () => {
  if (!auth) return;
  try { await firebaseAuth.signOut(auth); status('signedOut'); }
  catch { status('signOutFailed'); }
});
