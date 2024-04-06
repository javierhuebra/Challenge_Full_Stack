import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../context/propContext";

const NotFoundView = () => {
    const { isLogged } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) navigate("/index");
        else
        navigate("/");
    }, []);
    return (
        <>
            <div className="bg-white w-full h-full  flex justify-center items-center" >

                <p>NOT FOUND</p>


            </div>
        </>
    );
}

export default NotFoundView;