export interface IContato {
  id?: number;
  celular?: string | null;
  telefone?: string | null;
  email?: string | null;
  instagram?: Date | null;
}

export class Contato implements IContato {
  constructor(
    public id?: number,
    public celular?: string | null,
    public telefone?: string | null,
    public email?: string | null,
    public instagram?: Date | null
  ) {}
}
