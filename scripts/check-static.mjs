import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const read = path => readFileSync(new URL(path, root), 'utf8');
const page = read('dist/index.html');
const portal = read('dist/student/index.html');
const enrol = read('dist/enrol/index.html');
const enrolScript = read('dist/enrol/enrol.js');
const login = read('dist/student/login/index.html');
const loginScript = read('dist/student/login/login.js');
const loginConfig = read('dist/student/login/firebase-config.js');
const wrangler = JSON.parse(read('wrangler.jsonc'));
const pkg = JSON.parse(read('package.json'));

assert.match(page, /href="student\/"/);
assert.match(page, /href="enrol\/\?v=2"/);
assert.match(page, /class="enrol-link" href="enrol\/\?v=2"/);
assert.match(page, /class="hero-actions"><a class="btn" href="enrol\/\?v=2"/);
assert.match(page, /enrol\/\?lang=zh&v=2/);
assert.match(page, /Application preview only · no details are sent and no place is reserved/);
assert.match(page, /data-enrol-link/);
assert.ok(page.indexOf('id="enrolment"') > page.indexOf('id="learning"'));
assert.ok(page.indexOf('id="enrolment"') < page.indexOf('id="approach"'));
assert.match(page, /data-en="Student demo" data-zh="学生演示"/);
assert.match(page, /class="footer-grid"/);
assert.match(page, /data-en="Student portal demo" data-zh="学生系统演示"/);
assert.match(page, /Classes in rented rooms at Mansfield State High School/);
assert.doesNotMatch(page, /partnering with Mansfield|in partnership with Mansfield|与 Mansfield State High School 合作/);
assert.match(page, /rented facilities at Mansfield State High School/);
assert.match(portal, /\.\/app\.js/);
assert.match(enrol, /\.\/enrol\.js/);
assert.match(enrol, /src="\.\/enrol\.js\?v=2"/);
assert.match(enrol, /\.\.\/images\/logo\.jpg/);
assert.match(enrol, /Demonstration only/);
assert.doesNotMatch(enrol, /<input[^>]+(?:name|email|tel|file)|<textarea/i);
assert.doesNotMatch(enrolScript, /\bfetch\s*\(|\bXMLHttpRequest\b|\blocalStorage\b|\bsessionStorage\b|\bFormData\b/);
assert.match(portal, /\.\/student\.css/);
assert.match(portal, /\.\.\/images\/logo\.jpg/);
assert.equal(wrangler.assets.directory, './dist');
assert.ok(portal.includes('href="./login/"'));
assert.ok(login.includes('src="./login.js"'));
assert.ok(login.includes('src="../../images/logo.jpg"'));
assert.ok(login.includes('id="login-form" hidden'));
for (const symbol of ['browserSessionPersistence','signInWithEmailAndPassword','sendPasswordResetEmail','onAuthStateChanged']) assert.ok(loginScript.includes(symbol));
assert.ok(!loginScript.includes('createUserWithEmailAndPassword'));
assert.ok(loginConfig.includes("apiKey: ''"));
assert.ok(loginConfig.includes("authDomain: ''"));
assert.equal(wrangler.assets.not_found_handling, '404-page');
assert.equal(wrangler.main, undefined);
assert.equal(pkg.devDependencies.wrangler, '4.151.1');

for (const path of ['dist/404.html','dist/student/app.js','dist/student/data-source.js','dist/student/student.css',
  'dist/enrol/index.html','dist/enrol/enrol.css','dist/enrol/enrol.js',
  'dist/student/login/index.html','dist/student/login/login.js','dist/student/login/login.css','dist/student/login/firebase-config.js',
  'dist/images/logo.jpg','dist/images/event-1.jpg','dist/images/event-2.jpg','dist/images/event-3.jpg','dist/images/event-4.jpg']) {
  assert.ok(statSync(join(fileURLToPath(root),path)).size > 0, `${path} must have content`);
}

const dataModule = read('dist/student/data-source.js');
assert.match(enrolScript, /URLSearchParams\(location\.search\)/);
assert.doesNotMatch(dataModule, /\bfetch\s*\(|\bXMLHttpRequest\b|\blocalStorage\b|\bsessionStorage\b/);
assert.doesNotMatch(portal, /type="file"/);
console.log('Static source checks passed.');
