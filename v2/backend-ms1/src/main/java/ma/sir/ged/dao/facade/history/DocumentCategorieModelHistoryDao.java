package ma.sir.ged.dao.facade.history;

import ma.sir.ged.zynerator.repository.AbstractHistoryRepository;
import ma.sir.ged.bean.history.DocumentCategorieModelHistory;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentCategorieModelHistoryDao extends AbstractHistoryRepository<DocumentCategorieModelHistory,Long> {

}
