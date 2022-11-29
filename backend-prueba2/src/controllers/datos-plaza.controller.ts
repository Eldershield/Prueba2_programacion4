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
import {DatosPlaza} from '../models';
import {DatosPlazaRepository} from '../repositories';

export class DatosPlazaController {
  constructor(
    @repository(DatosPlazaRepository)
    public datosPlazaRepository : DatosPlazaRepository,
  ) {}

  @post('/datos-plazas')
  @response(200, {
    description: 'DatosPlaza model instance',
    content: {'application/json': {schema: getModelSchemaRef(DatosPlaza)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosPlaza, {
            title: 'NewDatosPlaza',
            exclude: ['id'],
          }),
        },
      },
    })
    datosPlaza: Omit<DatosPlaza, 'id'>,
  ): Promise<DatosPlaza> {
    return this.datosPlazaRepository.create(datosPlaza);
  }

  @get('/datos-plazas/count')
  @response(200, {
    description: 'DatosPlaza model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DatosPlaza) where?: Where<DatosPlaza>,
  ): Promise<Count> {
    return this.datosPlazaRepository.count(where);
  }

  @get('/datos-plazas')
  @response(200, {
    description: 'Array of DatosPlaza model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DatosPlaza, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DatosPlaza) filter?: Filter<DatosPlaza>,
  ): Promise<DatosPlaza[]> {
    return this.datosPlazaRepository.find(filter);
  }

  @patch('/datos-plazas')
  @response(200, {
    description: 'DatosPlaza PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosPlaza, {partial: true}),
        },
      },
    })
    datosPlaza: DatosPlaza,
    @param.where(DatosPlaza) where?: Where<DatosPlaza>,
  ): Promise<Count> {
    return this.datosPlazaRepository.updateAll(datosPlaza, where);
  }

  @get('/datos-plazas/{id}')
  @response(200, {
    description: 'DatosPlaza model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DatosPlaza, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DatosPlaza, {exclude: 'where'}) filter?: FilterExcludingWhere<DatosPlaza>
  ): Promise<DatosPlaza> {
    return this.datosPlazaRepository.findById(id, filter);
  }

  @patch('/datos-plazas/{id}')
  @response(204, {
    description: 'DatosPlaza PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosPlaza, {partial: true}),
        },
      },
    })
    datosPlaza: DatosPlaza,
  ): Promise<void> {
    await this.datosPlazaRepository.updateById(id, datosPlaza);
  }

  @put('/datos-plazas/{id}')
  @response(204, {
    description: 'DatosPlaza PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() datosPlaza: DatosPlaza,
  ): Promise<void> {
    await this.datosPlazaRepository.replaceById(id, datosPlaza);
  }

  @del('/datos-plazas/{id}')
  @response(204, {
    description: 'DatosPlaza DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.datosPlazaRepository.deleteById(id);
  }
}
