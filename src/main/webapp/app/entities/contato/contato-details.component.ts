import { Component, Vue, Inject } from 'vue-property-decorator';

import { IContato } from '@/shared/model/contato.model';
import ContatoService from './contato.service';
import AlertService from '@/shared/alert/alert.service';

@Component
export default class ContatoDetails extends Vue {
  @Inject('contatoService') private contatoService: () => ContatoService;
  @Inject('alertService') private alertService: () => AlertService;

  public contato: IContato = {};

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.params.contatoId) {
        vm.retrieveContato(to.params.contatoId);
      }
    });
  }

  public retrieveContato(contatoId) {
    this.contatoService()
      .find(contatoId)
      .then(res => {
        this.contato = res;
      })
      .catch(error => {
        this.alertService().showHttpError(this, error.response);
      });
  }

  public previousState() {
    this.$router.go(-1);
  }
}
