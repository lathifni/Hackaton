import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const DistributorPage = ({ onNavigate }) => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [currentDistributor, setCurrentDistributor] = useState({
    coffeeId: '',
    name: '',
    shippedDate: '',
    transportMode: '',
    origin: '',
    destination: '',
    notes: '',
  });

  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const coffees = await backend.getAllCoffee();
        console.log(coffees);
        setCoffeeList(coffees);
        if (coffees.length > 0) {
          setCurrentDistributor((prev) => ({ ...prev, coffeeId: coffees[0].id.toString() }));
        }
      } catch (error) {
        console.error('Failed to retrieve coffee data:', error);
      }
    };

    fetchCoffeeData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentDistributor({
      ...currentDistributor,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Mengirim data:', currentDistributor);
      await backend.addDistributor(
        BigInt(currentDistributor.coffeeId), // Konversi ke BigInt
        currentDistributor.name,
        currentDistributor.shippedDate,
        currentDistributor.transportMode,
        currentDistributor.origin,
        currentDistributor.destination,
        currentDistributor.notes
      );
      alert('Distributor data saved successfully!');
      onNavigate('welcome');
    } catch (error) {
      console.error('Failed to save distributor data:', error);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <button
          onClick={() => onNavigate('welcome')}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-4"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Dictributor Data Input Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Distributor</label>
              <input
                type="text"
                name="name"
                value={currentDistributor.name}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Select Coffee ID</label>
              <select 
                name="coffeeId" 
                value={currentDistributor.coffeeId} 
                onChange={handleInputChange} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" 
                required
              >
                {coffeeList.map((coffee) => (
                  <option key={coffee.id.toString()} value={coffee.id.toString()}>
                    {coffee.id.toString()} - {coffee.latin} - {coffee.farmerName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Shipped Date</label>
              <input
                type="date"
                name="shippedDate"
                value={currentDistributor.shippedDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Transportation Mode</label>
              <select
                name="transportMode"
                value={currentDistributor.transportMode}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              >
                <option value="">Select Transportation Mode</option>
                <option value="Truck">Trucks</option>
                <option value="Pickup">Pickup</option>
                <option value="Sea Ship">Sea Ship</option>
                <option value="Plane">Plane</option>
                <option value="Motorcycle">Motorcycle</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Origin</label>
              <input
                type="text"
                name="origin"
                value={currentDistributor.origin}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                name="destination"
                value={currentDistributor.destination}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={currentDistributor.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributorPage;
