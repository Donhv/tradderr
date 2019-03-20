import Notify from "../../../models/Notify";
import logger from "../../../config/winston";

const setNotifyStatus = (id, status) => Notify.findOne({ _id: id }).then(notify => {
	logger.info(`Change ${notify.name} / ${notify.symbol} to EXPIRED`);
	if (notify) {
		return Notify.findOneAndUpdate(
			{
				_id: id
			},
			{
				status: status
			},
			{
				new: true
			}
		);
	}
	return Promise.reject();
});

export default setNotifyStatus;
