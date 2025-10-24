const { fieldsCanBeUpdated } = require("../utils/constants");

const validateUserData = (data) => {
    if(!data) return false;

    return Object.keys(data).every(key => fieldsCanBeUpdated.includes(key));
    
    // return Object.fromEntries(Object.entries(data).filter(([key]) => fieldsCanBeUpdated.includes(key)));
};

module.exports = {
    validateUserData
};