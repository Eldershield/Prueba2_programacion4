import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Solicitante} from '../models';
import {SolicitanteRepository} from '../repositories';

export class SolicitanteController {
  constructor(
    @repository(SolicitanteRepository)
    public solicitanteRepository : SolicitanteRepository,
  ) {}

  @post('/solicitantes')
  @response(200, {
    description: 'Solicitante model instance',
    content: {'application/json': {schema: getModelSchemaRef(Solicitante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitante, {
            title: 'NewSolicitante',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitante: Omit<Solicitante, 'id'>,
  ): Promise<Solicitante> {
    return this.solicitanteRepository.create(solicitante);
  }

  @get('/solicitantes/count')
  @response(200, {
    description: 'Solicitante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Solicitante) where?: Where<Solicitante>,
  ): Promise<Count> {
    return this.solicitanteRepository.count(where);
  }

  @get('/solicitantes')
  @response(200, {
    description: 'Array of Solicitante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Solicitante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Solicitante) filter?: Filter<Solicitante>,
  ): Promise<Solicitante[]> {
    return this.solicitanteRepository.find(filter);
  }

  @patch('/solicitantes')
  @response(200, {
    description: 'Solicitante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitante, {partial: true}),
        },
      },
    })
    solicitante: Solicitante,
    @param.where(Solicitante) where?: Where<Solicitante>,
  ): Promise<Count> {
    return this.solicitanteRepository.updateAll(solicitante, where);
  }

  @get('/solicitantes/{id}')
  @response(200, {
    description: 'Solicitante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Solicitante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Solicitante, {exclude: 'where'}) filter?: FilterExcludingWhere<Solicitante>
  ): Promise<Solicitante> {
    return this.solicitanteRepository.findById(id, filter);
  }

  @patch('/solicitantes/{id}')
  @response(204, {
    description: 'Solicitante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitante, {partial: true}),
        },
      },
    })
    solicitante: Solicitante,
  ): Promise<void> {
    await this.solicitanteRepository.updateById(id, solicitante);
  }

  @put('/solicitantes/{id}')
  @response(204, {
    description: 'Solicitante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitante: Solicitante,
  ): Promise<void> {
    await this.solicitanteRepository.replaceById(id, solicitante);
  }

  @del('/solicitantes/{id}')
  @response(204, {
    description: 'Solicitante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitanteRepository.deleteById(id);
  }
}
