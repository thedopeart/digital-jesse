# Freelance Rate Calculator — Build Plan

## Quick Summary

**What:** A calculator that works backward from desired lifestyle to determine what freelancers should charge. Accounts for taxes, benefits, expenses, and realistic billable hours to show the true hourly/daily/project rate needed.

**Cost to build & run:** $0 — Pure frontend calculator, no APIs needed.

**Tech:** Next.js + React state management. Tax estimates stored locally.

**Differentiator:** Most rate calculators work forward (pick a rate, see income). Yours works backward (pick a lifestyle, see required rate). This is how freelancers actually need to think.

---

## The Core Problem

Freelancers consistently undercharge because they:
- Compare to their old salary hourly rate (ignoring benefits they now pay for)
- Forget self-employment tax (15.3% that employers used to cover half of)
- Assume 40 billable hours/week (reality: 25-30)
- Don't account for vacation, sick days, admin time
- Ignore business expenses
- End up making LESS than they did employed, while working MORE

**The math most freelancers skip:**

Employee making $80,000/year:
- Employer pays ~$6,120 for their half of FICA
- Employer provides ~$7,000 health insurance
- Employer provides ~$4,000 401k match
- 15 days PTO + 10 holidays = paid time off
- **True compensation: ~$97,000+**

Freelancer charging $40/hour thinking "that's $80k/year":
- Self-employment tax: -$12,240
- Health insurance: -$7,000
- No retirement match
- Unpaid time off
- 25 billable hours/week (not 40)
- **Actual income: ~$38,000**

**Your calculator reveals this gap.**

---

## What Makes This Different

| Other Calculators | Your Calculator |
|-------------------|-----------------|
| "Pick an hourly rate" | "What lifestyle do you want?" |
| Ignores self-employment tax | Calculates SE tax automatically |
| Assumes all hours are billable | Factors in realistic billable % |
| Forgets business expenses | Itemized expense inputs |
| Single output | Multiple pricing formats |
| No context | Shows salary equivalent |

---

## User Flow

### Step 1: Desired Income

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 1: WHAT DO YOU WANT TO TAKE HOME?                             │
│                                                                     │
│ Annual take-home goal (after taxes, in your pocket):               │
│ [$________75,000]                                                   │
│                                                                     │
│ ⓘ This is what you want to deposit into your personal account     │
│   after paying all business expenses and taxes.                    │
│                                                                     │
│ Not sure? Think about:                                              │
│ • Your current/previous salary                                      │
│ • Your monthly personal expenses × 12                               │
│ • What you need to feel comfortable                                 │
│                                                                     │
│ [Continue →]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 2: Location (for taxes)

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 2: WHERE ARE YOU LOCATED?                                      │
│                                                                     │
│ Country: [United States ▼]                                          │
│                                                                     │
│ State: [California ▼]                                               │
│                                                                     │
│ Filing status: [Single ▼]                                           │
│   ○ Single                                                          │
│   ○ Married Filing Jointly                                          │
│   ○ Head of Household                                               │
│                                                                     │
│ ⓘ We'll estimate your federal + state income tax and              │
│   self-employment tax (15.3%) based on your location.              │
│                                                                     │
│ [Continue →]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 3: Business Expenses

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 3: BUSINESS EXPENSES                                           │
│                                                                     │
│ These are costs you pay to run your freelance business.            │
│ Enter annual amounts (or $0 if not applicable).                    │
│                                                                     │
│ HEALTHCARE                                                          │
│ Health insurance (annual)         [$_____7,200]                    │
│ ⓘ Average: $600/month for individual                               │
│                                                                     │
│ RETIREMENT                                                          │
│ Retirement contributions          [$_____6,000]                    │
│ ⓘ You should save at least 10-15% of income                        │
│                                                                     │
│ SOFTWARE & TOOLS                                                    │
│ Software subscriptions            [$_____1,200]                    │
│ ⓘ Adobe, Figma, project management, etc.                           │
│                                                                     │
│ WORKSPACE                                                           │
│ Office/coworking/home office      [$_____2,400]                    │
│ ⓘ Coworking avg: $200-400/month                                    │
│                                                                     │
│ PROFESSIONAL                                                        │
│ Insurance (liability, E&O)        [$_______500]                    │
│ Professional development          [$_______500]                    │
│ Accounting/legal                  [$_____1,000]                    │
│                                                                     │
│ OTHER                                                               │
│ Marketing/website                 [$_______600]                    │
│ Other business expenses           [$_________0]                    │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────  │
│ Total Annual Expenses:            $19,400                          │
│                                                                     │
│ [Continue →]                                                        │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 4: Time

```
┌─────────────────────────────────────────────────────────────────────┐
│ STEP 4: YOUR TIME                                                   │
│                                                                     │
│ TIME OFF                                                            │
│ Vacation days per year            [___15] days                     │
│ Sick/personal days                [____5] days                     │
│ Holidays you observe              [___10] days                     │
│                                                                     │
│ WORKING HOURS                                                       │
│ Hours per day you want to work    [____8] hours                    │
│                                                                     │
│ BILLABLE PERCENTAGE                                                 │
│ What % of your time is billable?  [___70] %                        │
│                                                                     │
│ ⓘ The rest goes to: admin, invoicing, marketing, calls,           │
│   proposals, learning, email. Most freelancers are 60-75%         │
│   billable. Be realistic!                                          │
│                                                                     │
│ Quick presets:                                                      │
│ [Just starting (60%)] [Established (70%)] [Fully booked (80%)]    │
│                                                                     │
│ [Calculate My Rate →]                                               │
└─────────────────────────────────────────────────────────────────────┘
```

### Step 5: Results

```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR FREELANCE RATES                                                │
│                                                                     │
│ To take home $75,000/year, you need to charge:                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│         ┌──────────────────────────────────────────────┐           │
│         │                                              │           │
│         │           $95 / HOUR                         │           │
│         │                                              │           │
│         │     Your minimum hourly rate                 │           │
│         │                                              │           │
│         └──────────────────────────────────────────────┘           │
│                                                                     │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐        │
│ │   DAY RATE      │ │   WEEK RATE     │ │  MONTH RATE     │        │
│ │                 │ │                 │ │                 │        │
│ │   $715/day      │ │   $3,325/week   │ │  $11,150/month  │        │
│ │                 │ │                 │ │   (retainer)    │        │
│ │ (7.5 hrs billed)│ │ (35 hrs billed) │ │                 │        │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘        │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ THE MATH BEHIND YOUR RATE                                           │
│                                                                     │
│ Target take-home:                          $75,000                  │
│ + Business expenses:                       $19,400                  │
│ + Estimated taxes:                         $28,600                  │
│   ├─ Federal income tax:     $15,200                               │
│   ├─ State income tax:       $6,100                                │
│   └─ Self-employment tax:    $7,300                                │
│ ─────────────────────────────────────────────────────              │
│ = Required gross revenue:                  $123,000                 │
│                                                                     │
│ Available working days:                                             │
│   365 - 104 weekends - 15 vacation - 5 sick - 10 holidays = 231   │
│                                                                     │
│ Billable hours at 70%:                                              │
│   231 days × 8 hours × 70% = 1,294 billable hours                  │
│                                                                     │
│ Required hourly rate:                                               │
│   $123,000 ÷ 1,294 hours = $95.05/hour                             │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ SALARY EQUIVALENT                                                   │
│                                                                     │
│ Your rate of $95/hour is equivalent to a salary of                 │
│ approximately $115,000/year with benefits.                          │
│                                                                     │
│ Why? An employee at that salary gets:                              │
│ • Employer-paid half of FICA (~$8,800)                             │
│ • Health insurance (~$7,000 value)                                 │
│ • 401k match (~$4,600)                                             │
│ • Paid time off (already included in salary)                       │
│                                                                     │
│ Don't undersell yourself. $95/hour is not "expensive."             │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PROJECT PRICING GUIDE                                               │
│                                                                     │
│ Based on your rate, here's what to charge for projects:            │
│                                                                     │
│ │ Estimated Hours │ Project Fee │ With Buffer (+20%) │            │
│ │─────────────────│─────────────│────────────────────│            │
│ │ 10 hours        │ $950        │ $1,140             │            │
│ │ 20 hours        │ $1,900      │ $2,280             │            │
│ │ 40 hours        │ $3,800      │ $4,560             │            │
│ │ 80 hours        │ $7,600      │ $9,120             │            │
│                                                                     │
│ ⓘ Always add 15-20% buffer for scope creep and revisions          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ WHAT IF...                                                          │
│                                                                     │
│ Adjust these to see how your rate changes:                         │
│                                                                     │
│ Billable percentage: [===●========] 70% → $95/hr                   │
│                      60% = $111/hr    80% = $83/hr                 │
│                                                                     │
│ Vacation days:       [===●========] 15 days → $95/hr               │
│                      20 days = $99/hr   10 days = $92/hr           │
│                                                                     │
│ Take-home goal:      [======●=====] $75k → $95/hr                  │
│                      $60k = $78/hr   $100k = $124/hr               │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│ [Download PDF Summary] [Email Me This] [Start Over]                │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Tax Estimation Logic

### Self-Employment Tax (US)

```javascript
const selfEmploymentTax = {
  rate: 15.3, // 12.4% Social Security + 2.9% Medicare
  socialSecurityCap: 168600, // 2024 cap, update annually
  
  calculate: (netEarnings) => {
    // SE tax is on 92.35% of net self-employment income
    const taxableBase = netEarnings * 0.9235;
    
    // Social Security portion (12.4%) up to cap
    const socialSecurity = Math.min(taxableBase, 168600) * 0.124;
    
    // Medicare portion (2.9%) on all income
    const medicare = taxableBase * 0.029;
    
    // Additional Medicare (0.9%) over $200k single / $250k married
    const additionalMedicare = taxableBase > 200000 
      ? (taxableBase - 200000) * 0.009 
      : 0;
    
    return socialSecurity + medicare + additionalMedicare;
  }
};
```

### Federal Income Tax Brackets (US, 2024)

```javascript
const federalBrackets = {
  single: [
    { min: 0, max: 11600, rate: 10 },
    { min: 11600, max: 47150, rate: 12 },
    { min: 47150, max: 100525, rate: 22 },
    { min: 100525, max: 191950, rate: 24 },
    { min: 191950, max: 243725, rate: 32 },
    { min: 243725, max: 609350, rate: 35 },
    { min: 609350, max: Infinity, rate: 37 },
  ],
  marriedJoint: [
    { min: 0, max: 23200, rate: 10 },
    { min: 23200, max: 94300, rate: 12 },
    { min: 94300, max: 201050, rate: 22 },
    { min: 201050, max: 383900, rate: 24 },
    { min: 383900, max: 487450, rate: 32 },
    { min: 487450, max: 731200, rate: 35 },
    { min: 731200, max: Infinity, rate: 37 },
  ],
  standardDeduction: {
    single: 14600,
    marriedJoint: 29200,
    headOfHousehold: 21900,
  }
};
```

### State Tax Rates (Simplified)

```javascript
const stateTaxRates = {
  // Simplified - use flat rate or top marginal rate as estimate
  'AL': 5.0, 'AK': 0, 'AZ': 2.5, 'AR': 4.7, 'CA': 9.3,
  'CO': 4.4, 'CT': 6.99, 'DE': 6.6, 'FL': 0, 'GA': 5.49,
  'HI': 11.0, 'ID': 5.8, 'IL': 4.95, 'IN': 3.05, 'IA': 5.7,
  'KS': 5.7, 'KY': 4.5, 'LA': 4.25, 'ME': 7.15, 'MD': 5.75,
  'MA': 5.0, 'MI': 4.25, 'MN': 9.85, 'MS': 5.0, 'MO': 4.95,
  'MT': 5.9, 'NE': 5.84, 'NV': 0, 'NH': 0, 'NJ': 10.75,
  'NM': 5.9, 'NY': 10.9, 'NC': 5.25, 'ND': 2.5, 'OH': 3.5,
  'OK': 4.75, 'OR': 9.9, 'PA': 3.07, 'RI': 5.99, 'SC': 6.4,
  'SD': 0, 'TN': 0, 'TX': 0, 'UT': 4.65, 'VT': 8.75,
  'VA': 5.75, 'WA': 0, 'WV': 5.12, 'WI': 7.65, 'WY': 0,
};
```

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| State Management | React useState | Free |
| PDF Generation | jsPDF or react-pdf | Free |
| Styling | Tailwind CSS | Free |

**Total recurring cost: $0**

### Calculation Engine

```javascript
export function calculateFreelanceRate(inputs) {
  const {
    takeHomeGoal,
    country,
    state,
    filingStatus,
    expenses,
    vacationDays,
    sickDays,
    holidays,
    hoursPerDay,
    billablePercent,
  } = inputs;

  // Calculate working days
  const totalDays = 365;
  const weekends = 104;
  const workingDays = totalDays - weekends - vacationDays - sickDays - holidays;

  // Calculate billable hours
  const totalHours = workingDays * hoursPerDay;
  const billableHours = totalHours * (billablePercent / 100);

  // Sum expenses
  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);

  // Iteratively calculate gross revenue needed
  // (because taxes depend on income, which we're solving for)
  let grossRevenue = takeHomeGoal + totalExpenses;
  
  for (let i = 0; i < 10; i++) {
    const taxes = calculateTaxes(grossRevenue, state, filingStatus);
    grossRevenue = takeHomeGoal + totalExpenses + taxes.total;
  }

  // Calculate rates
  const hourlyRate = grossRevenue / billableHours;
  const dayRate = hourlyRate * (hoursPerDay * (billablePercent / 100));
  const weekRate = dayRate * 5;
  const monthRate = grossRevenue / 12;

  // Calculate salary equivalent
  const salaryEquivalent = calculateSalaryEquivalent(grossRevenue);

  return {
    hourlyRate: Math.ceil(hourlyRate),
    dayRate: Math.ceil(dayRate),
    weekRate: Math.ceil(weekRate),
    monthRate: Math.ceil(monthRate),
    grossRevenue,
    totalExpenses,
    taxes: calculateTaxes(grossRevenue, state, filingStatus),
    billableHours,
    workingDays,
    salaryEquivalent,
  };
}
```

---

## Making It Look Credible

### Trust Builders
- Show the full math transparently
- Cite tax rates with "2024 rates, updated annually"
- Link to IRS self-employment tax page
- Disclaimer about estimates

### Your Angle
- "The calculator I wish I had when I started freelancing"
- "Most freelancers are accidentally undercharging by 30-50%"

### Disclaimers
- "Tax estimates are approximate. Consult a tax professional."
- "Self-employment tax and income tax vary based on deductions and circumstances."
- "This calculator assumes US tax residency."

---

## SEO Strategy

### Target Keywords
- "freelance rate calculator"
- "how much to charge freelance"
- "freelance hourly rate calculator"
- "consulting rate calculator"
- "contractor rate calculator"
- "self employed rate calculator"
- "how to price freelance work"

### Long-tail Opportunities
- "how much should a freelance designer charge"
- "freelance developer hourly rate 2024"
- "freelance rate with taxes"

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "How to Calculate Your Freelance Rate (And Stop Undercharging)"

**URL:** /blog/calculate-freelance-rate

**Target length:** 3,500-4,000 words

**Structure:**
1. Why most freelancers undercharge
2. The employee vs freelancer math (eye-opening comparison)
3. What to include in your rate:
   - Self-employment tax (15.3%)
   - Health insurance
   - Retirement savings
   - Business expenses
   - Unpaid time off
   - Non-billable time
4. Step-by-step calculation (manual method)
5. Introduce the calculator: "Or use our free calculator →"
6. Pricing strategies:
   - Hourly vs day rate vs project
   - When to use each
   - Retainer pricing
7. How to raise your rates
8. Handling "that's too expensive" objections

### Supporting Blog Posts

**Post 1: "Self-Employment Tax Explained: What Freelancers Need to Know"**
- URL: /blog/self-employment-tax-explained
- Length: 2,000 words
- Covers: SE tax calculation, quarterly payments, deductions
- Links to: Calculator

**Post 2: "Freelance vs Full-Time: The True Cost Comparison"**
- URL: /blog/freelance-vs-full-time-salary
- Length: 2,500 words
- Covers: Benefits valuation, hidden costs of freelancing
- Links to: Calculator

**Post 3: "How to Raise Your Freelance Rates (Scripts Included)"**
- URL: /blog/raise-freelance-rates
- Length: 2,000 words
- Covers: When to raise rates, how to communicate, email templates
- Links to: Calculator

**Post 4: "Day Rate vs Hourly: When to Use Each"**
- URL: /blog/day-rate-vs-hourly-freelance
- Length: 1,500 words
- Covers: Pros/cons, when each makes sense
- Links to: Calculator

**Post 5: "Freelance Retainer Pricing: How to Calculate"**
- URL: /blog/freelance-retainer-pricing
- Length: 1,800 words
- Covers: Retainer benefits, pricing strategy, contracts
- Links to: Calculator, Contract Generator

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch calculator + pillar article | Core assets |
| 2 | Self-employment tax explainer | Educational |
| 3 | Freelance vs full-time comparison | Decision content |
| 4 | How to raise rates | Practical value |
| 5 | Day rate vs hourly | Pricing strategy |

---

## Lead Capture Strategy

### Free Tier (Everything)
- Full calculator functionality
- All tax estimates
- Rate recommendations

### Email Capture Triggers
- "Email me this breakdown" — requires email
- "Get the Freelance Pricing Confidence email course" — requires email
- "Download rate card template" — requires email
- "Get notified when tax rates update" — requires email

---

## Development Phases

### Phase 1: Core Calculator (1 week)
- [ ] Multi-step form with all inputs
- [ ] Tax calculation engine
- [ ] Results display with full breakdown
- [ ] Rate cards (hourly, daily, weekly, monthly)

### Phase 2: Polish (3-5 days)
- [ ] "What if" sliders
- [ ] Salary equivalent calculation
- [ ] Project pricing guide
- [ ] Mobile responsiveness

### Phase 3: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish tax explainer
- [ ] Publish comparison post

### Phase 4: Enhancements (Future)
- [ ] PDF export
- [ ] International tax support (UK, Canada, etc.)
- [ ] Industry-specific benchmarks
- [ ] Rate negotiation scripts

---

## Success Metrics

- **Usage:** Calculations run per week
- **Engagement:** % who use "what if" sliders
- **Content:** Pillar article ranking for "freelance rate calculator"
- **Conversion:** Email capture rate
- **Sharing:** Social shares (this is shareable content)
