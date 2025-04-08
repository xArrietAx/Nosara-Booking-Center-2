const title = "Discover Nosara: Vacation rentals, Tours, and Rentals"

const description = "We specialize in vacation rentals, tours, shuttles, and rentals like ATV, side by side and golf carts in Nosara."

const url = "https://www.nosarabookingcenter.com"

const metadataDefault = {
  metadataBase: new URL(url),

  title: {
    template: '%s | Nosara Booking Center',
    default: title
  },
  description,

  alternates: {
    canonical: "/",
  },

  keywords: [
    "Nosara vacation rentals",
    "Alquileres vacacionales en Nosara",
    "Nosara tours",
    "Tours en Nosara",
    "Property management Nosara",
    "Gestión de propiedades en Nosara",
    "Nosara beach rentals",
    "Luxury rentals Nosara",
    "Casas de alquiler Nosara",
    "Nosara real estate",
    "Nosara actividades",
    "Costa Rica vacation rentals",
    "Nosara surfing tours",
    "Eco-tours Nosara",
    "Alquileres frente a la playa Nosara",
  ],

  referrer: "origin-when-cross-origin",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },

  siteName: "Nosara Booking Center",
  creator: "Andrés Arrieta",
  url: url,
  category: "Concierge Service",
};

export default metadataDefault