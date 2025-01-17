export default function manifest() {
    return {
      name: 'Vaya Pasajes y Turismo',
      short_name: 'Vaya Turismo',
      description: "Vaya Pasajes y Turismo",
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#000000',
      icons: [
        {
          src: '/16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          src: '/24x24.png',
          sizes: '24x24',
          type: 'image/png',
        },
        {
          src: '/32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          src: '/64x64.png',
          sizes: '64x64',
          type: 'image/png',
        }
      ],
    }
  }