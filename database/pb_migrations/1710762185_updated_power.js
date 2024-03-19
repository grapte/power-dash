/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  collection.createRule = "@request.auth.username = \"backend\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  collection.createRule = "@request.auth.name = \"backend\""

  return dao.saveCollection(collection)
})
