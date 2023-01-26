import { Component, Vue, Inject } from 'vue-property-decorator';

import { IProcesso } from '@/shared/model/processo.model';
import ProcessoService from './processo.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ProcessoDetails extends Vue {
  @Inject('processoService') private processoService: () => ProcessoService;
  @Inject('alertService') private alertService: () => AlertService;

  public processo: IProcesso = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.processoId) {
        vm.retrieveProcesso(to.params.processoId);
      }
    });
  }

  public retrieveProcesso(processoId) {
    this.processoService()
      .find(processoId)
      .then(res => {
        this.processo = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
