"use client";

import { useEffect, useState } from 'react';

type Province = {
  province_id: string;
  province: string;
};

type City = {
  city_id: string;
  province_id: string;
  province: string;
  type: string;
  city_name: string;
  postal_code: string;
};

const HomePage = () => {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [cityId, setCityId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProvinces = async () => {
      const apiKey = process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY!;
      const url = 'https://api.rajaongkir.com/starter/province';

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'key': apiKey },
        });

        if (!response.ok) throw new Error('Failed to fetch provinces');

        const data = await response.json();
        setProvinces(data.rajaongkir.results);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const fetchCityName = async (latitude: number, longitude: number): Promise<string | null> => {
      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch city name');

        const data = await response.json();
        return data.address.city;
      } catch (error) {
        console.error('Error fetching city name:', error);
        return null;
      }
    };

    const fetchCityId = async (cityName: string): Promise<string | null> => {
      const apiKey = process.env.NEXT_PUBLIC_RAJAONGKIR_API_KEY!;
      const url = `https://api.rajaongkir.com/starter/city`;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'key': apiKey },
        });

        if (!response.ok) throw new Error('Failed to fetch city ID');

        const data = await response.json();
        const city = data.rajaongkir.results.find((city: City) => city.city_name.toLowerCase() === cityName.toLowerCase());
        return city ? city.city_id : null;
      } catch (error) {
        console.error('Error fetching city ID:', error);
        return null;
      }
    };

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLocation(position);
            const cityName = await fetchCityName(position.coords.latitude, position.coords.longitude);
            if (cityName) {
              const cityId = await fetchCityId(cityName);
              setCityId(cityId);
            } else {
              setError('Failed to fetch city name');
              fetchProvinces();
            }
          },
          (error) => {
            setError(error.message);
            fetchProvinces();
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
        fetchProvinces();
      }
    };

    getLocation();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="hero py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Temukan Pekerjaan Impian Anda</h1>
            <p className="text-lg mb-8">Platform terkemuka untuk mencari pekerjaan di berbagai bidang.</p>
            {/* Tampilkan 5 lowongan terbaru */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Placeholder untuk 5 lowongan terbaru */}
              <div className="bg-white shadow-md p-4">
                <h3 className="text-xl font-bold mb-2">Nama Lowongan</h3>
                <p className="text-sm text-gray-600">Deskripsi singkat tentang lowongan.</p>
                <a href="#" className="block text-blue-500 text-sm mt-2">Lihat Detail</a>
              </div>
              {/* Tambahkan 4 lowongan lainnya di sini */}
            </div>
            <a href="/all-jobs" className="inline-block bg-blue-500 text-white px-6 py-3 mt-8 rounded-md hover:bg-blue-600 transition duration-300">Lihat Semua Pekerjaan</a>
          </div>
        </section>

        {/* Filter Section */}
        <section className="filters py-20">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Filter Pencarian</h2>
            {/* Form pencarian */}
            <form className="max-w-lg mx-auto">
              <input type="text" placeholder="Cari berdasarkan judul pekerjaan" className="w-full border-gray-300 border-b-2 mb-4 py-2 px-3 focus:outline-none focus:border-blue-500" />
              <select className="w-full border-gray-300 border-b-2 mb-4 py-2 px-3 focus:outline-none focus:border-blue-500">
                <option value="">Pilih bidang kerja</option>
                <option value="teknologi">Teknologi</option>
                <option value="keuangan">Keuangan</option>
                <option value="pemasaran">Pemasaran</option>
                {/* Tambahkan bidang lainnya */}
              </select>
              <input type="text" placeholder="Cari berdasarkan lokasi" className="w-full border-gray-300 border-b-2 mb-4 py-2 px-3 focus:outline-none focus:border-blue-500" />
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">Cari Pekerjaan</button>
            </form>
          </div>
        </section>

        {/* Discovery Section */}
        <section className="discovery py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Pekerjaan Berdasarkan Lokasi Anda</h2>
            {location ? (
              <p>
                Lokasi Anda: Latitude {location.coords.latitude}, Longitude {location.coords.longitude}
              </p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <p>Menunggu lokasi pengguna...</p>
            )}
            {cityId && (
              <p>
                ID Kota: {cityId}
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Placeholder untuk pekerjaan berdasarkan lokasi */}
              <div className="bg-white shadow-md p-4">
                <h3 className="text-xl font-bold mb-2">Nama Pekerjaan</h3>
                <p className="text-sm text-gray-600">Deskripsi singkat tentang pekerjaan.</p>
                <a href="#" className="block text-blue-500 text-sm mt-2">Lihat Detail</a>
              </div>
              {/* Tambahkan pekerjaan lainnya di sini */}
            </div>
            <h2 className="text-3xl font-bold mt-12 mb-8">Pekerjaan Populer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Placeholder untuk pekerjaan populer */}
              <div className="bg-white shadow-md p-4">
                <h3 className="text-xl font-bold mb-2">Nama Pekerjaan Populer</h3>
                <p className="text-sm text-gray-600">Deskripsi singkat tentang pekerjaan populer.</p>
                <a href="#" className="block text-blue-500 text-sm mt-2">Lihat Detail</a>
              </div>
              {/* Tambahkan pekerjaan populer lainnya di sini */}
            </div>
            {error && <p className="text-red-500">Error: {error}</p>}
            {provinces.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold mt-12 mb-8">Pilih Provinsi:</h2>
                <ul className="list-disc list-inside">
                  {provinces.map((province) => (
                    <li key={province.province_id}>{province.province}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
