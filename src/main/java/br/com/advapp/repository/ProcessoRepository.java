package br.com.advapp.repository;

import br.com.advapp.domain.Processo;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Processo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProcessoRepository extends JpaRepository<Processo, Long> {}
