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
    notes: 'The speaker ran a workshop on using AI as a competitive advantage in marketing. Many companies are still waiting to see how AI plays out, so people who can show how to use it stand out. His method is to build a virtual marketing team in Claude Projects, with each conversation acting as one team member. His demo was a fictional LVMH campaign for an eco-friendly backpack.',
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
    scribbles: [
      { id: 'sc-goh-01', text: "Find out the fifth letter of CRAFT (couldn't make it out in the transcript).", at: 1794528000000 }
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
  }
];
