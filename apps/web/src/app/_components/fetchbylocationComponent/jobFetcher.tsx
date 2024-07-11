import axios from 'axios';

const fetchJobsByLocation = async (locationInput: string) => {
  try {
    // Gunakan API OpenCage untuk mendapatkan data geolocation berdasarkan input lokasi
    const openCageApiKey = 'YOUR_OPENCAGE_API_KEY';
    const openCageUrl = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationInput)}&key=${openCageApiKey}&pretty=1`;

    const response = await axios.get(openCageUrl);
    const { results } = response.data;

    if (results.length > 0) {
      const { components } = results[0];

      // Ambil provinsi dan kota dari respons OpenCage
      const province = components.state;
      const city = components.city;

      // Gunakan API RajaOngkir untuk mendapatkan pekerjaan berdasarkan provinsi dan kota
      const rajaOngkirApiKey = 'YOUR_RAJAONGKIR_API_KEY';
      const rajaOngkirUrl = `https://api.rajaongkir.com/starter/city?key=${rajaOngkirApiKey}&province=${encodeURIComponent(province)}&city=${encodeURIComponent(city)}`;

      const rajaOngkirResponse = await axios.get(rajaOngkirUrl);
      const { results: jobs } = rajaOngkirResponse.data;

      return jobs;
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};

export default fetchJobsByLocation;
