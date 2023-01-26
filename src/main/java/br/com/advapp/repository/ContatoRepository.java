package br.com.advapp.repository;

import br.com.advapp.domain.Contato;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Contato entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContatoRepository extends JpaRepository<Contato, Long> {}
