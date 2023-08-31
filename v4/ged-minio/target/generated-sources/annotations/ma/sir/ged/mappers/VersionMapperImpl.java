package ma.sir.ged.mappers;

import javax.annotation.Generated;
import ma.sir.ged.dto.VersionDTO;
import ma.sir.ged.model.FichierVersion;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-18T16:19:18+0100",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.2 (Oracle Corporation)"
)
public class VersionMapperImpl implements VersionMapper {

    @Override
    public VersionDTO fichierVersionToVersionDTO(FichierVersion fichierVersion) {
        if ( fichierVersion == null ) {
            return null;
        }

        String versionId = null;
        Integer versionNumber = null;

        versionId = fichierVersion.getVersionId();
        versionNumber = fichierVersion.getVersionNumber();

        VersionDTO versionDTO = new VersionDTO( versionId, versionNumber );

        return versionDTO;
    }
}
