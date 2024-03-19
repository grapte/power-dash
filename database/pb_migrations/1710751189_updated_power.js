/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ez7yg9nj",
    "name": "mapping_name",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("wdd92jsape0tn97")

  // remove
  collection.schema.removeField("ez7yg9nj")

  return dao.saveCollection(collection)
})
