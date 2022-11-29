import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Solicitante, SolicitanteRelations, DatosSolicitante} from '../models';
import {DatosSolicitanteRepository} from './datos-solicitante.repository';

export class SolicitanteRepository extends DefaultCrudRepository<
  Solicitante,
  typeof Solicitante.prototype.id,
  SolicitanteRelations
> {

  public readonly datosSolicitante: BelongsToAccessor<DatosSolicitante, typeof Solicitante.prototype.id>;

  public readonly datosSolicitantes: HasManyRepositoryFactory<DatosSolicitante, typeof Solicitante.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('DatosSolicitanteRepository') protected datosSolicitanteRepositoryGetter: Getter<DatosSolicitanteRepository>,
  ) {
    super(Solicitante, dataSource);
    this.datosSolicitantes = this.createHasManyRepositoryFactoryFor('datosSolicitantes', datosSolicitanteRepositoryGetter,);
    this.registerInclusionResolver('datosSolicitantes', this.datosSolicitantes.inclusionResolver);
    this.datosSolicitante = this.createBelongsToAccessorFor('datosSolicitante', datosSolicitanteRepositoryGetter,);
    this.registerInclusionResolver('datosSolicitante', this.datosSolicitante.inclusionResolver);
  }
}
