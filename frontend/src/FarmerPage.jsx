import React, { useState } from 'react';
import { backend } from 'declarations/backend';

const FarmerPage = ({ onNavigate }) => {
  // State untuk menyimpan data input
  const [formData, setFormData] = useState({
    farmerName: '',
    coffeeType: '',
    latin:'',
    plantedDate: '',
    harvestedDate: '',
    location: '',
    notes: '',
  });

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
    console.log("Mengirim data:", formData);

    try {
      // Kirim data ke backend ICP
      const newCoffeeId = await backend.addCoffee(
        formData.farmerName,
        formData.coffeeType,
        formData.latin,
        formData.location,
        formData.harvestedDate,
        formData.plantedDate,
        formData.notes
      );

      console.log("Coffee successfully added with ID:", newCoffeeId);
      alert(`Coffee data saved successfully! ID: ${newCoffeeId}`);

      // Reset form
      setFormData({
        farmerName: "",
        coffeeType: "",
        latin:"",
        plantedDate: "",
        harvestedDate: "",
        location: "",
        notes: "",
      });
    } catch (error) {
      console.error("Failed to save data:", error);
      alert("An error occurred while saving the data.");
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
          Farmer Data Input Form
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Nama Petani */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Farmer Name</label>
              <input
                type="text"
                name="farmerName"
                value={formData.farmerName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Jenis Kopi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Coffee Variety</label>
              <input
                type="text"
                name="coffeeType"
                value={formData.coffeeType}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Latin Kopi */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Latin</label>
              <input
                type="text"
                name="latin"
                value={formData.latin}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Tanggal Ditanam */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Planted Date</label>
              <input
                type="date"
                name="plantedDate"
                value={formData.plantedDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Tanggal Dipanen */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Harvested Date</label>
              <input
                type="date"
                name="harvestedDate"
                value={formData.harvestedDate}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Lokasi Kebun */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Farm Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Catatan Tambahan */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
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

export default FarmerPage;