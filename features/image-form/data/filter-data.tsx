export const filterData = [
  {
    id: "4",
    title: "Substratum",
    items: [
      { text: "Bark and wood", value: "1", image: "bark.png" },
      { text: "Rock", value: "3", image: "rock.png" },
      {
        text: "Soil, terricolous mosses and plant debris",
        value: "2",
        image: "soil.png",
      },
    ],
  },
  {
    id: "26",
    title: "Thallus",
    items: [
      { text: "Fruticose", value: "1", image: "fruticose.png" },
      {
        text: "Foliose",
        value: "2",
        image: "foliose.png",
      },
    ],
  },
  {
    id: "45",
    title: "Thallus",
    items: [
      { text: "Crustose or leprose", value: "2", image: "crustose.png" },
      {
        text: "Squamulose, or (for cyanobacterial lichens only) microfruticose",
        value: "1",
        image: "squamulose.png",
      },
    ],
  },
  {
    id: "53",
    title: "Thallus",
    depend: { id: "45", item: "2" },
    items: [
      {
        text: "Crustose-placodioid, with marginal lobes",
        value: "1",
        image: "placoid.png",
      },
      {
        text: "Crustose not placodioid",
        value: "2",
        image: "not-placoid.png",
      },
    ],
  },
  {
    id: "11",
    title: "Main photobiont",

    items: [
      { text: "Cyanobacterial", value: "1", image: "cyanobacterial.png" },
      {
        text: "Not cyanobacterial",
        value: "2",
        image: "not-cyanobacterial.png",
      },
    ],
  },
  {
    id: "7",
    title: "Photobiont",
    depend: { id: "11", item: "2" },

    items: [
      {
        text: "Trentepohlioid (more or less orange)",
        value: "1",
        image: "trente.png",
      },
      {
        text: "Chlorococcoid (bright green), or absent (species not lichenized)",
        value: "2",
        image: "cloro.png",
      },
    ],
  },
  {
    id: "27",
    title: "Thallus",

    items: [
      {
        text: "Homoiomerous, the photobionts occurring throughout its thickness (cyanobacterial lichens only)",
        value: "1",
        image: "homo.png",
      },
      {
        text: "Heteromerous, the photobionts occupying a distinct layer (cyanobacterial lichens only)",
        value: "2",
        image: "hetero.png",
      },
    ],
  },
  {
    id: "41",
    title: "Thallus",

    items: [
      {
        text: "And/or apothecia bright yellow, orange, or red-",
        value: "1",
        image: "apothecia-yellow.png",
      },
      {
        text: "And/or apothecia of other colours",
        value: "2",
        image: "apothecia-yellow.png",
      },
    ],
  },
  {
    id: "23",
    title: "Thallus",

    items: [
      {
        text: "With soredia or soredia-like structures (e.g. blastidia)",
        value: "1",
        image: "soredia.png",
      },
      {
        text: "With isidia or schizidia",
        value: "2",
        image: "isidia.png",
      },
    ],
  },
  {
    id: "33",
    title: "Ascocarps",

    items: [
      {
        text: "Perithecioid",
        value: "1",
        image: "peri.png",
      },
      {
        text: "Apothecioid",
        value: "2",
        image: "apo.png",
      },
    ],
  },
  {
    id: "46",
    title: "Ascocarps",

    items: [
      {
        text: "Lirelliform",
        value: "1",
        image: "lirelli.png",
      },
      {
        text: "Not lirelliform",
        value: "2",
        image: "not-lirelli.png",
      },
    ],
  },
  {
    id: "37",
    title: "Apothecia",

    items: [
      {
        text: "Lecanorine",
        value: "1",
        image: "lecanorine.png",
      },
      {
        text: "Not lecanorine",
        value: "2",
        image: "not-lecanorine.png",
      },
    ],
  },
  {
    id: "8",
    title: "Ascospores",

    items: [
      {
        text: "Pigmented",
        value: "1",
        image: "pigmented.png",
      },
      {
        text: "Hyaline",
        value: "2",
        image: "hyaline.png",
      },
    ],
  },
  {
    id: "34",
    title: "Ascospores",

    items: [
      {
        text: "1-celled",
        value: "1",
        image: "1cell.png",
      },
      {
        text: "More than 1-celled",
        value: "2",
        image: "more1cell.png",
      },
    ],
  },
  {
    id: "35",
    title: "Ascospores",

    items: [
      {
        text: "2-celled",
        value: "1",
        image: "2cell.png",
      },
      {
        text: "More than 2-celled",
        value: "2",
        image: "more2cell.png",
      },
    ],
  },
  {
    id: "52",
    title: "Ascospores",

    items: [
      {
        text: "Polarilocular (2 cells united by a thin canal)",
        value: "1",
        image: "policular.png",
      },
      {
        text: "Not polarilocular",
        value: "2",
        image: "not-policular.png",
      },
    ],
  },
  {
    id: "36",
    title: "Ascospores",

    items: [
      {
        text: "Muriform or submuriform (with both longitudinal and transversal septa)",
        value: "1",
        image: "muriform.png",
      },
      {
        text: "Not muriform/submuriform",
        value: "2",
        image: "not-muriform.png",
      },
    ],
  },
  {
    id: "12",
    title: "Thallus",

    items: [
      {
        text: "K-",
        value: "1",
        image: "kmin.png",
      },
      {
        text: "K+ yellow to orange",
        value: "3",
        image: "kyellow.png",
      },
      {
        text: "K+ red",
        value: "4",
        image: "kred.png",
      },
      {
        text: "K+ yellow turning to red",
        value: "5",
        image: "kyellowtored.png",
      },
    ],
  },
  {
    id: "42",
    title: "Ascospores",

    items: [
      {
        text: "less than 8 per ascus",
        value: "3",
        image: "spores8less.png",
      },
      {
        text: "8 per ascus",
        value: "1",
        image: "spores8.png",
      },
      {
        text: "more than 8 per ascus",
        value: "2",
        image: "spores8more.png",
      }
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
