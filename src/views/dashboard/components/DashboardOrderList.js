import React from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import IconButton from '@mui/material/IconButton';
import EditNoteIcon from '@mui/icons-material/EditNote';
import StarIcon from '@mui/icons-material/Star';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../../../api/OrderService';
import Cookie from 'js.cookie';

export const DashboardOrderList = ({ orders, engineer }) => {
  const history = useNavigate();
  const userLogin = Cookie.get('email');

  const editorder = async (id) => {
    history(`/create-os/${id}`);
  };

  const cancelorder = async (id) => {
    await OrderService.cancelOS(id)
      .then(function (response) {})
      .catch(function (error) {});
  };

  const AddEngineer = async (id) => {
    await OrderService.AddEngineer(id, userLogin)
      .then(function (response) {
        orders = response;
      })
      .catch(function (error) {});
  };

  const orderDetails = async (id) => {
    history(`/order-details/${id}`);
  };

  const addRate = async (id, idEngineer) => {
    history(`/csat/${id}/${idEngineer}`);
  };

  return (
    <DashboardCard title="Lista de ordens de Serviço">
      <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Numero do Pedido
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Cliente
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  valor
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => orderDetails(order.id)}
                  >
                    {order.id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => orderDetails(order.id)}
                  >
                    {order.customer.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => orderDetails(order.id)}
                  >
                    {order.total}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      fontSize: '15px',
                      fontWeight: '500',
                      cursor: 'pointer',
                    }}
                    onClick={() => orderDetails(order.id)}
                  >
                    {order.status}
                  </Typography>
                </TableCell>
                {order.status <= 2 && (
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      <IconButton aria-label="delete" onClick={() => editorder(order.id)}>
                        <EditNoteIcon />
                      </IconButton>
                      <IconButton aria-label="Close" onClick={() => cancelorder(order.id)}>
                        <CloseIcon />
                      </IconButton>
                      {engineer && (
                        <IconButton aria-label="Personal" onClick={() => AddEngineer(order.id)}>
                          <PersonAddIcon />
                        </IconButton>
                      )}
                    </Typography>
                  </TableCell>
                )}
                {order.status === 3 && !order.hasCsat && !engineer && (
                  <TableCell>
                    <Typography
                      sx={{
                        fontSize: '15px',
                        fontWeight: '500',
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => addRate(order.id, order.idEngineer)}
                      >
                        <StarIcon />
                      </IconButton>
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default DashboardOrderList;
