import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  DatosSolicitante,
  Solicitante,
} from '../models';
import {DatosSolicitanteRepository} from '../repositories';

export class DatosSolicitanteSolicitanteController {
  constructor(
    @repository(DatosSolicitanteRepository)
    public datosSolicitanteRepository: DatosSolicitanteRepository,
  ) { }

  @get('/datos-solicitantes/{id}/solicitante', {
    responses: {
      '200': {
        description: 'Solicitante belonging to DatosSolicitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitante)},
          },
        },
      },
    },
  })
  async getSolicitante(
    @param.path.string('id') id: typeof DatosSolicitante.prototype.id,
  ): Promise<Solicitante> {
    return this.datosSolicitanteRepository.solicitante(id);
  }
}
