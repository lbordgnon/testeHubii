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

  static async cancelOS(idRequest) {
    return await axios.post(`/Request/editStatusRequest?idRequest=${idRequest}&status=4`);
  }

  static async conclusionOS(idRequest) {
    return await axios.post(`/Request/editStatusRequest?idRequest=${idRequest}&status=3`);
  }

  static async AddEngineer(idRequest,email) {
    return await axios.post(`/Request/AddEngineer?idRequest=${idRequest}&emailEgineer=${email}`);
  }

  static async getRequestListEngineer() {
    return await axios.get(`/Request/getRequestByEngineer`);
  }

  static async getRequestList(email) {
    return await axios.get(`/Request/getRequestByClient?email=${email}`);
  }

  static async getRequestByClient(query,email) {
    return await axios.get(`/Request/getRequestByClient?query=${query}&email=${email}`);
  }

  static async getOrderById(id) {
    return await axios.get(`/v1/order/getById/${id}`);
  }

  static async getRequestByEngineer(email) {
    return await axios.get(`/Request/getRequestByEngineer?email=${email}`);
  }

  static async getAllOrders(email) {
    return await axios.get(`/v1/order/getAll`);
  }
}
