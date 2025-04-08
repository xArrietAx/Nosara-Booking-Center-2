const title = "About Us";
const description = "Learn more about Nosara Booking Center, our mission, what we offer and how we help travelers discover the best of Nosara.";
const url = "https://www.nosarabookingcenter.com";

const metadataAbout = {
  metadataBase: new URL(url),

  title,
  description,

  alternates: {
    canonical: "/About",
  },

  keywords: [
    "About Nosara Booking Center",
    "Who we are Nosara",
    "Nosara vacation experts",
    "About our team",
    "Nosara property managers",
  ],
};

export default metadataAbout
