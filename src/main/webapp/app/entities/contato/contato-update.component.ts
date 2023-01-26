import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import { IContato, Contato } from '@/shared/model/contato.model';
import ContatoService from './contato.service';

const validations: any = {
  contato: {
    celular: {},
    telefone: {},
    email: {},
    instagram: {},
  },
};

@Component({
  validations,
})
export default class ContatoUpdate extends Vue {
  @Inject('contatoService') private contatoService: () => ContatoService;
  @Inject('alertService') private alertService: () => AlertService;

  public contato: IContato = new Contato();
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.contatoId) {
        vm.retrieveContato(to.params.contatoId);
      }
    });
  }

  created(): void {
    this.currentLanguage = this.$store.getters.currentLanguage;
    this.$store.watch(
      () => this.$store.getters.currentLanguage,
      () => {
        this.currentLanguage = this.$store.getters.currentLanguage;
      }
    );
  }

  public save(): void {
    this.isSaving = true;
    if (this.contato.id) {
      this.contatoService()
        .update(this.contato)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('advappApp.contato.updated', { param: param.id });
          return (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Info',
            variant: 'info',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    } else {
      this.contatoService()
        .create(this.contato)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('advappApp.contato.created', { param: param.id });
          (this.$root as any).$bvToast.toast(message.toString(), {
            toaster: 'b-toaster-top-center',
            title: 'Success',
            variant: 'success',
            solid: true,
            autoHideDelay: 5000,
          });
        })
        .catch(error => {
          this.isSaving = false;
          this.alertService().showHttpError(this, error.response);
        });
    }
  }

  public retrieveContato(contatoId): void {
    this.contatoService()
      .find(contatoId)
      .then(res => {
        this.contato = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {}
}
