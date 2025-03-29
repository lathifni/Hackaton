import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const ConsumerPage = ({ onNavigate }) => {
  const [coffeeList, setCoffeeList] = useState([]);
  // const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [coffeeData, setCoffeeData] = useState(null);

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const coffees = await backend.getAllCoffee();
        setCoffeeList(coffees);
      } catch (error) {
        console.error('Failed to retrieve coffee data:', error);
      }
    };
    fetchCoffeeData();
  }, []);

  const handleSelectChange = async (e) => {
    const coffeeId = e.target.value;
    
    const selected = coffeeList.find((coffee) => coffee.id.toString() === coffeeId);
    if (selected) {
      setCoffeeData(selected);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => onNavigate('welcome')}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-4"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Select Coffee</h1>

        {/* Dropdown Pilih ID Kopi */}
        <select
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          onChange={handleSelectChange}
        >
          <option value="">Select ID Coffee</option>
          {coffeeList.map((coffee) => (
            <option key={coffee.id.toString()} value={coffee.id.toString()}>
              {coffee.id.toString()} - {coffee.latin} - {coffee.farmerName}
            </option>
          ))}
        </select>

        {/* Menampilkan Riwayat Perjalanan Kopi */}
        {coffeeData && (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Farmer</h3>
              <p className="text-sm text-gray-600"><strong>Name:</strong> {coffeeData.farmerName}</p>
              <p className="text-sm text-gray-600"><strong>Planted:</strong> {coffeeData.plantedDate}</p>
              <p className="text-sm text-gray-600"><strong>Harvested:</strong> {coffeeData.harvestDate}</p>
              <p className="text-sm text-gray-600"><strong>Notes:</strong> {coffeeData.notes}</p>
            </div>
            
            {coffeeData.collector?.map((collector, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Collector</h3>
                <p className="text-sm text-gray-600"><strong>Name:</strong> {collector.name}</p>
                <p className="text-sm text-gray-600"><strong>Date:</strong> {collector.collectDate}</p>
                <p className="text-sm text-gray-600"><strong>Location:</strong> {collector.location}</p>
                <p className="text-sm text-gray-600"><strong>Quality:</strong> {collector.quality}</p>
                <p className="text-sm text-gray-600"><strong>Quantity:</strong> {collector.quantity}</p>
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {collector.notes}</p>
              </div>
            ))}
            
            {coffeeData.distributors?.map((distributor, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Distributor</h3>
                <p className="text-sm text-gray-600"><strong>Name:</strong> {distributor.name}</p>
                <p className="text-sm text-gray-600"><strong>Date:</strong> {distributor.shippedDate}</p>
                <p className="text-sm text-gray-600"><strong>Transformation Mode:</strong> {distributor.transportMode}</p>
                <p className="text-sm text-gray-600"><strong>Origin:</strong> {distributor.origin}</p>
                <p className="text-sm text-gray-600"><strong>Destination:</strong> {distributor.destination}</p>
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {distributor.notes}</p>
              </div>
            ))}
            
            {coffeeData.seller?.map((seller, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-700">Seller</h3>
                <p className="text-sm text-gray-600"><strong>Name:</strong> {seller.name}</p>
                <p className="text-sm text-gray-600"><strong>Receiver Name:</strong> {seller.receiverName}</p>
                <p className="text-sm text-gray-600"><strong>Accepted pada:</strong> {seller.receiveDate}</p>
                <p className="text-sm text-gray-600"><strong>Location:</strong> {seller.location}</p>
                <p className="text-sm text-gray-600"><strong>Quantity:</strong> {seller.quantity}</p>
                <p className="text-sm text-gray-600"><strong>Notes:</strong> {seller.notes}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsumerPage;