import { createLazyFileRoute } from '@tanstack/react-router'
import { ListItemDisplay, ListMainFrame } from '@/components/Lists'

export const Route = createLazyFileRoute('/collections/all')({
  component: All,
})

const data = [
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/accessories_Banner_large.jpg',
    link: 'https://www.omocat-shop.com/collections/accessories',
    title: 'ACCESSORIES',
    alt: 'Hat, devices'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/IMG_5878_large.jpg',
    link: 'https://www.omocat-shop.com/collections/apparel',
    title: 'Apperel',
    alt: 'Clothes'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/omori_poster_web_large.jpg',
    link: 'https://www.omocat-shop.com/collections/accessories',
    title: 'ART PRINTS & POSTERS',
    alt: 'artwork'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/4_large.jpg',
    link: 'https://www.omocat-shop.com/collections/bags',
    title: 'BAGS',
    alt: 'BAGS'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/BOOK_large.jpg',
    link: 'https://www.omocat-shop.com/collections/bags',
    title: 'BOOKS & MEDIA',
    alt: 'BOOKS & MEDIA'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/collectibles_collection_small_1490b2d9-2d76-4a73-92b7-4084c04500b6_large.jpg',
    link: 'https://www.omocat-shop.com/collections/collectibles',
    title: 'COLLECTIBLES',
    alt: 'COLLECTIBLES'
  },
  {
    img: 'https://www.omocat-shop.com/cdn/shop/collections/headspace_bunny_sticker_large.jpg',
    link: 'https://www.omocat-shop.com/collections/stationery-desk-goods',
    title: 'DESK & STATIONERY',
    alt: 'DESK & STATIONERY'
  },
  {
    img: 'http://www.omocat-shop.com/cdn/shop/collections/hat_banner_3_large.jpg',
    link: 'https://www.omocat-shop.com/collections/hats',
    title: 'HATS',
    alt: 'HATS'
  },
  {
    img: 'http://www.omocat-shop.com/cdn/shop/collections/accessories_pic_large.jpg',
    link: 'https://www.omocat-shop.com/collections/keychains',
    title: 'KEYCHAINS & STANDS',
    alt: 'KEYCHAINS & STANDS'
  },
  {
    img: '//www.omocat-shop.com/cdn/shop/collections/4_3a2ffbac-4fae-4d42-b675-c6a52306aeb2_large.jpg',
    link: 'https://www.omocat-shop.com/collections/home-goods',
    title: 'HOMEWARE',
    alt: 'HOMEWARE'
  }
]

function All() {
  return (
    <ListMainFrame>
      {data.map((cart, index) => {
        return (
          <ListItemDisplay        
            key={`all_items!---${index}`}
            img={cart.img}
            link={cart.link}
            title={cart.title}
            alt={cart.alt}
          />
        )
      })}
    </ListMainFrame>
  )
}
