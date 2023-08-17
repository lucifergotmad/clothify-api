import { IId } from "../id.interface";

export interface IDetailAddressResponse extends IId {
  province_id: string;
  province_name: string;
  city_id: string;
  city_name: string;
  postal_code: string;
  description: string;
  title: string;
  type: string;
}

export interface IMemberAddressResponse {
  member_id: string;
  address_list: IDetailAddressResponse[];
}
