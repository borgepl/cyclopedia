import axios from "axios";

const getRandomUser =  async () => {

    const response = await axios.get('https://randomuser.me/api/', {
        headers: {},
        params: {
            dataType: 'json'
        },
    });
    return response;
}

export {getRandomUser};