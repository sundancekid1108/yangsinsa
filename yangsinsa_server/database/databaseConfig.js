import mongoose from 'mongoose';
import config from '../config/config.js'

const connectDatabase =  () => {
    try {
         mongoose.connect(config.database.url, {})
        console.log('MongoDB Connected');

    } catch (error) {
        console.error(err.message);

        process.exit(1);
        // 에러로 종료
    }


}

export default connectDatabase