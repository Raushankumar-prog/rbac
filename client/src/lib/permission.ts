import prisma from "./prisma";


export const createPermission = async (name: string) => {
  return prisma.permission.create({
    data: { name },
  });
};


export const getAllPermissions = async () => {
  return prisma.permission.findMany({
    include: { roles: true },
  });
};


export const getPermissionById = async (id: string) => {
  return prisma.permission.findUnique({
    where: { id },
    include: { roles: true },
  });
};


export const updatePermission = async (id: string, name: string) => {
  return prisma.permission.update({
    where: { id },
    data: { name },
  });
};


export const deletePermission = async (id: string) => {
  return prisma.permission.delete({
    where: { id },
  });
};
