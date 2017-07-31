/*export function* ownProps(obj) {
 for (let prop of Object.getOwnPropertyNames(obj))
 yield obj [prop];
 }*/
export function ownPropsToArray(obj) {
  let arr = Object.getOwnPropertyNames(obj).map((key) => obj[key]);
  return arr ? arr : Array.of();
}
