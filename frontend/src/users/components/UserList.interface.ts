export interface IUser {
  id: string;
  name: string;
  places: string[];
  imageUrl: string;
}

export interface IUserList {
  items: IUser[] | null;
}
