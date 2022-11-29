import {Entity, model, property, hasMany} from '@loopback/repository';
import {DatosPlaza} from './datos-plaza.model';
import {Solicitante} from './solicitante.model';
import {Solicitud} from './solicitud.model';

@model()
export class Plaza extends Entity {
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
  iddatosPlaza: string;

  @property({
    type: 'boolean',
    default: true,
  })
  disponible?: boolean;

  @hasMany(() => DatosPlaza)
  datosPlazas: DatosPlaza[];

  @hasMany(() => Solicitante, {through: {model: () => Solicitud}})
  solicitantes: Solicitante[];

  constructor(data?: Partial<Plaza>) {
    super(data);
  }
}

export interface PlazaRelations {
  // describe navigational properties here
}

export type PlazaWithRelations = Plaza & PlazaRelations;
