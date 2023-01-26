/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import VueRouter from 'vue-router';

import * as config from '@/shared/config/config';
import ContatoDetailComponent from '@/entities/contato/contato-details.vue';
import ContatoClass from '@/entities/contato/contato-details.component';
import ContatoService from '@/entities/contato/contato.service';
import router from '@/router';
import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();
localVue.use(VueRouter);

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('router-link', {});

describe('Component Tests', () => {
  describe('Contato Management Detail Component', () => {
    let wrapper: Wrapper<ContatoClass>;
    let comp: ContatoClass;
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;

    beforeEach(() => {
      contatoServiceStub = sinon.createStubInstance<ContatoService>(ContatoService);

      wrapper = shallowMount<ContatoClass>(ContatoDetailComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: { contatoService: () => contatoServiceStub, alertService: () => new AlertService() },
      });
      comp = wrapper.vm;
    });

    describe('OnInit', () => {
      it('Should call load all on init', async () => {
        // GIVEN
        const foundContato = { id: 123 };
        contatoServiceStub.find.resolves(foundContato);

        // WHEN
        comp.retrieveContato(123);
        await comp.$nextTick();

        // THEN
        expect(comp.contato).toBe(foundContato);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundContato = { id: 123 };
        contatoServiceStub.find.resolves(foundContato);

        // WHEN
        comp.beforeRouteEnter({ params: { contatoId: 123 } }, null, cb => cb(comp));
        await comp.$nextTick();

        // THEN
        expect(comp.contato).toBe(foundContato);
      });
    });

    describe('Previous state', () => {
      it('Should go previous state', async () => {
        comp.previousState();
        await comp.$nextTick();

        expect(comp.$router.currentRoute.fullPath).toContain('/');
      });
    });
  });
});
