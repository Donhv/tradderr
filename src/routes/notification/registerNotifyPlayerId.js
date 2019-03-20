import logger from "../../config/winston";
import Message from "../../utils/message";
import NotifyUserInfo from "../../models/notifyUserInfo"
// import sendNoti from "./services/sendNotifyToUserIds"

const registerNotifyPlayerId = (req, res) => {
  const { notiPlayerId,notiPushToken,email } = req.body;

  logger.info(`notifyUserId=${JSON.stringify(req.body)}`);
  try {
    const notifyUserInfo = new NotifyUserInfo({notiPlayerId, notiPushToken, email});
    NotifyUserInfo.findOne({ 'notiPlayerId':notiPlayerId }).then((obj) => {
      if (obj) {
        obj.setEmail(email) ;
        obj.setNotiPushToken(notiPushToken);
        obj.save().then((updateResult) => {
          res.status(200).json({
            code: Message.SUCCESS,
            data: updateResult.toJson()
          });
        });
      }else {
        notifyUserInfo.save().then((notifyUserInfoResult) => {
          res.status(200).json({
            code: Message.SUCCESS,
            data: notifyUserInfoResult.toJson()
          });
        });
      }
    }).then(() => {

    }).catch(err => {
      logger.error(err);
      res.status(500).json({
        code: Message.FAILED,
        message: Message.SYSTEM_ERROR
      });
    });
  //
  } catch (err) {
    res.status(401).json({
      code: Message.FAILED,
      message: Message.SYSTEM_ERROR
    });
  }
};

export default registerNotifyPlayerId;
