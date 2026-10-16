export default class BaseEntity {
  static toJSON() {
    return { ...this }
  }
}
