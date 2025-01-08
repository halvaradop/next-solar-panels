from django.db import models


class PositionSoilDataOnLinkage(models.Model):
    id_linkage = models.ForeignKey('Linkage', models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    id_position_soil_data = models.OneToOneField('PositionSoilData', models.DO_NOTHING, db_column='idPositionSoilData', primary_key=True)

    class Meta:
        managed = False
        db_table = 'PositionSoilDataOnLinkage'
