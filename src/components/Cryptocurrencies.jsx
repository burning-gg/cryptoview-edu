import React, { Fragment, useState, useEffect } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Typography, Card, Row, Col, Input, Pagination } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title } = Typography;

const Cryptocurrencies = ({ simplified }) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  let offset = (page - 1) * limit;

  useEffect(() => {
    if (simplified) {
      setLimit(10);
    }
  }, [simplified]);

  const { data: cryptosList, isFetching } = useGetCryptosQuery({
    limit,
    offset,
  });

  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCryptos(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const onChangePage = (newPage) => {
    setPage(newPage);
  };

  const onShowSizeChangePage = (current, pageSize) => {
    setLimit(pageSize);
  };

  return (
    <Fragment>
      {!simplified && (
        <Fragment>
          <Title level={2} className='heading'>
            All cryptocurrencies (sorted by Market Cap)
          </Title>
          <div className='crypto-search'>
            <Input
              placeholder='Search Cryptocurrency'
              onChange={(e) => onChangeSearchTerm(e)}
            />
          </div>
        </Fragment>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.iconUrl}
                    alt='Currency'
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {!simplified && (
        <Pagination
          className='pagination-crypto'
          total={100}
          current={page}
          defaultCurrent={1}
          pageSize={limit}
          defaultPageSize={20}
          onChange={(newPage) => {
            onChangePage(newPage);
          }}
          onShowSizeChange={(current, pageSize) => {
            onShowSizeChangePage(current, pageSize);
          }}
        />
      )}
    </Fragment>
  );
};

export default Cryptocurrencies;
