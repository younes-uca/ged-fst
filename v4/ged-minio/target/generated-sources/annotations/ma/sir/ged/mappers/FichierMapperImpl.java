package ma.sir.ged.mappers;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import ma.sir.ged.dto.FichierDTO;
import ma.sir.ged.dto.VersionDTO;
import ma.sir.ged.model.Fichier;
import ma.sir.ged.model.FichierVersion;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-08-18T00:12:33+0200",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 20.0.2 (Oracle Corporation)"
)
public class FichierMapperImpl implements FichierMapper {

    @Override
    public FichierDTO fichierToFichierDTO(Fichier fichier) {
        if ( fichier == null ) {
            return null;
        }

        FichierDTO fichierDTO = new FichierDTO();

        fichierDTO.setName( fichier.getObjectName() );
        fichierDTO.setVersions( fichierVersionListToVersionDTOList( fichier.getVersions() ) );
        fichierDTO.setBucket( fichier.getBucket() );
        fichierDTO.setId( fichier.getId() );
        fichierDTO.setPath( fichier.getPath() );

        setActualVersion( fichier, fichierDTO );

        return fichierDTO;
    }

    @Override
    public Fichier fichierDTOToFichier(FichierDTO fichierDTO) {
        if ( fichierDTO == null ) {
            return null;
        }

        Fichier fichier = new Fichier();

        fichier.setObjectName( fichierDTO.getName() );
        fichier.setId( fichierDTO.getId() );
        fichier.setPath( fichierDTO.getPath() );
        fichier.setVersions( versionDTOListToFichierVersionList( fichierDTO.getVersions() ) );
        fichier.setBucket( fichierDTO.getBucket() );

        return fichier;
    }

    protected List<VersionDTO> fichierVersionListToVersionDTOList(List<FichierVersion> list) {
        if ( list == null ) {
            return null;
        }

        List<VersionDTO> list1 = new ArrayList<VersionDTO>( list.size() );
        for ( FichierVersion fichierVersion : list ) {
            list1.add( mapFichierVersionToVersionDTO( fichierVersion ) );
        }

        return list1;
    }

    protected List<FichierVersion> versionDTOListToFichierVersionList(List<VersionDTO> list) {
        if ( list == null ) {
            return null;
        }

        List<FichierVersion> list1 = new ArrayList<FichierVersion>( list.size() );
        for ( VersionDTO versionDTO : list ) {
            list1.add( mapVersionDTOToFichierVersion( versionDTO ) );
        }

        return list1;
    }
}
