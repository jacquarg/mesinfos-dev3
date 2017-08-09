'use-strict'
const M = {}

M.getItem = (item, allItems) => {
  if (typeof item === 'string') { // it's an id !
    return allItems[item]
  }
  return allItems[item['@id']]
}

M.idList2ItemMap = (ids, allItems) => {
  return ids.reduce((agg, id) => {
    agg[id] = allItems[id]
    return agg
  }, {})
}

M.mapByProp = (prop, items, allItems) => {
  return items.reduce((agg, id) => {
    try {
      const item = M.getItem(id, allItems)
      agg[item[prop]] = item
      return agg
    } catch (e) {
      console.error(`semantic_utils : Error in map by prop on id: ${id}`, e)
      throw e
    }
  }, {})
}

M.isType = (item, type) => {
  if (!(item && item['@type'])) { return false }

  const typeProp = item['@type']
  return  typeProp === type || (typeProp instanceof Array && typeProp.indexOf(type) !== -1)
}

module.exports = M