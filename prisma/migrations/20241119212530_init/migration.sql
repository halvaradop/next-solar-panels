-- AddForeignKey
ALTER TABLE `Zone` ADD CONSTRAINT `Zone_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`projectId`) ON DELETE RESTRICT ON UPDATE CASCADE;
