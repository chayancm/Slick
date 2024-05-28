import styled from 'styled-components';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import axios from 'axios';
// Styled Components
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-left: 72px;
  margin-top:3opx
  font-size: 18px;
  text-align: left;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 12px 15px;
  border: 1px solid #ddd;
`;

const Tr = styled.tr`
  &:nth-of-type(even) {
    background-color: #f9f9f9;
  }
`;

const CouponTable = () => {
  const [coupons, setCoupons] = useState([]);
  //const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/coupon`);
        console.log(response.data.coupons);
        setCoupons(response.data.coupons);
        //setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl  "
        style={{
          maxHeight: 'auto',
          maxWidth:  "auto",
          width:'100%',
          height:'100%',
          overflow:'auto'

        }}>
      <Table>
        <thead>
          <Tr>
            <Th>Coupon ID</Th>
            <Th>Aggregator Type</Th>
            <Th>Type</Th>
            <Th>Publisher Name</Th>
            <Th>Cashback Type</Th>
            <Th>Minimum Off</Th>
            <Th>Start Date</Th>
            <Th>Expiration Time</Th>
            <Th>Coupon Code</Th>
            <Th>Merchant Link</Th>
            <Th>Affiliate URL</Th>
            <Th>Terms and Conditions</Th>
            <Th>Coupon Punchline</Th>
            <Th>Status</Th>
            <Th>Top Offer</Th>
            <Th>Hot of the Day</Th>
            <Th>Show With Category</Th>
            <Th>Description</Th>
            <Th>Store ID</Th>
          </Tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon.couponId}>
              <Td>{coupon.couponId}</Td>
              <Td>{coupon.AggregatorType}</Td>
              <Td>{coupon.type}</Td>
              <Td>{coupon.publisherName}</Td>
              <Td>{coupon.cashbackType}</Td>
              <Td>{coupon.minOff}</Td>
              <Td>{format(new Date(coupon.startDate), 'yyyy-MM-dd')}</Td>
              <Td>{format(new Date(coupon.expirationTime), 'yyyy-MM-dd')}</Td>
              <Td>{coupon.couponCode}</Td>
              <Td><a href={coupon.MerchantLink} target="_blank" rel="noopener noreferrer">Link</a></Td>
              <Td><a href={coupon.affiliateUrl} target="_blank" rel="noopener noreferrer">Link</a></Td>
              <Td>{coupon.termsAndConditions}</Td>
              <Td>{coupon.CouponPunchLine}</Td>
              <Td>{coupon.status}</Td>
              <Td>{coupon.topOffer}</Td>
              <Td>{coupon.hotOfTheDay}</Td>
              <Td>{coupon.showWithCategory}</Td>
              <Td>{coupon.description}</Td>
              <Td>{coupon.storeid}</Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      </div>
  );
};

export default CouponTable;
