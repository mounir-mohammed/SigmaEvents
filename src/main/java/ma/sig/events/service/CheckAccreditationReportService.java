package ma.sig.events.service;

import java.util.Optional;
import ma.sig.events.service.dto.CheckAccreditationReportDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link ma.sig.events.domain.CheckAccreditationReport}.
 */
public interface CheckAccreditationReportService {
    /**
     * Save a checkAccreditationReport.
     *
     * @param checkAccreditationReportDTO the entity to save.
     * @return the persisted entity.
     */
    CheckAccreditationReportDTO save(CheckAccreditationReportDTO checkAccreditationReportDTO);

    /**
     * Updates a checkAccreditationReport.
     *
     * @param checkAccreditationReportDTO the entity to update.
     * @return the persisted entity.
     */
    CheckAccreditationReportDTO update(CheckAccreditationReportDTO checkAccreditationReportDTO);

    /**
     * Partially updates a checkAccreditationReport.
     *
     * @param checkAccreditationReportDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CheckAccreditationReportDTO> partialUpdate(CheckAccreditationReportDTO checkAccreditationReportDTO);

    /**
     * Get all the checkAccreditationReports.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CheckAccreditationReportDTO> findAll(Pageable pageable);

    /**
     * Get the "id" checkAccreditationReport.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CheckAccreditationReportDTO> findOne(Long id);

    /**
     * Delete the "id" checkAccreditationReport.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
