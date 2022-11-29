import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Plaza, PlazaRelations, DatosPlaza, Solicitante, Solicitud} from '../models';
import {DatosPlazaRepository} from './datos-plaza.repository';
import {SolicitudRepository} from './solicitud.repository';
import {SolicitanteRepository} from './solicitante.repository';

export class PlazaRepository extends DefaultCrudRepository<
  Plaza,
  typeof Plaza.prototype.id,
  PlazaRelations
> {

  public readonly datosPlazas: HasManyRepositoryFactory<DatosPlaza, typeof Plaza.prototype.id>;

  public readonly solicitantes: HasManyThroughRepositoryFactory<Solicitante, typeof Solicitante.prototype.id,
          Solicitud,
          typeof Plaza.prototype.id
        >;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DatosPlazaRepository') protected datosPlazaRepositoryGetter: Getter<DatosPlazaRepository>, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>, @repository.getter('SolicitanteRepository') protected solicitanteRepositoryGetter: Getter<SolicitanteRepository>,
  ) {
    super(Plaza, dataSource);
    this.solicitantes = this.createHasManyThroughRepositoryFactoryFor('solicitantes', solicitanteRepositoryGetter, solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitantes', this.solicitantes.inclusionResolver);
    this.datosPlazas = this.createHasManyRepositoryFactoryFor('datosPlazas', datosPlazaRepositoryGetter,);
    this.registerInclusionResolver('datosPlazas', this.datosPlazas.inclusionResolver);
  }
}
