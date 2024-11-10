/**
 * @description Get property value from object by dot notation
 * @param {string} propertyName - property name in dot notation
 * @param {object} obj - object to get property from
 * @returns {any} property value
 */
function getPropertyByDotNotation(propertyName, obj) {
  const parts = propertyName.split(".");
  let property = obj;

  for (let i = 0; i < parts.length; i++) {
    if (property === undefined) {
      return undefined;
    }
    property = property[parts[i]];
  }

  return property;
}

module.exports = getPropertyByDotNotation;
