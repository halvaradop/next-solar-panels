from django.db import models

class PositionMeasurementOnLinkage(models.Model):
    id_linkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    id_position_measurement = models.OneToOneField(Positionmeasurement, models.DO_NOTHING, db_column='idPositionMeasurement', primary_>

    class Meta:
        managed = False
        db_table = 'PositionMeasurementOnLinkage'
