import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnDataSource} from '../datasources';
import {Solicitante, SolicitanteRelations} from '../models';

export class SolicitanteRepository extends DefaultCrudRepository<
  Solicitante,
  typeof Solicitante.prototype.id,
  SolicitanteRelations
> {
  constructor(
    @inject('datasources.conn') dataSource: ConnDataSource,
  ) {
    super(Solicitante, dataSource);
  }
}
