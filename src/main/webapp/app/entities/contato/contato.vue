<template>
  <div>
    <h2 id="page-heading" data-cy="ContatoHeading">
      <span v-text="$t('advappApp.contato.home.title')" id="contato-heading">Contatoes</span>
      <div class="d-flex justify-content-end">
        <button class="btn btn-info mr-2" v-on:click="handleSyncList" :disabled="isFetching">
          <font-awesome-icon icon="sync" :spin="isFetching"></font-awesome-icon>
          <span v-text="$t('advappApp.contato.home.refreshListLabel')">Refresh List</span>
        </button>
        <router-link :to="{ name: 'ContatoCreate' }" custom v-slot="{ navigate }">
          <button
            @click="navigate"
            id="jh-create-entity"
            data-cy="entityCreateButton"
            class="btn btn-primary jh-create-entity create-contato"
          >
            <font-awesome-icon icon="plus"></font-awesome-icon>
            <span v-text="$t('advappApp.contato.home.createLabel')"> Create a new Contato </span>
          </button>
        </router-link>
      </div>
    </h2>
    <br />
    <div class="alert alert-warning" v-if="!isFetching && contatoes && contatoes.length === 0">
      <span v-text="$t('advappApp.contato.home.notFound')">No contatoes found</span>
    </div>
    <div class="table-responsive" v-if="contatoes && contatoes.length > 0">
      <table class="table table-striped" aria-describedby="contatoes">
        <thead>
          <tr>
            <th scope="row"><span v-text="$t('global.field.id')">ID</span></th>
            <th scope="row"><span v-text="$t('advappApp.contato.celular')">Celular</span></th>
            <th scope="row"><span v-text="$t('advappApp.contato.telefone')">Telefone</span></th>
            <th scope="row"><span v-text="$t('advappApp.contato.email')">Email</span></th>
            <th scope="row"><span v-text="$t('advappApp.contato.instagram')">Instagram</span></th>
            <th scope="row"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contato in contatoes" :key="contato.id" data-cy="entityTable">
            <td>
              <router-link :to="{ name: 'ContatoView', params: { contatoId: contato.id } }">{{ contato.id }}</router-link>
            </td>
            <td>{{ contato.celular }}</td>
            <td>{{ contato.telefone }}</td>
            <td>{{ contato.email }}</td>
            <td>{{ contato.instagram }}</td>
            <td class="text-right">
              <div class="btn-group">
                <router-link :to="{ name: 'ContatoView', params: { contatoId: contato.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-info btn-sm details" data-cy="entityDetailsButton">
                    <font-awesome-icon icon="eye"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.view')">View</span>
                  </button>
                </router-link>
                <router-link :to="{ name: 'ContatoEdit', params: { contatoId: contato.id } }" custom v-slot="{ navigate }">
                  <button @click="navigate" class="btn btn-primary btn-sm edit" data-cy="entityEditButton">
                    <font-awesome-icon icon="pencil-alt"></font-awesome-icon>
                    <span class="d-none d-md-inline" v-text="$t('entity.action.edit')">Edit</span>
                  </button>
                </router-link>
                <b-button
                  v-on:click="prepareRemove(contato)"
                  variant="danger"
                  class="btn btn-sm"
                  data-cy="entityDeleteButton"
                  v-b-modal.removeEntity
                >
                  <font-awesome-icon icon="times"></font-awesome-icon>
                  <span class="d-none d-md-inline" v-text="$t('entity.action.delete')">Delete</span>
                </b-button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <b-modal ref="removeEntity" id="removeEntity">
      <span slot="modal-title"
        ><span id="advappApp.contato.delete.question" data-cy="contatoDeleteDialogHeading" v-text="$t('entity.delete.title')"
          >Confirm delete operation</span
        ></span
      >
      <div class="modal-body">
        <p id="jhi-delete-contato-heading" v-text="$t('advappApp.contato.delete.question', { id: removeId })">
          Are you sure you want to delete this Contato?
        </p>
      </div>
      <div slot="modal-footer">
        <button type="button" class="btn btn-secondary" v-text="$t('entity.action.cancel')" v-on:click="closeDialog()">Cancel</button>
        <button
          type="button"
          class="btn btn-primary"
          id="jhi-confirm-delete-contato"
          data-cy="entityConfirmDeleteButton"
          v-text="$t('entity.action.delete')"
          v-on:click="removeContato()"
        >
          Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script lang="ts" src="./contato.component.ts"></script>
