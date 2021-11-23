// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Item, Items } = initSchema(schema);

export {
  Item,
  Items
};