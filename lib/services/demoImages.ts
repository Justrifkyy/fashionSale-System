/**
 * Development-only dummy photography from Unsplash (spec open_decisions D-14:
 * "Placeholder images in development only"). Replace with the owner's real product
 * photos via Cloudinary/UploadThing before launch.
 */
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

export const DEMO_IMAGES = {
  shirtDenimHanger: unsplash("photo-1596755094514-f87e34085b2c"),
  shirtsFolded: unsplash("photo-1602810318383-e386cc2a3ccf"),
  teeBlackModel: unsplash("photo-1503341504253-dff4815485f1"),
  teeWhiteModel: unsplash("photo-1521572163474-6864f9cf17ab"),
  teePrintedFlat: unsplash("photo-1576566588028-4147f3842f27"),
  teesRack: unsplash("photo-1489987707025-afc232f7ea0f"),
  chinoKhakiModel: unsplash("photo-1473966968600-fa801b869a1a"),
  pantsNavyFlat: unsplash("photo-1624378439575-d8705ad7ae80"),
  denimStack: unsplash("photo-1542272604-787c3835535d"),
  capWhite: unsplash("photo-1588850561407-ed78c282e89b"),
  backpackNavy: unsplash("photo-1553062407-98eeb64c6a62"),
  rackNeutral: unsplash("photo-1490481651871-ab68de25d43d"),
  editorialGold: unsplash("photo-1515886657613-9f3515b0c78f"),
  editorialRed: unsplash("photo-1529139574466-a303027c1d8b"),
  editorialSkenaCasual: unsplash("photo-1552374196-1ab2a1c593e8"),
  flatlayDenim: unsplash("photo-1516762689617-e1cffcef479d"),
} as const;

