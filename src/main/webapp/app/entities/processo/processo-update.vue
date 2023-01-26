<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <form name="editForm" role="form" novalidate v-on:submit.prevent="save()">
        <h2
          id="advappApp.processo.home.createOrEditLabel"
          data-cy="ProcessoCreateUpdateHeading"
          v-text="$t('advappApp.processo.home.createOrEditLabel')"
        >
          Create or edit a Processo
        </h2>
        <div>
          <div class="form-group" v-if="processo.id">
            <label for="id" v-text="$t('global.field.id')">ID</label>
            <input type="text" class="form-control" id="id" name="id" v-model="processo.id" readonly />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.processo.nuj')" for="processo-nuj">Nuj</label>
            <input
              type="text"
              class="form-control"
              name="nuj"
              id="processo-nuj"
              data-cy="nuj"
              :class="{ valid: !$v.processo.nuj.$invalid, invalid: $v.processo.nuj.$invalid }"
              v-model="$v.processo.nuj.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.processo.nemroProcessoTJ')" for="processo-nemroProcessoTJ"
              >Nemro Processo TJ</label
            >
            <input
              type="number"
              class="form-control"
              name="nemroProcessoTJ"
              id="processo-nemroProcessoTJ"
              data-cy="nemroProcessoTJ"
              :class="{ valid: !$v.processo.nemroProcessoTJ.$invalid, invalid: $v.processo.nemroProcessoTJ.$invalid }"
              v-model.number="$v.processo.nemroProcessoTJ.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.processo.vara')" for="processo-vara">Vara</label>
            <input
              type="text"
              class="form-control"
              name="vara"
              id="processo-vara"
              data-cy="vara"
              :class="{ valid: !$v.processo.vara.$invalid, invalid: $v.processo.vara.$invalid }"
              v-model="$v.processo.vara.$model"
            />
          </div>
          <div class="form-group">
            <label class="form-control-label" v-text="$t('advappApp.processo.obs')" for="processo-obs">Obs</label>
            <input
              type="text"
              class="form-control"
              name="obs"
              id="processo-obs"
              data-cy="obs"
              :class="{ valid: !$v.processo.obs.$invalid, invalid: $v.processo.obs.$invalid }"
              v-model="$v.processo.obs.$model"
            />
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
            :disabled="$v.processo.$invalid || isSaving"
            class="btn btn-primary"
          >
            <font-awesome-icon icon="save"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.save')">Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts" src="./processo-update.component.ts"></script>
