// Fungsi untuk mendapatkan daftar provinsi dari API RajaOngkir
async function getProvinces() {
    const apiKey = '6b7e044f6d7c1eaa82d2070c59d9f305'; // Ganti dengan API Key Anda
    const url = 'https://api.rajaongkir.com/starter/province';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'key': apiKey
        }
    });

    if (response.ok) {
        const data = await response.json();
        return data.rajaongkir.results;
    } else {
        throw new Error('Gagal mengambil data provinsi');
    }
}

// Fungsi untuk mendapatkan lokasi pengguna
function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                error => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation tidak didukung oleh browser ini.'));
        }
    });
}

// Menggunakan lokasi pengguna atau meminta pengguna memilih lokasi secara manual
async function init() {
    try {
        const location = await getLocation();
        console.log('Lokasi pengguna:', location);
        // Gunakan koordinat lokasi untuk mendapatkan data pekerjaan
    } catch (error) {
        console.log('Gagal mendapatkan lokasi pengguna:', error);
        // Tampilkan daftar provinsi untuk dipilih secara manual
        const provinces = await getProvinces();
        console.log('Daftar provinsi:', provinces);
        // Tampilkan provinsi ke pengguna untuk dipilih
    }
}

// Memulai proses
init();
