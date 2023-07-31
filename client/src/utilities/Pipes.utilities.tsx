import _ from 'lodash';
import dayjs from 'dayjs';


export const TransformDate = (array : any[] , keyDate : string, format : string) =>{
  const newArray = _.map(array, (item) => {
    return {
      ...item,
      [keyDate]: dayjs(item[keyDate as keyof object]).format(format)
    }
  })
  return newArray
}