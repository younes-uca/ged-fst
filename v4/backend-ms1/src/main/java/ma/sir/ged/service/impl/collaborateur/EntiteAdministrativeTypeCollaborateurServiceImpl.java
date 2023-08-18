package ma.sir.ged.service.impl.collaborateur;


import ma.sir.ged.bean.core.EntiteAdministrativeType;
import ma.sir.ged.bean.history.EntiteAdministrativeTypeHistory;
import ma.sir.ged.dao.criteria.core.EntiteAdministrativeTypeCriteria;
import ma.sir.ged.dao.criteria.history.EntiteAdministrativeTypeHistoryCriteria;
import ma.sir.ged.dao.facade.core.EntiteAdministrativeTypeDao;
import ma.sir.ged.dao.facade.history.EntiteAdministrativeTypeHistoryDao;
import ma.sir.ged.dao.specification.core.EntiteAdministrativeTypeSpecification;
import ma.sir.ged.service.facade.collaborateur.EntiteAdministrativeTypeCollaborateurService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;






import java.util.List;
@Service
public class EntiteAdministrativeTypeCollaborateurServiceImpl extends AbstractServiceImpl<EntiteAdministrativeType,EntiteAdministrativeTypeHistory, EntiteAdministrativeTypeCriteria, EntiteAdministrativeTypeHistoryCriteria, EntiteAdministrativeTypeDao,
EntiteAdministrativeTypeHistoryDao> implements EntiteAdministrativeTypeCollaborateurService {



    public EntiteAdministrativeType findByReferenceEntity(EntiteAdministrativeType t){
        return  dao.findByCode(t.getCode());
    }






    public void configure() {
        super.configure(EntiteAdministrativeType.class,EntiteAdministrativeTypeHistory.class, EntiteAdministrativeTypeHistoryCriteria.class, EntiteAdministrativeTypeSpecification.class);
    }



    public EntiteAdministrativeTypeCollaborateurServiceImpl(EntiteAdministrativeTypeDao dao, EntiteAdministrativeTypeHistoryDao historyDao) {
        super(dao, historyDao);
    }

}