import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const TopOfferSection = styled.section`
  padding: 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  height: auto;
`;

const Title = styled.div`
  text-align: left;
  h3 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

const TodayTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const OfferIn = styled.div<{ hover: boolean }>`
  border: 1px solid #e8e8e8;
  text-align: center;
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  transition: 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${props =>
    props.hover &&
    css`
      .off-over {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        padding-top: 50px;
        background: rgba(255, 255, 255, 0.9);
        width: 100%;
        height: 100%;
        transition: 0.4s ease-in-out;
        z-index: 3;
      }

      .btn {
        display: inline-block;
        margin-bottom: 30px;
      }

      .btm-offer {
        border-top: 2px dashed transparent;
      }
    `}
`;

const OfferTopIn = styled.div`
  position: relative;
  overflow: hidden;
  transition: 0.4s ease-in-out;
`;

const OfferTitle = styled.h6`
  font-size: 13px;
  padding: 0 30px;
  text-transform: uppercase;
  font-weight: bold;
  line-height: 22px;
  margin-top: 20px;
`;

const OfferExpiry = styled.p`
  font-size: 12px;
  color: #777;
  font-weight: bold;
  text-transform: uppercase;
  transition: 0.4s ease-in-out;
`;

const BtmOffer = styled.div`
  border-top: 2px dashed #ccc;
  padding-top: 10px;
  transition: 0.4s ease-in-out;
  span {
    color: #282828;
    font-weight: bold;
  }
`;

const OffOver = styled.div`
  position: absolute;
  top: -100%;
  transition: 0.4s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CouponButton = styled.a`
  display: none;
  text-decoration: none;
  background-color: #ffdd00;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background 0.3s;
  &:hover {
    background-color: #e0e0e0;
    color: #555;
  }
`;

const TopOffer: React.FC = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => setHoverIndex(index);
  const handleMouseLeave = () => setHoverIndex(null);

  return (
    <TopOfferSection className="top-offer">
      <Container className="container">
        <Title className="tittle">
          <h3>Today’s Top Offers</h3>
        </Title>
        <TodayTop className="today-top">
          {[0].map((_, index) => (
            <OfferIn
              key={index}
              className="offer-in"
              hover={hoverIndex === index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <OfferTopIn className="offer-top-in">
                <OfferTitle>Flat 20% + Extra 30% Off On All Products</OfferTitle>
                <OfferExpiry>Expires: 1/31/2015</OfferExpiry>
                <BtmOffer className="btm-offer">
                  <OfferExpiry>
                    + up to <span>5% Cash Back</span> (was 3%)
                  </OfferExpiry>
                </BtmOffer>
              </OfferTopIn>
              <OffOver className="off-over">
                <OfferTitle>Flat 20% + Extra 30% Off On All Products</OfferTitle>
                <OfferExpiry>Expires: 1/31/2015</OfferExpiry>
                <CouponButton href="#." className="btn">Get Coupon Code</CouponButton>
                <BtmOffer className="btm-offer">
                  <OfferExpiry>
                    + up to <span>5% Cash Back</span> (was 3%)
                  </OfferExpiry>
                </BtmOffer>
              </OffOver>
            </OfferIn>
          ))}
        </TodayTop>
      </Container>
    </TopOfferSection>
  );
};

export default TopOffer;
