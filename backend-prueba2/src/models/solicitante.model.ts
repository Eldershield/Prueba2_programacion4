import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {DatosSolicitante} from './datos-solicitante.model';

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

  @belongsTo(() => DatosSolicitante)
  datosSolicitanteId: string;

  @hasMany(() => DatosSolicitante)
  datosSolicitantes: DatosSolicitante[];

  constructor(data?: Partial<Solicitante>) {
    super(data);
  }
}

export interface SolicitanteRelations {
  // describe navigational properties here
}

export type SolicitanteWithRelations = Solicitante & SolicitanteRelations;
