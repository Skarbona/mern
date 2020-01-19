export interface IPlaceItem {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface IPlaceList {
  items: IPlaceItem[];
}
