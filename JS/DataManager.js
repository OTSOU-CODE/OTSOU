import { VEHICLES_DATA } from './vehicles_data.js';

class DataManager {
    constructor() {
        if (DataManager.instance) {
            return DataManager.instance;
        }
        this.vehicles = [];
        this.services = [
            {
                name: "Car Seat Restoration",
                image: "images/gallery/Black-&-Orange.webp",
                description: "Complete car seat rebuilding, leather replacement, comfort upgrades, and heated seat installations.",
                price: "2500 MAD",
                duration: "3-5 days"
            },
            {
                name: "Bike Seat Restoration",
                image: "images/gallery/Blue.webp",
                description: "Professional motorcycle and bicycle seat restoration, foam shaping, custom stitching, and weatherproofing.",
                price: "800 MAD",
                duration: "2 days"
            },
            {
                name: "Dashboard Restoration",
                image: "images/gallery/Dark-blue-&-white.webp",
                description: "Restoring cracked or faded dashboards with premium leather wrap and precision stitching.",
                price: "1500 MAD",
                duration: "3 days"
            },
            {
                name: "Custom Stitching & Piping",
                image: "images/gallery/Red.webp",
                description: "Adding luxury bespoke stitching details, contrasting threads, and edge piping.",
                price: "500 MAD",
                duration: "1 day"
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
            const brand = vehicle.brand;
            if (brand === '__proto__' || brand === 'constructor') return acc;
            if (!Object.prototype.hasOwnProperty.call(acc, brand)) {
                acc[brand] = 0;
            }
            acc[brand]++;
            return acc;
        }, Object.create(null));
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
