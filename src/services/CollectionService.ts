import axios from 'axios';

export class CollectionService {
  static async qcollection() {
    return axios({
      url: '/api/collection',
    });
  }

  // 列出集合
  static async listCollections() {
    return axios({
      url: '/api/collection',
    });
  }
}
