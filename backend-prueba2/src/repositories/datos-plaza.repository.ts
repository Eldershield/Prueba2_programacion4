import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DatosPlaza, DatosPlazaRelations, Plaza} from '../models';
import {PlazaRepository} from './plaza.repository';

export class DatosPlazaRepository extends DefaultCrudRepository<
  DatosPlaza,
  typeof DatosPlaza.prototype.id,
  DatosPlazaRelations
> {

  public readonly plaza: BelongsToAccessor<Plaza, typeof DatosPlaza.prototype.id>;

  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource, @repository.getter('PlazaRepository') protected plazaRepositoryGetter: Getter<PlazaRepository>,
  ) {
    super(DatosPlaza, dataSource);
    this.plaza = this.createBelongsToAccessorFor('plaza', plazaRepositoryGetter,);
    this.registerInclusionResolver('plaza', this.plaza.inclusionResolver);
  }
}
