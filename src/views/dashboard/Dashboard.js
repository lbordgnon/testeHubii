import React from 'react';
import { Grid, Box, OutlinedInput, InputAdornment } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import { OrderService } from '../../api/OrderService';
import { useState, useEffect } from 'react';
import DashboardOrderList from './components/DashboardOrderList';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

export const Dashboard = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    getAllOrders();
  }, []);

  const getAllOrders = async () => {
    await OrderService.getAllOrders()
      .then(function (response) {
        setOrdersList(response.data);
      })
      .catch(function (error) {});
  };

  const handleChange = async (filter) => {
    setQuery(filter);
  };

  const handleSearchRequest = async () => {
    if (query.length > 0) {
      const filteredOrders = ordersList.filter(
        (order) => order.status === query || order.customer.name === query,
      );
      setOrdersList(filteredOrders);
    } else {
      getAllOrders();
    }
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <OutlinedInput
              fullWidth
              id="filled-adornment-password"
              variant="outlined"
              type="text"
              value={query}
              onChange={(e) => {
                handleChange(e.target.value);
              }}
              onBlur={() => handleSearchRequest()}
              onClick={() => handleSearchRequest()}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" edge="end">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />

            <DashboardOrderList orders={ordersList} />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
