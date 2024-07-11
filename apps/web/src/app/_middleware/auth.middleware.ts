import { deleteCookie, getCookie } from "cookies-next";
import { Dispatch } from "redux";
import { IAdmin, IUser } from "../_model/user.model";
import { jwtDecode } from "jwt-decode";
import { userDataAction } from "../_lib/redux/slices/userData.slice";

export const keepLogin = (dispatch: Dispatch) => {
  try {
    const token = getCookie("aauth"); // Mengambil token dari cookie "aauth"
    if (!token) throw new Error("token not found"); // Melempar error jika token tidak ditemukan

    const user = jwtDecode(token) as IUser | IAdmin; // Decode token menjadi objek user

    // Memeriksa tipe user berdasarkan properti yang ada
    if ("referalCode" in user) {
      dispatch(userDataAction.loginUser(user as IUser)); // Jika memiliki referalCode, maka login sebagai user
    } else if ("isActive" in user) {
      dispatch(userDataAction.loginAdmin(user as IAdmin)); // Jika memiliki isActive, maka login sebagai admin
    }

    return {
      success: true,
      message: "success",
    };
  } catch (err: any) {
    console.log(err); // Menangkap dan mencetak error
    dispatch(userDataAction.logout({})); // Melakukan logout jika terjadi error
    return err.message; // Mengembalikan pesan error
  }
};
