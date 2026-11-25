// All the made-up shop content lives here, so it is easy to edit in one place.

export const restaurant = {
  name: "Rae's Pizza",
  phone: '(555) 723-7499',
  address: '412 Carmine Street, West Village, New York, NY 10014',
  ticket: '#RP-8492',
}

export const customer = {
  name: 'Alex Morgan',
  email: 'alex.morgan@pizzalover.net',
  phone: '+1 (555) 392-8812',
}

export const specialInstructionsInitial =
  'Please bake the pepperoni well done & crispy crust.'

export const TAX_RATE = 0.0825

export const menuSections = [
  {
    id: 'pizzas-section',
    eyebrow: 'Hand Tossed • Stone Ground',
    title: 'Pizzas (Stone Baked)',
    aside: 'Fermented 48-Hours',
    cardStyle: 'pizza',
    items: [
      {
        id: 'pepperoni',
        name: 'Pepperoni Pizza',
        description:
          'Charred natural-casing beef & pork pepperoni cups, whole-milk mozzarella blend, sweet crushed San Marzano tomato sauce, fresh oregano, and pecorino romano.',
        detail:
          'Cup & char pepperoni, San Marzano sauce, whole milk mozzarella, pecorino',
        image: '/images/pepperoni-pizza.jpg',
        detailImage: '/images/pepperoni-detail.jpg',
        imageLabel: '18" Crispy Edge',
        badge: 'Bestseller',
        badgeStyle: 'primary',
        sizes: [
          { name: 'Small', price: 7 },
          { name: 'Medium', price: 10 },
          { name: 'Large', price: 12.95 },
        ],
        defaultSize: 'Large',
        detailSize: 'Large 18"',
        initialQty: 2,
      },
      {
        id: 'cheese',
        name: 'Cheese Pizza',
        description:
          'Whole-milk shredded mozzarella, dry-aged provolone touch, savory Italian herbed tomato sauce, dusted with aged Parmigiano Reggiano.',
        detail: 'Aged mozzarella blend, organic tomato sauce, garlic oil, oregano',
        image: '/images/cheese-pizza.jpg',
        detailImage: '/images/cheese-detail.jpg',
        imageLabel: 'Neighborhood Classic',
        badgeStyle: 'tertiary',
        sizes: [
          { name: 'Small', price: 6.5 },
          { name: 'Medium', price: 9.25 },
          { name: 'Large', price: 10.95 },
        ],
        defaultSize: 'Medium',
        detailSize: 'Medium 14"',
        initialQty: 1,
      },
      {
        id: 'eggplant',
        name: 'Eggplant Pizza',
        description:
          'Pan-roasted lightly breaded eggplant slices, whipped whole ricotta, sweet basil chiffonade, San Marzano marinara, and fresh garlic oil drizzle.',
        detail: 'Roasted eggplant, whipped ricotta, basil and San Marzano marinara',
        image: '/images/eggplant-pizza.jpg',
        detailImage: '/images/eggplant-pizza.jpg',
        imageLabel: "Chef's Special",
        badgeStyle: 'dark',
        sizes: [
          { name: 'Small', price: 6.75 },
          { name: 'Medium', price: 9.75 },
          { name: 'Large', price: 11.95 },
        ],
        defaultSize: 'Large',
        detailSize: 'Large 16"',
        initialQty: 1,
      },
    ],
  },
  {
    id: 'sides-section',
    eyebrow: 'Hot Sides & Fresh Greens',
    title: 'Sides',
    aside: 'Made fresh to order',
    cardStyle: 'side',
    items: [
      {
        id: 'fries',
        name: 'Fries',
        description:
          'Crisp double-fried Idaho Russets tossed in sea salt, parsley flakes, and roasted garlic dust. Served with homemade marinara dip.',
        detail: 'Skin-on, double fried in sunflower oil, sea salt & rosemary spice',
        image: '/images/fries.jpg',
        detailImage: '/images/fries-detail.jpg',
        badge: 'House Specialty',
        badgeStyle: 'light',
        sizes: [
          { name: 'Small', price: 3.5 },
          { name: 'Large', price: 4.5 },
        ],
        defaultSize: 'Large',
        detailSize: 'Large Basket',
        initialQty: 1,
      },
      {
        id: 'salad',
        name: 'Greek Salad',
        sublabel: 'Single Regular Size',
        description:
          'Crisp Romaine lettuce, kalamata olives, Greek feta block, cucumbers, vine-ripened tomatoes, thinly sliced red onion, oregano vinaigrette.',
        detail: 'Romaine, kalamata olives, feta, cucumbers and oregano vinaigrette',
        image: '/images/greek-salad.jpg',
        detailImage: '/images/greek-salad.jpg',
        badge: 'Vegetarian',
        badgeStyle: 'green',
        sizes: [{ name: 'Regular', price: 7.25 }],
        defaultSize: 'Regular',
        detailSize: 'Regular',
        initialQty: 1,
      },
    ],
  },
  {
    id: 'drinks-section',
    eyebrow: 'Cold Refreshments',
    title: 'Drinks',
    aside: 'Served Ice Cold',
    cardStyle: 'drink',
    items: [
      {
        id: 'coke',
        name: 'Coke',
        description:
          'Classic Coca-Cola served over crushed fountain ice with fresh lemon wedge on request.',
        detail: 'Classic fountain soda served over pebble ice',
        image: '/images/coke.jpg',
        badge: 'Cold Fountain',
        badgeStyle: 'primary',
        sizes: [
          { name: 'Sm', price: 1 },
          { name: 'Med', price: 2 },
          { name: 'Lrg', price: 3 },
        ],
        defaultSize: 'Lrg',
        detailSize: 'Large 24oz',
        initialQty: 2,
      },
      {
        id: 'sprite',
        name: 'Sprite',
        description:
          'Crisp and refreshing lemon-lime flavor fountain beverage poured over fresh pebble ice.',
        detail: 'Lemon-lime fountain soda poured over pebble ice',
        image: '/images/sprite.jpg',
        sizes: [
          { name: 'Sm', price: 1 },
          { name: 'Med', price: 2 },
          { name: 'Lrg', price: 3 },
        ],
        defaultSize: 'Lrg',
        detailSize: 'Large 24oz',
        initialQty: 1,
      },
      {
        id: 'water',
        name: 'Bottled Water',
        sublabel: 'Single Size (750ml)',
        description:
          'Imported pure mountain spring natural mineral water served chilled.',
        detail: 'Imported spring water, served chilled',
        image: '/images/bottled-water.jpg',
        badge: 'Mineral 750ml',
        badgeStyle: 'green-solid',
        sizes: [{ name: 'Bottle', price: 5 }],
        defaultSize: 'Bottle',
        detailSize: '750ml',
        initialQty: 1,
      },
    ],
  },
]

export const menuItems = menuSections.flatMap((section) => section.items)

export const findMenuItem = (id) => menuItems.find((item) => item.id === id)

// The order shown in the Stitch design, ready to be changed by the student.
export const initialCart = [
  {
    key: 'pepperoni-Large',
    itemId: 'pepperoni',
    name: 'Pepperoni Pizza',
    size: 'Large',
    sizeLabel: 'Large 18"',
    price: 12.95,
    qty: 2,
    note: 'Well-done crust • Hot chili oil on side',
    detail: 'Cup & char pepperoni, San Marzano sauce, whole milk mozzarella, pecorino',
    image: '/images/pepperoni-detail.jpg',
  },
  {
    key: 'cheese-Medium',
    itemId: 'cheese',
    name: 'Cheese Pizza',
    size: 'Medium',
    sizeLabel: 'Medium 14"',
    price: 9.25,
    qty: 1,
    note: 'Classic fresh oregano',
    detail: 'Aged mozzarella blend, organic tomato sauce, garlic oil, oregano',
    image: '/images/cheese-detail.jpg',
  },
  {
    key: 'fries-Large',
    itemId: 'fries',
    name: 'Fries',
    size: 'Large',
    sizeLabel: 'Large Basket',
    price: 4.5,
    qty: 1,
    note: '+ House Garlic Marinara dip',
    detail: 'Skin-on, double fried in sunflower oil, sea salt & rosemary spice',
    image: '/images/fries-detail.jpg',
  },
  {
    key: 'coke-Lrg',
    itemId: 'coke',
    name: 'Coke',
    size: 'Lrg',
    sizeLabel: 'Large 24oz',
    price: 3,
    qty: 2,
    note: 'Extra ice requested',
    detail: 'Classic fountain soda served over pebble ice',
    image: null,
  },
]
