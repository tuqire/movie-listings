export default (arr1, arr2) =>
  arr1 && arr2 && Array.isArray(arr1) && Array.isArray(arr2) ? arr1.reduce((foundAllSoFar, val) =>
    foundAllSoFar ? arr2.includes(val) : false
  , true) : false
