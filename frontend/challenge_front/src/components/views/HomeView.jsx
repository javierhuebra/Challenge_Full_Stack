import ButtonPrincipal from "../util/ButtonPrincipal";
import { useNavigate } from "react-router-dom";

const HomeView = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className=" w-full h-full  flex justify-center items-center" >
                
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-white">Welcome to Notes App</h1>
                        <p className="text-white text-lg mb-2" onClick={() => console.log("asdas")}>The best place to take notes</p>
                        
                        <div onClick={() => navigate('/register')}>
                            <ButtonPrincipal text="Register" />
                        </div>

                    </div>
                

            </div>
        </>
    );
}

export default HomeView;