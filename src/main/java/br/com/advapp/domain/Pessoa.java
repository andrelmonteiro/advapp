package br.com.advapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "ativo")
    private Integer ativo;

    @Column(name = "autoridade")
    private Boolean autoridade;

    @NotNull
    @Column(name = "contato", nullable = false)
    private String contato;

    @ManyToMany
    @JoinTable(
        name = "rel_pessoa__enderecos",
        joinColumns = @JoinColumn(name = "pessoa_id"),
        inverseJoinColumns = @JoinColumn(name = "enderecos_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "municipio", "pessoas" }, allowSetters = true)
    private Set<Endereco> enderecos = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_pessoa__processos",
        joinColumns = @JoinColumn(name = "pessoa_id"),
        inverseJoinColumns = @JoinColumn(name = "processos_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "pessoas" }, allowSetters = true)
    private Set<Processo> processos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pessoa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getAtivo() {
        return this.ativo;
    }

    public Pessoa ativo(Integer ativo) {
        this.setAtivo(ativo);
        return this;
    }

    public void setAtivo(Integer ativo) {
        this.ativo = ativo;
    }

    public Boolean getAutoridade() {
        return this.autoridade;
    }

    public Pessoa autoridade(Boolean autoridade) {
        this.setAutoridade(autoridade);
        return this;
    }

    public void setAutoridade(Boolean autoridade) {
        this.autoridade = autoridade;
    }

    public String getContato() {
        return this.contato;
    }

    public Pessoa contato(String contato) {
        this.setContato(contato);
        return this;
    }

    public void setContato(String contato) {
        this.contato = contato;
    }

    public Set<Endereco> getEnderecos() {
        return this.enderecos;
    }

    public void setEnderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public Pessoa enderecos(Set<Endereco> enderecos) {
        this.setEnderecos(enderecos);
        return this;
    }

    public Pessoa addEnderecos(Endereco endereco) {
        this.enderecos.add(endereco);
        endereco.getPessoas().add(this);
        return this;
    }

    public Pessoa removeEnderecos(Endereco endereco) {
        this.enderecos.remove(endereco);
        endereco.getPessoas().remove(this);
        return this;
    }

    public Set<Processo> getProcessos() {
        return this.processos;
    }

    public void setProcessos(Set<Processo> processos) {
        this.processos = processos;
    }

    public Pessoa processos(Set<Processo> processos) {
        this.setProcessos(processos);
        return this;
    }

    public Pessoa addProcessos(Processo processo) {
        this.processos.add(processo);
        processo.getPessoas().add(this);
        return this;
    }

    public Pessoa removeProcessos(Processo processo) {
        this.processos.remove(processo);
        processo.getPessoas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", ativo=" + getAtivo() +
            ", autoridade='" + getAutoridade() + "'" +
            ", contato='" + getContato() + "'" +
            "}";
    }
}
