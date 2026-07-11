// Funding & grant programs relevant to Northwestern Ontario businesses.
// Each entry carries lastVerified — the date it was re-checked against its official source
// (sourceUrl). Full sweep 2026-07-10 (see Denisbot projects/thunderbay-ai/FUNDING-VERIFICATION-2026-07-10.md).
// Eligibility is guidance only — always "confirm with the program." Programs with a closed
// current intake stay listed with status "2026 Intake Closed" (they reopen); permanently dead
// programs are excluded (CDAP closed 2024; NOIC Next Level on hold). See resources/CONTENT-ENGINE.md
// for the upkeep cadence. Proof-integrity: do not edit a number/deadline without re-checking the source.
export const GRANTS_DATA = [
  {
    id: "fednor-raii",
    lastVerified: "2026-07-10",
    name: "Regional Artificial Intelligence Initiative (RAII)",
    source: "FedNor",
    maxAmount: "Varies — confirm with program",
    coverage: "Up to 50% of capital costs; up to 75% of non-capital costs (for-profits)",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Supports AI commercialization and adoption in Northern Ontario — helping AI scale-ups bring products to market and assisting SMEs in integrating AI into their operations. A two-phase application via the FedNor portal; contact a FedNor officer to begin.",
    eligibility: {
      location: "Northern Ontario",
      businessType: "Incorporated SMEs, not-for-profits, Indigenous communities & organizations, municipalities",
      excludes: "Retail and service-based businesses",
      requirements: "Contact a FedNor officer (1-877-333-6673) before applying; demonstrate AI readiness or scale-up potential."
    },
    sourceUrl: "https://fednor.canada.ca/en/our-programs/regional-artificial-intelligence-initiative-raii-northern-ontario"
  },
  {
    id: "fednor-bsp",
    lastVerified: "2026-07-10",
    name: "Business Scale-up and Productivity (BSP)",
    source: "FedNor (REGI)",
    maxAmount: "$500,000",
    coverage: "Up to 50% of eligible costs (repayable contribution)",
    deadline: "Continuous Intake — limited budget",
    status: "Active",
    badgeType: "active",
    description: "Repayable contributions to help established Northern Ontario businesses accelerate growth, adopt innovative technologies, enter new markets, and improve productivity. Well-suited to technology adoption and digital transformation projects.",
    eligibility: {
      location: "Northern Ontario",
      businessType: "Incorporated SMEs; Indigenous (First Nation, Metis, Inuit) businesses",
      excludes: "Retail/service businesses; applicants with fewer than 2 years of operations",
      requirements: "Demonstrated financial & managerial capacity; contribute at least 50% of remaining eligible costs; contact FedNor before applying (limited budget)."
    },
    sourceUrl: "https://fednor.canada.ca/en/our-programs/regional-economic-growth-through-innovation-regi/business-scale-and-productivity-northern-ontario"
  },
  {
    id: "fednor-rtri",
    lastVerified: "2026-07-10",
    name: "Regional Tariff Response Initiative (RTRI)",
    source: "FedNor",
    maxAmount: "$1,000,000 non-repayable (more available as repayable)",
    coverage: "Up to 50% of costs (non-repayable to $1M); up to 75% (repayable above $1M)",
    deadline: "Open to March 31, 2028",
    status: "Active",
    badgeType: "active",
    description: "Helps Northern Ontario SMEs hurt by trade tariffs diversify markets, boost productivity, and build supply-chain resilience. Eligible activities include technology and automation investments, supply-chain optimization, reshoring, and market development.",
    eligibility: {
      location: "Northern Ontario",
      businessType: "Incorporated SMEs, including Indigenous businesses",
      excludes: "Retail businesses; tourism sector",
      requirements: "Minimum 5 full-time employees; viable operations 3+ consecutive years; show negative tariff impact (or 25%+ sales in tariff-affected markets)."
    },
    sourceUrl: "https://fednor.canada.ca/en/our-programs/regional-tariff-response-initiative"
  },
  {
    id: "fednor-nodp-ced",
    lastVerified: "2026-07-10",
    name: "Northern Ontario Development Program — Community Economic Development",
    source: "FedNor",
    maxAmount: "Varies — confirm with program",
    coverage: "Up to 33% of capital costs; up to 50% of non-capital costs",
    deadline: "Continuous Intake — limited budget",
    status: "Active",
    badgeType: "active",
    description: "Funds community economic development projects led by municipalities, First Nations, and not-for-profits — strategic planning, feasibility studies, workforce attraction, downtown revitalization, and economic-development internships.",
    eligibility: {
      location: "Northern Ontario",
      businessType: "Not-for-profits, Indigenous communities & organizations, municipalities",
      excludes: "Private for-profit businesses (separate NODP streams apply); social infrastructure (education, health, long-term care); retail, wholesale, accommodation & administrative facilities; recreational/cultural infrastructure (museums, arenas, libraries); government services; land or rolling-stock purchases",
      requirements: "Minimum 10% applicant contribution; contact FedNor before applying (budget is limited due to demand)."
    },
    sourceUrl: "https://fednor.canada.ca/en/our-programs/northern-ontario-development-program-nodp/community-economic-development"
  },
  {
    id: "noic-bbaa",
    lastVerified: "2026-07-10",
    name: "Building Blueprints for AI Adoption (BBAA)",
    source: "Northwestern Ontario Innovation Centre (NOIC)",
    featured: true,
    maxAmount: "$20,000",
    coverage: "Up to 50% of eligible project costs",
    deadline: "Verify with program — limited funding",
    status: "Active",
    badgeType: "active",
    description: "Helps Northwestern Ontario SMEs explore and implement AI to improve productivity, efficiency, and competitiveness. Applicants complete a 30/60/90-day AI adoption plan; funding reimburses eligible AI software, consulting, and integration costs.",
    eligibility: {
      location: "Northwestern Ontario",
      businessType: "Growth-oriented for-profit SMEs with a valid Canadian business number",
      excludes: "Distributors, resellers, retail-only businesses, and projects already underway",
      requirements: "Complete a pre-application consultation and a 30/60/90-day AI Adoption Plan; contact NOIC (hussain@nwoinnovation.ca · 807-768-6682)."
    },
    sourceUrl: "https://www.nwoinnovation.ca/programs/bbaa/"
  },
  {
    id: "noic-costarter",
    lastVerified: "2026-07-10",
    name: "Costarter Accelerator",
    source: "Northwestern Ontario Innovation Centre (NOIC)",
    maxAmount: "Non-dilutive contribution + office space",
    coverage: "Cash investment plus 13 weeks of office space and mentorship",
    deadline: "Verify with program — between intakes",
    status: "Verify",
    badgeType: "closing",
    description: "A 13-week intensive accelerator for early-stage entrepreneurs in the Thunder Bay or Kenora districts ready to commit full-time. Provides a non-dilutive cash contribution, co-working space, mentorship, and investor connections for scalable ideas with early prototypes.",
    eligibility: {
      location: "Thunder Bay or Kenora districts, Northwestern Ontario",
      businessType: "Founders/teams with a scalable idea and an early prototype, willing to commit full-time",
      excludes: "Those unable to commit full-time for the program duration",
      requirements: "Scalable idea with a prototype; willingness to operate in Northwestern Ontario; contact NOIC to confirm the next intake."
    },
    sourceUrl: "https://www.nwoinnovation.ca/programs/costarter/"
  },
  {
    id: "nohfc-invest-north-launch",
    lastVerified: "2026-07-10",
    name: "NOHFC Invest North — Launch",
    source: "Northern Ontario Heritage Fund Corporation (NOHFC)",
    maxAmount: "$200,000",
    coverage: "Up to 50% of total eligible project costs (conditional contribution)",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "A conditional contribution to help entrepreneurs launch new businesses in Northern Ontario. Covers eligible capital costs — equipment, leasehold improvements, IT systems, and limited marketing. The business must be operating 6 months or less, and the owner must work full-time.",
    eligibility: {
      location: "Northern Ontario (confirm eligible boundaries with NOHFC)",
      businessType: "New private-sector businesses",
      excludes: "Retail, accommodation, food service, wholesale, beverage-alcohol manufacturing",
      requirements: "Operating 6 months or less; owner full-time; minimum 15% applicant cash contribution; total government funding cannot exceed 50%."
    },
    sourceUrl: "https://nohfc.ca/private-programs/invest-north-launch/"
  },
  {
    id: "nohfc-invest-north-grow",
    lastVerified: "2026-07-10",
    name: "NOHFC Invest North — Grow",
    source: "Northern Ontario Heritage Fund Corporation (NOHFC)",
    maxAmount: "$1,000,000 loan / $400,000 grant",
    coverage: "Grant up to 20% of costs; loan up to 50%; hybrid option available",
    deadline: "Quarterly: Apr 30, Jul 31, Oct 31, Jan 31",
    status: "Active",
    badgeType: "active",
    description: "Helps existing Northern Ontario businesses expand through a mix of grant contributions and/or term loans. Three structures: contribution-only (to $400K), hybrid contribution-plus-loan (to $1M combined), or loan-only (to $1M). Projects must create or retain full-time jobs.",
    eligibility: {
      location: "Northern Ontario (confirm eligible boundaries)",
      businessType: "Existing private-sector businesses with growth plans",
      excludes: "Retail/consumer-service businesses, accommodation, food service, beverage-alcohol manufacturing",
      requirements: "Existing Northern Ontario operations; create/retain full-time jobs; total government funding cannot exceed 50% of eligible capital costs; secure additional financing."
    },
    sourceUrl: "https://nohfc.ca/private-programs/invest-north-grow/"
  },
  {
    id: "nohfc-invest-north-innovation",
    lastVerified: "2026-07-10",
    name: "NOHFC Invest North — Innovation",
    source: "Northern Ontario Heritage Fund Corporation (NOHFC)",
    maxAmount: "$2,000,000",
    coverage: "Up to 50% of eligible costs (R&D to $500K; combined R&D/demo/commercialization to $2M)",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Supports research, development, and commercialization of new technologies in Northern Ontario — technical labour, prototyping, testing and certification, IP protection, and commercialization-tied marketing. Apply alone or partnered with an academic or research institution.",
    eligibility: {
      location: "Northern Ontario (confirm eligible boundaries)",
      businessType: "Private-sector businesses; academic/research partnerships eligible",
      excludes: "Internal-efficiency-only projects; land purchases; working capital",
      requirements: "Private-sector entity must be the lead applicant; total government funding cannot exceed 75% of eligible costs."
    },
    sourceUrl: "https://nohfc.ca/private-programs/invest-north-innovation/"
  },
  {
    id: "nohfc-workforce-development",
    lastVerified: "2026-07-10",
    name: "NOHFC Workforce Development Program",
    source: "Northern Ontario Heritage Fund Corporation (NOHFC)",
    maxAmount: "$35,000 per internship / year",
    coverage: "Up to 50% of intern salary (businesses); up to 90% (municipalities, Indigenous communities, non-profits)",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Subsidizes internship wages so Northern Ontario organizations can hire and train new workers in skilled trades, technology, and professional roles. Up to two funded positions at once; interns must be 18+ and legally entitled to work in Canada.",
    eligibility: {
      location: "Northern Ontario",
      businessType: "Businesses, municipalities, Indigenous communities, and non-profits",
      excludes: "General manual labour, minimal-training, clerical, or retail/sales roles",
      requirements: "Operating 1+ year with at least 1 full-time employee; public job posting / fair hiring; intern must not have held a prior NOHFC-funded internship."
    },
    sourceUrl: "https://nohfc.ca/public-program/workforce-development-program/"
  },
  {
    id: "nrc-irap",
    lastVerified: "2026-07-10",
    name: "NRC Industrial Research Assistance Program (IRAP)",
    source: "National Research Council Canada (NRC)",
    maxAmount: "Varies — scoped with your NRC Industrial Technology Advisor",
    coverage: "Financial contributions for R&D plus advisory support",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Canada's flagship innovation funding for SMEs developing and commercializing technology products and services. Provides R&D contributions plus advice from an Industrial Technology Advisor. Streams include Core, AI Assist, and Clean Technology.",
    eligibility: {
      location: "Canada (available to Northwestern Ontario businesses)",
      businessType: "Incorporated, for-profit companies with up to 500 full-time employees",
      excludes: "Sole proprietorships, partnerships, cooperatives; non-commercializable projects",
      requirements: "Technology-driven innovation with commercialization potential; engage an NRC Industrial Technology Advisor (1-877-994-4727) first."
    },
    sourceUrl: "https://nrc.canada.ca/en/support-technology-innovation/about-nrc-industrial-research-assistance-program"
  },
  {
    id: "sred-tax-credit",
    lastVerified: "2026-07-10",
    name: "Scientific Research & Experimental Development (SR&ED) Tax Incentive",
    source: "Canada Revenue Agency (CRA)",
    maxAmount: "Up to 35% refundable credit on up to $6M of eligible R&D (CCPCs)",
    coverage: "35% refundable ITC for CCPCs; 15% for other businesses",
    deadline: "Filed annually with your corporate tax return",
    status: "Active",
    badgeType: "active",
    description: "A federal tax incentive that reduces income tax payable — or provides a cash refund — for qualifying R&D done in Canada. Applies to basic research, applied research, and experimental development, and can stack with provincial R&D credits. Changed in 2026: Budget 2025 (Bill C-15) doubled the enhanced-credit expenditure limit from $3M to $6M, retroactive to tax years beginning on or after December 16, 2024, and raised the taxable-capital phase-out to $15M–$75M.",
    eligibility: {
      location: "Canada (all provinces including Ontario)",
      businessType: "Canadian corporations, partnerships, or individuals doing eligible R&D; highest benefit for CCPCs",
      excludes: "Market research, routine data collection, quality control, social-science research",
      requirements: "Work must advance scientific knowledge or achieve technological advancement; file with your corporate return; consult a qualified SR&ED practitioner."
    },
    sourceUrl: "https://www.canada.ca/en/revenue-agency/services/scientific-research-experimental-development-tax-incentive-program.html"
  },
  {
    id: "futurpreneur-core-startup",
    lastVerified: "2026-07-10",
    name: "Futurpreneur Canada — Core Startup",
    source: "Futurpreneur Canada",
    maxAmount: "$75,000",
    coverage: "Up to $25,000 Futurpreneur loan + up to $50,000 BDC co-loan, plus 2 years of mentorship",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Startup financing and a mandatory two-year mentorship for entrepreneurs aged 18–39, including in Thunder Bay and Northwestern Ontario. Combines a Futurpreneur loan with a BDC co-investment loan for up to $75,000 total.",
    eligibility: {
      location: "Canada (available in Thunder Bay & Northwestern Ontario)",
      businessType: "For-profit startups and existing businesses with less than a year of significant sales",
      excludes: "Contractor/agent arrangements for existing businesses; businesses with a year or more of significant sales",
      requirements: "Aged 18–39; Canadian citizen or permanent resident; complete business plan and 24-month cash-flow projection."
    },
    sourceUrl: "https://futurpreneur.ca/en/offering/core-startup/"
  },
  {
    id: "ontario-starter-company-plus",
    lastVerified: "2026-07-10",
    name: "Starter Company Plus",
    source: "Ontario · Thunder Bay & District Entrepreneur Centre",
    maxAmount: "$5,000",
    coverage: "Grant up to $5,000 plus training and a three-month mentorship (applicant investment required — confirm the current terms)",
    deadline: "2026 intake closed — ask the Entrepreneur Centre about the next intake",
    status: "2026 Intake Closed",
    badgeType: "closed",
    description: "A provincial grant and training program for Ontario entrepreneurs starting, buying, or expanding a small business — up to 15 hours of training, business-plan help, a grant up to $5,000, and a three-month mentorship. A dedicated Indigenous stream is available locally. Applications for the 2026 program are closed; the program runs in intakes, so check with the Entrepreneur Centre for the next one.",
    eligibility: {
      location: "Thunder Bay & surrounding Northwestern Ontario",
      businessType: "For-profit small businesses starting, buying, or expanding",
      excludes: "Charities, non-profits, and certain regulated industries",
      requirements: "18+; Ontario resident & Canadian citizen/PR; not a full-time student; confirm the next intake and investment terms with the Entrepreneur Centre (807-625-3960)."
    },
    sourceUrl: "https://gotothunderbay.ca/supportprograms/starter-company-program/"
  },
  {
    id: "ontario-summer-company",
    lastVerified: "2026-07-10",
    name: "Summer Company",
    source: "Ontario · Thunder Bay & District Entrepreneur Centre",
    maxAmount: "$3,000",
    coverage: "Up to $3,000 in seed funding plus coaching",
    deadline: "2026 deadline was May 15 (closed) — reopens each spring",
    status: "2026 Intake Closed",
    badgeType: "closed",
    description: "Up to $3,000 in seed funding plus hands-on coaching for full-time students aged 15–29 who want to start and run a summer business, working with local business leaders throughout the program. The 2026 application deadline (May 15) has passed; the program reopens seasonally each spring.",
    eligibility: {
      location: "Thunder Bay & surrounding Northwestern Ontario",
      businessType: "New summer businesses",
      excludes: "Applicants who previously received a Summer Company grant",
      requirements: "Aged 15–29 and a full-time student; confirm the next intake with the Entrepreneur Centre (807-625-3960)."
    },
    sourceUrl: "https://www.ontario.ca/page/start-summer-company-students"
  },
  {
    id: "nadf-business-loans",
    lastVerified: "2026-07-10",
    name: "NADF Business Loans (incl. Microloans & Indigenous Women in Business)",
    source: "Nishnawbe Aski Development Fund (NADF), Thunder Bay",
    maxAmount: "$500,000 (up to $1M in exceptional cases)",
    coverage: "Loans at 8.5%–12%; minimum 10% cash equity (ages 18–39)",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Business loans and advisory support for Indigenous entrepreneurs and majority Indigenous-owned businesses across Northern Ontario, including Thunder Bay. Specialized streams include microloans, winter-road financing, and the Indigenous Women in Business Program.",
    eligibility: {
      location: "Northern Ontario (NAN Treaty 9, Ontario Treaty 5, Treaty 3, Robinson-Superior 1850)",
      businessType: "Indigenous-owned startups & existing businesses (51%+ Indigenous ownership)",
      excludes: "Non-Indigenous-owned businesses",
      requirements: "18+ and of Indigenous heritage; 10% cash equity (18–39) or 15% (40+); contact NADF (807-623-5397) for assessment."
    },
    sourceUrl: "https://www.nadf.org/loans"
  },
  {
    id: "thunder-bay-ventures-cfdc",
    lastVerified: "2026-07-10",
    name: "Thunder Bay Ventures — Community Futures Loans",
    source: "Thunder Bay Ventures (CFDC, FedNor-funded)",
    maxAmount: "$600,000 (NWOIP) / $150,000 (term loans)",
    coverage: "Flexible repayable loans; rates by term & risk",
    deadline: "Continuous Intake",
    status: "Active",
    badgeType: "active",
    description: "Flexible business loans for startups and expansions in the Thunder Bay area through the FedNor-funded Community Futures network — term loans to $150K, fast microloans, and larger NWOIP loans to $600K, plus free business counselling.",
    eligibility: {
      location: "Thunder Bay area & Northwestern Ontario",
      businessType: "Small businesses at any stage — startups, acquisitions, expansions",
      excludes: "Confirm directly with Thunder Bay Ventures",
      requirements: "Contact Thunder Bay Ventures (info@thunderbayventures.com · 807-768-6650); online application and loan calculator available."
    },
    sourceUrl: "https://www.thunderbayventures.com/funding/"
  }
];

// Render a program's lastVerified ISO date as "July 10, 2026" (deterministic, no locale).
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export function formatVerified(iso) {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Program spotlights for the Intelligence Feed. Real, source-linked items (no fabricated
// dated "news"). The status label stands in for a date so nothing implies a false event.
export const NEWS_DATA = [
  {
    id: "spotlight-rtri",
    title: "FedNor's Regional Tariff Response Initiative is open through 2028",
    source: "FedNor",
    date: "Active · to Mar 2028",
    summary: "Northern Ontario SMEs affected by trade tariffs can access up to $1M (non-repayable) at 50% of costs to diversify markets, automate, and build supply-chain resilience — technology and automation investments are eligible.",
    link: "https://fednor.canada.ca/en/our-programs/regional-tariff-response-initiative"
  },
  {
    id: "spotlight-bbaa",
    title: "NOIC's BBAA grant funds AI adoption for NWO businesses (up to $20K)",
    source: "NWO Innovation Centre",
    date: "Active · limited funding",
    summary: "The Building Blueprints for AI Adoption program reimburses up to 50% of eligible AI software, consulting, and integration costs for growth-oriented Northwestern Ontario SMEs that complete a 30/60/90-day adoption plan.",
    link: "https://www.nwoinnovation.ca/programs/bbaa/"
  },
  {
    id: "spotlight-invest-north",
    title: "NOHFC Invest North backs new and growing Northern businesses",
    source: "NOHFC",
    date: "Active · quarterly intakes",
    summary: "Invest North spans Launch (up to $200K for new businesses), Grow (grant + loan to $1M for expansions), and Innovation (up to $2M for commercializing new technology) across Northern Ontario.",
    link: "https://nohfc.ca/private-programs/invest-north-grow/"
  }
];
