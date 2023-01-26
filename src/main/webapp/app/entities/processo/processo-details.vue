<template>
  <div class="row justify-content-center">
    <div class="col-8">
      <div v-if="processo">
        <h2 class="jh-entity-heading" data-cy="processoDetailsHeading">
          <span v-text="$t('advappApp.processo.detail.title')">Processo</span> {{ processo.id }}
        </h2>
        <dl class="row jh-entity-details">
          <dt>
            <span v-text="$t('advappApp.processo.nuj')">Nuj</span>
          </dt>
          <dd>
            <span>{{ processo.nuj }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.processo.nemroProcessoTJ')">Nemro Processo TJ</span>
          </dt>
          <dd>
            <span>{{ processo.nemroProcessoTJ }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.processo.vara')">Vara</span>
          </dt>
          <dd>
            <span>{{ processo.vara }}</span>
          </dd>
          <dt>
            <span v-text="$t('advappApp.processo.obs')">Obs</span>
          </dt>
          <dd>
            <span>{{ processo.obs }}</span>
          </dd>
        </dl>
        <button type="submit" v-on:click.prevent="previousState()" class="btn btn-info" data-cy="entityDetailsBackButton">
          <font-awesome-icon icon="arrow-left"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.back')"> Back</span>
        </button>
        <router-link v-if="processo.id" :to="{ name: 'ProcessoEdit', params: { processoId: processo.id } }" custom v-slot="{ navigate }">
          <button @click="navigate" class="btn btn-primary">
            <font-awesome-icon icon="pencil-alt"></font-awesome-icon>&nbsp;<span v-text="$t('entity.action.edit')"> Edit</span>
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./processo-details.component.ts"></script>
