export const filterData = [
  {
    id: 4,
    title: "Substratum",
    items: [
      { text: "Bark and wood", value: 1, image: "bark.png" },
      { text: "Rock", value: 3, image: "rock.png" },
      {
        text: "Soil, terricolous mosses and plant debris",
        value: 2,
        image: "soil.png",
      },
    ],
  },
  {
    id: 26,
    title: "Thallus",
    items: [
      { text: "Fruticose", value: 1, image: "fruticose.png" },
      {
        text: "Foliose",
        value: 2,
        image: "foliose.png",
      },
    ],
  },
  {
    id: 45,
    title: "Thallus",
    items: [
      { text: "Crustose or leprose", value: 2, image: "crustose.png" },
      {
        text: "Squamulose, or (for cyanobacterial lichens only) microfruticose",
        value: 1,
        image: "squamulose.png",
      },
    ],
  },
  {
    id: 53,
    title: "Thallus",
    depend: { id: 45, item: 2 },
    items: [
      {
        text: "Crustose-placodioid, with marginal lobes",
        value: 1,
        image: "placoid.png",
      },
      {
        text: "Crustose not placodioid",
        value: 2,
        image: "not-placoid.png",
      },
    ],
  },
  {
    id: 11,
    title: "Main photobiont",

    items: [
      { text: "Cyanobacterial", value: 1, image: "cyanobacterial.png" },
      {
        text: "Not cyanobacterial",
        value: 2,
        image: "not-cyanobacterial.png",
      },
    ],
  },
  {
    id: 7,
    title: "Photobiont",
    depend: { id: 11, item: 2 },

    items: [
      {
        text: "Trentepohlioid (more or less orange)",
        value: 1,
        image: "trente.png",
      },
      {
        text: "Chlorococcoid (bright green), or absent (species not lichenized)",
        value: 2,
        image: "cloro.png",
      },
    ],
  },

  /* {
    title: 'topo',
    description: 'puzzone',
    items: [
      { text: 'cacca topo', value: 'option1', image: 'bark.png' },
      { text: 'casa topo', value: 'option2', image: 'rock.png' },
      { text: 'riccio', value: 'option3', image: 'soil.png' },
    ],
  }, */
  // Add more groups as needed
];
