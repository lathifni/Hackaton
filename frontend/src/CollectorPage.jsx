import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const CollectorPage = ({ onNavigate }) => {
  const [coffeeList, setCoffeeList] = useState([]);
  const [formData, setFormData] = useState({
    coffeeId: '',
    collectorName: '',
    collectDate: '',
    collectionLocation: '',
    coffeeQuantity: '',
    coffeeQuality: '',
    notes: '',
  });


  useEffect(() => {
    const fetchCoffeeData = async () => {
      try {
        const coffees = await backend.getAllCoffee(); // Sesuaikan dengan fungsi di backend
        console.log(coffees)
        setCoffeeList(coffees);
        if (coffees.length > 0) {
          setFormData((prev) => ({ ...prev, coffeeId: coffees[0].id })); // Set default ke ID pertama
        }
      } catch (error) {
        console.error('Failed to retrieve coffee data:', error);
      }
    };

    fetchCoffeeData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Mengirim data:', formData);
      await backend.addCollector(
        formData.coffeeId,
        formData.collectorName,
        formData.collectionLocation,
        formData.collectDate,
        formData.coffeeQuantity,
        formData.coffeeQuality,
        formData.notes
      );
      alert('Data saved successfully!');
      onNavigate('welcome');
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1459755486867-b55449bb39ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={() => onNavigate('welcome')} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-4">
          Back
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Collector Data Input Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Dropdown Pilih ID Kopi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select Coffee ID</label>
              <select name="coffeeId" value={formData.coffeeId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required>
                {coffeeList.map((coffee) => (
                  <option key={coffee.id.toString()} value={coffee.id.toString()}>
                    {coffee.id.toString()}-{coffee.latin}-{coffee.farmerName}
                  </option>
                ))}
              </select>
            </div>

            {/* Input lainnya */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Collector Name</label>
              <input type="text" name="collectorName" value={formData.collectorName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Received Date</label>
              <input type="date" name="collectDate" value={formData.collectDate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Collection Location</label>
              <input type="text" name="collectionLocation" value={formData.collectionLocation} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Amount of Coffee Received (kg)</label>
              <input type="number" name="coffeeQuantity" value={formData.coffeeQuantity} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Coffee Quality</label>
              <select name="coffeeQuality" value={formData.coffeeQuality} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required>
                <option value="">Select Quality</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" rows="3" />
            </div>

            <div>
              <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectorPage;