import axios from "axios";

async function SearchJobsApi(searchField) {

    const url = `https://findmyjobbackend.onrender.com/user/${searchField}`
    // const url = `http://localhost:5000/user/${searchField}`
    const searchJobs = await axios.get(url)
    return searchJobs
}

export default SearchJobsApi;