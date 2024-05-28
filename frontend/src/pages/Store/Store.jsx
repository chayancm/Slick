import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Table = styled.table`
width: 100%;
border-collapse: collapse;
margin-left: 72px;
margin-top:3opx
font-size: 12px;
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 5px;
  transition-duration: 0.4s;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StoreTable = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  let navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/store`); // Replace with your API endpoint
        console.log(response.data);
        setStores(response.data);
      } catch (error) {
        console.log('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (storeId) => {
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);

      const config = {
        method: 'delete',
        maxBodyLength: Infinity,
        url: `http://localhost:3600/AdminPanel/manageCategory/${storeId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios.request(config);
      setStores(stores.filter((item) => item.storeid !== storeId));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    console.log(record.storeid);
    navigate('/DashBoard/Edit_category', { state: { data: record } });
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = stores.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(stores.length / recordsPerPage);

  return (
    <div
      className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl"
      style={{
        maxHeight: 'auto',
        maxWidth: 'auto',
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Table>
        <thead>
          <tr>
            <Th>Store ID</Th>
            <Th>Store Name</Th>
            <Th>Merchant ID</Th>
            <Th>Alternate Name</Th>
            <Th>Store URL</Th>
            <Th>Store Logo</Th>
            <Th>Tracking Link</Th>
            <Th>Domain Name</Th>
            <Th>UTM Parameter</Th>
            <Th>Status</Th>
            <Th>Display On Menu</Th>
            <Th>Display On Notification</Th>
            <Th>Top Store</Th>
            <Th>Top Store In Footer</Th>
            <Th>Description</Th>
            <Th>Meta Title</Th>
            <Th>Meta Keyword</Th>
            <Th>Meta Canonical</Th>
            <Th>Meta Schema</Th>
            <Th>Meta Description</Th>
            <Th>Edit</Th>
            <Th>Delete</Th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((store) => (
            <Tr key={store.storeid}>
              <Td>{store.storeid}</Td>
              <Td>{store.storeName}</Td>
              <Td>{store.merchantId}</Td>
              <Td>{store.storeAlternateName}</Td>
              <Td>
                <a href={store.storeUrl} target="_blank" rel="noopener noreferrer">
                  {store.storeUrl}
                </a>
              </Td>
              <Td>{store.storeLogo}</Td>
              <Td>{store.TrackingLink}</Td>
              <Td>{store.storeDomainName}</Td>
              <Td>{store.utmParameter}</Td>
              <Td>{store.status}</Td>
              <Td>{store.displayOnMenu}</Td>
              <Td>{store.displayOnNotificaton}</Td>
              <Td>{store.topStore}</Td>
              <Td>{store.topStoreInFooter}</Td>
              <Td>{store.storeDescription}</Td>
              <Td>{store.metaTitle}</Td>
              <Td>{store.metaKeyword}</Td>
              <Td>{store.metaCanonical}</Td>
              <Td>{store.metaSchema}</Td>
              <Td>{store.metaDescription}</Td>
              <Td>
                <button
                  type="button"
                  onClick={() => handleEdit(store)}
                  style={{
                    backgroundColor: '#4CAF50',
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    transitionDuration: '0.4s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
                >
                  Edit
                </button>
              </Td>
              <Td>
                <button
                  type="button"
                  onClick={() => handleDelete(store.storeid)}
                  style={{
                    backgroundColor: '#f44336', // Red
                    border: 'none',
                    color: 'white',
                    padding: '10px 20px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                    margin: '4px 2px',
                    cursor: 'pointer',
                    borderRadius: '12px',
                    transitionDuration: '0.4s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#da190b')}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#f44336')}
                >
                  Delete
                </button>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </PageButton>
        <PageButton onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </PageButton>
      </Pagination>
    </div>
  );
};

export default StoreTable;
