import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DatosPlaza, DatosPlazaRelations} from '../models';

export class DatosPlazaRepository extends DefaultCrudRepository<
  DatosPlaza,
  typeof DatosPlaza.prototype.id,
  DatosPlazaRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(DatosPlaza, dataSource);
  }
}
