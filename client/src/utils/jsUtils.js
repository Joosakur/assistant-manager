export function* ownProps(obj) {
  for (let prop of Object.getOwnPropertyNames(obj))
    yield obj [prop];
}
