import { blogPosts as baseBlogPosts, type BlogPost } from "@/data/blog";

const updatedAt = "2026-04-19";

type RouteLink = {
  href: string;
  label: string;
};

type SupportRoute = {
  eyebrow: string;
  title: string;
  description: string;
  links: RouteLink[];
};

type BlogCategory = BlogPost["category"];

export const commercialSupportPosts: BlogPost[] = [
  {
    slug: "bosphorus-sunset-cruise-vs-dinner-cruise",
    title: "Bosphorus Sunset Cruise vs Dinner Cruise: Which One Fits the Night?",
    metaDescription:
      "Compare the Bosphorus sunset cruise and dinner cruise in Istanbul, when each one works best, and when to switch to the private dinner page instead.",
    excerpt:
      "If you are choosing between a golden-hour cruise and a full evening dinner, the right answer depends on the kind of night you want, not just the headline price.",
    category: "cruise-guide",
    date: updatedAt,
    dateModified: updatedAt,
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200&q=80",
    imageAlt: "Sunset over the Bosphorus with Istanbul skyline and bridge lights starting to appear",
    keywords: [
      "bosphorus sunset cruise vs dinner cruise",
      "istanbul sunset cruise or dinner cruise",
      "sunset cruise istanbul",
      "dinner cruise istanbul",
      "shared vs private bosphorus cruise",
    ],
    author: "captain-ahmet",
    keyTakeaways: [
      "Choose the sunset cruise for golden-hour light, lighter pacing, and a shorter shared route.",
      "Choose the dinner cruise when the evening should revolve around a table, service flow, and a fuller package ladder.",
      "If privacy matters more than the package ladder, the private dinner cruise is the cleaner fit than either shared option.",
    ],
    sections: [
      {
        heading: "The quickest answer",
        answerCapsule:
          "Pick the sunset cruise when the light is the main event. Pick the dinner cruise when the table, service, and evening length matter more.",
        content: `The simplest split is this: open [Bosphorus Sunset Cruise](/cruises/bosphorus-sunset-cruise) when you want a cleaner golden-hour plan, and open [Istanbul Dinner Cruise](/istanbul-dinner-cruise) when you want a longer shared evening with dinner service and a clearer package ladder.

If your group wants the meal to stay private, skip both shared pages and go straight to [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise).`,
      },
      {
        heading: "When the sunset cruise is the better fit",
        content: `The sunset cruise works best when the night should feel light, visual, and easy to fit around the rest of your Istanbul plans. It is the right answer when you care most about bridge light, skyline photos, and a shorter shared route.

It is also the better fit when you want a premium Bosphorus experience without committing to a full dinner service. For many guests, that means the sunset page is the fastest and cleanest booking decision on the site.`,
        list: [
          "You want the best light of the day, not a long dinner program.",
          "You want a shared premium cruise that still feels simple to book.",
          "You need the evening to stay flexible after the boat returns.",
          "You want to compare it with the dinner page before committing to a meal.",
        ],
      },
      {
        heading: "When the dinner cruise is the better fit",
        content: `The dinner cruise wins when the whole night should revolve around the table. That usually means a longer evening, more structured service, hotel pickup support, and a clear reason to stay on board after dark.

If the booking brief is "we want dinner on the Bosphorus," then [Istanbul Dinner Cruise](/istanbul-dinner-cruise) is the right page to open first. It is more complete than the sunset route and more economical than building a private dinner from scratch.`,
        list: [
          "You want a proper dinner first and sightseeing second.",
          "You want a shared evening with a fixed route and package choices.",
          "You are booking for visitors who expect pickup support and a full night out.",
          "You do not need the whole yacht to yourselves.",
        ],
      },
      {
        heading: "Shared dinner or private dinner?",
        content: `This is the part many guests skip. Shared dinner is for travellers who are happy to sit in a public cruise setting and compare package tiers. Private dinner is for guests who want their own table, their own pace, and no strangers on board.

If the dinner is the main event but privacy matters, open [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise) first. If the dinner is simply one part of a wider evening and the shared format is fine, the main dinner page is enough.`,
      },
      {
        heading: "What to do next",
        content: `If the decision is still open, use the service page that matches the booking mood first and the comparison article second. A quick route is usually better than a long debate.

Start with [Bosphorus Sunset Cruise](/cruises/bosphorus-sunset-cruise) for golden-hour plans, [Istanbul Dinner Cruise](/istanbul-dinner-cruise) for shared dinner tickets, and [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise) when the evening needs to stay private.`,
      },
    ],
    faqs: [
      {
        q: "Is the sunset cruise better for couples?",
        a: "Usually yes if the couple wants light, photos, and a shorter shared outing. If they want dinner and a longer evening, the dinner cruise is the better fit.",
      },
      {
        q: "Should I choose private dinner instead of the shared dinner cruise?",
        a: "Choose private dinner when the table needs to stay yours alone, especially for proposals, birthdays, or quieter evenings.",
      },
      {
        q: "Can I book sunset and dinner on the same trip?",
        a: "You can plan them on different nights, but the better choice depends on whether you want the light of sunset or the structure of dinner.",
      },
      {
        q: "I only want to book one cruise. Which option fits better?",
        a: "Choose the sunset cruise if daylight and photos matter most. Choose the dinner cruise if the meal and longer evening format matter more.",
      },
    ],
    relatedTours: [
      "bosphorus-sunset-cruise",
      "bosphorus-dinner-cruise",
      "private-bosphorus-sunset-cruise",
    ],
  },
  {
    slug: "boat-rental-vs-yacht-charter-istanbul",
    title: "Boat Rental vs Yacht Charter in Istanbul: The Right Private Hire Starts Here",
    metaDescription:
      "Learn the difference between boat rental and yacht charter in Istanbul, when to start with vessel choice, and when to move straight to a private charter.",
    excerpt:
      "Some guests need a flexible boat first; others are already shopping for a package. The route to the right booking page is different.",
    category: "yacht-guide",
    date: updatedAt,
    dateModified: updatedAt,
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80",
    imageAlt: "Private yacht cruising on open water with Istanbul coastline in the distance",
    keywords: [
      "boat rental vs yacht charter istanbul",
      "yacht charter istanbul",
      "boat rental istanbul",
      "private boat hire bosphorus",
      "what is the difference between boat rental and yacht charter",
    ],
    author: "captain-ahmet",
    keyTakeaways: [
      "Boat rental is the better start when you want to choose the vessel and route before choosing packages.",
      "Yacht charter is the better start when you already want a private yacht and are comparing ready package levels.",
      "If the brief already includes dinner or a proposal, the dedicated dinner or proposal pages are usually better than a generic hire page.",
    ],
    sections: [
      {
        heading: "The practical difference",
        answerCapsule:
          "Boat rental starts with the vessel and route. Yacht charter starts with a ready private yacht package and then adds the details.",
        content: `The real difference is not just wording. [Boat Rental Istanbul](/boat-rental-istanbul) is for guests who want to start with the boat type, route shape, and outing style. [Yacht Charter Istanbul](/yacht-charter-istanbul) is for guests who already know they want a private yacht and want to compare package levels first.

That distinction matters because the wrong page makes the booking feel heavier than it should. If you start with vessel choice, open the boat rental page. If you start with package comparison, open the yacht charter page.`,
      },
      {
        heading: "When boat rental is the better starting point",
        content: `Boat rental makes sense when the group is still deciding how formal the outing should be. It is useful for lighter private trips, simple Bosphorus sightseeing, and group requests that want flexibility before they settle on dinner or celebration extras.

If the trip is not yet fully defined, boat rental keeps the planning simple. You can choose the right vessel first, then decide whether the day should stay lean or move into a fuller private format.`,
        list: [
          "You want to choose the boat before choosing the package.",
          "You want a smaller or lighter private hire.",
          "You are still deciding whether dinner belongs in the trip.",
          "You want the route to stay flexible until the brief is clearer.",
        ],
      },
      {
        heading: "When yacht charter is the better starting point",
        content: `Yacht charter is the better page when the group already wants a private yacht and the only remaining question is which package level fits the plan. That usually means the guest already expects a more polished onboard setup.

Open [Yacht Charter Istanbul](/yacht-charter-istanbul) when the charter is the main decision and the rest of the plan will be built around it. That is a cleaner route for guests who are comparing package tiers rather than vessel types.`,
        list: [
          "You already want a private yacht, not just a boat.",
          "You are comparing package structure rather than route shape.",
          "You expect the onboard setup to feel more complete.",
          "You want the charter page to be the starting point, not an afterthought.",
        ],
      },
      {
        heading: "Where dinner and proposals fit",
        content: `If dinner is the real brief, open [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise) rather than forcing the request into a generic hire page. If the moment is a proposal, open [Proposal Yacht Rental Istanbul](/proposal-yacht-rental-istanbul) first so the reveal timing stays central.

Generic private hire is useful. But when the occasion already has a clear purpose, the dedicated page usually gets you to the right quote faster.`,
      },
      {
        heading: "The short decision rule",
        content: `If the team is still saying "we need a boat," start with [Boat Rental Istanbul](/boat-rental-istanbul). If they are saying "we need a private yacht package," start with [Yacht Charter Istanbul](/yacht-charter-istanbul).

If they are saying "we need dinner" or "we need a proposal," skip the generic hire page and open the matching service page directly.`,
        table: {
          headers: ["If the brief sounds like this", "Open this page"],
          rows: [
            ["We want to choose the vessel first", "Boat Rental Istanbul"],
            ["We already want a private yacht package", "Yacht Charter Istanbul"],
            ["Dinner is the main event", "Private Bosphorus Dinner Cruise"],
            ["The reveal matters most", "Proposal Yacht Rental Istanbul"],
          ],
        },
      },
    ],
    faqs: [
      {
        q: "Is boat rental cheaper than yacht charter?",
        a: "Usually the rental route is easier and lighter, while yacht charter is for guests already comparing packaged private yacht options.",
      },
      {
        q: "When should I skip boat rental and go straight to yacht charter?",
        a: "Go straight to yacht charter when you already know you want a private yacht and do not need to compare vessels first.",
      },
      {
        q: "What if the request also includes dinner or a proposal?",
        a: "Then the dedicated dinner or proposal pages will usually get you a better answer faster than a generic hire page.",
      },
      {
        q: "Which page is better for a larger group?",
        a: "For a larger private group that already wants a package-led yacht, the charter page is usually the cleaner starting point.",
      },
    ],
    relatedTours: [
      "yacht-charter-in-istanbul",
      "private-bosphorus-dinner-yacht-cruise",
      "corporate-event-bosphorus-cruise",
    ],
  },
  {
    slug: "proposal-yacht-rental-istanbul-planning-guide",
    title: "Proposal Yacht Rental Istanbul: How to Plan the Moment Without Overthinking It",
    metaDescription:
      "A practical guide for proposal yacht planning in Istanbul with privacy, timing, styling, and the right moment to choose dinner or a shorter setup.",
    excerpt:
      "Proposal planning gets easier when the decision is simple: timing, privacy, and the reveal come first, then the extras.",
    category: "yacht-guide",
    date: updatedAt,
    dateModified: updatedAt,
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80",
    imageAlt: "Romantic private yacht deck prepared for a marriage proposal on the Bosphorus at sunset",
    keywords: [
      "proposal yacht rental istanbul",
      "proposal yacht istanbul",
      "bosphorus proposal yacht",
      "how to plan a yacht proposal in istanbul",
      "private proposal yacht istanbul",
    ],
    author: "captain-ahmet",
    keyTakeaways: [
      "Proposal planning works best when privacy, timing, and the reveal are decided before the extras.",
      "A proposal page should lead the booking when the moment matters more than the charter package itself.",
      "Dinner belongs in the plan only when the proposal is meant to unfold inside a longer evening.",
    ],
    sections: [
      {
        heading: "The short answer",
        answerCapsule:
          "Open the proposal page when the reveal is the main task. Open the charter page only when the vessel is the main decision and the moment is still flexible.",
        content: `The right place to start is [Proposal Yacht Rental Istanbul](/proposal-yacht-rental-istanbul). That page exists for couples who want the yacht, timing, and reveal to work together.

If you are still comparing vessel size or package structure, [Yacht Charter Istanbul](/yacht-charter-istanbul) is the better first stop. The proposal page is for the moment; the charter page is for the boat.`,
      },
      {
        heading: "What matters first in a proposal booking",
        content: `A good proposal brief usually comes down to four things: privacy, timing, the reveal point, and whether the setup should stay minimal or become more styled. When those are clear, the quote becomes much easier to shape.

That is why the proposal page should feel like a planning tool, not a generic charter page with the word "proposal" added on top.`,
        list: [
          "Whether the moment needs to stay couple-only.",
          "Whether sunset, bridge lights, or a quieter night slot is the goal.",
          "Whether the reveal should happen early or after a short cruise.",
          "Whether flowers, a photographer, or live music belongs in the plan.",
        ],
      },
      {
        heading: "When to add dinner",
        content: `Add dinner when the proposal should unfold as part of a longer evening rather than a short reveal. In that case, [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise) usually becomes the better next page because the meal, table, and timing can all sit around the proposal.

If the proposal only needs a clean moment and a private setting, do not force dinner into it. Shorter is often better when the reveal is the real priority.`,
      },
      {
        heading: "When the charter page is enough",
        content: `Some couples only need a vessel, a private route, and the right timing to make the moment feel special. In those cases the charter page is enough because it gives the structure without pushing the evening into dinner by default.

That is the useful line to remember: [Proposal Yacht Rental Istanbul](/proposal-yacht-rental-istanbul) for the reveal, [Yacht Charter Istanbul](/yacht-charter-istanbul) for the vessel, and [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise) when dinner belongs in the plan.`,
      },
      {
        heading: "What to send first",
        content: `The first message does not need a full script. It just needs enough detail for the team to place the yacht correctly and avoid back-and-forth.

Tell us the date, preferred timing, whether you want sunset or evening light, what level of styling you want, and whether anyone else will join after the reveal. That gives the proposal team enough information to shape the right route and setup.`,
      },
    ],
    faqs: [
      {
        q: "Is proposal yacht rental always private?",
        a: "Yes. The point of the page is to keep the moment private so the timing and reveal stay under your control.",
      },
      {
        q: "Should I choose dinner or proposal first?",
        a: "Choose proposal first if the reveal is the main task. Choose dinner first only when the meal is the main part of the evening.",
      },
      {
        q: "Can flowers or a photographer be arranged?",
        a: "Yes. Styling, flowers, photography, and other proposal details can be built into the brief.",
      },
      {
        q: "What if I only want the yacht and timing, not a full setup?",
        a: "Then the proposal page can still work, but the charter page may be the cleaner starting point if the setup is deliberately simple.",
      },
    ],
    relatedTours: [
      "private-bosphorus-dinner-yacht-cruise",
      "yacht-charter-in-istanbul",
      "private-bosphorus-sunset-cruise",
    ],
  },
  {
    slug: "corporate-yacht-events-on-the-bosphorus",
    title: "Corporate Yacht Events on the Bosphorus: What Companies Usually Need",
    metaDescription:
      "A planning guide for corporate yacht events in Istanbul with guest flow, catering, branding, and where to route the request if it is actually a private dinner.",
    excerpt:
      "Corporate brief or private celebration? The venue changes once the use case is clear, and the quote does too.",
    category: "events",
    date: updatedAt,
    dateModified: updatedAt,
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80",
    imageAlt: "Corporate guests gathered on a yacht deck with Istanbul skyline in the background",
    keywords: [
      "corporate yacht events istanbul",
      "corporate boat event bosphorus",
      "company yacht event istanbul",
      "client hosting yacht bosphorus",
      "team dinner yacht istanbul",
    ],
    author: "editorial",
    keyTakeaways: [
      "Corporate yacht events are usually about guest flow, catering, branding, and invoicing, not a standard leisure cruise.",
      "The corporate page should be the first stop when the brief is business-led and needs a polished private vessel.",
      "If the request is really a private dinner or a celebration, the corporate page will not be the best landing page.",
    ],
    sections: [
      {
        heading: "The quickest route for a business brief",
        answerCapsule:
          "Use the corporate page when the event is business-led: client hosting, team dinners, launches, or board-level hosting on the water.",
        content: `Open [Corporate Yacht Events Istanbul](/corporate-events) when the request is clearly business-led. That page is for planning support, not just a boat quote.

If the team already knows it wants a larger private yacht rather than a specific event setup, [Yacht Charter Istanbul](/yacht-charter-istanbul) is often the next page to check.`,
      },
      {
        heading: "What corporate bookings usually need",
        content: `Corporate requests tend to ask for more than a vessel. They usually need a format that works for guest flow, a clear catering plan, invoicing that a finance team can use, and enough polish for clients or leadership.

That is why a corporate yacht event should be treated as a business event on the water, not as a normal leisure booking with extra names attached.`,
        list: [
          "Guest flow that works for welcome drinks, seating, or standing networking.",
          "Catering that matches the tone of the event.",
          "Branding or presentation support when the event is launch-led.",
          "An invoice and planning structure a business team can actually use.",
        ],
      },
      {
        heading: "The common corporate use cases",
        content: `The most common requests are client hosting, team dinners, product launches, board dinners, and incentive evenings. All of those can work on the Bosphorus if the vessel and service style are matched correctly.

If the event needs a quieter dinner-first format, the corporate brief may actually belong on [Private Bosphorus Dinner Cruise](/private-bosphorus-dinner-cruise). If it is a business gathering with a broader vessel decision, the corporate page stays the right first stop.`,
        list: [
          "Client hosting that needs to feel more memorable than a restaurant.",
          "Team dinners that benefit from one private setting.",
          "Product launches that need visible brand presence.",
          "Board dinners that value privacy and control over scale.",
        ],
      },
      {
        heading: "How to avoid the wrong landing page",
        content: `A business team should not have to decode the difference between a yacht page, a dinner page, and a celebration page. If the event is corporate, lead with the corporate page. If the event is primarily a private dinner, use the private dinner page. If the vessel itself is still the main question, use yacht charter.

That simple routing saves time and usually produces a better quote on the first reply.`,
      },
      {
        heading: "What to send in the first message",
        content: `Send the date, approximate guest count, event purpose, catering expectations, and whether you need branding or an invoice. That is enough for the team to shape a useful proposal.

For more vessel-heavy requests, include whether you want the event to feel like hosted networking, a formal dinner, or a launch with presentation support. The more specific the brief, the cleaner the route.`,
      },
    ],
    faqs: [
      {
        q: "Can corporate yacht events be invoiced?",
        a: "Yes. Corporate requests should include the invoicing details from the start so the proposal matches the finance workflow.",
      },
      {
        q: "Do corporate events need branding support?",
        a: "Not always, but launches and client-facing events usually benefit from it.",
      },
      {
        q: "What if the brief is just a team dinner?",
        a: "If the event is mostly dinner and the corporate angle is light, the private dinner page may be the better fit.",
      },
      {
        q: "Should a company start with yacht charter instead?",
        a: "Yes, if the vessel choice is still the main question. Start with the corporate page only when the event brief itself is already clear.",
      },
    ],
    relatedTours: [
      "corporate-event-bosphorus-cruise",
      "yacht-charter-in-istanbul",
      "private-bosphorus-dinner-yacht-cruise",
    ],
  },
];

export const commercialSupportRoutes: Record<string, SupportRoute> = {
  "bosphorus-sunset-cruise-vs-dinner-cruise": {
    eyebrow: "Service routing",
    title: "Decide the right dinner path",
    description:
      "If the question is sunset or dinner, the page below gives you the cleanest next click.",
    links: [
      { href: "/cruises/bosphorus-sunset-cruise", label: "Open sunset cruise" },
      { href: "/istanbul-dinner-cruise", label: "Open dinner cruise" },
      { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
    ],
  },
  "boat-rental-vs-yacht-charter-istanbul": {
    eyebrow: "Service routing",
    title: "Choose the right private hire",
    description:
      "When the choice is boat rental or yacht charter, these service pages keep the quote direction clear.",
    links: [
      { href: "/boat-rental-istanbul", label: "Open boat rental" },
      { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
      { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
    ],
  },
  "proposal-yacht-rental-istanbul-planning-guide": {
    eyebrow: "Service routing",
    title: "Keep the proposal moment first",
    description:
      "Use the proposal page when the reveal matters most, then move into dinner or charter only if the plan needs it.",
    links: [
      { href: "/proposal-yacht-rental-istanbul", label: "Open proposal page" },
      { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
      { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
    ],
  },
  "corporate-yacht-events-on-the-bosphorus": {
    eyebrow: "Service routing",
    title: "Route the brief to the business page",
    description:
      "If the event is business-led, the corporate page should carry the first click and the first quote.",
    links: [
      { href: "/corporate-events", label: "Open corporate events" },
      { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
      { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
    ],
  },
};

const categoryServiceLinks: Record<BlogCategory, RouteLink[]> = {
  "cruise-guide": [
    { href: "/cruises/bosphorus-sunset-cruise", label: "Open sunset cruise" },
    { href: "/istanbul-dinner-cruise", label: "Open dinner cruise" },
    { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
  ],
  "yacht-guide": [
    { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
    { href: "/proposal-yacht-rental-istanbul", label: "Open proposal page" },
    { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
  ],
  events: [
    { href: "/corporate-events", label: "Open corporate events" },
    { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
    { href: "/private-bosphorus-dinner-cruise", label: "Open private dinner cruise" },
  ],
  istanbul: [
    { href: "/cruises/bosphorus-sunset-cruise", label: "Open sunset cruise" },
    { href: "/istanbul-dinner-cruise", label: "Open dinner cruise" },
    { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
  ],
  tips: [
    { href: "/cruises/bosphorus-sunset-cruise", label: "Open sunset cruise" },
    { href: "/istanbul-dinner-cruise", label: "Open dinner cruise" },
    { href: "/yacht-charter-istanbul", label: "Open yacht charter" },
  ],
};

const highIntentSlugsByCategory: Record<BlogCategory, string[]> = {
  "cruise-guide": [
    "bosphorus-sunset-cruise-vs-dinner-cruise",
    "boat-rental-vs-yacht-charter-istanbul",
  ],
  "yacht-guide": [
    "boat-rental-vs-yacht-charter-istanbul",
    "proposal-yacht-rental-istanbul-planning-guide",
    "corporate-yacht-events-on-the-bosphorus",
  ],
  events: [
    "corporate-yacht-events-on-the-bosphorus",
    "boat-rental-vs-yacht-charter-istanbul",
  ],
  istanbul: [
    "bosphorus-sunset-cruise-vs-dinner-cruise",
    "boat-rental-vs-yacht-charter-istanbul",
  ],
  tips: [
    "bosphorus-sunset-cruise-vs-dinner-cruise",
    "boat-rental-vs-yacht-charter-istanbul",
  ],
};

const categoryRoutingCopy: Record<BlogCategory, { title: string; description: string }> = {
  "cruise-guide": {
    title: "Move to the right cruise page",
    description:
      "Use the comparison page to choose fast, then open the matching service page once the route is clear.",
  },
  "yacht-guide": {
    title: "Move to the right private hire page",
    description:
      "Use the next click to narrow vessel, proposal, or dinner intent before the brief gets longer than it needs to be.",
  },
  events: {
    title: "Move the brief into the event page",
    description:
      "When the request is business-led, the event page should carry the first click and the first quote.",
  },
  istanbul: {
    title: "Move to the cleanest service page",
    description:
      "Use the article to narrow the decision, then move straight to the service page that matches the trip.",
  },
  tips: {
    title: "Move to the right service page",
    description:
      "Use the guide to remove doubt, then open the service page that fits the booking mood.",
  },
};

export const highIntentBlogSlugs = commercialSupportPosts.map((post) => post.slug);

export function getBlogServiceLinks(post: BlogPost): RouteLink[] {
  const supportRoute = commercialSupportRoutes[post.slug];
  return supportRoute?.links || categoryServiceLinks[post.category];
}

export function getBlogRoutingCopy(post: BlogPost): SupportRoute {
  const supportRoute = commercialSupportRoutes[post.slug];
  if (supportRoute) return supportRoute;

  const categoryCopy = categoryRoutingCopy[post.category];
  return {
    eyebrow: "Service routing",
    title: categoryCopy.title,
    description: categoryCopy.description,
    links: categoryServiceLinks[post.category],
  };
}

export function getHighIntentBlogSlugs(post: BlogPost): string[] {
  const ordered = [
    ...(highIntentSlugsByCategory[post.category] || []),
    ...highIntentBlogSlugs,
  ];

  return [...new Set(ordered.filter((slug) => slug !== post.slug))];
}

export const blogPosts = [...commercialSupportPosts, ...baseBlogPosts];

const blogPostIndex = new Map(blogPosts.map((post) => [post.slug, post]));

export function getBlogBySlug(slug: string) {
  return blogPostIndex.get(slug);
}

export function getAllBlogSlugs() {
  return blogPosts.map((post) => post.slug);
}
