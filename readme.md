# 🏋️ OpenLayersGyms

A web mapping application that visualizes the best gyms in Le Plateau Mont-Royal, Montreal. Built with **OpenLayers** and **Vite**, this interactive map allows users to toggle base maps, view gym locations, and explore roads and borough boundaries through custom GeoJSON layers.

This script was developed as a requirement for the Graduate Certificate in GIS at the Centre of Geographic Sciences, NSCC, Lawrencetown, Nova Scotia.

For educational purposes only.
© 2025 COGS. Created by Brian Gauthier, March 11, 2025.

## 📌 Project Summary

- **Program:** `main.js`  
- **Author:** Brian Gauthier  
- **Purpose:** To build a foundational web mapping app showcasing gyms in Le Plateau Mont-Royal  
- **Date:** March 11, 2025  
- **Tools Used:** OpenLayers, Vite, HTML/CSS/JS


## 🚀 Features

- ✅ Interactive OpenLayers map with multiple base layers:
  - Street Map (OSM)
  - Light Grey Map (ESRI)
  - Terrain Map (Stadia Maps)
  - Watercolour Map (Stadia Maps)
- ✅ Toggle visibility of:
  - 🏋️ Gym locations (`gyms.geojson`)
  - 🛣️ Road networks (`roads.geojson`)
  - 🏘️ Borough boundaries (`borough.geojson`)
- ✅ Live mouse coordinates in WGS 84 (`EPSG:4326`)
- ✅ Custom icons and symbology for map features

## 📁 Project Structure
```OpenLayersGyms/
├── css/
│   └── style.css
├── geojsons/
│   ├── gyms.geojson
│   ├── roads.geojson
│   └── borough.geojson
├── icons/
│   └── dumbbell.png
├── images/
│   └── screenshot1.png
├── scripts/
│   └── main.js
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
└── readme.md
```


## 🧪 Running Locally

Make sure you have [Node.js](https://nodejs.org/) installed, then:

```bash
# Clone the repo
git clone https://github.com/6rianDigital/OpenLayersGyms.git
cd OpenLayersGyms

# Install dependencies
npm install

# Run the dev server
npm start

📝 License

MIT License. Use, modify, and share freely — attribution appreciated.