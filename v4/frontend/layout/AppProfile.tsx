import {TabPanel, TabView} from "primereact/tabview";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import React, {useEffect, useRef, useState} from "react";
import {AuthService} from "../app/zynerator/security/Auth.service";
import axios from "axios";
import {UtilisateurDto} from "../app/controller/model/Utilisateur.model";
import {Calendar} from "primereact/calendar";
import {MessageService} from "../app/zynerator/service/MessageService";
import {UtilisateurAdminService} from "../app/controller/service/admin/UtilisateurAdminService.service";
import {Password} from "primereact/password";
import {Toast} from "primereact/toast";


const AppProfile = () => {


    const [userName, setUserName] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState<UtilisateurDto>([]);
    const [updatedUser, setUpdatedUser] = useState<UtilisateurDto>([]);

    const authService = new AuthService();
    const utilisateurAdminService= new UtilisateurAdminService();
    const [isEditMode, setIsEditMode] = useState(false);
    const [confirmPwd, setConfirmPwd] = useState('');
    //  const showToast = useRef<Toast>();
    const showToast = useRef(null); // Initialize the ref

    const handleModifyClick = () => {
        setIsEditMode(true);
    };
    const handlePwdChange = () => {
        if(password == confirmPwd) {

            utilisateurAdminService.changePassword(username,password)
            MessageService.showSuccess(showToast, 'Password Changed ')
        }
        else if(password != confirmPwd) {
            MessageService.showError(showToast, 'Error password');
        }

    }



    const username = authService.getUsername();
    useEffect(() => {
        axios.get(`http://localhost:8036/api/users/findByUsername/${username}`)
            .then((response) => {
                setUserData(response.data);
                setNom(response.data.nom);
                setPrenom(response.data.prenom);
                setEnabled(response.data.enabled);
                setEmail(response.data.email);
                setUserName(response.data.username)
                console.log(response.data)
            });
    }, []);

    // setUpdatedUser(userData);
    const handleUpdateClick = () =>{


        console.log(updatedUser)
        axios.put("http://localhost:8036/api/users/updateProfile",userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data)
            });
    }



    return (

        <div  >
            <Toast ref={showToast} />
            <TabView>
                <TabPanel header="Profile" >
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" value={username} disabled={!isEditMode} onChange={(event) => setUserName(event.target.value)} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={email} disabled={!isEditMode} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="enabled">Enabled</label>
                                <InputText id="enabled" value={enabled} disabled={!isEditMode} onChange={(event) => setEnabled(event.target.value)} />
                            </div>
                        </div>


                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="nom">Nom</label>
                                <InputText id="nom" value={nom} disabled={!isEditMode} onChange={(event) => setNom(event.target.value)} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="prenom">Prenom</label>
                                <InputText id="prenom" value={prenom} disabled={!isEditMode} onChange={(event) => setPrenom(event.target.value)}/>
                            </div>
                        </div>
                       
                    </div>
                </TabPanel>

                <TabPanel header="Change Password">
                    <div className="formgrid grid">

                        <div className="field col-4">
                            <div className="field col-8">
                                <label htmlFor="new_password">New Password</label>

                                <Password value={password} onChange={(event) => setPassword(event.target.value)} toggleMask />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-8">
                                <label htmlFor="new_password">Confirm Password</label>

                                <Password value={confirmPwd} onChange={(event) => setConfirmPwd(event.target.value)}  toggleMask />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-8" style={{ marginTop: '7px' }}>
                                <br/>

                                <Button label="Submit" onClick={handlePwdChange}  />
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>

    );
};
export default AppProfile;