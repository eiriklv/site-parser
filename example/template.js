exports = module.exports = {
  "active": true,
  "name": "auraavis",
  "displayName": "Aura Avis",
  "url": "http://www.auraavis.no/",
  "format": "desktop",
  "template": {
    "containers": [{
      "selector": "article",
      "elements": [{
        "name": "url",
        "type": "url",
        "occurence": "first",
        "required": true,
        "items": [{
          "selector": "a",
          "attribute": "href"
        }]
      }, {
        "name": "title",
        "required": true,
        "occurence": "all",
        "items": [{
          "selector": "h1"
        }, {
          "selector": "h2"
        }, {
          "selector": "h3"
        }]
      }, {
        "name": "image",
        "type": "url",
        "occurence": "first",
        "fallback": null,
        "items": [{
          "selector": "a img",
          "attribute": "src"
        }]
      }]
    }]
  }
}
