import axios from 'axios';

async function GetSKillsAPi() {
    const url = 'https://findmyjobbackend.onrender.com/user/skills'
    // const url = 'http://localhost:5000/user/skills'
    const skill = await axios.get(url)
    return skill
}


export default GetSKillsAPi;