import mmt from 'moment-timezone';
import 'moment/dist/locale/pt-br';
const moment = mmt;
mmt.tz.setDefault('UTC');

moment.locale('pt');

export default moment;
