from django.db import models


class Zone(models.Model):
    id_zone = models.AutoField(db_column='idZone', primary_key=True)  # Field name made lowercase.
    name = models.CharField(max_length=100)
    earthing_material = models.ForeignKey('Material', models.DO_NOTHING, db_column='earthingMaterial')  # Field name made lowercase.
    insulation_length = models.ForeignKey('Material', models.DO_NOTHING, db_column='insulationLength',  related_name='zone_insulationlen')
    directionelectrically = models.CharField(db_column='directionElectrically', max_length=100)  # Field name made lowercase.
    altitude = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'Zone'
