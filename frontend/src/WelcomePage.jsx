import React from 'react';

const WelcomePage = ({ onNavigate }) => {
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
        <h1 className="text-4xl font-bold text-gray-800 text-center">
          Welcome to CoffeeChain
        </h1>
        <p className="text-center font-bold">
          From the Farmer to Your Cup!
        </p>
        <p className="text-center">
          Track your coffee journey with ease and transparency
        </p>
        
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
          Choose Your Role:
        </h2>
        <div className="space-y-4">
          <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={() => onNavigate('farmer')} >
            Farmers
          </button>
          <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            onClick={() => onNavigate('collector')} >
            Collectors
          </button>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => onNavigate('distributor')} >
            Distributors
          </button>
          <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition duration-300"
            onClick={() => onNavigate('seller')} >
            Seller
          </button>
          <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={() => onNavigate('consumer')} >
            Consumers
          </button>

          <h2 className="text-center">Steps to Use the CoffeeChain App :</h2>
          <ol className="text-center">
              <li>1. Farmers input farmer data as well as coffee data.</li>
              <li>2. Collectors input collector data and collected coffee that can be selected through the coffee ID of the farmer's coffee that has been harvested and input previously.</li>
              <li>3. Distributor inputs distributor data and coffee to be distributed from the coffee that the distributor has collected. Allows more than one distributor according to the distribution flow that occurs.</li>
              <li>4. Seller inputs seller data and coffee to be sold based on coffee from the previous distributor.</li>
              <li>5. Consumers can see the track or origin of the coffee they want to buy from the farmer to the seller/supermarket.</li>
          </ol>

        </div>
      </div>
    </div>
  );
};

export default WelcomePage;