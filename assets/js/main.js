/**
 * Fix It All Auto Repair - Main Interactive JavaScript
 * High performance, zero dependency, production-grade logic.
 * Includes Full English / Spanish Bilingual Language Switcher.
 */

// Active language state (default English or saved preference)
let currentLang = localStorage.getItem('fia_lang') || 'en';

document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initLiveHours();
  initMobileMenu();
  initActiveNav();
  initQueryParamPrefill();
  initServiceFilters();
  initCouponClaim();
  initReviewFilters();
  initAppointmentForm();
  initFaqAccordion();
  initStickyHeader();
  initPhoneMasking();
  initDatePicker();
});

/* ==========================================================================
   BILINGUAL TRANSLATION DICTIONARY (EN / ES)
   ========================================================================== */
const I18N = {
  en: {
    // Navigation & Breadcrumbs
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.specials": "Specials & Coupons",
    "nav.about": "About Us",
    "nav.why_us": "Why Us",
    "nav.reviews": "5.0★ Reviews",
    "nav.contact": "Contact & Booking",
    "nav.location": "Location & Hours",
    "nav.faq": "FAQ",
    "nav.estimate": "Free Estimate",
    "nav.call_now": "Call Now: (702) 326-7375",
    "nav.guarantee": "100% Work Guaranteed",
    "nav.spanish_badge": "¡Hablamos Español!",
    "nav.language": "Language / Idioma",

    "crumb.home": "Home",
    "crumb.services": "Services",
    "crumb.specials": "Specials & Deals",
    "crumb.about": "About Us",
    "crumb.reviews": "5.0★ Reviews",
    "crumb.contact": "Contact & Booking",

    // Subpage Hero Headers
    "services.page_title": "Full-Service Automotive Excellence in Las Vegas",
    "services.page_desc": "Certified master mechanics Antonio & Lorenzo service all makes and models with transparent pricing and 100% work guaranteed.",
    "specials.page_title": "Las Vegas Auto Repair Specials & Discount Coupons",
    "specials.page_desc": "Present coupons on your phone or claim online to lock in exclusive rates on synthetic oil changes, brake repairs, and computerized diagnostics.",
    "about.page_title": "About Fix It All Auto Repair – Meet Antonio & Lorenzo",
    "about.page_desc": "Honest, fast, independent mechanics serving Las Vegas drivers with zero dealership markups and genuine family care.",
    "reviews.page_title": "Verified 5.0★ Customer Reviews & Testimonials",
    "reviews.page_desc": "Over 114+ real Las Vegas drivers trust Fix It All Auto Repair for honesty, speed, and master mechanical craftsmanship.",
    "contact.page_title": "Contact Us & Request a Free Estimate",
    "contact.page_desc": "Convenient Westside shop located at 3100 W Sirius Ave Ste 107B. Open 7 days a week.",

    // Hero Section
    "hero.rating": "5.0 ★ Google Rating",
    "hero.reviews": "114+ Verified Local Reviews",
    "hero.headline_html": 'Las Vegas’ Trusted Mechanic – <span class="text-gradient-red">Quality Repairs</span> You Can Rely On',
    "hero.subheadline": "We service and repair all makes and models. Fast turnaround, transparent pricing, and 100% work guaranteed by certified master mechanics Antonio & Lorenzo.",
    "hero.call_btn": "Call (702) 326-7375",
    "hero.estimate_btn": "Request Free Estimate",
    "hero.pill_guarantee": "100% Guaranteed",
    "hero.pill_guarantee_sub": "Parts & Labor Covered",
    "hero.pill_fast": "Fast Turnaround",
    "hero.pill_fast_sub": "Same-Day Availability",
    "hero.pill_free": "Free Estimates",
    "hero.pill_free_sub": "Zero Pressure Quotes",
    "hero.pass_title": "QUICK SHOP PASS",
    "hero.deal_tag": "FEATURED DEAL",
    "hero.deal_title": "Synthetic Blend Oil Special",
    "hero.deal_free": "+ Free Safety Check",
    "hero.deal_desc": "Up to 5 qts synthetic blend, new filter, and multi-point brake inspection.",
    "hero.deal_claim": "Claim $29.95 Offer",
    "hero.makes": "All Vehicle Makes & Models",
    "hero.makes_sub": "Domestic & Import",
    "hero.mechanics": "Lead Master Mechanics",
    "hero.diag": "Diagnostic Scanning",
    "hero.diag_sub": "State-of-the-Art",
    "hero.advice": "Need immediate roadside or repair advice?",
    "hero.call_tech": "Call Master Tech: (702) 326-7375",

    // Mobile Action Hub
    "hub.call": "Call Shop",
    "hub.call_sub": "(702) 326-7375",
    "hub.directions": "Directions",
    "hub.directions_sub": "Sirius & Valley View",
    "hub.deal": "$29.95 Deal",
    "hub.deal_sub": "Oil + Inspection",
    "hub.estimate": "Get Estimate",
    "hub.estimate_sub": "Free & Fast",

    // Specials & Coupons
    "specials.badge": "Limited-Time Las Vegas Specials",
    "specials.title": "Special Deals & Repair Coupons",
    "specials.desc": "Present these coupons on your phone or click \"Claim Coupon\" to lock in exclusive promotional rates for your vehicle.",
    "specials.popular": "MOST POPULAR IN LAS VEGAS",
    "specials.featured": "Featured Promotion",
    "specials.coupon_code_lbl": "Coupon Code:",
    "specials.deal_headline_html": 'Synthetic Blend Oil Change & Brake Special – Only <span class="text-red-500 font-black">$29.95</span>',
    "specials.deal_desc_html": 'Includes up to 5 quarts of premium synthetic blend motor oil, high-flow OEM filter replacement, complete chassis lubrication, plus a <strong class="text-emerald-400 font-semibold">FREE 25-Point Comprehensive Vehicle & Brake Safety Inspection</strong>.',
    "specials.feat1": "Up to 5 Quarts Oil",
    "specials.feat2": "New Oil Filter",
    "specials.feat3": "Free Brake Pad Check",
    "specials.reg_val": "Regular value: $59.95 (Save $30)",
    "specials.claim_btn": "Claim Special Offer",
    "specials.c1_tag": "Brake Special",
    "specials.c1_title": "$20 OFF Brake Service",
    "specials.c1_desc": "Save $20 on any front or rear brake pad & rotor replacement service. Includes full hardware inspection.",
    "specials.c1_btn": "Claim $20 Coupon",
    "specials.c2_tag": "Diagnostics",
    "specials.c2_title": "FREE Check Engine Scan",
    "specials.c2_desc": "Warning light on? Get a complimentary OBD-II computerized error code readout and expert preliminary diagnostic.",
    "specials.c2_btn": "Claim Free Scan",
    "specials.c3_tag": "Major Repairs",
    "specials.c3_title": "$50 OFF Major Repairs",
    "specials.c3_desc": "Receive $50 off any transmission overhaul, engine repair, timing belt, or suspension job over $500.",
    "specials.c3_btn": "Claim $50 Coupon",

    // Services
    "services.badge": "Full-Service Automotive Excellence",
    "services.title": "Expert Auto Repair Services in Las Vegas",
    "services.desc": "From routine scheduled maintenance to advanced engine overhauls, our certified technicians handle every vehicle with precision, speed, and integrity.",
    "services.tab_all": "All Services",
    "services.tab_maint": "Oil & Maintenance",
    "services.tab_brakes": "Brakes & Suspension",
    "services.tab_diag": "Diagnostics & Electrical",
    "services.tab_engine": "Engine & Transmission",
    "services.s1_title": "Oil & Filter Services",
    "services.s1_tag": "From $29.95",
    "services.s1_desc": "Keep your engine running at peak efficiency and protect against extreme Las Vegas heat with regular oil and filter changes.",
    "services.s2_title": "Brake System Repairs",
    "services.s2_tag": "Free Inspection",
    "services.s2_desc": "Your safety is paramount. We deliver premium stopping power with high-grade ceramic pads and precision rotor resurfacing.",
    "services.s3_title": "Advanced Diagnostics",
    "services.s3_tag": "Computer Scan",
    "services.s3_desc": "Eliminate guesswork. We pinpoint sensor faults, check engine light warnings, and complex electrical gremlins accurately.",
    "services.s4_title": "Engine & Transmission",
    "services.s4_tag": "Master Level",
    "services.s4_desc": "Heavy mechanical expertise from Antonio & Lorenzo. From head gasket replacements to full engine swaps and transmission flushes.",
    "services.s5_title": "General Maintenance",
    "services.s5_tag": "30k/60k/90k",
    "services.s5_desc": "Preventative care that extends the life of your vehicle and protects against unexpected breakdowns on the I-15 or desert heat.",
    "services.s6_title": "Suspension & Steering",
    "services.s6_tag": "Smooth Ride",
    "services.s6_desc": "Restore precise handling and comfort. We repair worn struts, ball joints, control arms, and noisy serpentine drive belts.",
    "services.schedule_btn": "Schedule Service",

    // Why Us
    "why.badge": "The Fix It All Advantage",
    "why.title": "Why Las Vegas Drivers Choose Us Over the Dealerships",
    "why.desc": "Dealerships charge exorbitant labor rates and try to sell repairs you don’t need. At Fix It All Auto Repair on Sirius Ave, we prioritize honesty, speed, and real craftsmanship.",
    "why.promise_title": "Our Promise to You",
    "why.promise_tag": "100% Honest • Zero Upsells",
    "why.promise_quote": "\"We treat every car like our own family's vehicle. You get straight talk, clear explanations, and fair pricing every single time.\"",
    "why.p1_title": "Transparent Estimates",
    "why.p1_desc": "No hidden charges or surprise line items. We explain every repair before touching a bolt.",
    "why.p2_title": "Fast Turnaround",
    "why.p2_desc": "Most general repairs and brake jobs are completed same-day to get you back on the road safely.",
    "why.p3_title": "Master Tech Experience",
    "why.p3_desc": "Decades of combined automotive diagnostic and mechanical mastery on all foreign and domestic cars.",
    "why.p4_title": "100% Work Guarantee",
    "why.p4_desc": "Every repair is backed with our satisfaction guarantee. If it's not right, we make it right.",

    // Reviews
    "reviews.badge": "Verified Customer Testimonials",
    "reviews.title": "What Our Customers Say – 5.0 Stars Across Las Vegas",
    "reviews.desc": "See why Las Vegas locals trust Antonio, Lorenzo, and the Fix It All team with their daily drivers, family SUVs, and performance vehicles.",
    "reviews.honesty": "Honesty Rating",
    "reviews.speed": "Same-Day Turnaround",
    "reviews.local": "Vegas Owned",

    // Location
    "loc.badge": "Visit Our Las Vegas Shop",
    "loc.title": "Convenient Westside Location & Hours",
    "loc.desc": "Located right off Valley View Blvd and Sirius Ave, minutes from the Las Vegas Strip, I-15, and Chinatown corridor.",
    "loc.suite": "Look for Suite 107B inside the auto business plaza",
    "loc.directions_btn": "Get Directions (Google Maps)",
    "loc.schedule_title": "Operating Schedule",
    "loc.weekday": "Monday – Friday",
    "loc.sat": "Saturday",
    "loc.sun": "Sunday",
    "loc.open_note": "✨ Open 7 Days a Week for Your Convenience!",
    "loc.dir_title": "Quick Driving Directions:",
    "loc.dir_strip": "• <strong>From Las Vegas Strip:</strong> Head west on Spring Mountain Rd or Desert Inn Rd, turn south onto Valley View Blvd, and take Sirius Ave right into the plaza.",
    "loc.dir_i15": "• <strong>From I-15 Freeway:</strong> Take Exit 39 (Spring Mountain Rd or Sahara Ave), head west to Valley View Blvd, then south to Sirius Ave.",
    "loc.dir_chinatown": "• <strong>From Chinatown LV:</strong> We are just 2 minutes south of Spring Mountain Rd.",

    // Form
    "form.badge": "Fast & Transparent Quotes",
    "form.title": "Request a Free Estimate & Book Service",
    "form.desc": "Tell us about your vehicle and what you need. We will review your request and contact you quickly with an upfront, zero-pressure estimate.",
    "form.lbl_name": "Your Full Name",
    "form.lbl_phone": "Phone Number",
    "form.lbl_email": "Email Address (Optional)",
    "form.lbl_year": "Vehicle Year",
    "form.lbl_make": "Make",
    "form.lbl_model": "Model & Trim",
    "form.lbl_service": "Primary Service Needed",
    "form.lbl_promo": "Promo / Coupon Code (Optional)",
    "form.lbl_date": "Preferred Appointment Date",
    "form.lbl_time": "Preferred Time of Day",
    "form.lbl_notes": "Describe the Issue or Additional Notes",
    "form.notes_ph": "e.g. Squeaking noise when braking at low speeds, check engine light illuminated yesterday...",
    "form.confidential": "Your information is 100% confidential. No spam or pressure ever.",
    "form.submit_btn": "Request Free Estimate",
    "form.promo_active": "PROMO ACTIVE",

    // Form Dropdown Options
    "form.opt_placeholder": "Select a Service",
    "form.opt_oil": "Oil & Filter Services ($29.95 Special)",
    "form.opt_brakes": "Brake System Repairs ($20 OFF)",
    "form.opt_diag": "Diagnostics & Check Engine Light (FREE Scan)",
    "form.opt_engine": "Engine & Transmission Repair",
    "form.opt_maint": "General Maintenance & 30k/60k/90k",
    "form.opt_susp": "Suspension, Steering & Struts",
    "form.opt_other": "Other Repairs / Unsure (Describe below)",
    "form.time_morning": "Morning (8:00 AM – 11:00 AM)",
    "form.time_midday": "Mid-Day (11:00 AM – 2:00 PM)",
    "form.time_afternoon": "Afternoon (2:00 PM – 5:30 PM)",
    "form.time_any": "First Available Slot",

    // Modal Confirmation
    "modal.title": "Estimate Request Received!",
    "modal.ref": "Reference:",
    "modal.desc": "Thank you! Master Technicians Antonio & Lorenzo have received your vehicle details and will review them promptly.",
    "modal.response_time": "We typically respond within 15–30 minutes during shop hours (Daily until 6 PM).",
    "modal.call_confirm": "Call to Confirm Now",
    "modal.get_directions": "Get Directions",

    // About Us Page Details
    "about.meet_title": "Meet Antonio (Toni) & Lorenzo",
    "about.meet_desc": "Two master mechanics with over 40+ years of combined hands-on experience under the hood. When you bring your car to Fix It All, the owners work on your vehicle personally.",
    "about.call_techs": "Call Master Techs Directly",
    "about.req_estimate": "Request Estimate",
    "about.toni_role": "Lead Diagnostic Specialist & Co-Owner",
    "about.toni_bio": "Toni has diagnosed and resolved thousands of complex mechanical and electrical engine faults across Las Vegas. Known for his straight talk and deep diagnostic precision, he never recommends a replacement part unless it is genuinely needed.",
    "about.toni_spec1": "Specialty: Computerized OBD-II diagnostics & electrical systems",
    "about.toni_spec2": "Specialty: Engine rebuilds, head gaskets & timing belts",
    "about.toni_bilingual": "Bilingual: Fluent in English and Spanish",
    "about.lorenzo_role": "Heavy Line Mechanical Specialist & Co-Owner",
    "about.lorenzo_bio": "Lorenzo is a master of vehicle drivetrains, transmission rebuilds, and heavy chassis suspension. His focus on craftsmanship ensures that your vehicle drives as smooth, responsive, and secure as the day it rolled off the factory floor.",
    "about.lorenzo_spec1": "Specialty: Transmission servicing, fluid flushes & clutch repairs",
    "about.lorenzo_spec2": "Specialty: Precision brake systems, rotors, calipers & ABS",
    "about.lorenzo_spec3": "Specialty: Struts, shocks, control arms & front-end steering",
    "about.story_tag": "Our Story & Mission",
    "about.story_title": "Restoring Honesty and Fair Pricing to Auto Repair in Las Vegas",
    "about.story_p1": "After years of watching Las Vegas drivers get overcharged by big-box dealership service departments and chain repair franchises, Antonio and Lorenzo opened Fix It All Auto Repair at 3100 W Sirius Ave.",
    "about.story_p2": "Our pledge is simple: treat every car like our own family's vehicle. That means clear upfront estimates, zero high-pressure sales pitches, and 100% honest explanations before any work begins.",
    "about.quote_text": "\"We treat every customer like family. When you come to Sirius Ave, you get straight answers, fair prices, and our personal guarantee on every repair.\"",
    "about.quote_author": "— Antonio (Toni) & Lorenzo",

    // Services Catalog Detailed Features & Times
    "services.s1_f1": "Synthetic blend & full synthetic options",
    "services.s1_f2": "OEM quality oil filter replacement",
    "services.s1_f3": "Essential fluid top-offs (coolant, washer, brake)",
    "services.s1_f4": "Complimentary 25-point safety inspection",
    "services.s1_time": "⏱️ Avg. 30–45 mins",
    "services.s2_f1": "Ceramic & semi-metallic brake pad install",
    "services.s2_f2": "Rotor resurfacing & full disc replacement",
    "services.s2_f3": "Brake caliper repair & hydraulic line check",
    "services.s2_f4": "High-temp brake fluid bleed & flush",
    "services.s2_time": "⏱️ Same-day service",
    "services.s3_f1": "OBD-II computerized error code readout",
    "services.s3_f2": "O2, MAF, knock & camshaft sensor testing",
    "services.s3_f3": "Electrical wiring & battery/alternator health",
    "services.s3_f4": "NV state smog & emissions pre-testing",
    "services.s3_time": "⏱️ Fast 15-min scan",
    "services.s4_f1": "Timing belt & water pump replacement",
    "services.s4_f2": "Cylinder head gasket & valve cover repairs",
    "services.s4_f3": "Automatic & manual transmission servicing",
    "services.s4_f4": "Full engine rebuilds & replacement swaps",
    "services.s4_time": "🛡️ 100% Work Guaranteed",
    "services.s5_f1": "30k, 60k, 90k, and 120k factory intervals",
    "services.s5_f2": "Spark plug, ignition coil & wire replacements",
    "services.s5_f3": "Engine coolant radiator flush & thermostat",
    "services.s5_f4": "Battery load testing & terminal service",
    "services.s5_time": "📋 Comprehensive Report",
    "services.s6_f1": "Shocks, struts & coil spring replacements",
    "services.s6_f2": "Tie rods, ball joints & sway bar links",
    "services.s6_f3": "Power steering pump & rack-and-pinion",
    "services.s6_f4": "Serpentine belts, AC belts & radiator hoses",
    "services.s6_time": "🚗 Ride Comfort Check",

    // Dealership Comparison
    "why.dealer_title": "Typical Las Vegas Dealerships",
    "why.d1": "$180 – $240+ hourly labor rates",
    "why.d2": "Aggressive commissioned service advisor upsells",
    "why.d3": "Days-long turnaround times for basic repairs",
    "why.d4": "Impersonal corporate customer service",
    "why.fia_title": "Fix It All Auto Repair (Sirius Ave)",
    "why.smart_choice": "THE SMART CHOICE",
    "why.f1": "Fair, upfront, transparent pricing on all labor & parts",
    "why.f2": "100% honest advice from Master Techs Antonio & Lorenzo",
    "why.f3": "Same-day turnaround on most brake and maintenance jobs",
    "why.f4": "100% work guaranteed with genuine personal care",

    // Specials Page Additions
    "specials.print_btn": "Print or Save Coupons",
    "specials.book_promo": "Book with Promo",
    "specials.c4_tag": "Community Honor",
    "specials.c4_title": "10% Off Military & Seniors",
    "specials.c4_desc": "Active military, veterans, first responders, and seniors (65+) save 10% on all mechanical labor up to $100 value.",
    "specials.c4_btn": "Claim 10% Discount",
    "specials.terms_title": "Promotional Terms & Conditions:",
    "specials.terms_desc": "Coupons must be presented at time of estimate or vehicle check-in (show on mobile phone screen or print). Cannot be combined with other offers or applied to past invoices. Oil change special covers up to 5 quarts of synthetic blend oil; cartridge filters, specialty European oils, and additional quarts extra. Valid only at Fix It All Auto Repair, 3100 W Sirius Ave Ste 107B, Las Vegas, NV 89102.",

    // Reviews Page Additions
    "reviews.tab_all": "All Reviews (114+)",
    "reviews.tab_brakes": "Brakes & Rotors",
    "reviews.tab_oil": "Oil & Maintenance",
    "reviews.tab_diag": "Diagnostics & Check Engine",
    "reviews.tab_spanish": "Hablamos Español",
    "reviews.google_rating": "5.0 on Google (114+ Reviews)",
    "reviews.yelp_rating": "5.0 on Yelp Top Rated",
    "reviews.cta_title": "Are You a Recent Customer?",
    "reviews.cta_desc": "Your honest feedback means everything to our independent shop. Please take a moment to share your experience!",
    "reviews.btn_google": "Review on Google",
    "reviews.btn_yelp": "Review on Yelp",
    "reviews.r1_quote": "\"Antonio and Lorenzo are genuine lifesavers. My front brakes were grinding terribly. They gave me a fair quote upfront, walked me through the rotor condition, and completed the job in under 90 minutes. Zero dealership games.\"",
    "reviews.r2_quote": "\"Toni scanned my check engine light in 15 minutes. The dealership wanted $1,200 for unnecessary parts! Toni pinpointed a simple faulty O2 sensor, replaced it same day, and saved me nearly a thousand dollars. Best mechanic in Vegas!\"",
    "reviews.r3_quote": "\"Took my Ford truck in for the $29.95 synthetic blend oil special. They performed a comprehensive 25-point inspection, checked tire pressures, and topped all fluids. Super fast and courteous. Won't go anywhere else.\"",
    "reviews.r4_quote": "\"Excelente servicio en español. Toni y Lorenzo me explicaron todo detalladamente antes de tocar mi transmisión. Precios sumamente justos, trabajo rápido y honesto. Se los recomiendo a toda la comunidad latina en Las Vegas.\"",
    "reviews.r5_quote": "\"Honesty is rare in the car repair industry, especially in Las Vegas. These guys are 100% genuine master mechanics. They showed me the old parts and explained exactly what failed and why. Highly recommended.\"",
    "reviews.r6_quote": "\"Fast, clean, professional. As a woman, taking your car to a mechanic can feel stressful, but Antonio made me feel completely comfortable and respected. Car runs like brand new. Thank you Fix It All!\"",

    // FAQ
    "faq.badge": "Clear Answers",
    "faq.title": "Frequently Asked Questions",
    "faq.desc": "Got questions? We believe in 100% transparency before we ever turn a wrench.",
    "faq.q1": "Do you provide free estimates and computer code scans?",
    "faq.a1": "Yes! We provide free preliminary visual inspections, upfront cost estimates, and complimentary OBD-II check engine light code scans so you understand exactly what your vehicle needs without any pressure.",
    "faq.q2": "What makes and models do you service?",
    "faq.a2": "We service all domestic, Asian, and European makes and models — including Ford, Chevrolet, Toyota, Honda, Nissan, Hyundai, Kia, BMW, Mercedes-Benz, Audi, Volkswagen, Subaru, and Jeep.",
    "faq.q3": "How fast can you complete an oil change or brake job?",
    "faq.a3": "Our synthetic blend and full synthetic oil changes typically take between 30 to 45 minutes. Standard brake pad and rotor replacements are usually completed the same day within 1 to 2 hours.",
    "faq.q4": "Do you accept walk-ins or do I need an appointment?",
    "faq.a4": "Walk-ins are always welcome! However, scheduling online or giving us a quick call at (702) 326-7375 guarantees immediate bay priority and minimal wait time.",
    "faq.q5": "What warranty do you offer on parts and labor?",
    "faq.a5": "We stand 100% behind all completed work. We use premium OEM and high-grade aftermarket parts that carry full manufacturer warranties alongside our professional labor guarantee.",
    "faq.q6": "Do you speak Spanish? / ¿Hablan español?",
    "faq.a6": "¡Sí, con mucho gusto! Our team speaks English and Spanish fluently to explain any car issue and estimate clearly.",

    // Mobile Bottom Bar
    "bar.call": "Call (702) 326-7375",
    "bar.estimate": "Free Estimate",

    // Live Hours Strings
    "hours.open_now": "Open Now",
    "hours.closes_at": "• Closes at",
    "hours.closed_now": "Closed Now",
    "hours.opens": "• Opens"
  },

  es: {
    // Navigation & Breadcrumbs
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.specials": "Especiales y Cupones",
    "nav.about": "Sobre Nosotros",
    "nav.why_us": "¿Por Qué Nosotros?",
    "nav.reviews": "Reseñas 5.0★",
    "nav.contact": "Contacto y Citas",
    "nav.location": "Ubicación y Horario",
    "nav.faq": "Preguntas Frecuentes",
    "nav.estimate": "Presupuesto Gratis",
    "nav.call_now": "Llamar: (702) 326-7375",
    "nav.guarantee": "100% Trabajo Garantizado",
    "nav.spanish_badge": "¡Hablamos Español!",
    "nav.language": "Idioma / Language",

    "crumb.home": "Inicio",
    "crumb.services": "Servicios",
    "crumb.specials": "Especiales y Ofertas",
    "crumb.about": "Sobre Nosotros",
    "crumb.reviews": "Reseñas 5.0★",
    "crumb.contact": "Contacto y Citas",

    // Subpage Hero Headers
    "services.page_title": "Excelencia en Reparación Automotriz en Las Vegas",
    "services.page_desc": "Los maestros mecánicos Antonio y Lorenzo atienden todas las marcas y modelos con precios transparentes y 100% de trabajo garantizado.",
    "specials.page_title": "Especiales de Reparación y Cupones con Descuento en Las Vegas",
    "specials.page_desc": "Muestre los cupones en su teléfono o reclame en línea para asegurar tarifas exclusivas en cambios de aceite, frenos y diagnóstico computarizado.",
    "about.page_title": "Sobre Fix It All Auto Repair – Conozca a Antonio y Lorenzo",
    "about.page_desc": "Mecánicos honestos, rápidos e independientes que atienden a los conductores de Las Vegas sin sobreprecios de concesionarios y con trato familiar.",
    "reviews.page_title": "Reseñas y Testimonios de Clientes Verificados 5.0★",
    "reviews.page_desc": "Más de 114 conductores reales en Las Vegas confían en Fix It All Auto Repair por honestidad, rapidez y verdadera maestría mecánica.",
    "contact.page_title": "Contáctenos y Solicite su Presupuesto Gratis",
    "contact.page_desc": "Taller conveniente en Westside ubicado en 3100 W Sirius Ave Ste 107B. Abiertos los 7 días de la semana.",

    // Hero Section
    "hero.rating": "5.0 ★ Calificación Google",
    "hero.reviews": "114+ Reseñas Verificadas",
    "hero.headline_html": 'El Taller Mecánico de Confianza en Las Vegas – <span class="text-gradient-red">Reparaciones de Calidad</span> Garantizadas',
    "hero.subheadline": "Reparamos y damos servicio a todas las marcas y modelos. Rapidez, precios claros y trabajo 100% garantizado por los maestros mecánicos certificados Antonio y Lorenzo.",
    "hero.call_btn": "Llamar al (702) 326-7375",
    "hero.estimate_btn": "Solicitar Presupuesto Gratis",
    "hero.pill_guarantee": "100% Garantizado",
    "hero.pill_guarantee_sub": "Repuestos y Mano de Obra",
    "hero.pill_fast": "Servicio Rápido",
    "hero.pill_fast_sub": "Entrega el Mismo Día",
    "hero.pill_free": "Presupuesto Gratis",
    "hero.pill_free_sub": "Sin Compromiso ni Presión",
    "hero.pass_title": "PASE RÁPIDO AL TALLER",
    "hero.deal_tag": "OFERTA DESTACADA",
    "hero.deal_title": "Especial de Aceite Semisintético",
    "hero.deal_free": "+ Revisión de Seguridad Gratis",
    "hero.deal_desc": "Hasta 5 cuartos de aceite semisintético, filtro nuevo y revisión completa de frenos.",
    "hero.deal_claim": "Reclamar Oferta de $29.95",
    "hero.makes": "Todas las Marcas y Modelos",
    "hero.makes_sub": "Nacionales e Importados",
    "hero.mechanics": "Maestros Mecánicos Líderes",
    "hero.diag": "Escaneo de Diagnóstico",
    "hero.diag_sub": "Tecnología Avanzada",
    "hero.advice": "¿Necesita asesoría o reparación urgente?",
    "hero.call_tech": "Llamar al Mecánico: (702) 326-7375",

    // Mobile Action Hub
    "hub.call": "Llamar",
    "hub.call_sub": "(702) 326-7375",
    "hub.directions": "Cómo Llegar",
    "hub.directions_sub": "Sirius y Valley View",
    "hub.deal": "Oferta $29.95",
    "hub.deal_sub": "Aceite + Revisión",
    "hub.estimate": "Presupuesto",
    "hub.estimate_sub": "Rápido y Gratis",

    // Specials & Coupons
    "specials.badge": "Especiales por Tiempo Limitado en Las Vegas",
    "specials.title": "Ofertas Especiales y Cupones de Reparación",
    "specials.desc": "Muestre estos cupones en su teléfono o haga clic en \"Reclamar Cupón\" para asegurar tarifas promocionales exclusivas para su automóvil.",
    "specials.popular": "MÁS POPULAR EN LAS VEGAS",
    "specials.featured": "Promoción Destacada",
    "specials.coupon_code_lbl": "Código de Cupón:",
    "specials.deal_headline_html": 'Cambio de Aceite Semisintético y Frenos – Sólo <span class="text-red-500 font-black">$29.95</span>',
    "specials.deal_desc_html": 'Incluye hasta 5 cuartos de aceite semisintético premium, filtro nuevo OEM, lubricación de chasis, más una <strong class="text-emerald-400 font-semibold">Inspección Integral de Seguridad y Frenos de 25 Puntos GRATIS</strong>.',
    "specials.feat1": "Hasta 5 Cuartos de Aceite",
    "specials.feat2": "Filtro de Aceite Nuevo",
    "specials.feat3": "Revisión de Frenos Gratis",
    "specials.reg_val": "Precio regular: $59.95 (Ahorre $30)",
    "specials.claim_btn": "Reclamar Oferta Especial",
    "specials.c1_tag": "Especial de Frenos",
    "specials.c1_title": "$20 OFF en Servicio de Frenos",
    "specials.c1_desc": "Ahorre $20 en cambio de pastillas y rotores de freno delanteros o traseros. Incluye inspección de piezas.",
    "specials.c1_btn": "Reclamar Cupón de $20",
    "specials.c2_tag": "Diagnóstico",
    "specials.c2_title": "Escaneo de Motor GRATIS",
    "specials.c2_desc": "¿Luz de Check Engine encendida? Obtenga lectura computarizada OBD-II y evaluación preliminar sin costo.",
    "specials.c2_btn": "Reclamar Escaneo Gratis",
    "specials.c3_tag": "Reparaciones Mayores",
    "specials.c3_title": "$50 OFF en Reparaciones Mayores",
    "specials.c3_desc": "Reciba $50 de descuento en cualquier reparación de transmisión, motor o suspensión superior a $500.",
    "specials.c3_btn": "Reclamar Cupón de $50",

    // Services
    "services.badge": "Excelencia Automotriz Integral",
    "services.title": "Servicios Mecánicos Expertos en Las Vegas",
    "services.desc": "Desde mantenimiento preventivo de rutina hasta reconstrucciones de motor, cuidamos su vehículo con máxima precisión, rapidez y honestidad.",
    "services.tab_all": "Todos los Servicios",
    "services.tab_maint": "Aceite y Mantenimiento",
    "services.tab_brakes": "Frenos y Suspensión",
    "services.tab_diag": "Diagnóstico y Eléctrico",
    "services.tab_engine": "Motor y Transmisión",
    "services.s1_title": "Servicio de Aceite y Filtros",
    "services.s1_tag": "Desde $29.95",
    "services.s1_desc": "Mantenga su motor al máximo rendimiento y protegido contra el calor extremo del desierto con cambios regulares de aceite.",
    "services.s2_title": "Reparación del Sistema de Frenos",
    "services.s2_tag": "Revisión Gratis",
    "services.s2_desc": "Su seguridad es primero. Máxima potencia de frenado con pastillas cerámicas de alta durabilidad y rectificado de rotores.",
    "services.s3_title": "Diagnóstico Computarizado Avanzado",
    "services.s3_tag": "Escaneo OBD-II",
    "services.s3_desc": "Sin adivinanzas. Localizamos con exactitud fallas de sensores, códigos de Check Engine y problemas eléctricos complejos.",
    "services.s4_title": "Reparación de Motor y Transmisión",
    "services.s4_tag": "Nivel Maestro",
    "services.s4_desc": "Maestría mecánica pesada de Antonio y Lorenzo: empaques de culata, cambios de bandas de tiempo y servicio de transmisión.",
    "services.s5_title": "Mantenimiento General Preventivo",
    "services.s5_tag": "30k/60k/90k",
    "services.s5_desc": "Cuidado preventivo que alarga la vida útil de su auto y previene costosas fallas en la carretera I-15.",
    "services.s6_title": "Suspensión y Dirección Hidráulica",
    "services.s6_tag": "Manejo Suave",
    "services.s6_desc": "Recupere la estabilidad y suavidad. Reparamos amortiguadores, rótulas, terminales de dirección y bandas chirriantes.",
    "services.schedule_btn": "Agendar Servicio",

    // Why Us
    "why.badge": "La Ventaja de Fix It All",
    "why.title": "¿Por Qué los Conductores de Las Vegas nos Eligen Sobre los Concesionarios?",
    "why.desc": "Los concesionarios cobran tarifas exageradas y buscan vender reparaciones que no necesita. En Fix It All Auto Repair en Sirius Ave, priorizamos la honestidad, rapidez y trato directo.",
    "why.promise_title": "Nuestra Promesa",
    "why.promise_tag": "100% Honestos • Sin Cobros Ocultos",
    "why.promise_quote": "\"Tratamos cada auto como si fuera el de nuestra propia familia. Recibirá explicaciones claras, honestidad total y precios justos siempre.\"",
    "why.p1_title": "Presupuestos Transparentes",
    "why.p1_desc": "Sin cargos sorpresa. Le explicamos cada detalle antes de comenzar cualquier trabajo.",
    "why.p2_title": "Entrega Rápida",
    "why.p2_desc": "La mayoría de servicios y frenos se terminan el mismo día para que vuelva a manejar con tranquilidad.",
    "why.p3_title": "Maestros Mecánicos Certificados",
    "why.p3_desc": "Años de experiencia resolviendo problemas mecánicos y eléctricos en autos americanos e importados.",
    "why.p4_title": "100% Garantía de Trabajo",
    "why.p4_desc": "Respaldamos cada trabajo con garantía total. Si algo no está bien, lo solucionamos de inmediato.",

    // Reviews
    "reviews.badge": "Opiniones de Clientes Verificados",
    "reviews.title": "Lo Que Dicen Nuestros Clientes – 5.0 Estrellas en Las Vegas",
    "reviews.desc": "Vea por qué las familias de Las Vegas confían plenamente en Antonio (Toni) y Lorenzo para mantener sus automóviles seguros.",
    "reviews.honesty": "Nivel de Honestidad",
    "reviews.speed": "Entrega el Mismo Día",
    "reviews.local": "Taller Local en Las Vegas",

    // Location
    "loc.badge": "Visite Nuestro Taller en Las Vegas",
    "loc.title": "Ubicación Conveniente y Horarios en Westside",
    "loc.desc": "Ubicados a minutos de Valley View Blvd, Sirius Ave, el Strip de Las Vegas, la autopista I-15 y Chinatown.",
    "loc.suite": "Busque la Suite 107B dentro del parque automotriz comercial",
    "loc.directions_btn": "Cómo Llegar (Google Maps)",
    "loc.schedule_title": "Horario de Atención",
    "loc.weekday": "Lunes a Viernes",
    "loc.sat": "Sábado",
    "loc.sun": "Domingo",
    "loc.open_note": "✨ ¡Abiertos los 7 Días de la Semana para su Comodidad!",
    "loc.dir_title": "Cómo Llegar al Taller:",
    "loc.dir_strip": "• <strong>Desde Las Vegas Strip:</strong> Diríjase al oeste por Spring Mountain Rd o Desert Inn Rd, doble al sur por Valley View Blvd, y entre por Sirius Ave a la plaza comercial.",
    "loc.dir_i15": "• <strong>Desde la Autopista I-15:</strong> Tome la Salida 39 (Spring Mountain Rd o Sahara Ave), continúe al oeste hasta Valley View Blvd y doble al sur hacia Sirius Ave.",
    "loc.dir_chinatown": "• <strong>Desde Chinatown LV:</strong> Estamos ubicados a sólo 2 minutos al sur de Spring Mountain Rd.",

    // Form
    "form.badge": "Presupuestos Rápidos y Claros",
    "form.title": "Solicitar Presupuesto Gratis y Cita",
    "form.desc": "Indíquenos los datos de su vehículo. Revisaremos su solicitud y le contactaremos de inmediato con un presupuesto claro y sin compromiso.",
    "form.lbl_name": "Nombre Completo",
    "form.lbl_phone": "Número de Teléfono",
    "form.lbl_email": "Correo Electrónico (Opcional)",
    "form.lbl_year": "Año del Auto",
    "form.lbl_make": "Marca",
    "form.lbl_model": "Modelo",
    "form.lbl_service": "Servicio Principal Necesario",
    "form.lbl_promo": "Código de Cupón (Opcional)",
    "form.lbl_date": "Fecha Preferida de Cita",
    "form.lbl_time": "Horario Preferido",
    "form.lbl_notes": "Describa el Problema o Síntomas",
    "form.notes_ph": "ej. Ruido al frenar, luz de check engine encendida, aire acondicionado no enfría...",
    "form.confidential": "Su información es 100% confidencial. Jamás enviamos spam ni presionamos.",
    "form.submit_btn": "Solicitar Presupuesto Gratis",
    "form.promo_active": "CUPÓN APLICADO",

    // Form Dropdown Options
    "form.opt_placeholder": "Seleccione un Servicio",
    "form.opt_oil": "Cambio de Aceite y Filtro (Especial $29.95)",
    "form.opt_brakes": "Reparación del Sistema de Frenos ($20 OFF)",
    "form.opt_diag": "Diagnóstico Computarizado y Check Engine (Escaneo Gratis)",
    "form.opt_engine": "Reparación de Motor y Transmisión",
    "form.opt_maint": "Mantenimiento General y 30k/60k/90k",
    "form.opt_susp": "Suspensión, Dirección y Amortiguadores",
    "form.opt_other": "Otras Reparaciones / No estoy seguro (describir abajo)",
    "form.time_morning": "Mañana (8:00 AM – 11:00 AM)",
    "form.time_midday": "Mediodía (11:00 AM – 2:00 PM)",
    "form.time_afternoon": "Tarde (2:00 PM – 5:30 PM)",
    "form.time_any": "Primer Horario Disponible",

    // Modal Confirmation
    "modal.title": "¡Solicitud de Presupuesto Recibida!",
    "modal.ref": "Referencia:",
    "modal.desc": "¡Muchas gracias! Los maestros mecánicos Antonio y Lorenzo han recibido los datos de su vehículo y los revisarán a la brevedad.",
    "modal.response_time": "Normalmente respondemos en 15–30 minutos durante horas laborales (Diariamente hasta las 6 PM).",
    "modal.call_confirm": "Llamar para Confirmar Ahora",
    "modal.get_directions": "Ver Direcciones en Google Maps",

    // About Us Page Details
    "about.meet_title": "Conozca a Antonio (Toni) y Lorenzo",
    "about.meet_desc": "Dos maestros mecánicos con más de 40 años de experiencia combinada bajo el capó. Cuando trae su vehículo a Fix It All, los propios dueños trabajan directamente en su auto.",
    "about.call_techs": "Llamar a los Mecánicos Directamente",
    "about.req_estimate": "Solicitar Presupuesto",
    "about.toni_role": "Especialista en Diagnóstico y Co-Propietario",
    "about.toni_bio": "Toni ha diagnosticado y resuelto miles de fallas mecánicas y eléctricas complejas en Las Vegas. Reconocido por su honestidad y precisión, jamás recomienda cambiar una pieza a menos que sea verdaderamente necesario.",
    "about.toni_spec1": "Especialidad: Diagnóstico computarizado OBD-II y sistemas eléctricos",
    "about.toni_spec2": "Especialidad: Reparación de motores, empaques de culata y bandas de tiempo",
    "about.toni_bilingual": "Bilingual: Fluido en inglés y español",
    "about.lorenzo_role": "Especialista en Mecánica Pesada y Co-Propietario",
    "about.lorenzo_bio": "Lorenzo es un experto en trenes motrices, transmisiones y chasis. Su dedicación a la mano de obra de calidad garantiza que su automóvil ruede tan suave, seguro y firme como el día en que salió de fábrica.",
    "about.lorenzo_spec1": "Especialidad: Servicio de transmisión, cambios de fluidos y embragues",
    "about.lorenzo_spec2": "Especialidad: Sistemas de frenos de precisión, rotores, calipers y ABS",
    "about.lorenzo_spec3": "Especialidad: Amortiguadores, brazos de control y suspensión delantera",
    "about.story_tag": "Nuestra Historia y Misión",
    "about.story_title": "Restaurando la Honestidad y Precios Justos a la Reparación Automotriz en Las Vegas",
    "about.story_p1": "Tras años de ver cómo a los conductores de Las Vegas se les cobraba de más en concesionarios y cadenas de talleres, Antonio y Lorenzo abrieron Fix It All Auto Repair en 3100 W Sirius Ave.",
    "about.story_p2": "Nuestra promesa es simple: tratar cada auto como si fuera el de nuestra propia familia. Eso significa presupuestos claros por adelantado, cero tácticas de venta con presión y explicaciones 100% honestas antes de iniciar cualquier trabajo.",
    "about.quote_text": "\"Tratamos a cada cliente como a nuestra familia. Al venir a Sirius Ave, recibe respuestas directas, precios justos y nuestra garantía personal en cada reparación.\"",
    "about.quote_author": "— Antonio (Toni) y Lorenzo",

    // Services Catalog Detailed Features & Times
    "services.s1_f1": "Opciones sintéticas y semisintéticas",
    "services.s1_f2": "Filtro nuevo de calidad OEM",
    "services.s1_f3": "Relleno de fluidos esenciales (refrigerante, frenos, etc.)",
    "services.s1_f4": "Inspección integral de seguridad de 25 puntos GRATIS",
    "services.s1_time": "⏱️ Tiempo prom. 30–45 min",
    "services.s2_f1": "Instalación de pastillas de cerámica y semimetálicas",
    "services.s2_f2": "Rectificación de rotores y discos nuevos",
    "services.s2_f3": "Reparación de calipers y líneas hidráulicas",
    "services.s2_f4": "Purga y cambio de líquido de frenos",
    "services.s2_time": "⏱️ Servicio el mismo día",
    "services.s3_f1": "Lectura computarizada de códigos OBD-II",
    "services.s3_f2": "Pruebas de sensores O2, MAF, detonación y levas",
    "services.s3_f3": "Revisión eléctrica, batería y alternador",
    "services.s3_f4": "Pre-inspección de emisiones y smog de Nevada",
    "services.s3_time": "⏱️ Escaneo rápido en 15 min",
    "services.s4_f1": "Reemplazo de banda de tiempo y bomba de agua",
    "services.s4_f2": "Empaques de cabeza de motor y tapas de válvulas",
    "services.s4_f3": "Mantenimiento de transmisión automática y estándar",
    "services.s4_f4": "Reconstrucción y cambio completo de motores",
    "services.s4_time": "🛡️ 100% Trabajo Garantizado",
    "services.s5_f1": "Servicios de agencia de 30k, 60k, 90k y 120k millas",
    "services.s5_f2": "Cambio de bujías, bobinas de encendido y cables",
    "services.s5_f3": "Purga de radiador, refrigerante y termostato",
    "services.s5_f4": "Prueba de carga de batería y limpieza de terminales",
    "services.s5_time": "📋 Reporte Completo de Inspección",
    "services.s6_f1": "Amortiguadores, struts y resortes nuevos",
    "services.s6_f2": "Terminales de dirección, rótulas y barras estabilizadoras",
    "services.s6_f3": "Bomba de dirección hidráulica y cremallera",
    "services.s6_f4": "Bandas serpentinas, bandas de AC y mangueras",
    "services.s6_time": "🚗 Revisión de Confort y Estabilidad",

    // Dealership Comparison
    "why.dealer_title": "Concesionarios Típicos en Las Vegas",
    "why.d1": "Tarifas de mano de obra de $180 – $240+ por hora",
    "why.d2": "Ventas agresivas y comisiones por servicios innecesarios",
    "why.d3": "Días de espera para reparaciones sencillas",
    "why.d4": "Atención impersonal corporativa",
    "why.fia_title": "Fix It All Auto Repair (Sirius Ave)",
    "why.smart_choice": "LA ELECCIÓN INTELIGENTE",
    "why.f1": "Precios justos, claros y transparentes en mano de obra y repuestos",
    "why.f2": "Asesoría 100% honesta de los maestros Antonio y Lorenzo",
    "why.f3": "Entrega el mismo día en la mayoría de servicios de frenos y mantenimiento",
    "why.f4": "100% trabajo garantizado con auténtico trato familiar",

    // Specials Page Additions
    "specials.print_btn": "Imprimir o Guardar Cupones",
    "specials.book_promo": "Agendar con Cupón",
    "specials.c4_tag": "Honor a la Comunidad",
    "specials.c4_title": "10% Descuento Militares y Adultos Mayores",
    "specials.c4_desc": "Militares activos, veteranos, rescatistas y personas mayores (65+) ahorran 10% en mano de obra mecánica hasta $100 de valor.",
    "specials.c4_btn": "Reclamar 10% Descuento",
    "specials.terms_title": "Términos y Condiciones de la Promoción:",
    "specials.terms_desc": "Los cupones deben presentarse al momento de la cotización o recepción del vehículo (en la pantalla del teléfono o impresos). No acumulable con otras promociones ni facturas pasadas. El especial de aceite cubre hasta 5 cuartos de aceite semisintético; filtros especiales de cartucho, aceites europeos y cuartos adicionales tienen costo extra. Válido únicamente en Fix It All Auto Repair, 3100 W Sirius Ave Ste 107B, Las Vegas, NV 89102.",

    // Reviews Page Additions
    "reviews.tab_all": "Todas las Reseñas (114+)",
    "reviews.tab_brakes": "Frenos y Rotores",
    "reviews.tab_oil": "Aceite y Mantenimiento",
    "reviews.tab_diag": "Diagnóstico y Check Engine",
    "reviews.tab_spanish": "Hablamos Español",
    "reviews.google_rating": "5.0 en Google (114+ Reseñas)",
    "reviews.yelp_rating": "5.0 en Yelp Más Valorado",
    "reviews.cta_title": "¿Ha Sido Cliente Reciente?",
    "reviews.cta_desc": "¡Su opinión honesta es fundamental para nuestro taller independiente! Le agradecemos compartir su experiencia.",
    "reviews.btn_google": "Dejar Reseña en Google",
    "reviews.btn_yelp": "Dejar Reseña en Yelp",
    "reviews.r1_quote": "\"Antonio y Lorenzo son unos salvavidas. Mis frenos delanteros rechinaban horrible. Me dieron un precio justo desde el inicio, me mostraron el estado de los rotores y terminaron en menos de 90 minutos. Cero juegos de agencia.\"",
    "reviews.r2_quote": "\"Toni escaneó la luz de check engine en 15 minutos. ¡La agencia quería cobrarme $1,200 por piezas que no necesitaba! Toni encontró un sensor O2 defectuoso, lo cambió el mismo día y me ahorró casi mil dólares. El mejor taller de Las Vegas.\"",
    "reviews.r3_quote": "\"Llevé mi camioneta Ford para el especial de cambio de aceite de $29.95. Hicieron una inspección completa de 25 puntos, revisaron la presión de llantas y rellenaron todos los líquidos. Muy rápidos y amables. No voy a ningún otro lado.\"",
    "reviews.r4_quote": "\"Excelente servicio en español. Toni y Lorenzo me explicaron todo detalladamente antes de tocar mi transmisión. Precios sumamente justos, trabajo rápido y honesto. Se los recomiendo a toda la comunidad latina en Las Vegas.\"",
    "reviews.r5_quote": "\"La honestidad es muy escasa en los talleres mecánicos, especialmente en Las Vegas. Estos muchachos son mecánicos 100% auténticos y confiables. Me mostraron las piezas viejas y me explicaron con claridad. Muy recomendados.\"",
    "reviews.r6_quote": "\"Rápidos, limpios y muy profesionales. Como mujer, ir al mecánico a veces puede dar desconfianza, pero Antonio me hizo sentir muy tranquila y respetada. Mi auto quedó como nuevo. ¡Muchas gracias a Fix It All!\"",

    // FAQ
    "faq.badge": "Respuestas Claras",
    "faq.title": "Preguntas Frecuentes",
    "faq.desc": "¿Tiene preguntas? Creemos en la total transparencia antes de girar una sola tuerca.",
    "faq.q1": "¿Ofrecen presupuestos gratuitos y escaneo de computadora?",
    "faq.a1": "¡Sí! Ofrecemos inspecciones visuales preliminares sin costo, presupuestos transparentes y escaneos computarizados OBD-II de Check Engine gratis para que sepa exactamente qué necesita su auto.",
    "faq.q2": "¿Qué marcas y modelos reparan?",
    "faq.a2": "Reparamos todas las marcas y modelos nacionales, asiáticos y europeos — incluyendo Ford, Chevrolet, Toyota, Honda, Nissan, Hyundai, Kia, BMW, Mercedes-Benz, Audi, Volkswagen, Subaru y Jeep.",
    "faq.q3": "¿Qué tan rápido hacen un cambio de aceite o frenos?",
    "faq.a3": "Nuestros cambios de aceite semisintético o sintético duran entre 30 y 45 minutos. Los cambios de pastillas y discos de frenos se entregan el mismo día, usualmente en 1 a 2 horas.",
    "faq.q4": "¿Aceptan clientes sin cita previa o necesito agendar?",
    "faq.a4": "¡Siempre son bienvenidos sin cita previa! Sin embargo, agendar en línea o llamarnos al (702) 326-7375 le asegura prioridad de bahía y menor tiempo de espera.",
    "faq.q5": "¿Qué garantía ofrecen en piezas y mano de obra?",
    "faq.a5": "Respaldamos al 100% todo trabajo realizado. Usamos repuestos OEM y de alta calidad con garantía completa del fabricante además de nuestra garantía en mano de obra.",
    "faq.q6": "¿Hablan español? / Do you speak Spanish?",
    "faq.a6": "¡Sí, con mucho gusto! Nuestro equipo habla inglés y español con fluidez para explicarle con total claridad cualquier problema y presupuesto de su vehículo.",

    // Mobile Bottom Bar
    "bar.call": "Llamar (702) 326-7375",
    "bar.estimate": "Presupuesto Gratis",

    // Live Hours Strings
    "hours.open_now": "Abierto Ahora",
    "hours.closes_at": "• Cierra a las",
    "hours.closed_now": "Cerrado Ahora",
    "hours.opens": "• Abre"
  }
};

/* ==========================================================================
   1. Language Switcher & Reactive Translation Engine
   ========================================================================== */
function initLanguageToggle() {
  applyLanguage(currentLang);

  // Setup click listeners for all language buttons
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.getAttribute('data-lang');
      if (targetLang && targetLang !== currentLang) {
        applyLanguage(targetLang);
      }
    });
  });

  // Setup click listener for the quick toggle button (globe button)
  const quickToggles = document.querySelectorAll('.js-toggle-lang');
  quickToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const newLang = currentLang === 'en' ? 'es' : 'en';
      applyLanguage(newLang);
    });
  });
}

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('fia_lang', lang);
  document.documentElement.lang = lang;

  const dict = I18N[lang] || I18N.en;

  // 1. Text Content Translations
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // 2. HTML Content Translations (for spans, highlights, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 3. Input Placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });

  // 4. Update Button Active States
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('bg-red-600', 'text-white', 'shadow-sm');
      btn.classList.remove('text-slate-400', 'hover:text-white');
    } else {
      btn.classList.remove('bg-red-600', 'text-white', 'shadow-sm');
      btn.classList.add('text-slate-400', 'hover:text-white');
    }
  });

  // 5. Update Quick Toggle Labels (show other language option)
  document.querySelectorAll('.js-lang-label').forEach(label => {
    label.textContent = lang === 'en' ? 'ES' : 'EN';
  });

  // 6. Refresh Live Operating Hours in selected language
  if (typeof window.updateShopStatus === 'function') {
    window.updateShopStatus();
  }
}

/* ==========================================================================
   2. Live Operating Hours & Shop Status
   ========================================================================== */
function initLiveHours() {
  const statusBadges = document.querySelectorAll('.js-live-status');
  if (!statusBadges.length) return;

  window.updateShopStatus = function() {
    const now = new Date();
    const vegasTimeString = now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    const vegasDate = new Date(vegasTimeString);

    const day = vegasDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat
    const hour = vegasDate.getHours();
    const minute = vegasDate.getMinutes();
    const currentTimeVal = hour + minute / 60;

    let isOpen = false;
    let closesAt = "6:00 PM";
    let nextOpen = currentLang === 'es' ? "Mañana a las 8:00 AM" : "Tomorrow at 8:00 AM";

    if (day === 0) { // Sunday: 9:00 AM - 6:00 PM
      if (currentTimeVal >= 9 && currentTimeVal < 18) {
        isOpen = true;
      }
      nextOpen = currentLang === 'es' ? "Lunes a las 8:00 AM" : "Monday at 8:00 AM";
    } else { // Mon - Sat: 8:00 AM - 6:00 PM
      if (currentTimeVal >= 8 && currentTimeVal < 18) {
        isOpen = true;
      }
      if (day === 6) {
        nextOpen = currentLang === 'es' ? "Domingo a las 9:00 AM" : "Sunday at 9:00 AM";
      }
    }

    const dict = I18N[currentLang] || I18N.en;

    statusBadges.forEach(badge => {
      if (isOpen) {
        badge.innerHTML = `
          <span class="live-indicator mr-2">
            <span class="live-indicator-ping"></span>
            <span class="live-indicator-dot"></span>
          </span>
          <span class="text-emerald-400 font-semibold text-xs tracking-wide uppercase">${dict["hours.open_now"]}</span>
          <span class="text-slate-400 text-xs hidden sm:inline ml-1">${dict["hours.closes_at"]} ${closesAt}</span>
        `;
      } else {
        badge.innerHTML = `
          <span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 mr-2"></span>
          <span class="text-amber-400 font-semibold text-xs tracking-wide uppercase">${dict["hours.closed_now"]}</span>
          <span class="text-slate-400 text-xs hidden sm:inline ml-1">${dict["hours.opens"]} ${nextOpen}</span>
        `;
      }
    });
  };

  window.updateShopStatus();
  setInterval(window.updateShopStatus, 60000);
}

/* ==========================================================================
   3. Mobile Drawer Menu
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(open) {
    if (open) {
      mobileMenu.classList.remove('hidden');
      setTimeout(() => {
        mobileMenu.classList.remove('opacity-0', 'translate-x-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.add('opacity-0', 'translate-x-full');
      setTimeout(() => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
      }, 300);
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  navLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) toggleMenu(false);
  });
}

/* ==========================================================================
   4. Service Grid Filtering
   ========================================================================== */
function initServiceFilters() {
  const tabButtons = document.querySelectorAll('.service-tab');
  const serviceCards = document.querySelectorAll('.service-card');

  if (!tabButtons.length || !serviceCards.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active', 'bg-red-600', 'text-white'));
      btn.classList.add('active', 'bg-red-600', 'text-white');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Coupon Claiming System
   ========================================================================== */
function initCouponClaim() {
  const claimButtons = document.querySelectorAll('.js-claim-coupon');
  const promoInput = document.getElementById('promoCodeInput');
  const serviceSelect = document.getElementById('serviceSelect');
  const promoNotice = document.getElementById('appliedPromoNotice');
  const promoNoticeText = document.getElementById('appliedPromoText');

  claimButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const code = btn.getAttribute('data-code') || 'OIL2995';
      const serviceValue = btn.getAttribute('data-service') || 'Oil & Filter Services';
      const offerTitle = btn.getAttribute('data-title') || '$29.95 Oil Change & Brake Special';

      if (promoInput) {
        promoInput.value = code;
      }

      if (serviceSelect && serviceValue) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].text.includes(serviceValue) || serviceSelect.options[i].value.includes(serviceValue)) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }

      if (promoNotice && promoNoticeText) {
        promoNoticeText.textContent = `Applied Promo: ${offerTitle} (Code: ${code})`;
        promoNotice.classList.remove('hidden');
      }

      const formSection = document.getElementById('appointment-form');
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (promoInput) {
          promoInput.classList.add('ring-2', 'ring-red-500', 'bg-red-950/30');
          setTimeout(() => {
            promoInput.classList.remove('ring-2', 'ring-red-500', 'bg-red-950/30');
          }, 3000);
        }
      } else {
        // Redirect to contact.html with pre-selected query parameters
        window.location.href = `contact.html?promo=${encodeURIComponent(code)}&service=${encodeURIComponent(serviceValue)}&title=${encodeURIComponent(offerTitle)}#appointment-form`;
      }
    });
  });
}

/* ==========================================================================
   6. Review Filters & Social Proof
   ========================================================================== */
function initReviewFilters() {
  const reviewTabs = document.querySelectorAll('.review-tab');
  const reviewCards = document.querySelectorAll('.review-card');

  if (!reviewTabs.length || !reviewCards.length) return;

  reviewTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      reviewTabs.forEach(t => t.classList.remove('bg-red-600', 'text-white'));
      reviewTabs.forEach(t => t.classList.add('bg-slate-800', 'text-slate-300'));
      tab.classList.remove('bg-slate-800', 'text-slate-300');
      tab.classList.add('bg-red-600', 'text-white');

      const filter = tab.getAttribute('data-review-filter');

      reviewCards.forEach(card => {
        const tag = card.getAttribute('data-review-tag') || '';
        if (filter === 'all' || tag.includes(filter)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Appointment / Estimate Request Form & Confirmation Modal
   ========================================================================== */
function initAppointmentForm() {
  const form = document.getElementById('estimateForm');
  const modal = document.getElementById('confirmationModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalConfirmCode = document.getElementById('modalConfirmCode');
  const modalDetails = document.getElementById('modalDetails');
  const submitBtn = document.getElementById('formSubmitBtn') || form.querySelector('button[type="submit"]');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const dict = I18N[currentLang] || I18N.en;
    const originalText = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        ${dict["form.processing"] || "Processing Request..."}
      `;
      submitBtn.disabled = true;
    }

    const formData = new FormData(form);
    const fullName = formData.get('fullName') || formData.get('name') || 'Valued Customer';
    const phone = formData.get('phone') || formData.get('phoneNumber') || '(702) 326-7375';
    const vehicleYear = formData.get('vehicleYear') || formData.get('year') || '';
    const vehicleMake = formData.get('vehicleMake') || formData.get('make') || '';
    const vehicleModel = formData.get('vehicleModel') || formData.get('model') || '';
    const vehicle = `${vehicleYear} ${vehicleMake} ${vehicleModel}`.trim() || 'Vehicle';
    const service = formData.get('service') || 'General Inspection';
    const date = formData.get('preferredDate') || formData.get('date') || (currentLang === 'es' ? 'Lo antes posible' : 'As soon as possible');
    const time = formData.get('preferredTime') || formData.get('time') || (currentLang === 'es' ? 'Primer Horario Disponible' : 'First Available Slot');
    const promo = formData.get('promoCode') || formData.get('promo') || '';

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const confirmCode = `FIA-89102-${randomNum}`;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      if (modalConfirmCode) modalConfirmCode.textContent = confirmCode;
      if (modalDetails) {
        modalDetails.innerHTML = `
          <div class="space-y-2 text-sm text-slate-300">
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Cliente:' : 'Customer:'}</span>
              <span class="font-medium text-white">${fullName}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Teléfono:' : 'Phone:'}</span>
              <span class="font-medium text-white">${phone}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Vehículo:' : 'Vehicle:'}</span>
              <span class="font-medium text-white">${vehicle}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Servicio Solicitado:' : 'Requested Service:'}</span>
              <span class="font-medium text-red-400">${service}</span>
            </div>
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Horario Preferido:' : 'Target Time:'}</span>
              <span class="font-medium text-white">${date} • ${time}</span>
            </div>
            ${promo ? `
            <div class="flex justify-between py-1.5 border-b border-slate-700/60">
              <span class="text-slate-400">${currentLang === 'es' ? 'Cupón Aplicado:' : 'Applied Special:'}</span>
              <span class="font-semibold text-emerald-400">${promo}</span>
            </div>` : ''}
          </div>
        `;
      }

      if (modal) {
        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('active'), 10);
      }

      form.reset();
      const promoNotice = document.getElementById('appliedPromoNotice');
      if (promoNotice) promoNotice.classList.add('hidden');
    }, 800);
  });

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      setTimeout(() => modal.classList.add('hidden'), 300);
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.classList.add('hidden'), 300);
      }
    });
  }
}

/* ==========================================================================
   8. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-btn');
    const answerContent = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    if (!questionBtn || !answerContent) return;

    questionBtn.addEventListener('click', () => {
      const isOpen = !answerContent.classList.contains('hidden');

      faqItems.forEach(otherItem => {
        const otherAnswer = otherItem.querySelector('.faq-answer');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherAnswer && otherAnswer !== answerContent) {
          otherAnswer.classList.add('hidden');
          if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
        }
      });

      if (isOpen) {
        answerContent.classList.add('hidden');
        if (icon) icon.style.transform = 'rotate(0deg)';
      } else {
        answerContent.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* ==========================================================================
   9. Sticky Header Scroll Effect
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shadow-xl', 'bg-slate-950/95');
      header.classList.remove('bg-slate-950/80');
    } else {
      header.classList.remove('shadow-xl', 'bg-slate-950/95');
      header.classList.add('bg-slate-950/80');
    }
  });
}

/* ==========================================================================
   10. Phone Number Formatting Mask
   ========================================================================== */
function initPhoneMasking() {
  const phoneInputs = document.querySelectorAll('input[type="tel"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
  });
}

/* ==========================================================================
   11. Date Picker Helper (Disallow Past Dates)
   ========================================================================== */
function initDatePicker() {
  const dateInput = document.getElementById('preferredDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

/* ==========================================================================
   12. Multi-Page Active Navigation Highlighter
   ========================================================================== */
function initActiveNav() {
  const currentPath = window.location.pathname.toLowerCase();
  const page = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('nav a, #mobileMenu a');
  navLinks.forEach(link => {
    const href = (link.getAttribute('href') || '').toLowerCase().split('#')[0];
    if (!href) return;
    
    const linkPage = href.split('/').pop();
    if ((page === '' || page === 'index.html' || page === 'index') && (linkPage === '' || linkPage === 'index.html' || linkPage === '/')) {
      link.classList.add('active');
    } else if (linkPage && page === linkPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* ==========================================================================
   13. URL Query Parameter Pre-fill for Contact / Estimate Form
   ========================================================================== */
function initQueryParamPrefill() {
  const params = new URLSearchParams(window.location.search);
  const promo = params.get('promo');
  const service = params.get('service');
  const title = params.get('title');

  const promoInput = document.getElementById('promoCodeInput');
  const serviceSelect = document.getElementById('serviceSelect');
  const promoNotice = document.getElementById('appliedPromoNotice');
  const promoNoticeText = document.getElementById('appliedPromoText');

  if (promo && promoInput) {
    promoInput.value = promo;
    promoInput.classList.add('ring-2', 'ring-red-500', 'bg-red-950/30');
  }

  if (service && serviceSelect) {
    for (let i = 0; i < serviceSelect.options.length; i++) {
      const optText = serviceSelect.options[i].text.toLowerCase();
      const optVal = serviceSelect.options[i].value.toLowerCase();
      const sLower = service.toLowerCase();
      if (optText.includes(sLower) || optVal.includes(sLower) || sLower.includes(optVal)) {
        serviceSelect.selectedIndex = i;
        break;
      }
    }
  }

  if (promo && promoNotice && promoNoticeText) {
    promoNoticeText.textContent = `Applied Promo: ${title || promo} (Code: ${promo})`;
    promoNotice.classList.remove('hidden');
  }
}

