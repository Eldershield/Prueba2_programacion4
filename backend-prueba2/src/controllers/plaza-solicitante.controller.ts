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
Plaza,
Solicitud,
Solicitante,
} from '../models';
import {PlazaRepository} from '../repositories';

export class PlazaSolicitanteController {
  constructor(
    @repository(PlazaRepository) protected plazaRepository: PlazaRepository,
  ) { }

  @get('/plazas/{id}/solicitantes', {
    responses: {
      '200': {
        description: 'Array of Plaza has many Solicitante through Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitante)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitante>,
  ): Promise<Solicitante[]> {
    return this.plazaRepository.solicitantes(id).find(filter);
  }

  @post('/plazas/{id}/solicitantes', {
    responses: {
      '200': {
        description: 'create a Solicitante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plaza.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitante, {
            title: 'NewSolicitanteInPlaza',
            exclude: ['id'],
          }),
        },
      },
    }) solicitante: Omit<Solicitante, 'id'>,
  ): Promise<Solicitante> {
    return this.plazaRepository.solicitantes(id).create(solicitante);
  }

  @patch('/plazas/{id}/solicitantes', {
    responses: {
      '200': {
        description: 'Plaza.Solicitante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitante, {partial: true}),
        },
      },
    })
    solicitante: Partial<Solicitante>,
    @param.query.object('where', getWhereSchemaFor(Solicitante)) where?: Where<Solicitante>,
  ): Promise<Count> {
    return this.plazaRepository.solicitantes(id).patch(solicitante, where);
  }

  @del('/plazas/{id}/solicitantes', {
    responses: {
      '200': {
        description: 'Plaza.Solicitante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitante)) where?: Where<Solicitante>,
  ): Promise<Count> {
    return this.plazaRepository.solicitantes(id).delete(where);
  }
}
