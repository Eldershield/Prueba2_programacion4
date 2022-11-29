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
  DatosPlaza,
} from '../models';
import {PlazaRepository} from '../repositories';

export class PlazaDatosPlazaController {
  constructor(
    @repository(PlazaRepository) protected plazaRepository: PlazaRepository,
  ) { }

  @get('/plazas/{id}/datos-plazas', {
    responses: {
      '200': {
        description: 'Array of Plaza has many DatosPlaza',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(DatosPlaza)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<DatosPlaza>,
  ): Promise<DatosPlaza[]> {
    return this.plazaRepository.datosPlazas(id).find(filter);
  }

  @post('/plazas/{id}/datos-plazas', {
    responses: {
      '200': {
        description: 'Plaza model instance',
        content: {'application/json': {schema: getModelSchemaRef(DatosPlaza)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plaza.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosPlaza, {
            title: 'NewDatosPlazaInPlaza',
            exclude: ['id'],
            optional: ['plazaId']
          }),
        },
      },
    }) datosPlaza: Omit<DatosPlaza, 'id'>,
  ): Promise<DatosPlaza> {
    return this.plazaRepository.datosPlazas(id).create(datosPlaza);
  }

  @patch('/plazas/{id}/datos-plazas', {
    responses: {
      '200': {
        description: 'Plaza.DatosPlaza PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DatosPlaza, {partial: true}),
        },
      },
    })
    datosPlaza: Partial<DatosPlaza>,
    @param.query.object('where', getWhereSchemaFor(DatosPlaza)) where?: Where<DatosPlaza>,
  ): Promise<Count> {
    return this.plazaRepository.datosPlazas(id).patch(datosPlaza, where);
  }

  @del('/plazas/{id}/datos-plazas', {
    responses: {
      '200': {
        description: 'Plaza.DatosPlaza DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(DatosPlaza)) where?: Where<DatosPlaza>,
  ): Promise<Count> {
    return this.plazaRepository.datosPlazas(id).delete(where);
  }
}
