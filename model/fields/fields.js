const requiredAddressFields = [
  "street",
  "number",
  "neighborhood",
  "city",
  "state",
];

const requiredOwnersFields = ["name", "phoneNumber", "email"];

const nonRequiredRoomsFields = [
  "rooms",
  "bedrooms",
  "bathrooms",
  "parkingSpaces",
];

const nonRequiredValuesFields = [
  "monthlyCondominium",
  "annualTax",
  "sellingPrice",
  "rentalPrice",
];

module.exports = {
  requiredAddressFields,
  requiredOwnersFields,
  nonRequiredRoomsFields,
  nonRequiredValuesFields,
};
