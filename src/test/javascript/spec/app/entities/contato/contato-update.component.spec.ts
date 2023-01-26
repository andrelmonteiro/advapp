/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';
import Router from 'vue-router';
import { ToastPlugin } from 'bootstrap-vue';

import * as config from '@/shared/config/config';
import ContatoUpdateComponent from '@/entities/contato/contato-update.vue';
import ContatoClass from '@/entities/contato/contato-update.component';
import ContatoService from '@/entities/contato/contato.service';

import AlertService from '@/shared/alert/alert.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const i18n = config.initI18N(localVue);
const store = config.initVueXStore(localVue);
const router = new Router();
localVue.use(Router);
localVue.use(ToastPlugin);
localVue.component('font-awesome-icon', {});
localVue.component('b-input-group', {});
localVue.component('b-input-group-prepend', {});
localVue.component('b-form-datepicker', {});
localVue.component('b-form-input', {});

describe('Component Tests', () => {
  describe('Contato Management Update Component', () => {
    let wrapper: Wrapper<ContatoClass>;
    let comp: ContatoClass;
    let contatoServiceStub: SinonStubbedInstance<ContatoService>;

    beforeEach(() => {
      contatoServiceStub = sinon.createStubInstance<ContatoService>(ContatoService);

      wrapper = shallowMount<ContatoClass>(ContatoUpdateComponent, {
        store,
        i18n,
        localVue,
        router,
        provide: {
          contatoService: () => contatoServiceStub,
          alertService: () => new AlertService(),
        },
      });
      comp = wrapper.vm;
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', async () => {
        // GIVEN
        const entity = { id: 123 };
        comp.contato = entity;
        contatoServiceStub.update.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(contatoServiceStub.update.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', async () => {
        // GIVEN
        const entity = {};
        comp.contato = entity;
        contatoServiceStub.create.resolves(entity);

        // WHEN
        comp.save();
        await comp.$nextTick();

        // THEN
        expect(contatoServiceStub.create.calledWith(entity)).toBeTruthy();
        expect(comp.isSaving).toEqual(false);
      });
    });

    describe('Before route enter', () => {
      it('Should retrieve data', async () => {
        // GIVEN
        const foundContato = { id: 123 };
        contatoServiceStub.find.resolves(foundContato);
        contatoServiceStub.retrieve.resolves([foundContato]);

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
