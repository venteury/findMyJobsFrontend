import axios from "axios";

async function AddJobApi(allInputs) {
    const payload = {
        companyName:        allInputs.companyName,
        logoUrl:            allInputs.logoUrl,
        jobPosition:        allInputs.jobPosition,
        monthlySallery:     allInputs.monthlySallery,
        jobType:            allInputs.jobType,
        workFrom:           allInputs.workFrom,
        location:           allInputs.location,
        jobDiscription:     allInputs.jobDiscription,
        aboutCompany:       allInputs.aboutCompany,
        requiredSkill:      allInputs.requiredSkill
    }
    axios({
        method: 'post',
        url: 'https://findmyjobbackend.onrender.com/user/addjob',
        // url: 'http://localhost:5000/user/addjob',
        data: payload, 

    }).then(function(response) {
        console.log(response);
    }).catch(function (error){
        console.log(error);});
}

export default AddJobApi;