# Contract Template Generator — Build Plan

## Quick Summary

**What:** A wizard-style tool that generates professional contracts for freelancers and small businesses. Answer questions in plain English, get a ready-to-use contract. Supports multiple contract types with explanations for each clause.

**Cost to build & run:** $0 — Pure frontend, templates stored as markdown/JSON.

**Tech:** Next.js + React multi-step form + PDF generation (jsPDF or react-pdf).

**Differentiator:** Not a generic template download. Interactive wizard that explains what each clause does and why you need it. Generates customized contracts based on YOUR specific situation.

---

## The Core Problem

Freelancers and small businesses often:
- Work without contracts (risky)
- Use generic templates that don't fit their situation
- Copy contracts without understanding the terms
- Pay $500-2,000 for lawyer-drafted contracts they use once
- Get burned when scope creeps or clients don't pay

**The reality:**
- 71% of freelancers have experienced non-payment
- Scope creep affects almost every project
- Most disputes could be prevented with clear contract terms

**Your tool makes contracts accessible and understandable.**

---

## What Makes This Different

| Template Downloads | Your Generator |
|-------------------|----------------|
| One-size-fits-all | Customized to your situation |
| Legal jargon | Plain English explanations |
| Download and hope | Interactive wizard |
| No context | Explains each clause |
| Generic terms | Your names, dates, amounts |
| Single format | PDF, DOCX, plain text |

---

## Contract Types Offered

### Core Contracts (MVP)

1. **Freelance Services Agreement**
   - General purpose client work
   - Covers: scope, payment, revisions, ownership, termination
   - Use: Writers, designers, marketers, consultants

2. **Website/App Development Contract**
   - Technical projects with specific deliverables
   - Covers: specifications, milestones, testing, bugs, hosting
   - Use: Developers, agencies

3. **Consulting Agreement**
   - Advisory and strategy work
   - Covers: scope, confidentiality, deliverables, hours
   - Use: Business consultants, coaches

4. **Non-Disclosure Agreement (Mutual)**
   - Both parties share confidential information
   - Use: Before partnerships, collaborations

5. **Non-Disclosure Agreement (One-Way)**
   - Protecting one party's information
   - Use: Before sharing client data, proprietary info

### Expanded Contracts (V2)

6. **Content Creation Agreement**
   - Writers, video creators, podcasters
   - Covers: content specs, usage rights, attribution

7. **Photography/Videography Contract**
   - Creative shoots
   - Covers: shot list, editing, raw files, usage rights

8. **Retainer Agreement**
   - Ongoing monthly work
   - Covers: hours, rollover, scope, termination

9. **Subcontractor Agreement**
   - Hiring help for your projects
   - Covers: delegation, liability, confidentiality

10. **Partnership Agreement (Simple)**
    - Two parties collaborating
    - Covers: responsibilities, profit split, dissolution

---

## Wizard Flow (Freelance Services Agreement)

### Step 1: The Basics

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 1 of 7: The Basics                                            │
│ [●○○○○○○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ WHO ARE THE PARTIES?                                                │
│                                                                     │
│ YOUR INFORMATION (Service Provider)                                 │
│                                                                     │
│ Your name or business name:                                         │
│ [Jesse Smith_______________________]                                │
│                                                                     │
│ Your address:                                                       │
│ [123 Main St, San Francisco, CA 94102]                             │
│                                                                     │
│ Your email:                                                         │
│ [jesse@example.com________________]                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ CLIENT INFORMATION                                                  │
│                                                                     │
│ Client name or business name:                                       │
│ [Acme Corporation__________________]                                │
│                                                                     │
│ Client address:                                                     │
│ [456 Business Ave, New York, NY 10001]                             │
│                                                                     │
│ Client email:                                                       │
│ [contracts@acme.com_______________]                                │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Project name (optional):                                            │
│ [Website Redesign Project__________]                                │
│                                                                     │
│ [Continue →]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 2: Scope of Work

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 2 of 7: Scope of Work                                         │
│ [●●○○○○○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ WHAT WILL YOU DELIVER?                                              │
│                                                                     │
│ Describe the work you'll provide:                                   │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ Complete redesign of client's 10-page marketing website,       │ │
│ │ including:                                                      │ │
│ │ - New homepage design                                           │ │
│ │ - Updated navigation structure                                  │ │
│ │ - Responsive design for mobile and tablet                       │ │
│ │ - Integration with existing CMS                                 │ │
│ │ - Basic SEO optimization                                        │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ ⓘ Be specific! Vague scope leads to disputes. List exactly what   │
│   you'll deliver and, importantly, what you WON'T deliver.         │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ What is NOT included? (Optional but recommended)                    │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │ - Logo design or branding work                                  │ │
│ │ - Content writing or copywriting                                │ │
│ │ - Photography or image sourcing                                 │ │
│ │ - Ongoing maintenance after launch                              │ │
│ │ - E-commerce functionality                                      │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ ⓘ This prevents scope creep. If it's not listed above, it's not   │
│   included — and you can charge extra for it.                      │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ How many revision rounds are included?                              │
│ [2 rounds___▼]                                                      │
│                                                                     │
│ ○ 1 round    ○ 2 rounds    ○ 3 rounds    ○ Unlimited               │
│                                                                     │
│ ⓘ We recommend 2 rounds for most projects. Unlimited revisions    │
│   can lead to "revision hell" — avoid unless you're charging for  │
│   it with a higher project fee.                                    │
│                                                                     │
│ [← Back] [Continue →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 3: Timeline

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 3 of 7: Timeline                                              │
│ [●●●○○○○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ WHEN WILL YOU WORK?                                                 │
│                                                                     │
│ Project start date:                                                 │
│ [📅 February 1, 2026___]                                           │
│                                                                     │
│ Project type:                                                       │
│ ○ Fixed end date                                                    │
│ ● Estimated completion (flexible)                                   │
│ ○ Ongoing (no end date)                                            │
│                                                                     │
│ Estimated completion:                                               │
│ [📅 March 15, 2026___]                                             │
│                                                                     │
│ ⓘ "Estimated" gives you flexibility if client delays feedback.    │
│   "Fixed" is binding — use only if you have full control.         │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Will there be milestones?                                           │
│ ● Yes, define milestones                                           │
│ ○ No, deliver everything at once                                   │
│                                                                     │
│ Milestones:                                                         │
│ ┌──────────────────────────────────────────────────────────────┐   │
│ │ 1. [Design mockups___________] Due: [Feb 15, 2026]           │   │
│ │ 2. [Homepage development_____] Due: [Feb 28, 2026]           │   │
│ │ 3. [Full site + testing______] Due: [Mar 15, 2026]           │   │
│ │ [+ Add milestone]                                             │   │
│ └──────────────────────────────────────────────────────────────┘   │
│                                                                     │
│ [← Back] [Continue →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 4: Payment Terms

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 4 of 7: Payment                                               │
│ [●●●●○○○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ HOW WILL YOU BE PAID?                                               │
│                                                                     │
│ Payment structure:                                                  │
│ ● Fixed project fee                                                 │
│ ○ Hourly rate                                                       │
│ ○ Monthly retainer                                                  │
│                                                                     │
│ Total project fee:                                                  │
│ [$_____8,500]                                                       │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Payment schedule:                                                   │
│ ○ 100% upfront                                                      │
│ ● Deposit + balance (recommended)                                  │
│ ○ Milestone payments                                                │
│ ○ 100% on completion                                                │
│                                                                     │
│ Deposit amount:                                                     │
│ ●  50% ($4,250) upfront                                            │
│ ○  30% ($2,550) upfront                                            │
│ ○  Custom: [___]%                                                   │
│                                                                     │
│ Balance due:                                                        │
│ ● On completion                                                     │
│ ○ On specific date: [________]                                      │
│                                                                     │
│ ⓘ We strongly recommend at least 30-50% upfront. This protects    │
│   you from non-payment and ensures client commitment.              │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Payment terms:                                                      │
│ Payment due within: [Net 15___▼] of invoice                         │
│                                                                     │
│ ○ Due on receipt    ○ Net 7    ● Net 15    ○ Net 30                │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Late payment:                                                       │
│ ☑ Include late fee clause                                          │
│   Late fee: [1.5]% per [month▼]                                    │
│                                                                     │
│ ⓘ Late fees encourage timely payment. 1.5% monthly is standard    │
│   and legal in most jurisdictions.                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Kill fee (if client cancels):                                       │
│ ☑ Include kill fee clause                                          │
│   If cancelled after signing: Client owes [50]% of total fee       │
│                                                                     │
│ ⓘ A kill fee compensates you for blocked time and opportunity     │
│   cost if the client backs out.                                    │
│                                                                     │
│ [← Back] [Continue →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 5: Ownership & Rights

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 5 of 7: Ownership & Rights                                    │
│ [●●●●●○○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ WHO OWNS THE WORK?                                                  │
│                                                                     │
│ Upon full payment, ownership of the work:                           │
│ ● Transfers to Client (most common)                                │
│ ○ Licensed to Client (you retain ownership)                        │
│ ○ Shared ownership                                                  │
│                                                                     │
│ ⓘ "Transfer" means client owns everything outright. "License"     │
│   means you own it but grant usage rights. Transfer is standard   │
│   for client work.                                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ When does ownership transfer?                                       │
│ ● Upon receipt of final payment (recommended)                      │
│ ○ Upon delivery                                                     │
│ ○ Upon signing this agreement                                       │
│                                                                     │
│ ⓘ "Upon payment" protects you. If they don't pay, they don't own │
│   the work. This is your leverage.                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Portfolio rights:                                                   │
│ ☑ You can display the work in your portfolio                       │
│ ☑ You can describe the work in case studies                        │
│ ☐ You can share work on social media                               │
│                                                                     │
│ ⓘ Most clients agree to portfolio usage. Case studies are great   │
│   for marketing. Ask about social media if you want to post it.   │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ What about work-in-progress if cancelled?                           │
│ ● Client owns work completed and paid for                          │
│ ○ You retain all work until final payment                          │
│ ○ Custom: [describe]                                                │
│                                                                     │
│ [← Back] [Continue →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 6: Legal Terms

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 6 of 7: Legal Terms                                           │
│ [●●●●●●○]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ LEGAL PROTECTIONS                                                   │
│                                                                     │
│ Limitation of liability:                                            │
│ ☑ Cap liability at the total amount paid                           │
│                                                                     │
│ ⓘ This means if something goes wrong, your maximum liability is   │
│   limited to what they paid you — not unlimited damages. This is  │
│   standard and protects both parties.                              │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Confidentiality:                                                    │
│ ☑ Both parties agree to keep project details confidential          │
│                                                                     │
│ ⓘ This protects client's business information and your processes. │
│   Standard in professional agreements.                             │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ Which state/country's laws govern this contract?                    │
│ [California, USA________▼]                                          │
│                                                                     │
│ ⓘ Usually your location as the service provider. If there's a    │
│   dispute, this determines which courts and laws apply.            │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ How should disputes be resolved?                                    │
│ ○ Negotiation first, then courts                                   │
│ ● Negotiation, then mediation, then courts                         │
│ ○ Binding arbitration                                               │
│                                                                     │
│ ⓘ Mediation is cheaper than court and usually faster. Arbitration │
│   is binding and final — good for speed, but you give up the      │
│   right to sue.                                                    │
│                                                                     │
│ [← Back] [Continue →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 7: Review & Generate

```
┌─────────────────────────────────────────────────────────────────────┐
│ FREELANCE SERVICES AGREEMENT                                        │
│ Step 7 of 7: Review & Generate                                     │
│ [●●●●●●●]                                                          │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ REVIEW YOUR CONTRACT                                                │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │                                                                 │ │
│ │ FREELANCE SERVICES AGREEMENT                                    │ │
│ │                                                                 │ │
│ │ This Agreement is entered into as of February 1, 2026          │ │
│ │ between:                                                        │ │
│ │                                                                 │ │
│ │ Service Provider: Jesse Smith                                   │ │
│ │ 123 Main St, San Francisco, CA 94102                           │ │
│ │                                                                 │ │
│ │ Client: Acme Corporation                                        │ │
│ │ 456 Business Ave, New York, NY 10001                           │ │
│ │                                                                 │ │
│ │ 1. SERVICES                                                     │ │
│ │ Provider agrees to deliver the following services              │ │
│ │ ("Services"):                                                   │ │
│ │                                                                 │ │
│ │ Complete redesign of client's 10-page marketing website...     │ │
│ │                                                                 │ │
│ │ [Preview continues...]                                          │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ [View Full Preview]                                                 │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ SUMMARY                                                             │
│                                                                     │
│ ✓ Parties: Jesse Smith ↔ Acme Corporation                         │
│ ✓ Project: Website Redesign Project                                │
│ ✓ Timeline: Feb 1 - Mar 15, 2026 (estimated)                       │
│ ✓ Fee: $8,500 (50% deposit, 50% on completion)                     │
│ ✓ Payment terms: Net 15, 1.5% late fee                             │
│ ✓ Revisions: 2 rounds included                                     │
│ ✓ Ownership: Transfers to client upon final payment                │
│ ✓ Portfolio: You can use for portfolio and case studies            │
│ ✓ Governing law: California, USA                                   │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ [Edit Sections]                                                     │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ GENERATE YOUR CONTRACT                                              │
│                                                                     │
│ [📄 Download PDF]  [📝 Download DOCX]  [📋 Copy Text]              │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ ⚠️  IMPORTANT DISCLAIMER                                           │
│                                                                     │
│ This contract template is for informational purposes only and     │
│ does not constitute legal advice. We recommend having a lawyer    │
│ review any contract before signing, especially for high-value     │
│ projects. Laws vary by jurisdiction.                               │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│                                                                     │
│ 💡 Want to save this for future projects?                          │
│                                                                     │
│ [Save to my account] (creates account with email)                   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Contract Template Structure

### Template as Markdown with Variables

```markdown
# FREELANCE SERVICES AGREEMENT

This Agreement ("Agreement") is entered into as of {{start_date}} ("Effective Date") between:

**Service Provider:**
{{provider_name}}
{{provider_address}}
{{provider_email}}

**Client:**
{{client_name}}
{{client_address}}
{{client_email}}

{{#if project_name}}
Regarding: {{project_name}}
{{/if}}

---

## 1. SERVICES

Provider agrees to deliver the following services ("Services"):

{{scope_description}}

{{#if scope_exclusions}}
**The following are expressly NOT included:**

{{scope_exclusions}}
{{/if}}

---

## 2. REVISIONS

This Agreement includes {{revision_rounds}} round(s) of revisions. Additional revisions beyond this will be billed at {{revision_rate}} per hour.

---

## 3. TIMELINE

{{#if fixed_end_date}}
Work will begin on {{start_date}} and be completed by {{end_date}}.
{{else}}
Work will begin on {{start_date}} with an estimated completion of {{end_date}}. This timeline may be extended if Client delays in providing feedback or required materials.
{{/if}}

{{#if milestones}}
**Milestones:**

{{#each milestones}}
- {{this.name}}: Due {{this.date}}
{{/each}}
{{/if}}

---

## 4. PAYMENT

{{#if fixed_fee}}
**Total Fee:** ${{total_fee}}

**Payment Schedule:**
{{#if deposit_percent}}
- {{deposit_percent}}% (${{deposit_amount}}) due upon signing this Agreement
- {{balance_percent}}% (${{balance_amount}}) due {{balance_due_when}}
{{else}}
- 100% due {{payment_due_when}}
{{/if}}
{{/if}}

{{#if hourly_rate}}
**Hourly Rate:** ${{hourly_rate}}/hour

Provider will invoice {{invoice_frequency}} for hours worked. Payment is due within {{payment_terms}} days of invoice.
{{/if}}

Payment is due within {{payment_terms}} days of invoice.

{{#if late_fee}}
**Late Payment:** A late fee of {{late_fee_percent}}% {{late_fee_period}} will be applied to overdue invoices.
{{/if}}

{{#if kill_fee}}
**Cancellation:** If Client cancels this Agreement after signing, Client agrees to pay {{kill_fee_percent}}% of the total fee for work completed and time reserved.
{{/if}}

---

## 5. OWNERSHIP AND RIGHTS

{{#if ownership_transfer}}
Upon receipt of final payment, all rights, title, and interest in the final deliverables will transfer to Client. Until final payment is received, Provider retains all ownership rights.
{{/if}}

{{#if ownership_license}}
Provider retains ownership of all work. Upon receipt of final payment, Client is granted a {{license_type}} license to use the deliverables for {{license_scope}}.
{{/if}}

{{#if portfolio_rights}}
Provider retains the right to display the work in their portfolio and use it for self-promotion, including {{portfolio_uses}}.
{{/if}}

---

## 6. CONFIDENTIALITY

Both parties agree to keep confidential any proprietary information, business strategies, or technical data shared during this engagement. This obligation survives termination of this Agreement.

---

## 7. LIMITATION OF LIABILITY

{{#if liability_cap}}
Provider's total liability under this Agreement shall not exceed the total amount paid by Client under this Agreement.
{{/if}}

Provider is not liable for any indirect, incidental, or consequential damages arising from this Agreement.

---

## 8. TERMINATION

Either party may terminate this Agreement with {{termination_notice}} days written notice. Upon termination:
- Client pays for all work completed to date
- {{termination_ownership}}

---

## 9. DISPUTE RESOLUTION

This Agreement shall be governed by the laws of {{governing_law}}.

{{#if mediation}}
Any dispute shall first be addressed through good-faith negotiation. If unresolved within 30 days, parties agree to attempt mediation before pursuing other remedies.
{{/if}}

{{#if arbitration}}
Any dispute shall be resolved through binding arbitration in {{arbitration_location}}.
{{/if}}

---

## 10. ENTIRE AGREEMENT

This Agreement constitutes the entire agreement between the parties. Any modifications must be in writing and signed by both parties.

---

**AGREED AND ACCEPTED:**

Service Provider:
Signature: _________________________
Name: {{provider_name}}
Date: _________________________

Client:
Signature: _________________________
Name: {{client_name}}
Date: _________________________
```

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| Form State | React Hook Form or useState | Free |
| Template Engine | Handlebars or string interpolation | Free |
| PDF Generation | jsPDF, react-pdf, or Puppeteer | Free |
| DOCX Generation | docx npm package | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost: $0**

### PDF Generation

```javascript
import jsPDF from 'jspdf';

export function generateContractPDF(contractData, templateContent) {
  const doc = new jsPDF();
  
  // Parse and render markdown-style content
  doc.setFontSize(18);
  doc.text('FREELANCE SERVICES AGREEMENT', 20, 20);
  
  doc.setFontSize(12);
  // ... render each section
  
  return doc.output('blob');
}
```

### DOCX Generation

```javascript
import { Document, Paragraph, TextRun } from 'docx';

export function generateContractDOCX(contractData) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'FREELANCE SERVICES AGREEMENT',
              bold: true,
              size: 32,
            }),
          ],
        }),
        // ... more content
      ],
    }],
  });
  
  return doc;
}
```

---

## SEO Strategy

### Target Keywords
- "freelance contract template"
- "freelance contract generator"
- "freelance agreement template free"
- "consulting contract template"
- "service agreement generator"
- "NDA generator free"
- "contract template for freelancers"

### Long-tail Opportunities
- "freelance web developer contract template"
- "freelance writer contract template"
- "graphic design contract template free"

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "Freelance Contracts: The Complete Guide (With Free Generator)"

**URL:** /blog/freelance-contract-guide

**Target length:** 4,000-5,000 words

**Structure:**
1. Why you need a contract (horror stories without one)
2. What every freelance contract must include:
   - Scope of work
   - Payment terms
   - Revision limits
   - Ownership/IP
   - Termination clauses
3. Clause-by-clause breakdown with examples
4. Red flags to watch for in client contracts
5. Introduce the generator: "Generate yours free →"
6. When to use different contract types
7. When you actually need a lawyer
8. Templates and resources

### Supporting Blog Posts

**Post 1: "The Kill Fee: What It Is and How to Use It"**
- URL: /blog/kill-fee-freelance-contracts
- Length: 1,500 words
- Covers: What it is, how to calculate, when to include
- Links to: Contract Generator

**Post 2: "Payment Terms for Freelancers: Net 15 vs Net 30 vs Upfront"**
- URL: /blog/freelance-payment-terms
- Length: 1,800 words
- Covers: Pros/cons of each, how to negotiate
- Links to: Contract Generator, Rate Calculator

**Post 3: "Who Owns the Work? IP Rights for Freelancers Explained"**
- URL: /blog/freelance-ip-ownership
- Length: 2,000 words
- Covers: Transfer vs license, portfolio rights, work-for-hire
- Links to: Contract Generator

**Post 4: "NDA Templates: When You Need One (And When You Don't)"**
- URL: /blog/nda-template-guide
- Length: 1,500 words
- Covers: Mutual vs one-way, what to include, red flags
- Links to: Contract Generator (NDA type)

**Post 5: "5 Contract Clauses That Saved My Business"**
- URL: /blog/contract-clauses-saved-my-business
- Length: 2,000 words
- Covers: Real stories, specific clauses that helped
- Links to: Contract Generator

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch generator + pillar article | Core assets |
| 2 | Kill fee explainer | Specific clause |
| 3 | Payment terms guide | Practical advice |
| 4 | IP ownership explainer | Complex topic |
| 5 | Contract clauses story | Engaging content |

---

## Lead Capture Strategy

### Free Tier (Everything)
- All contract types
- Unlimited generation
- PDF and DOCX download

### Email Capture Triggers
- "Save your contract for editing later" — requires email
- "Get notified about contract law updates" — requires email
- "Download all contract templates as a bundle" — requires email

---

## Development Phases

### Phase 1: Core Generator (1.5 weeks)
- [ ] Multi-step wizard form
- [ ] Template engine with variable substitution
- [ ] Contract preview
- [ ] PDF generation
- [ ] DOCX generation
- [ ] Copy as text

### Phase 2: Contract Types (1 week)
- [ ] Freelance Services Agreement
- [ ] Web Development Contract
- [ ] Consulting Agreement
- [ ] NDA (Mutual)
- [ ] NDA (One-way)

### Phase 3: Polish (3-5 days)
- [ ] Clause explanations/tooltips
- [ ] Mobile responsiveness
- [ ] Edit/back functionality
- [ ] Progress saving (localStorage)

### Phase 4: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish supporting posts
- [ ] Internal linking

### Phase 5: Expansion (Future)
- [ ] Additional contract types
- [ ] Saved contracts with account
- [ ] E-signature integration (HelloSign API)
- [ ] Client portal for signing

---

## Success Metrics

- **Usage:** Contracts generated per week
- **Engagement:** % who download vs just preview
- **Contract types:** Which types are most popular
- **Content:** Pillar article ranking
- **Conversion:** Email capture rate
