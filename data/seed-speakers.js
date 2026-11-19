// Speakers added through GitHub. The site copies each one into the database the first time
// it starts after a deploy. After that the database copy is the real one: edits made on the
// site are kept, and a speaker removed on the site does not come back.
// Each entry needs a unique `id` (letters, digits, - and _ only).

export default [
  {
    id: 'seed-nick-goh',
    name: 'Nick Goh',
    role: '',
    org: '',
    date: '2026-11-13',
    time: '',
    topic: 'Using AI as a competitive advantage in marketing: building a virtual marketing team in Claude Projects.',
    link: '',
    status: 'done',
    research: [],
    questions: [],
    notes: 'The speaker ran a workshop on using AI as a competitive advantage in marketing. Many companies are still waiting to see how AI plays out, so people who can show how to use it stand out. His method is to build a virtual marketing team in Claude Projects, with each conversation acting as one team member. His demo was a fictional LVMH campaign for an eco-friendly backpack.\n\nTo check: find out the fifth letter of CRAFT (I couldn\'t make it out in the transcript).',
    takeaways: [
      { id: 'tk-goh-01', text: 'One conversation per role. The team runs from brief review to research and strategy, messaging hierarchy, big idea and key visuals, then a reviewer.' },
      { id: 'tk-goh-02', text: 'Load context once. Put the brief, Word docs, PDFs and images in the Project, so every conversation starts with the same information and nothing is re-pasted.' },
      { id: 'tk-goh-03', text: "Trigger each role with a Skill. The skill defines that conversation's job, so you don't need project-level instructions." },
      { id: 'tk-goh-04', text: 'Messaging hierarchy. It carries the big idea consistently across channels while adapting to each platform (TikTok, IG, YouTube).' },
      { id: 'tk-goh-05', text: "CRAFT prompting framework. It covers Context, Role, Action, Format, plus a final element I couldn't make out in the transcript. He also stressed being specific about the output you want." },
      { id: 'tk-goh-06', text: 'Use a reviewer agent. It scores the work against the brief.' },
      { id: 'tk-goh-07', text: 'Mix tools. Claude handled the concepts, ChatGPT produced the images, and he used other tools for video and social listening. This also saves credits.' },
      { id: 'tk-goh-08', text: "Human judgment is still essential. He deliberately went against the AI's recommended creative direction, and the reviewer scored it 5/10. He didn't treat that score as the final word." },
      { id: 'tk-goh-09', text: "Real people beat AI scoring. He showed the room two creative versions with no brief and asked which would drive a purchase. His point was that consumers never see the brief, and AI can't replace real audience reactions or your own expertise." },
      { id: 'tk-goh-10', text: "Q&A. Asked whether AI will get better at judgment, he said he doesn't know and worries about it too. His instinct was no, because judgment comes from human experience. If you hand over 100% of the responsibility to AI, you risk making yourself redundant." }
    ],
    game: {
      trues: [],
      fakes: [
        { id: 'fk-goh-01', text: 'He built his virtual marketing team in ChatGPT, with one chat per team member.' },
        { id: 'fk-goh-02', text: 'His demo campaign was for a Nike running shoe.' },
        { id: 'fk-goh-03', text: 'The reviewer agent scored his chosen creative direction 9/10.' },
        { id: 'fk-goh-04', text: 'He said you should paste the brief into every conversation again.' },
        { id: 'fk-goh-05', text: 'He used Claude to make all the campaign images.' },
        { id: 'fk-goh-06', text: 'He said AI will definitely become better at judgment than people.' }
      ],
      best: 0
    },
    createdAt: 1794528000000,
    updatedAt: 1794528000000
  },
  {
    id: 'seed-nick-goh-linkedin',
    name: 'Cindy Leong',
    role: 'Helps independent agencies grow their marketing on LinkedIn',
    org: 'LinkedIn',
    date: '2026-11-19',
    time: '',
    topic: 'How to use LinkedIn strategically: the LinkedIn ecosystem, audience strategy, B2B buying, and how AI search is changing brand discovery.',
    link: '',
    status: 'done',
    research: [],
    questions: [
      {
        id: 'q-li-01',
        text: 'Is "Open to work" something you switch on yourself, or does LinkedIn decide it for you?',
        star: false,
        asked: true,
        answer: 'You opt in yourself. If you select the feature on your profile, an "Open to work" badge appears.'
      },
      {
        id: 'q-li-02',
        text: 'With video and more personal posts in the feed, is LinkedIn turning into another social media app instead of a professional network?',
        star: false,
        asked: true,
        answer: "Its positioning is still professional, and LinkedIn tells members to post professional content. But the line between professional and personal is hard to draw (for example, some people think wishing a boss or client happy birthday is fine, others don't). Engagement helps show what people actually want to see."
      },
      {
        id: 'q-li-03',
        text: 'Executives want help with personal branding, but companies don\'t like spending their budget on one person. How should an agency balance personal branding with company marketing?',
        star: false,
        asked: true,
        answer: "It's still a challenge to convince leaders and companies. Make sure the person's posts are tied to the company and its products. There is always a risk if that person becomes bigger than the brand or leaves, but you can make the best use of their expertise while they are there."
      }
    ],
    notes: "The speaker works at LinkedIn with independent agencies, helping them invest more on LinkedIn with the right training, products, insights and capabilities so they can grow their clients and themselves. The session covered four parts: the LinkedIn ecosystem, audience strategy, brand strategy, and a short look at ad formats.\n\nLinkedIn's vision is to create economic opportunity for every member of the global workforce, by connecting professionals to make them more successful and productive. It has four main products: Talent Solutions (hiring), Marketing Solutions (advertising, the speaker's team), LinkedIn Learning (around 25,000 courses, also free through Singapore's NLB app) and Sales Navigator. It started as a networking and jobs platform, then invested in the feed and news, and now sees itself as both a publisher and a professional social network.\n\nAudience: around 1.3 billion members and 130 million decision makers, with a very high trust score because fake profiles are hard to create. India is the biggest market outside the US, and LinkedIn is not available in China.\n\nB2B buying is slow and complex: long buying cycles (about 10 months), buying groups of around 6 people in small companies and up to 20 in large ones, only about 5% of buyers in the market at any time, and 40 to 60% of deals lost because the group can't agree. Buyers fear messing up more than missing out, so they pick safe, well-known brands they can defend (\"nobody gets fired for buying IBM\"). Most buyers already have brands in mind from day one, so brand building matters, not just lead generation. Most B2B buyers are now Millennials or Gen Z, who dislike gated content and want video and AI transparency.\n\nLinkedIn is also a strong place for B2C, especially premium products, by targeting life moments like promotions and new jobs, and affluent audience segments.\n\nBrand discovery is changing because of AI: people now ask ChatGPT or Gemini instead of searching, and most B2B buying groups use AI tools before they talk to sales. In LinkedIn's research, LinkedIn is the second most cited source across AI platforms (YouTube is first because of its automatic transcripts) and the most cited source for professional questions. AI tools favour content that shows real experience, expertise, authority and trust.\n\nNote: the numbers above come from an automatic transcript that was hard to read in places. Double-check any figure before using it, and the speaker's job title.",
    takeaways: [
      { id: 'tk-li-01', text: "Know the platform before you use it strategically. LinkedIn's vision is to create economic opportunity for every member of the global workforce, and everything it builds aims to make professionals more successful and productive." },
      { id: 'tk-li-02', text: 'LinkedIn has four main products: Talent Solutions (hiring), Marketing Solutions (advertising), LinkedIn Learning and Sales Navigator.' },
      { id: 'tk-li-03', text: 'It has grown from a networking and jobs site into both a publisher and a professional social network, with very high trust because fake profiles are hard to create.' },
      { id: 'tk-li-04', text: 'B2B buying is slow and involves many people: a long buying cycle (about 10 months) and buying groups of around 6 people in small companies and up to 20 in large ones, many of whom never use the product.' },
      { id: 'tk-li-05', text: 'Only about 5% of B2B buyers are in the market at any one time, and 40 to 60% of deals are lost because the group cannot agree.' },
      { id: 'tk-li-06', text: 'B2B buyers fear messing up more than missing out. They choose safe, well-known brands they can defend, so being known to the whole buying group from day one matters more than features.' },
      { id: 'tk-li-07', text: 'Most B2B buyers are now Millennials or Gen Z. They dislike gated content (forms before a download), prefer video and podcasts, and want to know what was made with AI.' },
      { id: 'tk-li-08', text: 'LinkedIn works for B2C too, especially premium products: target life moments such as promotions and new jobs, and affluent audience segments.' },
      { id: 'tk-li-09', text: 'AI is changing discovery. Most B2B buying groups ask ChatGPT, Gemini or other AI tools before talking to sales, and many AI searches end without a click.' },
      { id: 'tk-li-10', text: "In LinkedIn's research it is the second most cited source across AI platforms (YouTube is first thanks to automatic transcripts) and the most cited for professional questions." },
      { id: 'tk-li-11', text: 'To be picked up by AI, publish detailed, structured content that shows real experience and expertise, get mentioned by trusted sources, encourage leaders to post thought leadership, and always add transcripts to videos.' }
    ],
    game: {
      trues: [],
      fakes: [
        { id: 'fk-li-01', text: "LinkedIn's biggest market outside the US is China." },
        { id: 'fk-li-02', text: 'Most B2B buyers are ready to buy at any given moment.' },
        { id: 'fk-li-03', text: 'B2B buyers mainly worry about missing out on the cheapest deal.' },
        { id: 'fk-li-04', text: 'Gen Z buyers are happy to fill in a form to download a white paper.' },
        { id: 'fk-li-05', text: 'Reddit is now the most cited source across AI platforms.' },
        { id: 'fk-li-06', text: "AI tools can watch videos, so transcripts don't matter." },
        { id: 'fk-li-07', text: 'LinkedIn switches "Open to work" on automatically when you leave a job.' }
      ],
      best: 0
    },
    createdAt: 1795046400000,
    updatedAt: 1795046400000
  }
];
