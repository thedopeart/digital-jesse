#!/usr/bin/env node
/**
 * Expands the affiliate programs database to 500+ entries.
 * Run: node scripts/expand-affiliates.js
 */

const fs = require('fs');
const path = require('path');

const FILE = path.join(__dirname, '..', 'data', 'affiliate-programs.json');
const existing = JSON.parse(fs.readFileSync(FILE, 'utf-8'));
const existingBrands = new Set(existing.map(p => p.brand));

function add(entries) {
  for (const entry of entries) {
    if (!existingBrands.has(entry.brand)) {
      existing.push(entry);
      existingBrands.add(entry.brand);
    }
  }
}

// ─── NEW CATEGORIES ───

// Health & Fitness
add([
  { brand: "Noom", variations: ["noom", "noom.com"], program: "Noom Affiliate Program", commission: "$15 per trial signup", type: "flat", network: "impact", signupUrl: "https://www.noom.com/partners/", category: "health" },
  { brand: "MyFitnessPal", variations: ["myfitnesspal", "my fitness pal", "myfitnesspal.com"], program: "MyFitnessPal Affiliate Program", commission: "15% per sale", type: "percentage", network: "impact", signupUrl: "https://www.myfitnesspal.com/", category: "health" },
  { brand: "Peloton", variations: ["peloton", "peloton.com", "onepeloton"], program: "Peloton Referral Program", commission: "$100 off for referee", type: "flat", network: "direct", signupUrl: "https://www.onepeloton.com/", category: "health" },
  { brand: "Whoop", variations: ["whoop", "whoop.com"], program: "Whoop Affiliate Program", commission: "$30 per sale", type: "flat", network: "impact", signupUrl: "https://www.whoop.com/", category: "health" },
  { brand: "AG1", variations: ["ag1", "athletic greens", "athleticgreens", "drinkag1"], program: "AG1 Affiliate Program", commission: "$20-$40 per sale", type: "flat", network: "impact", signupUrl: "https://drinkag1.com/partners", category: "health" },
  { brand: "Onnit", variations: ["onnit", "onnit.com"], program: "Onnit Affiliate Program", commission: "15% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.onnit.com/affiliates/", category: "health" },
  { brand: "Organifi", variations: ["organifi", "organifi.com"], program: "Organifi Affiliate Program", commission: "30% per sale", type: "percentage", network: "direct", signupUrl: "https://www.organifi.com/affiliates", category: "health" },
  { brand: "Fitbit", variations: ["fitbit", "fitbit.com"], program: "Fitbit Affiliate Program", commission: "3-5% per sale", type: "percentage", network: "cj", signupUrl: "https://www.fitbit.com/", category: "health" },
  { brand: "Garmin", variations: ["garmin", "garmin.com"], program: "Garmin Affiliate Program", commission: "5% per sale", type: "percentage", network: "cj", signupUrl: "https://www.garmin.com/", category: "health" },
  { brand: "GNC", variations: ["gnc", "gnc.com"], program: "GNC Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.gnc.com/", category: "health" },
  { brand: "Gymshark", variations: ["gymshark", "gymshark.com"], program: "Gymshark Affiliate Program", commission: "6-10% per sale", type: "percentage", network: "awin", signupUrl: "https://www.gymshark.com/", category: "health" },
  { brand: "Beachbody", variations: ["beachbody", "beachbody.com", "bodi"], program: "Beachbody Affiliate Program", commission: "15% per sale", type: "percentage", network: "cj", signupUrl: "https://www.beachbody.com/", category: "health" },
  { brand: "Headspace", variations: ["headspace", "headspace.com"], program: "Headspace Affiliate Program", commission: "$10 per subscription", type: "flat", network: "impact", signupUrl: "https://www.headspace.com/", category: "health" },
  { brand: "Calm", variations: ["calm", "calm.com"], program: "Calm Affiliate Program", commission: "$8-$12 per subscription", type: "flat", network: "impact", signupUrl: "https://www.calm.com/", category: "health" },
  { brand: "Oura Ring", variations: ["oura", "oura ring", "ouraring.com"], program: "Oura Affiliate Program", commission: "10% per sale", type: "percentage", network: "impact", signupUrl: "https://ouraring.com/", category: "health" },
  { brand: "Tonal", variations: ["tonal", "tonal.com"], program: "Tonal Affiliate Program", commission: "$50 per sale", type: "flat", network: "impact", signupUrl: "https://www.tonal.com/", category: "health" },
  { brand: "Vitamix", variations: ["vitamix", "vitamix.com"], program: "Vitamix Affiliate Program", commission: "8% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.vitamix.com/", category: "health" },
  { brand: "iHerb", variations: ["iherb", "iherb.com"], program: "iHerb Affiliate Program", commission: "5% per sale", type: "percentage", network: "direct", signupUrl: "https://www.iherb.com/info/affiliate", category: "health" },
]);

// Food & Meal Kits
add([
  { brand: "HelloFresh", variations: ["hellofresh", "hello fresh", "hellofresh.com"], program: "HelloFresh Affiliate Program", commission: "$10-$15 per order", type: "flat", network: "impact", signupUrl: "https://www.hellofresh.com/", category: "food" },
  { brand: "Blue Apron", variations: ["blue apron", "blueapron", "blueapron.com"], program: "Blue Apron Affiliate Program", commission: "$15 per subscription", type: "flat", network: "cj", signupUrl: "https://www.blueapron.com/", category: "food" },
  { brand: "ButcherBox", variations: ["butcherbox", "butcher box", "butcherbox.com"], program: "ButcherBox Affiliate Program", commission: "$20 per sale", type: "flat", network: "impact", signupUrl: "https://www.butcherbox.com/", category: "food" },
  { brand: "Home Chef", variations: ["home chef", "homechef", "homechef.com"], program: "Home Chef Affiliate Program", commission: "$10 per sale", type: "flat", network: "cj", signupUrl: "https://www.homechef.com/", category: "food" },
  { brand: "Factor", variations: ["factor", "factor75", "factor.com"], program: "Factor Affiliate Program", commission: "$12 per order", type: "flat", network: "impact", signupUrl: "https://www.factor75.com/", category: "food" },
  { brand: "Thrive Market", variations: ["thrive market", "thrivemarket", "thrivemarket.com"], program: "Thrive Market Affiliate Program", commission: "$5-$40 per sale", type: "flat", network: "cj", signupUrl: "https://thrivemarket.com/", category: "food" },
  { brand: "DoorDash", variations: ["doordash", "door dash", "doordash.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "food" },
  { brand: "Instacart", variations: ["instacart", "instacart.com"], program: "Instacart Affiliate Program", commission: "5% per order", type: "percentage", network: "impact", signupUrl: "https://www.instacart.com/", category: "food" },
  { brand: "Daily Harvest", variations: ["daily harvest", "dailyharvest", "dailyharvest.com"], program: "Daily Harvest Affiliate Program", commission: "$10 per sale", type: "flat", network: "shareasale", signupUrl: "https://www.dailyharvest.com/", category: "food" },
  { brand: "Sakara Life", variations: ["sakara", "sakara life", "sakara.com"], program: "Sakara Affiliate Program", commission: "10% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.sakara.com/", category: "food" },
]);

// Travel
add([
  { brand: "Booking.com", variations: ["booking.com", "booking"], program: "Booking.com Affiliate Program", commission: "25-40% of commission", type: "percentage", network: "direct", signupUrl: "https://www.booking.com/affiliate-program/v2/index.html", category: "travel" },
  { brand: "Expedia", variations: ["expedia", "expedia.com"], program: "Expedia Affiliate Program", commission: "2-6% per booking", type: "percentage", network: "cj", signupUrl: "https://www.expedia.com/", category: "travel" },
  { brand: "TripAdvisor", variations: ["tripadvisor", "trip advisor", "tripadvisor.com"], program: "TripAdvisor Affiliate Program", commission: "50% of revenue", type: "percentage", network: "cj", signupUrl: "https://www.tripadvisor.com/", category: "travel" },
  { brand: "Away", variations: ["away", "away luggage", "awaytravel.com"], program: "Away Affiliate Program", commission: "5% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.awaytravel.com/", category: "travel" },
  { brand: "Airbnb", variations: ["airbnb", "airbnb.com"], program: "Airbnb Affiliate Program", commission: "Varies by region", type: "percentage", network: "impact", signupUrl: "https://www.airbnb.com/", category: "travel" },
  { brand: "Hostelworld", variations: ["hostelworld", "hostelworld.com"], program: "Hostelworld Affiliate Program", commission: "20% per booking commission", type: "percentage", network: "cj", signupUrl: "https://www.hostelworld.com/", category: "travel" },
  { brand: "Skyscanner", variations: ["skyscanner", "skyscanner.com"], program: "Skyscanner Affiliate Program", commission: "Revenue share", type: "percentage", network: "direct", signupUrl: "https://www.partners.skyscanner.net/", category: "travel" },
  { brand: "Viator", variations: ["viator", "viator.com"], program: "Viator Affiliate Program", commission: "8% per booking", type: "percentage", network: "cj", signupUrl: "https://www.viator.com/", category: "travel" },
  { brand: "GetYourGuide", variations: ["getyourguide", "get your guide", "getyourguide.com"], program: "GetYourGuide Affiliate Program", commission: "8% per booking", type: "percentage", network: "direct", signupUrl: "https://www.getyourguide.com/", category: "travel" },
  { brand: "World Nomads", variations: ["world nomads", "worldnomads", "worldnomads.com"], program: "World Nomads Affiliate Program", commission: "10% per policy", type: "percentage", network: "direct", signupUrl: "https://www.worldnomads.com/", category: "travel" },
  { brand: "Samsonite", variations: ["samsonite", "samsonite.com"], program: "Samsonite Affiliate Program", commission: "5% per sale", type: "percentage", network: "cj", signupUrl: "https://www.samsonite.com/", category: "travel" },
  { brand: "KAYAK", variations: ["kayak", "kayak.com"], program: "KAYAK Affiliate Program", commission: "Revenue share", type: "percentage", network: "direct", signupUrl: "https://www.kayak.com/", category: "travel" },
]);

// Education
add([
  { brand: "Duolingo", variations: ["duolingo", "duolingo.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "education" },
  { brand: "Babbel", variations: ["babbel", "babbel.com"], program: "Babbel Affiliate Program", commission: "$10+ per sale", type: "flat", network: "impact", signupUrl: "https://www.babbel.com/", category: "education" },
  { brand: "Chegg", variations: ["chegg", "chegg.com"], program: "Chegg Affiliate Program", commission: "$5-$15 per subscription", type: "flat", network: "cj", signupUrl: "https://www.chegg.com/", category: "education" },
  { brand: "Rosetta Stone", variations: ["rosetta stone", "rosettastone", "rosettastone.com"], program: "Rosetta Stone Affiliate Program", commission: "10% per sale", type: "percentage", network: "cj", signupUrl: "https://www.rosettastone.com/", category: "education" },
  { brand: "MasterClass", variations: ["masterclass", "master class", "masterclass.com"], program: "MasterClass Affiliate Program", commission: "25% per sale", type: "percentage", network: "impact", signupUrl: "https://www.masterclass.com/", category: "education" },
  { brand: "Brilliant", variations: ["brilliant", "brilliant.org"], program: "Brilliant Affiliate Program", commission: "$10 per trial", type: "flat", network: "impact", signupUrl: "https://brilliant.org/", category: "education" },
  { brand: "Khan Academy", variations: ["khan academy", "khanacademy", "khanacademy.org"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "education" },
  { brand: "Codecademy", variations: ["codecademy", "codeacademy", "codecademy.com"], program: "Codecademy Affiliate Program", commission: "20% per sale", type: "percentage", network: "impact", signupUrl: "https://www.codecademy.com/", category: "education" },
  { brand: "DataCamp", variations: ["datacamp", "data camp", "datacamp.com"], program: "DataCamp Affiliate Program", commission: "25% per sale", type: "percentage", network: "impact", signupUrl: "https://www.datacamp.com/", category: "education" },
  { brand: "Pluralsight", variations: ["pluralsight", "pluralsight.com"], program: "Pluralsight Affiliate Program", commission: "15% per sale", type: "percentage", network: "impact", signupUrl: "https://www.pluralsight.com/", category: "education" },
  { brand: "Treehouse", variations: ["treehouse", "teamtreehouse", "teamtreehouse.com"], program: "Treehouse Affiliate Program", commission: "25% per sale", type: "percentage", network: "impact", signupUrl: "https://teamtreehouse.com/", category: "education" },
  { brand: "Busuu", variations: ["busuu", "busuu.com"], program: "Busuu Affiliate Program", commission: "20% per sale", type: "percentage", network: "impact", signupUrl: "https://www.busuu.com/", category: "education" },
]);

// Personal Finance
add([
  { brand: "Robinhood", variations: ["robinhood", "robinhood.com"], program: "Robinhood Referral Program", commission: "Free stock per referral", type: "flat", network: "direct", signupUrl: "https://robinhood.com/", category: "finance-personal" },
  { brand: "Acorns", variations: ["acorns", "acorns.com"], program: "Acorns Affiliate Program", commission: "$5-$10 per signup", type: "flat", network: "impact", signupUrl: "https://www.acorns.com/", category: "finance-personal" },
  { brand: "SoFi", variations: ["sofi", "sofi.com"], program: "SoFi Affiliate Program", commission: "$50-$300 per product", type: "flat", network: "impact", signupUrl: "https://www.sofi.com/", category: "finance-personal" },
  { brand: "Credit Karma", variations: ["credit karma", "creditkarma", "creditkarma.com"], program: "Credit Karma Affiliate Program", commission: "$2+ per signup", type: "flat", network: "direct", signupUrl: "https://www.creditkarma.com/", category: "finance-personal" },
  { brand: "Wealthfront", variations: ["wealthfront", "wealthfront.com"], program: "Wealthfront Referral Program", commission: "$5,000 managed free", type: "flat", network: "direct", signupUrl: "https://www.wealthfront.com/", category: "finance-personal" },
  { brand: "Betterment", variations: ["betterment", "betterment.com"], program: "Betterment Affiliate Program", commission: "$15-$25 per signup", type: "flat", network: "impact", signupUrl: "https://www.betterment.com/", category: "finance-personal" },
  { brand: "Mint", variations: ["mint", "mint.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "finance-personal" },
  { brand: "YNAB", variations: ["ynab", "youneedabudget", "ynab.com"], program: "YNAB Affiliate Program", commission: "$6 per trial signup", type: "flat", network: "direct", signupUrl: "https://www.ynab.com/", category: "finance-personal" },
  { brand: "Personal Capital", variations: ["personal capital", "personalcapital", "empower"], program: "Personal Capital Affiliate Program", commission: "$100 per qualified lead", type: "flat", network: "impact", signupUrl: "https://www.empower.com/", category: "finance-personal" },
  { brand: "Coinbase", variations: ["coinbase", "coinbase.com"], program: "Coinbase Affiliate Program", commission: "50% of trading fees for 3 months", type: "recurring", network: "impact", signupUrl: "https://www.coinbase.com/", category: "finance-personal" },
  { brand: "Webull", variations: ["webull", "webull.com"], program: "Webull Affiliate Program", commission: "$12+ per funded account", type: "flat", network: "impact", signupUrl: "https://www.webull.com/", category: "finance-personal" },
  { brand: "TurboTax", variations: ["turbotax", "turbo tax", "turbotax.com"], program: "TurboTax Affiliate Program", commission: "$5-$20 per sale", type: "flat", network: "cj", signupUrl: "https://turbotax.intuit.com/", category: "finance-personal" },
]);

// Home & Smart Home
add([
  { brand: "Wayfair", variations: ["wayfair", "wayfair.com"], program: "Wayfair Affiliate Program", commission: "5-7% per sale", type: "percentage", network: "cj", signupUrl: "https://www.wayfair.com/", category: "home" },
  { brand: "Overstock", variations: ["overstock", "overstock.com"], program: "Overstock Affiliate Program", commission: "4-6% per sale", type: "percentage", network: "cj", signupUrl: "https://www.overstock.com/", category: "home" },
  { brand: "Ring", variations: ["ring", "ring.com", "ring doorbell"], program: "Ring Affiliate Program", commission: "4% per sale", type: "percentage", network: "impact", signupUrl: "https://ring.com/", category: "home" },
  { brand: "Nest", variations: ["nest", "google nest", "nest.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "home" },
  { brand: "SimpliSafe", variations: ["simplisafe", "simpli safe", "simplisafe.com"], program: "SimpliSafe Affiliate Program", commission: "$20-$50 per sale", type: "flat", network: "cj", signupUrl: "https://simplisafe.com/", category: "home" },
  { brand: "ADT", variations: ["adt", "adt.com"], program: "ADT Affiliate Program", commission: "$125+ per lead", type: "flat", network: "cj", signupUrl: "https://www.adt.com/", category: "home" },
  { brand: "Dyson", variations: ["dyson", "dyson.com"], program: "Dyson Affiliate Program", commission: "3-5% per sale", type: "percentage", network: "awin", signupUrl: "https://www.dyson.com/", category: "home" },
  { brand: "IKEA", variations: ["ikea", "ikea.com"], program: "IKEA Affiliate Program", commission: "3-5% per sale", type: "percentage", network: "awin", signupUrl: "https://www.ikea.com/", category: "home" },
  { brand: "Casper", variations: ["casper", "casper.com"], program: "Casper Affiliate Program", commission: "5-10% per sale", type: "percentage", network: "shareasale", signupUrl: "https://casper.com/", category: "home" },
  { brand: "Purple", variations: ["purple mattress", "purple.com"], program: "Purple Affiliate Program", commission: "5% per sale", type: "percentage", network: "shareasale", signupUrl: "https://purple.com/", category: "home" },
  { brand: "Philips Hue", variations: ["philips hue", "hue", "meethue"], program: "Philips Hue Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.philips-hue.com/", category: "home" },
  { brand: "Home Depot", variations: ["home depot", "homedepot", "homedepot.com"], program: "Home Depot Affiliate Program", commission: "2-8% per sale", type: "percentage", network: "impact", signupUrl: "https://www.homedepot.com/", category: "home" },
  { brand: "Lowe's", variations: ["lowes", "lowe's", "lowes.com"], program: "Lowe's Affiliate Program", commission: "2% per sale", type: "percentage", network: "impact", signupUrl: "https://www.lowes.com/", category: "home" },
]);

// Fashion
add([
  { brand: "Nordstrom", variations: ["nordstrom", "nordstrom.com"], program: "Nordstrom Affiliate Program", commission: "2-11% per sale", type: "percentage", network: "impact", signupUrl: "https://www.nordstrom.com/", category: "fashion" },
  { brand: "ASOS", variations: ["asos", "asos.com"], program: "ASOS Affiliate Program", commission: "5% per sale", type: "percentage", network: "awin", signupUrl: "https://www.asos.com/", category: "fashion" },
  { brand: "Nike", variations: ["nike", "nike.com"], program: "Nike Affiliate Program", commission: "7-11% per sale", type: "percentage", network: "cj", signupUrl: "https://www.nike.com/", category: "fashion" },
  { brand: "Adidas", variations: ["adidas", "adidas.com"], program: "Adidas Affiliate Program", commission: "7% per sale", type: "percentage", network: "impact", signupUrl: "https://www.adidas.com/", category: "fashion" },
  { brand: "H&M", variations: ["h&m", "hm", "hm.com"], program: "H&M Affiliate Program", commission: "5.6% per sale", type: "percentage", network: "awin", signupUrl: "https://www.hm.com/", category: "fashion" },
  { brand: "Zappos", variations: ["zappos", "zappos.com"], program: "Zappos Affiliate Program", commission: "7% per sale", type: "percentage", network: "cj", signupUrl: "https://www.zappos.com/", category: "fashion" },
  { brand: "Stitch Fix", variations: ["stitch fix", "stitchfix", "stitchfix.com"], program: "Stitch Fix Affiliate Program", commission: "$10 per new customer", type: "flat", network: "cj", signupUrl: "https://www.stitchfix.com/", category: "fashion" },
  { brand: "Rent the Runway", variations: ["rent the runway", "renttherunway"], program: "Rent the Runway Affiliate Program", commission: "$15+ per new member", type: "flat", network: "shareasale", signupUrl: "https://www.renttherunway.com/", category: "fashion" },
  { brand: "Warby Parker", variations: ["warby parker", "warbyparker", "warbyparker.com"], program: "Warby Parker Affiliate Program", commission: "5% per sale", type: "percentage", network: "impact", signupUrl: "https://www.warbyparker.com/", category: "fashion" },
  { brand: "Allbirds", variations: ["allbirds", "allbirds.com"], program: "Allbirds Affiliate Program", commission: "5% per sale", type: "percentage", network: "impact", signupUrl: "https://www.allbirds.com/", category: "fashion" },
  { brand: "Lululemon", variations: ["lululemon", "lululemon.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "fashion" },
  { brand: "Puma", variations: ["puma", "puma.com"], program: "Puma Affiliate Program", commission: "5-7% per sale", type: "percentage", network: "awin", signupUrl: "https://www.puma.com/", category: "fashion" },
]);

// Gaming
add([
  { brand: "Razer", variations: ["razer", "razer.com"], program: "Razer Affiliate Program", commission: "3-5% per sale", type: "percentage", network: "cj", signupUrl: "https://www.razer.com/", category: "gaming" },
  { brand: "SteelSeries", variations: ["steelseries", "steel series", "steelseries.com"], program: "SteelSeries Affiliate Program", commission: "6% per sale", type: "percentage", network: "cj", signupUrl: "https://steelseries.com/", category: "gaming" },
  { brand: "HyperX", variations: ["hyperx", "hyperxgaming", "hyperx.com"], program: "HyperX Affiliate Program", commission: "5% per sale", type: "percentage", network: "impact", signupUrl: "https://www.hyperx.com/", category: "gaming" },
  { brand: "Corsair", variations: ["corsair", "corsair.com"], program: "Corsair Affiliate Program", commission: "5% per sale", type: "percentage", network: "cj", signupUrl: "https://www.corsair.com/", category: "gaming" },
  { brand: "Logitech", variations: ["logitech", "logitech.com", "logitechg"], program: "Logitech Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.logitechg.com/", category: "gaming" },
  { brand: "Secretlab", variations: ["secretlab", "secret lab", "secretlab.co"], program: "Secretlab Affiliate Program", commission: "5-8% per sale", type: "percentage", network: "shareasale", signupUrl: "https://secretlab.co/", category: "gaming" },
  { brand: "Xbox Game Pass", variations: ["xbox game pass", "game pass", "xbox"], program: "Microsoft Affiliate Program", commission: "2-7% per sale", type: "percentage", network: "impact", signupUrl: "https://www.xbox.com/", category: "gaming" },
  { brand: "Steam", variations: ["steam", "store.steampowered.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "gaming" },
  { brand: "Discord", variations: ["discord", "discord.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "gaming" },
  { brand: "Twitch", variations: ["twitch", "twitch.tv"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "gaming" },
]);

// Pet
add([
  { brand: "Chewy", variations: ["chewy", "chewy.com"], program: "Chewy Affiliate Program", commission: "$15 per new customer", type: "flat", network: "cj", signupUrl: "https://www.chewy.com/", category: "pet" },
  { brand: "BarkBox", variations: ["barkbox", "bark box", "barkbox.com", "bark"], program: "BarkBox Affiliate Program", commission: "$12 per subscription", type: "flat", network: "impact", signupUrl: "https://www.barkbox.com/", category: "pet" },
  { brand: "Petco", variations: ["petco", "petco.com"], program: "Petco Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.petco.com/", category: "pet" },
  { brand: "PetSmart", variations: ["petsmart", "pet smart", "petsmart.com"], program: "PetSmart Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.petsmart.com/", category: "pet" },
  { brand: "Rover", variations: ["rover", "rover.com"], program: "Rover Affiliate Program", commission: "$10 per booking", type: "flat", network: "impact", signupUrl: "https://www.rover.com/", category: "pet" },
  { brand: "Ollie", variations: ["ollie", "ollie dog food", "myollie.com"], program: "Ollie Affiliate Program", commission: "$20+ per subscription", type: "flat", network: "shareasale", signupUrl: "https://www.myollie.com/", category: "pet" },
  { brand: "Fi Collar", variations: ["fi", "fi collar", "tryfi.com"], program: "Fi Affiliate Program", commission: "10% per sale", type: "percentage", network: "direct", signupUrl: "https://tryfi.com/", category: "pet" },
]);

// Music
add([
  { brand: "Spotify", variations: ["spotify", "spotify.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "music" },
  { brand: "DistroKid", variations: ["distrokid", "distrokid.com"], program: "DistroKid Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://distrokid.com/", category: "music" },
  { brand: "Splice", variations: ["splice", "splice.com"], program: "Splice Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://splice.com/", category: "music" },
  { brand: "Soundcloud", variations: ["soundcloud", "soundcloud.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "music" },
  { brand: "iZotope", variations: ["izotope", "izotope.com"], program: "iZotope Affiliate Program", commission: "15% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.izotope.com/", category: "music" },
  { brand: "Native Instruments", variations: ["native instruments", "native-instruments.com"], program: "Native Instruments Affiliate Program", commission: "10% per sale", type: "percentage", network: "awin", signupUrl: "https://www.native-instruments.com/", category: "music" },
  { brand: "Sweetwater", variations: ["sweetwater", "sweetwater.com"], program: "Sweetwater Affiliate Program", commission: "4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.sweetwater.com/", category: "music" },
  { brand: "Guitar Center", variations: ["guitar center", "guitarcenter", "guitarcenter.com"], program: "Guitar Center Affiliate Program", commission: "3% per sale", type: "percentage", network: "cj", signupUrl: "https://www.guitarcenter.com/", category: "music" },
]);

// Legal
add([
  { brand: "LegalZoom", variations: ["legalzoom", "legal zoom", "legalzoom.com"], program: "LegalZoom Affiliate Program", commission: "$20-$50 per sale", type: "flat", network: "cj", signupUrl: "https://www.legalzoom.com/", category: "legal" },
  { brand: "Rocket Lawyer", variations: ["rocket lawyer", "rocketlawyer", "rocketlawyer.com"], program: "Rocket Lawyer Affiliate Program", commission: "$20+ per lead", type: "flat", network: "cj", signupUrl: "https://www.rocketlawyer.com/", category: "legal" },
  { brand: "Incfile", variations: ["incfile", "incfile.com"], program: "Incfile Affiliate Program", commission: "$15-$30 per sale", type: "flat", network: "shareasale", signupUrl: "https://www.incfile.com/", category: "legal" },
  { brand: "Northwest Registered Agent", variations: ["northwest registered agent", "northwestregisteredagent.com"], program: "Northwest RA Affiliate Program", commission: "$100+ per sale", type: "flat", network: "direct", signupUrl: "https://www.northwestregisteredagent.com/", category: "legal" },
  { brand: "DocuSign", variations: ["docusign", "docu sign", "docusign.com"], program: "DocuSign Affiliate Program", commission: "20% per sale", type: "percentage", network: "impact", signupUrl: "https://www.docusign.com/", category: "legal" },
  { brand: "HelloSign", variations: ["hellosign", "hello sign", "hellosign.com"], program: "HelloSign Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.hellosign.com/", category: "legal" },
]);

// HR & Hiring
add([
  { brand: "Indeed", variations: ["indeed", "indeed.com"], program: "Indeed Affiliate Program", commission: "Per job posting referral", type: "flat", network: "cj", signupUrl: "https://www.indeed.com/", category: "hr" },
  { brand: "ZipRecruiter", variations: ["ziprecruiter", "zip recruiter", "ziprecruiter.com"], program: "ZipRecruiter Affiliate Program", commission: "$25 per trial", type: "flat", network: "cj", signupUrl: "https://www.ziprecruiter.com/", category: "hr" },
  { brand: "Deel", variations: ["deel", "deel.com"], program: "Deel Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://www.deel.com/", category: "hr" },
  { brand: "Remote.com", variations: ["remote", "remote.com"], program: "Remote Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://remote.com/", category: "hr" },
  { brand: "BambooHR", variations: ["bamboohr", "bamboo hr", "bamboohr.com"], program: "BambooHR Affiliate Program", commission: "$25+ per lead", type: "flat", network: "impact", signupUrl: "https://www.bamboohr.com/", category: "hr" },
  { brand: "Rippling", variations: ["rippling", "rippling.com"], program: "Rippling Affiliate Program", commission: "$500+ per deal", type: "flat", network: "direct", signupUrl: "https://www.rippling.com/", category: "hr" },
  { brand: "Glassdoor", variations: ["glassdoor", "glassdoor.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "hr" },
]);

// Photography
add([
  { brand: "B&H Photo", variations: ["b&h", "b&h photo", "bhphoto", "bhphotovideo.com"], program: "B&H Photo Affiliate Program", commission: "2-5% per sale", type: "percentage", network: "impact", signupUrl: "https://www.bhphotovideo.com/", category: "photography" },
  { brand: "Adorama", variations: ["adorama", "adorama.com"], program: "Adorama Affiliate Program", commission: "2-4% per sale", type: "percentage", network: "cj", signupUrl: "https://www.adorama.com/", category: "photography" },
  { brand: "SmugMug", variations: ["smugmug", "smugmug.com"], program: "SmugMug Affiliate Program", commission: "15% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.smugmug.com/", category: "photography" },
  { brand: "Pixieset", variations: ["pixieset", "pixieset.com"], program: "Pixieset Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://pixieset.com/", category: "photography" },
  { brand: "Pic-Time", variations: ["pic-time", "pictime", "pic-time.com"], program: "Pic-Time Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://pic-time.com/", category: "photography" },
  { brand: "Lightroom", variations: ["lightroom", "adobe lightroom"], program: "Adobe Affiliate Program", commission: "85% of first month", type: "flat", network: "direct", signupUrl: "https://www.adobe.com/affiliates.html", category: "photography" },
  { brand: "Capture One", variations: ["capture one", "captureone", "captureone.com"], program: "Capture One Affiliate Program", commission: "15% per sale", type: "percentage", network: "direct", signupUrl: "https://www.captureone.com/", category: "photography" },
  { brand: "Skylum Luminar", variations: ["skylum", "luminar", "skylum.com"], program: "Skylum Affiliate Program", commission: "30% per sale", type: "percentage", network: "direct", signupUrl: "https://skylum.com/", category: "photography" },
]);

// Real Estate
add([
  { brand: "Zillow", variations: ["zillow", "zillow.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "real-estate" },
  { brand: "Redfin", variations: ["redfin", "redfin.com"], program: "Redfin Referral Program", commission: "Referral credits", type: "flat", network: "direct", signupUrl: "https://www.redfin.com/", category: "real-estate" },
  { brand: "Realtor.com", variations: ["realtor.com", "realtor"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "real-estate" },
  { brand: "Buildium", variations: ["buildium", "buildium.com"], program: "Buildium Affiliate Program", commission: "25% per sale", type: "percentage", network: "direct", signupUrl: "https://www.buildium.com/", category: "real-estate" },
  { brand: "AppFolio", variations: ["appfolio", "appfolio.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "real-estate" },
  { brand: "Roofstock", variations: ["roofstock", "roofstock.com"], program: "Roofstock Affiliate Program", commission: "Revenue share", type: "percentage", network: "direct", signupUrl: "https://www.roofstock.com/", category: "real-estate" },
  { brand: "Fundrise", variations: ["fundrise", "fundrise.com"], program: "Fundrise Affiliate Program", commission: "$50 per funded account", type: "flat", network: "impact", signupUrl: "https://fundrise.com/", category: "real-estate" },
]);

// Sustainability
add([
  { brand: "Tentree", variations: ["tentree", "tentree.com"], program: "Tentree Affiliate Program", commission: "10% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.tentree.com/", category: "sustainability" },
  { brand: "Patagonia", variations: ["patagonia", "patagonia.com"], program: "Patagonia Affiliate Program", commission: "5% per sale", type: "percentage", network: "awin", signupUrl: "https://www.patagonia.com/", category: "sustainability" },
  { brand: "EarthHero", variations: ["earthhero", "earth hero", "earthhero.com"], program: "EarthHero Affiliate Program", commission: "7% per sale", type: "percentage", network: "shareasale", signupUrl: "https://earthhero.com/", category: "sustainability" },
  { brand: "Package Free", variations: ["package free", "packagefree", "packagefreeshop.com"], program: "Package Free Affiliate Program", commission: "8% per sale", type: "percentage", network: "shareasale", signupUrl: "https://packagefreeshop.com/", category: "sustainability" },
  { brand: "Grove Collaborative", variations: ["grove", "grove collaborative", "grove.co"], program: "Grove Affiliate Program", commission: "$5 per new customer", type: "flat", network: "impact", signupUrl: "https://www.grove.co/", category: "sustainability" },
  { brand: "Blueland", variations: ["blueland", "blueland.com"], program: "Blueland Affiliate Program", commission: "10% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.blueland.com/", category: "sustainability" },
]);

// ─── EXPAND EXISTING CATEGORIES ───

// More ecommerce
add([
  { brand: "Ecwid", variations: ["ecwid", "ecwid.com"], program: "Ecwid Affiliate Program", commission: "20% recurring", type: "recurring", network: "direct", signupUrl: "https://www.ecwid.com/", category: "ecommerce" },
  { brand: "Sellfy", variations: ["sellfy", "sellfy.com"], program: "Sellfy Affiliate Program", commission: "25% recurring", type: "recurring", network: "direct", signupUrl: "https://sellfy.com/", category: "ecommerce" },
  { brand: "Lemon Squeezy", variations: ["lemon squeezy", "lemonsqueezy", "lemonsqueezy.com"], program: "Lemon Squeezy Affiliate Program", commission: "30% for 12 months", type: "recurring", network: "direct", signupUrl: "https://www.lemonsqueezy.com/", category: "ecommerce" },
  { brand: "Volusion", variations: ["volusion", "volusion.com"], program: "Volusion Affiliate Program", commission: "200% of first month", type: "flat", network: "cj", signupUrl: "https://www.volusion.com/", category: "ecommerce" },
  { brand: "Shift4Shop", variations: ["shift4shop", "3dcart"], program: "Shift4Shop Affiliate Program", commission: "$25 per signup", type: "flat", network: "shareasale", signupUrl: "https://www.shift4shop.com/", category: "ecommerce" },
  { brand: "Paddle", variations: ["paddle", "paddle.com"], program: "Paddle Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://www.paddle.com/", category: "ecommerce" },
  { brand: "FastSpring", variations: ["fastspring", "fast spring", "fastspring.com"], program: "FastSpring Partner Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://fastspring.com/", category: "ecommerce" },
]);

// More SEO
add([
  { brand: "SERPstat", variations: ["serpstat", "serpstat.com"], program: "Serpstat Affiliate Program", commission: "30% recurring", type: "recurring", network: "direct", signupUrl: "https://serpstat.com/", category: "seo" },
  { brand: "Sitebulb", variations: ["sitebulb", "sitebulb.com"], program: "Sitebulb Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://sitebulb.com/", category: "seo" },
  { brand: "ContentKing", variations: ["contentking", "contentkingapp.com"], program: "ContentKing Affiliate Program", commission: "20% recurring", type: "recurring", network: "direct", signupUrl: "https://www.contentkingapp.com/", category: "seo" },
  { brand: "BrightEdge", variations: ["brightedge", "bright edge"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "seo" },
  { brand: "Conductor", variations: ["conductor", "conductor.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "seo" },
  { brand: "MarketMuse", variations: ["marketmuse", "market muse"], program: "MarketMuse Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.marketmuse.com/", category: "seo" },
  { brand: "Frase", variations: ["frase", "frase.io"], program: "Frase Affiliate Program", commission: "30% recurring", type: "recurring", network: "direct", signupUrl: "https://www.frase.io/", category: "seo" },
  { brand: "Neuronwriter", variations: ["neuronwriter", "neuron writer"], program: "NeuronWriter Affiliate Program", commission: "30% per sale", type: "percentage", network: "direct", signupUrl: "https://neuronwriter.com/", category: "seo" },
]);

// More hosting
add([
  { brand: "ScalaHosting", variations: ["scalahosting", "scala hosting", "scalahosting.com"], program: "ScalaHosting Affiliate Program", commission: "$50-$200 per sale", type: "flat", network: "direct", signupUrl: "https://www.scalahosting.com/", category: "hosting" },
  { brand: "GreenGeeks", variations: ["greengeeks", "green geeks", "greengeeks.com"], program: "GreenGeeks Affiliate Program", commission: "$50-$100 per sale", type: "flat", network: "direct", signupUrl: "https://www.greengeeks.com/", category: "hosting" },
  { brand: "InMotion Hosting", variations: ["inmotion", "inmotion hosting", "inmotionhosting.com"], program: "InMotion Affiliate Program", commission: "$50-$200 per sale", type: "flat", network: "direct", signupUrl: "https://www.inmotionhosting.com/", category: "hosting" },
  { brand: "Nexcess", variations: ["nexcess", "nexcess.net"], program: "Nexcess Affiliate Program", commission: "$150+ per sale", type: "flat", network: "impact", signupUrl: "https://www.nexcess.net/", category: "hosting" },
  { brand: "Pressable", variations: ["pressable", "pressable.com"], program: "Pressable Affiliate Program", commission: "$50 per signup", type: "flat", network: "direct", signupUrl: "https://pressable.com/", category: "hosting" },
]);

// More design
add([
  { brand: "Miro", variations: ["miro", "miro.com"], program: "Miro Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://miro.com/", category: "design" },
  { brand: "Sketch", variations: ["sketch", "sketch.com", "sketchapp"], program: "Sketch Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.sketch.com/", category: "design" },
  { brand: "InVision", variations: ["invision", "invision.com", "invisionapp"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "design" },
  { brand: "Procreate", variations: ["procreate", "procreate.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "design" },
  { brand: "Affinity Designer", variations: ["affinity", "affinity designer", "affinity photo", "serif"], program: "Affinity Affiliate Program", commission: "20% per sale", type: "percentage", network: "awin", signupUrl: "https://affinity.serif.com/", category: "design" },
  { brand: "Spline", variations: ["spline", "spline.design"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "design" },
]);

// More AI
add([
  { brand: "Synthesia", variations: ["synthesia", "synthesia.io"], program: "Synthesia Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.synthesia.io/", category: "ai" },
  { brand: "ElevenLabs", variations: ["elevenlabs", "eleven labs", "elevenlabs.io"], program: "ElevenLabs Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://elevenlabs.io/", category: "ai" },
  { brand: "Perplexity", variations: ["perplexity", "perplexity.ai"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "ai" },
  { brand: "DeepL", variations: ["deepl", "deepl.com"], program: "DeepL Affiliate Program", commission: "Revenue share", type: "percentage", network: "direct", signupUrl: "https://www.deepl.com/", category: "ai" },
  { brand: "Murf.ai", variations: ["murf", "murf.ai"], program: "Murf Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://murf.ai/", category: "ai" },
  { brand: "Heygen", variations: ["heygen", "heygen.com"], program: "HeyGen Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.heygen.com/", category: "ai" },
  { brand: "Durable", variations: ["durable", "durable.co"], program: "Durable Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://durable.co/", category: "ai" },
]);

// More WordPress
add([
  { brand: "Beaver Builder", variations: ["beaver builder", "beaverbuilder"], program: "Beaver Builder Affiliate Program", commission: "25% per sale", type: "percentage", network: "direct", signupUrl: "https://www.wpbeaverbuilder.com/", category: "wordpress" },
  { brand: "Kadence", variations: ["kadence", "kadence theme", "kadencewp"], program: "Kadence Affiliate Program", commission: "30% per sale", type: "percentage", network: "direct", signupUrl: "https://www.kadencewp.com/", category: "wordpress" },
  { brand: "Brizy", variations: ["brizy", "brizy.io"], program: "Brizy Affiliate Program", commission: "25% per sale", type: "percentage", network: "direct", signupUrl: "https://www.brizy.io/", category: "wordpress" },
  { brand: "Oxygen Builder", variations: ["oxygen", "oxygen builder", "oxygenbuilder.com"], program: "Oxygen Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://oxygenbuilder.com/", category: "wordpress" },
  { brand: "Thrive Themes", variations: ["thrive themes", "thrivethemes"], program: "Thrive Themes Affiliate Program", commission: "25% recurring", type: "recurring", network: "direct", signupUrl: "https://thrivethemes.com/", category: "wordpress" },
  { brand: "Updraft Plus", variations: ["updraftplus", "updraft plus"], program: "UpdraftPlus Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://updraftplus.com/", category: "wordpress" },
  { brand: "WP Rocket", variations: ["wp rocket", "wprocket"], program: "WP Rocket Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://wp-rocket.me/", category: "wordpress" },
  { brand: "Imagify", variations: ["imagify", "imagify.io"], program: "Imagify Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://imagify.io/", category: "wordpress" },
]);

// More security
add([
  { brand: "Norton", variations: ["norton", "norton.com", "norton antivirus"], program: "Norton Affiliate Program", commission: "$20-$40 per sale", type: "flat", network: "cj", signupUrl: "https://us.norton.com/", category: "security" },
  { brand: "McAfee", variations: ["mcafee", "mcafee.com"], program: "McAfee Affiliate Program", commission: "$20-$40 per sale", type: "flat", network: "cj", signupUrl: "https://www.mcafee.com/", category: "security" },
  { brand: "Surfshark", variations: ["surfshark", "surfshark.com"], program: "Surfshark Affiliate Program", commission: "40% per sale", type: "percentage", network: "direct", signupUrl: "https://surfshark.com/", category: "security" },
  { brand: "CyberGhost", variations: ["cyberghost", "cyberghost vpn", "cyberghostvpn.com"], program: "CyberGhost Affiliate Program", commission: "40-100% of first payment", type: "flat", network: "cj", signupUrl: "https://www.cyberghostvpn.com/", category: "security" },
  { brand: "ProtonVPN", variations: ["protonvpn", "proton vpn", "proton"], program: "ProtonVPN Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://protonvpn.com/", category: "security" },
  { brand: "Dashlane", variations: ["dashlane", "dashlane.com"], program: "Dashlane Affiliate Program", commission: "$3 per free, $7 per paid", type: "flat", network: "impact", signupUrl: "https://www.dashlane.com/", category: "security" },
]);

// More video
add([
  { brand: "Wistia", variations: ["wistia", "wistia.com"], program: "Wistia Affiliate Program", commission: "15% recurring", type: "recurring", network: "direct", signupUrl: "https://wistia.com/", category: "video" },
  { brand: "Vimeo", variations: ["vimeo", "vimeo.com"], program: "Vimeo Affiliate Program", commission: "10-20% per sale", type: "percentage", network: "cj", signupUrl: "https://vimeo.com/", category: "video" },
  { brand: "StreamYard", variations: ["streamyard", "stream yard", "streamyard.com"], program: "StreamYard Affiliate Program", commission: "25% per sale", type: "percentage", network: "direct", signupUrl: "https://streamyard.com/", category: "video" },
  { brand: "Ecamm Live", variations: ["ecamm", "ecamm live", "ecamm.com"], program: "Ecamm Affiliate Program", commission: "20% per sale", type: "percentage", network: "direct", signupUrl: "https://www.ecamm.com/", category: "video" },
  { brand: "Restream", variations: ["restream", "restream.io"], program: "Restream Affiliate Program", commission: "20% recurring", type: "recurring", network: "direct", signupUrl: "https://restream.io/", category: "video" },
  { brand: "ScreenFlow", variations: ["screenflow", "screen flow"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "video" },
  { brand: "OBS Studio", variations: ["obs", "obs studio", "obsproject"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "video" },
]);

// Common tech brands (none type - outreach only)
add([
  { brand: "Instagram", variations: ["instagram", "instagram.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "social" },
  { brand: "YouTube", variations: ["youtube", "youtube.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "social" },
  { brand: "Twitter/X", variations: ["twitter", "x.com", "twitter.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "social" },
  { brand: "LinkedIn", variations: ["linkedin", "linkedin.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "social" },
  { brand: "WordPress.org", variations: ["wordpress.org", "wordpress open source"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "VS Code", variations: ["vs code", "vscode", "visual studio code"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "Docker", variations: ["docker", "docker.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "AWS", variations: ["aws", "amazon web services"], program: "AWS Partner Program", commission: "Revenue share (partner)", type: "recurring", network: "direct", signupUrl: "https://aws.amazon.com/partners/", category: "developer" },
  { brand: "Google Cloud", variations: ["google cloud", "gcp", "google cloud platform"], program: "Google Cloud Partner Program", commission: "Revenue share (partner)", type: "recurring", network: "direct", signupUrl: "https://cloud.google.com/partners", category: "developer" },
  { brand: "Heroku", variations: ["heroku", "heroku.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "MongoDB", variations: ["mongodb", "mongodb.com", "mongo"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "Supabase", variations: ["supabase", "supabase.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "Firebase", variations: ["firebase", "firebase.google.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "Airtable", variations: ["airtable", "airtable.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
  { brand: "Webex", variations: ["webex", "webex.com"], program: "Webex Affiliate Program", commission: "Revenue share", type: "percentage", network: "impact", signupUrl: "https://www.webex.com/", category: "communication" },
  { brand: "Livekit", variations: ["livekit", "livekit.io"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "developer" },
]);

// More email
add([
  { brand: "Mailjet", variations: ["mailjet", "mailjet.com"], program: "Mailjet Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://www.mailjet.com/", category: "email" },
  { brand: "Campaign Monitor", variations: ["campaign monitor", "campaignmonitor", "campaignmonitor.com"], program: "Campaign Monitor Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://www.campaignmonitor.com/", category: "email" },
  { brand: "Benchmark Email", variations: ["benchmark", "benchmark email", "benchmarkemail.com"], program: "Benchmark Affiliate Program", commission: "25% recurring", type: "recurring", network: "direct", signupUrl: "https://www.benchmarkemail.com/", category: "email" },
  { brand: "Flodesk", variations: ["flodesk", "flodesk.com"], program: "Flodesk Affiliate Program", commission: "50% per referral", type: "flat", network: "direct", signupUrl: "https://flodesk.com/", category: "email" },
]);

// More automation
add([
  { brand: "n8n", variations: ["n8n", "n8n.io"], program: "n8n Affiliate Program", commission: "20% recurring", type: "recurring", network: "direct", signupUrl: "https://n8n.io/", category: "automation" },
  { brand: "Pipedream", variations: ["pipedream", "pipedream.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "automation" },
  { brand: "ActivePieces", variations: ["activepieces", "activepieces.com"], program: "No public affiliate program", commission: "", type: "none", network: "none", signupUrl: "", category: "automation" },
  { brand: "Tray.io", variations: ["tray.io", "tray"], program: "Tray.io Partner Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://tray.io/", category: "automation" },
]);

// More CRM
add([
  { brand: "Salesforce", variations: ["salesforce", "salesforce.com"], program: "Salesforce Referral Program", commission: "Revenue share (partner)", type: "recurring", network: "direct", signupUrl: "https://www.salesforce.com/", category: "crm" },
  { brand: "Copper", variations: ["copper", "copper crm", "copper.com"], program: "Copper Affiliate Program", commission: "15% recurring", type: "recurring", network: "direct", signupUrl: "https://www.copper.com/", category: "crm" },
  { brand: "Keap", variations: ["keap", "keap.com", "infusionsoft"], program: "Keap Affiliate Program", commission: "$100+ per sale", type: "flat", network: "direct", signupUrl: "https://keap.com/", category: "crm" },
  { brand: "Nimble", variations: ["nimble", "nimble.com"], program: "Nimble Affiliate Program", commission: "20% recurring", type: "recurring", network: "direct", signupUrl: "https://www.nimble.com/", category: "crm" },
]);

// More stock media
add([
  { brand: "Getty Images", variations: ["getty images", "gettyimages", "gettyimages.com"], program: "Getty Images Affiliate Program", commission: "20% per sale", type: "percentage", network: "cj", signupUrl: "https://www.gettyimages.com/", category: "stock-media" },
  { brand: "Artlist", variations: ["artlist", "artlist.io"], program: "Artlist Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://artlist.io/", category: "stock-media" },
  { brand: "Epidemic Sound", variations: ["epidemic sound", "epidemicsound", "epidemicsound.com"], program: "Epidemic Sound Affiliate Program", commission: "Revenue share", type: "recurring", network: "direct", signupUrl: "https://www.epidemicsound.com/", category: "stock-media" },
  { brand: "Storyblocks", variations: ["storyblocks", "story blocks", "storyblocks.com"], program: "Storyblocks Affiliate Program", commission: "30% per sale", type: "percentage", network: "shareasale", signupUrl: "https://www.storyblocks.com/", category: "stock-media" },
]);

// Insurance
add([
  { brand: "Lemonade", variations: ["lemonade", "lemonade.com", "lemonade insurance"], program: "Lemonade Affiliate Program", commission: "$10-$25 per policy", type: "flat", network: "impact", signupUrl: "https://www.lemonade.com/", category: "insurance" },
  { brand: "PolicyGenius", variations: ["policygenius", "policy genius", "policygenius.com"], program: "PolicyGenius Affiliate Program", commission: "$15-$100 per lead", type: "flat", network: "impact", signupUrl: "https://www.policygenius.com/", category: "insurance" },
  { brand: "Ladder Life", variations: ["ladder", "ladder life", "ladderlife.com"], program: "Ladder Affiliate Program", commission: "$50+ per policy", type: "flat", network: "impact", signupUrl: "https://www.ladderlife.com/", category: "insurance" },
  { brand: "Haven Life", variations: ["haven life", "havenlife", "havenlife.com"], program: "Haven Life Affiliate Program", commission: "$25+ per policy", type: "flat", network: "cj", signupUrl: "https://havenlife.com/", category: "insurance" },
  { brand: "The Zebra", variations: ["the zebra", "thezebra", "thezebra.com"], program: "The Zebra Affiliate Program", commission: "$15 per lead", type: "flat", network: "impact", signupUrl: "https://www.thezebra.com/", category: "insurance" },
]);

// ─── WRITE ───
fs.writeFileSync(FILE, JSON.stringify(existing, null, 2) + '\n');
console.log(`Done. Total entries: ${existing.length}`);

// Category breakdown
const cats = {};
existing.forEach(p => { cats[p.category] = (cats[p.category]||0)+1; });
console.log('\nBy category:');
Object.entries(cats).sort((a,b) => b[1]-a[1]).forEach(([cat, count]) => {
  console.log(`  ${cat}: ${count}`);
});
