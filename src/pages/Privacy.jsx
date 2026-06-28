import React from 'react';
import LegalPage from '../components/LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      metaTitle="Privacy Policy | Thunder Bay AI"
      metaDesc="How Thunder Bay AI, operated by Frayze, collects and handles personal information under Canada's PIPEDA — email signups, analytics, your rights, and how to contact us."
      path="/privacy"
      title="Privacy Policy"
      updated="June 28, 2026"
      lead="Thunder Bay AI is an AI-intelligence hub for Northwestern Ontario, operated by Frayze Technologies Inc. This policy explains, in plain language, what personal information we collect, why, and your rights under Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA)."
      sections={[
        { h: 'Who we are', body: ['Thunder Bay AI (“we,” “us,” “our”) is operated by Frayze Technologies Inc. (“Frayze”), a Northwestern Ontario AI, web, and automation studio. Frayze is the organization accountable for the personal information collected through this site.'] },
        { h: 'What we collect', body: [
          'Information you give us:',
          ['If you subscribe to the weekly Signal, your email address.', 'If you submit a funding or build inquiry form, the details you choose to provide — such as your name, email, phone number, and your message.'],
          'Information collected automatically when you visit:',
          ['Standard usage data — the pages you view, the page that referred you, your browser and device type, and an approximate location derived from your IP address — collected with cookies and similar technologies through Google Analytics.', 'Standard server logs kept by our host, which may include IP addresses, for security and operation.'],
        ] },
        { h: 'Why we collect it', body: [
          'We use personal information only for the purposes it was collected for:',
          ['To send you the weekly brief you asked for.', 'To respond to inquiries you send us.', 'To understand how the site is used so we can improve it.', 'To keep the site secure and operating.'],
        ] },
        { h: 'Consent', body: ['When you subscribe, you consent to receive the weekly brief, and you can withdraw that consent at any time (see “Your choices and rights”). For analytics, you can control or refuse cookies through your browser settings or by using Google’s analytics opt-out.'] },
        { h: 'Email and CASL', body: ['The weekly Signal is a commercial electronic message under Canada’s Anti-Spam Legislation (CASL). Every email identifies us and includes a working unsubscribe link, and we honour opt-outs promptly (within 10 business days). We do not sell or rent your email address.'] },
        { h: 'How we share it', body: [
          'We do not sell your personal information. We rely on a small number of trusted service providers to run the site, and they process data only on our instructions:',
          ['Netlify — website hosting and form processing.', 'Google — website analytics.'],
          'These providers may store or process data outside Canada, including in the United States, where it may be subject to the laws of that jurisdiction.',
        ] },
        { h: 'Cookies and analytics', body: ['We use cookies for analytics to understand site usage. You can disable cookies in your browser or use Google’s opt-out tools; the site still works without them.'] },
        { h: 'Retention', body: ['We keep personal information only as long as needed for the purpose it was collected for — for example, your email address for as long as you remain subscribed — or as required by law, after which we delete or anonymize it.'] },
        { h: 'Security', body: ['We use reasonable administrative and technical safeguards to protect personal information. No method of transmission or storage is perfectly secure, but we work to protect your information appropriately to its sensitivity.'] },
        { h: 'Your choices and rights', body: [
          'Under PIPEDA you may:',
          ['Ask what personal information we hold about you and request access to it.', 'Ask us to correct information that is inaccurate.', 'Withdraw your consent — for example, unsubscribe from the brief — at any time.'],
          'To make a request, contact us using the details below.',
        ] },
        { h: 'Children', body: ['This site is not directed to children, and we do not knowingly collect personal information from children.'] },
        { h: 'Links to other sites', body: ['We link to government program pages, news sources, and other external sites for your convenience. Their privacy practices are their own, and this policy does not cover them.'] },
        { h: 'Changes to this policy', body: ['We may update this policy from time to time. The “last updated” date at the top shows the current version.'] },
        { h: 'Contact and complaints', body: ['For any privacy question or request, email denis@frayze.ca. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada at priv.gc.ca.'] },
      ]}
    />
  );
}
