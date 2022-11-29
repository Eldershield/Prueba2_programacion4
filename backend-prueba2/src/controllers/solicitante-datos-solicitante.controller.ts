import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitante,
  DatosSolicitante,
} from '../models';
import {SolicitanteRepository} from '../repositories';

export class SolicitanteDatosSolicitanteController {
  constructor(
    @repository(SolicitanteRepository) protected solicitanteRepository: SolicitanteRepository,
  ) { }

  @get('/solicitantes/{id}/datos-solicitantes', {
    responses: {
      '200': {
        description: 'Array of Solicitante has many DatosSolicitante',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatosSolicitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DatosSolicitante>,
  ): Promise<DatosSolicitante[]> {
    return this.solicitanteRepository.datosSolicitantes(id).find(filter);
  }

  @post('/solicitantes/{id}/datos-solicitantes', {
    responses: {
      '200': {
        description: 'Solicitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatosSolicitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosSolicitante, {
            title: 'NewDatosSolicitanteInSolicitante',
            exclude: ['id'],
            optional: ['solicitanteId']
          }),
        },
      },
    }) datosSolicitante: Omit<DatosSolicitante, 'id'>,
  ): Promise<DatosSolicitante> {
    return this.solicitanteRepository.datosSolicitantes(id).create(datosSolicitante);
  }

  @patch('/solicitantes/{id}/datos-solicitantes', {
    responses: {
      '200': {
        description: 'Solicitante.DatosSolicitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosSolicitante, {partial: true}),
        },
      },
    })
    datosSolicitante: Partial<DatosSolicitante>,
    @param.query.object('where', getWhereSchemaFor(DatosSolicitante)) where?: Where<DatosSolicitante>,
  ): Promise<Count> {
    return this.solicitanteRepository.datosSolicitantes(id).patch(datosSolicitante, where);
  }

  @del('/solicitantes/{id}/datos-solicitantes', {
    responses: {
      '200': {
        description: 'Solicitante.DatosSolicitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DatosSolicitante)) where?: Where<DatosSolicitante>,
  ): Promise<Count> {
    return this.solicitanteRepository.datosSolicitantes(id).delete(where);
  }
}
