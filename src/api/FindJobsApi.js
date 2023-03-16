import axios from "axios";

async function FindJobsApi(skillsArr) {
    // const info = 'info'
    // axios.get(`http://localhost:3001/user/findjobs/${skillsArr}`)

    const payload = {
        skills:skillsArr
    }
    const findJobs = await axios({
        method: 'post',
        url: 'https://findmyjobbackend.onrender.com/user/findjobs',
        // url: 'http://localhost:5000/user/findjobs',
        data: payload, 

    })
    return findJobs
    // .then(function(response) {
    //     console.log(response.data);
    //     return findJobs
    // }).catch(function (error){
    //     console.log(error);});
}


export default FindJobsApi;