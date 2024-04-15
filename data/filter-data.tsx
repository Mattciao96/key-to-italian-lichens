export const filterData = [
  {
    id: 4,
    title: "Substratum",
    description: "This is group 1",
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
    id: 45,
    title: "Thallus",
    description: "Th",
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
    description: "Th",
    depend: {id: 26, item:1},
    items: [
      { text: "Crustose-placodioid, with marginal lobes", value: 1, image: "placoid.png" },
      {
        text: "Crustose not placodioid",
        value: 2,
        image: "not-placoid.png",
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
