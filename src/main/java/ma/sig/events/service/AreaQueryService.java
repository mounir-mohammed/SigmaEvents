package ma.sig.events.service;

import java.util.List;
import javax.persistence.criteria.JoinType;
import ma.sig.events.domain.*; // for static metamodels
import ma.sig.events.domain.Area;
import ma.sig.events.repository.AreaRepository;
import ma.sig.events.service.criteria.AreaCriteria;
import ma.sig.events.service.dto.AreaDTO;
import ma.sig.events.service.mapper.AreaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tech.jhipster.service.QueryService;

/**
 * Service for executing complex queries for {@link Area} entities in the database.
 * The main input is a {@link AreaCriteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link AreaDTO} or a {@link Page} of {@link AreaDTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class AreaQueryService extends QueryService<Area> {

    private final Logger log = LoggerFactory.getLogger(AreaQueryService.class);

    private final AreaRepository areaRepository;

    private final AreaMapper areaMapper;

    public AreaQueryService(AreaRepository areaRepository, AreaMapper areaMapper) {
        this.areaRepository = areaRepository;
        this.areaMapper = areaMapper;
    }

    /**
     * Return a {@link List} of {@link AreaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<AreaDTO> findByCriteria(AreaCriteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<Area> specification = createSpecification(criteria);
        return areaMapper.toDto(areaRepository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link AreaDTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<AreaDTO> findByCriteria(AreaCriteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<Area> specification = createSpecification(criteria);
        return areaRepository.findAll(specification, page).map(areaMapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(AreaCriteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<Area> specification = createSpecification(criteria);
        return areaRepository.count(specification);
    }

    /**
     * Function to convert {@link AreaCriteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<Area> createSpecification(AreaCriteria criteria) {
        Specification<Area> specification = Specification.where(null);
        if (criteria != null) {
            // This has to be called first, because the distinct method returns null
            if (criteria.getDistinct() != null) {
                specification = specification.and(distinct(criteria.getDistinct()));
            }
            if (criteria.getAreaId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getAreaId(), Area_.areaId));
            }
            if (criteria.getAreaName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaName(), Area_.areaName));
            }
            if (criteria.getAreaAbreviation() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaAbreviation(), Area_.areaAbreviation));
            }
            if (criteria.getAreaColor() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaColor(), Area_.areaColor));
            }
            if (criteria.getAreaDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaDescription(), Area_.areaDescription));
            }
            if (criteria.getAreaParams() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaParams(), Area_.areaParams));
            }
            if (criteria.getAreaAttributs() != null) {
                specification = specification.and(buildStringSpecification(criteria.getAreaAttributs(), Area_.areaAttributs));
            }
            if (criteria.getAreaStat() != null) {
                specification = specification.and(buildSpecification(criteria.getAreaStat(), Area_.areaStat));
            }
            if (criteria.getEventId() != null) {
                specification =
                    specification.and(
                        buildSpecification(criteria.getEventId(), root -> root.join(Area_.event, JoinType.LEFT).get(Event_.eventId))
                    );
            }
            if (criteria.getFonctionId() != null) {
                specification =
                    specification.and(
                        buildSpecification(
                            criteria.getFonctionId(),
                            root -> root.join(Area_.fonctions, JoinType.LEFT).get(Fonction_.fonctionId)
                        )
                    );
            }
        }
        return specification;
    }
}
