const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assetSchema = new Schema({
  address: {
    street: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    complement: String,
    neighborhood: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  size: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: [
      "apartamento",
      "casa",
      "casa de condomínio",
      "cobertura",
      "flat",
      "kitnet",
      "terreno",
      "sobrado",
      "fazenda",
    ],
    required: true,
  },
  rooms: {
    rooms: Number,
    bedrooms: Number,
    bathrooms: Number,
    parkingSpaces: Number,
  },
  extra: {
    laundry: Boolean,
    kitchen: Boolean,
    suite: Boolean,
    office: Boolean,
    balcony: Boolean,
    gourmetBalcony: Boolean,
  },
  services: {
    petFriendly: Boolean,
    airConditioning: Boolean,
    internet: Boolean,
    locker: Boolean,
    elevator: Boolean,
    generator: Boolean,
    furnished: Boolean,
    concierge: Boolean,
    sauna: Boolean,
    gym: Boolean,
    playRoom: Boolean,
    babyRoom: Boolean,
    gamesRoom: Boolean,
    gourmetArea: Boolean,
    partyRoom: Boolean,
    barbecue: Boolean,
    swimmingPool: Boolean,
  },
  security: {
    safety24hours: Boolean,
    gatedCondominium: Boolean,
    intercom: Boolean,
    alarmSystem: Boolean,
    watcher: Boolean,
  },
  status: {
    selling: Boolean,
    rental: Boolean,
  },
  values: {
    monthlyCondominium: Number,
    annualTax: Number,
    sellingPrice: Number,
    rentalPrice: Number,
  },
  owners: [
    {
      name: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
  ],
  images: [String],
  description: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Asset", assetSchema);
