import axios from 'axios';

axios.defaults.baseURL = 'https://testehubii.free.beeceptor.com/api/';

export class OrderService {
  static async createOS(title, description, email) {
    return await axios.post('/Request', {
      title,
      description,
      emailClient: email,
    });
  }


  static async EditOS(title, description,idRequest) {
    return await axios.post(`/Request/editRequest?idRequest=${idRequest}`, {
      title,
      description,
    });
  }

  static async getOrderById(id) {
    return await axios.get(`/v1/order/getById/${id}`);
  }


  static async getAllOrders(email) {
    return await axios.get(`/v1/order/getAll`);
  }
}
