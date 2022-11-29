import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {DatosSolicitante, DatosSolicitanteRelations} from '../models';

export class DatosSolicitanteRepository extends DefaultCrudRepository<
  DatosSolicitante,
  typeof DatosSolicitante.prototype.id,
  DatosSolicitanteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(DatosSolicitante, dataSource);
  }
}
