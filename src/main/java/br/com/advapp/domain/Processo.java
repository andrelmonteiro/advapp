package br.com.advapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Processo.
 */
@Entity
@Table(name = "processo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Processo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "nuj")
    private String nuj;

    @Column(name = "nemro_processo_tj")
    private Integer nemroProcessoTJ;

    @Column(name = "vara")
    private String vara;

    @Column(name = "obs")
    private String obs;

    @ManyToMany(mappedBy = "processos")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "enderecos", "processos" }, allowSetters = true)
    private Set<Pessoa> pessoas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Processo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNuj() {
        return this.nuj;
    }

    public Processo nuj(String nuj) {
        this.setNuj(nuj);
        return this;
    }

    public void setNuj(String nuj) {
        this.nuj = nuj;
    }

    public Integer getNemroProcessoTJ() {
        return this.nemroProcessoTJ;
    }

    public Processo nemroProcessoTJ(Integer nemroProcessoTJ) {
        this.setNemroProcessoTJ(nemroProcessoTJ);
        return this;
    }

    public void setNemroProcessoTJ(Integer nemroProcessoTJ) {
        this.nemroProcessoTJ = nemroProcessoTJ;
    }

    public String getVara() {
        return this.vara;
    }

    public Processo vara(String vara) {
        this.setVara(vara);
        return this;
    }

    public void setVara(String vara) {
        this.vara = vara;
    }

    public String getObs() {
        return this.obs;
    }

    public Processo obs(String obs) {
        this.setObs(obs);
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Set<Pessoa> getPessoas() {
        return this.pessoas;
    }

    public void setPessoas(Set<Pessoa> pessoas) {
        if (this.pessoas != null) {
            this.pessoas.forEach(i -> i.removeProcessos(this));
        }
        if (pessoas != null) {
            pessoas.forEach(i -> i.addProcessos(this));
        }
        this.pessoas = pessoas;
    }

    public Processo pessoas(Set<Pessoa> pessoas) {
        this.setPessoas(pessoas);
        return this;
    }

    public Processo addPessoas(Pessoa pessoa) {
        this.pessoas.add(pessoa);
        pessoa.getProcessos().add(this);
        return this;
    }

    public Processo removePessoas(Pessoa pessoa) {
        this.pessoas.remove(pessoa);
        pessoa.getProcessos().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Processo)) {
            return false;
        }
        return id != null && id.equals(((Processo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Processo{" +
            "id=" + getId() +
            ", nuj='" + getNuj() + "'" +
            ", nemroProcessoTJ=" + getNemroProcessoTJ() +
            ", vara='" + getVara() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
