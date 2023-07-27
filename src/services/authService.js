const logout = () => {
    localStorage.removeItem("user");
};

const exportedObject = {
    logout,
};

export default exportedObject;