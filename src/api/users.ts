import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/axiosInstance";

export interface IUser {
  id: string;
  name: string;
}

export const apiGetUsers = async (): Promise<IUser[]> => {
  const axiosOptions = {
    method: "GET",
    url: "/users",
  };
  const response: AxiosResponse<IUser[]> = await axiosInstance(axiosOptions);
  return response.data;
};

export const apiPostUser = async (data: IUser): Promise<IUser> => {
  const axiosOptions = {
    method: "POST",
    url: "/users",
    data,
  };
  const response: AxiosResponse<IUser> = await axiosInstance(axiosOptions);
  return response.data;
};
