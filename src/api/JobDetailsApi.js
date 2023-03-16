import axios from "axios";

async function JobDetailsApi(id) {
    const url = `https://findmyjobbackend.onrender.com/user/jobdetails/${id}`
    // const url = `http://localhost:5000/user/jobdetails/${id}`
    const getJobDetails = await axios.get(url)
    return getJobDetails
}

export default JobDetailsApi;