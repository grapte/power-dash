/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  collection.listRule = "@request.auth.username = \"backend\""
  collection.viewRule = "@request.auth.username = \"backend\""
  collection.createRule = "@request.auth.username = \"backend\""
  collection.updateRule = "@request.auth.username = \"backend\""
  collection.deleteRule = "@request.auth.username = \"backend\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
