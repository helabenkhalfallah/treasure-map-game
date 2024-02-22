import {
  model,
  Schema,
} from 'mongoose';

const MapModelSchema = new Schema({
  '_id': {
    'type': 'String',
  },
  'width': {
    'type': 'Number',
  },
  'height': {
    'type': 'Number',
  },
});

const MAP_COLLECTION = 'MapModel';

const MapModelModel = model(MAP_COLLECTION, MapModelSchema);

export default MapModelModel;
