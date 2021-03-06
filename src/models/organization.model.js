const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const organizationSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    projects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
organizationSchema.plugin(toJSON);
organizationSchema.plugin(paginate);

organizationSchema.pre('save', async function (next) {
  const app = this;
  next();
});

/**
 * @typedef Organization
 */
const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
