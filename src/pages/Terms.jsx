import React from 'react';
import LegalPage from '../components/LegalPage';

export default function Terms() {
  return (
    <LegalPage
      metaTitle="Terms of Use | Thunder Bay AI"
      metaDesc="The terms for using thunderbayai.com — general information not professional advice, content accuracy, intellectual property, acceptable use, and governing law (Ontario, Canada)."
      path="/terms"
      title="Terms of Use"
      updated="June 28, 2026"
      lead="These terms govern your use of thunderbayai.com. By using the site, you agree to them. If you do not agree, please do not use the site."
      sections={[
        { h: 'What this is', body: ['Thunder Bay AI is an AI-intelligence hub for Northwestern Ontario, operated by Frayze Technologies Inc. (“Frayze”). Content is researched and drafted with the help of an autonomous agent and reviewed by a person before it is published.'] },
        { h: 'Information only — not professional advice', body: [
          'Everything on this site is general information, provided to inform — not to advise. In particular:',
          ['Funding, grant, and program details — including eligibility, amounts, and deadlines — are set by each program and change often. Confirm directly with the program before relying on anything here.', 'Nothing on this site is legal, financial, tax, accessibility, or other professional advice. For your specific situation, consult a qualified professional.'],
        ] },
        { h: 'Accuracy', body: ['We work to keep the content accurate and we review it before publishing, but we make no warranty that it is complete, current, or error-free. Programs, tools, and facts change quickly.'] },
        { h: 'The weekly brief', body: ['If you subscribe, you will receive our weekly email. You can unsubscribe at any time — see the Privacy Policy and the unsubscribe link in every email.'] },
        { h: 'Intellectual property', body: ['The content, design, and branding on this site are owned by us or our licensors. You are welcome to read it and to share links to it. You may not republish, copy, or redistribute substantial portions of it without our written permission.'] },
        { h: 'Links to other sites', body: ['We link to external sites — such as government program pages and news sources — for convenience. We do not control them and are not responsible for their content, accuracy, or practices.'] },
        { h: 'Acceptable use', body: ['Do not use the site unlawfully, attempt to disrupt it or gain unauthorized access to it, or scrape or misuse it in ways that interfere with its operation or others’ use of it.'] },
        { h: 'Disclaimer of warranties', body: ['The site and its content are provided “as is” and “as available,” without warranties of any kind, express or implied, to the fullest extent permitted by law.'] },
        { h: 'Limitation of liability', body: ['To the fullest extent permitted by law, we are not liable for any loss or damage arising from your use of, or reliance on, the site or its content.'] },
        { h: 'Governing law', body: ['These terms are governed by the laws of the Province of Ontario and the federal laws of Canada applicable there.'] },
        { h: 'Changes to these terms', body: ['We may update these terms from time to time. Continued use of the site after a change means you accept the updated terms.'] },
        { h: 'Contact', body: ['Questions about these terms? Email denis@frayze.ca.'] },
      ]}
    />
  );
}
