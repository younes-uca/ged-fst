package ma.sir.ged.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.List;

public class FichierDTO {
    @Schema(name = "id", example = "122")
    Long id;
    @Schema(name = "bucket", example = "ged")
    String bucket;
    @Schema(name = "path", example = "/folder/subfolder/")
    String path;
    @Schema(name = "name", example = "fichier.txt")
    String name;
    List<VersionDTO> versions;
    @Schema(name = "actual version")
    VersionDTO actualVersion;

    public FichierDTO() {
    }

    public FichierDTO(Long id, String bucket, String path, String name, List<VersionDTO> versions, VersionDTO actualVersion) {
        this.id = id;
        this.bucket = bucket;
        this.path = path;
        this.name = name;
        this.versions = versions;
        this.actualVersion = actualVersion;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<VersionDTO> getVersions() {
        return versions;
    }

    public void setVersions(List<VersionDTO> versions) {
        this.versions = versions;
    }

    public VersionDTO getActualVersion() {
        return actualVersion;
    }

    public void setActualVersion(VersionDTO actualVersion) {
        this.actualVersion = actualVersion;
    }

    public String getBucket() {
        return bucket;
    }

    public void setBucket(String bucket) {
        this.bucket = bucket;
    }
}
