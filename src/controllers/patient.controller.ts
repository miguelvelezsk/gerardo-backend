import {Request, Response} from 'express';
import { createPatientService } from '../services/patient/create-patient.service';
import { assignPatientData } from '../services/patient/assign-patient.service';
import { getPatientsService } from '../services/patient/get-patient.service';
import { updatePatientData } from '../services/patient/updated-patient.service';
import { deletePatientService } from '../services/patient/delete-patient.service';

export const createPatient = async (req: Request, res: Response) => {
    try {
        const newPatient = await createPatientService(req.body);
        res.status(201).json(newPatient)
    } catch (error) {
        console.error("Error al crear el paciente", error);
        res.status(500).json({ error: "Error al crear el paciente" });
    }
};

export const assignPatient = async (req: Request, res: Response) => {
    try {
        const updatedPatient = await assignPatientData(req.body);
        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error("Error al asignar la dieta", error);
        res.status(500).json({ error: "Error al asignar una dieta" });
    }
};

export const getPatients = async (req: Request, res: Response) => {
    const{id, name, dietId, eatingHabits, age} = req.query;

    try {
        const patients = await getPatientsService({
            id: id as string,
            name: name as string,
            dietId: dietId as string,
            eatingHabits: eatingHabits as string,
            age: parseInt(age as string),
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