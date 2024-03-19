/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "8ndc8wqx",
    "name": "time",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "2024-03-18 15:50:00.000Z",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  // remove
  collection.schema.removeField("8ndc8wqx")

  return dao.saveCollection(collection)
})
