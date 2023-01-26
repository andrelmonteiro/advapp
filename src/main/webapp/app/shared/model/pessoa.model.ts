import { IEndereco } from '@/shared/model/endereco.model';
import { IProcesso } from '@/shared/model/processo.model';

export interface IPessoa {
  id?: number;
  ativo?: number | null;
  autoridade?: boolean | null;
  contato?: string;
  enderecos?: IEndereco[] | null;
  processos?: IProcesso[] | null;
}

export class Pessoa implements IPessoa {
  constructor(
    public id?: number,
    public ativo?: number | null,
    public autoridade?: boolean | null,
    public contato?: string,
    public enderecos?: IEndereco[] | null,
    public processos?: IProcesso[] | null
  ) {
    this.autoridade = this.autoridade ?? false;
  }
}
