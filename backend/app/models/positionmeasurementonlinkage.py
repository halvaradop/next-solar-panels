from django.db import models

class Positionmeasurementonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionmeasurement = models.OneToOneField(Positionmeasurement, models.DO_NOTHING, db_column='idPositionMeasurement', primary_>

    class Meta:
        managed = False
        db_table = 'PositionMeasurementOnLinkage'
