// LocationFetcher.tsx
import React, { useState, useEffect } from 'react';

const LocationFetcher = ({ onLocationChange }: { onLocationChange: (location: string) => void }) => {
  const [location, setLocation] = useState<string>('');

  useEffect(() => {
    // Fungsi untuk mendapatkan lokasi dari pengguna
    const fetchUserLocation = () => {
      // Di sini kamu bisa menambahkan logika untuk meminta izin lokasi dari pengguna
      // atau mengambil secara manual jika tidak tersedia izin.
      // Contoh sederhana:
      const userLocation = 'Jakarta'; // Ganti dengan logika pengambilan lokasi sebenarnya
      
      // Set lokasi yang sudah didapatkan
      setLocation(userLocation);
      // Panggil callback untuk memberitahu HomePage tentang perubahan lokasi
      onLocationChange(userLocation);
    };

    fetchUserLocation();
  }, [onLocationChange]);

  return null; // Komponen ini tidak perlu merender apapun di UI
};

export default LocationFetcher;
