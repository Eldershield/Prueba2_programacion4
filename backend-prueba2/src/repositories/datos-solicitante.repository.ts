import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DatosSolicitante, DatosSolicitanteRelations, Solicitante} from '../models';
import {SolicitanteRepository} from './solicitante.repository';

export class DatosSolicitanteRepository extends DefaultCrudRepository<
  DatosSolicitante,
  typeof DatosSolicitante.prototype.id,
  DatosSolicitanteRelations
> {

  public readonly solicitantes: HasManyRepositoryFactory<Solicitante, typeof DatosSolicitante.prototype.id>;

  public readonly solicitante: BelongsToAccessor<Solicitante, typeof DatosSolicitante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('SolicitanteRepository') protected solicitanteRepositoryGetter: Getter<SolicitanteRepository>,
  ) {
    super(DatosSolicitante, dataSource);
    this.solicitante = this.createBelongsToAccessorFor('solicitante', solicitanteRepositoryGetter,);
    this.registerInclusionResolver('solicitante', this.solicitante.inclusionResolver);
    this.solicitantes = this.createHasManyRepositoryFactoryFor('solicitantes', solicitanteRepositoryGetter,);
    this.registerInclusionResolver('solicitantes', this.solicitantes.inclusionResolver);
  }
}
