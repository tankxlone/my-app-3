import prisma from "@/lib/prismaClient";

export const createSchool = async (schoolData) => {
    try {
        const { name, address, city, state, contact, imageUrl, email } = schoolData;
        const createdSchool = await prisma.school.create({
            data: {
                name,
                address,
                city,
                state,
                contact,
                imageUrl,
                email
            },
        });
        return createdSchool;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getSchools = async () => {
    try {
        const getSchoolsResult = await prisma.school.findMany();
        return getSchoolsResult;
    } catch (error) {
        throw new Error(error.message);
    }
}