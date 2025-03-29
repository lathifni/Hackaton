import Array "mo:base/Array";
import Text "mo:base/Text";
import Nat "mo:base/Nat";

actor class CoffeeBackend() = this {

  stable var coffeeStorage: [Coffee] = [];
  stable var nextId: Nat = 1;

  type Coffee = {
    id: Nat;
    farmerName: Text;
    latin: Text;
    coffeeType: Text;
    farmLocation: Text;
    harvestDate: Text;
    plantedDate: Text;
    notes: Text;
    collector: ?Collector;
    distributors: [Distributor];
    seller: ?Seller;
  };

  type Collector = { name: Text; location: Text; collectDate: Text; quantity:Text; quality:Text; notes:Text; };
  type Distributor = { name: Text; shippedDate: Text; transportMode: Text; origin:Text; destination:Text; notes:Text };
  type Seller = { name: Text; receiverName: Text; location: Text; receiveDate: Text; quantity:Text; notes: Text};

  // ✅ Ambil semua kopi
  public query func getAllCoffee(): async [Coffee] {
    return coffeeStorage;
  };

  // ✅ Tambah kopi baru
  public func addCoffee(
    farmerName: Text, coffeeType: Text, latin: Text, 
    farmLocation: Text, harvestDate: Text, plantedDate: Text, notes: Text
  ): async Nat {
    let newCoffee: Coffee = {
      id = nextId;
      farmerName = farmerName;
      coffeeType = coffeeType;
      latin = latin;
      farmLocation = farmLocation;
      harvestDate = harvestDate;
      plantedDate = plantedDate;
      notes = notes;
      collector = null;
      distributors = [];
      seller = null;
    };

    coffeeStorage := Array.append(coffeeStorage, [newCoffee]);
    nextId += 1;
    return newCoffee.id;
  };

  // ✅ Tambah collector ke kopi yang ada
  public func addCollector(id: Nat, name: Text, location: Text, collectDate: Text, quantity: Text, quality:Text, notes:Text): async Bool {
    coffeeStorage := Array.map<Coffee, Coffee>(
      coffeeStorage,
      func (coffee: Coffee): Coffee {
        if (coffee.id == id) {
          return { coffee with collector = ?{ 
            name = name; location = location; collectDate = collectDate;
            quantity = quantity; quality = quality; notes = notes;
            } };
        } else {
          return coffee;
        };
      }
    );
    return true;
  };

  // ✅ Tambah distributor ke kopi yang ada
  public func addDistributor(id: Nat, name: Text, shippedDate: Text, transportMode: Text, origin:Text, destination:Text, notes:Text): async Bool {
    coffeeStorage := Array.map<Coffee, Coffee>(
      coffeeStorage,
      func (coffee: Coffee): Coffee {
        if (coffee.id == id) {
          let newDistributor: Distributor = 
          { 
            name = name; shippedDate = shippedDate;
            transportMode = transportMode; origin = origin;
            destination = destination; notes = notes;
           };
          return { coffee with distributors = Array.append(coffee.distributors, [newDistributor]) };
        } else {
          return coffee;
        };
      }
    );
    return true;
  };

  // ✅ Tambah seller ke kopi yang ada
  public func addSeller(id: Nat, name: Text, receiverName:Text, location: Text, receiveDate: Text, quantity:Text, notes:Text,): async Bool {
    coffeeStorage := Array.map<Coffee, Coffee>(
      coffeeStorage,
      func (coffee: Coffee): Coffee {
        if (coffee.id == id) {
          return { coffee with seller = ?{ name = name; receiverName = receiverName; location = location; receiveDate = receiveDate; quantity = quantity; notes = notes } };
        } else {
          return coffee;
        };
      }
    );
    return true;
  };

  // ✅ Ambil kopi berdasarkan ID
  public query func getCoffee(id: Nat): async ?Coffee {
    return Array.find<Coffee>(coffeeStorage, func (c) { c.id == id });
  };
};
