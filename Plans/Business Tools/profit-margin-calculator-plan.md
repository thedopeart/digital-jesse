# Profit Margin Calculator — Build Plan

## Quick Summary

**What:** A comprehensive e-commerce profit calculator that accounts for ALL costs across multiple platforms. Pre-loaded with actual platform fees (Shopify, TikTok Shop, Amazon, Walmart, Etsy) with tier-based rate options. Shows true profit per unit with side-by-side platform comparison.

**Cost to build & run:** $0 — Pure frontend calculator, no APIs needed.

**Tech:** Next.js + React state management. All fee data stored locally in JSON.

**Differentiator:** Not a simple revenue-minus-cost calculator. Includes every hidden fee, platform-specific tiers, and real-world costs most sellers forget.

---

## The Core Problem

Most profit calculators are dangerously simple:
- Revenue - Product Cost = Profit ❌

Reality for e-commerce sellers:
- Revenue - Product Cost - Platform Fees - Payment Processing - Shipping (both ways) - Returns - Packaging - Ad Spend = Actual Profit ✓

**What sellers don't realize:**
- Shopify payment rates vary by plan (2.9% vs 2.4%)
- Amazon takes 15% referral PLUS FBA fees PLUS storage
- TikTok Shop fees have changed 3 times in the past year
- Return shipping on a $20 item can wipe out the entire margin
- A 20% return rate turns a "40% margin" into 15%

**Your tool tells the truth.**

---

## What Makes This Different

| Other Calculators | Your Calculator |
|-------------------|-----------------|
| Single platform | Compare 6 platforms side-by-side |
| Generic "platform fee" input | Pre-loaded actual fees by platform + tier |
| Ignores payment processing | Includes processor rates by plan |
| Forgets return costs | Factors in return rate + return shipping |
| No ad spend consideration | Includes customer acquisition cost |
| Simple percentage output | Full breakdown + visualizations |

---

## Pre-Loaded Platform Fees Database

### Shopify

```javascript
const shopifyFees = {
  plans: {
    basic: {
      name: "Basic",
      monthlyPrice: 39,
      onlineCardRate: 2.9,
      onlineCardFlat: 0.30,
      inPersonRate: 2.7,
      inPersonFlat: 0,
      thirdPartyFee: 2.0, // If not using Shopify Payments
    },
    shopify: {
      name: "Shopify",
      monthlyPrice: 105,
      onlineCardRate: 2.6,
      onlineCardFlat: 0.30,
      inPersonRate: 2.5,
      inPersonFlat: 0,
      thirdPartyFee: 1.0,
    },
    advanced: {
      name: "Advanced",
      monthlyPrice: 399,
      onlineCardRate: 2.4,
      onlineCardFlat: 0.30,
      inPersonRate: 2.4,
      inPersonFlat: 0,
      thirdPartyFee: 0.6,
    },
    plus: {
      name: "Plus",
      monthlyPrice: 2300,
      onlineCardRate: 2.15, // Negotiable, this is typical
      onlineCardFlat: 0.30,
      inPersonRate: 2.15,
      inPersonFlat: 0,
      thirdPartyFee: 0.2,
    },
  },
  notes: [
    "Rates shown are for US domestic cards",
    "International/Amex cards may have higher rates",
    "Plus rates are negotiable based on volume",
  ]
};
```

### Amazon

```javascript
const amazonFees = {
  sellerPlans: {
    individual: {
      name: "Individual",
      monthlyFee: 0,
      perItemFee: 0.99,
      description: "Best for <40 items/month"
    },
    professional: {
      name: "Professional",
      monthlyFee: 39.99,
      perItemFee: 0,
      description: "Best for 40+ items/month"
    }
  },
  referralFees: {
    // Category: percentage (most have $0.30 minimum)
    "Appliances": { rate: 15, min: 0.30 },
    "Automotive": { rate: 12, min: 0.30 },
    "Baby Products": { rate: 15, min: 0.30 },
    "Beauty": { rate: 15, min: 0.30 },
    "Books": { rate: 15, min: 0.30 },
    "Clothing & Accessories": { rate: 17, min: 0.30 },
    "Electronics": { rate: 8, min: 0.30 },
    "Furniture": { rate: 15, min: 0.30 },
    "Grocery": { rate: 15, min: 0.30 },
    "Health & Personal Care": { rate: 15, min: 0.30 },
    "Home & Garden": { rate: 15, min: 0.30 },
    "Jewelry": { rate: 20, min: 0.30 },
    "Kitchen": { rate: 15, min: 0.30 },
    "Luggage": { rate: 15, min: 0.30 },
    "Music/DVD/Video": { rate: 15, min: 0.30 },
    "Office Products": { rate: 15, min: 0.30 },
    "Pet Supplies": { rate: 15, min: 0.30 },
    "Shoes": { rate: 15, min: 0.30 },
    "Software": { rate: 15, min: 0.30 },
    "Sports & Outdoors": { rate: 15, min: 0.30 },
    "Tools & Home Improvement": { rate: 15, min: 0.30 },
    "Toys & Games": { rate: 15, min: 0.30 },
    "Video Games": { rate: 15, min: 0.30 },
    "Watches": { rate: 15, min: 0.30 },
    "Other": { rate: 15, min: 0.30 },
  },
  fbaFees: {
    // Size tier: { weightRange: fee }
    // Simplified - actual FBA fees are complex
    smallStandard: {
      name: "Small Standard (1 lb or less)",
      maxWeight: 1,
      maxDimensions: "15x12x0.75",
      fee: 3.22,
    },
    largeStandard: {
      name: "Large Standard (1-20 lbs)",
      ranges: [
        { maxWeight: 1, fee: 3.86 },
        { maxWeight: 2, fee: 4.08 },
        { maxWeight: 3, fee: 4.76 },
        { maxWeight: 20, feeBase: 4.76, perLbOver3: 0.42 },
      ]
    },
    smallOversize: {
      name: "Small Oversize",
      feeBase: 9.73,
      perLbOver1: 0.42,
    },
    mediumOversize: {
      name: "Medium Oversize",
      feeBase: 19.05,
      perLbOver1: 0.42,
    },
    largeOversize: {
      name: "Large Oversize",
      feeBase: 89.98,
      perLbOver90: 0.83,
    },
  },
  storageFees: {
    standard: {
      janToSep: 0.87, // per cubic foot
      octToDec: 2.40, // per cubic foot (peak season)
    },
    dangerous: {
      janToSep: 0.99,
      octToDec: 3.63,
    },
    // Aged inventory surcharge
    agedInventory: {
      days271to365: 1.50, // per cubic foot
      over365: 6.90, // per cubic foot
    }
  },
  notes: [
    "FBA fees updated for 2024 rates",
    "Referral fees are percentage of total sale price including shipping",
    "Storage fees are monthly, charged on 15th",
    "Returns processing fee applies to most categories",
  ]
};
```

### TikTok Shop

```javascript
const tiktokShopFees = {
  referralFees: {
    // TikTok's fees have changed multiple times
    // Current structure (as of late 2024)
    standard: {
      name: "Standard Rate",
      rate: 8.0, // Up from original 2%
      description: "Most categories"
    },
    promotional: {
      name: "Promotional Rate (New Sellers)",
      rate: 2.0,
      duration: "First 90 days or $10k in sales",
      description: "New seller incentive"
    }
  },
  paymentProcessing: {
    rate: 2.9,
    flat: 0.30,
    description: "Standard payment processing"
  },
  shippingPrograms: {
    shippedByTikTok: {
      name: "Shipped by TikTok",
      description: "TikTok handles fulfillment",
      feeStructure: "Variable based on weight/zone",
      // Fees vary significantly
    },
    sellerShipping: {
      name: "Seller Shipping",
      description: "You handle shipping",
      fee: 0,
    }
  },
  notes: [
    "TikTok frequently updates fee structure",
    "New seller promotions change often",
    "Affiliate commissions are separate (paid by seller)",
    "Check TikTok Seller Center for current rates",
  ]
};
```

### Walmart Marketplace

```javascript
const walmartFees = {
  monthlyFee: 0, // No monthly fee!
  referralFees: {
    "Apparel": 15,
    "Automotive": 12,
    "Baby": 15,
    "Beauty": 15,
    "Books": 15,
    "Camera & Photo": 8,
    "Cell Phones": 8,
    "Clothing": 15,
    "Computers": 8,
    "Consumer Electronics": 8,
    "Electronics Accessories": 15,
    "Furniture": 15,
    "Grocery": 15,
    "Health": 15,
    "Home & Garden": 15,
    "Jewelry": 20,
    "Kitchen": 15,
    "Office Products": 15,
    "Pet Supplies": 15,
    "Personal Care": 15,
    "Shoes": 15,
    "Sports & Outdoors": 15,
    "Tools": 15,
    "Toys": 15,
    "Video Games": 15,
    "Watches": 15,
    "Other": 15,
  },
  walmartFulfillmentServices: {
    // WFS fees similar to FBA
    fulfillmentFees: {
      // Per unit based on weight
      ranges: [
        { maxWeight: 1, fee: 3.45 },
        { maxWeight: 2, fee: 4.95 },
        { maxWeight: 3, fee: 5.45 },
        { maxWeight: 20, feeBase: 5.45, perLbOver3: 0.40 },
      ]
    },
    storageFees: {
      standard: 0.75, // per cubic foot per month
    }
  },
  paymentProcessing: {
    rate: 2.9,
    flat: 0.30,
    note: "Included in referral fee for most sellers"
  },
  notes: [
    "No monthly subscription fee",
    "Referral fees include payment processing",
    "WFS optional but helps with Buy Box",
    "Competitive with Amazon on most categories",
  ]
};
```

### Etsy

```javascript
const etsyFees = {
  listingFee: {
    amount: 0.20,
    duration: "4 months or until sold",
    perQuantity: true, // $0.20 per quantity listed
  },
  transactionFee: {
    rate: 6.5,
    appliesTo: "Item price + shipping charged to buyer",
  },
  paymentProcessing: {
    us: { rate: 3.0, flat: 0.25 },
    uk: { rate: 4.0, flat: 0.20 },
    canada: { rate: 3.0, flat: 0.25 },
    australia: { rate: 3.0, flat: 0.25 },
    // Other countries vary
  },
  offsiteAds: {
    underThreshold: {
      threshold: 10000, // Annual sales
      rate: 15,
      optOut: true, // Can opt out
    },
    overThreshold: {
      threshold: 10000,
      rate: 12,
      optOut: false, // Cannot opt out
    },
    note: "Only charged when sale comes from Etsy ad"
  },
  etsyPlus: {
    monthlyFee: 10,
    benefits: [
      "15 listing credits/month",
      "Advanced shop customization",
      "Restock requests",
      "Discounts on business cards, etc."
    ]
  },
  notes: [
    "Transaction fee applies to shipping too",
    "Offsite ads can significantly impact margin",
    "Listing fee charged on renewal too",
    "Multi-quantity listings: fee per quantity",
  ]
};
```

### eBay (Bonus Platform)

```javascript
const ebayFees = {
  storeSubscriptions: {
    none: {
      name: "No Store",
      monthlyFee: 0,
      freeListings: 250,
      finalValueRate: 13.25,
    },
    starter: {
      name: "Starter Store",
      monthlyFee: 4.95,
      freeListings: 250,
      finalValueRate: 13.25,
    },
    basic: {
      name: "Basic Store",
      monthlyFee: 21.95,
      freeListings: 1000,
      finalValueRate: 12.9,
    },
    premium: {
      name: "Premium Store",
      monthlyFee: 59.95,
      freeListings: 10000,
      finalValueRate: 12.35,
    },
    anchor: {
      name: "Anchor Store",
      monthlyFee: 299.95,
      freeListings: 25000,
      finalValueRate: 11.5,
    },
    enterprise: {
      name: "Enterprise Store",
      monthlyFee: 2999.95,
      freeListings: 100000,
      finalValueRate: 11.0,
    }
  },
  perOrderFee: 0.30,
  paymentProcessing: "Included in final value fee",
  categoryVariations: {
    "Books": 14.95,
    "Clothing": 12.9,
    "Electronics": 12.9,
    "Musical Instruments": 12.35,
    // Many categories have specific rates
  },
  notes: [
    "Final value fee includes payment processing",
    "International fees may be higher",
    "Promoted listings are additional cost",
  ]
};
```

---

## Feature Set

### MVP (Launch Version)

1. **Product Information Input**
   - Product cost (landed cost)
   - Selling price
   - Product weight (for shipping/FBA calc)
   - Product dimensions (optional, for FBA)
   - Category selection (for referral fees)

2. **Platform Selection**
   - Checkboxes: Shopify, Amazon FBA, Amazon FBM, TikTok Shop, Walmart, Etsy, eBay
   - Compare up to 4 platforms side-by-side

3. **Plan/Tier Selection Per Platform**
   - Shopify: Basic, Shopify, Advanced, Plus
   - Amazon: Individual, Professional
   - eBay: No Store through Enterprise
   - Auto-populate fees based on selection

4. **Shipping Costs**
   - Cost to ship to customer
   - Shipping charged to customer
   - Return shipping cost (who pays?)
   - For FBA/WFS: auto-calculated based on weight

5. **Additional Costs**
   - Return rate % (pre-filled suggestions by category)
   - Packaging cost per unit
   - Ad spend per unit (CAC)
   - Other per-unit costs

6. **Output Display**
   - Per-platform breakdown table
   - True profit in dollars
   - True margin percentage
   - Visual pie chart of cost breakdown
   - "You keep $X of every $Y sold"

### Version 2 Features

7. **Batch Calculator**
   - Input multiple products
   - See portfolio margin
   - Export as spreadsheet

8. **Break-Even Calculator**
   - "At what price do I break even?"
   - "How many units to cover fixed costs?"

9. **What-If Scenarios**
   - Slider: "What if return rate increases to X%?"
   - "What if I upgrade Shopify plan?"
   - "What if I switch to FBA?"

10. **Saved Products**
    - Save calculations (email capture)
    - Compare over time

11. **Fee Update Alerts**
    - "Amazon updated FBA fees in January"
    - Changelog of platform fee changes

---

## User Interface Design

### Input Section

```
┌─────────────────────────────────────────────────────────────────────┐
│ PROFIT MARGIN CALCULATOR                                            │
│ See your true profit across e-commerce platforms                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PRODUCT DETAILS                                                     │
│                                                                     │
│ Product Cost (landed)     Selling Price                            │
│ [$________12.50]          [$________39.99]                         │
│                                                                     │
│ Product Weight            Category                                  │
│ [____1.2] lbs             [Electronics           ▼]                │
│                                                                     │
│ Dimensions (optional, for FBA)                                      │
│ [__8] × [__6] × [__2] inches                                       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PLATFORMS TO COMPARE                                                │
│                                                                     │
│ ☑ Shopify          Plan: [Advanced ▼]                              │
│ ☑ Amazon FBA       Account: [Professional ▼]                       │
│ ☐ Amazon FBM       Account: [Professional ▼]                       │
│ ☑ TikTok Shop      Rate: [Standard (8%) ▼]                         │
│ ☐ Walmart          Fulfillment: [Seller ▼]                         │
│ ☐ Etsy             —                                               │
│ ☐ eBay             Store: [Basic ▼]                                │
│                                                                     │
│ ⓘ Select up to 4 platforms to compare side-by-side                 │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ SHIPPING                                                            │
│                                                                     │
│ Your shipping cost        You charge customer                       │
│ [$________5.99]           [$________0.00] (Free shipping)          │
│                                                                     │
│ ☑ Include return shipping in calculation                           │
│   Return shipping cost: [$___5.99]  Who pays? [Seller ▼]           │
│                                                                     │
│ ⓘ For FBA/WFS, fulfillment fees are calculated automatically       │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ ADDITIONAL COSTS                                                    │
│                                                                     │
│ Return Rate               Packaging Cost          Ad Spend/Unit     │
│ [___15]%                  [$____0.75]             [$____3.50]       │
│ ⓘ Electronics avg: 15%                                              │
│                                                                     │
│ Other per-unit costs (optional)                                     │
│ [$____0.00]  Label: [________________]                              │
└─────────────────────────────────────────────────────────────────────┘

[Calculate Profit →]
```

### Output Section

```
┌─────────────────────────────────────────────────────────────────────┐
│ YOUR TRUE PROFIT                                                    │
│ Product: $39.99 Electronics Item                                    │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PLATFORM COMPARISON                                                 │
│                                                                     │
│              │ Shopify      │ Amazon FBA   │ TikTok Shop  │        │
│              │ (Advanced)   │ (Pro)        │ (Standard)   │        │
│ ─────────────┼──────────────┼──────────────┼──────────────┤        │
│ Sale Price   │ $39.99       │ $39.99       │ $39.99       │        │
│ ─────────────┼──────────────┼──────────────┼──────────────┤        │
│ Product Cost │ -$12.50      │ -$12.50      │ -$12.50      │        │
│ Platform Fee │ -$0.00       │ -$6.00       │ -$3.20       │        │
│ Payment Proc.│ -$1.26       │ (included)   │ -$1.46       │        │
│ Fulfillment  │ -$5.99       │ -$4.75       │ -$5.99       │        │
│ Returns Cost │ -$2.69       │ -$2.84       │ -$2.69       │        │
│ Packaging    │ -$0.75       │ -$0.75       │ -$0.75       │        │
│ Ad Spend     │ -$3.50       │ -$3.50       │ -$3.50       │        │
│ ─────────────┼──────────────┼──────────────┼──────────────┤        │
│ TRUE PROFIT  │ $13.30       │ $9.65        │ $9.90        │        │
│ TRUE MARGIN  │ 33.3%        │ 24.1%        │ 24.8%        │        │
│ ─────────────┴──────────────┴──────────────┴──────────────┘        │
│                                                                     │
│ 🏆 Best Platform: Shopify (Advanced) — $3.65 more profit per unit  │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ COST BREAKDOWN: Shopify                                             │
│                                                                     │
│ ┌─────────────────────────────────────────────────────────────────┐ │
│ │                                                                 │ │
│ │              [PIE CHART VISUALIZATION]                          │ │
│ │                                                                 │ │
│ │   ██ Product Cost (31%)     ██ Shipping (15%)                   │ │
│ │   ██ Payment Proc. (3%)     ██ Returns (7%)                     │ │
│ │   ██ Packaging (2%)         ██ Ad Spend (9%)                    │ │
│ │   ██ YOUR PROFIT (33%)                                          │ │
│ │                                                                 │ │
│ └─────────────────────────────────────────────────────────────────┘ │
│                                                                     │
│ You keep $13.30 of every $39.99 sale.                              │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ KEY INSIGHTS                                                        │
│                                                                     │
│ 💡 Your return rate costs you $2.69/unit. Reducing returns by 5%   │
│    would save $0.90/unit ($1,080/year at 100 units/month)          │
│                                                                     │
│ 💡 Amazon's 15% referral fee is your biggest platform cost.        │
│    Consider if Prime badge value justifies the $3.65 difference.   │
│                                                                     │
│ 💡 At $3.50 CAC, you need 3 repeat purchases to hit 50% LTV margin │
│                                                                     │
│ [Download Report (PDF)] [Share Results] [Calculate Another]         │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Technical Architecture

### Tech Stack (100% Free)

| Component | Tool | Cost |
|-----------|------|------|
| Framework | Next.js | Free |
| Hosting | Vercel | Free tier |
| State Management | React useState/useReducer | Free |
| Charts | Recharts or Chart.js | Free |
| Styling | Tailwind CSS | Free |
| Fee Data | Local JSON files | Free |

**Total recurring cost: $0**

### Fee Data Structure

```javascript
// /data/platformFees.js

export const platforms = {
  shopify: {
    name: "Shopify",
    logo: "/logos/shopify.svg",
    tiers: { /* as defined above */ },
    calculate: (price, tier, options) => {
      const plan = shopifyFees.plans[tier];
      const paymentFee = (price * plan.onlineCardRate / 100) + plan.onlineCardFlat;
      return {
        platformFee: 0, // Shopify doesn't take commission
        paymentFee,
        fulfillmentFee: options.shippingCost, // Seller handles
      };
    }
  },
  amazonFba: {
    name: "Amazon FBA",
    logo: "/logos/amazon.svg",
    tiers: { /* individual, professional */ },
    categories: { /* referral fee by category */ },
    calculate: (price, tier, category, weight, options) => {
      const referralRate = amazonFees.referralFees[category].rate;
      const referralFee = Math.max(price * referralRate / 100, 0.30);
      const fbaFee = calculateFbaFee(weight);
      return {
        platformFee: referralFee,
        paymentFee: 0, // Included
        fulfillmentFee: fbaFee,
      };
    }
  },
  // ... etc for each platform
};

// Helper to calculate FBA fee based on weight
function calculateFbaFee(weightLbs) {
  if (weightLbs <= 1) return 3.22;
  if (weightLbs <= 2) return 4.08;
  if (weightLbs <= 3) return 4.76;
  return 4.76 + (weightLbs - 3) * 0.42;
}
```

### Calculation Engine

```javascript
// /lib/calculator.js

export function calculateProfit(inputs) {
  const {
    productCost,
    sellingPrice,
    weight,
    category,
    platforms,
    shippingCost,
    shippingCharged,
    returnRate,
    returnShippingCost,
    packagingCost,
    adSpend,
    otherCosts,
  } = inputs;

  const results = {};

  for (const [platformKey, platformConfig] of Object.entries(platforms)) {
    if (!platformConfig.enabled) continue;

    const platformData = platformsData[platformKey];
    const fees = platformData.calculate(
      sellingPrice,
      platformConfig.tier,
      category,
      weight,
      { shippingCost, returnShippingCost }
    );

    // Calculate return impact
    const returnImpact = (returnRate / 100) * (
      productCost + // Lost product (unless resellable)
      fees.fulfillmentFee + // Shipping both ways
      returnShippingCost + // Return shipping
      (platformData.returnProcessingFee || 0) // Some platforms charge this
    );

    const totalCosts =
      productCost +
      fees.platformFee +
      fees.paymentFee +
      fees.fulfillmentFee +
      returnImpact +
      packagingCost +
      adSpend +
      otherCosts;

    const revenue = sellingPrice + shippingCharged;
    const profit = revenue - totalCosts;
    const margin = (profit / revenue) * 100;

    results[platformKey] = {
      revenue,
      costs: {
        product: productCost,
        platform: fees.platformFee,
        payment: fees.paymentFee,
        fulfillment: fees.fulfillmentFee,
        returns: returnImpact,
        packaging: packagingCost,
        ads: adSpend,
        other: otherCosts,
      },
      totalCosts,
      profit,
      margin,
    };
  }

  return results;
}
```

---

## Making It Look Credible

### Trust Builders
- Show fee sources: "Fees as of January 2026. [See sources]"
- Last updated date visible
- Link to each platform's actual fee page
- Note when fees are estimates vs confirmed

### Your Angle
- "Built by someone who sells on 4 platforms and got tired of spreadsheets"
- "I've seen sellers think they have 40% margins when they're actually at 12%"
- Show that you understand the hidden complexity

### Disclaimers
- "Fees change frequently. Verify with platform before making decisions."
- "This calculator provides estimates. Your actual fees may vary."
- "Does not constitute financial advice."

---

## SEO Strategy

### Target Keywords
- "amazon fba profit calculator"
- "shopify profit margin calculator"
- "ecommerce profit calculator"
- "amazon vs shopify fees"
- "true profit calculator"
- "etsy fee calculator"
- "tiktok shop fee calculator"
- "walmart marketplace fees"

### Long-tail Opportunities
- "how much does amazon take from sellers"
- "shopify vs amazon fees comparison"
- "is amazon fba worth it calculator"
- "ecommerce margin calculator with returns"

---

## Blog Content Strategy for digitaljesse.com

### Pillar Article

**Title:** "E-Commerce Profit Margins: The Complete Guide (With Calculator)"

**URL:** /blog/ecommerce-profit-margins-guide

**Target length:** 4,000-5,000 words

**Structure:**
1. Why most sellers miscalculate profit
2. The true cost breakdown of selling online:
   - Platform fees
   - Payment processing
   - Fulfillment/shipping
   - Returns (the hidden killer)
   - Customer acquisition
3. Platform-by-platform fee breakdown:
   - Shopify (by plan)
   - Amazon FBA vs FBM
   - TikTok Shop (and why it keeps changing)
   - Walmart Marketplace
   - Etsy
   - eBay
4. How to calculate true profit (manual method)
5. Introduce the calculator: "Or use our free calculator →"
6. Strategies to improve margins:
   - Negotiating supplier costs
   - Reducing returns
   - Optimizing shipping
   - When to raise prices
7. Case study: Real numbers from a real product
8. Platform comparison: When each makes sense

### Supporting Blog Posts

**Post 1: "Amazon FBA Fees Explained: The Complete Breakdown (2026)"**
- URL: /blog/amazon-fba-fees-explained
- Length: 3,000 words
- Covers: Every FBA fee in detail with examples
- Links to: Calculator, pillar article
- **High traffic:** People search this constantly

**Post 2: "Shopify vs Amazon: Where Should You Sell? (Fee Comparison)"**
- URL: /blog/shopify-vs-amazon-fees
- Length: 2,500 words
- Covers: Detailed comparison, when each wins
- Links to: Calculator
- **Comparison content performs well**

**Post 3: "The Hidden Cost of Returns (And How to Reduce Them)"**
- URL: /blog/ecommerce-return-costs
- Length: 2,000 words
- Covers: True cost of returns, reduction strategies
- Links to: Calculator
- **Unique angle nobody covers well**

**Post 4: "TikTok Shop Fees: What Sellers Actually Pay"**
- URL: /blog/tiktok-shop-fees
- Length: 1,500 words
- Covers: Current fee structure, history of changes
- Links to: Calculator
- **Timely, fees keep changing**

**Post 5: "Is Amazon FBA Worth It? How to Calculate"**
- URL: /blog/is-amazon-fba-worth-it
- Length: 2,000 words
- Covers: Framework for decision, calculator walkthrough
- Links to: Calculator
- **Captures decision-stage searches**

**Post 6: "Etsy Fees Explained: What You'll Actually Pay"**
- URL: /blog/etsy-fees-explained
- Length: 2,000 words
- Covers: All Etsy fees including offsite ads
- Links to: Calculator
- **Etsy sellers always confused about fees**

### Content Calendar

| Week | Content | Purpose |
|------|---------|---------|
| 1 | Launch calculator + pillar article | Core assets |
| 2 | Amazon FBA fees breakdown | High-volume keyword |
| 3 | Shopify vs Amazon comparison | Comparison traffic |
| 4 | Hidden cost of returns | Unique angle |
| 5 | TikTok Shop fees | Timely content |
| 6 | Is FBA worth it? | Decision-stage capture |

---

## Lead Capture Strategy

### Free Tier (Everything)
- Full calculator functionality
- All platforms and tiers
- Visual breakdowns

### Email Capture Triggers
- "Email me this report" — requires email
- "Get notified when platform fees change" — requires email
- "Save my products for later" — requires email
- "Download comparison as PDF" — requires email

---

## Development Phases

### Phase 1: Core Calculator (1 week)
- [ ] Input form with all fields
- [ ] Platform selection with tier dropdowns
- [ ] Fee data for all 6 platforms
- [ ] Calculation engine
- [ ] Basic results table

### Phase 2: Visual Polish (3-5 days)
- [ ] Pie chart visualization
- [ ] Platform comparison table styling
- [ ] Mobile responsiveness
- [ ] Insights/recommendations section

### Phase 3: Content (1 week)
- [ ] Publish pillar article
- [ ] Publish Amazon fees breakdown
- [ ] Publish comparison post

### Phase 4: Enhancements (Future)
- [ ] PDF export
- [ ] Saved products
- [ ] Batch calculator
- [ ] What-if scenarios

---

## Fee Update Maintenance

Platform fees change. Plan for maintenance:

1. **Track fee announcements** — Follow each platform's seller news
2. **Quarterly review** — Check all fees against official documentation
3. **Changelog** — Show users when fees were last verified
4. **User reports** — "Report incorrect fee" button

---

## Success Metrics

- **Usage:** Calculations run per week
- **Engagement:** % who compare multiple platforms
- **Content:** Pillar article ranking for "ecommerce profit margin"
- **Conversion:** Email capture rate
- **Return visits:** Users who come back (this is a recurring need)
