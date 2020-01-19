export interface IUser {
  id: string;
  name: string;
  places: number;
  image: string;
}

export interface IUserList {
  items: IUser[];
}
