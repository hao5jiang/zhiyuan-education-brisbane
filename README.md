# Zhiyuan Education Australia website

Bilingual English and Chinese website for Zhiyuan Education Australia, a Brisbane mathematics coaching school holding classes in rented facilities at Mansfield State High School.

The website is static. Its files are in `dist/`. GitHub Actions publishes that folder to GitHub Pages after a push to `main`.

The event photographs and logo were supplied for this website. The site does not currently accept homework uploads or provide student accounts.

The `student/` page is a fictional demonstration with browser-memory practice responses. See [IMPLEMENTATION_REPORT.md](IMPLEMENTATION_REPORT.md) for checks, Workers Builds setup, quota notes and rollback steps.

The optional `student/login/` page is a separate Firebase email/password sign-in scaffold. It stays disabled until a Firebase web app is configured. It does not expose student records or accept homework. See [FIREBASE_LOGIN_SETUP.md](FIREBASE_LOGIN_SETUP.md).

The `enrol/` page previews a class enquiry in English or Chinese. It collects no names or contact details, sends nothing, and does not reserve a place. See [ENROLMENT_DEMO_REPORT.md](ENROLMENT_DEMO_REPORT.md) for this addition and its verification.

The homepage gives the enrolment preview priority in the navigation and hero. See [ENROLMENT_PROMINENCE_REPORT.md](ENROLMENT_PROMINENCE_REPORT.md) for the follow-up change.
