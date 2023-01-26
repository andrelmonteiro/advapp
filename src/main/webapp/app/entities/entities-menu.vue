<template>
  <div>
    <b-dropdown-item to="/processo">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.processo')">Processo</span>
    </b-dropdown-item>
    <b-dropdown-item to="/contato">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.contato')">Contato</span>
    </b-dropdown-item>
    <b-dropdown-item to="/pessoa">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.pessoa')">Pessoa</span>
    </b-dropdown-item>
    <b-dropdown-item to="/estado">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.estado')">Estado</span>
    </b-dropdown-item>
    <b-dropdown-item to="/pais">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.pais')">Pais</span>
    </b-dropdown-item>
    <b-dropdown-item to="/municipio">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.municipio')">Municipio</span>
    </b-dropdown-item>
    <b-dropdown-item to="/endereco">
      <font-awesome-icon icon="asterisk" />
      <span v-text="$t('global.menu.entities.endereco')">Endereco</span>
    </b-dropdown-item>
    <!-- jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here -->
  </div>
</template>

<script lang="ts" src="./entities-menu.component.ts"></script>
