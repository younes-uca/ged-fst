import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useRef, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

import {MessageService} from 'app/zynerator/service/MessageService';


import {RoleDto} from "app/zynerator/dto/RoleDto.model";
import RoleService from "app/zynerator/service/RoleService";

import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import  {UtilisateurDto}  from 'app/controller/model/Utilisateur.model';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import {EntiteAdministrativeDto} from 'app/controller/model/EntiteAdministrative.model';
import {EntiteAdministrativeAdminService} from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import {GenderDto} from 'app/controller/model/Gender.model';
import {GenderAdminService} from 'app/controller/service/admin/GenderAdminService.service';
import {UtilisateurCriteria} from "app/controller/criteria/UtilisateurCriteria.model";
import useEditHook from "app/component/zyhook/useEdit.hook";
import {Password} from "primereact/password";
import {Message} from "primereact/message";


type UtilisateurEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: UtilisateurDto
    update: (item: UtilisateurDto) => void,
    list: UtilisateurDto[],
    service: UtilisateurAdminService,
    t: TFunction
}

const Edit: React.FC<UtilisateurEditAdminType> = ({visible, onClose, showToast, selectedItem, update, list, service, t}) => {


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if(item.email == '')
            errorMessages.push("email is required")
        if(item.nom == '')
            errorMessages.push("nom is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new UtilisateurDto();


    const {
        item,
        setItem,
        submitted,
        setSubmitted,
        activeIndex,
        setActiveIndex,
        activeTab,
        setActiveTab,
        onInputTextChange,
        onInputDateChange,
        onInputNumerChange,
        onMultiSelectChange,
        onBooleanInputChange,
        onDropdownChange,
        onTabChange,
        hideDialog,
        editItem,
        formateDate,
        parseToIsoFormat,
        adaptDate
    } = useEditHook<UtilisateurDto, UtilisateurCriteria>({list, selectedItem, onClose, update, showToast,service, t, isFormValid})

    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const [genders, setGenders] = useState<GenderDto[]>([]);


    const entiteAdministrativeAdminService = new EntiteAdministrativeAdminService();
    const genderAdminService = new GenderAdminService();
    const roleService = new RoleService();
    useEffect(() => {
        genderAdminService.getList().then(({data}) => setGenders(data)).catch(error => console.log(error));
        entiteAdministrativeAdminService.getList().then(({data}) => setEntiteAdministratives(data)).catch(error => console.log(error));


        roleService.getList().then(({data}) => setRoles(data)).catch(error => console.log(error));
    }, []);


    const [confirmPwd, setConfirmPwd] = useState('');




    const handlePwdChange = () => {
        if(item.password == confirmPwd) {
            service.changePassword(item.username, item.password)

            MessageService.showSuccess(showToast, 'Password Changed ')

        }
        else if(item.password != confirmPwd) {

            MessageService.showError(showToast, 'Incorrect password');
        }

    }

    const itemDialogFooter = ( <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
        <Dialog visible={visible} style={{width: '70vw'}} header={t("utilisateur.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
            <Toast ref={showToast} />
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("utilisateur.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-3">
                            <label htmlFor="email">{t("utilisateur.email")}</label>
                            <InputText id="email" value={item ? item.email : ''} onChange={(e) => onInputTextChange(e, 'email')} required className={classNames({'p-invalid': submitted && !item.email})} />
                            {submitted && !item.email && <small className="p-invalid">Email is required.</small>}
                        </div>
                        <div className="field col-3">
                            <label htmlFor="telephone">{t("utilisateur.telephone")}</label>
                            <InputText id="telephone" value={item ? item.telephone : ''} onChange={(e) => onInputTextChange(e, 'telephone')} required className={classNames({'p-invalid': submitted && !item.telephone})} />
                            {submitted && !item.telephone && <small className="p-invalid">Telephone is required.</small>}
                        </div>
                        <div className="field col-3">
                            <label htmlFor="nom">{t("utilisateur.nom")}</label>
                            <InputText id="nom" value={item ? item.nom : ''} onChange={(e) => onInputTextChange(e, 'nom')} required className={classNames({'p-invalid': submitted && !item.nom})} />
                            {submitted && !item.nom && <small className="p-invalid">Nom is required.</small>}
                        </div>
                        <div className="field col-3">
                            <label htmlFor="prenom">{t("utilisateur.prenom")}</label>
                            <InputText id="prenom" value={item ? item.prenom : ''} onChange={(e) => onInputTextChange(e, 'prenom')} required className={classNames({'p-invalid': submitted && !item.prenom})} />
                            {submitted && !item.prenom && <small className="p-invalid">Prenom is required.</small>}
                        </div>
                        <div className="field col-3">
                            <label htmlFor="dateNaissance">{t("utilisateur.dateNaissance")}</label>
                            <Calendar id="dateNaissance" value={adaptDate(item?.dateNaissance)} onChange={(e) => onInputDateChange(e, 'dateNaissance')} dateFormat="dd/mm/yy" showIcon={true} />
                        </div>
                        <div className="field col-3">
                            <label htmlFor="gender">{t("utilisateur.gender")}</label>
                            <Dropdown  id="genderDropdown"  value={item ? item.gender : ''} options={genders} onChange={(e) => onDropdownChange(e, 'gender')}   placeholder="Sélectionnez un gender" filter filterPlaceholder="Rechercher un gender" optionLabel="libelle" showClear />
                        </div>
                        <div className="field col-3">
                            <label htmlFor="entiteAdministrative">{t("utilisateur.entiteAdministrative")}</label>
                            <Dropdown  id="entiteAdministrativeDropdown"  value={item ? item.entiteAdministrative : ''} options={entiteAdministratives} onChange={(e) => onDropdownChange(e, 'entiteAdministrative')}   placeholder="Sélectionnez un entiteAdministrative" filter filterPlaceholder="Rechercher un entiteAdministrative" optionLabel="libelle" showClear />
                        </div>
                        <div className="field col-3">
                            <div  className="label-inputswitch">
                                <label htmlFor="credentialsNonExpired">{t("utilisateur.credentialsNonExpired")}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="credentialsNonExpired" checked={item.credentialsNonExpired} onChange={(e) => onBooleanInputChange(e, 'credentialsNonExpired')} />
                            </span>
                            </div>
                        </div>
                        <div className="field col-3">
                            <div  className="label-inputswitch">
                                <label htmlFor="enabled">{t("utilisateur.enabled")}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="enabled" checked={item.enabled} onChange={(e) => onBooleanInputChange(e, 'enabled')} />
                            </span>
                            </div>
                        </div>
                        <div className="field col-3">
                            <div  className="label-inputswitch">
                                <label htmlFor="accountNonExpired">{t("utilisateur.accountNonExpired")}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="accountNonExpired" checked={item.accountNonExpired} onChange={(e) => onBooleanInputChange(e, 'accountNonExpired')} />
                            </span>
                            </div>
                        </div>
                        <div className="field col-3">
                            <div  className="label-inputswitch">
                                <label htmlFor="accountNonLocked">{t("utilisateur.accountNonLocked")}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="accountNonLocked" checked={item.accountNonLocked} onChange={(e) => onBooleanInputChange(e, 'accountNonLocked')} />
                            </span>
                            </div>
                        </div>
                        <div className="field col-3">
                            <div  className="label-inputswitch">
                                <label htmlFor="passwordChanged">{t("utilisateur.passwordChanged")}</label>
                                <span className="p-float-label">
                                <InputSwitch  id="passwordChanged" checked={item.passwordChanged} onChange={(e) => onBooleanInputChange(e, 'passwordChanged')} />
                            </span>
                            </div>
                        </div>
                        <div className="field col-3">
                            <label htmlFor="username">{t("utilisateur.username")}</label>
                            <InputText id="username" value={item ? item.username : ''} onChange={(e) => onInputTextChange(e, 'username')} required className={classNames({'p-invalid': submitted && !item.username})} />
                            {submitted && !item.username && <small className="p-invalid">Username is required.</small>}
                        </div>

                    </div>
                </TabPanel>

                <TabPanel header="Change Password">
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="new_password">New Password</label>
                            <Password value={item.password} onChange={(e) => onInputTextChange(e,"password")} toggleMask />

                        </div>
                        <div className="field col-6">
                            <label htmlFor="new_password">Confirm Password</label>
                            <Password value={confirmPwd} onChange={(event) => setConfirmPwd(event.target.value)}  toggleMask />
                        </div>
                        <div className="field col-2">
                            <Button label="Submit" onClick={handlePwdChange} />
                        </div>
                    </div>
                </TabPanel>

            </TabView>
        </Dialog>
    );
};
export default Edit;
