import axios from "../apis/axios";
import useAuth from "./useAuth";

const useLogout = () => {
    const { auth,setAuth } = useAuth();
    const logout = async () => {
        setAuth({});
        try {
            const response = await axios(
                '/logout', 
                {
                    withCredentials: true
                }
            )
        }
        catch (err) {
            console.log(err);
        }
    }

    return logout;
}

export default useLogout;