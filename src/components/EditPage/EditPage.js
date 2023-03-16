import { useState } from 'react';
import styles from './EditPage.module.css';
import EditJobDetails from '../../api/EditJobDetails';
import { ToastContainer, toast } from 'react-toastify';


function EditPage(props) {

    const data = props.editJobData
    const [editInputs, setEditInputs] = useState(data)
    const [skill, setSkill] = useState('')

    function handleEditInputChange(e){
        // setEditInputs({
        //     ...editInputs,
        //     [e.target.name]: e.target.value
        // })
        if(e.target.name === 'requiredSkill'){
            setSkill(e.target.value)
        }else{
            setEditInputs({
            ...editInputs,
            [e.target.name]: e.target.value
            })
        }
    }
  
    function editPage(editedFileds, editedSkills){
        if(!editInputs.companyName){
            toast.error('Please Enter Company Name!')
        }else if(!editInputs.logoUrl){
            toast.error("Please Enter Company Logo Url!")
        }else if(!editInputs.jobPosition){
            toast.error("Please Enter Job Position!")
        }else if(!editInputs.monthlySallery){
            toast.error("Please Enter Monthly Sallery!")
        }else if(!editInputs.jobType){
            toast.error("Please Select Job Type!")
        }else if(!editInputs.workFrom){
            toast.error("Please Select Place!")
        }else if(!editInputs.location){
            toast.error("Please Enter Job Location!")
        }else if(!editInputs.jobDiscription){
            toast.error("Please Enter Job Discription!")
        }else if(!editInputs.aboutCompany){
            toast.error("Please Enter About Company!")
        }else if(!skill){
            toast.error("Please Enter Skills!")
        }
        else{
            EditJobDetails(editedFileds, editedSkills)
            props.pagekey({isEditPage:false})
            toast.success('Added Job Successfuly', {autoClose:1000})
        }
    }

    function closePage(){
        props.pagekey({isEditPage:false})
    }

    useState(()=>{
        const skillArr = props.editJobData.skillRequired
        const skillStr = skillArr.join(',')
        setSkill(skillStr)
    },[])

    return ( 
        <div className={styles.body}>
            <div className={styles.add_page_maincontainer}>
                <div className={styles.add_page_container}>
                    <div className={styles.add_page_heading}>
                        Findmyjobs
                    </div>
                    <div className={styles.add_page_title_container}>
                        <div className={styles.add_page_title}>Add job description</div>
                        <div className={styles.add_page_line_container}>
                            <div className={styles.add_page_line1}></div>
                            <div className={styles.add_page_line2}></div>
                        </div>
                    </div>
                    <div className={styles.add_page_input_container}>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Company Name</div>
                            <div className={styles.field}><input value={editInputs.companyName} name='companyName' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Add Logo Url</div>
                            <div className={styles.field}><input value={editInputs.logoUrl} name='logoUrl' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Job Position</div>
                            <div className={styles.field}><input value={editInputs.jobPosition} name='jobPosition' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Monthly Sallery</div>
                            <div className={styles.field}><input value={editInputs.monthlySallery} name='monthlySallery' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Job Type</div>
                            <div className={styles.field}>
                                <select value={editInputs.jobType} name='jobType' onChange={handleEditInputChange}>
                                    <option>Select</option>
                                    <option>Full Time</option>
                                    <option>Part Time</option>
                                    <option>Semi Full Time</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Remote/Office</div>
                            <div className={styles.field}>
                                <select value={editInputs.workFrom} name='workFrom' onChange={handleEditInputChange}>
                                    <option>Select</option>
                                    <option>Remote</option>
                                    <option>Office</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Location</div>
                            <div className={styles.field}><input value={editInputs.location} name='location' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Job Discription</div>
                            <div className={styles.field}><textarea value={editInputs.jobDiscription} name='jobDiscription' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>About Company</div>
                            <div className={styles.field}><textarea value={editInputs.aboutCompany} name='aboutCompany' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.input_container}>
                            <div className={styles.label}>Skill Required</div>
                            <div className={styles.field}><input value={skill} name='requiredSkill' onChange={handleEditInputChange} type='text' /></div>
                        </div>
                        <div className={styles.button_container}>
                            <div className={styles.cancel_button}><button onClick={closePage}>Cancel</button></div>
                            <div className={styles.add_button}><button onClick={()=>{editPage(editInputs, skill)}}>+ Edit Job</button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}

export default EditPage;