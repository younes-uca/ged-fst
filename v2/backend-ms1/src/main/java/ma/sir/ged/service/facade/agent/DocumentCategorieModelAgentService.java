package ma.sir.ged.service.facade.agent;

import java.util.List;
import ma.sir.ged.bean.core.DocumentCategorieModel;
import ma.sir.ged.dao.criteria.core.DocumentCategorieModelCriteria;
import ma.sir.ged.dao.criteria.history.DocumentCategorieModelHistoryCriteria;
import ma.sir.ged.zynerator.service.IService;


public interface DocumentCategorieModelAgentService extends  IService<DocumentCategorieModel,DocumentCategorieModelCriteria, DocumentCategorieModelHistoryCriteria>  {

    List<DocumentCategorieModel> findByDocumentCategorieId(Long id);
    int deleteByDocumentCategorieId(Long id);



}
