package ma.sir.ged.bean.core;

import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = "document")
public class DocumentElastic {
    private String reference
}
