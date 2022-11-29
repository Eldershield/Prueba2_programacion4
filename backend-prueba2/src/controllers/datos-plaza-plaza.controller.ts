import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatosPlaza,
  Plaza,
} from '../models';
import {DatosPlazaRepository} from '../repositories';

export class DatosPlazaPlazaController {
  constructor(
    @repository(DatosPlazaRepository)
    public datosPlazaRepository: DatosPlazaRepository,
  ) { }

  @get('/datos-plazas/{id}/plaza', {
    responses: {
      '200': {
        description: 'Plaza belonging to DatosPlaza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plaza)},
          },
        },
      },
    },
  })
  async getPlaza(
    @param.path.string('id') id: typeof DatosPlaza.prototype.id,
  ): Promise<Plaza> {
    return this.datosPlazaRepository.plaza(id);
  }
}
