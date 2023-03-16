import TimeAgo from "react-timeago";
import styles from './DetailsPage.module.css'
import mountain from '../../Images/mountain.svg'
import people from '../../Images/people.svg'
import rupee from '../../Images/rupee.svg'
import flag from '../../Images/flag.svg'
import { BiSearch } from 'react-icons/bi';
import close from '../../Images/close.svg';
import { useEffect, useState } from 'react';
import AddPage from '../AddPage/AddPage';
import { useNavigate } from "react-router-dom";
import EditPage from '../EditPage/EditPage';
import JobDetailsApi from '../../api/JobDetailsApi'
import { useParams } from 'react-router-dom';
import useClipboard from 'react-hook-clipboard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FindJobsApi from "../../api/FindJobsApi";


function DetailsPage() {

    const [jobInformation, setJobInformation] = useState({})
    const [clipboard, copyToClipboard] = useClipboard()
    const [skills, setSkills] = useState([]);
    const [jobData, setJobData] = useState([{}]);

    let { id } = useParams();
    async function findDetails(){
        const jobDetails = await JobDetailsApi(id)
        setJobInformation(jobDetails.data[0])
        // console.log(jobDetails)
    }

    async function getJobsApi() {
        const getJobData = await FindJobsApi(skills);
        setJobData(getJobData.data);
      }
    

    function copyLink(){
        copyToClipboard(window.location.href)
        toast.success("Link Copied!")
    }

    useEffect(()=>{
        findDetails()
    },[])

    return ( 
        <div>
            <div className={styles.container}>
                <div className={styles.heading_container}>
                    {/* <div> */}
                        <div className={styles.heading_logo_container}>
                            <div className={styles.header_logo}><img src={mountain}/></div>
                            <div className={styles.header_find_my_job}>Findmyjob</div>
                        </div>
                    {/* </div> */}
                    <div className={styles.heading_photo_container}>
                        <div className={styles.header_hello}>Hello! Recruiter</div>
                        <img className={styles.header_photo} src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Pic" style={{width:'70px', height:'70px'}} />
                    </div>
                </div>

                <div className={styles.header_tagline}>
                    Find your next remote job at companies like <label>swigy</label>, <label>nike</label>, and <label>cuvette</label>.
                </div>

                <div className={styles.info_container}>
                    <div className={styles.profile_info_container}>
                        <div className={styles.image_container}><img src={jobInformation.logoUrl} alt="Avatar" style={{width:'70px', height:'70px'}}/></div>
                        <div className={styles.details_container}>
                            <div className={styles.details}>
                                <div className={styles.post}>{jobInformation.jobPosition}</div>
                                <div className={styles.location}>{jobInformation.companyName} | {jobInformation.location}, india</div>
                                <div className={styles.time}>
                                <TimeAgo date={jobInformation.time} />
                                </div>
                            </div>
                            <div className={styles.copy_button}><button onClick={copyLink}>Copy Link</button></div>
                        </div>
                    </div>

                    <div className={styles.job_info_container}>
                        <div className={styles.offer_container}>
                            <div className={styles.tag}>Job Offer</div>
                            <div className={styles.tag_info}>{jobInformation.monthlySallery} per month</div>
                        </div>
                        <div className={styles.Mode_container}>
                            <div className={styles.tag}>Job Mode</div>
                            <div className={styles.tag_info}>{jobInformation.jobType}</div>
                        </div>
                        <div className={styles.office_container}>
                            <div className={styles.tag}>Office/Remote</div>
                            <div className={styles.tag_info}>{jobInformation.workFrom}</div>
                        </div>
                        <div className={styles.location_container}>
                            <div className={styles.tag}>Location</div>
                            <div className={styles.tag_info}>{jobInformation.location}</div>
                        </div>
                    </div>

                    <div className={styles.about_container}>
                        <div className={styles.about_info}>
                            <div className={styles.job}>
                                <div className={styles.job_heading}>About Job</div>
                                <div className={styles.job_discription}>{jobInformation.jobDiscription}</div>
                            </div>
                            <div className={styles.company}>
                                <div className={styles.company_heading}>About Company</div>
                                <div className={styles.company_discription}>{jobInformation.aboutCompany}</div>
                            </div>
                        </div>
                        <div className={styles.skill_container}>
                            <div className={styles.skills}>
                                <div className={styles.skill_heading}>Skills Mandatory</div>
                                {
                                    jobInformation.skillRequired &&  jobInformation.skillRequired.map((values, index)=>{
                                        return(
                                            <div key={index} className={styles.skill}>{values}</div>
                                        )
                                    })
                                }
                                {/* <div className={styles.skill}>python</div>
                                <div className={styles.skill}>html</div>
                                <div className={styles.skill}>css</div>
                                <div className={styles.skill}>mongodb</div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={false}
                closeOnClick
            />
        </div>
     );
}

export default DetailsPage;