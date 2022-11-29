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
import {DatosSolicitante} from '../models';
import {DatosSolicitanteRepository} from '../repositories';

export class DatosSolicitanteController {
  constructor(
    @repository(DatosSolicitanteRepository)
    public datosSolicitanteRepository : DatosSolicitanteRepository,
  ) {}

  @post('/datos-solicitantes')
  @response(200, {
    description: 'DatosSolicitante model instance',
    content: {'application/json': {schema: getModelSchemaRef(DatosSolicitante)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosSolicitante, {
            title: 'NewDatosSolicitante',
            exclude: ['id'],
          }),
        },
      },
    })
    datosSolicitante: Omit<DatosSolicitante, 'id'>,
  ): Promise<DatosSolicitante> {
    return this.datosSolicitanteRepository.create(datosSolicitante);
  }

  @get('/datos-solicitantes/count')
  @response(200, {
    description: 'DatosSolicitante model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DatosSolicitante) where?: Where<DatosSolicitante>,
  ): Promise<Count> {
    return this.datosSolicitanteRepository.count(where);
  }

  @get('/datos-solicitantes')
  @response(200, {
    description: 'Array of DatosSolicitante model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DatosSolicitante, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DatosSolicitante) filter?: Filter<DatosSolicitante>,
  ): Promise<DatosSolicitante[]> {
    return this.datosSolicitanteRepository.find(filter);
  }

  @patch('/datos-solicitantes')
  @response(200, {
    description: 'DatosSolicitante PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosSolicitante, {partial: true}),
        },
      },
    })
    datosSolicitante: DatosSolicitante,
    @param.where(DatosSolicitante) where?: Where<DatosSolicitante>,
  ): Promise<Count> {
    return this.datosSolicitanteRepository.updateAll(datosSolicitante, where);
  }

  @get('/datos-solicitantes/{id}')
  @response(200, {
    description: 'DatosSolicitante model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DatosSolicitante, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DatosSolicitante, {exclude: 'where'}) filter?: FilterExcludingWhere<DatosSolicitante>
  ): Promise<DatosSolicitante> {
    return this.datosSolicitanteRepository.findById(id, filter);
  }

  @patch('/datos-solicitantes/{id}')
  @response(204, {
    description: 'DatosSolicitante PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosSolicitante, {partial: true}),
        },
      },
    })
    datosSolicitante: DatosSolicitante,
  ): Promise<void> {
    await this.datosSolicitanteRepository.updateById(id, datosSolicitante);
  }

  @put('/datos-solicitantes/{id}')
  @response(204, {
    description: 'DatosSolicitante PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() datosSolicitante: DatosSolicitante,
  ): Promise<void> {
    await this.datosSolicitanteRepository.replaceById(id, datosSolicitante);
  }

  @del('/datos-solicitantes/{id}')
  @response(204, {
    description: 'DatosSolicitante DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.datosSolicitanteRepository.deleteById(id);
  }
}
