import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Plaza>) {
    super(data);
  }
}

export interface PlazaRelations {
  // describe navigational properties here
}

export type PlazaWithRelations = Plaza & PlazaRelations;
