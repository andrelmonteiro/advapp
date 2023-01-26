/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ProcessoComponent from '@/entities/processo/processo.vue';
import ProcessoClass from '@/entities/processo/processo.component';
import ProcessoService from '@/entities/processo/processo.service';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(ToastPlugin);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('Processo Management Component', () => {
    let wrapper: Wrapper<ProcessoClass>;
    let comp: ProcessoClass;
    let processoServiceStub: SinonStubbedInstance<ProcessoService>;

    beforeEach(() => {
      processoServiceStub = sinon.createStubInstance<ProcessoService>(ProcessoService);
      processoServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ProcessoClass>(ProcessoComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          processoService: () => processoServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      processoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllProcessos();
      await comp.$nextTick();

      // THEN
      expect(processoServiceStub.retrieve.called).toBeTruthy();
      expect(comp.processos[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      processoServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(processoServiceStub.retrieve.callCount).toEqual(1);

      comp.removeProcesso();
      await comp.$nextTick();

      // THEN
      expect(processoServiceStub.delete.called).toBeTruthy();
      expect(processoServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
