const steps = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Age Verification",
  "Data Collection Agreement",
  "Marketing Communications",
  "Nationality Declaration",
  "Identity Verification",
  "Refund Policy",
  "Community Guidelines",
  "Email Ownership",
  "Tracking Consent",
  "Analytics Consent",
  "Device Ownership",
  "Third-Party Sharing",
  "Geolocation Consent",
  "Phone Number Verification",
  "SMS Communications",
  "Push Notifications",
  "Biometric Data Consent",
  "Payment Method Verification",
  "Subscription Terms",
  "Auto-Renewal Agreement",
  "Cancellation Policy",
  "Billing Address Confirmation",
  "Shipping Terms",
  "Return Policy",
  "Tax Compliance",
  "Export Controls",
  "Age Gate Confirmation",
  "Parental Consent",
  "Accessibility Terms",
  "DMCA Policy",
  "Anti-Spam Policy",
  "Account Security",
  "Password Policy",
  "Two-Factor Authentication",
  "Backup Codes",
  "Recovery Email",
  "Security Questions",
  "Identity Documents",
  "KYC Compliance",
  "AML Compliance",
  "Sanctions Screening",
  "Risk Disclosure",
  "Liability Waiver",
  "Arbitration Agreement",
  "Class Action Waiver",
  "Final Review",
  "Completion Confirmation"
];

const policies = steps.map((step, idx) => 
`POLICY ${String(idx + 1).padStart(2, '0')} — ${step.toUpperCase()}

1. SCOPE
This policy governs your interaction with the Policy Verification Portal in relation to ${step.toLowerCase()}. By proceeding through this step, you acknowledge and agree that this document forms a binding agreement. These terms apply to all interactions regardless of access method.

2. INFORMATION COLLECTION
In connection with this policy, we may collect, process, store, and analyze information including but not limited to identifiers, device attributes, network metadata, interaction patterns, and contextual data. All processing is conducted for compliance verification, security assurance, and operational integrity.

3. DATA USAGE AND SHARING
Collected information may be used to verify compliance, enforce terms, maintain security, and fulfill legal obligations. Information may be shared with authorized service providers, compliance partners, or as required by applicable law or legal process. Cross-border transfers may occur in accordance with applicable regulations.

4. RETENTION
Data collected under this policy is retained for the period necessary to fulfill its stated purpose, satisfy legal obligations, resolve disputes, and enforce agreements. Retention periods may extend beyond the completion of verification where required by law.

5. CONSENT AND ENFORCEMENT
Your explicit acknowledgment constitutes consent to all provisions herein. Compliance may be monitored through automated systems. Violations may result in access restriction, suspension, or termination without prior notice or refund. All enforcement decisions remain final within the scope of this agreement.

6. LIMITATIONS AND DISCLAIMERS
This policy is provided without warranties of any kind, express or implied. To the fullest extent permitted by law, liability is limited as specified herein. The service is provided on an as-available basis.

7. DISPUTE RESOLUTION
Any dispute arising from or relating to this policy shall be resolved through binding individual arbitration. You hereby waive the right to participate in class actions, collective proceedings, or jury trials. The arbitrator's decision shall be final and binding.

8. AMENDMENTS
We reserve the right to modify this policy at any time without notice. Continued participation constitutes acceptance of any revisions. You are responsible for reviewing the current version.

9. ACKNOWLEDGMENT
By selecting the acceptance checkbox below, you confirm that you have read, understood, and voluntarily agree to be bound by all terms and conditions set forth in this policy document.`
);

let currentStep = 0;

const header = document.getElementById('siteHeader');
const card = document.getElementById('card');
const progressBar = document.getElementById('progressBar');
const cardTitle = document.getElementById('cardTitle');
const stepCounter = document.getElementById('stepCounter');
const cardBody = document.getElementById('cardBody');
const overlay = document.getElementById('overlay');

window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

function renderStep() {
  progressBar.style.width = ((currentStep / steps.length) * 100) + '%';
  stepCounter.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  cardTitle.textContent = steps[currentStep];
  
  cardBody.innerHTML = '';
  
  const stepName = document.createElement('h2');
  stepName.className = 'step-name';
  stepName.textContent = steps[currentStep];
  cardBody.appendChild(stepName);
  
  const policyContainer = document.createElement('div');
  policyContainer.className = 'policy-container';
  
  const policyHeader = document.createElement('div');
  policyHeader.className = 'policy-header';
  
  const policyLabel = document.createElement('span');
  policyLabel.className = 'policy-label';
  policyLabel.textContent = 'Policy Document';
  
  const policyScroll = document.createElement('span');
  policyScroll.className = 'policy-scroll-indicator';
  policyScroll.textContent = 'Scroll to read';
  
  policyHeader.appendChild(policyLabel);
  policyHeader.appendChild(policyScroll);
  
  const policyText = document.createElement('div');
  policyText.className = 'policy-text';
  policyText.textContent = policies[currentStep];
  
  policyContainer.appendChild(policyHeader);
  policyContainer.appendChild(policyText);
  cardBody.appendChild(policyContainer);
  
  const consentRow = document.createElement('div');
  consentRow.className = 'consent-row';
  
  const checkboxWrap = document.createElement('label');
  checkboxWrap.className = 'checkbox-custom';
  
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = `consent-${currentStep}`;
  
  const checkboxBox = document.createElement('span');
  checkboxBox.className = 'checkbox-box';
  
  checkboxWrap.appendChild(checkbox);
  checkboxWrap.appendChild(checkboxBox);
  
  const consentLabel = document.createElement('label');
  consentLabel.className = 'consent-label';
  consentLabel.htmlFor = `consent-${currentStep}`;
  consentLabel.textContent = 'I have read, understood, and accept the terms of this policy';
  
  consentRow.appendChild(checkboxWrap);
  consentRow.appendChild(consentLabel);
  cardBody.appendChild(consentRow);
  
  const continueBtn = document.createElement('button');
  continueBtn.className = 'btn-primary';
  continueBtn.textContent = 'Continue';
  continueBtn.disabled = true;
  
  checkbox.addEventListener('change', () => {
    continueBtn.disabled = !checkbox.checked;
  });
  
  continueBtn.addEventListener('click', () => {
    continueBtn.disabled = true;
    checkbox.disabled = true;
    overlay.classList.add('active');
    
    setTimeout(() => {
      overlay.classList.remove('active');
      currentStep++;
      
      if (currentStep < steps.length) {
        renderStep();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        renderComplete();
      }
    }, 2000);
  });
  
  cardBody.appendChild(continueBtn);
  
  card.classList.remove('revealed');
  void card.offsetWidth;
  card.classList.add('revealed');
}

function renderComplete() {
  progressBar.style.width = '100%';
  stepCounter.textContent = `Complete`;
  cardTitle.textContent = 'Verification Complete';
  
  cardBody.innerHTML = '';
  
  const infoText = document.createElement('p');
  infoText.style.color = 'var(--text-secondary)';
  infoText.style.marginBottom = '16px';
  infoText.textContent = 'All policies have been reviewed and accepted.';
  
  cardBody.appendChild(infoText);
  
  const claimText = document.createElement('p');
  claimText.style.color = 'var(--text-primary)';
  claimText.style.fontWeight = '500';
  claimText.textContent = 'We have your verification record. Enter your email to complete the process.';
  
  cardBody.appendChild(claimText);
  
  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.className = 'email-input';
  emailInput.placeholder = 'name@example.com';
  emailInput.id = 'emailInput';
  
  cardBody.appendChild(emailInput);
  
  const verifyBtn = document.createElement('button');
  verifyBtn.className = 'btn-primary';
  verifyBtn.textContent = 'Complete Verification';
  
  verifyBtn.addEventListener('click', () => {
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';
    
    const resultText = document.createElement('div');
    resultText.className = 'result-text';
    resultText.textContent = 'Verification Complete';
    
    resultContainer.appendChild(resultText);
    cardBody.appendChild(resultContainer);
    
    verifyBtn.disabled = true;
    emailInput.disabled = true;
    
    const restartSection = document.createElement('div');
    restartSection.className = 'restart-section';
    
    const restartQuestion = document.createElement('p');
    restartQuestion.className = 'restart-question';
    restartQuestion.textContent = 'Would you like to start a new verification?';
    
    const restartActions = document.createElement('div');
    restartActions.className = 'restart-actions';
    
    const restartBtn = document.createElement('button');
    restartBtn.className = 'btn-primary btn-restart-large';
    restartBtn.textContent = 'Start New';
    
    restartBtn.addEventListener('click', () => {
      currentStep = 0;
      renderStep();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    const dismissBtn = document.createElement('button');
    dismissBtn.className = 'btn-restart-small';
    dismissBtn.textContent = 'No, thanks';
    
    dismissBtn.addEventListener('click', () => {
      dismissBtn.textContent = 'Done';
      dismissBtn.disabled = true;
      restartBtn.disabled = true;
    });
    
    restartActions.appendChild(restartBtn);
    restartActions.appendChild(dismissBtn);
    restartSection.appendChild(restartQuestion);
    restartSection.appendChild(restartActions);
    cardBody.appendChild(restartSection);
  });
  
  cardBody.appendChild(verifyBtn);
  
  card.classList.remove('revealed');
  void card.offsetWidth;
  card.classList.add('revealed');
}

window.addEventListener('DOMContentLoaded', () => {
  if (card) card.classList.add('revealed');
  renderStep();
});
