import connectDB from "../config/database";

export async function GET() {
    try {
        await connectDB();
        return Response.json({
            message: 'DAtabase Connection Successful',
            status: 'Connected'
        });
    } catch (error) {
        return Response.json({
            message: 'Database connection Failed!',
            error: error.message
        },
            { status: 500 });
    }
}