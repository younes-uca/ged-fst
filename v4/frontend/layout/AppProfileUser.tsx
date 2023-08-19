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
import {InputSwitch} from "primereact/inputswitch";


const AppProfileUser = () => {


    const [enabled, setEnabled] = useState(null);
    const [connectedUtilisateur, setConnectedUtilisateur] = useState<UtilisateurDto>(new UtilisateurDto());

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
        const tokenDecoded = authService.decodeJWT();
        console.log(tokenDecoded)
        var type = tokenDecoded.type;
        connectedUtilisateur.username = tokenDecoded.sub;
        connectedUtilisateur.enabled = tokenDecoded.enabled;
        connectedUtilisateur.email = tokenDecoded.email;

        if(type === "utilisateur"){
            connectedUtilisateur.nom = tokenDecoded.nom;
            connectedUtilisateur.prenom = tokenDecoded.prenom;
        }


    }, []);

    // setUpdatedUser(userData);
    const handleUpdateClick = () =>{


        console.log(updatedUser)
        axios.put("http://localhost:8036/api/admin/utilisateur",userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(response.data)
            });
    }



    return (

        <div>
            <Toast ref={showToast} />
            <TabView>
                <TabPanel header="Profile" >
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="username">Username</label>
                                <InputText id="username" value={connectedUtilisateur.username} disabled={!isEditMode} onChange={(event) => connectedUtilisateur.username=(event.target.value)} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="email">Email</label>
                                <InputText id="email" value={connectedUtilisateur.email} disabled={!isEditMode} onChange={(event) => connectedUtilisateur.email=(event.target.value)} />
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="field col-6">
                                <label htmlFor="enabled">Enabled</label>
                                <span className="p-float-label">
                        <InputSwitch  id="enabled" checked={connectedUtilisateur.enabled} disabled={!isEditMode}  onChange={(event) => connectedUtilisateur.enabled=(event.value)}/>
                        </span>                            </div>
                        </div>



                        <div className="field col-4" style={{ marginTop: '6px' }}>
                            <br/>
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
                            <div className="field col-8" style={{ marginTop: '7px' }}  >
                                <br/>

                                <Button label="Change" onClick={handlePwdChange} />
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </div>

    );
};
export default AppProfileUser;