import { createSchool } from '@/utils/dbUtils/school';
import { NextResponse } from 'next/server';
import z from 'zod';


const createSchoolSchema = z.object({
    name: z.string(),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    contact: z.string(),
    imageUrl: z.string(),
    email: z.string().email(),
}).strict();


function validateSchoolSchema(data) {
    try {
        const parseData = createSchoolSchema.parse(data);
        return parseData;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const POST = async (request, response) => {
    try {
        const json = await request.json();
        const validatedSchool = validateSchoolSchema(json);
        const createdSchool = await createSchool(validatedSchool);
        return NextResponse.json(createdSchool, { status: 200 });

    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
