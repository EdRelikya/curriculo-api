// Copia de "source" apenas os campos permitidos que realmente foram enviados
const pick = (source = {}, allowedFields = []) => {
  return allowedFields.reduce((result, field) => {
    if (source[field] !== undefined) {
      result[field] = source[field];
    }
    return result;
  }, {});
};

export default pick;