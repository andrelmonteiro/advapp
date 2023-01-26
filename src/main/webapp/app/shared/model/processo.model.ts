import { IPessoa } from '@/shared/model/pessoa.model';

export interface IProcesso {
  id?: number;
  nuj?: string | null;
  nemroProcessoTJ?: number | null;
  vara?: string | null;
  obs?: string | null;
  pessoas?: IPessoa[] | null;
}

export class Processo implements IProcesso {
  constructor(
    public id?: number,
    public nuj?: string | null,
    public nemroProcessoTJ?: number | null,
    public vara?: string | null,
    public obs?: string | null,
    public pessoas?: IPessoa[] | null
  ) {}
}
