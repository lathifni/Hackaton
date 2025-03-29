import React, { useState, useEffect } from 'react';
import { backend } from 'declarations/backend';

const SellerPage = ({ onNavigate }) => {
  // State untuk menyimpan data input
  const [coffeeList, setCoffeeList] = useState([]);
  const [formData, setFormData] = useState({
    coffeeId: '',
    sellerName: '',
    receiverName: '',
    location: '',
    receivedDate: '',
    quantityPCS: '',
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

  // Fungsi untuk handle perubahan input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Fungsi untuk handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Mengirim data:', formData);
      await backend.addSeller(
        formData.coffeeId,
        formData.sellerName,
        formData.receiverName,
        formData.location,
        formData.receivedDate,
        formData.quantityPCS,
        formData.notes
      );
      alert('Data saved successfully!');
      onNavigate('welcome');
    } catch (error) {
      console.error('Failed to save data:', error);
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
        {/* Tombol Kembali */}
        <button
          onClick={() => onNavigate('welcome')}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300 mb-4"
        >
          Back
        </button>

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Seller Data Input Form (Store/Supermarket)
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Nama Seller */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Store/Supermarket Name</label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Dropdown Pilih ID Kopi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Select ID Coffee</label>
              <select name="coffeeId" value={formData.coffeeId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500" required>
                {coffeeList.map((coffee) => (
                  <option key={coffee.id.toString()} value={coffee.id.toString()}>
                    {coffee.id.toString()}-{coffee.latin}-{coffee.farmerName}
                  </option>
                ))}
              </select>
            </div>

            {/* Nama Penerima */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Receiver Name</label>
              <input
                type="text"
                name="receiverName"
                value={formData.receiverName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Lokasi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Tanggal Diterima */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Received Date</label>
              <input
                type="date"
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Jumlah PCS */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Total (PCS)</label>
              <input
                type="number"
                name="quantityPCS"
                value={formData.quantityPCS}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                rows="3"
              />
            </div>

            {/* Tombol Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerPage;