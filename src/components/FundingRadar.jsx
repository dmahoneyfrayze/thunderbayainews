import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GRANTS_DATA } from '../data';
import TiltCard from './TiltCard';
import { AnimatedGridPattern } from './AnimatedGridPattern';

const calculateGrantMatch = (grant, inNwo, isIncorporated, isScalable) => {
  if (!grant) return null;
  
  if (grant.id === 'fednor-raii') {
    if (inNwo && isIncorporated) {
      return {
        status: 'Excellent Match',
        class: 'success',
        msg: 'Your business qualifies for up to 75% coverage under the FedNor RAII. Frayze can design and deploy your custom AI tool using these funds.'
      };
    } else if (inNwo && !isIncorporated) {
      return {
        status: 'Action Required',
        class: 'warning',
        msg: 'You must be incorporated to access FedNor RAII. Frayze can guide you through incorporation, or you can explore the NOIC Next Level grant which has broader SME criteria.'
      };
    } else {
      return {
        status: 'Low Match',
        class: 'danger',
        msg: 'This grant requires a physical presence in Northern Ontario. Let us help you check other programs or discuss custom options.'
      };
    }
  }
  
  if (grant.id === 'noic-costarter') {
    if (inNwo && isScalable) {
      return {
        status: 'Strong Match',
        class: 'success',
        msg: 'You are highly eligible for the $18K accelerator seed funding. Frayze can build your initial prototype as part of the accelerator program.'
      };
    } else if (!inNwo) {
      return {
        status: 'Ineligible',
        class: 'danger',
        msg: 'NOIC programs are restricted to businesses based in Northwestern Ontario.'
      };
    } else {
      return {
        status: 'Needs Validation',
        class: 'warning',
        msg: 'Costarter requires a scalable product concept. Share your idea with us below, and we can refine it to fit scalable tech criteria.'
      };
    }
  }

  // Default catch-all logic for other grants
  if (inNwo) {
    return {
      status: 'Good Match',
      class: 'success',
      msg: `Your regional presence makes you a strong candidate for ${grant.name}. Contact us to draft the software development proposal.`
    };
  } else {
    return {
      status: 'Low Match',
      class: 'danger',
      msg: 'NWO location is a primary requirement for these regional development funds.'
    };
  }
};

export default function FundingRadar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedGrant, setSelectedGrant] = useState(null);
  
  // Eligibility Calculator State
  const [isIncorporated, setIsIncorporated] = useState(false);
  const [inNwo, setInNwo] = useState(false);
  const [isScalable, setIsScalable] = useState(false);
  const [calculatorChecked, setCalculatorChecked] = useState(false);
  
  // Lead Form State
  const [leadName, setLeadName] = useState('');
  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadConcept, setLeadConcept] = useState('');
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // WebMCP Integration
  useEffect(() => {
    const modelContext = document.modelContext || navigator.modelContext;
    if (modelContext && typeof modelContext.registerTool === 'function') {
      const controller = new AbortController();

      // Tool 1: Retrieve active grants
      modelContext.registerTool({
        name: "get_grants",
        description: "Retrieves a list of all active business funding and grant programs for Northwestern Ontario, including source, max amount, and eligibility criteria.",
        inputSchema: { type: "object", properties: {} },
        execute() {
          return GRANTS_DATA;
        },
        annotations: { readOnlyHint: true }
      }, { signal: controller.signal });

      // Tool 2: Check eligibility for a specific grant
      modelContext.registerTool({
        name: "check_grant_eligibility",
        description: "Calculates match score and eligibility details for a specific grant based on business parameters.",
        inputSchema: {
          type: "object",
          properties: {
            grantId: {
              type: "string",
              enum: ["fednor-raii", "noic-costarter", "noic-next-level", "cedc-youth-effect"],
              description: "The unique ID of the grant to check."
            },
            inNwo: {
              type: "boolean",
              description: "True if the business is physically based in Northwestern Ontario."
            },
            isIncorporated: {
              type: "boolean",
              description: "True if the business is provincially or federally incorporated."
            },
            isScalable: {
              type: "boolean",
              description: "True if the project involves building scalable technology, custom software, CRM, or AI."
            }
          },
          required: ["grantId", "inNwo", "isIncorporated", "isScalable"]
        },
        execute(input) {
          const grant = GRANTS_DATA.find(g => g.id === input.grantId);
          if (!grant) {
            return { error: `Grant program with ID '${input.grantId}' not found.` };
          }

          // Sync parameters to UI for visual state feedback
          setSelectedGrant(grant);
          setInNwo(input.inNwo);
          setIsIncorporated(input.isIncorporated);
          setIsScalable(input.isScalable);
          setCalculatorChecked(true);

          const result = calculateGrantMatch(grant, input.inNwo, input.isIncorporated, input.isScalable);
          return {
            grantName: grant.name,
            matchStatus: result.status,
            details: result.msg,
            maxAmount: grant.maxAmount,
            coverage: grant.coverage
          };
        },
        annotations: { readOnlyHint: true }
      }, { signal: controller.signal });

      return () => {
        controller.abort();
      };
    }
  }, []);

  // Filter logic
  const filteredGrants = GRANTS_DATA.filter((grant) => {
    const matchesSearch = 
      grant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = 
      activeFilter === 'ALL' || 
      grant.source.toUpperCase().includes(activeFilter);
      
    return matchesSearch && matchesCategory;
  });

  const handleOpenCalculator = (grant) => {
    setSelectedGrant(grant);
    setIsIncorporated(false);
    setInNwo(false);
    setIsScalable(false);
    setCalculatorChecked(false);
    setLeadSubmitted(false);
    // Clear lead form
    setLeadName('');
    setLeadEmail('');
    setLeadPhone('');
    setLeadConcept('');
  };

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    setCalculatorChecked(true);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    setLeadSubmitted(true);

    const nativeEvent = e.nativeEvent || e;
    if (nativeEvent.agentInvoked && typeof nativeEvent.respondWith === 'function') {
      nativeEvent.respondWith(
        Promise.resolve(
          `Success: Project proposal submitted successfully for ${leadName} (${leadEmail}). A Frayze software and grant strategist will analyze details and follow up.`
        )
      );
    }
  };

  const elResult = calculateGrantMatch(selectedGrant, inNwo, isIncorporated, isScalable);

  return (
    <section id="radar" style={styles.radarSection}>
      {/* Animated background grid pattern from Stitch */}
      <AnimatedGridPattern
        style={styles.gridPattern}
        numSquares={20}
      />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          style={styles.sectionHeader}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="font-label" style={{ marginBottom: '16px', display: 'block' }}>ACTIVE PROGRAMS</span>
          <h2 style={styles.sectionTitle}>Regional <span className="accent-text">Funding Radar</span></h2>
          <p style={styles.sectionSubtitle}>
            We scan CEDC, NOIC, and FedNor channels weekly. Filter active programs and run the eligibility checker to match your growth objectives.
          </p>
        </motion.div>

        {/* Filter Toolbar */}
        <div style={styles.toolbar} className="glass-panel">
          <div style={styles.searchBox}>
            <span style={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              placeholder="Search programs, sources, or tech keywords..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterTabs}>
            {['ALL', 'FEDNOR', 'NOIC', 'CEDC'].map((tab) => (
              <button 
                key={tab} 
                style={{
                  ...styles.tabButton,
                  ...(activeFilter === tab ? styles.tabButtonActive : {})
                }}
                onClick={() => setActiveFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Grid List of Grants */}
        <div style={styles.grantsGrid}>
          {filteredGrants.length > 0 ? (
            filteredGrants.map((grant, i) => (
              <motion.div
                key={grant.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="glass-panel" style={styles.grantCard}>
                  <div style={styles.cardHeader}>
                    <span style={styles.sourceTag}>{grant.source}</span>
                    <span className={`badge badge-${grant.badgeType}`}>{grant.status}</span>
                  </div>
                  
                  <h3 style={styles.cardTitle}>{grant.name}</h3>
                  <p style={styles.cardDescription}>{grant.description}</p>
                  
                  <div style={styles.metaRow}>
                    <div style={styles.metaCol}>
                      <span style={styles.metaLabel}>Max Funding</span>
                      <span style={styles.metaValue} className="accent-text">{grant.maxAmount}</span>
                    </div>
                    <div style={styles.metaCol}>
                      <span style={styles.metaLabel}>Coverage</span>
                      <span style={styles.metaValue}>{grant.coverage}</span>
                    </div>
                    <div style={styles.metaCol}>
                      <span style={styles.metaLabel}>Deadline</span>
                      <span style={styles.metaValue}>{grant.deadline}</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary" 
                    style={styles.checkBtn}
                    onClick={() => handleOpenCalculator(grant)}
                  >
                    Verify Eligibility
                  </button>
                </TiltCard>
              </motion.div>
            ))
          ) : (
            <div style={styles.noResults} className="glass-panel">
              <span style={{ fontSize: '32px' }}>🔎</span>
              <p>No funding programs match your search criteria. Try a different filter or search term.</p>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Modal Drawer */}
      <div className={`modal-overlay ${selectedGrant ? 'open' : ''}`} onClick={() => setSelectedGrant(null)}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={() => setSelectedGrant(null)}>✕</button>
          
          {selectedGrant && (
            <div>
              <span style={styles.modalSource}>{selectedGrant.source}</span>
              <h3 style={styles.modalTitle}>{selectedGrant.name}</h3>
              <p style={styles.modalDesc}>{selectedGrant.description}</p>
              
              <div style={styles.modalMetrics}>
                <div><strong>Max Value:</strong> <span className="accent-text">{selectedGrant.maxAmount}</span></div>
                <div><strong>Coverage:</strong> {selectedGrant.coverage}</div>
                <div><strong>Deadline:</strong> {selectedGrant.deadline}</div>
              </div>

              <div style={styles.divider}></div>

              {/* Step 1: Eligibility Form */}
              <form 
                onSubmit={handleCheckEligibility} 
                style={{
                  ...styles.calcForm,
                  display: !calculatorChecked ? 'flex' : 'none'
                }}
              >
                <h4 style={styles.formTitle}>Am I Eligible? (1-Min Assessment)</h4>
                
                <label style={styles.checkLabel}>
                  <input 
                    type="checkbox" 
                    checked={inNwo}
                    onChange={(e) => setInNwo(e.target.checked)}
                    style={styles.checkbox}
                  />
                  Business is physically based in Northwestern Ontario
                </label>

                <label style={styles.checkLabel}>
                  <input 
                    type="checkbox" 
                    checked={isIncorporated}
                    onChange={(e) => setIsIncorporated(e.target.checked)}
                    style={styles.checkbox}
                  />
                  Business is incorporated (Provincial or Federal)
                </label>

                <label style={styles.checkLabel}>
                  <input 
                    type="checkbox" 
                    checked={isScalable}
                    onChange={(e) => setIsScalable(e.target.checked)}
                    style={styles.checkbox}
                  />
                  Project involves building scalable tech, CRM, AI, or automations
                </label>

                <button className="btn btn-cyan" type="submit" style={{ width: '100%', marginTop: '15px' }}>
                  Calculate Match Score
                </button>
              </form>

              {/* Step 2: Assessment Result & Lead Capture */}
              <div style={{ display: calculatorChecked ? 'block' : 'none' }}>
                <div style={{
                  ...styles.resultPanel,
                  borderLeft: `4px solid ${
                    elResult ? (
                      elResult.class === 'success' ? 'hsl(var(--success))' : 
                      elResult.class === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--danger))'
                    ) : 'transparent'
                  }`
                }}>
                  <h4 style={{
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: elResult ? (
                      elResult.class === 'success' ? 'hsl(var(--success))' : 
                      elResult.class === 'warning' ? 'hsl(var(--warning))' : 'hsl(var(--danger))'
                    ) : 'transparent'
                  }}>
                    {elResult?.status}
                  </h4>
                  <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{elResult?.msg}</p>
                  <button 
                    style={styles.recalcBtn}
                    onClick={() => setCalculatorChecked(false)}
                  >
                    ↩ Re-calculate details
                  </button>
                </div>

                <div style={styles.divider}></div>

                {/* Lead Capture */}
                <div style={{ display: !leadSubmitted ? 'block' : 'none' }}>
                  <form 
                    onSubmit={handleLeadSubmit} 
                    style={styles.leadForm}
                    toolname="submit_project_proposal"
                    tooldescription="Submit a request for Frayze to build custom software/AI under a regional grant. Requires user review before final submission."
                  >
                    <h4 style={styles.formTitle}>Book Free Software & Grant Proposal</h4>
                    <p style={styles.leadSubtitle}>
                      Frayze handles your application writing and builds the custom software/AI, paid by the grant. Zero out-of-pocket project proposals.
                    </p>

                    <div className="grid-2" style={{ gap: '15px', marginBottom: '0px' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor="leadName">Full Name</label>
                        <input 
                          type="text" 
                          id="leadName"
                          name="leadName"
                          className="form-input" 
                          required 
                          placeholder="John Doe"
                          value={leadName}
                          onChange={(e) => setLeadName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label" htmlFor="leadEmail">Work Email</label>
                        <input 
                          type="email" 
                          id="leadEmail"
                          name="leadEmail"
                          className="form-input" 
                          required 
                          placeholder="john@company.com"
                          value={leadEmail}
                          onChange={(e) => setLeadEmail(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="leadPhone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="leadPhone"
                        name="leadPhone"
                        className="form-input" 
                        placeholder="807-555-0199"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        toolparamdescription="Your primary contact phone number (e.g., 807-555-0199)"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="leadConcept">What custom build does your business need? (e.g. AI chatbot, Client CRM, custom web portal)</label>
                      <textarea 
                        id="leadConcept"
                        name="leadConcept"
                        className="form-input" 
                        rows="3" 
                        placeholder="Briefly describe what you'd like us to build..."
                        value={leadConcept}
                        onChange={(e) => setLeadConcept(e.target.value)}
                        style={{ resize: 'none', fontFamily: 'inherit' }}
                        toolparamdescription="A description of the custom software, AI agent, CRM, or portal your business needs built."
                      ></textarea>
                    </div>

                    <button className="btn btn-primary" type="submit" style={{ width: '100%' }}>
                      Submit Project Request
                    </button>
                  </form>
                </div>

                <div style={{ ...styles.successPanel, display: leadSubmitted ? 'block' : 'none' }}>
                  <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🎉</span>
                  <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Proposal Requested Successfully!</h4>
                  <p style={{ color: 'hsl(var(--text-secondary))', fontSize: '14px' }}>
                    Thanks {leadName}! A Frayze software and grant strategist will analyze your eligibility details and contact you within 24 hours to schedule a blueprint consultation.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const styles = {
  radarSection: {
    background: 'linear-gradient(180deg, hsl(var(--bg-base)) 0%, hsl(var(--bg-surface)) 100%)',
    position: 'relative',
    overflow: 'hidden',
  },
  gridPattern: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    maskImage: 'radial-gradient(400px circle at 80% 20%, white, transparent)',
    WebkitMaskImage: 'radial-gradient(400px circle at 80% 20%, white, transparent)',
    stroke: 'hsla(184, 100%, 48%, 0.05)',
    fill: 'hsla(184, 100%, 48%, 0.03)',
    color: 'hsl(var(--primary-cyan))',
    pointerEvents: 'none',
    zIndex: 0,
  },
  sectionHeader: {
    textAlign: 'center',
    marginBottom: '60px',
  },
  sectionTitle: {
    fontSize: '38px',
    marginBottom: '16px',
  },
  sectionSubtitle: {
    color: 'hsl(var(--text-secondary))',
    maxWidth: '650px',
    margin: '0 auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 24px',
    marginBottom: '40px',
    gap: '20px',
    flexWrap: 'wrap',
  },
  searchBox: {
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid hsla(0, 0%, 100%, 0.08)',
    borderRadius: '10px',
    padding: '8px 16px',
    flex: 1,
    minWidth: '280px',
  },
  searchIcon: {
    marginRight: '12px',
    color: 'hsl(var(--text-muted))',
  },
  searchInput: {
    background: 'none',
    border: 'none',
    color: 'hsl(var(--text-primary))',
    outline: 'none',
    width: '100%',
    fontFamily: 'inherit',
    fontSize: '14px',
  },
  filterTabs: {
    display: 'flex',
    gap: '8px',
  },
  tabButton: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid hsla(0, 0%, 100%, 0.05)',
    color: 'hsl(var(--text-secondary))',
    padding: '8px 18px',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabButtonActive: {
    background: 'hsl(var(--primary-cyan))',
    color: 'hsl(var(--bg-base))',
    borderColor: 'hsl(var(--primary-cyan))',
  },
  grantsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
    gap: '30px',
  },
  grantCard: {
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  sourceTag: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  cardTitle: {
    fontSize: '20px',
    lineHeight: '1.3',
    marginBottom: '12px',
  },
  cardDescription: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    marginBottom: '24px',
    flex: 1,
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    borderTop: '1px solid hsla(0, 0%, 100%, 0.05)',
    paddingTop: '16px',
    marginBottom: '24px',
    gap: '12px',
  },
  metaCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  metaLabel: {
    fontSize: '11px',
    color: 'hsl(var(--text-muted))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '4px',
  },
  metaValue: {
    fontSize: '13px',
    fontWeight: '600',
  },
  checkBtn: {
    width: '100%',
  },
  noResults: {
    gridColumn: '1 / -1',
    padding: '60px 20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    color: 'hsl(var(--text-secondary))',
  },
  // Modal Styles
  modalSource: {
    fontSize: '12px',
    fontWeight: '700',
    color: 'hsl(var(--primary-cyan))',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    display: 'block',
    marginBottom: '6px',
  },
  modalTitle: {
    fontSize: '24px',
    marginBottom: '16px',
    lineHeight: '1.25',
  },
  modalDesc: {
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    marginBottom: '20px',
  },
  modalMetrics: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    background: 'rgba(0, 0, 0, 0.2)',
    padding: '16px',
    borderRadius: '10px',
    fontSize: '14px',
  },
  divider: {
    height: '1px',
    background: 'hsla(0, 0%, 100%, 0.06)',
    margin: '24px 0',
  },
  calcForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formTitle: {
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '12px',
    textAlign: 'left',
  },
  checkLabel: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    fontSize: '14px',
    color: 'hsl(var(--text-secondary))',
    textAlign: 'left',
    cursor: 'pointer',
    userSelect: 'none',
    padding: '4px 0',
  },
  checkbox: {
    marginTop: '4px',
    accentColor: 'hsl(var(--primary-cyan))',
  },
  resultPanel: {
    background: 'rgba(255, 255, 255, 0.02)',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'left',
  },
  recalcBtn: {
    background: 'none',
    border: 'none',
    color: 'hsl(var(--primary-cyan))',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '12px',
    padding: 0,
  },
  leadForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  leadSubtitle: {
    fontSize: '13px',
    color: 'hsl(var(--text-muted))',
    marginBottom: '20px',
    textAlign: 'left',
  },
  successPanel: {
    padding: '30px 10px',
    textAlign: 'center',
  },
};
