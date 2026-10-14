export default function manifest() {
  return {
    name: 'AppMotive Technologies',
    short_name: 'AppMotive',
    description: 'AppMotive Technologies builds modern web, mobile, AI and digital experiences for ambitious companies.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07101d',
    theme_color: '#07101d',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
