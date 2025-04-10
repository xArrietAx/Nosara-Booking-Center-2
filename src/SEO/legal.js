const url = "https://www.nosarabookingcenter.com";

const metadataTermsAndConditions = {
  metadataBase: new URL(url),

  title: "Terms and Conditions",
  description: "Read our Terms and Conditions to learn more about the policies governing the use of our services and website. Your use of Nosara Booking Center implies acceptance of these terms.",
  
  alternates: {
    canonical: "/Terms-conditions",
  },

  keywords: [
    "Terms and conditions Nosara Booking Center",
    "Nosara Booking Center policies",
    "Legal terms Nosara",
    "Terms of service Nosara",
  ],
};

const metadataCookiesPolicy = {
  metadataBase: new URL(url),

  title: "Cookies Policy",
  description: "Learn about our Cookies Policy, how we use cookies, and how they enhance your experience on our website. By using our site, you consent to our use of cookies.",
  
  alternates: {
    canonical: "/Cookies-policy",
  },

  keywords: [
    "Cookies policy Nosara Booking Center",
    "Cookies usage Nosara",
    "Nosara website cookies",
    "Privacy cookies Nosara",
  ],
};

const metadataPrivacyAndPolicy = {
  metadataBase: new URL(url),

  title: "Privacy Policy",
  description: "Our Privacy Policy explains how we collect, use, and protect your personal data. Learn more about your rights and how we ensure your privacy while using our services.",
  
  alternates: {
    canonical: "/Privacy-policy",
  },

  keywords: [
    "Privacy policy Nosara Booking Center",
    "Personal data protection Nosara",
    "Data privacy Nosara",
    "Nosara privacy terms",
  ],
};

export { metadataTermsAndConditions, metadataCookiesPolicy, metadataPrivacyAndPolicy };
