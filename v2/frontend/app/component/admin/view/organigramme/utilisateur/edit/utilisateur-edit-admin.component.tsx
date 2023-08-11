import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

import {MessageService} from 'app/zynerator/service/MessageService';

import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import  {UtilisateurDto}  from 'app/controller/model/Utilisateur.model';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import {GenderDto} from 'app/controller/model/Gender.model';
import {GenderAdminService} from 'app/controller/service/admin/GenderAdminService.service';
import {UtilisateurCriteria} from "app/controller/criteria/UtilisateurCriteria.model";
import useEditHook from "app/component/zyhook/useEdit.hook";


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


    const [genders, setGenders] = useState<GenderDto[]>([]);


    const genderAdminService = new GenderAdminService();

    useEffect(() => {
    genderAdminService.getList().then(({data}) => setGenders(data)).catch(error => console.log(error));

        }, []);







    const itemDialogFooter = ( <>
        <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
        <Button label="Save" icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={t("utilisateur.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("utilisateur.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="email">{t("utilisateur.email")}</label>
                        <InputText id="email" value={item ? item.email : ''} onChange={(e) => onInputTextChange(e, 'email')} required autoFocus className={classNames({'p-invalid': submitted && !item.email})} />
                        {submitted && !item.email && <small className="p-invalid">Email is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="telephone">{t("utilisateur.telephone")}</label>
                        <InputText id="telephone" value={item ? item.telephone : ''} onChange={(e) => onInputTextChange(e, 'telephone')} required autoFocus className={classNames({'p-invalid': submitted && !item.telephone})} />
                        {submitted && !item.telephone && <small className="p-invalid">Telephone is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="nom">{t("utilisateur.nom")}</label>
                        <InputText id="nom" value={item ? item.nom : ''} onChange={(e) => onInputTextChange(e, 'nom')} required autoFocus className={classNames({'p-invalid': submitted && !item.nom})} />
                        {submitted && !item.nom && <small className="p-invalid">Nom is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="prenom">{t("utilisateur.prenom")}</label>
                        <InputText id="prenom" value={item ? item.prenom : ''} onChange={(e) => onInputTextChange(e, 'prenom')} required autoFocus className={classNames({'p-invalid': submitted && !item.prenom})} />
                        {submitted && !item.prenom && <small className="p-invalid">Prenom is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="dateNaissance">{t("utilisateur.dateNaissance")}</label>
                        <Calendar id="dateNaissance" value={adaptDate(item?.dateNaissance)} onChange={(e) => onInputDateChange(e, 'dateNaissance')} dateFormat="dd/mm/yy" showIcon={true} />
                    </div>
                    <div className="field col-6">
                        <label htmlFor="gender">{t("utilisateur.gender")}</label>
                        <Dropdown  id="genderDropdown"  value={item ? item.gender : ''} options={genders} onChange={(e) => onDropdownChange(e, 'gender')}   placeholder="Sélectionnez un gender" filter filterPlaceholder="Rechercher un gender" optionLabel="libelle" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


