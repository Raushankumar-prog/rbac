import prisma from "./prisma";


export const createUser = async (email: string, password: string, name: string, roleId: string) => {
  return prisma.user.create({
    data: {
      email,
      password,
      name,
      roleId,
    },
  });
};


export const getAllUsers = async () => {
  return prisma.user.findMany({
    include: { role: true },
  });
};


export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
    include: { role: true },
  });
};

export const updateUser = async (id: string, data: Partial<{ email: string; password: string; name: string; roleId: string }>) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};


export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
