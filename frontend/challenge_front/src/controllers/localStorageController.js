export const saveLocalStorageData = (userData) => {
    localStorage.setItem("session", JSON.stringify(userData));
  };
  
  export const getStorageData = () => {
    const userData = localStorage.getItem("session");
   
    return userData;
  };
  
  export const deleteStorageData = () => {
    localStorage.removeItem("session");
  };