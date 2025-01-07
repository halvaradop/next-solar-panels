from django.db import models


class Positionsoildataonlinkage(models.Model):
    idlinkage = models.ForeignKey(Linkage, models.DO_NOTHING, db_column='idLinkage')  # Field name made lowercase.
    idpositionsoildata = models.OneToOneField(Positionsoildata, models.DO_NOTHING, db_column='idPositionSoilData', primary_key=True)>

    class Meta:
        managed = False
        db_table = 'PositionSoilDataOnLinkage'
