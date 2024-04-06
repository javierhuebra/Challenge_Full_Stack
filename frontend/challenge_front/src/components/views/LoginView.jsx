import { useState, useContext } from "react";
import { login } from "../../controllers/userController";
import { urlBack } from "../../config/const";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/propContext";
import { getStorageData } from "../../controllers/localStorageController";
import Swal from "sweetalert2";

const LoginView = () => {
    const { setUserData, setIsLogged } = useContext(userContext);
    const [isLoading, setIsLoading] = useState(false);
    const [loginDTO, setLoginDTO] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        setLoginDTO({
            ...loginDTO,
            [e.target.id]: e.target.value
        });
        console.log(loginDTO);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        
        login(urlBack, loginDTO, setIsLoading)
        .then((res) => {
           
            setIsLogged(true);
            setUserData(JSON.parse(getStorageData()));
            if(res) navigate("/index"); 
        })
        
    }
    return (
        <>
            <div className="w-full h-full flex justify-center items-center">

                <form className="w-80 mx-auto bg-white p-5" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input onChange={handleChange} type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="johndoe" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input onChange={handleChange} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="******" required />
                    </div>
                    <div className="flex items-start mb-5">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
                        </div>
                        <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>


            </div>
        </>

    );
}

export default LoginView;

