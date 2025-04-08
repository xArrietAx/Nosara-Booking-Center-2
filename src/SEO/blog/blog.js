const title = "Blog";
const description = "Stay updated with the latest travel tips, news, and guides about Nosara. Explore our blog for insights on the best places to visit, things to do, and local tips.";
const url = "https://www.nosarabookingcenter.com";

const metadataBlog = {
  metadataBase: new URL(url),

  title,
  description,

  alternates: {
    canonical: "/Blog",
  },

  keywords: [
    "Nosara blog",
    "Travel blog Nosara",
    "Nosara tips",
    "Things to do in Nosara",
    "Nosara travel guide",
    "Nosara vacation tips",
    "Costa Rica blog",
    "Nosara news",
  ],
};

export default metadataBlog;
