import mongoose from "mongoose";

const schema = mongoose.Schema({
    notiPlayerId: {
      type: String,
      require: true
    },
    notiPushToken: {
      type: String,
      require: true
    },
    email: {
      type: String,
      lowercase: true,
      require: true
    }
  },
  {
    timestamps: true
  });


schema.methods.setNotiPlayerId = function setNotiPlayerId(notiPlayerId) {
  this.notiPlayerId = notiPlayerId;
};

schema.methods.setNotiPushToken = function setNotiPushToken(notiPushToken) {
  this.notiPushToken = notiPushToken;
};


schema.methods.setEmail = function setEmail(email) {
  this.email = email;
};

schema.methods.toJson = function toAuth() {
  return {
    email: this.email,
    notiPushToken: this.notiPushToken,
    notiPlayerId: this.notiPlayerId,
  };
};

export default mongoose.model("NotifyUserInfo", schema);