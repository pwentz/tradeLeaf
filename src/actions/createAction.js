export function createAction(type, payload) {
  if (payload && payload.type) {
    throw new Error('payload cannot have a "type" key; detected for action of type="'+type+'"');
  }
  return payload ? {type, ...payload} : {type};
}
