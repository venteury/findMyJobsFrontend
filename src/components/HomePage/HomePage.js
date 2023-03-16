import styles from "./HomePage.module.css";
import mountain from "../../Images/mountain.svg";
import people from "../../Images/people.svg";
import rupee from "../../Images/rupee.svg";
import flag from "../../Images/flag.svg";
import { BiSearch } from "react-icons/bi";
import close from "../../Images/close.svg";
import { useEffect, useState } from "react";
import AddPage from "../AddPage/AddPage";
import { useNavigate } from "react-router-dom";
import EditPage from "../EditPage/EditPage";
import GetSKillsAPi from "../../api/GetSkillsApi";
import FindJobsApi from "../../api/FindJobsApi";
import useClipboard from "react-hook-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDebounce } from "use-lodash-debounce";
import SearchJobsApi from "../../api/SearchJobsApi";
import TimeAgo from "react-timeago";

const d = "Tue Mar 14 2023 23:13:00 GMT+0530 (India Standard Time)";
const year2002 = new Date(2002, 22, 2);

function HomePage() {
  const navigate = useNavigate();

  const [skills, setSkills] = useState([]);
  const [pageKeys, setPageKeys] = useState({
    isAddPage: false,
    isEditPage: false,
  });
  const [skillData, setSkillData] = useState([{}]);
  const [jobData, setJobData] = useState([{}]);
  const [clipboard, copyToClipboard] = useClipboard();
  const [editJobData, setEditJobData] = useState([{}]);
  const [searchText, setSearchText] = useState("");
  const debouncedValue = useDebounce(searchText, 1000);

  function selectSkills(skill) {
    if (!(skill == "SELECT")) {
      if (!skills.includes(skill)) {
        setSkills([...skills, skill]);
      } else {
        alert("field already exist");
      }
    }
  }
  function removeSkill(indexRemove) {
    setSkills(skills.filter((_, index) => index !== indexRemove));
  }

  function addJob() {
    setPageKeys({ ...pageKeys, isAddPage: true });
  }

  function editJob(data) {
    setPageKeys({ ...pageKeys, isEditPage: true });
    setEditJobData(data);
  }

  async function getSkillsApi() {
    const getSkills = await GetSKillsAPi();
    setSkillData(getSkills.data);
  }

  async function getJobsApi() {
    const getJobData = await FindJobsApi(skills);
    setJobData(getJobData.data);
  }

  function jobDetails(job_id) {
    navigate(`/${job_id}`);
  }

  function copyLink(id) {
    copyToClipboard(`${window.location.href}${id}`);
    toast.success("Link Copied!");
  }

  async function searchField() {
    if (debouncedValue) {
      const searchJob = await SearchJobsApi(debouncedValue);
      setJobData(searchJob.data);
    } else {
      getJobsApi();
    }
  }

  useEffect(() => {
    getSkillsApi();
    getJobsApi();
  }, [skills, pageKeys]);

  useEffect(() => {
    searchField();
  }, [debouncedValue]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.heading_container}>
          {/* <div> */}
          <div className={styles.heading_logo_container}>
            <div className={styles.header_logo}>
              <img src={mountain} />
            </div>
            <div className={styles.header_find_my_job}>Findmyjob</div>
          </div>
          {/* </div> */}
          <div className={styles.heading_photo_container}>
            <div className={styles.header_hello}>Hello! Recruiter</div>
            <img
              className={styles.header_photo}
              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
              alt="Pic"
              style={{ width: "70px", height: "70px" }}
            />
          </div>
        </div>

        <div className={styles.header_tagline}>
          Find your next remote job at companies like <label>swigy</label>,{" "}
          <label>nike</label>, and <label>cuvette</label>.
        </div>

        <div className={styles.job_container}>
          <div className={styles.job_search_container}>
            <div className={styles.job_search_top}>
              <div className={styles.job_search_icon}>
                <BiSearch />
              </div>
              <div className={styles.job_search}>
                <input
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  value={searchText}
                  type="search"
                  placeholder="Job title"
                />
              </div>
              <div className={styles.job_addjob}>
                <button onClick={addJob}>+ Add Job</button>
              </div>
            </div>
            <div className={styles.job_tagline}>
              Jobs you have posted as a recruiter are listed below
            </div>
            <div className={styles.job_skils_container}>
              <div className={styles.job_skills_wrapper}>
                <div className={styles.job_skill_selectmenu}>
                  <select
                    onChange={(event) => {
                      selectSkills(event.target.value);
                    }}
                  >
                    <option>SELECT</option>
                    {skillData.length > 1 &&
                      skillData.map((values, index) => {
                        return (
                          <option key={index}>
                            {values.skill.toUpperCase()}
                          </option>
                        );
                      })}
                    {/* <option>HTML</option>
                    <option>CSS</option>
                    <option>JAVASCRIPT</option>
                    <option>REACT</option>
                    <option>NODE</option> */}
                  </select>
                </div>
                <div className={styles.skill_list_container}>
                  {skills.map((skill, index) => {
                    return (
                      <div key={index} className={styles.skill_list}>
                        {skill}
                        <img
                          onClick={() => {
                            removeSkill(index);
                          }}
                          src={close}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.job_count_container}>
            {jobData.length} + Jobs
          </div>

          <div className={styles.job_list_containers}>
            {/* <div className={styles.job_list_container}>
                            <div className={styles.job_list_image}><img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Avatar" style={{width:'52px', height:'52px'}}/></div>
                            <div className={styles.job_list_info}>
                                <div className={styles.list_info_1}>
                                    <div className={styles.job_position}>
                                        Frontend Developer
                                    </div>
                                    <div className={styles.job_info}>
                                        <div className={styles.job_people}>
                                            <div><img src={people}/></div>
                                            <div className={styles.job_people_count}>11-50</div>
                                        </div>
                                        <div className={styles.job_sallery}>
                                            <div><img src={rupee}/></div>
                                            <div className={styles.job_people_sallery}>50000</div>
                                        </div>
                                        <div className={styles.job_location}>
                                            <div><img src={flag}/></div>
                                            <div className={styles.job_people_location}>Delhi</div>
                                        </div>
                                    </div>
                                    <div className={styles.job_type_container}>
                                        <div className={styles.job_located}>Office</div>
                                        <div className={styles.job_type}>Full time</div>
                                    </div>
                                </div>
                                <div className={styles.job_edit_add_container}>
                                    <div className={styles.job_post_time}>2 hours ago</div>
                                    <div className={styles.job_buttons_container}>
                                        <div className={styles.edit_button}><button onClick={editJob}>Edit job</button></div>
                                        <div className={styles.copy_link_button}><button>Copy Link</button></div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

            {jobData.map((values, index) => {
              return (
                <div key={index} className={styles.job_list_container}>
                  <div className={styles.job_list_image}>
                    <img
                      src={values.logoUrl}
                      alt="Pic"
                      style={{ width: "52px", height: "52px" }}
                    />
                  </div>
                  <div className={styles.job_list_info}>
                    <div
                      onClick={() => {
                        jobDetails(values._id);
                      }}
                      className={styles.list_info_1}
                    >
                      <div className={styles.job_position}>
                        {values.jobPosition}
                      </div>
                      <div className={styles.job_info}>
                        <div className={styles.job_people}>
                          <div>
                            <img src={people} />
                          </div>
                          <div className={styles.job_people_count}>11-50</div>
                        </div>
                        <div className={styles.job_sallery}>
                          <div>
                            <img src={rupee} />
                          </div>
                          <div className={styles.job_people_sallery}>
                            {values.monthlySallery}
                          </div>
                        </div>
                        <div className={styles.job_location}>
                          <div>
                            <img src={flag} />
                          </div>
                          <div className={styles.job_people_location}>
                            {values.location}
                          </div>
                        </div>
                      </div>
                      <div className={styles.job_type_container}>
                        <div className={styles.job_located}>
                          {values.workFrom}
                        </div>
                        <div className={styles.job_type}>{values.jobType}</div>
                      </div>
                    </div>
                    <div className={styles.job_edit_add_container}>
                      <div className={styles.job_post_time}>
                        <TimeAgo date={values.time} />
                      </div>
                      <div className={styles.job_buttons_container}>
                        <div className={styles.edit_button}>
                          <button
                            onClick={() => {
                              editJob(values);
                            }}
                          >
                            Edit job
                          </button>
                        </div>
                        <div className={styles.copy_link_button}>
                          <button
                            onClick={() => {
                              copyLink(values._id);
                            }}
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {pageKeys.isAddPage ? (
        <AddPage pagekey={setPageKeys} />
      ) : pageKeys.isEditPage ? (
        <EditPage editJobData={editJobData} pagekey={setPageKeys} />
      ) : (
        ""
      )}
      <ToastContainer position="top-center" autoClose={false} closeOnClick />
    </div>
  );
}

export default HomePage;
