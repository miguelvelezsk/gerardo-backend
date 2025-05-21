import {prisma} from '../../prisma/client'

interface assignPatientDiet{
    patientId: string;
    dietId?: string;
}

export const assignDietToPatientData = async(data: assignPatientDiet) => {

    if(data.dietId){
        const dietExists = await prisma.diet.findUnique({
            where: {id: data.dietId},
        });
    
        if(!dietExists) {
            throw Error("La dieta no existe");
        }
    }

    const patientExists = await prisma.patient.findUnique({
        where: {id: data.patientId},
    });

    if(!patientExists) {
        throw Error("El paciente no existe");
    }
    

    const updatedPatient = await prisma.patient.update({
        where: {id: data.patientId},
        data: {
        ...(typeof data.dietId !== 'undefined' && {
            diet: data.dietId
            ? {connect: { id: data.dietId } }
            : {disconnect: true},
        }),
        },
    });

    return updatedPatient; 

}