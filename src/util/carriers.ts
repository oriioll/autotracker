import type { Company } from '@/types/Company'

/**
 * Array of all the carriers that are recopiled in this project
 * @author Oriol Plazas León
 * @since 15/08/2026
 */
export const CARRIERS: Company[] = [
  {
    name: 'DHL',
    svg: '/src/assets/carriers/dhl.svg',
    website: 'https://www.dhl.com',
  },
  {
    name: 'UPS',
    svg: '/src/assets/carriers/ups.svg',
    website: 'https://www.ups.com',
  },
  {
    name: 'FedEx',
    svg: '/src/assets/carriers/fedex.svg',
    website: 'https://www.fedex.com',
  },
  {
    name: 'GLS',
    svg: null,
    website: 'https://gls-group.com',
  },
  {
    name: 'DPD',
    svg: '/src/assets/carriers/dpd.svg',
    website: 'https://www.dpd.com',
  },
  {
    name: 'InPost',
    svg: null,
    website: 'https://inpost.es',
  },
  {
    name: 'Royal Mail',
    svg: null,
    website: 'https://www.royalmail.com',
  },
  {
    name: 'USPS',
    svg: '/src/assets/carriers/usps.svg',
    website: 'https://www.usps.com',
  },
  {
    name: 'Canada Post',
    svg: null,
    website: 'https://www.canadapost-postescanada.ca',
  },
  {
    name: 'Australia Post',
    svg: null,
    website: 'https://auspost.com.au',
  },
  {
    name: 'Aramex',
    svg: null,
    website: 'https://www.aramex.com',
  },
  {
    name: 'PostNL',
    svg: null,
    website: 'https://www.postnl.nl',
  },
  {
    name: 'PostNord',
    svg: null,
    website: 'https://www.postnord.com',
  },
  {
    name: 'La Poste',
    svg: null,
    website: 'https://www.laposte.fr',
  },
  {
    name: 'Chronopost',
    svg: null,
    website: 'https://www.chronopost.fr',
  },
  {
    name: 'Colissimo',
    svg: null,
    website: 'https://www.colissimo.entreprise.laposte.fr',
  },
  {
    name: 'bpost',
    svg: null,
    website: 'https://www.bpost.be',
  },
  {
    name: 'Deutsche Post',
    svg: '/src/assets/carriers/deutschepost.svg',
    website: 'https://www.deutschepost.de',
  },
  {
    name: 'Poste Italiane',
    svg: null,
    website: 'https://www.poste.it',
  },
  {
    name: 'Correos',
    svg: null,
    website: 'https://www.correos.es',
  },
  {
    name: 'CTT',
    svg: null,
    website: 'https://www.ctt.pt',
  },
  {
    name: 'Mondial Relay',
    svg: null,
    website: 'https://www.mondialrelay.fr',
  },
  {
    name: 'Evri',
    svg: null,
    website: 'https://www.evri.com',
  },
  {
    name: 'Hermes',
    svg: '/src/assets/carriers/hermes.svg',
    website: 'https://www.myhermes.de',
  },
  {
    name: 'Yodel',
    svg: null,
    website: 'https://www.yodel.co.uk',
  },
  {
    name: 'OnTrac',
    svg: null,
    website: 'https://www.ontrac.com',
  },
  {
    name: 'Sendle',
    svg: null,
    website: 'https://try.sendle.com',
  },
  {
    name: 'YunExpress',
    svg: null,
    website: 'https://www.yunexpress.com',
  },
  {
    name: 'Cainiao',
    svg: null,
    website: 'https://www.cainiao.com',
  },
  {
    name: '4PX',
    svg: null,
    website: 'https://www.4px.com',
  },
  {
    name: 'SF Express',
    svg: null,
    website: 'https://www.sf-express.com',
  },
  {
    name: 'J&T Express',
    svg: null,
    website: 'https://www.jtexpress.com',
  },
  {
    name: 'TNT',
    svg: null,
    website: 'https://www.tnt.com',
  },
]

const carrierLogoUrls = import.meta.glob<string>('../assets/carriers/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
})

CARRIERS.forEach((carrier) => {
  if (carrier.svg) {
    const filename = carrier.svg.split('/').pop()
    carrier.svg = filename ? carrierLogoUrls[`../assets/carriers/${filename}`] ?? null : null
  }
})

/**
 * Gets the data of a carrier if its recopilated
 * @param carrierName The name of the carrier to find
 * @returns The carrier found or null if it doesn't exist
 * @author Oriol Plazas León
 * @since 15/08/2026
 */
export const findCarrier = (carrierName: string): Company | null => {
  return (
    CARRIERS.find(
      (c: Company) => c.name.toLowerCase().normalize() === carrierName.toLowerCase().normalize(),
    ) || null
  )
}
