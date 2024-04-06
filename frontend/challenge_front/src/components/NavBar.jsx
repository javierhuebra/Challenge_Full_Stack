import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ButtonPrincipal from "./util/ButtonPrincipal";
import { useNavigate } from "react-router-dom";

import { userContext } from "../context/propContext";
import { deleteStorageData } from "../controllers/localStorageController";


const NavBar = () => {
    const { userData, isLogged, setUserData, setIsLogged } = useContext(userContext);
    const navigate = useNavigate();

    const closeSession = () => { 
        deleteStorageData();
        setIsLogged(false);
        setUserData({});
        navigate('/login');
    }
    return (
        <>
            <nav className="bg-white dark:bg-gray-900  w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div onClick={(() => navigate('/'))} className="flex cursor-pointer items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Notes App" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Notes App</span>
                    </div>
                    {
                        isLogged ?
                            <div onClick={(() => closeSession())} className="flex justify-center items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <p className="font-bold mr-2">{userData.name}</p>
                                <ButtonPrincipal text="Log out" />
                            </div>
                            :
                            <div onClick={(() => navigate('/login'))} className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <ButtonPrincipal text="Login" />
                            </div>
                    }


                </div>
            </nav>
        </>
    );
}

export default NavBar;