<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="contato">
        <h2 class="jh-entity-heading" data-cy="contatoDetailsHeading">
          <span v-text="$t('advappApp.contato.detail.title')">Contato</span> {{ contato.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('advappApp.contato.celular')">Celular</span>
          </dt>
          <dd>
            <span>{{ contato.celular }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.contato.telefone')">Telefone</span>
          </dt>
          <dd>
            <span>{{ contato.telefone }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.contato.email')">Email</span>
          </dt>
          <dd>
            <span>{{ contato.email }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.contato.instagram')">Instagram</span>
          </dt>
          <dd>
            <span>{{ contato.instagram }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="contato.id" :to="{ name: 'ContatoEdit', params: { contatoId: contato.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./contato-details.component.ts"></script>
