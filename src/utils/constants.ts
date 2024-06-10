const links = [
  {
    route: "/",
    name: "Home",
  },
  {
    route: "/about",
    name: "About Us",
  },
  {
    route: "/menu",
    name: "Menu",
  },
  {
    route: "/reviews",
    name: "Testimonials",
  },
];

const outlets = [
  {
    image: "/images/outlet-1.png",
    address: "Barbeque Nation, Rajouri Garden, Delhi IN",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1237.9175211566462!2d77.12198789863167!3d28.648952730363522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d03c5be220ce1%3A0x769cc4d039bb09ba!2sBarbeque%20Nation%20Rajouri%20Garden!5e0!3m2!1sen!2sin!4v1717869995525!5m2!1sen!2sin",
    link: "https://maps.google.com/maps/dir//Barbeque+Nation+Rajouri+Garden+3rd+Floor+A2%2F41,+Block+A,+Rajouri+Garden+New+Delhi,+Delhi,+110027/@28.6484551,77.1220924,18z/data=!4m5!4m4!1m0!1m2!1m1!1s0x390d03c5be220ce1:0x769cc4d039bb09ba",
  },
  {
    image: "/images/outlet-2.png",
    address: "Starbucks, Malcha Marg, Delhi IN",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56046.80609063988!2d77.1220522484712!3d28.602015288285127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d722d60a45f%3A0xbe15a0d6ff93930a!2sStarbucks%20Coffee!5e0!3m2!1sen!2sin!4v1717869273068!5m2!1sen!2sin",
    link: "https://maps.google.com/maps/dir//Starbucks+Coffee+5,+Commercial+Complex+48,+Malcha+Marg,+Block+C,+Diplomatic+Enclave,+Malcha+New+Delhi,+Delhi+110021/@28.6020181,77.1861428,12z/data=!4m5!4m4!1m0!1m2!1m1!1s0x390d1d722d60a45f:0xbe15a0d6ff93930a",
  },
  {
    image: "/images/outlet-3.png",
    address: "Bikanervala, Rajiv Chowk, Delhi IN",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7003.966940978068!2d77.20781935869141!3d28.630257500000013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd493fb71f5b%3A0xd0f57f5f8315359!2sBikanervala!5e0!3m2!1sen!2sin!4v1717870714449!5m2!1sen!2sin",
    link: "https://maps.google.com/maps/dir//Bikanervala+1st+Floor,+Rajiv+Gandhi+Handicraft+Bhawan+Baba+Kharak+Singh+Rd,+opposite+Hanuman+Mandir+New+Delhi,+Delhi+110001/@28.6302575,77.2129692,15z/data=!4m5!4m4!1m0!1m2!1m1!1s0x390cfd493fb71f5b:0xd0f57f5f8315359",
  },
  {
    image: "/images/outlet-4.png",
    address: "Burger King, Kingsway, London UK",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d19864.98255336027!2d-0.1675522327423093!3d51.51096269879986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b351cb4ff99%3A0x6e88f8f68438029!2sBurger%20King!5e0!3m2!1sen!2sin!4v1717871885044!5m2!1sen!2sin",
    link: "https://maps.google.com/maps/dir//Burger+King+117+Kingsway+London+WC2B+6PP+United+Kingdom/@51.5168163,-0.1201914,13z/data=!4m5!4m4!1m0!1m2!1m1!1s0x48761b351cb4ff99:0x6e88f8f68438029",
  },
  {
    image: "/images/outlet-3.png",
    address: "Pizza Hut, Shibuya, Tokyo JP",
    maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25928.238679758204!2d139.64506566524506!3d35.67626736044854!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f330da0b1db3%3A0xe53268cf75b1f501!2sPizza%20Hut%20Hatsudai!5e0!3m2!1sen!2sin!4v1717920494211!5m2!1sen!2sin",
    link: "https://maps.google.com/maps/dir//Pizza+Hut+Hatsudai+%E3%83%87%E3%83%9F%E3%82%B7%E3%83%AB%E4%BB%A3%E3%80%85%E5%B9%A1+1+Chome-43-1+Nishihara+Shibuya+City,+Tokyo+151-0066,+Japan/@35.6762369,139.6831213,13z/data=!4m5!4m4!1m0!1m2!1m1!1s0x6018f330da0b1db3:0xe53268cf75b1f501",
  },
];

const menus = [
  {
    title: "Lemon and Garlic Green Beans",
    price: "Rs 350",
    ingredients: "Lemon / Garlic / Beans",
  },
  {
    title: "Bacon-wrapped Shrimp with Garlic",
    price: "Rs 630",
    ingredients: "Bacon / Shrimp / Garlic",
  },
  {
    title: "Lamb-Beef Kofka Skewers With Tzatziki",
    price: "Rs 945",
    ingredients: "Lamb / Wine / Butter",
  },
  {
    title: "Imported Oysters Grill (5 Pieces)",
    price: "Rs 760",
    ingredients: "Lemon / Garlic / Beans",
  },
  {
    title: "Lemon and Garlic Green Beans",
    price: "Rs 350",
    ingredients: "Lemon / Garlic / Beans",
  },
  {
    title: "Lemon and Garlic Green Beans",
    price: "Rs 350",
    ingredients: "Lemon / Garlic / Beans",
  },
  {
    title: "Lemon and Garlic Green Beans",
    price: "Rs 350",
    ingredients: "Lemon / Garlic / Beans",
  },
];

const chefLeft = [
  {
    name: "Alex Carter",
    text: "Over 10 years of experience in the kitchen, honed culinary skills to perfection. On a culinary journey with my faithful knife",
    image: "/images/chef-1.png",
  },
  {
    name: "Thomas Johnson",
    text: "Over two decades of experience, from humble beginnings to Michelin-starred kitchens, I've relied on my trusty blade to bring my culinary visions to life.",
    image: "/images/chef-2.png",
  },
];

const chefRight = [
  {
    name: "Jacques Dubois",
    text: "On a 15 year old culinary journey defined by passion, dedication, and the precise artistry of knife skills.",
    image: "/images/chef-3.png",
  },
  {
    name: "Alton Brown",
    text: "Culinary craft honed in kitchens around the globe, from classic French cuisine to avant-garde experimentation, my journey has been as diverse as the dishes I create.",
    image: "/images/chef-4.png",
  },
];

const reviews = [
  {
    name: "Kamado Tanjiro",
    review:
      "The food from this restaurant gave me the strenght to defeat Kibutsuji Muzan and the other demons in my world. This food is so much better than the blue spider lily.",
    image: "/images/person-1.png",
  },
  {
    name: "Eren Yeager",
    review:
      "As the founding Titan, I certify that the food from Culinary Corner is delicious and healthy. This food is the only reason I stayed happy during the Rumbling.",
    image: "/images/person-2.png",
  },
  {
    name: "Naruto Uzumaki",
    review:
      "The food from this restaurant is the reason I became the Hokage. I am personally seeing that this restaurant opens a branch in Konoha",
    image: "/images/person-3.png",
  },
];

const socials = [
  {
    image: "/icons/twitter.svg",
    name: "twitter",
    url: "https://www.x.com",
  },
  {
    image: "/icons/google.svg",
    name: "Google",
    url: "https://www.google.com",
  },
  {
    image: "/icons/instagram.svg",
    name: "Instagram",
    url: "https://www.instagram.com",
  },
  {
    image: "/icons/youtube.svg",
    name: "Youtube",
    url: "https://www.youtube.com",
  },
  {
    image: "/icons/linkedin.svg",
    name: "Linked In",
    url: "https://www.linkedin.com",
  },
  {
    image: "/icons/facebook.svg",
    name: "Facebook",
    url: "https://www.facebook.com",
  },
];

const time = [
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "13:00 PM",
  "13:30 PM",
  "14:00 PM",
  "14:30 PM",
  "15:00 PM",
  "15:30 PM",
  "16:00 PM",
  "16:30 PM",
  "17:00 PM",
  "17:30 PM",
  "18:00 PM",
  "18:30 PM",
  "19:00 PM",
  "19:30 PM",
  "20:00 PM",
  "20:30 PM",
  "21:00 PM",
  "21:30 PM",
  "22:00 PM",
  "22:30 PM",
  "23:00 PM",
]

export { links, outlets, menus, chefLeft, chefRight, reviews, socials, time };
