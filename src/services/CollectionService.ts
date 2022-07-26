import axios from 'axios';

export class CollectionService {
  static async qcollection() {
    return axios({
      url: '/api/collection',
    });
  }
}
