/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("posts");
  collection.indexes.push("CREATE UNIQUE INDEX idx_posts_slug ON posts (slug)");
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("posts");
  collection.indexes = collection.indexes.filter(idx => !idx.includes("idx_posts_slug"));
  return app.save(collection);
})
