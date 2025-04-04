import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { OrderService } from './OrderService'; 

const mock = new MockAdapter(axios);

describe('OrderService', () => {
  afterEach(() => {
    mock.reset(); 
  });

  test('deve criar uma ordem de serviço (createOS)', async () => {
    const responseData = { message: 'Ordem criada com sucesso' };

    
    mock.onPost('/Request').reply(200, responseData);

    const title = 'Ordem de Serviço 1';
    const description = 'Descrição da ordem';
    const email = 'cliente@example.com';

    const response = await OrderService.createOS(title, description, email);

    expect(response.status).toBe(200);
 
    expect(response.data).toEqual(responseData);
  });

  test('deve editar uma ordem de serviço (EditOS)', async () => {
    const responseData = { message: 'Ordem de Serviço editada com sucesso' };

    const idRequest = 1;
    const title = 'Ordem de Serviço Editada';
    const description = 'Descrição da ordem editada';

    mock.onPost(`/Request/editRequest?idRequest=${idRequest}`).reply(200, responseData);

    const response = await OrderService.EditOS(title, description, idRequest);

    expect(response.status).toBe(200);

    expect(response.data).toEqual(responseData);
  });

  test('deve retornar uma ordem de serviço por ID (getOrderById)', async () => {
    const responseData = { id: 1, title: 'Ordem de Serviço 1', description: 'Descrição' };

    const id = 1;

    
    mock.onGet(`/v1/order/getById/${id}`).reply(200, responseData);


    const response = await OrderService.getOrderById(id);

    
    expect(response.status).toBe(200);

    expect(response.data).toEqual(responseData);
  });

  test('deve retornar todas as ordens de serviço (getAllOrders)', async () => {
    const responseData = [
      { id: 1, title: 'Ordem 1', description: 'Descrição 1' },
      { id: 2, title: 'Ordem 2', description: 'Descrição 2' }
    ];

    mock.onGet('/v1/order/getAll').reply(200, responseData);


    const response = await OrderService.getAllOrders();


    expect(response.status).toBe(200);

    expect(response.data).toEqual(responseData);
  });

  test('deve retornar erro se a requisição falhar', async () => {
    const errorMessage = 'Erro na requisição';

    mock.onPost('/Request').reply(500, { message: errorMessage });

    const title = 'Ordem de Serviço 1';
    const description = 'Descrição da ordem';
    const email = 'cliente@example.com';

    try {
     
      await OrderService.createOS(title, description, email);
    } catch (error) {
     
      expect(error.response.status).toBe(500);
      expect(error.response.data.message).toBe(errorMessage);
    }
  });
});