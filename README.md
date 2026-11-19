# NCETA-2027 Conference Website

Website of the **National Conference on Emerging Trends and Applications (NCETA-2027)**, 7–8 January 2027 (hybrid mode).

Organized by the Departments of Computer Science and Engineering (CSE), CSE (AI & ML) and Computer Applications (CA), Kishkinda University, Ballari, Karnataka, India.

## Conference Overview

NCETA-2027 is a platform for researchers, academicians, industry professionals, students and innovators to present and discuss the latest developments in Artificial Intelligence, Machine Learning, Quantum Computing, IoT, Smart Systems, Cyber Security and emerging technologies.

| Activity | Date |
|---|---|
| Registration Deadline | 17 December 2026 |
| Full Paper Submission | 18 December 2026 |
| Acceptance Notification | 28 December 2026 |
| Camera Ready Paper Submission | 4 January 2027 |
| Conference Dates | 7–8 January 2027 |
| Proceedings Publication | Mid-February 2027 |

## Features

- Nine pages: Home, About, Committee, Call for Papers (with Paper Submission), Speakers, Registration, Schedule, Venue, Contact, plus a 404 page
- Hero banner with a live countdown to the opening session (7 Jan 2027, 09:00 IST)
- Theme cards in five tracks, important-dates timeline, two-day schedule timeline
- Registration fee cards, UPI QR and bank-transfer placeholders, Google Form link
- Speaker cards with biography pop-ups, committee cards, sponsor cards, FAQ, gallery with lightbox
- Dark mode (remembers the visitor's choice, follows the system setting by default) and a larger-text switch
- Accessibility: skip link, keyboard focus outlines, ARIA labels, reduced-motion support, form validation messages
- SEO: page titles and descriptions, Open Graph and Twitter tags, schema.org `Event` structured data, `robots.txt`, `sitemap.xml`, favicon
- Downloadable two-page PDF brochure

## Technologies Used

HTML5, CSS3, Bootstrap 5.3, JavaScript (no framework), Font Awesome 6, AOS (scroll animations), GLightbox (gallery). Libraries load from public CDNs. No backend is required.

## Project Structure

```
nceta2027/
├── index.html  about.html  committee.html  cfp.html  speakers.html
├── registration.html  schedule.html  venue.html  contact.html  404.html
├── css/style.css
├── js/script.js
├── images/  logo.png  banner.jpg  university.jpg  campus.jpg  gallery1-4.jpg  speakers/
├── brochure/NCETA2027_Brochure.pdf
├── robots.txt  sitemap.xml  favicon.ico  README.md
```

## Before Going Live: Replace the Placeholders

| What | Where |
|---|---|
| Campus photographs | Replace `images/university.jpg`, `images/campus.jpg`, `images/gallery1-4.jpg` (keep the names, 4:3 or 3:2) |
| University logo | Replace `images/logo.png` (square PNG) |
| Speaker names, photos, bios | `speakers.html` (put photos in `images/speakers/`) |
| Google Form link | Search for `forms.gle/REPLACE-WITH-YOUR-FORM` in `registration.html` |
| UPI ID and QR code | Search for `nceta2027@upi` in `registration.html`; add `images/payment-qr.png` and swap the QR placeholder for `<img src="images/payment-qr.png" alt="UPI QR code for NCETA-2027 fees">` |
| Bank details | Bank-transfer table in `registration.html` |
| EasyChair link | Search for `https://easychair.org/` in `cfp.html` and `index.html` |
| Hotels | `venue.html` |
| Social media links | The `href="#"` links in the footer of every page |

## Payment Integration Plan

The site is static (GitHub Pages), so it cannot verify payments itself. **Stage 1 costs nothing and is all the conference needs.** Stages 2 and 3 are optional upgrades: payment gateways charge a fee on every transaction, so use them only if the university decides to.

**Stage 1 – UPI / bank transfer + Google Form (no cost, ready now)**
1. Open a UPI ID on the university's or department's current account (or use the account the Finance Officer assigns). Generate its QR code from the bank or the UPI app and save it as `images/payment-qr.png`.
2. Create a Google Form with: name, category (Faculty/Scholar, Student, Industry), institution, e-mail, phone, paper ID, amount, UTR/transaction ID, payment date, and a file upload for the payment screenshot. Turn on "Collect email addresses" and link responses to a Google Sheet.
3. Ask payers to write `NCETA2027-<PaperID>` in the payment remarks.
4. Reconciliation: each day, match the UTR numbers in the Sheet with the bank statement, mark rows *Verified*, and send confirmation e-mails (a mail-merge add-on or Apps Script can send them automatically).

**Stage 2 (optional, gateway fees apply) – Hosted payment page (instant confirmation, still no backend)**
1. Use a payment gateway that offers hosted payment pages or links without a server, such as Razorpay Payment Pages, Cashfree Payment Forms, PayU or Instamojo. This needs KYC with the university's PAN, GST and bank account; the university's finance office should open it.
2. Create one payment page with the three fee categories as fixed amounts and fields for name, e-mail, phone and paper ID.
3. Put the page's URL in the **Pay Online** buttons in `registration.html`. The gateway sends receipts by e-mail and lists every payment in its dashboard; export it to the registration Sheet.
4. Gateway fees are usually around 2% per transaction; decide whether the conference absorbs them or adds them to the fee.

**Stage 3 (optional) – Full automation**
Add a small serverless function (for example Google Apps Script, Cloudflare Workers or Netlify Functions) that receives the gateway's webhook, verifies its signature with the secret key, and marks the registration as paid in the Sheet. Keep API keys in the function's settings, never in this repository.

**Rules for all stages:** never put API secret keys, bank passwords or personal data in this public repository; publish only the UPI ID, QR code and bank details meant for payers; and state the refund policy on the Registration page.

## Installation and Local Deployment

No build step is needed.

```bash
git clone https://github.com/<yourusername>/nceta2027.git
cd nceta2027
python -m http.server 8000      # then open http://localhost:8000
```

Opening `index.html` directly in a browser also works, but a local server is closer to how GitHub Pages serves the site.

## GitHub Pages Deployment

1. Create a GitHub repository named `nceta2027`
2. Upload all files in this folder (keep the folder structure)
3. Commit to the `main` branch
4. Open **Settings**
5. Open **Pages**
6. Select **Deploy from a branch**
7. Branch = `main`
8. Folder = `/ (root)`
9. Save

After a minute or two the site is live at:

```
https://vadlashiva.github.io/nceta2027/
```

## Free Hosting, No Domain to Buy

The site is set up for GitHub's free address, **https://vadlashiva.github.io/nceta2027/**. Hosting on GitHub Pages is free for public repositories, and no domain purchase is needed. All page links, `robots.txt` and `sitemap.xml` already use this address.

If the university later wants its own address (for example a subdomain such as `nceta2027.kishkindauniversity.edu.in`, which the university's IT team can create at no cost), add a file named `CNAME` containing that address, ask IT to point it to `vadlashiva.github.io` with a CNAME record, enter it under **Settings → Pages → Custom domain**, and replace `https://vadlashiva.github.io/nceta2027` in the page headers, `robots.txt` and `sitemap.xml`.

## Contact Information

**Dr. Shiva Kumar V**, Professor and Convenor, NCETA-2027
Department of Computer Science and Engineering, Kishkinda University, Ballari
Email: shivakumar@kishkindauniversity.edu.in · Mobile: +91 94489 06905
Website: https://www.kishkindauniversity.edu.in
