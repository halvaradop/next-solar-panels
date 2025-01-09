from django.db import models

class PVStructure(models.Model):
    id_pv_structure = models.AutoField(db_column='idPvStructure', primary_key=True)  # Field name made lowercase.
    id_project = models.ForeignKey('Project', models.DO_NOTHING, db_column='idProject')  # Field name made lowercase.
    designation = models.CharField(max_length=100)
    base_material = models.IntegerField(db_column='baseMaterial')  # Field name made lowercase.
    base_matrial_thickness = models.CharField(db_column='baseMatrialThickness', max_length=100)  # Field name made lowercase.
    material_type_layerone = models.CharField(db_column='materialTypeLayerOne', max_length=100)  # Field name made lowercase.
    thickness_type_layerone = models.CharField(db_column='thicknessTypeLayerOne', max_length=100)  # Field name made lowercase.
    material_type_layer_two = models.CharField(db_column='materialTypeLayerTwo', max_length=100)  # Field name made lowercase.
    thickness_type_layer_two = models.CharField(db_column='thicknessTypeLayerTwo', max_length=100)  # Field name made lowercase.
    foundation_type_two = models.CharField(db_column='foundationTypeTwo', max_length=100)  # Field name made lowercase.
    concrete_type = models.CharField(db_column='concreteType', max_length=100)  # Field name made lowercase.
    foundation_electrical = models.CharField(db_column='foundationElectrical', max_length=100)  # Field name made lowercase.
    length = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'PvStructure'
