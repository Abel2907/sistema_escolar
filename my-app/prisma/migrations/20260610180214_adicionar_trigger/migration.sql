-- CreateEnum
CREATE TYPE "Perfil" AS ENUM ('ADMIN', 'PROFESSOR', 'ALUNO');

-- CreateEnum
CREATE TYPE "Acao" AS ENUM ('DELETOU_ALUNO', 'DELETOU_PROFESSOR', 'ADICIONOU_ALUNO', 'ADICIONOU_PROFESSOR', 'ALTEROU_NOTA');

-- CreateTable
CREATE TABLE "usuario" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "perfil" "Perfil" NOT NULL DEFAULT 'ALUNO',

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "boletim" (
    "id" TEXT NOT NULL,
    "disciplina" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "idAluno" TEXT NOT NULL,
    "idProfessor" TEXT NOT NULL,

    CONSTRAINT "boletim_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "auditoria" (
    "idAuditoria" TEXT NOT NULL,
    "dataModificacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUsuario" TEXT NOT NULL,

    CONSTRAINT "auditoria_pkey" PRIMARY KEY ("idAuditoria")
);

-- CreateTable
CREATE TABLE "logAcesso" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acao" "Acao",

    CONSTRAINT "logAcesso_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- AddForeignKey
ALTER TABLE "boletim" ADD CONSTRAINT "boletim_idAluno_fkey" FOREIGN KEY ("idAluno") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "boletim" ADD CONSTRAINT "boletim_idProfessor_fkey" FOREIGN KEY ("idProfessor") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "auditoria" ADD CONSTRAINT "auditoria_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "logAcesso" ADD CONSTRAINT "logAcesso_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
