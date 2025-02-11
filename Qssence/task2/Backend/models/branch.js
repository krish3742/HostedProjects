const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    logo: {
      data: Buffer,
      contentType: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      index: true,
    },
  },
  { timestamps: true }
);

const Branch = mongoose.model("branch", branchSchema);

module.exports = Branch;
