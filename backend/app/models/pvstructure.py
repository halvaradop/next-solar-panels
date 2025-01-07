from django.db import models

class Pvstructure(models.Model):
    idpvstructure = models.AutoField(db_column='idPvStructure', primary_key=True)  # Field name made lowercase.
    idproject = models.ForeignKey(Project, models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.
    designation = models.CharField(max_length=100)
    basematerial = models.IntegerField(db_column='baseMaterial')  # Field name made lowercase.
    basematrialthickness = models.CharField(db_column='baseMatrialThickness', max_length=100)  # Field name made lowercase.
    materialtypelayerone = models.CharField(db_column='materialTypeLayerOne', max_length=100)  # Field name made lowercase.
    thicknesstypelayerone = models.CharField(db_column='thicknessTypeLayerOne', max_length=100)  # Field name made lowercase.
    materialtypelayertwo = models.CharField(db_column='materialTypeLayerTwo', max_length=100)  # Field name made lowercase.
    thicknesstypelayertwo = models.CharField(db_column='thicknessTypeLayerTwo', max_length=100)  # Field name made lowercase.
    foundationtypetwo = models.CharField(db_column='foundationTypeTwo', max_length=100)  # Field name made lowercase.
    concretetype = models.CharField(db_column='concreteType', max_length=100)  # Field name made lowercase.
    foundationelectrical = models.CharField(db_column='foundationElectrical', max_length=100)  # Field name made lowercase.
    length = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'PvStructure'
