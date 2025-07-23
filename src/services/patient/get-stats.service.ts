import { prisma } from "../../prisma/client";
import { HttpError } from "../../utils/http-error";
import { MeatType } from "@prisma/client";
import { translateMeatType } from "../../utils/handlers/translate-meat-type.handler";

export const getPatientStatsService = async (patientId: string) => {
    const patient = await prisma.patient.findUnique({
        where: { id: patientId },
    });

    if (!patient) {
        throw new HttpError("Paciente no encontrado", 404);
    }

    const mealLogs = await prisma.mealLog.findMany({
        where: { patientId },
        include: {
            meal: true,
        },
    });

    if (mealLogs.length === 0) {
        throw new HttpError("No hay registros de comidas para este paciente", 404);
    }
    
    const logsByDate = new Map<string, typeof mealLogs>();
    mealLogs.forEach(log => {
        const date = log.date.toISOString().split("T")[0];
        if(!logsByDate.has(date)) logsByDate.set(date, []);
        logsByDate.get(date)?.push(log);
    });

    let totalCalories = 0, totalProtein = 0, totalCarbs = 0, totalFats = 0;
    const days = logsByDate.size;

    logsByDate.forEach(dayLogs => {
        let dayCalories = 0, dayProtein = 0, dayCarbs = 0, dayFats = 0;
        dayLogs.forEach(({ meal }) => {
            dayCalories += meal.calories;
            dayProtein  += meal.protein;
            dayCarbs += meal.carbs;
            dayFats += meal.fat;
        });
        totalCalories += dayCalories;
        totalProtein += dayProtein;
        totalCarbs += dayCarbs;
        totalFats += dayFats;
    });

    const averageCalories = +(totalCalories / days).toFixed(1);
    const averageProtein = +(totalProtein / days).toFixed(1);
    const averageCarbs = +(totalCarbs / days).toFixed(1);
    const averageFats = +(totalFats / days).toFixed(1);

    const macros = {
        protein: {
        grams: averageProtein,
        percentage: +((averageProtein * 4 * 100) / averageCalories).toFixed(1),
        },
        carbs: {
        grams: averageCarbs,
        percentage: +((averageCarbs * 4 * 100) / averageCalories).toFixed(1),
        },
        fats: {
        grams: averageFats,
        percentage: +((averageFats * 9 * 100) / averageCalories).toFixed(1),
        },
    };

    const mealBreakdownMap = new Map<string, number>();
    mealLogs.forEach(({ meal }) => {
        const type = meal.type;
        mealBreakdownMap.set(type, (mealBreakdownMap.get(type) || 0) + meal.calories);
    });

    const mealBreakdown = Array.from(mealBreakdownMap.entries()).map(([name, calories]) => ({
        name: translateMeatType(name as MeatType),
        calories,
    }));

    const foodCount = new Map<string, number>();
    mealLogs.forEach(({ meal }) => {
        foodCount.set(meal.name, (foodCount.get(meal.name) || 0) + 1);
    });

    const topFoods = Array.from(foodCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

    return {
        averageCalories,
        averageProtein,
        averageCarbs,
        averageFats,
        macros,
        mealBreakdown,
        topFoods,
    };
};

