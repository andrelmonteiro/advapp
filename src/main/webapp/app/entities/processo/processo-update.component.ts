import { Component, Vue, Inject } from 'vue-property-decorator';

import AlertService from '@/shared/alert/alert.service';

import PessoaService from '@/entities/pessoa/pessoa.service';
import { IPessoa } from '@/shared/model/pessoa.model';

import { IProcesso, Processo } from '@/shared/model/processo.model';
import ProcessoService from './processo.service';

const validations: any = {
  processo: {
    nuj: {},
    nemroProcessoTJ: {},
    vara: {},
    obs: {},
  },
};

@Component({
  validations,
})
export default class ProcessoUpdate extends Vue {
  @Inject('processoService') private processoService: () => ProcessoService;
  @Inject('alertService') private alertService: () => AlertService;

  public processo: IProcesso = new Processo();

  @Inject('pessoaService') private pessoaService: () => PessoaService;

  public pessoas: IPessoa[] = [];
  public isSaving = false;
  public currentLanguage = '';

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.processoId) {
        vm.retrieveProcesso(to.params.processoId);
      }
      vm.initRelationships();
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
    if (this.processo.id) {
      this.processoService()
        .update(this.processo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('advappApp.processo.updated', { param: param.id });
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
      this.processoService()
        .create(this.processo)
        .then(param => {
          this.isSaving = false;
          this.$router.go(-1);
          const message = this.$t('advappApp.processo.created', { param: param.id });
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

  public retrieveProcesso(processoId): void {
    this.processoService()
      .find(processoId)
      .then(res => {
        this.processo = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState(): void {
    this.$router.go(-1);
  }

  public initRelationships(): void {
    this.pessoaService()
      .retrieve()
      .then(res => {
        this.pessoas = res.data;
      });
  }
}
