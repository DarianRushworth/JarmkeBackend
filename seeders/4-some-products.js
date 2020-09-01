'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "products", [
        {
          title: "Depression Necklace 1",
          description: `In this range I reflect on the heavy weighted feeling depression casts. By adding weight to these pieces
          it can simulate a weighed down feeling.
          Sterling Silver, Rutilated Quartz`,
          price: 425,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Sterling Silver",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234454/IMG_5531_aokgfq.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Necklace 2",
          description: `In this range I reflect on the heavy weighted feeling depression casts. By adding weight to these pieces
          it can simulate a weighed down feeling.
          Sterling Silver, Grossular Garnet Beads`,
          price: 120,
          categoryId: 1,
          unitsInStock: 0,
          metal: "Sterling Silver",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234413/IMG_5466_whscwc.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Necklace 3",
          description: `In this range I reflect on the heavy weighted feeling depression casts. By adding weight to these pieces
          it can simulate a weighed down feeling.
          Sterling Silver, 9ct & 18ct Gold Beads, Labradorite Beads`,
          price: 400,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234351/IMG_5539_a7clcu.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Depression Bangles",
          description: `In this range I reflect on the heavy weighted feeling depression casts. By adding weight to these pieces
          it can simulate a weighed down feeling.
          1 Polished 18ct Gold and 4 Textured Brass`,
          price: 1250,
          categoryId: 3,
          unitsInStock: 1,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234320/IMG_5478_n7krhx.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Necklace",
          description: `This range was inspired by the chaotic
          and anxious feeling of aniexty. I aimed to create jewellery pieces that 
          feel busy and almost out of your control.
          Sterling Silver Chain, 18ct Gold Twirls, Labradorite Beads`,
          price: 650,
          categoryId: 1,
          unitsInStock: 0,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234288/IMG_5460_seqrqv.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Lego Block Bracelet",
          description: `This range was inspired by the chaotic
          and anxious feeling of aniexty. I aimed to create jewellery pieces that 
          feel busy and almost out of your control.
          Cast Sterling Silver Lego Block, Sterling Silver Chain`,
          price: 90,
          categoryId: 3,
          unitsInStock: 2,
          metal: "Sterling Silver",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234251/IMG-9199_dr2qau.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Aniexty Earrings",
          description: `This range was inspired by the chaotic
          and anxious feeling of aniexty. I aimed to create jewellery pieces that 
          feel busy and almost out of your control.
          Sterling Silver, Labradorite Beads`,
          price: 190,
          categoryId: 2,
          unitsInStock: 0,
          metal: "Sterling Silver",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234222/IMG_5487_wmrpnq.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Necklace 1",
          description: `Inspired from my own personal story. I wanted to create pieces
          that help the wearer understand what it's like to deal with this condition
          on a daily basis, through the movement of the jewellery pieces.
          Sterling Silver, 9ct Gold Tube, Blue Topaz Setting`,
          price: 400,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234190/IMG_FIBROTUBE_v4nncb.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Necklace 3",
          description: `Inspired from my own personal story. I wanted to create pieces
          that help the wearer understand what it's like to deal with this condition
          on a daily basis, through the movement of the jewellery pieces.
          Sterling Silver, Amethyst`,
          price: 180,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Sterling Silver",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234153/IMG_5502_jdwjvs.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Fibromyalgia Earrings",
          description: `Inspired from my own personal story. I wanted to create pieces
          that help the wearer understand what it's like to deal with this condition
          on a daily basis, through the movement of the jewellery pieces.
          Sterling Silver Tubes, Synthetic Blue Sapphires, 9ct Gold Balls`,
          price: 100,
          categoryId: 2,
          unitsInStock: 1,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234116/IMG-5215_avopaa.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Necklace",
          description: `Inspired by my boyfriend's sister,
          Chloe and some of Chloe's doodles and drawings. The pieces and shapes for 
          this collection are also a metephor for Chloe in her own happy bubble.
          Sterling Silver, 9ct Gold Beads`,
          price: 350,
          categoryId: 1,
          unitsInStock: 1,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234069/IMG_5480_de070o.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Dangle Earrings",
          description: `Inspired by my boyfriend's sister,
          Chloe and some of Chloe's doodles and drawings. The pieces and shapes for 
          this collection are also a metephor for Chloe in her own happy bubble.
          Sterling Silver, 9ct Gold Beads`,
          price: 100,
          categoryId: 2,
          unitsInStock: 0,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597234030/IMG_5555_gxswr0.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Hearing Impairment Bracelet",
          description: `Inspired by my boyfriend's sister,
          Chloe and some of Chloe's doodles and drawings. The pieces and shapes for 
          this collection are also a metephor for Chloe in her own happy bubble.
          Sterling Silver, 9ct Gold Beads`,
          price: 200,
          categoryId: 3,
          unitsInStock: 0,
          metal: "Gold",
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597233951/IMG_5548_hjj3xe.jpg",
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
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597233872/IMG-4613_tqgukq.jpg",
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
          image: "https://res.cloudinary.com/djzjepmnr/image/upload/v1597233834/IMG-6956_ddvqgp.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("products", null, {});
  }
};
