// One-time fixes for speakers that were already copied into the database from
// data/seed-speakers.js. Each entry runs once (tracked by its `key`): `set` overwrites
// fields, `replace` swaps exact text anywhere in the speaker's text fields, `append` adds
// text to the end of a text field, and `push` adds items to a list (skipping ids already
// there), leaving any other edits made on the site alone. Add a new entry with a new key
// for each fix.

export default [
  {
    key: 'speaker-2-is-cindy-leong',
    id: 'seed-nick-goh-linkedin',
    set: { name: 'Cindy Leong' },
    replace: [
      ['(his example: some', '(for example, some'],
      ['His session covered four parts', 'The session covered four parts'],
      ['(advertising, where he works)', "(advertising, the speaker's team)"],
      ['double-check his exact name and job title', 'double-check the job title']
    ]
  },
  {
    // Built only from the summary and key takeaways given for the first talk.
    key: 'nick-goh-fleshed-out',
    id: 'seed-nick-goh',
    append: {
      notes: `Talk notes, organised

Why it matters
- Many companies are still waiting to see how AI plays out. People who can show how to use it well stand out, so AI skills are a competitive advantage in marketing.

The method: a virtual marketing team in Claude Projects
- Each conversation in the Project acts as one team member with one role.
- The team works in order: brief review, research and strategy, messaging hierarchy, big idea and key visuals, then a reviewer.
- Load the context once: the brief, Word docs, PDFs and images go into the Project, so every conversation starts with the same information and nothing is pasted again.
- Each role is started with a Skill that defines that conversation's job, so no project-level instructions are needed.
- Demo: a fictional LVMH campaign for an eco-friendly backpack.

Messaging hierarchy
- Carries the big idea consistently across channels while adapting it to each platform (TikTok, Instagram, YouTube).

Prompting: the CRAFT framework
- Context, Role, Action, Format, plus a fifth element (not clear in my notes).
- Be specific about the output you want.

The reviewer agent
- Scores the work against the brief.

Mixing tools
- Claude for the concepts, ChatGPT for the images, other tools for video and social listening. Spreading the work also saves credits.

Human judgment still matters
- He went against the AI's recommended creative direction on purpose. The reviewer scored it 5/10, and he didn't treat that score as the final word.
- He showed the room two creative versions without the brief and asked which would make them buy. Consumers never see the brief, so real audience reactions and your own expertise beat AI scoring.

Q&A
- Will AI get better at judgment? He doesn't know and worries about it too. His instinct is no, because judgment comes from human experience. Hand 100% of the responsibility to AI and you risk making yourself redundant.`
    },
    push: {
      questions: [
        { id: 'q-goh-01', text: 'Will AI get better at judgment?', star: false, asked: true, answer: "He doesn't know and worries about it too. His instinct is no, because judgment comes from human experience. If you hand over 100% of the responsibility to AI, you risk making yourself redundant." }
      ],
      research: [
        { id: 'r-goh-01', kind: 'background', link: '', text: 'Claude Projects (general background, not from the talk): a workspace in Claude where the files you add are available in every conversation inside that project. This is what lets one brief feed the whole "team".' },
        { id: 'r-goh-02', kind: 'background', link: '', text: 'Skills in Claude (general background, not from the talk): packaged instructions that Claude loads for a specific job. In the talk, each team role was started with its own Skill.' },
        { id: 'r-goh-03', kind: 'background', link: '', text: 'LVMH (general background): the French luxury group behind brands such as Louis Vuitton, Dior and Moët & Chandon. The backpack campaign in the demo was fictional.' },
        { id: 'r-goh-04', kind: 'idea', link: '', text: 'Find out the fifth letter of CRAFT. Prompt frameworks with this name vary, so check which version he uses rather than guessing.' }
      ],
      cards: [
        { id: 'c-goh-01', front: 'Why does knowing how to use AI make a marketer stand out right now?', back: 'Many companies are still waiting to see how AI plays out, so people who can show how to use it have a competitive advantage.' },
        { id: 'c-goh-02', front: 'How does Nick build a virtual marketing team?', back: 'In Claude Projects, with each conversation acting as one team member with one role.' },
        { id: 'c-goh-03', front: 'What order does the virtual team work in?', back: 'Brief review → research and strategy → messaging hierarchy → big idea and key visuals → reviewer.' },
        { id: 'c-goh-04', front: 'Why load the brief and files into the Project once?', back: 'Every conversation starts with the same information (brief, Word docs, PDFs, images), so nothing has to be pasted again.' },
        { id: 'c-goh-05', front: "What starts each team member's job?", back: "A Skill that defines that conversation's job, so no project-level instructions are needed." },
        { id: 'c-goh-06', front: 'What does a messaging hierarchy do?', back: 'Keeps the big idea consistent across channels while adapting it to each platform (TikTok, Instagram, YouTube).' },
        { id: 'c-goh-07', front: 'What are the known letters of CRAFT?', back: 'Context, Role, Action, Format, plus a fifth element. Also: be specific about the output you want.' },
        { id: 'c-goh-08', front: 'What does the reviewer agent do?', back: 'Scores the work against the brief.' },
        { id: 'c-goh-09', front: 'Which tool did he use for what?', back: 'Claude for concepts, ChatGPT for images, other tools for video and social listening. Mixing tools also saves credits.' },
        { id: 'c-goh-10', front: 'What score did the reviewer give his chosen creative direction?', back: "5/10. He went against the AI's recommendation on purpose and didn't treat the score as the final word." },
        { id: 'c-goh-11', front: 'Why test creative on real people instead of trusting AI scores?', back: "Consumers never see the brief. AI can't replace real audience reactions or your own expertise." },
        { id: 'c-goh-12', front: 'What was the demo campaign?', back: 'A fictional LVMH campaign for an eco-friendly backpack.' },
        { id: 'c-goh-13', front: 'Will AI get better at judgment, according to him?', back: "He doesn't know, but his instinct is no: judgment comes from human experience. Hand over 100% to AI and you risk making yourself redundant." }
      ],
      'game.fakes': [
        { id: 'fk-goh-07', text: 'He put all the team roles into one long conversation.' },
        { id: 'fk-goh-08', text: 'He said project-level instructions are needed for every role.' },
        { id: 'fk-goh-09', text: 'He said the reviewer agent should always have the final say.' },
        { id: 'fk-goh-10', text: 'His messaging hierarchy uses the exact same post on every platform.' }
      ]
    }
  }
];
