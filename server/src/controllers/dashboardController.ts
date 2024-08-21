import {Request, Response} from "express";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardMetrics = async (req: Request, res: Response):Promise<void> => {
    try {
        const popularProducts = await prisma.products.findMany({
            take: 5, // Limit the number of results
            orderBy: {
                stockQuantity: "desc", // Order by salesCount in descending order
            },
        });
        const salesSummary = await prisma.salesSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });
          const purchaseSummary = await prisma.purchaseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });
          const expenseSummary = await prisma.expenseSummary.findMany({
            take: 5,
            orderBy: {
              date: "desc",
            },
          });
          const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany(
            {
              take: 5,
              orderBy: {
                date: "desc",
              },
            }
          );
          //transform data on BE
          const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item) => ({
              ...item,
              amount: item.amount.toString(),
            })
          );
          res.status(200).json({
            popularProducts,
            salesSummary,
            purchaseSummary,
            expenseSummary,
            expenseByCategorySummary,
          });
    } catch (error) {
        res.status(500).json({message: "Error retrieving dashboard metrics"});
    }
};