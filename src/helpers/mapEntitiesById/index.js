export default entities => Array.isArray(entities) ?
  entities.reduce((mappedEntities, entity) => ({
    ...mappedEntities,
    [entity.id]: entity
  }), {})
  : entities
