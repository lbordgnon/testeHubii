import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import { OrderService } from '../../api/OrderService';
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';

export const OrderDetails = () => {
  const [orderResponse, setOrderResponse] = useState({});

  let { idOrder } = useParams();

  useEffect(() => {
    getOrderById();
  }, []);

  const getOrderById = async () => {
    await OrderService.getOrderById(idOrder)
      .then(function (response) {
        setOrderResponse(response.data);
      })
      .catch(function (error) {});
  };

  return (
    <PageContainer title="Typography" description="this is Typography">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Pedido">
            <Grid container spacing={3}>
              <Grid item sm={8}>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Nº
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.id}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Cliente
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse?.customer?.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Valor total:
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.total}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Método de envio
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.shipping_method}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Items
                  </Typography>
                  {orderResponse?.items?.map((order) => (
                    <>
                      <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                        {order.name}
                      </Typography>
                    </>
                  ))}
                </Stack>
              </Grid>
              <Grid item sm={4}>
                <Stack spacing={2}>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Status
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.status}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Endereço do cliente
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.customer?.address}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Valor da entrega
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.delivery_cost}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Estimativa da entrega
                  </Typography>
                  <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                    {orderResponse.delivery_estimated}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    component="label"
                    htmlFor="name"
                    mb="5px"
                  >
                    Quantidade
                  </Typography>
                  {orderResponse?.items?.map((order) => (
                    <>
                      <Typography variant="body1" component="label" htmlFor="name" mb="5px">
                        {order.quantity}
                      </Typography>
                    </>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default OrderDetails;
