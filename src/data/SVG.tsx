import { motion } from "framer-motion"

// Source: https://heroicons.com/solid
export function Arrow({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
    )
}

export function Shop({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="shop" viewBox="0 0 16 16" fill="currentColor" className={`size-6 ${className}`}>
            <path d="M1.75 1.002a.75.75 0 1 0 0 1.5h1.835l1.24 5.113A3.752 3.752 0 0 0 2 11.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H3.628A2.25 2.25 0 0 1 5.75 9h6.5a.75.75 0 0 0 .73-.578l.846-3.595a.75.75 0 0 0-.578-.906 44.118 44.118 0 0 0-7.996-.91l-.348-1.436a.75.75 0 0 0-.73-.573H1.75ZM5 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM13 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" />
        </svg>
    )
}

export function User({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="account" viewBox="0 0 16 16" fill="currentColor" className={`size-6 ${className}`}>
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
    )
}

export function User2({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="account" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-6 ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    )
}

export function SearchIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="search" viewBox="0 0 16 16" fill="currentColor" className={`size-6 ${className}`}>
            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
        </svg>
    )
}

export function Close({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="close" viewBox="0 0 24 24" fill="currentColor" className={`size-6 ${className}`}>
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
        </svg>
    )
}

export function Burger({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" aria-labelledby="menu" viewBox="0 0 24 24" fill="currentColor" className={`size-6 ${className}`}>
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
        </svg>
    )
}

export function ShopPay() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="shop-pay-logo" viewBox="0 -2 341 81" height={20} width={85}>
            <title id="shop-pay-logo">Shop Pay</title>
            <path fillRule="evenodd" clipRule="evenodd" d="M227.297 0C220.448 0 214.896 5.47237 214.896 12.2229V67.8125C214.896 74.563 220.448 80.0354 227.297 80.0354H328.357C335.206 80.0354 340.758 74.563 340.758 67.8125V12.2229C340.758 5.47237 335.206 0 328.357 0H227.297ZM244.999 55.8917V41.8012H253.993C262.21 41.8012 266.579 37.2604 266.579 30.379C266.579 23.4976 262.21 19.3782 253.993 19.3782H239.205V55.8917H244.999ZM244.999 24.8084H252.663C257.982 24.8084 260.595 26.9617 260.595 30.5663C260.595 34.1708 258.077 36.3242 252.9 36.3242H244.999V24.8084ZM276.795 56.6407C281.212 56.6407 284.109 54.7214 285.439 51.4445C285.819 55.0959 288.052 56.9684 292.896 55.7044L292.944 51.819C290.996 52.0063 290.616 51.3041 290.616 49.2912V39.7415C290.616 34.124 286.864 30.8003 279.93 30.8003C273.09 30.8003 269.148 34.1708 269.148 39.8819H274.468C274.468 37.1668 276.415 35.5284 279.835 35.5284C283.444 35.5284 285.107 37.0732 285.059 39.7415V40.9586L278.932 41.614C272.045 42.3629 268.246 44.9376 268.246 49.4316C268.246 53.1298 270.905 56.6407 276.795 56.6407ZM277.982 52.4276C274.99 52.4276 273.803 50.836 273.803 49.2443C273.803 47.091 276.273 46.1079 281.117 45.5462L284.917 45.1249C284.679 49.2443 281.877 52.4276 277.982 52.4276ZM310.537 57.7174C308.115 63.5221 304.22 65.2541 298.141 65.2541H295.528V60.4793H298.331C301.655 60.4793 303.27 59.4494 305.028 56.5002L294.246 31.5493H300.23L307.925 49.7593L314.764 31.5493H320.606L310.537 57.7174Z" fill="white"></path>
            <path d="M29.5136 35.1798C21.5797 33.4835 18.0451 32.8197 18.0451 29.8064C18.0451 26.9722 20.4371 25.5604 25.221 25.5604C29.4282 25.5604 32.5036 27.3726 34.7674 30.9232C34.9382 31.1972 35.2906 31.292 35.5789 31.1445L44.506 26.6983C44.8263 26.5402 44.9438 26.1399 44.7623 25.8343C41.0569 19.5022 34.2121 16.0358 25.1996 16.0358C13.3574 16.0358 6 21.7885 6 30.9338C6 40.648 14.9591 43.1029 22.9038 44.7992C30.8484 46.4955 34.3936 47.1592 34.3936 50.1725C34.3936 53.1858 31.8095 54.6082 26.6518 54.6082C21.8893 54.6082 18.3548 52.4589 16.2191 48.2866C16.059 47.981 15.6852 47.8546 15.3756 48.0127L6.46985 52.364C6.16017 52.5221 6.03203 52.8908 6.19221 53.2069C9.72673 60.2134 16.9773 64.1538 26.6625 64.1538C38.996 64.1538 46.4494 58.496 46.4494 49.0663C46.4494 39.6365 37.4476 36.8972 29.5136 35.2009V35.1798Z" fill="white"></path>
            <path d="M77.3525 16.0358C72.291 16.0358 67.8168 17.8059 64.6026 20.9561C64.3997 21.1458 64.0687 21.0088 64.0687 20.7349V0.621625C64.0687 0.273937 63.791 0 63.4387 0H52.2692C51.9168 0 51.6391 0.273937 51.6391 0.621625V63.0476C51.6391 63.3952 51.9168 63.6692 52.2692 63.6692H63.4387C63.791 63.6692 64.0687 63.3952 64.0687 63.0476V35.6644C64.0687 30.3754 68.1798 26.319 73.7219 26.319C79.2639 26.319 83.279 30.2911 83.279 35.6644V63.0476C83.279 63.3952 83.5566 63.6692 83.909 63.6692H95.0785C95.4309 63.6692 95.7085 63.3952 95.7085 63.0476V35.6644C95.7085 24.1591 88.0628 16.0464 77.3525 16.0464V16.0358Z" fill="white"></path>
            <path d="M118.389 14.2552C112.324 14.2552 106.622 16.0779 102.542 18.7224C102.265 18.9016 102.169 19.2703 102.34 19.5548L107.262 27.8466C107.444 28.1416 107.828 28.247 108.127 28.0679C111.224 26.2241 114.769 25.2653 118.389 25.2864C128.138 25.2864 135.303 32.0716 135.303 41.0377C135.303 48.6763 129.569 54.3342 122.297 54.3342C116.371 54.3342 112.26 50.9311 112.26 46.1266C112.26 43.3767 113.445 41.122 116.531 39.5311C116.851 39.3625 116.969 38.9727 116.777 38.6671L112.132 30.9126C111.982 30.6598 111.662 30.5439 111.373 30.6492C105.148 32.925 100.78 38.4037 100.78 45.7579C100.78 56.8839 109.761 65.1863 122.287 65.1863C136.916 65.1863 147.434 55.1876 147.434 40.8481C147.434 25.476 135.197 14.2446 118.368 14.2446L118.389 14.2552Z" fill="white"></path>
            <path d="M180.098 15.9515C174.449 15.9515 169.409 18.006 165.725 21.6304C165.522 21.8306 165.191 21.6831 165.191 21.4092V17.0473C165.191 16.6996 164.914 16.4256 164.561 16.4256H153.68C153.328 16.4256 153.05 16.6996 153.05 17.0473V79.3784C153.05 79.7261 153.328 80 153.68 80H164.849C165.202 80 165.48 79.7261 165.48 79.3784V58.9385C165.48 58.6645 165.811 58.5276 166.013 58.7067C169.687 62.0782 174.545 64.0485 180.109 64.0485C193.211 64.0485 203.43 53.5862 203.43 39.9947C203.43 26.4032 193.2 15.941 180.109 15.941L180.098 15.9515ZM177.995 53.4914C170.541 53.4914 164.892 47.6439 164.892 39.9104C164.892 32.177 170.53 26.3295 177.995 26.3295C185.459 26.3295 191.086 32.0822 191.086 39.9104C191.086 47.7387 185.533 53.4914 177.984 53.4914H177.995Z" fill="white"></path>
        </svg>
    )
}

export function GPay({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 41 17" width={45} id="google-pay-logo-dark" className={className}>
            <path d="M19.526 2.635v4.083h2.518q.9 0 1.488-.605.605-.604.605-1.437 0-.816-.605-1.422-.588-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99q1.519 0 2.582 1.012 1.08 1.013 1.08 2.466 0 1.487-1.08 2.482-1.046.997-2.583.996zm7.668 2.287q0 .587.499.98.498.39 1.168.391.949 0 1.692-.701.745-.703.744-1.65-.704-.555-1.962-.555-.916 0-1.528.442-.613.44-.613 1.093m1.946-5.815q1.668 0 2.633.89.964.891.964 2.442v4.932h-1.439v-1.11h-.065q-.933 1.372-2.486 1.372-1.323 0-2.215-.784t-.891-1.96q0-1.242.94-1.976c.94-.734 1.463-.735 2.51-.735q1.34 0 2.206.49v-.344q0-.784-.621-1.33a2.13 2.13 0 0 0-1.455-.547q-1.26 0-1.995 1.062l-1.324-.834q1.095-1.568 3.238-1.568m11.853.262-5.02 11.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387 5.749h.032l2.322-5.75z" style={{fill: '#ffffff'}}></path>
            <path d="M13.448 7.134q-.001-.71-.116-1.366H6.988v2.588h3.634a3.1 3.1 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944" style={{fill: '#4285f4'}}></path>
            <path d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.73 6.73 0 0 0 6.01 3.703" style={{fill: '#34a853'}}></path>
            <path d="M3.212 8.267a4.03 4.03 0 0 1 0-2.572V3.964H.978A6.7 6.7 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017z" style={{fill: '#fbbc05'}}></path>
            <path d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.73 6.73 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774" style={{fill: '#ea4335'}}></path>
        </svg>
    )
}

export function HashTag({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`size-4 ${className}`}>
            <path fillRule="evenodd" d="M7.487 2.89a.75.75 0 1 0-1.474-.28l-.455 2.388H3.61a.75.75 0 0 0 0 1.5h1.663l-.571 2.998H2.75a.75.75 0 0 0 0 1.5h1.666l-.403 2.114a.75.75 0 0 0 1.474.28l.456-2.394h2.973l-.403 2.114a.75.75 0 0 0 1.474.28l.456-2.394h1.947a.75.75 0 0 0 0-1.5h-1.661l.57-2.998h1.95a.75.75 0 0 0 0-1.5h-1.664l.402-2.108a.75.75 0 0 0-1.474-.28l-.455 2.388H7.085l.402-2.108ZM6.8 6.498l-.571 2.998h2.973l.57-2.998H6.8Z" clipRule="evenodd" />
        </svg>
    )
}

export function InboxArrowDown({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-5 ${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 3.75H6.912a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859M12 3v8.25m0 0-3-3m3 3 3-3" />
        </svg>
    )
}

export function Back() {
    return (
        <svg width={24} height={24} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
            <path d="M18.5 12H6m0 0l6-6m-6 6l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Reload() {
    return (
        <svg width={16} height={16} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
            <path d="M21.888 13.5C21.164 18.311 17.013 22 12 22 6.477 22 2 17.523 2 12S6.477 2 12 2c4.1 0 7.625 2.468 9.168 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M17 8h4.4a.6.6 0 00.6-.6V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Print() {
    return (
        <svg width={20} height={20} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" color="currentColor">
            <path d="M17.571 18H20.4a.6.6 0 00.6-.6V11a4 4 0 00-4-4H7a4 4 0 00-4 4v6.4a.6.6 0 00.6.6h2.829M8 7V3.6a.6.6 0 01.6-.6h6.8a.6.6 0 01.6.6V7" stroke="currentColor" strokeWidth="1.2"></path>
            <path d="M6.098 20.315L6.428 18l.498-3.485A.6.6 0 017.52 14h8.96a.6.6 0 01.594.515L17.57 18l.331 2.315a.6.6 0 01-.594.685H6.692a.6.6 0 01-.594-.685z" stroke="currentColor" strokeWidth="1.2"></path><path d="M17 10.01l.01-.011" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Forward() {
    return (
        <svg width={24} height={24} strokeWidth="1.5" viewBox="0 0 24 24" fill="none" color="currentColor">
            <path d="M18.5 12H6m0 0l6-6m-6 6l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Save() {
    return (
        <svg width={20} height={20} strokeWidth="1.2" viewBox="0 0 24 24" fill="none" color="currentColor">
            <path d="M3 19V5a2 2 0 012-2h11.172a2 2 0 011.414.586l2.828 2.828A2 2 0 0121 7.828V19a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.2"></path>
            <path d="M8.6 9h6.8a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6H8.6a.6.6 0 00-.6.6v4.8a.6.6 0 00.6.6zM6 13.6V21h12v-7.4a.6.6 0 00-.6-.6H6.6a.6.6 0 00-.6.6z" stroke="currentColor" strokeWidth="1.2"></path>
        </svg>
    )
}

export function Inspect() {
    return (
        <svg width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.2" fill="none" color="currentColor">
            <path d="M4.998 2H2v2.998h2.998V2zM4.999 3.501h14M3.5 4.999V19M20.498 5v14.002M4.999 20.501h14M4.998 19H2v2.998h2.998V19zM21.997 2.002H19V5h2.998V2.002zM21.997 19.002H19V22h2.998v-2.998z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path clipRule="evenodd" d="M10.997 15.002l-3-7 7 3-2.998.999-1.002 3.001z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
            <path clipRule="evenodd" d="M11.999 12.002l2.998 3-2.998-3z" stroke="currentColor" strokeWidth="1.2" strokeMiterlimit="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    )
}

export function Light() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
        </svg>
    )
}

export function Dark() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
            <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" />
        </svg>
    )
}

export function Load({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className={`size-4 ${className}`}>
            <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
        </svg>
    )
}

export function Exclamation({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
    )
}

export function CheckBadge({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className}`}>
            <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                    duration: 2,
                    ease: "easeInOut",
                }}
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
            />
        </svg>   
    )
}

export function Rubbish({ className = '' }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    )
}