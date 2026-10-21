# El Fota Boss — GitHub Pages + Formspree + Mailchimp demo

Fictional B2B hotel supplies brand; **not a real supplier**.

## What's already wired
- Quotation form posts to: `https://formspree.io/f/mzednpyk`.
- Name, email, company, category, estimated quantity, additional details, and contact permission are included in the submission.
- Campaign UTM values (source / medium / campaign) are included if present in the page URL.
- Form uses AJAX (`fetch`) and displays a success message **only after Formspree returns an HTTP success**. If there is an error, it displays an error and lets users retry.
- It DOES NOT subscribe form submitters to Mailchimp. This is intentional: requesting a quote is not marketing consent.

## Publish to GitHub Pages
1. Put `index.html`, `styles.css`, `script.js`, `assets/` in the root of a public GitHub repository.
2. In repository Settings → Pages, publish from `main` / `(root)`.
3. Use the actual published link for your Mailchimp campaign.
4. Check Formspree dashboard and verify any destination-email confirmation requested by Formspree. Formspree account settings control where emails arrive.
5. Submit a **test enquiry** using an email you own. Check the Formspree submissions dashboard AND your inbox/spam. We have not independently tested live delivery.

## Mailchimp campaign
- Mailchimp handles email sends and email click reporting, not the form submission itself.
- Suggested campaign: `El Fota Boss | Hospitality Quote | Test 01`
- Subject: `Your Hotel Deserves the Boss Treatment`
- CTA URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/?utm_source=mailchimp&utm_medium=email&utm_campaign=elfotaboss_test01#quote`
- Send only to contacts who have consented, using your internal testing segment.

## Tracking
- Mailchimp: opens (approximate), clicks, delivery.
- Formspree: successful quote form submissions; their notification emails can contain UTM fields.
- GA4: not yet connected; requires separate setup if you want visit and conversion analytics.
- Keep your Formspree endpoint public, but **never put secret API tokens in a public repository**.
