import axios from "../helpers/axios";

export class CollectionService {
  static async directorytree({ id }: any): Promise<any> {
    return axios.get(`/api/directorytree`);
  }

  static async createDirectorytree(params: any): Promise<any> {
    return axios.post(`/api/directorytree`, params);
  }

  static async deleteDirectorytree(params: any): Promise<any> {
    return axios.delete(
      `/api/directorytree`,
      { params: params },
    );
  }
}
