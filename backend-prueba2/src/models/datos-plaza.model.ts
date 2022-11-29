import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Plaza} from './plaza.model';

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

  @belongsTo(() => Plaza)
  plazaId: string;

  constructor(data?: Partial<DatosPlaza>) {
    super(data);
  }
}

export interface DatosPlazaRelations {
  // describe navigational properties here
}

export type DatosPlazaWithRelations = DatosPlaza & DatosPlazaRelations;
