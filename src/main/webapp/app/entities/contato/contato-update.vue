<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="advappApp.contato.home.createOrEditLabel"
          data-cy="ContatoCreateUpdateHeading"
          v-text="$t('advappApp.contato.home.createOrEditLabel')"
        >
          Create or edit a Contato
        </h2>
        <div>
          <div class="form-group" v-if="contato.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="contato.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.contato.celular')" for="contato-celular">Celular</label>
            <input
              type="text"
              class="form-control"
              name="celular"
              id="contato-celular"
              data-cy="celular"
              :class="{ valid: !$v.contato.celular.$invalid, invalid: $v.contato.celular.$invalid }"
              v-model="$v.contato.celular.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.contato.telefone')" for="contato-telefone">Telefone</label>
            <input
              type="text"
              class="form-control"
              name="telefone"
              id="contato-telefone"
              data-cy="telefone"
              :class="{ valid: !$v.contato.telefone.$invalid, invalid: $v.contato.telefone.$invalid }"
              v-model="$v.contato.telefone.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.contato.email')" for="contato-email">Email</label>
            <input
              type="text"
              class="form-control"
              name="email"
              id="contato-email"
              data-cy="email"
              :class="{ valid: !$v.contato.email.$invalid, invalid: $v.contato.email.$invalid }"
              v-model="$v.contato.email.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.contato.instagram')" for="contato-instagram">Instagram</label>
            <b-input-group class="mb-3">
              <b-input-group-prepend>
                <b-form-datepicker
                  aria-controls="contato-instagram"
                  v-model="$v.contato.instagram.$model"
                  name="instagram"
                  class="form-control"
                  :locale="currentLanguage"
                  button-only
                  today-button
                  reset-button
                  close-button
                >
                </b-form-datepicker>
              </b-input-group-prepend>
              <b-form-input
                id="contato-instagram"
                data-cy="instagram"
                type="text"
                class="form-control"
                name="instagram"
                :class="{ valid: !$v.contato.instagram.$invalid, invalid: $v.contato.instagram.$invalid }"
                v-model="$v.contato.instagram.$model"
              />
            </b-input-group>
          </div>
        </div>
        <div>
          <button type="button" id="cancel-save" data-cy="entityCreateCancelButton" class="btn btn-secondary" v-on:click="previousState()">
            <font-awesome-icon icon="ban"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.cancel')">Cancel</span>
          </button>
          <button
            type="submit"
            id="save-entity"
            data-cy="entityCreateSaveButton"
            :disabled="$v.contato.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./contato-update.component.ts"></script>
