export type DiscogsArtist = {
  anv: string;
  id: number;
  join: string;
  name: string;
  resource_url: string;
  role: string;
  tracks: string;
};

export type DiscogsContributor = {
  resource_url: string;
  username: string;
};

export type DiscogsCompany = {
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  name: string;
  resource_url: string;
};

export type DiscogsFormat = {
  descriptions: string[];
  name: string;
  qty: string;
};

export type DiscogsIdentifier = {
  type: string;
  value: string;
};

export type DiscogsImage = {
  height: number;
  resource_url: string;
  type: string;
  uri: string;
  uri150: string;
  width: number;
};

export type DiscogsLabel = {
  catno: string;
  entity_type: string;
  id: number;
  name: string;
  resource_url: string;
};

export type DiscogsTrack = {
  duration: string;
  position: string;
  title: string;
  type_: string;
};

export type DiscogsVideo = {
  description: string;
  duration: number;
  embed: boolean;
  title: string;
  uri: string;
};

export type DiscogsCommunity = {
  contributors: DiscogsContributor[];
  data_quality: string;
  have: number;
  rating: {
    average: number;
    count: number;
  };
  status: string;
  submitter: {
    resource_url: string;
    username: string;
  };
  want: number;
};

export type DiscogsRelease = {
  title: string;
  id: number;
  artists: DiscogsArtist[];
  data_quality: string;
  thumb: string;
  community: DiscogsCommunity;
  companies: DiscogsCompany[];
  country: string;
  date_added: string;
  date_changed: string;
  estimated_weight: number;
  extraartists: DiscogsArtist[];
  format_quantity: number;
  formats: DiscogsFormat[];
  genres: string[];
  identifiers: DiscogsIdentifier[];
  images: DiscogsImage[];
  labels: DiscogsLabel[];
  lowest_price: number;
  master_id: number;
  master_url: string;
  notes: string;
  num_for_sale: number;
  released: string;
  released_formatted: string;
  resource_url: string;
  series: any[]; // You can specify a more specific export type if needed
  status: string;
  styles: string[];
  tracklist: DiscogsTrack[];
  uri: string;
  videos: DiscogsVideo[];
  year: number;
};

type Pagination = {
  per_page: number;
  pages: number;
  page: number;
  urls: {
    last: string;
    next: string;
  };
  items: number;
};

type ListingCommunity = {
  want: number;
  have: number;
};

type ListingRelease = {
  style: string[];
  thumb: string;
  title: string;
  country: string;
  format: string[];
  uri: string;
  community: ListingCommunity;
  label: string[];
  catno: string;
  year: string;
  genre: string[];
  resource_url: string;
  type: string;
  id: number;
};

export type DiscogsListing = {
  pagination: Pagination;
  results: ListingRelease[];
};
