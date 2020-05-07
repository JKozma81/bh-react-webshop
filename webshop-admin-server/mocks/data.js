const products = [
  {
    id: 1,
    sku: 'I1P',
    name: 'iPhone 11 Pro',
    price: 1499,
    description:
      'The iPhone 11 Pro and iPhone 11 Pro Max are smartphones designed, developed and marketed by Apple Inc.',
    specs:
      'Capacity=256GB,Height=144.0mm,Width=71.4mm,Depth=8.1mm,Weight=188grams,Display=5.8‑inch,Chip=A13',
    picture: 'http://localhost:5000/img/I1P/images_2.jpg',
    images: [
      {
        id: 2,
        url: 'http://localhost:5000/img/I1P/download_1.jpg',
        product_id: 1,
      },
      {
        id: 3,
        url: 'http://localhost:5000/img/I1P/images_1.jpg',
        product_id: 1,
      },
    ],
  },
  {
    id: 2,
    sku: 'GR',
    name: 'Gorenje RK4172ANX',
    price: 60,
    description: `Gorenje fridge freezers are highly energy-efficient. Excellent thermal insulation and door sealing, inverter compressor, and electronic 
      or mechanical control efficiently reduce power consumption. Fridge freezers 
      with the`,
    specs: 'Class=A++,Width=550mm,Height=1760mm,Depth=580mm,Capacity=282l',
    picture: 'http://localhost:5000/img/GR/download_2.jpg',
    images: [
      {
        id: 5,
        url: 'http://localhost:5000/img/GR/download.jpg',
        product_id: 2,
      },
    ],
  },
  {
    id: 3,
    sku: 'L4',
    name: 'Lg 43uh603v',
    price: 625,
    description:
      "Fully spec'ed to meet the new high standards in video, the LG 43UH603V is an HDR-equipped TV at a bargain price.",
    specs: 'Display=LED,Resolution=3840x2160,PMI=1200,Audio=20W/2ch',
    picture: 'http://localhost:5000/img/L4/download2.jpg',
    images: [
      {
        id: 7,
        url: 'http://localhost:5000/img/L4/download3.jpg',
        product_id: 3,
      },
      {
        id: 8,
        url: 'http://localhost:5000/img/L4/download.jpg',
        product_id: 3,
      },
    ],
  },
  {
    id: 4,
    sku: 'ARSG',
    name: 'ASUS ROG Strix G531GT-AL106',
    price: 878,
    description:
      'The ROG Strix G embodies streamlined design, offering a formidable core experience for serious gaming and multitasking on Windows 10 Pro.',
    specs:
      'Processor=i7-9750H,Graphics=GTX1660Ti,Display=15.6-inch,Weight=2.395kg',
    picture: 'http://localhost:5000/img/ARSG/download3.jpg',
    images: [
      {
        id: 10,
        url: 'http://localhost:5000/img/ARSG/download2.jpg',
        product_id: 4,
      },
      {
        id: 11,
        url: 'http://localhost:5000/img/ARSG/download4.jpg',
        product_id: 4,
      },
      {
        id: 12,
        url: 'http://localhost:5000/img/ARSG/download.jpg',
        product_id: 4,
      },
    ],
  },
];

const pictures = [
  {
    id: 1,
    url: 'http://localhost:5000/img/I1P/images_2.jpg',
    product_id: 1,
  },
  {
    id: 2,
    url: 'http://localhost:5000/img/I1P/download_1.jpg',
    product_id: 1,
  },
  {
    id: 3,
    url: 'http://localhost:5000/img/I1P/images_1.jpg',
    product_id: 1,
  },
  {
    id: 4,
    url: 'http://localhost:5000/img/GR/download_2.jpg',
    product_id: 2,
  },
  {
    id: 5,
    url: 'http://localhost:5000/img/GR/download.jpg',
    product_id: 2,
  },
  {
    id: 6,
    url: 'http://localhost:5000/img/L4/download2.jpg',
    product_id: 3,
  },
  {
    id: 7,
    url: 'http://localhost:5000/img/L4/download3.jpg',
    product_id: 3,
  },
  {
    id: 8,
    url: 'http://localhost:5000/img/L4/download.jpg',
    product_id: 3,
  },
  {
    id: 9,
    url: 'http://localhost:5000/img/ARSG/download3.jpg',
    product_id: 4,
  },
  {
    id: 10,
    url: 'http://localhost:5000/img/ARSG/download2.jpg',
    product_id: 4,
  },
  {
    id: 11,
    url: 'http://localhost:5000/img/ARSG/download4.jpg',
    product_id: 4,
  },
  {
    id: 12,
    url: 'http://localhost:5000/img/ARSG/download.jpg',
    product_id: 4,
  },
];

module.exports = { products, pictures };
