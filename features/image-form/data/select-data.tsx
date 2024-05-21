export const selectData = [
  {
    id: 'subst',
    title: 'substratum',
    items: [
      { value: "Sax", text: "saxicolous" },
      { value: "Lign", text: "on lignum" },
      { value: "Epiph", text: "epiphytic" },
      { value: "Terr", text: "on soil, terricolous mosses, plant debris" },
      { value: "Foliic", text: "foliicolous" },
    ],
  },
  {
    id: 'photo',
    title: 'photobiont',
    items:  [
      { value: "Ch", text: "green algae other than Trentepohlia" },
      { value: "Tr", text: "trentepohlia" },
      {
        value: "Cy.h",
        text: "cyanobacteria, filamentous form, e.g. Nostoc, Scytonema",
      },
      {
        value: "Cy.c",
        text: "cyanobacteria, coccaceous form, e.g. Gloeocapsa, Xanthocapsa",
      },
    ],
  },
  {
    id: 'growth',
    title: 'Growth form',
    items: [
      { value: "Frut", text: "fruticose" },
      { value: "Frut.f", text: "fruticose filamentous" },
      { value: "Fol", text: "foliose" },
      { value: "Fol.b", text: "foliose broad-lobed, Parmelia type" },
      { value: "Fol.n", text: "foliose narrow-lobed, Physcia type" },
      { value: "Fol.u", text: "foliose umbilicate" },
      { value: "Cr", text: "crustose" },
      { value: "Cr.end", text: "crustose endolithic" },
      { value: "Cr.pl", text: "crustose placodiomorph" },
      { value: "Lepr", text: "leprose" },
      { value: "Sq", text: "squamulose" },
      { value: "LF", text: "lichenicolous fungus" },
      { value: "F", text: "non-lichenized, non-lichenicolous fungus" },
    ],
  },
  {
    id: 'srw',
    title: 'Water needs',
    items: [
      {
        value: "w",
        text: "on otherwise dry surfaces with periodical seepage of water after rain",
      },
      {
        value: "l",
        text: "periodical submerged, e.g. in creeks or on coastal maritime rocks",
      },
      { value: "u", text: "on surface seldom wetted by rain, e.g. underhangs" },
    ],
  },
  {
    id: 'repro',
    title: 'Reproduction',
    items: [
      { value: "S", text: "mainly sexual" },
      {
        value: "A.s",
        text: "mainly asexual, by soredia or soredia-like structures, e.g. blastidia",
      },
      {
        value: "A.i",
        text: "mainly asexual, by isidia or isidia-like structures, e.g. schizidia",
      },
      { value: "A.f", text: "mainly asexual, by thallus fragmentation" },
    ],
  },
  {
    id: 'oc',
    title: 'Phytoclimatic range',
    items: [
      { value: "oc", text: "Oceanic" },
      { value: "suboc", text: "Suboceanic" },
      { value: "subc", text: "Subcontinental" },
      ],
  },
  {
    id: 'coast',
    title: 'Only costal species',
    items: [
      { value: "null", text: "No" },
      { value: "coast", text: "Yes" },
      { value: "without", text: "Without those species" },
      ],
  },
  {
    id: 'paras',
    title: 'Only parasitic species',
    items: [
      { value: "null", text: "No" },
      { value: "paras", text: "Yes" },
      { value: "without", text: "Without those species" },
      ],
  },
  {
    id: 'pion',
    title: 'Only pioneer species',
    items: [
      { value: "null", text: "No" },
      { value: "p", text: "Yes" },
      { value: "without", text: "Without those species" },
      ],
  },
  {
    id: 'metal',
    title: 'Only species of metal-rich substrata',
    items: [
      { value: "null", text: "No" },
      { value: "m", text: "Yes" },
      { value: "without", text: "Without those species" },
      ],
  },
];

