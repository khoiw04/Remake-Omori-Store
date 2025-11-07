import { easeInOut } from "framer-motion"

interface ItemItem {
    name: string
    link: string
  }
  
export interface Item extends ItemItem {
  items: Array<ItemItem>
  className?: string
}

type Items = Array<Item>

export const stagger = {
  initial:{ translateY: "0%", opacity: 0 },
  animate:{
      translateY: "0%",
      opacity: 1,
      transition: {
          translate: {
              duration: 0.2,
              ease: easeInOut(0.2)
          },
          opacity: {
              duration: 0.4
          }
      }
  }
}

export const LinkNavbar: Items = [
  {
    name: "collections",
    link: "/collections/accessories",
    items: [
      {
        name: "OFF SCRIPT",
        link: "/collections/off-script"
      },
      {
        name: "Mari",
        link: "/collections/mari"
      },
      {
        name: "SOLD OUT",
        link: "/collections/soldout"
      }
    ]
  },
  {
    name: "info",
    link: "/info/about",
    items: [
      {
        name: "Track Your Number",
        link: "/tool/tracking"
      },
      {
        name: "About khoi",
        link: "/info/about"
      },
      {
        name: "FAQ",
        link: "/info/faq"
      }
    ]
  }
]
export const LinkNavbarDark: Items = [
  {
    name: "collections",
    link: "/collections/accessories",
    items: [
      {
        name: "OFF SCRIPT",
        link: "/collections/OFF-SCRIPT"
      },
      {
        name: "OMORI",
        link: "/collections/OMORI"
      },
      {
        name: "SOLD OUT",
        link: "/collections/SOLDOUT"
      }
    ]
  },
  {
    name: "info",
    link: "/info/about",
    items: [
      {
        name: "Track Your Number",
        link: "/tool/tracking"
      },
      {
        name: "About Khoi",
        link: "/info/about"
      },
      {
        name: "FAQ",
        link: "/info/FAQ"
      }
    ]
  }
]

export const Footer = [
    {
        name: "Privacy Policy",
        href: "/policy/privacy-policy"
    },
    {
        name: "Terms & Condition",
        href: "/policy/terms-conditions"
    },
    {
        name: "Track Your Number",
        href: "/tool/tracking"
    },
    {
        name: "Shipping Policy",
        href: "/policy/shipping-policy"
    },
    {
        name: "Refund Policy",
        href: "/policy/refund-policy"
    },
    {
        name: "FAQ",
        href: "/info/FAQ"
    },
]

export const currencyOffScript = [
  { name: "Albania (ALL L)", code: "AL", transfer: "all", lang: 'sq' }, 
  { name: "Argentina (USD $)", code: "AR", transfer: "ars", lang: 'es' },
  { name: "Armenia (AMD դր.)", code: "AM", transfer: "amd", lang: 'hy' },
  { name: "Australia (AUD $)", code: "AU", transfer: "aud", lang: 'en' },
  { name: "Austria (EUR €)", code: "AT", transfer: "eur", lang: 'de' },
  { name: "Belgium (EUR €)", code: "BE", transfer: "eur", lang: 'nl' },
  { name: "Brazil (USD $)", code: "BR", transfer: "brl", lang: 'pt' },
  { name: "Bulgaria (BGN лв.)", code: "BG", transfer: "bgn", lang: 'bg' },
  { name: "Cambodia (KHR ៛)", code: "KH", transfer: "khr", lang: 'km' },
  { name: "Canada (CAD $)", code: "CA", transfer: "cad", lang: 'en' },
  { name: "Caribbean Netherlands (USD $)", code: "BQ", transfer: "xcg", lang: 'nl' },
  { name: "Chile (USD $)", code: "CL", transfer: "clp", lang: 'es' },
  { name: "China (CNY ¥)", code: "CN", transfer: "cny", lang: 'zh' },
  { name: "Croatia (EUR €)", code: "HR", transfer: "eur", lang: 'hr' },
  { name: "Czechia (CZK Kč)", code: "CZ", transfer: "czk", lang: 'cs' },
  { name: "Denmark (DKK kr.)", code: "DK", transfer: "dkk", lang: 'da' },
  { name: "Egypt (EGP ج.م)", code: "EG", transfer: "egp", lang: 'ar' },
  { name: "Estonia (EUR €)", code: "EE", transfer: "eek", lang: 'et' },
  { name: "Finland (EUR €)", code: "FI", transfer: "eur", lang: 'fi' },
  { name: "France (EUR €)", code: "FR", transfer: "eur", lang: 'fr' },
  { name: "Georgia (USD $)", code: "GE", transfer: "gel", lang: 'ka' },
  { name: "Germany (EUR €)", code: "DE", transfer: "eur", lang: 'de' },
  { name: "Greece (EUR €)", code: "GR", transfer: "eur", lang: 'el' },
  { name: "Hong Kong SAR (HKD $)", code: "HK", transfer: "hkd", lang: 'zh' },
  { name: "Hungary (HUF Ft)", code: "HU", transfer: "huf", lang: 'hu' },
  { name: "Iceland (ISK kr)", code: "IS", transfer: "isk", lang: 'is' },
  { name: "India (INR ₹)", code: "IN", transfer: "inr", lang: 'hi' },
  { name: "Indonesia (IDR Rp)", code: "ID", transfer: "idr", lang: 'id' },
  { name: "Ireland (EUR €)", code: "IE", transfer: "eur", lang: 'ga' },
  { name: "Israel (ILS ₪)", code: "IL", transfer: "ils", lang: 'he' },
  { name: "Italy (EUR €)", code: "IT", transfer: "eur", lang: 'it' },
  { name: "Japan (JPY ¥)", code: "JP", transfer: "jpy", lang: 'jp' },
  { name: "Lebanon (LBP ل.ل)", code: "LB", transfer: "lbp", lang: 'ar' },
  { name: "Lithuania (EUR €)", code: "LT", transfer: "eur", lang: 'lt' },
  { name: "Luxembourg (EUR €)", code: "LU", transfer: "eur", lang: 'fr' },
  { name: "Malaysia (MYR RM)", code: "MY", transfer: "myr", lang: 'ms' },
  { name: "Mexico (USD $)", code: "MX", transfer: "mxn", lang: 'es' },
  { name: "Moldova (MDL L)", code: "MD", transfer: "mdl", lang: 'ro' },
  { name: "Monaco (EUR €)", code: "MC", transfer: "eur", lang: 'fr' },
  { name: "Montenegro (EUR €)", code: "ME", transfer: "eur", lang: 'sr' },
  { name: "Netherlands (EUR €)", code: "NL", transfer: "eur", lang: 'nl' },
  { name: "New Zealand (NZD $)", code: "NZ", transfer: "nzd", lang: 'en' },
  { name: "Norway (USD $)", code: "NO", transfer: "nok", lang: 'no' },
  { name: "Philippines (PHP ₱)", code: "PH", transfer: "php", lang: 'tl' },
  { name: "Poland (PLN zł)", code: "PL", transfer: "pln", lang: 'pl' },
  { name: "Portugal (EUR €)", code: "PT", transfer: "eur", lang: 'pt' },
  { name: "Romania (RON Lei)", code: "RO", transfer: "ron", lang: 'ro' },
  { name: "Russia (USD $)", code: "RU", transfer: "rub", lang: 'ru' },
  { name: "Saudi Arabia (SAR ر.س)", code: "SA", transfer: "sar", lang: 'ar' },
  { name: "Serbia (RSD РСД)", code: "RS", transfer: "rsd", lang: 'sr' },
  { name: "Singapore (SGD $)", code: "SG", transfer: "sgd", lang: 'en' },
  { name: "Slovakia (EUR €)", code: "SK", transfer: "eur", lang: 'sk' },
  { name: "Slovenia (EUR €)", code: "SI", transfer: "eur", lang: 'sl' },
  { name: "South Africa (USD $)", code: "ZA", transfer: "zar", lang: 'en' },
  { name: "South Korea (KRW ₩)", code: "KR", transfer: "krw", lang: 'ko' },
  { name: "Spain (EUR €)", code: "ES", transfer: "eur", lang: 'es' },
  { name: "Sweden (SEK kr)", code: "SE", transfer: "sek", lang: 'sv' },
  { name: "Switzerland (CHF CHF)", code: "CH", transfer: "chf", lang: 'de' },
  { name: "Taiwan (TWD $)", code: "TW", transfer: "twd", lang: 'zh' },
  { name: "Thailand (THB ฿)", code: "TH", transfer: "thb", lang: 'th' },
  { name: "Türkiye (USD $)", code: "TR", transfer: "try", lang: 'tr' },
  { name: "Ukraine (UAH ₴)", code: "UA", transfer: "uah", lang: 'uk' },
  { name: "United Arab Emirates (AED د.إ)", code: "AE", transfer: "aed", lang: 'ar' },
  { name: "United Kingdom (GBP £)", code: "GB", transfer: "gbp", lang: 'en' },
  { name: "United States (USD $)", code: "US", transfer: "usd", lang: 'en' },
  { name: "Uruguay (UYU $U)", code: "UY", transfer: "uyu", lang: 'es' },
  { name: "Vietnam (VND ₫)", code: "VN", transfer: "vnd", lang: 'vi' }
]

type Tag = "bags" | "art prints" | "books and media" | "hats" | "sweaters"
type SizeType = 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | string

type SizeEntry = {
  type: SizeType
  available: boolean
}

type SameItemPriceLength<T extends { 
  price: Array<string>
  size: Array<SizeEntry>
}> = T & {
  price: Array<string>
  tag: Tag
  type: "soldOut" | "preOrder"
}

export type ItemInformation = SameItemPriceLength<typeof test[0]>

export const test = [
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: 'OMOCAT Original Characters Postcard Set',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 4 },
      { type: 'M', available: true, max: 2 },
      { type: 'L', available: false, max: 3 },
      { type: 'XL', available: true, max: 6 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: [
      {
        "size": "S",
        "chest": "23\"",
        "sleeve": "20.5\"",
        "frontLength": "27\"",
        "backLength": "30\""
      },
      {
        "size": "M",
        "chest": "25\"",
        "sleeve": "21\"",
        "frontLength": "28\"",
        "backLength": "31\""
      },
      {
        "size": "L",
        "chest": "27\"",
        "sleeve": "21.5\"",
        "frontLength": "29\"",
        "backLength": "32\""
      },
      {
        "size": "XL",
        "chest": "29\"",
        "sleeve": "22\"",
        "frontLength": "30\"",
        "backLength": "33\""
      },
      {
        "size": "XXL",
        "chest": "31\"",
        "sleeve": "22.5\"",
        "frontLength": "31\"",
        "backLength": "34\""
      },
      {
        "size": "3XL",
        "chest": "33\"",
        "sleeve": "23\"",
        "frontLength": "32\"",
        "backLength": "35\""
      }
    ],
    tag: "art prints",
    group: "original",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: '"FISHBOY" Screen Print',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 4 },
      { type: 'M', available: true, max: 2 },
      { type: 'L', available: false, max: 3 },
      { type: 'XL', available: true, max: 6 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: [
      {
        "size": "S",
        "chest": "23\"",
        "sleeve": "20.5\"",
        "frontLength": "27\"",
        "backLength": "30\""
      },
      {
        "size": "M",
        "chest": "25\"",
        "sleeve": "21\"",
        "frontLength": "28\"",
        "backLength": "31\""
      },
      {
        "size": "L",
        "chest": "27\"",
        "sleeve": "21.5\"",
        "frontLength": "29\"",
        "backLength": "32\""
      },
      {
        "size": "XL",
        "chest": "29\"",
        "sleeve": "22\"",
        "frontLength": "30\"",
        "backLength": "33\""
      },
      {
        "size": "XXL",
        "chest": "31\"",
        "sleeve": "22.5\"",
        "frontLength": "31\"",
        "backLength": "34\""
      },
      {
        "size": "3XL",
        "chest": "33\"",
        "sleeve": "23\"",
        "frontLength": "32\"",
        "backLength": "35\""
      }
    ],
    tag: "bags",
    group: "original",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: 'OMOCAT Original Characters Postcard Set',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 4 },
      { type: 'M', available: true, max: 2 },
      { type: 'L', available: false, max: 3 },
      { type: 'XL', available: true, max: 6 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: [
      {
        "size": "S",
        "chest": "23\"",
        "sleeve": "20.5\"",
        "frontLength": "27\"",
        "backLength": "30\""
      },
      {
        "size": "M",
        "chest": "25\"",
        "sleeve": "21\"",
        "frontLength": "28\"",
        "backLength": "31\""
      },
      {
        "size": "L",
        "chest": "27\"",
        "sleeve": "21.5\"",
        "frontLength": "29\"",
        "backLength": "32\""
      },
      {
        "size": "XL",
        "chest": "29\"",
        "sleeve": "22\"",
        "frontLength": "30\"",
        "backLength": "33\""
      },
      {
        "size": "XXL",
        "chest": "31\"",
        "sleeve": "22.5\"",
        "frontLength": "31\"",
        "backLength": "34\""
      },
      {
        "size": "3XL",
        "chest": "33\"",
        "sleeve": "23\"",
        "frontLength": "32\"",
        "backLength": "35\""
      }
    ],
    tag: "shirts",
    group: "original",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: 'SUNDAE Sweater',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 4 },
      { type: 'M', available: true, max: 2 },
      { type: 'L', available: false, max: 3 },
      { type: 'XL', available: true, max: 6 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: [
      {
        "size": "S",
        "chest": "23\"",
        "sleeve": "20.5\"",
        "frontLength": "27\"",
        "backLength": "30\""
      },
      {
        "size": "M",
        "chest": "25\"",
        "sleeve": "21\"",
        "frontLength": "28\"",
        "backLength": "31\""
      },
      {
        "size": "L",
        "chest": "27\"",
        "sleeve": "21.5\"",
        "frontLength": "29\"",
        "backLength": "32\""
      },
      {
        "size": "XL",
        "chest": "29\"",
        "sleeve": "22\"",
        "frontLength": "30\"",
        "backLength": "33\""
      },
      {
        "size": "XXL",
        "chest": "31\"",
        "sleeve": "22.5\"",
        "frontLength": "31\"",
        "backLength": "34\""
      },
      {
        "size": "3XL",
        "chest": "33\"",
        "sleeve": "23\"",
        "frontLength": "32\"",
        "backLength": "35\""
      }
    ],
    tag: "sweaters",
    group: "omocat-x-hololive-en",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: 'A HOME FOR FLOWERS Cardigan',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 10 },
      { type: 'M', available: true, max: 10 },
      { type: 'L', available: false, max: 10 },
      { type: 'XL', available: true, max: 10 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: null,
    tag: "sweaters",
    group: "omocat-x-hololive-en",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
  {
    img: [
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg', alt: 'Front' },
      { src: 'https://www.omocat-shop.com/cdn/shop/files/omori_sweater_06_550x.png', alt: 'Back' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg', alt: 'Top' },
      { src: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg', alt: 'Bottom' }
    ],
    title: 'OMORI x Requiem Cafe T-Shirt',
    alt: 'Hat, devices',
    id: 'omocat-original-characters-postcard-set',
    price: ['$ 40.00', '$ 60.00', '$ 80.00', '$ 100.00'],
    size: [
      { type: 'S', available: true, max: 4 },
      { type: 'M', available: true, max: 2 },
      { type: 'L', available: false, max: 3 },
      { type: 'XL', available: true, max: 6 }
    ],
    day: "March 20, 2024",
    link: "/collections/all",
    description: "A distressed knit sweater inspired by \"004 - Spaces In-Between\" from OMORI's original soundtrack, created to commemorate OMORI's 4th Anniversary. The back of the sweater is elongated for a fashionable fit and the distressed areas of the fabric are carefully placed as to not disrupt the artwork. Designed by <a href='https://www.omocat.com/'>OMOCAT</a> and <a href='https://www.kaiami.com/'>Kaiami</a>. Illustration by <a href=''>OMOCAT</a>. Fabric is 100% combed cotton yarn. Model is 6'2&quot and is wearing a size XL.",
    sizeGuide: [
      {
        "size": "S",
        "chest": "23\"",
        "sleeve": "20.5\"",
        "frontLength": "27\"",
        "backLength": "30\""
      },
      {
        "size": "M",
        "chest": "25\"",
        "sleeve": "21\"",
        "frontLength": "28\"",
        "backLength": "31\""
      },
      {
        "size": "L",
        "chest": "27\"",
        "sleeve": "21.5\"",
        "frontLength": "29\"",
        "backLength": "32\""
      },
      {
        "size": "XL",
        "chest": "29\"",
        "sleeve": "22\"",
        "frontLength": "30\"",
        "backLength": "33\""
      },
      {
        "size": "XXL",
        "chest": "31\"",
        "sleeve": "22.5\"",
        "frontLength": "31\"",
        "backLength": "34\""
      },
      {
        "size": "3XL",
        "chest": "33\"",
        "sleeve": "23\"",
        "frontLength": "32\"",
        "backLength": "35\""
      }
    ],
    tag: "jackets",
    group: "omocat-x-holomeet",
    NoteNotRed: "Ⓒ 2016 COVER Corp.",
    NoteRed: "Official collaboration between hololive production and OMOCAT featuring hololive GAMERS. This double-sided lanyard is 1\" wide and 36\" long with metal lobster claw clasp and safety breakaway.",
    messageHTML: "",
    type: "preOrder",
    tax_code: 'txcd_30011000'
  },
]