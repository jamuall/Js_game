const missions = {
  basic: [
    {
      title: "EdgeOfForest",
      description:
        "You get one point for each forest field adjacent to the edge of your map.",
      image: "missions/Group78.png",
    },
    {
      title: "SleepyValley",
      description:
        "For every row with three forest fields, you get four points.",
      image: "missions/Group69.png",
    },
    {
      title: "WateringPotatoes",
      description:
        "You get two points for each water field adjacent to your farm fields.",
      image: "missions/Group74.png",
    },
    {
      title: "Borderlands",
      description: "For each full row or column, you get six points.",
      image: "missions/Group70.png",
    },
    {
      title: "TreeLine",
      description:
        "You get two points for each of the fields in the longest vertically uninterrupted continuous forest. If there are two or more tree lines with the same longest length, only one counts.",
      image: "missions/Group68.png",
    },
    {
      title: "WateringCanal",
      description:
        "For each column of your map that has the same number of farm and water fields, you will receive four points. You must have at least one field of both terrain types in your column to score points.",
      image: "missions/Group75.png",
    },
    {
      title: "WealthyTown",
      description:
        "You get three points for each of your village fields adjacent to at least three different terrain types.",
      image: "missions/Group71.png",
    },
    {
      title: "MagiciansValley",
      description:
        "You get three points for your water fields adjacent to your mountain fields.",
      image: "missions/Group76.png",
    },
    {
      title: "EmptySite",
      description:
        "You get two points for empty fields adjacent to your village fields.",
      image: "missions/Group77.png",
    },
    {
      title: "RowOfHouse",
      description:
        "For each field in the longest village fields that are horizontally uninterrupted and contiguous you will get two points.",
      image: "missions/Group72.png",
    },
    {
      title: "OddNumberedSilos",
      description:
        "For each of your odd numbered full columns you get 10 points.",
      image: "missions/Group73.png",
    },
    {
      title: "RichCountryside",
      description:
        "For each row with at least five different terrain types, you will receive four points.",
      image: "missions/Group79.png",
    },
  ],
};

const elements = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
];

const seasons = ["Spring", "Summer", "Autumn", "Winter"];
