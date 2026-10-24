/* =========================================================
   products.js
   Central product catalogue + rendering / filter / sort / search
   ========================================================= */

// ---- Product Catalogue ----
// IMAGE CONVENTION: every `img` is an Unsplash or Pexels photo that shows the garment on
// a person of the product's own section — men for Men, women for Women and
// children for Kids — and matches the product type (a saree shows a saree, a
// school uniform shows a child in uniform, and so on). When adding a product,
// pick a photo whose description matches both its section and its garment.
// If an image ever fails to load, productImgFallback() swaps in a neutral
// placeholder so the card never shows a broken-image icon.
const PRODUCTS = [
  // ---------- Men ----------
  { id:1,  name:"Obsidian Leather Jacket",   section:"Men",   type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:8399, oldPrice:10699, rating:4.7, reviews:98,  img:"https://images.unsplash.com/photo-1592158249887-ac6ae7921691?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#0b0b0d","#4a2545"], sizes:["S","M","L","XL"], desc:"Full-grain leather jacket with quilted lining, tailored for a sharp silhouette in every season." },
  { id:2,  name:"Heritage Denim Jacket",     section:"Men",   type:"Casual Wear", cat:"Apparel", brand:"Noir & Co", price:4899, oldPrice:6699, rating:4.2, reviews:64,  img:"https://images.unsplash.com/photo-1527016021513-b09758b777bd?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#4c6fff","#0b0b0d"], sizes:["S","M","L","XL"], desc:"Rigid selvedge denim that softens beautifully with wear, cut for a relaxed fit." },
  { id:3,  name:"Alpine Wool Sweater",       section:"Men",   type:"Winter Wear", cat:"Apparel", brand:"Nordstep",  price:4299, oldPrice:5399,  rating:4.3, reviews:112, img:"https://images.unsplash.com/photo-1608975321561-176c1b187d24?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#55524c","#4a2545","#fafaf8"], sizes:["S","M","L","XL"], desc:"Merino wool knit that regulates temperature in every season, made for layering." },
  { id:4,  name:"Oxford Button-Down Shirt",  section:"Men",   type:"Formal Wear", cat:"Apparel", brand:"Aurelia",   price:3499, oldPrice:4399,  rating:4.4, reviews:88,  img:"https://images.unsplash.com/photo-1603252109612-24fa03d145c8?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#fafaf8","#4c6fff","#0b0b0d"], sizes:["S","M","L","XL"], desc:"Crisp cotton oxford with a tailored cut, equally at home at the office or off-duty." },
  { id:5,  name:"Tailored Chino Trousers",   section:"Men",   type:"Formal Wear", cat:"Apparel", brand:"Nordstep",  price:3899, oldPrice:4999,  rating:4.1, reviews:73,  img:"https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#55524c","#0b0b0d","#d4af6a"], sizes:["30","32","34","36"], desc:"Stretch-cotton chinos with a clean taper, built to move from desk to dinner." },
  { id:6,  name:"Wool-Blend Overcoat",       section:"Men",   type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:9899, oldPrice:12899, rating:4.8, reviews:57,  img:"https://images.unsplash.com/photo-1619603364904-c0498317e145?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#0b0b0d","#55524c"], sizes:["S","M","L","XL"], desc:"A double-breasted wool-blend overcoat with a sharp lapel, cut for a long, lean line." },
  { id:19, name:"Men's Bandhgala Kurta Set", section:"Men",   type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:4599, oldPrice:6199, rating:4.5, reviews:41, img:"https://images.unsplash.com/photo-1770359993283-a2c2f386584e?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#9c7a3c","#0b0b0d","#4a2545"], sizes:["S","M","L","XL"], desc:"A hand-embroidered kurta and Nehru-collar jacket set, tailored for festive occasions." },
  { id:20, name:"Men's Performance Track Jacket", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3399, oldPrice:4399, rating:4.3, reviews:66, img:"https://images.unsplash.com/photo-1511107426995-9f2a136ea788?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#0b0b0d","#4c6fff","#fafaf8"], sizes:["S","M","L","XL"], desc:"Moisture-wicking mesh panels and a full-zip front, built for training and travel alike." },
  { id:21, name:"Men's Graphic Crew Tee",    section:"Men",   type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2099, oldPrice:2799, rating:4.1, reviews:120, img:"https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#0b0b0d","#fafaf8","#4c6fff"], sizes:["S","M","L","XL"], desc:"100% combed cotton tee with a bold graphic print, pre-shrunk for a lasting fit." },

  // ---------- Women ----------
  { id:7,  name:"Cascade Puffer Coat",       section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Nordstep",  price:7299, oldPrice:9599, rating:4.3, reviews:156, img:"https://images.unsplash.com/photo-1776466532037-3e23b94dc1f1?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#4c6fff","#0b0b0d","#fafaf8"], sizes:["S","M","L","XL"], desc:"Thermal-mapped insulation keeps you warm without the bulk, wrapped in a water-repellent shell." },
  { id:8,  name:"Silk Wrap Blouse",          section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Meridian",  price:4499, oldPrice:5799, rating:4.5, reviews:64,  img:"https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#fafaf8","#4a2545","#d4af6a"], sizes:["XS","S","M","L"], desc:"Fluid mulberry silk with a soft wrap neckline that drapes beautifully in every fabric fold." },
  { id:9,  name:"Meridian Wrap Dress",       section:"Women", type:"Western Wear", cat:"Apparel", brand:"Meridian",  price:6199, oldPrice:7899, rating:4.6, reviews:91,  img:"https://images.unsplash.com/photo-1586693231040-e89840e7d805?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#4a2545","#0b0b0d","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"A flattering wrap silhouette in a fluid crepe fabric that transitions from day to evening." },
  { id:10, name:"Cashmere Cardigan",         section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Aurelia",   price:6899, oldPrice:8799, rating:4.7, reviews:102, img:"https://images.unsplash.com/photo-1610288311735-39b7facbd095?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#fafaf8","#d4af6a","#55524c"], sizes:["XS","S","M","L"], desc:"100% pure cashmere knit, soft against the skin with a relaxed, oversized fit." },
  { id:11, name:"Tailored Blazer",           section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Noir & Co", price:7899, oldPrice:9899, rating:4.5, reviews:69,  img:"https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#0b0b0d","#55524c"], sizes:["XS","S","M","L","XL"], desc:"A sharply structured blazer with a nipped waist, built to anchor any outfit." },
  { id:12, name:"Pleated Midi Skirt",        section:"Women", type:"Western Wear", cat:"Apparel", brand:"Meridian",  price:3899, oldPrice:4999,  rating:4.2, reviews:47,  img:"https://images.unsplash.com/photo-1547116180-3872338a567b?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#4a2545","#fafaf8","#d4af6a"], sizes:["XS","S","M","L"], desc:"Fine box pleats that swing with every step, finished with a comfortable elastic waistband." },
  { id:22, name:"Embroidered Anarkali Suit", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:4999, oldPrice:6799, rating:4.6, reviews:78, img:"https://images.unsplash.com/photo-1769063382706-8156b3b33eac?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#4a2545","#9c7a3c","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"A floor-sweeping Anarkali with fine thread embroidery, paired with matching churidar and dupatta." },
  { id:23, name:"Handwoven Silk Saree",      section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:6499, oldPrice:8399, rating:4.8, reviews:52, img:"https://images.unsplash.com/photo-1628477116196-48afe0d209e0?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#9c7a3c","#4a2545","#0b0b0d"], sizes:["One Size"], desc:"Pure silk saree with a hand-woven zari border, comes with an unstitched matching blouse piece." },
  { id:24, name:"Women's Yoga Leggings",     section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2699, oldPrice:3599, rating:4.4, reviews:134, img:"https://images.unsplash.com/photo-1618259181324-86a49fe68099?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#0b0b0d","#4c6fff","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"Four-way stretch fabric with a high waistband, squat-proof and sweat-wicking." },
  { id:25, name:"Women's Ribbed Crop Top",   section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2199, oldPrice:2899, rating:4.0, reviews:96, img:"https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#fafaf8","#0b0b0d","#4a2545"], sizes:["XS","S","M","L"], desc:"Soft ribbed knit crop top with a fitted silhouette, a wardrobe staple for layering." },

  // ---------- Kids ----------
  { id:13, name:"Little Explorer Puffer Vest", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Little Aurelia", price:2799, oldPrice:3699, rating:4.4, reviews:38, img:"https://images.pexels.com/photos/12463504/pexels-photo-12463504.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#4c6fff","#d4af6a","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A lightweight, packable puffer vest that keeps little ones warm on the move." },
  { id:14, name:"Denim Dungaree Overalls",   section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Little Aurelia", price:2999, oldPrice:3999, rating:4.5, reviews:52, img:"https://images.unsplash.com/photo-1600174471006-7fd4a8d3eb64?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#4c6fff","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"Hard-wearing denim dungarees with adjustable straps for room to grow." },
  { id:15, name:"Cozy Cable-Knit Sweater",   section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Little Aurelia", price:2599, oldPrice:3399, rating:4.6, reviews:61, img:"https://images.pexels.com/photos/5559989/pexels-photo-5559989.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#d4af6a","#fafaf8","#4a2545"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A soft cable-knit pullover in breathable cotton, made for everyday play." },
  { id:16, name:"Rainy Day Hooded Jacket",   section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Nordstep",       price:2899, oldPrice:3799, rating:4.3, reviews:29, img:"https://images.unsplash.com/photo-1710425809357-5d595cde0ebc?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#4c6fff","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"Fully seam-sealed and waterproof, with a roomy hood built to fit over a hat." },
  { id:17, name:"Graphic Print Hoodie",      section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Little Aurelia", price:2499, oldPrice:3299, rating:4.4, reviews:44, img:"https://images.pexels.com/photos/14980502/pexels-photo-14980502.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#0b0b0d","#fafaf8","#4c6fff"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"Brushed-fleece hoodie with a playful print, soft enough for all-day wear." },
  { id:18, name:"Corduroy Play Pants",       section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Little Aurelia", price:2599, oldPrice:3399, rating:4.2, reviews:33, img:"https://images.pexels.com/photos/8084059/pexels-photo-8084059.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#9c7a3c","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"Durable corduroy pants with reinforced knees, built to survive the playground." },
  { id:26, name:"Kids Ethnic Kurta Pajama Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:2999, oldPrice:3999, rating:4.5, reviews:27, img:"https://images.pexels.com/photos/17015449/pexels-photo-17015449.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-25%", colors:["#9c7a3c","#4a2545","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A festive kurta-pajama set in breathable cotton, complete with matching Nehru jacket." },
  { id:27, name:"Kids Party Frock",          section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:3099, oldPrice:4099, rating:4.6, reviews:35, img:"https://images.pexels.com/photos/35051542/pexels-photo-35051542.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#4a2545","#d4af6a","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A twirl-ready tulle party frock with a satin sash, perfect for birthdays and celebrations." },
  { id:28, name:"Kids Track Suit Set",       section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2699, oldPrice:3599, rating:4.3, reviews:31, img:"https://images.pexels.com/photos/19900239/pexels-photo-19900239.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-25%", colors:["#0b0b0d","#4c6fff","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A breathable two-piece track suit built for the playground, park, and everything between." },
  { id:29, name:"Kids School Uniform Set",   section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:2799, oldPrice:3699, rating:4.2, reviews:22, img:"https://images.unsplash.com/photo-1698992939360-7a413b5419ce?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#4c6fff","#fafaf8","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y"], desc:"A durable, easy-iron shirt and trouser set built to survive a full week of school." },

  // ---------- Extended Catalogue (generated) ----------
  { id:30, name:"Premium Cargo Pants", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2399, oldPrice:3099, rating:4.6, reviews:294, img:"https://images.unsplash.com/photo-1601561446301-fecc99036f4b?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#0b0b0d","#9c7a3c","#55524c"], sizes:["S","M","L","XL"], desc:"A relaxed-fit cargo pants in breathable cotton, built for everyday wear." },
  { id:31, name:"Urban Waistcoat", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Aurelia", price:6299, oldPrice:7899, rating:4.1, reviews:294, img:"https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#9c7a3c","#d4af6a"], sizes:["S","M","L","XL"], desc:"A sharply tailored waistcoat, finished with a clean silhouette for the office or beyond." },
  { id:32, name:"Everyday Thermal Sweatshirt", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:7499, oldPrice:9799, rating:4.1, reviews:187, img:"https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#55524c","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A cold-weather thermal sweatshirt with insulated warmth that doesn't sacrifice mobility." },
  { id:33, name:"Weekend Pathani Suit", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:4099, oldPrice:5699, rating:4.6, reviews:289, img:"https://images.unsplash.com/photo-1785613589986-0ffdb2880575?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#fafaf8","#d4af6a","#4c6fff"], sizes:["S","M","L","XL"], desc:"A festive pathani suit in hand-finished fabric, tailored for celebrations." },
  { id:34, name:"Weekend Sports Tracksuit", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2699, oldPrice:3699, rating:3.9, reviews:131, img:"https://images.unsplash.com/photo-1625812186413-b53f782e7253?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#7b4fe0","#55524c"], sizes:["S","M","L","XL"], desc:"A performance sports tracksuit in moisture-wicking fabric, built for training days." },
  { id:35, name:"Modern Bomber Jacket", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Nordstep", price:2299, oldPrice:2999, rating:4.1, reviews:151, img:"https://images.unsplash.com/photo-1629353689974-af4d5c70440f?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#7b4fe0","#fafaf8"], sizes:["S","M","L","XL"], desc:"A relaxed-fit bomber jacket in breathable cotton, built for everyday wear." },
  { id:36, name:"Premium Formal Vest", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Noir & Co", price:5999, oldPrice:7799, rating:4.2, reviews:43, img:"https://images.unsplash.com/photo-1593030103066-0093718efeb9?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#4a2545","#7b4fe0"], sizes:["S","M","L","XL"], desc:"A sharply tailored formal vest, finished with a clean silhouette for the office or beyond." },
  { id:37, name:"Essential Thermal Sweatshirt", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:6499, oldPrice:8399, rating:4.4, reviews:249, img:"https://images.unsplash.com/photo-1611817757591-c3f345024273?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#4c6fff","#fafaf8","#4a2545"], sizes:["S","M","L","XL"], desc:"A cold-weather thermal sweatshirt with insulated warmth that doesn't sacrifice mobility." },
  { id:38, name:"Weekend Dhoti Kurta Set", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:4899, oldPrice:6999, rating:4.3, reviews:127, img:"https://images.unsplash.com/photo-1781106784282-decc68f223ee?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#fafaf8","#55524c","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A festive dhoti kurta set in hand-finished fabric, tailored for celebrations." },
  { id:39, name:"Everyday Running Shorts", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3199, oldPrice:4299, rating:4.3, reviews:320, img:"https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#0b0b0d","#4a2545","#55524c"], sizes:["S","M","L","XL"], desc:"A performance running shorts in moisture-wicking fabric, built for training days." },
  { id:40, name:"Urban Cargo Pants", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Nordstep", price:2999, oldPrice:3799, rating:4.5, reviews:72, img:"https://images.unsplash.com/photo-1623200693945-ec1e9991039a?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#4c6fff","#7b4fe0","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A relaxed-fit cargo pants in breathable cotton, built for everyday wear." },
  { id:41, name:"Urban Formal Suit Set", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Aurelia", price:3899, oldPrice:5499, rating:4.2, reviews:274, img:"https://images.unsplash.com/photo-1617113930975-f9c7243ae527?w=600&q=80&auto=format&fit=crop", badge:"-29%", colors:["#4a2545","#55524c"], sizes:["S","M","L","XL"], desc:"A sharply tailored formal suit set, finished with a clean silhouette for the office or beyond." },
  { id:42, name:"Urban Fleece Hoodie", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Aurelia", price:3499, oldPrice:4799, rating:4.4, reviews:72, img:"https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#7b4fe0","#0b0b0d","#fafaf8"], sizes:["S","M","L","XL"], desc:"A cold-weather fleece hoodie with insulated warmth that doesn't sacrifice mobility." },
  { id:43, name:"Signature Dhoti Kurta Set", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:6399, oldPrice:8599, rating:4.0, reviews:287, img:"https://images.unsplash.com/photo-1785613589986-0ffdb2880575?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#9c7a3c","#d4af6a"], sizes:["S","M","L","XL"], desc:"A festive dhoti kurta set in hand-finished fabric, tailored for celebrations." },
  { id:44, name:"Urban Gym Tank Top", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3599, oldPrice:4799, rating:4.1, reviews:291, img:"https://images.unsplash.com/photo-1515983539152-eb96fd393c3c?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#55524c","#4a2545","#9c7a3c"], sizes:["S","M","L","XL"], desc:"A performance gym tank top in moisture-wicking fabric, built for training days." },
  { id:45, name:"Urban Cargo Shorts", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Aurelia", price:2699, oldPrice:3399, rating:4.1, reviews:188, img:"https://images.unsplash.com/photo-1601561446301-fecc99036f4b?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#7b4fe0","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A relaxed-fit cargo shorts in breathable cotton, built for everyday wear." },
  { id:46, name:"Essential Dress Shirt", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Aurelia", price:3699, oldPrice:5299, rating:4.8, reviews:51, img:"https://images.unsplash.com/photo-1594938291221-94f18cbb5660?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#d4af6a","#4a2545"], sizes:["S","M","L","XL"], desc:"A sharply tailored dress shirt, finished with a clean silhouette for the office or beyond." },
  { id:47, name:"Urban Padded Vest", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:4699, oldPrice:6499, rating:4.8, reviews:310, img:"https://images.unsplash.com/photo-1613422448762-c13f05ae758a?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#9c7a3c","#55524c"], sizes:["S","M","L","XL"], desc:"A cold-weather padded vest with insulated warmth that doesn't sacrifice mobility." },
  { id:48, name:"Signature Sherwani", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3299, oldPrice:4499, rating:4.3, reviews:225, img:"https://images.unsplash.com/photo-1785613590152-63d713bc94b4?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#fafaf8","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A festive sherwani in hand-finished fabric, tailored for celebrations." },
  { id:49, name:"Signature Compression Tee", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2799, oldPrice:3599, rating:4.4, reviews:86, img:"https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#d4af6a","#7b4fe0"], sizes:["S","M","L","XL"], desc:"A performance compression tee in moisture-wicking fabric, built for training days." },
  { id:50, name:"Studio Hooded Sweatshirt", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:3099, oldPrice:4399, rating:4.5, reviews:40, img:"https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#fafaf8","#55524c"], sizes:["S","M","L","XL"], desc:"A relaxed-fit hooded sweatshirt in breathable cotton, built for everyday wear." },
  { id:51, name:"Heritage Waistcoat", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Aurelia", price:5699, oldPrice:7599, rating:4.8, reviews:45, img:"https://images.unsplash.com/photo-1618886614638-80e3c103d31a?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#0b0b0d","#7b4fe0","#4c6fff"], sizes:["S","M","L","XL"], desc:"A sharply tailored waistcoat, finished with a clean silhouette for the office or beyond." },
  { id:52, name:"Premium Wool Muffler Set", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:7499, oldPrice:10399, rating:4.6, reviews:299, img:"https://images.unsplash.com/photo-1599032909736-0155c1d43a6c?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#7b4fe0","#4c6fff"], sizes:["S","M","L","XL"], desc:"A cold-weather wool muffler set with insulated warmth that doesn't sacrifice mobility." },
  { id:53, name:"Weekend Silk Kurta", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:6399, oldPrice:8699, rating:4.6, reviews:44, img:"https://images.unsplash.com/photo-1781106785213-ee999c3edf50?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#4c6fff","#0b0b0d","#d4af6a"], sizes:["S","M","L","XL"], desc:"A festive silk kurta in hand-finished fabric, tailored for celebrations." },
  { id:54, name:"Signature Running Shorts", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3599, oldPrice:4499, rating:4.8, reviews:221, img:"https://images.unsplash.com/photo-1620050541567-20bc27e9f8b6?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#0b0b0d","#d4af6a"], sizes:["S","M","L","XL"], desc:"A performance running shorts in moisture-wicking fabric, built for training days." },
  { id:55, name:"Weekend Cargo Pants", section:"Men", type:"Casual Wear", cat:"Apparel", brand:"Aurelia", price:2799, oldPrice:3799, rating:4.8, reviews:119, img:"https://images.unsplash.com/photo-1623200693945-ec1e9991039a?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#d4af6a","#7b4fe0"], sizes:["S","M","L","XL"], desc:"A relaxed-fit cargo pants in breathable cotton, built for everyday wear." },
  { id:56, name:"Studio Formal Trousers", section:"Men", type:"Formal Wear", cat:"Apparel", brand:"Noir & Co", price:4899, oldPrice:6999, rating:4.8, reviews:19, img:"https://images.unsplash.com/photo-1624835567150-0c530a20d8cc?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#fafaf8","#d4af6a"], sizes:["S","M","L","XL"], desc:"A sharply tailored formal trousers, finished with a clean silhouette for the office or beyond." },
  { id:57, name:"Premium Fleece Hoodie", section:"Men", type:"Winter Wear", cat:"Apparel", brand:"Aurelia", price:4699, oldPrice:6699, rating:4.8, reviews:140, img:"https://images.unsplash.com/photo-1611817757591-c3f345024273?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#4c6fff","#7b4fe0","#d4af6a"], sizes:["S","M","L","XL"], desc:"A cold-weather fleece hoodie with insulated warmth that doesn't sacrifice mobility." },
  { id:58, name:"Weekend Ethnic Waistcoat", section:"Men", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:6799, oldPrice:9399, rating:3.9, reviews:298, img:"https://images.unsplash.com/photo-1767775498862-d4740ce574ce?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#4c6fff","#9c7a3c"], sizes:["S","M","L","XL"], desc:"A festive ethnic waistcoat in hand-finished fabric, tailored for celebrations." },
  { id:59, name:"Urban Running Shorts", section:"Men", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2599, oldPrice:3399, rating:4.5, reviews:190, img:"https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#9c7a3c","#4c6fff","#0b0b0d"], sizes:["S","M","L","XL"], desc:"A performance running shorts in moisture-wicking fabric, built for training days." },
  { id:60, name:"Heritage Cotton Kurti", section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Meridian", price:2799, oldPrice:3499, rating:4.2, reviews:81, img:"https://images.unsplash.com/photo-1741847639057-b51a25d42892?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#9c7a3c","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"An easy, everyday cotton kurti in soft breathable fabric." },
  { id:61, name:"Urban Satin Blouse", section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Noir & Co", price:3499, oldPrice:4399, rating:4.8, reviews:91, img:"https://images.unsplash.com/photo-1761117228880-df2425bd70da?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#4a2545","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"A polished satin blouse tailored for a sharp, professional silhouette." },
  { id:62, name:"Heritage Shearling Coat", section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:4799, oldPrice:5999, rating:4.3, reviews:35, img:"https://images.unsplash.com/photo-1618244965061-1d27b208d6e8?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#7b4fe0","#4a2545"], sizes:["XS","S","M","L","XL"], desc:"A warm shearling coat designed to layer beautifully through the cold months." },
  { id:63, name:"Urban Silk Saree", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:7199, oldPrice:10299, rating:4.9, reviews:94, img:"https://images.unsplash.com/photo-1726076584498-2064363f8b5a?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#4c6fff","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"A hand-finished silk saree woven for festive occasions and celebrations." },
  { id:64, name:"Modern Sports Bra Set", section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3299, oldPrice:4599, rating:4.8, reviews:142, img:"https://images.unsplash.com/photo-1791212420653-233f6bf4f8bb?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#fafaf8","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"A four-way stretch sports bra set built for movement and everyday training." },
  { id:65, name:"Studio Utility Jumpsuit", section:"Women", type:"Western Wear", cat:"Apparel", brand:"Meridian", price:3699, oldPrice:4699, rating:4.8, reviews:194, img:"https://images.unsplash.com/photo-1768803968246-5b8c7d04b722?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#7b4fe0","#0b0b0d"], sizes:["XS","S","M","L","XL"], desc:"A statement utility jumpsuit cut to flatter, in a fluid, easy-to-style fabric." },
  { id:66, name:"Modern Off-Shoulder Top", section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Aurelia", price:2799, oldPrice:3999, rating:4.9, reviews:157, img:"https://images.unsplash.com/photo-1598554793905-075f7b355cd9?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#4a2545","#0b0b0d","#55524c"], sizes:["XS","S","M","L","XL"], desc:"An easy, everyday off-shoulder top in soft breathable fabric." },
  { id:67, name:"Weekend Formal Shirt", section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Aurelia", price:4699, oldPrice:5899, rating:4.5, reviews:191, img:"https://images.unsplash.com/photo-1595828204607-0d09afb58a71?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#fafaf8","#7b4fe0","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"A polished formal shirt tailored for a sharp, professional silhouette." },
  { id:68, name:"Classic Wool Poncho", section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:7799, oldPrice:9699, rating:4.8, reviews:290, img:"https://images.unsplash.com/photo-1552875387-814ba27aeafd?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#55524c","#0b0b0d","#4a2545"], sizes:["XS","S","M","L","XL"], desc:"A warm wool poncho designed to layer beautifully through the cold months." },
  { id:69, name:"Signature Lehenga Choli", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:6399, oldPrice:9099, rating:4.4, reviews:224, img:"https://images.unsplash.com/photo-1767955694884-d4bf352c23c2?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#d4af6a","#9c7a3c","#fafaf8"], sizes:["XS","S","M","L","XL"], desc:"A hand-finished lehenga choli woven for festive occasions and celebrations." },
  { id:70, name:"Heritage Training Leggings", section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2699, oldPrice:3599, rating:4.2, reviews:295, img:"https://images.unsplash.com/photo-1768929096297-ba9fde63f58f?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#d4af6a","#fafaf8","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"A four-way stretch training leggings built for movement and everyday training." },
  { id:71, name:"Essential A-Line Skirt", section:"Women", type:"Western Wear", cat:"Apparel", brand:"Urban Thread", price:5099, oldPrice:6799, rating:4.8, reviews:101, img:"https://images.unsplash.com/photo-1509182469511-7f0b50bfa63e?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#4a2545","#0b0b0d","#fafaf8"], sizes:["XS","S","M","L","XL"], desc:"A statement a-line skirt cut to flatter, in a fluid, easy-to-style fabric." },
  { id:72, name:"Essential Palazzo Pants", section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2599, oldPrice:3199, rating:4.1, reviews:258, img:"https://images.unsplash.com/photo-1610142991820-e02266a4a9f0?w=600&q=80&auto=format&fit=crop", badge:"-19%", colors:["#9c7a3c","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"An easy, everyday palazzo pants in soft breathable fabric." },
  { id:73, name:"Essential Satin Blouse", section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Meridian", price:6899, oldPrice:9599, rating:4.4, reviews:139, img:"https://images.unsplash.com/photo-1608234807905-4466023792f5?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#fafaf8","#55524c"], sizes:["XS","S","M","L","XL"], desc:"A polished satin blouse tailored for a sharp, professional silhouette." },
  { id:74, name:"Everyday Turtleneck Sweater", section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:8599, oldPrice:11499, rating:4.5, reviews:77, img:"https://images.unsplash.com/photo-1608976328267-e673d3ec06ce?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#9c7a3c","#4a2545"], sizes:["XS","S","M","L","XL"], desc:"A warm turtleneck sweater designed to layer beautifully through the cold months." },
  { id:75, name:"Studio Kurti with Dupatta", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:5899, oldPrice:8299, rating:4.8, reviews:233, img:"https://images.unsplash.com/photo-1759840278381-bf7d5e332050?w=600&q=80&auto=format&fit=crop", badge:"-29%", colors:["#4c6fff","#4a2545","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"A hand-finished kurti with dupatta woven for festive occasions and celebrations." },
  { id:76, name:"Essential Gym Tank Top", section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2899, oldPrice:3999, rating:4.4, reviews:137, img:"https://images.unsplash.com/photo-1645318800735-737d3a422de6?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#fafaf8","#4a2545","#4c6fff"], sizes:["XS","S","M","L","XL"], desc:"A four-way stretch gym tank top built for movement and everyday training." },
  { id:77, name:"Modern Maxi Dress", section:"Women", type:"Western Wear", cat:"Apparel", brand:"Urban Thread", price:4199, oldPrice:5999, rating:4.0, reviews:92, img:"https://images.unsplash.com/photo-1675029865483-31f84044faae?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#4c6fff","#4a2545","#fafaf8"], sizes:["XS","S","M","L","XL"], desc:"A statement maxi dress cut to flatter, in a fluid, easy-to-style fabric." },
  { id:78, name:"Studio Peplum Top", section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Meridian", price:3199, oldPrice:3999, rating:4.7, reviews:214, img:"https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#55524c","#7b4fe0"], sizes:["XS","S","M","L","XL"], desc:"An easy, everyday peplum top in soft breathable fabric." },
  { id:79, name:"Premium Formal Pantsuit", section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Noir & Co", price:5299, oldPrice:7499, rating:4.9, reviews:229, img:"https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&q=80&auto=format&fit=crop", badge:"-29%", colors:["#9c7a3c","#fafaf8"], sizes:["XS","S","M","L","XL"], desc:"A polished formal pantsuit tailored for a sharp, professional silhouette." },
  { id:80, name:"Studio Fleece Jacket", section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:3899, oldPrice:5099, rating:4.6, reviews:222, img:"https://images.unsplash.com/photo-1721746033898-570230f0b1d6?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#4c6fff","#d4af6a","#55524c"], sizes:["XS","S","M","L","XL"], desc:"A warm fleece jacket designed to layer beautifully through the cold months." },
  { id:81, name:"Weekend Silk Saree", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:5699, oldPrice:7799, rating:4.0, reviews:234, img:"https://images.unsplash.com/photo-1568079776404-e0fc8c3fa7cb?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#4c6fff","#0b0b0d","#9c7a3c"], sizes:["XS","S","M","L","XL"], desc:"A hand-finished silk saree woven for festive occasions and celebrations." },
  { id:82, name:"Modern Gym Tank Top", section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3199, oldPrice:4199, rating:4.9, reviews:230, img:"https://images.unsplash.com/photo-1645318800735-737d3a422de6?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#9c7a3c","#0b0b0d"], sizes:["XS","S","M","L","XL"], desc:"A four-way stretch gym tank top built for movement and everyday training." },
  { id:83, name:"Modern Floral Sundress", section:"Women", type:"Western Wear", cat:"Apparel", brand:"Meridian", price:3699, oldPrice:5099, rating:4.7, reviews:35, img:"https://images.unsplash.com/photo-1762154057377-cc9d3dd6900c?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#7b4fe0","#55524c"], sizes:["XS","S","M","L","XL"], desc:"A statement floral sundress cut to flatter, in a fluid, easy-to-style fabric." },
  { id:84, name:"Everyday Denim Shirt Dress", section:"Women", type:"Casual Wear", cat:"Apparel", brand:"Meridian", price:2799, oldPrice:3499, rating:4.6, reviews:303, img:"https://images.unsplash.com/photo-1532675432006-329c6fed7045?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#d4af6a","#55524c","#4c6fff"], sizes:["XS","S","M","L","XL"], desc:"An easy, everyday denim shirt dress in soft breathable fabric." },
  { id:85, name:"Weekend Pencil Skirt", section:"Women", type:"Formal Wear", cat:"Apparel", brand:"Meridian", price:6899, oldPrice:8799, rating:4.7, reviews:174, img:"https://images.unsplash.com/photo-1594168087746-d94175b42394?w=600&q=80&auto=format&fit=crop", badge:"-22%", colors:["#d4af6a","#9c7a3c"], sizes:["XS","S","M","L","XL"], desc:"A polished pencil skirt tailored for a sharp, professional silhouette." },
  { id:86, name:"Heritage Quilted Vest", section:"Women", type:"Winter Wear", cat:"Apparel", brand:"Noir & Co", price:5499, oldPrice:6899, rating:4.6, reviews:139, img:"https://images.unsplash.com/photo-1613322800337-581785ea9f33?w=600&q=80&auto=format&fit=crop", badge:"-20%", colors:["#fafaf8","#55524c","#d4af6a"], sizes:["XS","S","M","L","XL"], desc:"A warm quilted vest designed to layer beautifully through the cold months." },
  { id:87, name:"Modern Chikankari Kurta Set", section:"Women", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:5599, oldPrice:7399, rating:4.3, reviews:274, img:"https://images.unsplash.com/photo-1745313452052-0e4e341f326c?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#55524c","#9c7a3c"], sizes:["XS","S","M","L","XL"], desc:"A hand-finished chikankari kurta set woven for festive occasions and celebrations." },
  { id:88, name:"Heritage Gym Tank Top", section:"Women", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:3199, oldPrice:4399, rating:4.7, reviews:93, img:"https://images.unsplash.com/photo-1645318800735-737d3a422de6?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#d4af6a","#9c7a3c"], sizes:["XS","S","M","L","XL"], desc:"A four-way stretch gym tank top built for movement and everyday training." },
  { id:89, name:"Modern A-Line Skirt", section:"Women", type:"Western Wear", cat:"Apparel", brand:"Urban Thread", price:3799, oldPrice:5299, rating:4.0, reviews:245, img:"https://images.unsplash.com/photo-1594633313515-7ad9334a2349?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#55524c","#4c6fff","#0b0b0d"], sizes:["XS","S","M","L","XL"], desc:"A statement a-line skirt cut to flatter, in a fluid, easy-to-style fabric." },
  { id:90, name:"Everyday Hooded Sweatshirt", section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2599, oldPrice:3299, rating:4.7, reviews:189, img:"https://images.unsplash.com/photo-1563730372821-22094003e498?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#0b0b0d","#d4af6a","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A playground-tough hooded sweatshirt made from soft, breathable cotton." },
  { id:91, name:"Heritage School Uniform Shirt Set", section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:2999, oldPrice:4099, rating:4.1, reviews:258, img:"https://images.unsplash.com/photo-1725147874938-7904e3362841?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#0b0b0d","#9c7a3c","#4c6fff"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A durable, easy-iron school uniform shirt set built to survive a full school week." },
  { id:92, name:"Essential Fleece Hoodie", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Little Aurelia", price:3199, oldPrice:4399, rating:4.3, reviews:298, img:"https://images.pexels.com/photos/14937556/pexels-photo-14937556.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-27%", colors:["#55524c","#4a2545","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A cosy fleece hoodie that keeps little ones warm without weighing them down." },
  { id:93, name:"Studio Sherwani Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3299, oldPrice:4299, rating:4.1, reviews:113, img:"https://images.pexels.com/photos/17015459/pexels-photo-17015459.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-23%", colors:["#4c6fff","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A festive sherwani set in comfortable fabric, made for celebrations and photos." },
  { id:94, name:"Premium Track Suit Set", section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2799, oldPrice:3999, rating:4.4, reviews:159, img:"https://images.pexels.com/photos/31637477/pexels-photo-31637477.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-30%", colors:["#d4af6a","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A breathable track suit set built for the playground, park and everything between." },
  { id:95, name:"Premium Denim Dress", section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:2399, oldPrice:3299, rating:4.0, reviews:38, img:"https://images.pexels.com/photos/15359602/pexels-photo-15359602.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-27%", colors:["#4c6fff","#4a2545","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A twirl-ready denim dress perfect for birthdays and get-togethers." },
  { id:96, name:"Weekend Graphic Tee", section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Little Aurelia", price:2299, oldPrice:3099, rating:4.3, reviews:109, img:"https://images.unsplash.com/photo-1603185030522-05d4497bb180?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#9c7a3c","#0b0b0d","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A playground-tough graphic tee made from soft, breathable cotton." },
  { id:97, name:"Signature Formal Shirt Set", section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:3099, oldPrice:4299, rating:4.0, reviews:91, img:"https://images.unsplash.com/photo-1605685316407-8db2263d675e?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#fafaf8","#9c7a3c","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A durable, easy-iron formal shirt set built to survive a full school week." },
  { id:98, name:"Weekend Thermal Set", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Little Aurelia", price:2999, oldPrice:4199, rating:4.3, reviews:241, img:"https://images.pexels.com/photos/14650563/pexels-photo-14650563.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-29%", colors:["#d4af6a","#9c7a3c","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A cosy thermal set that keeps little ones warm without weighing them down." },
  { id:99, name:"Essential Kurta Pajama Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3199, oldPrice:4099, rating:4.0, reviews:137, img:"https://images.pexels.com/photos/35259283/pexels-photo-35259283.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-22%", colors:["#4c6fff","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A festive kurta pajama set in comfortable fabric, made for celebrations and photos." },
  { id:100, name:"Weekend Sports Tee", section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2699, oldPrice:3499, rating:4.1, reviews:159, img:"https://images.unsplash.com/photo-1609422644211-a85c36ee36a7?w=600&q=80&auto=format&fit=crop", badge:"-23%", colors:["#7b4fe0","#4c6fff"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A breathable sports tee built for the playground, park and everything between." },
  { id:101, name:"Heritage Dungaree Dress", section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:2599, oldPrice:3499, rating:4.5, reviews:151, img:"https://images.pexels.com/photos/16244475/pexels-photo-16244475.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-26%", colors:["#0b0b0d","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A twirl-ready dungaree dress perfect for birthdays and get-togethers." },
  { id:102, name:"Studio Denim Overalls", section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2099, oldPrice:2799, rating:4.2, reviews:221, img:"https://images.pexels.com/photos/19882112/pexels-photo-19882112.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-25%", colors:["#9c7a3c","#0b0b0d","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A playground-tough denim overalls made from soft, breathable cotton." },
  { id:103, name:"Modern School Uniform Shirt Set", section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:3199, oldPrice:4099, rating:4.0, reviews:309, img:"https://images.pexels.com/photos/8423896/pexels-photo-8423896.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-22%", colors:["#d4af6a","#9c7a3c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A durable, easy-iron school uniform shirt set built to survive a full school week." },
  { id:104, name:"Studio Puffer Jacket", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:3799, oldPrice:5199, rating:4.8, reviews:107, img:"https://images.unsplash.com/photo-1608764589882-975eecf78107?w=600&q=80&auto=format&fit=crop", badge:"-27%", colors:["#9c7a3c","#0b0b0d","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A cosy puffer jacket that keeps little ones warm without weighing them down." },
  { id:105, name:"Modern Sherwani Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3399, oldPrice:4699, rating:4.8, reviews:183, img:"https://images.pexels.com/photos/12095442/pexels-photo-12095442.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-28%", colors:["#d4af6a","#4a2545","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A festive sherwani set in comfortable fabric, made for celebrations and photos." },
  { id:106, name:"Studio Running Shorts", section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2199, oldPrice:2799, rating:4.2, reviews:221, img:"https://images.pexels.com/photos/34043982/pexels-photo-34043982.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-21%", colors:["#9c7a3c","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A breathable running shorts built for the playground, park and everything between." },
  { id:107, name:"Urban Party Frock", section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:2799, oldPrice:3799, rating:4.4, reviews:241, img:"https://images.unsplash.com/photo-1578897367107-2828e351c8a8?w=600&q=80&auto=format&fit=crop", badge:"-26%", colors:["#d4af6a","#9c7a3c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A twirl-ready party frock perfect for birthdays and get-togethers." },
  { id:108, name:"Studio Cargo Shorts", section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2799, oldPrice:3699, rating:3.9, reviews:137, img:"https://images.unsplash.com/photo-1502451885777-16c98b07834a?w=600&q=80&auto=format&fit=crop", badge:"-24%", colors:["#0b0b0d","#d4af6a","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A playground-tough cargo shorts made from soft, breathable cotton." },
  { id:109, name:"Signature School Uniform Shirt Set", section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:2999, oldPrice:4299, rating:4.5, reviews:93, img:"https://images.unsplash.com/photo-1588953936179-d2a4734c5490?w=600&q=80&auto=format&fit=crop", badge:"-30%", colors:["#d4af6a","#7b4fe0","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A durable, easy-iron school uniform shirt set built to survive a full school week." },
  { id:110, name:"Studio Padded Vest", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:3799, oldPrice:4799, rating:4.1, reviews:275, img:"https://images.pexels.com/photos/4260379/pexels-photo-4260379.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-21%", colors:["#d4af6a","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A cosy padded vest that keeps little ones warm without weighing them down." },
  { id:111, name:"Urban Ethnic Dhoti Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3299, oldPrice:4599, rating:4.2, reviews:167, img:"https://images.pexels.com/photos/37261822/pexels-photo-37261822.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-28%", colors:["#4c6fff","#7b4fe0","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A festive ethnic dhoti set in comfortable fabric, made for celebrations and photos." },
  { id:112, name:"Modern Sports Tee", section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2799, oldPrice:3899, rating:4.3, reviews:179, img:"https://images.unsplash.com/photo-1622659097972-68f1d8c1829f?w=600&q=80&auto=format&fit=crop", badge:"-28%", colors:["#55524c","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A breathable sports tee built for the playground, park and everything between." },
  { id:113, name:"Modern Denim Dress", section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:3299, oldPrice:4399, rating:4.8, reviews:210, img:"https://images.pexels.com/photos/15359689/pexels-photo-15359689.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-25%", colors:["#9c7a3c","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A twirl-ready denim dress perfect for birthdays and get-togethers." },
  { id:114, name:"Signature Cargo Shorts", section:"Kids", type:"Casual Wear", cat:"Apparel", brand:"Urban Thread", price:2499, oldPrice:3099, rating:4.8, reviews:22, img:"https://images.unsplash.com/photo-1502451885777-16c98b07834a?w=600&q=80&auto=format&fit=crop", badge:"-19%", colors:["#4c6fff","#0b0b0d","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A playground-tough cargo shorts made from soft, breathable cotton." },
  { id:115, name:"Weekend Formal Shirt Set", section:"Kids", type:"Formal Wear", cat:"Apparel", brand:"Little Aurelia", price:3299, oldPrice:4399, rating:4.0, reviews:183, img:"https://images.unsplash.com/photo-1615868167768-6fe2e8eaacd8?w=600&q=80&auto=format&fit=crop", badge:"-25%", colors:["#4a2545","#9c7a3c","#55524c"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A durable, easy-iron formal shirt set built to survive a full school week." },
  { id:116, name:"Weekend Padded Vest", section:"Kids", type:"Winter Wear", cat:"Apparel", brand:"Nordstep", price:2699, oldPrice:3399, rating:4.6, reviews:162, img:"https://images.unsplash.com/photo-1677655140730-170fea3f8076?w=600&q=80&auto=format&fit=crop", badge:"-21%", colors:["#55524c","#0b0b0d"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A cosy padded vest that keeps little ones warm without weighing them down." },
  { id:117, name:"Everyday Kurta Pajama Set", section:"Kids", type:"Ethnic Wear", cat:"Apparel", brand:"Vastra Loom", price:3399, oldPrice:4799, rating:3.9, reviews:43, img:"https://images.pexels.com/photos/17015449/pexels-photo-17015449.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-29%", colors:["#4a2545","#7b4fe0","#fafaf8"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A festive kurta pajama set in comfortable fabric, made for celebrations and photos." },
  { id:118, name:"Weekend Track Suit Set", section:"Kids", type:"Activewear", cat:"Apparel", brand:"SprintFit", price:2299, oldPrice:2899, rating:4.0, reviews:210, img:"https://images.pexels.com/photos/19900239/pexels-photo-19900239.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-21%", colors:["#9c7a3c","#d4af6a"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A breathable track suit set built for the playground, park and everything between." },
  { id:119, name:"Studio Party Frock", section:"Kids", type:"Western Wear", cat:"Apparel", brand:"Little Aurelia", price:3199, oldPrice:4199, rating:4.2, reviews:19, img:"https://images.pexels.com/photos/15359639/pexels-photo-15359639.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", badge:"-24%", colors:["#4c6fff","#0b0b0d","#7b4fe0"], sizes:["2-3Y","4-5Y","6-7Y","8-9Y","10-11Y"], desc:"A twirl-ready party frock perfect for birthdays and get-togethers." },
];

// ---- Storage helpers ----
// localStorage can throw (private mode, blocked storage), so every access is guarded.
const Store = {
  get(key, fallback){ try{ return JSON.parse(localStorage.getItem(key)) ?? fallback; }catch(e){ return fallback; } },
  set(key, val){ try{ localStorage.setItem(key, JSON.stringify(val)); }catch(e){ /* storage unavailable */ } }
};

function getCart(){ return Store.get('aurelia_cart', []); }
function setCart(c){ Store.set('aurelia_cart', c); updateNavBadges(); }
function getWishlist(){ return Store.get('aurelia_wishlist', []); }
function setWishlist(w){ Store.set('aurelia_wishlist', w); updateNavBadges(); }
function findProduct(id){ return PRODUCTS.find(p=> p.id === id); }

// ---- Formatting helpers ----
function formatPrice(n, decimals=0){
  return '₹' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits:decimals, maximumFractionDigits:decimals });
}
function starsHTML(rating){
  const full = Math.round(rating);
  return '★'.repeat(full) + '☆'.repeat(5 - full);
}

// Neutral placeholder shown if a remote product photo fails to load.
const IMG_FALLBACK = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">' +
  '<rect width="600" height="600" fill="#f2f0ea"/>' +
  '<text x="50%" y="50%" fill="#9c7a3c" font-family="Georgia,serif" font-size="40" text-anchor="middle" dominant-baseline="middle" letter-spacing="6">AURELIA</text></svg>');
function productImgFallback(img){
  if(img.dataset.fallback) return;
  img.dataset.fallback = '1';
  img.src = IMG_FALLBACK;
}

function updateNavBadges(){
  const cartCount = getCart().reduce((s,i)=>s+i.qty,0);
  const wishCount = getWishlist().length;
  document.querySelectorAll('.cart-badge').forEach(b=>{ b.textContent = cartCount; b.hidden = cartCount === 0; });
  document.querySelectorAll('.wish-badge').forEach(b=>{ b.textContent = wishCount; b.hidden = wishCount === 0; });
}

function addToCart(id, qty=1, opts={}){
  const p = findProduct(id);
  if(!p) return;
  qty = Math.max(1, parseInt(qty, 10) || 1);
  const cart = getCart();
  const key = id + JSON.stringify(opts);
  const existing = cart.find(i => i.key === key);
  if(existing){ existing.qty += qty; }
  else{
    cart.push({ key, id, name:p.name, img:p.img, price:p.price, oldPrice:p.oldPrice, qty, opts });
  }
  setCart(cart);
  showToast(`Added to cart — ${p.name}`, 'cart');
}

function toggleWishlist(id){
  let wish = getWishlist();
  if(wish.includes(id)){ wish = wish.filter(w=>w!==id); showToast('Removed from wishlist','heart'); }
  else{ wish.push(id); showToast('Added to wishlist','heart'); }
  setWishlist(wish);
  const on = wish.includes(id);
  document.querySelectorAll(`[data-wish-id="${id}"]`).forEach(el=>{
    el.classList.toggle('active', on);
    el.innerHTML = on ? '&#9829;' : '&#9825;';
    el.setAttribute('aria-pressed', String(on));
  });
  // On the wishlist page, removing an item should take its card away too.
  if(typeof renderWishlistPage === 'function') renderWishlistPage();
}

// ---- Product Card Renderer ----
function productCardHTML(p){
  const inWish = getWishlist().includes(p.id);
  return `
  <div class="product-card reveal">
    <div class="pc-media">
      <a href="product.html?id=${p.id}">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="productImgFallback(this)">
      </a>
      ${p.badge ? `<span class="pc-badge">${p.badge}</span>` : ''}
      <button type="button" class="pc-wish ${inWish?'active':''}" data-wish-id="${p.id}" onclick="toggleWishlist(${p.id})" title="Add to wishlist" aria-label="Add ${p.name} to wishlist" aria-pressed="${inWish}">${inWish ? '&#9829;' : '&#9825;'}</button>
      <div class="pc-quick">
        <button type="button" class="btn btn-ghost btn-sm btn-block" onclick="openQuickView(${p.id})">Quick View</button>
      </div>
    </div>
    <div class="pc-body">
      <span class="pc-cat">${p.section} · ${p.type||p.cat}</span>
      <a href="product.html?id=${p.id}" class="pc-name">${p.name}</a>
      <span class="pc-brand">${p.brand}</span>
      <div class="pc-rating" aria-label="Rated ${p.rating} out of 5">${starsHTML(p.rating)} <span>${p.rating} (${p.reviews})</span></div>
      <div class="pc-price">
        <span class="now">${formatPrice(p.price)}</span>
        <span class="old">${formatPrice(p.oldPrice)}</span>
      </div>
      <div class="pc-actions">
        <button type="button" class="btn btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    </div>
  </div>`;
}

function renderGrid(containerId, list){
  const el = document.getElementById(containerId);
  if(!el) return;
  el.innerHTML = list.map(productCardHTML).join('') || `
    <div class="empty-state" style="grid-column:1/-1;">
      <div class="icon-big">🔍</div>
      <h3>No products found</h3>
      <p style="color:var(--text-dim)">Try adjusting your filters or search term.</p>
    </div>`;
  observeReveals();
}

// ---- Quick View Modal ----
function openQuickView(id){
  const p = findProduct(id);
  const overlay = document.getElementById('quickViewOverlay');
  if(!p || !overlay) return;
  document.getElementById('qvContent').innerHTML = `
    <div class="modal-img"><img src="${p.img}" alt="${p.name}" onerror="productImgFallback(this)"></div>
    <div class="modal-info">
      <span class="pc-cat">${p.section} · ${p.brand}</span>
      <h3>${p.name}</h3>
      <div class="pc-rating">${starsHTML(p.rating)} <span>${p.rating} (${p.reviews} reviews)</span></div>
      <div class="pc-price" style="margin:14px 0;"><span class="now">${formatPrice(p.price)}</span> <span class="old">${formatPrice(p.oldPrice)}</span></div>
      <p style="color:var(--text-dim);margin-bottom:20px;">${p.desc}</p>
      <div class="modal-actions">
        <button type="button" class="btn btn-primary" onclick="addToCart(${p.id});closeQuickView();">Add to Cart</button>
        <a href="product.html?id=${p.id}" class="btn btn-ghost">View Full Details</a>
      </div>
    </div>`;
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeQuickView(){
  document.getElementById('quickViewOverlay')?.classList.remove('show');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e=>{ if(e.key === 'Escape') closeQuickView(); });

// ---- Toast Notifications ----
function showToast(msg, icon='check'){
  const map = { check:'✓', cart:'🛍', heart:'♥', error:'!' };
  const container = document.getElementById('toastContainer');
  if(!container) return;
  const t = document.createElement('div');
  t.className = 'toast' + (icon === 'error' ? ' toast-error' : '');
  t.setAttribute('role', 'status');
  const ic = document.createElement('span'); ic.textContent = map[icon] || '✓';
  const tx = document.createElement('span'); tx.textContent = msg;
  t.append(ic, tx);
  container.appendChild(t);
  setTimeout(()=> t.remove(), 3100);
}

// ---- Scroll Reveal Observer ----
function observeReveals(){
  const els = document.querySelectorAll('.reveal:not(.in), .reveal-zoom:not(.in)');
  if(!('IntersectionObserver' in window)){ els.forEach(el=> el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12 });
  els.forEach(el=> io.observe(el));
}

document.addEventListener('DOMContentLoaded', ()=>{
  updateNavBadges();
  observeReveals();

  const filterToggle = document.getElementById('mobileFilterToggle');
  const filterPanel = document.getElementById('productFilters');
  filterToggle?.addEventListener('click', ()=>{
    const isOpen = filterPanel?.classList.toggle('open') ?? false;
    filterToggle.setAttribute('aria-expanded', String(isOpen));
  });
  const closeFilters = ()=>{
    filterPanel?.classList.remove('open');
    filterToggle?.setAttribute('aria-expanded', 'false');
  };
  document.querySelectorAll('.filter-close').forEach(button=> button.addEventListener('click', closeFilters));
});
