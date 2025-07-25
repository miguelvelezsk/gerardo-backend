import {Request, Response} from 'express';
import { assignDietToPatientData } from '../services/patient/assign-diet-to-patient.service';
import { getPatientsService } from '../services/patient/get-patient.service';
import { updatePatientData } from '../services/patient/updated-patient.service';
import { deletePatientService } from '../services/patient/delete-patient.service';
import { getPatientStatsService } from '../services/patient/get-stats.service';

export const assignDietToPatient = async (req: Request, res: Response) => {
    try {
        const updatedPatient = await assignDietToPatientData(req.body);
        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error("Error al asignar la dieta", error);
        res.status(500).json({ error: "Error al asignar una dieta" });
    }
};

export const getPatients = async (req: Request, res: Response) => {
    const{id, name, dietId, eatingHabits, medicalHistory, caregiver} = req.query;

    try {
        const patients = await getPatientsService({
            id: id as string,
            name: name as string,
            dietId: dietId as string,
            eatingHabits: eatingHabits as string,
            caregiver: caregiver as string,
            medicalHistory: medicalHistory as string,
        })

        if(patients.length == 0){
            res.status(404).json({ message: "No se encontraron pacientes con los filtros seleccionados"});
            return
        }

        res.status(200).json(patients)
    } catch(error) {
        console.error("Error al obtener los pacientes", error);
        res.status(500).json({ error: "Error al obtener los pacientes" });
    }
};

export const updatePatient = async (req: Request, res: Response) => {
  try {
    const updatedPatient = await updatePatientData(req.body);
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error("Error al modificar el paciente:", error);
    res.status(500).json({ error: "Error al modificar el paciente" });
  }
};

export const deletePatient = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const deletedPatient = await deletePatientService(id);
    res.status(200).json(deletedPatient);
  } catch (error) {
    console.error("Error al eliminar el paciente:", error);
    res.status(500).json({ error: "Error al eliminar el paciente" });
  }
};

export const getPatientStats = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const stats = await getPatientStatsService(id);
    res.status(200).json(stats);
  } catch(error: any) {
    console.error("Error al obtener las estadísticas del paciente: ", error);
    res
      .status(error.statusCode || 500)
      .json({ error: error.message || "Error inesperado" });
  }
};