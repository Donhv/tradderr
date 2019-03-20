import Notify from "../../../models/Notify";

const getNotifyByUser = (email) => Notify.find({email, status: "PENDING"});


export default getNotifyByUser;
