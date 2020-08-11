'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products", [
        {
          title: "Depression Necklace 1",
          description: "Sterling Silver, Rutilated Quartz",
          price: 425,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/DepressionNecklace1/IMG_5531.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Necklace 2",
          description: "Sterling Silver, Grossular Garnet Beads",
          price: 120,
          categoryId: 1,
          unitsInStock: 0,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/DepressionNecklace2/IMG_5466.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Necklace 3",
          description: "Sterling Silver, 9ct & 18ct Gold Beads, Labradorite Beads",
          price: 400,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/DepressionNecklace3/IMG_5539.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Bangles",
          description: "1 Polished 18ct Gold and 4 Textured Brass",
          price: 1250,
          categoryId: 3,
          unitsInStock: 1,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/DepressionBangles/IMG_5478.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Necklace",
          description: "Sterling Silver Chain, 18ct Gold Twirls, Labradorite Beads",
          price: 650,
          categoryId: 1,
          unitsInStock: 0,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/AniextyNecklace/IMG_5460.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Lego Block Bracelet",
          description: "Cast Sterling Silver Lego Block, Sterling Silver Chain",
          price: 90,
          categoryId: 3,
          unitsInStock: 2,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/LegoBlockBracelet/IMG-9199.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Earrings",
          description: "Sterling Silver, Labradorite Beads",
          price: 190,
          categoryId: 2,
          unitsInStock: 0,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/AniextyEarringsSilver/AIMG_5487.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Necklace 1",
          description: "Sterling Silver, 9ct Gold Tube, Blue Topaz Setting",
          price: 400,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/FibromyalgiaNecklace1/IMG_FIBROTUBE.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Necklace 3",
          description: "Sterling Silver, Amethyst",
          price: 180,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/FibromyalgiaNecklace3/CIMG_5502.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Earrings",
          description: "Sterling Silver Tubes, Synthetic Blue Sapphires, 9ct Gold Balls",
          price: 100,
          categoryId: 2,
          unitsInStock: 1,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/FibromyalgiaEarrings/IMG-5215.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Necklace",
          description: "Sterling Silver, 9ct Gold Beads",
          price: 350,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/HearingImpairmentNecklace/IMG_5480.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Dangle Earrings",
          description: "Sterling Silver, 9ct Gold Beads",
          price: 100,
          categoryId: 2,
          unitsInStock: 0,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/HearingImpairmentDangleEarrings/IMG_5555.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Bracelet",
          description: "Sterling Silver, 9ct Gold Beads",
          price: 200,
          categoryId: 3,
          unitsInStock: 0,
          metal: "Gold",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/HearingImpairmentBracelet/IMG_5548.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Silver Stud Earrings",
          description: "Sterling Silver, Colored Synthetic Stone",
          price: 80,
          categoryId: 2,
          unitsInStock: 15,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/AnyColorEarings/IMG-4613.jpg",
          stoneColor: "Blue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Flower ring",
          description: "Sterling Silver, Chrysoprase Cabochon",
          price: 220,
          categoryId: 4,
          unitsInStock: 10,
          metal: "Sterling Silver",
          image: "/home/darian4real/Code/Portfolio/PortfolioData/piecesEvaluated/FlowerPowerRing/IMG-6956.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  }
};
