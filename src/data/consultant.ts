// Consultant E-E-A-T Data - איתי אנצל
export const consultant = {
  name: 'איתי אנצל',
  jobTitle: 'יועץ משכנתאות',
  company: 'אנצ\'ל ייעוץ ופיננסים בע"מ',
  hfcaMember: true,
  hfcaSince: 2017,
  hfcaUrl: 'https://hfca.org.il/userprofile/?id=210',
  rating: 9.68,
  reviewCount: 169,
  address: {
    street: 'קרן היסוד 7',
    city: 'קריית ביאליק',
    region: 'חיפה',
    country: 'IL',
  },
  phone: '055-432-6608',
  email: 'info@yoetz-mashkanta.co.il',
  serviceAreas: ['חיפה', 'קריית ביאליק', 'קריית מוצקין', 'קריית אתא', 'נשר', 'טירת כרמל', 'זכרון יעקב'],
  social: {
    facebook: 'https://www.facebook.com/AFC.mortgage/',
  },
  siteUrl: 'https://yoetz-mashkanta.co.il',
};

// Person Schema for JSON-LD
export const personSchema = {
  '@type': 'Person',
  '@id': 'https://yoetz-mashkanta.co.il/#consultant',
  name: consultant.name,
  jobTitle: consultant.jobTitle,
  worksFor: {
    '@type': 'Organization',
    name: consultant.company,
  },
  memberOf: {
    '@type': 'Organization',
    name: 'התאחדות יועצי המשכנתאות והאשראי בישראל',
    url: 'https://hfca.org.il',
  },
  sameAs: [
    consultant.hfcaUrl,
    consultant.social.facebook,
  ],
};

// LocalBusiness Schema
export const localBusinessSchema = {
  '@type': 'LocalBusiness',
  '@id': 'https://yoetz-mashkanta.co.il/#business',
  name: 'יועץ משכנתאות - איתי אנצל',
  description: 'ייעוץ משכנתאות מקצועי - ליווי ברכישת דירה, מחזור משכנתא, משכנתא לזוגות צעירים ועוד. 169 לקוחות מרוצים.',
  url: consultant.siteUrl,
  telephone: consultant.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: consultant.address.street,
    addressLocality: consultant.address.city,
    addressRegion: consultant.address.region,
    addressCountry: consultant.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 32.8303,
    longitude: 35.0858,
  },
  areaServed: consultant.serviceAreas.map(area => ({
    '@type': 'City',
    name: area,
  })),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: consultant.rating,
    reviewCount: consultant.reviewCount,
    bestRating: 10,
    worstRating: 1,
  },
  founder: { '@id': 'https://yoetz-mashkanta.co.il/#consultant' },
};

// Service Schema Generator
export function createServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: service.url,
    provider: { '@id': 'https://yoetz-mashkanta.co.il/#business' },
    areaServed: consultant.serviceAreas.map(area => ({
      '@type': 'City',
      name: area,
    })),
  };
}

// Trust badges text for content
export const trustBadges = {
  clients: `${consultant.reviewCount} לקוחות מרוצים`,
  rating: `דירוג ${consultant.rating}`,
  hfca: `חבר התאחדות יועצי המשכנתאות מ-${consultant.hfcaSince}`,
  experience: '7+ שנות ניסיון',
};
