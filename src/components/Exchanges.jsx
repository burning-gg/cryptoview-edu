import React, { Fragment, useState, useEffect } from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Input, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Title, Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  const [exchangesList, setExchangesList] = useState(data?.data?.exchanges);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = data?.data?.exchanges.filter((exchange) =>
      exchange.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setExchangesList(filteredData);
  }, [data, searchTerm]);

  if (isFetching) return <Loader />;

  const onChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Fragment>
      <Title level={2} className='heading'>
        All exchanges (sorted by 24h Trade Volume)
      </Title>
      <div className='crypto-search'>
        <Input
          placeholder='Search Exchange'
          onChange={(e) => onChangeSearchTerm(e)}
        />
      </div>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {exchangesList?.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={
                  <Row key={exchange.id}>
                    <Col span={6}>
                      <Text>
                        <strong>{exchange.rank}.</strong>
                      </Text>
                      <Avatar
                        className='exchange-image'
                        src={exchange.iconUrl}
                      />
                      <Text>
                        <strong>{exchange.name}.</strong>
                      </Text>
                    </Col>
                    <Col span={6}>{'$' + millify(exchange.volume)}</Col>
                    <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    <Col span={6}>{millify(exchange.marketShare)}%</Col>
                  </Row>
                }
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
};

export default Exchanges;
