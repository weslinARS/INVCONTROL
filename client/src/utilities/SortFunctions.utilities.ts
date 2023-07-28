import _ from 'lodash';


export const sortObjectArray = (collection : any[], sortKey : string, order : 'asc'|'desc') => {
  return _.orderBy(collection, [sortKey], order);
}