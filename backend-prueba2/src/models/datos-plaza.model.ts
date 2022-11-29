import {Entity, model, property} from '@loopback/repository';

@model()
export class DatosPlaza extends Entity {
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
  nombrePuesto: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  requisitos: string;


  constructor(data?: Partial<DatosPlaza>) {
    super(data);
  }
}

export interface DatosPlazaRelations {
  // describe navigational properties here
}

export type DatosPlazaWithRelations = DatosPlaza & DatosPlazaRelations;
