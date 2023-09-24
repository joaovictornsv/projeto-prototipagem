export const usefulDates = (collection) => {
  Object.assign({}, collection, {
    save(doc) {
      if (doc._id) {
        const {_id, ...data} = doc
        this.update(_id, {
          $set: {
            ...data,
            updatedAt: new Date()
          }
        })
        return this.findOne(_id)
      }

      return this.findOne(
        this.insert({
          ...doc,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      )
    }
  })
}
