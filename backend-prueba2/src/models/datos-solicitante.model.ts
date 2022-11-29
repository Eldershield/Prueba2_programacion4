import {Entity, model, property, hasMany, belongsTo} from '@loopback/repository';
import {Solicitante} from './solicitante.model';

@model()
export class DatosSolicitante extends Entity {
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
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
    required: true,
  })
  competencias: string;

  @property({
    type: 'string',
    required: true,
  })
  habilidades: string;

  @property({
    type: 'string',
    required: true,
  })
  experiencia: string;

  @property({
    type: 'string',
    required: true,
  })
  educacion: string;

  @hasMany(() => Solicitante, {keyTo: 'idDatos'})
  solicitantes: Solicitante[];

  @belongsTo(() => Solicitante)
  solicitanteId: string;

  constructor(data?: Partial<DatosSolicitante>) {
    super(data);
  }
}

export interface DatosSolicitanteRelations {
  // describe navigational properties here
}

export type DatosSolicitanteWithRelations = DatosSolicitante & DatosSolicitanteRelations;
