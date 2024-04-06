import { saveLocalStorageData } from "./localStorageController";
export const registerUser = async (url, userDTO, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true);
        console.log("Este dto de adentro", userDTO)
        const response = await fetch(`${url}/api/users`, {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        setIsLoadingCallback(false);

        if (response.status === 201) {
            return true;
        } else {
            const data = await response.json();
            alert(data.Error);
            return false;
        }

    }
    catch (error) {

        console.error("Error:", error);
        setIsLoadingCallback(false);
        throw error
    }
}

export const login = async (url, loginDTO, setIsLoadingCallback) => {

    setIsLoadingCallback(true);

    const response = await fetch(`${url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginDTO),
        headers: {
            "Content-Type": "application/json",
        },
    }
    );
    const data = await response.json();

    if (!response.ok) {
        alert(data.Error);
        throw new Error(data.Error);
    } else {
        try {
            saveLocalStorageData(data);
        } catch (e) {
            console.error("Error:", e);
        }
        
        console.log(data)
        return true;
    }
    

};