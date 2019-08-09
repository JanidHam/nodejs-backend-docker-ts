import { Model } from 'objection'

class ParentModel extends Model {
  protected deleted: boolean
  protected createdAt?: Date
  protected updatedAt?: Date

  async $beforeInsert() {
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

export default ParentModel
