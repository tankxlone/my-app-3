import { getSchools } from "@/utils/dbUtils/school";
import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const showSchools = await getSchools();
        return new NextResponse(JSON.stringify(showSchools), { status: 200 });

    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
