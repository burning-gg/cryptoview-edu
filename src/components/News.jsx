import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import demoImage from '../images/cryptonews.jpg';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: coinsData } = useGetCryptosQuery({ limit: 100, offset: 0 });

  if (isFetching) return <Loader />;

  const onChangeNewsCategory = (value) => {
    setNewsCategory(value);
  };

  const onFilterOption = (input, option) => {
    return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Title level={2} className='news-heading'>
            {newsCategory}
          </Title>
          <Select
            showSearch
            className='select-news'
            placeholder='Select a Crypto'
            optionFilterProp='children'
            onChange={(value) => onChangeNewsCategory(value)}
            filterOption={(input, option) => onFilterOption(input, option)}
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {coinsData?.data?.coins.map((coin, index) => (
              <Option value={coin.name} key={index}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      <Row gutter={[24, 24]} className='news-container'>
        {cryptoNews?.value.map((news, index) => (
          <Col key={index} className='news-wrapper'>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferrer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt='news'
                  />
                </div>
                <p>
                  {news.description.length > 200
                    ? `${news.description.substring(0, 200)} ...`
                    : news.description}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt='news'
                    />
                    <Text className='provider-name'>
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf('ss').fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default News;
