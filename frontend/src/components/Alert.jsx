import  { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
function Alert({message}) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {showAlert && (
        <div className="bg-gray-100 border border-gray-300 rounded-md p-4">
          <p className="text-gray-800">{message}</p>
          <button
            onClick={handleClose}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
export default Alert;
