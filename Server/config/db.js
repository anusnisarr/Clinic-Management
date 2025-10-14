import mongoose from "mongoose"

//FOR ATLAS
// const connectDB = async () => {
//     try {
//         const connection = await mongoose.connect(process.env.MONGO_URI)

//         console.log('Database connected✅ ');
        
//     } catch (error) {
//         console.error('❌ DB connection error:', error);

//     }
// }

//FOR LOCAL
const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_LOCAL_URI)

        console.log('lOCAL Database connected✅ ');
        
    } catch (error) {
        console.error('❌ DB connection error:', error);

    }
}

export default connectDB