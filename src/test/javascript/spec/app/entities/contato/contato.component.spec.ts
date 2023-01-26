/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ContatoComponent from '@/entities/contato/contato.vue';
import ContatoClass from '@/entities/contato/contato.component';
import ContatoService from '@/entities/contato/contato.service';
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
  describe('Contato Management Component', () => {
    let wrapper: Wrapper<ContatoClass>;
    let comp: ContatoClass;
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;

    beforeEach(() => {
      contatoServiceStub = sinon.createStubInstance<ContatoService>(ContatoService);
      contatoServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<ContatoClass>(ContatoComponent, {
        store,
        i18n,
        localVue,
        stubs: { bModal: bModalStub as any },
        provide: {
          contatoService: () => contatoServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      contatoServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllContatos();
      await comp.$nextTick();

      // THEN
      expect(contatoServiceStub.retrieve.called).toBeTruthy();
      expect(comp.contatoes[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      contatoServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      expect(contatoServiceStub.retrieve.callCount).toEqual(1);

      comp.removeContato();
      await comp.$nextTick();

      // THEN
      expect(contatoServiceStub.delete.called).toBeTruthy();
      expect(contatoServiceStub.retrieve.callCount).toEqual(2);
    });
  });
});
