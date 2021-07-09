import React from 'react';
import Layout from '../components/Layout/index';
import { Avatar, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import accounting from 'accounting-js';

export default function Home({ coins }) {
  function convertExponentialToDecimal(exponentialNumber) {
    const str = exponentialNumber.toString().replace('.', '');
    if (str.indexOf('e') !== -1) {
      const exponent = parseInt(str.split('-')[1], 10);
      const result = Number(str).toFixed(exponent);
      return result;
    } else {
      return exponentialNumber;
    }
  }

  const rows = (coins) => {
    return coins.map((coin, inx) => {
      return {
        id: coin.id,
        name: { image: `${coin.image}`, name: `${coin.name}` },
        price: convertExponentialToDecimal(coin.market_data.current_price),
        '24h': coin.market_data.price_change_percentage_24h_in_currency,
        '7d': coin.market_data.price_change_percentage_7d_in_currency,
        marketCap:
          coin.market_data.market_cap === 0
            ? '?'
            : `$${accounting.formatNumber(coin.market_data.market_cap)}`,
        circulating_supply:
          coin.circulating_supply === 0
            ? '?'
            : accounting.formatNumber(coin.circulating_supply),
        // actions: 'actions',
      };
    });
  };
  const columns = [
    // {
    //   field: 'image',
    //   headerName: ' ',
    //   width: 125,
    //   renderCell: (params) => {
    //     return (
    //       <Avatar
    //         src={`http://localhost:888/assets/coins_thumb/${params.value}`}
    //         variant='square'
    //         style={{ height: '30px', width: '30px', marginRight: 'auto' }}
    //       />
    //     );
    //   },
    // },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Avatar
              src={`http://localhost:888/assets/coins_thumb/${params.formattedValue.image}`}
              variant='square'
              style={{ height: '15px', width: '15px', marginRight: '10px' }}
            />
            <Typography>{params.formattedValue.name}</Typography>
          </>
        );
      },
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 200,
      renderCell: (params) => {
        return <Typography> {params.value}</Typography>;
      },
    },
    {
      field: '24h',
      headerName: '24h',
      width: 150,
      renderCell: (params) => {
        return (
          <Typography color={params.value < 0 ? 'error' : ''}>
            {' '}
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: '7d',
      headerName: '7d',
      width: 150,
      renderCell: (params) => {
        return (
          <Typography color={params.value < 0 ? 'error' : ''}>
            {' '}
            {params.value}
          </Typography>
        );
      },
    },
    {
      field: 'marketCap',
      headerName: 'Mkt Cap',
      width: 175,
      renderCell: (params) => {
        return <Typography> {params.value}</Typography>;
      },
    },
    {
      field: 'circulating_supply',
      headerName: 'Circulating Supply',
      width: 200,
      renderCell: (params) => {
        return <Typography> {params.value}</Typography>;
      },
    },

    // {
    //   field: 'actions',
    //   headerName: 'ACTIONS',
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className={classes.actions}>
    //         <a
    //           href='#'
    //           onClick={(e) => {
    //             e.preventDefault();
    //             return (
    //               setRequestUpdate(true),
    //               initUpdate(rows(products), params.id),
    //               setOpen(true)
    //             );
    //           }}
    //         >
    //           Edit
    //         </a>
    //         <a
    //           href='#'
    //           onClick={(e) => {
    //             e.preventDefault();
    //             dispatch(deleteProduct(params.id));
    //           }}
    //         >
    //           Delete
    //         </a>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <>
      <Layout pageName='Homepage'>
        <h1>HomePage</h1>
        <DataGrid
          autoHeight
          rows={rows(coins)}
          columns={columns}
          pagination
          pageSize={7}
          disableSelectionOnClick={true}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  console.log(process.env.BASE_URL);
  const res = await fetch(`${process.env.BASE_URL}/api/v1/coins`);
  const coins = await res.json();

  if (!coins) {
    return {
      notFound: true,
    };
  }

  return {
    props: { coins },
  };
}
