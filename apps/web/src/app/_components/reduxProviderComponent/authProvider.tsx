import { useAppDispatch } from "@/app/_lib/redux/hooks";
import { keepLogin } from "@/app/_middleware/auth.middleware";
import { ReactNode, useEffect } from "react";
import { useAppSelector } from "@/app/_lib/redux/hooks";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  // Fungsi untuk memanggil keepLogin dengan dispatch dari Redux
  const verify = () => keepLogin(dispatch);

  // Mengambil data userData dari Redux state
  const userData = useAppSelector((state) => state.userData);

  // useEffect untuk memanggil verify saat komponen dipasang pertama kali
  useEffect(() => {
    verify();
  }, []); // array dependencies kosong artinya hanya dijalankan sekali saat komponen pertama kali dipasang

  // useEffect untuk mencatat perubahan pada userData
  useEffect(() => {
    console.log(userData); // Mencetak userData ke konsol setiap kali berubah
  }, [userData]); // userData adalah dependency di sini, useEffect ini akan dijalankan setiap kali userData berubah

  return <>{children}</>; // Mengembalikan children (komponen di dalamnya)
}
