import { VEHICLES_DATA } from './vehicles_data.js';

class DataManager {
    constructor() {
        if (DataManager.instance) {
            return DataManager.instance;
        }
        this.vehicles = [];
        this.services = [
            {
                name: "Oil Change",
                image: "images/placeholder.jpg",
                description: "Full synthetic oil change with filter replacement and fluid top-off.",
                price: "$79.99",
                duration: "45 mins"
            },
            {
                name: "Brake Service",
                image: "images/placeholder.jpg",
                description: "Comprehensive brake inspection, pad replacement, and rotor resurfacing.",
                price: "$199.99",
                duration: "2 hours"
            },
            {
                name: "Tire Rotation",
                image: "images/placeholder.jpg",
                description: "Professional tire rotation and balancing for even wear and better handling.",
                price: "$49.99",
                duration: "30 mins"
            }
        ];
        this.brands = {};
        this.isLoaded = false;
        this.loadPromise = null;
        DataManager.instance = this;
    }

    async init() {
        if (this.loadPromise) return this.loadPromise;
        
        this.loadPromise = (async () => {
            try {
                console.log("Initializing DataManager...");
                await this.fetchVehicles();
                this.isLoaded = true;
                console.log("DataManager initialized. Vehicles loaded:", this.vehicles.length);
                return this.vehicles;
            } catch (error) {
                console.error("Failed to initialize DataManager:", error);
                this.isLoaded = true;
                return [];
            }
        })();

        return this.loadPromise;
    }

    async fetchVehicles() {
        if (this.isLoaded) return this.vehicles;

        // Use embedded data from VEHICLES_DATA
        // Flatten the object of arrays into a single array
        this.vehicles = Object.values(VEHICLES_DATA).flat();

        this._extractBrands();
        return this.vehicles;
    }

    _extractBrands() {
        this.brands = this.vehicles.reduce((acc, vehicle) => {
            if (!acc[vehicle.brand]) {
                acc[vehicle.brand] = 0;
            }
            acc[vehicle.brand]++;
            return acc;
        }, {});
    }

    search(query) {
        if (!query) return { vehicles: [], services: [] };
        const lowerQuery = query.toLowerCase();
        
        const vehicleMatches = this.vehicles.filter(v => 
            v.brand.toLowerCase().includes(lowerQuery) ||
            v.model.toLowerCase().includes(lowerQuery)
        ).slice(0, 5); 

        const serviceMatches = this.services.filter(s => 
            s.name.toLowerCase().includes(lowerQuery)
        ).slice(0, 3);

        return { vehicles: vehicleMatches, services: serviceMatches };
    }

    getAllVehicles() {
        return this.vehicles;
    }
}

const dataManager = new DataManager();
window.DataManager = dataManager;
export default dataManager;
