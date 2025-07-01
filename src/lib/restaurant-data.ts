
export type MenuItem = {
  name: string;
  price: string;
};

export type Restaurant = {
  name: string;
  slug: string;
  category: string;
  image: string;
  hint: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  menu?: MenuItem[];
};

function slugify(text: string) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

const restaurantDetails: Omit<Restaurant, 'name' | 'slug' | 'category' | 'image' | 'hint'>[] = [
  {
    address: "Jl. Pajajaran Indah V No. 7, Baranangsiang, Bogor",
    latitude: -6.6045,
    longitude: 106.8093,
    menu: [
      { name: "Nasi Goreng Spesial", price: "45.000" },
      { name: "Rendang Daging", price: "55.000" },
      { name: "Sate Ayam (10 tusuk)", price: "50.000" },
    ],
  },
  {
    address: "Jl. Salak No. 24, Babakan, Bogor Tengah",
    latitude: -6.5912,
    longitude: 106.7932,
    menu: [
      { name: "Margherita Pizza", price: "85.000" },
      { name: "Fettuccine Carbonara", price: "95.000" },
      { name: "Tiramisu", price: "60.000" },
    ],
  },
  {
    address: "Botani Square Mall, Lt. 2, Jl. Raya Pajajaran, Bogor",
    latitude: -6.5971,
    longitude: 106.8062,
    menu: [
      { name: "Salmon Sashimi (5 pcs)", price: "75.000" },
      { name: "Dragon Roll", price: "110.000" },
      { name: "Chicken Katsu Don", price: "80.000" },
    ],
  },
  {
    address: "Jl. Achmad Adnawijaya No. 150, Tegal Gundil, Bogor",
    latitude: -6.5732,
    longitude: 106.8099,
    menu: [
      { name: "Classic Cheeseburger", price: "70.000" },
      { name: "BBQ Bacon Burger", price: "85.000" },
      { name: "Loaded Fries", price: "50.000" },
    ],
  },
  {
    address: "Jl. Raya Puncak - Cianjur No. 56, Cisarua, Bogor",
    latitude: -6.7025,
    longitude: 106.9400,
    menu: [
      { name: "Nasi Timbel Komplit", price: "65.000" },
      { name: "Gurame Bakar", price: "90.000" },
      { name: "Sayur Asem", price: "25.000" },
    ],
  },
  {
    address: "Jl. Surya Kencana No. 285, Gudang, Bogor Tengah",
    latitude: -6.6033,
    longitude: 106.7999,
    menu: [
      { name: "Paket Rendang", price: "35.000" },
      { name: "Ayam Pop", price: "28.000" },
      { name: "Gulai Tunjang", price: "30.000" },
    ],
  },
    {
    address: "Jl. Siliwangi No. 1, Sukasari, Bogor Timur",
    latitude: -6.6120,
    longitude: 106.8065,
    menu: [
      { name: "Ayam Kung Pao", price: "75.000" },
      { name: "Sapo Tahu Seafood", price: "80.000" },
      { name: "Fuyunghai", price: "65.000" },
    ],
  },
  {
    address: "Jl. Pangrango No. 19, Babakan, Bogor Tengah",
    latitude: -6.5928,
    longitude: 106.7981,
    menu: [
      { name: "Tacos al Pastor (3 pcs)", price: "90.000" },
      { name: "Chicken Burrito", price: "105.000" },
      { name: "Nachos Grande", price: "85.000" },
    ],
  },
  {
    address: "AEON Mall Sentul City, Lt. 1, Sentul, Bogor",
    latitude: -6.5738,
    longitude: 106.8491,
    menu: [
      { name: "Beef Bulgogi Set", price: "150.000" },
      { name: "Kimchi Jjigae", price: "95.000" },
      { name: "Japchae", price: "85.000" },
    ],
  },
  {
    address: "Jl. Bina Marga I No. 1C, Baranangsiang, Bogor Timur",
    latitude: -6.6081,
    longitude: 106.8145,
    menu: [
      { name: "Butter Chicken", price: "110.000" },
      { name: "Lamb Biryani", price: "130.000" },
      { name: "Garlic Naan", price: "30.000" },
    ],
  },
];


const baseRestaurants: Omit<Restaurant, 'slug' | 'address' | 'latitude' | 'longitude' | 'menu'>[] = [
  { name: "Sari Nusantara", category: "Masakan Indonesia", image: "/images/Sari Nusantara.jpg", hint: "nasi rames" },
  { name: "La Pizzeria", category: "Masakan Italia", image: "/images/La Pizzeria.jpg", hint: "wood-fired pizza" },
  { name: "Sakura Sushi Bar", category: "Masakan Jepang", image: "/images/placeholder.png", hint: "sushi roll" },
  { name: "Big Bite Burgers", category: "Masakan Amerika", image: "/images/placeholder.png", hint: "cheeseburger fries" },
  { name: "Warung Sunda Asri", category: "Masakan Sunda", image: "/images/placeholder.png", hint: "nasi liwet" },
  { name: "Rendang Express", category: "Masakan Padang", image: "/images/placeholder.png", hint: "rendang sapi" },
  { name: "Captain's Catch", category: "Makanan Laut", image: "/images/placeholder.png", hint: "grilled seafood" },
  { name: "Mie Juara", category: "Mi & Bakso", image: "/images/placeholder.png", hint: "mie ayam" },
  { name: "Kopi Sudut", category: "Kafe", image: "/images/placeholder.png", hint: "cappuccino pastry" },
  { name: "Golden Wok", category: "Masakan Cina", image: "/images/placeholder.png", hint: "kung pao" },
  { name: "El Agave", category: "Masakan Meksiko", image: "/images/placeholder.png", hint: "tacos burritos" },
  { name: "Bangkok Street", category: "Masakan Thailand", image: "/images/placeholder.png", hint: "pad thai" },
  { name: "Seoul Garden", category: "Masakan Korea", image: "/images/placeholder.png", hint: "korean bbq" },
  { name: "Delhi Spice", category: "Masakan India", image: "/images/placeholder.png", hint: "butter chicken" },
  { name: "Grill House", category: "Steakhouse", image: "/images/placeholder.png", hint: "ribeye steak" },
  { name: "Dapur Ibu", category: "Masakan Rumahan", image: "/images/placeholder.png", hint: "home cooking" },
  { name: "Salad Story", category: "Makanan Sehat", image: "/images/placeholder.png", hint: "fresh salad" },
  { name: "Sweet Treats", category: "Dessert", image: "/images/placeholder.png", hint: "chocolate cake" },
  { name: "Bebek Renyah", category: "Masakan Bali", image: "/images/placeholder.png", hint: "crispy duck" },
  { name: "Soto Legendaris", category: "Soto & Sup", image: "/images/placeholder.png", hint: "soto ayam" },
  { name: "Pasta Fresca", category: "Masakan Italia", image: "/images/placeholder.png", hint: "handmade pasta" },
  { name: "Ramen Ichiban", category: "Masakan Jepang", image: "/images/placeholder.png", hint: "tonkotsu ramen" },
  { name: "The Grill Sergeant", category: "Masakan Amerika", image: "/images/placeholder.png", hint: "bbq ribs" },
  { name: "Saung Kuring", category: "Masakan Sunda", image: "/images/placeholder.png", hint: "gurame bakar" },
  { name: "Simpang Raya", category: "Masakan Padang", image: "/images/placeholder.png", hint: "ayam pop" },
  { name: "Crab Shack", category: "Makanan Laut", image: "/images/placeholder.png", hint: "chilli crab" },
  { name: "Bakso President", category: "Mi & Bakso", image: "/images/placeholder.png", hint: "bakso urat" },
  { name: "Morning Brew", category: "Kafe", image: "/images/placeholder.png", hint: "espresso croissant" },
  { name: "Peking Duck House", category: "Masakan Cina", image: "/images/placeholder.png", hint: "peking duck" },
  { name: "Taco Fiesta", category: "Masakan Meksiko", image: "/images/placeholder.png", hint: "street tacos" },
  { name: "Thai Orchid", category: "Masakan Thailand", image: "/images/placeholder.png", hint: "green curry" },
  { name: "Kimchi Jjigae", category: "Masakan Korea", image: "/images/placeholder.png", hint: "kimchi stew" },
  { name: "Ganesha's Kitchen", category: "Masakan India", image: "/images/placeholder.png", hint: "naan bread" },
  { name: "The Butcher's Table", category: "Steakhouse", image: "/images/placeholder.png", hint: "t-bone steak" },
  { name: "Warisan Nenek", category: "Masakan Rumahan", image: "/images/placeholder.png", hint: "grandma recipe" },
  { name: "Green Goodness", category: "Makanan Sehat", image: "/images/placeholder.png", hint: "smoothie bowl" },
  { name: "Gelato Paradise", category: "Dessert", image: "/images/placeholder.png", hint: "italian gelato" },
  { name: "Ayam Betutu Khas", category: "Masakan Bali", image: "/images/placeholder.png", hint: "balinese chicken" },
  { name: "Sup Buntut Juara", category: "Soto & Sup", image: "/images/placeholder.png", hint: "oxtail soup" },
  { name: "Nasi Goreng Gila", category: "Masakan Indonesia", image: "/images/placeholder.png", hint: "crazy fried-rice" },
  { name: "Trattoria Romana", category: "Masakan Italia", image: "/images/placeholder.png", hint: "lasagna classic" },
  { name: "Udon Master", category: "Masakan Jepang", image: "/images/placeholder.png", hint: "tempura udon" },
  { name: "Diner 66", category: "Masakan Amerika", image: "/images/placeholder.png", hint: "milkshake pancakes" },
  { name: "Cibiuk Resto", category: "Masakan Sunda", image: "/images/placeholder.png", hint: "sambal dadak" },
  { name: "Garuda Restaurant", category: "Masakan Padang", image: "/images/placeholder.png", hint: "gulai otak" },
  { name: "The Holy Crab", category: "Makanan Laut", image: "/images/placeholder.png", hint: "cajun seafood" },
  { name: "Kwetiau Akang", category: "Mi & Bakso", image: "/images/placeholder.png", hint: "fried kwetiau" },
  { name: "Daily Grind Cafe", category: "Kafe", image: "/images/placeholder.png", hint: "americano coffee" },
  { name: "Imperial Kitchen", category: "Masakan Cina", image: "/images/placeholder.png", hint: "lamian noodles" },
  { name: "Hola Amigo", category: "Masakan Meksiko", image: "/images/placeholder.png", hint: "quesadilla cheese" },
  { name: "Tom Yum Goong", category: "Masakan Thailand", image: "/images/placeholder.png", hint: "spicy soup" },
  { name: "Bulgogi Brothers", category: "Masakan Korea", image: "/images/placeholder.png", hint: "beef bulgogi" },
  { name: "Queen's Tandoor", category: "Masakan India", image: "/images/placeholder.png", hint: "tandoori chicken" },
  { name: "AB Steak", category: "Steakhouse", image: "/images/placeholder.png", hint: "dry-aged steak" },
  { name: "Pondok Lauk", category: "Masakan Rumahan", image: "/images/placeholder.png", hint: "fish dishes" },
  { name: "Veggie Victory", category: "Makanan Sehat", image: "/images/placeholder.png", hint: "vegan burger" },
  { name: "Crepe Signature", category: "Dessert", image: "/images/placeholder.png", hint: "sweet crepe" },
  { name: "Warung Babi Guling", category: "Masakan Bali", image: "/images/placeholder.png", hint: "suckling pig" },
  { name: "Rawon Setan", category: "Soto & Sup", image: "/images/placeholder.png", hint: "beef black-soup" },
  { name: "Sate Padang Ajo Ramon", category: "Masakan Indonesia", image: "/images/placeholder.png", hint: "padang satay" },
  { name: "Osteria Gia", category: "Masakan Italia", image: "/images/placeholder.png", hint: "classic italian" },
  { name: "Kintan Buffet", category: "Masakan Jepang", image: "/images/placeholder.png", hint: "yakiniku buffet" },
  { name: "Texas Chicken", category: "Masakan Amerika", image: "/images/placeholder.png", hint: "fried chicken" },
  { name: "Alam Sunda", category: "Masakan Sunda", image: "/images/placeholder.png", hint: "sundanese buffet" },
  { name: "Sederhana Bintaro", category: "Masakan Padang", image: "/images/placeholder.png", hint: "padang buffet" },
  { name: "Cut The Crab", category: "Makanan Laut", image: "/images/placeholder.png", hint: "seafood boil" },
  { name: "Bakmi Aloi", category: "Mi & Bakso", image: "/images/placeholder.png", hint: "pork noodle" },
  { name: "Anomali Coffee", category: "Kafe", image: "/images/placeholder.png", hint: "indonesian coffee" },
  { name: "Din Tai Fung", category: "Masakan Cina", image: "/images/placeholder.png", hint: "xiao long-bao" },
  { name: "Gonzo's Tex-Mex", category: "Masakan Meksiko", image: "/images/placeholder.png", hint: "nachos grande" },
  { name: "Santhai", category: "Masakan Thailand", image: "/images/placeholder.png", hint: "mango sticky-rice" },
  { name: "Oppa Dak", category: "Masakan Korea", image: "/images/placeholder.png", hint: "korean fried-chicken" },
  { name: "The Royal Kitchen", category: "Masakan India", image: "/images/placeholder.png", hint: "biryani rice" },
  { name: "Wolfgang's Steakhouse", category: "Steakhouse", image: "/images/placeholder.png", hint: "porterhouse steak" },
  { name: "Kedai Kita", category: "Masakan Rumahan", image: "/images/placeholder.png", hint: "family restaurant" },
  { name: "Fedwell", category: "Makanan Sehat", image: "/images/placeholder.png", hint: "healthy bowl" },
  { name: "D'Crepes", category: "Dessert", image: "/images/placeholder.png", hint: "savory crepe" },
  { name: "Naughty Nuri's", category: "Masakan Bali", image: "/images/placeholder.png", hint: "bbq pork-ribs" },
  { name: "Coto Makassar", category: "Soto & Sup", image: "/images/placeholder.png", hint: "makassar soup" },
  { name: "Pempek Pak Raden", category: "Masakan Indonesia", image: "/images/placeholder.png", hint: "fish cake" },
  { name: "Mamma Rosy", category: "Masakan Italia", image: "/images/placeholder.png", hint: "homestyle italian" },
  { name: "Genki Sushi", category: "Masakan Jepang", image: "/images/placeholder.png", hint: "conveyor belt-sushi" },
  { name: "Carl's Jr.", category: "Masakan Amerika", image: "/images/placeholder.png", hint: "western burger" },
  { name: "Talaga Sampireun", category: "Masakan Sunda", image: "/images/placeholder.png", hint: "floating restaurant" },
  { name: "Pagi Sore Rawamangun", category: "Masakan Padang", image: "/images/placeholder.png", hint: "jengkol balado" },
  { name: "Bandar Djakarta", category: "Makanan Laut", image: "/images/placeholder.png", hint: "live seafood" },
  { name: "Mie Gacoan", category: "Mi & Bakso", image: "/images/placeholder.png", hint: "spicy noodle" },
  { name: "Starbucks Reserve", category: "Kafe", image: "/images/placeholder.png", hint: "premium coffee" },
  { name: "The Duck King", category: "Masakan Cina", image: "/images/placeholder.png", hint: "roasted duck" },
  { name: "Super Loco", category: "Masakan Meksiko", image: "/images/placeholder.png", hint: "mexican corn" },
  { name: "Greyhound Cafe", category: "Masakan Thailand", image: "/images/placeholder.png", hint: "thai fusion" },
  { name: "Mujigae", category: "Masakan Korea", image: "/images/placeholder.png", hint: "bibimbap bowl" },
  { name: "Accha", category: "Masakan India", image: "/images/placeholder.png", hint: "indian street-food" },
  { name: "Bistecca", category: "Steakhouse", image: "/images/placeholder.png", hint: "florentine steak" },
  { name: "Kafe Betawi", category: "Masakan Rumahan", image: "/images/placeholder.png", hint: "betawi food" },
  { name: "Burgreens", category: "Makanan Sehat", image: "/images/placeholder.png", hint: "plant-based food" },
  { name: "Shihlin Taiwan Street Snacks", category: "Jajanan", image: "/images/placeholder.png", hint: "xxl crispy-chicken" }
];

// Combine base data with detailed data
export const allRestaurants: Restaurant[] = baseRestaurants.map((base, index) => {
  const detail = index < restaurantDetails.length ? restaurantDetails[index] : {};
  return {
    ...base,
    slug: slugify(base.name),
    ...detail,
  };
});
