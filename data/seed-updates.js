// One-time fixes for speakers that were already copied into the database from
// data/seed-speakers.js. Each entry runs once (tracked by its `key`): `set` overwrites
// fields, and `replace` swaps exact text anywhere in the speaker's text fields, leaving
// any other edits made on the site alone. Add a new entry with a new key for each fix.

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
  }
];
