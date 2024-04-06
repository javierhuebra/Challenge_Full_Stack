export const createNote = async (url, noteDTO, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/notes`, {
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

export const getAllNotes = async (url,userId, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/notes/all/${userId}`, {
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

export const deleteNote = async (url, noteId, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/notes/${noteId}`, {
            method: 'DELETE',
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

export const getNote = async (url,noteId, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/notes/${noteId}`, {
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

export const updateNote = async (url,noteId,noteDTO, token, setIsLoadingCallback) => {
    try {
        setIsLoadingCallback(true)
        const response = await fetch(`${url}/api/notes/${noteId}`, {
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