import Preloader from "@/components/Preloader";
import "@css/style.css";
import "./globals.css";
import Head from 'next/head';


export const metadata = {
  title: {
    template: "Vaya Pasajes y Turismo",
    default: "Vaya Pasajes y Turismo",
  },
  description:
    "Vaya Pasajes y Turismo",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Facundo Girardi" />
        <meta content="" name="keywords" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Abhaya+Libre:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Alexandria:wght@100..900&family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body>
            {children}
      </body>
    </html>
  );
}
