import {Entity, model, property} from '@loopback/repository';

@model()
export class Solicitante extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  idDatos: string;


  constructor(data?: Partial<Solicitante>) {
    super(data);
  }
}

export interface SolicitanteRelations {
  // describe navigational properties here
}

export type SolicitanteWithRelations = Solicitante & SolicitanteRelations;
