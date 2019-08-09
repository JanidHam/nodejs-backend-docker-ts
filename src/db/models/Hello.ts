import { Model } from 'objection'

class Hello extends Model {
  readonly id!: number
  name: string
  createdAt?: Date
  updatedAt?: Date

  // Table name is the only required property.
  static tableName = 'hello'

  // Optional JSON schema. This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static jsonSchema = {
    type: 'object',
    required: ['name'],

    properties: {
      id: { type: 'integer' },
      name: { type: 'string', minLength: 1, maxLength: 255 },
    },
  }

  // Where to look for models classes.
  static modelPaths = [__dirname]

  examplePersonMethod(arg: string): number {
    return 1
  }

  //
  // Example of numeric timestamps. Presumably this would be in a base
  // class or a mixin, and not just one of your leaf models.
  //

  $beforeInsert() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  $beforeUpdate() {
    this.updatedAt = new Date()
  }

  $parseDatabaseJson(json: object) {
    const jsonParsed = super.$parseDatabaseJson(json)
    toDate(jsonParsed, 'createdAt')
    toDate(jsonParsed, 'updatedAt')
    return jsonParsed
  }

  $formatDatabaseJson(json: object) {
    const jsonParsed = super.$formatDatabaseJson(json)
    toTime(jsonParsed, 'createdAt')
    toTime(jsonParsed, 'updatedAt')
    return jsonParsed
  }
}

function toDate(obj: any, fieldName: string): any {
  if (obj != null && typeof obj[fieldName] === 'number') {
    obj[fieldName] = new Date(obj[fieldName])
  }
  return obj
}

function toTime(obj: any, fieldName: string): any {
  if (obj != null && obj[fieldName] != null && obj[fieldName].getTime) {
    obj[fieldName] = obj[fieldName].getTime()
  }
  return obj
}

export default Hello
