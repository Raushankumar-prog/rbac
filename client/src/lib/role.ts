import prisma from "./prisma";


export const createRole = async (name: string) => {
  return prisma.role.create({
    data: { name },
  });
};


export const getAllRoles = async () => {
  return prisma.role.findMany({
    include: { users: true, permissions: true },
  });
};

export const getRoleById = async (id: string) => {
  return prisma.role.findUnique({
    where: { id },
    include: { users: true, permissions: true },
  });
};

export const updateRole = async (id: string, name: string) => {
  return prisma.role.update({
    where: { id },
    data: { name },
  });
};

// Delete a role
export const deleteRole = async (id: string) => {
  return prisma.role.delete({
    where: { id },
  });
};
