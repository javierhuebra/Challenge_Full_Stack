export const createCategory = async (url, noteDTO, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify(noteDTO)
        });
        setIsLoadingCallback(false)
        if (!response.ok) {
            throw new Error('Error to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        setIsLoadingCallback(false)
        console.error('Error:', error);
        return null;
    }
}

export const getAllCategories= async (url,userId, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/categories/all/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            }
        });
        setIsLoadingCallback(false)
        if (!response.ok) {
            throw new Error('Error to fetch data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        setIsLoadingCallback(false)
        console.error('Error:', error);
        return null;
    }
}