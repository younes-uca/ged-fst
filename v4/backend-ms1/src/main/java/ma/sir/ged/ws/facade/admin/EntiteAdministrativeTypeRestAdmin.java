package  ma.sir.ged.ws.facade.admin;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import ma.sir.ged.bean.core.EntiteAdministrativeType;
import ma.sir.ged.bean.history.EntiteAdministrativeTypeHistory;
import ma.sir.ged.dao.criteria.core.EntiteAdministrativeTypeCriteria;
import ma.sir.ged.dao.criteria.history.EntiteAdministrativeTypeHistoryCriteria;
import ma.sir.ged.service.facade.admin.EntiteAdministrativeTypeAdminService;
import ma.sir.ged.ws.converter.EntiteAdministrativeTypeConverter;
import ma.sir.ged.ws.dto.EntiteAdministrativeTypeDto;
import ma.sir.ged.zynerator.controller.AbstractController;
import ma.sir.ged.zynerator.dto.AuditEntityDto;
import ma.sir.ged.zynerator.util.PaginatedList;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import ma.sir.ged.zynerator.process.Result;


import org.springframework.web.multipart.MultipartFile;
import ma.sir.ged.zynerator.dto.FileTempDto;

@RestController
@RequestMapping("/api/admin/entiteAdministrativeType/")
public class EntiteAdministrativeTypeRestAdmin  extends AbstractController<EntiteAdministrativeType, EntiteAdministrativeTypeDto, EntiteAdministrativeTypeHistory, EntiteAdministrativeTypeCriteria, EntiteAdministrativeTypeHistoryCriteria, EntiteAdministrativeTypeAdminService, EntiteAdministrativeTypeConverter> {



    @Operation(summary = "upload one entiteAdministrativeType")
    @RequestMapping(value = "upload", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<FileTempDto> uploadFileAndGetChecksum(@RequestBody MultipartFile file) throws Exception {
        return super.uploadFileAndGetChecksum(file);
    }
    @Operation(summary = "upload multiple entiteAdministrativeTypes")
    @RequestMapping(value = "upload-multiple", method = RequestMethod.POST, consumes = "multipart/form-data")
    public ResponseEntity<List<FileTempDto>> uploadMultipleFileAndGetChecksum(@RequestBody MultipartFile[] files) throws Exception {
        return super.uploadMultipleFileAndGetChecksum(files);
    }

    @Operation(summary = "Finds a list of all entiteAdministrativeTypes")
    @GetMapping("")
    public ResponseEntity<List<EntiteAdministrativeTypeDto>> findAll() throws Exception {
        return super.findAll();
    }

    @Operation(summary = "Finds an optimized list of all entiteAdministrativeTypes")
    @GetMapping("optimized")
    public ResponseEntity<List<EntiteAdministrativeTypeDto>> findAllOptimized() throws Exception {
        return super.findAllOptimized();
    }

    @Operation(summary = "Finds a entiteAdministrativeType by id")
    @GetMapping("id/{id}")
    public ResponseEntity<EntiteAdministrativeTypeDto> findById(@PathVariable Long id, String[] includes, String[] excludes) throws Exception {
        return super.findById(id, includes, excludes);
    }
    @Operation(summary = "Saves the specified  entiteAdministrativeType")
    @PostMapping("")
    public ResponseEntity<EntiteAdministrativeTypeDto> save(@RequestBody EntiteAdministrativeTypeDto dto) throws Exception {
        return super.save(dto);
    }

    @Operation(summary = "Updates the specified  entiteAdministrativeType")
    @PutMapping("")
    public ResponseEntity<EntiteAdministrativeTypeDto> update(@RequestBody EntiteAdministrativeTypeDto dto) throws Exception {
        return super.update(dto);
    }

    @Operation(summary = "Delete list of entiteAdministrativeType")
    @PostMapping("multiple")
    public ResponseEntity<List<EntiteAdministrativeTypeDto>> delete(@RequestBody List<EntiteAdministrativeTypeDto> listToDelete) throws Exception {
        return super.delete(listToDelete);
    }
    @Operation(summary = "Delete the specified entiteAdministrativeType")
    @DeleteMapping("")
    public ResponseEntity<EntiteAdministrativeTypeDto> delete(@RequestBody EntiteAdministrativeTypeDto dto) throws Exception {
            return super.delete(dto);
    }

    @Operation(summary = "Delete the specified entiteAdministrativeType")
    @DeleteMapping("id/{id}")
    public ResponseEntity<Long> deleteById(@PathVariable Long id) throws Exception {
        return super.deleteById(id);
    }
    @Operation(summary = "Delete multiple entiteAdministrativeTypes by ids")
    @DeleteMapping("multiple/id")
    public ResponseEntity<List<Long>> deleteByIdIn(@RequestBody List<Long> ids) throws Exception {
            return super.deleteByIdIn(ids);
     }


    @Operation(summary = "Finds entiteAdministrativeTypes by criteria")
    @PostMapping("find-by-criteria")
    public ResponseEntity<List<EntiteAdministrativeTypeDto>> findByCriteria(@RequestBody EntiteAdministrativeTypeCriteria criteria) throws Exception {
        return super.findByCriteria(criteria);
    }

    @Operation(summary = "Finds paginated entiteAdministrativeTypes by criteria")
    @PostMapping("find-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findPaginatedByCriteria(@RequestBody EntiteAdministrativeTypeCriteria criteria) throws Exception {
        return super.findPaginatedByCriteria(criteria);
    }

    @Operation(summary = "Exports entiteAdministrativeTypes by criteria")
    @PostMapping("export")
    public ResponseEntity<InputStreamResource> export(@RequestBody EntiteAdministrativeTypeCriteria criteria) throws Exception {
        return super.export(criteria);
    }

    @Operation(summary = "Gets entiteAdministrativeType data size by criteria")
    @PostMapping("data-size-by-criteria")
    public ResponseEntity<Integer> getDataSize(@RequestBody EntiteAdministrativeTypeCriteria criteria) throws Exception {
        return super.getDataSize(criteria);
    }

    @Operation(summary = "Gets entiteAdministrativeType history by id")
    @GetMapping("history/id/{id}")
    public ResponseEntity<AuditEntityDto> findHistoryById(@PathVariable("id") Long id) throws Exception {
        return super.findHistoryById(id);
    }

    @Operation(summary = "Gets entiteAdministrativeType paginated history by criteria")
    @PostMapping("history-paginated-by-criteria")
    public ResponseEntity<PaginatedList> findHistoryPaginatedByCriteria(@RequestBody EntiteAdministrativeTypeHistoryCriteria criteria) throws Exception {
        return super.findHistoryPaginatedByCriteria(criteria);
    }

    @Operation(summary = "Exports entiteAdministrativeType history by criteria")
    @PostMapping("export-history")
    public ResponseEntity<InputStreamResource> exportHistory(@RequestBody EntiteAdministrativeTypeHistoryCriteria criteria) throws Exception {
        return super.exportHistory(criteria);
    }

    @Operation(summary = "Gets entiteAdministrativeType history data size by criteria")
    @PostMapping("history-data-size")
    public ResponseEntity<Integer> getHistoryDataSize(@RequestBody EntiteAdministrativeTypeHistoryCriteria criteria) throws Exception {
        return super.getHistoryDataSize(criteria);
    }

    public EntiteAdministrativeTypeRestAdmin (EntiteAdministrativeTypeAdminService service, EntiteAdministrativeTypeConverter converter) {
        super(service, converter);
    }


}